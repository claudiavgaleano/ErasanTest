import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { PDFParse } from 'pdf-parse'
import { products } from '../src/data/products.js'
import { translateText } from './product-en-translator.mjs'
import {
  SPEC_DEFINITIONS,
  MECHANICAL_SPEC_KEYS,
  pdfFilenameToSlug,
} from './specification-labels.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const FICHA_TECNICA_DIR = join(ROOT, 'src/assets/FichaTecnica')
const OUTPUT_SPECS = join(ROOT, 'src/data/productSpecifications.js')
const OUTPUT_PDFS = join(ROOT, 'src/data/productSpecPdfs.js')
const ES_LOCALE = join(ROOT, 'src/i18n/locales/es.json')
const EN_LOCALE = join(ROOT, 'src/i18n/locales/en.json')

const DEF_BY_KEY = Object.fromEntries(SPEC_DEFINITIONS.map((def) => [def.key, def]))

function normalizeForMatch(text) {
  return text
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

function prettifyValue(raw) {
  if (!raw) return ''

  let value = raw
    .replace(/\s+/g, ' ')
    .replace(/\s*([/,])\s*/g, '$1')
    .trim()

  if (/^001a3mm$/i.test(value)) return '0,01 a 3 mm'
  if (/^001mm$/i.test(value)) return '0,01 mm'
  if (/^22kw$/i.test(value)) return '2,2 kW'
  if (/^55kw$/i.test(value)) return '5,5 kW'

  value = value
    .replace(/\b(\d+)\s*\.\s*(\d+)\b/g, '$1.$2')
    .replace(/\b0\s*\.\s*0\s*1\b/gi, '0,01')
    .replace(/(\d+)mm\b/gi, '$1 mm')
    .replace(/\b(\d+)\s*kw\b/gi, (_, n) => `${n.replace('.', ',')} kW`)
    .replace(/\b(\d+)\s*kg\b/gi, '$1 kg')
    .replace(/\b(\d+)\s*rpm\b/gi, '$1 rpm')
    .replace(/monofasica220v50hz/i, 'Monofásica 220V / 50 Hz')
    .replace(/monof\s*asica/gi, 'Monofásica')
    .replace(/380v\+n\+gndvca?50hz/i, '380V+N+GND Vca/50 Hz')
    .replace(/3x400ngnd/i, '3x400+N+GND')
    .replace(/3x400\+n\+gnd/i, '3x400+N+GND')
    .replace(/inclu\s*ida/gi, 'Incluida')
    .replace(/opcional/gi, 'Opcional')
    .replace(/win\s*bobbin/gi, 'Winbobbin')
    .replace(/sd\s*card/gi, 'SD Card')
    .replace(/(\d+)programas200bobinadosporprograma/i, '$1 programas (200 bobinados/programa)')

  return value
}

function extractValueBefore(normalizedText, labelIndex, windowSize = 120) {
  const slice = normalizedText.slice(Math.max(0, labelIndex - windowSize), labelIndex)

  const patterns = [
    /monofasica\d+v\/?\d*hz/i,
    /3x400\+n\+gnd/i,
    /380v\+n\+gnd[^a-z]*/i,
    /0,01a3mm/i,
    /0\.01a3mm/i,
    /[\d,.]+kw/i,
    /[\d,.]+kg/i,
    /[\d,.]+mm/i,
    /[\d,.]+rpm/i,
  ]

  for (const pattern of patterns) {
    const matches = [...slice.matchAll(new RegExp(pattern.source, 'gi'))]
    if (matches.length) {
      return prettifyValue(matches[matches.length - 1][0])
    }
  }

  return ''
}

function extractValueAfter(normalizedText, startIndex, windowSize = 160) {
  const slice = normalizedText.slice(startIndex, startIndex + windowSize)

  const patterns = [
    /^incluida/i,
    /^opcional/i,
    /^sd\s*card/i,
    /^[\d,.]+\s*programas[^a-z]*/i,
    /^[\d,.]+"/i,
    /^[\d,.]+\s*rpm/i,
    /^winbobbin[^a-z]*/i,
    /^cnc[^a-z]*/i,
    /^ethernet[^a-z]*/i,
    /^mediante[^.]+(?:\.|$)/i,
  ]

  for (const pattern of patterns) {
    const match = slice.match(pattern)
    if (match) return prettifyValue(match[0])
  }

  const generic = slice.match(/^([a-z0-9][^a-z0-9]{0,3}[\w\s,.+/"()-]{2,80})/i)
  return prettifyValue(generic?.[1] || '')
}

function findLabelIndex(normalizedText, def) {
  const candidates = [def.labelEs, ...def.aliases].map(normalizeForMatch)
  let bestIndex = -1

  for (const candidate of candidates) {
    const idx = normalizedText.indexOf(candidate)
    if (idx !== -1 && (bestIndex === -1 || idx < bestIndex)) {
      bestIndex = idx
    }
  }

  return bestIndex
}

function extractMechanicalValuesBlock(normalizedText) {
  const endMarker = normalizedText.indexOf('diametrohilo')
  const slice = endMarker !== -1 ? normalizedText.slice(0, endMarker) : normalizedText.slice(0, 500)
  const values = []

  const tokenPattern =
    /001a3mm|0,01a3mm|0\.01a3mm|001mm|monofasica220v50hz|380v\+n\+gndvca50hz|380vngndvca50hz|3x400\+n\+gnd|3x400ngnd|\d+mm|\d+kw|\d+kg/gi

  let match
  while ((match = tokenPattern.exec(slice)) !== null) {
    values.push(prettifyValue(match[0]))
    if (values.length >= 8) break
  }

  return values
}

function extractElectronicSpecs(normalizedText) {
  const chunk = normalizedText.includes('comunicacionethernet')
    ? normalizedText.slice(normalizedText.indexOf('comunicacionethernet'))
    : normalizedText

  const specs = {}

  if (/comunicacionethernet/i.test(chunk)) {
    specs.communication = 'Ethernet incluida'
  }

  if (/ampliaciondememoria/i.test(chunk)) {
    specs.memoryExpansion = /sdcardopcional/i.test(chunk) ? 'SD Card (opcional)' : 'SD Card'
  }

  if (/winbobbin/i.test(chunk)) {
    specs.software = 'Winbobbin (Windows)'
  }

  const memoryMatch = chunk.match(/10000programas200bobinadosporprograma/i)
  if (memoryMatch) {
    specs.memoryCapacity = prettifyValue(memoryMatch[0])
  }

  if (/pantallatactil/i.test(chunk)) {
    specs.display = '7" Color'
  }

  if (/controldelamaquina/i.test(chunk) || /mediantepantallatactilbotoneraypedal/i.test(chunk)) {
    specs.control = 'CNC última generación'
  }

  return specs
}

function extractMaxSpeedFromTable(normalizedText) {
  const match = normalizedText.match(/9000rpm|3000rpm|750rpm|500rpm/)
  if (!match) return ''

  const rpmValues = [...normalizedText.matchAll(/(\d{3,5})rpm/gi)].map((m) => Number(m[1]))
  if (!rpmValues.length) return prettifyValue(match[0])

  const max = Math.max(...rpmValues)
  return `${max.toLocaleString('es-ES')} rpm`
}

function extractSpeedRanges(normalizedText) {
  const slice = normalizedText.split('comunicacionethernet')[0] || normalizedText
  const pairs = [...slice.matchAll(/(\d{2,5})rpm(\d+)nm/gi)].map(
    (match) => `${Number(match[1]).toLocaleString('es-ES')} rpm / ${match[2]} Nm`
  )

  if (pairs.length < 3) return ''

  const beltCount = normalizedText.includes('posicioncorrea')
    ? 3
    : normalizedText.match(/posicion[1-4]/gi)?.length || 3

  const cols = beltCount === 4 ? 4 : 3
  if (pairs.length >= cols * beltCount) {
    return Array.from({ length: beltCount }, (_, row) => {
      const rowPairs = pairs.slice(row * cols, row * cols + cols)
      const label = normalizedText.includes('posicioncorrea')
        ? `Posición correa ${row + 1}`
        : `Posición ${row + 1}`
      return `${label}: ${rowPairs.join('; ')}`
    }).join(' | ')
  }

  return pairs.slice(0, 12).join('; ')
}

function extractSpecificationsFromText(text) {
  const normalizedText = normalizeForMatch(text)
  const mechanicalValues = extractMechanicalValuesBlock(normalizedText)
  const electronicValues = extractElectronicSpecs(normalizedText)
  const found = new Map()

  for (const [index, key] of MECHANICAL_SPEC_KEYS.entries()) {
    const def = DEF_BY_KEY[key]
    const value = mechanicalValues[index]
    if (value) {
      found.set(key, { label: def.labelEs, value, icon: def.icon })
    }
  }

  for (const [key, value] of Object.entries(electronicValues)) {
    const def = DEF_BY_KEY[key]
    if (def && value) {
      found.set(key, { label: def.labelEs, value: prettifyValue(value), icon: def.icon })
    }
  }

  const maxSpeed = extractMaxSpeedFromTable(normalizedText)
  if (maxSpeed) {
    const def = DEF_BY_KEY.maxSpeed
    found.set('maxSpeed', { label: def.labelEs, value: maxSpeed, icon: def.icon })
  }

  const speedRanges = extractSpeedRanges(normalizedText)
  if (speedRanges) {
    const def = DEF_BY_KEY.speedRanges
    found.set('speedRanges', { label: def.labelEs, value: speedRanges, icon: def.icon })
  }

  for (const def of SPEC_DEFINITIONS) {
    if (found.has(def.key)) continue
    if (MECHANICAL_SPEC_KEYS.includes(def.key)) continue
    if (def.key === 'speedRanges' || def.key === 'maxSpeed') continue

    const labelIndex = findLabelIndex(normalizedText, def)
    if (labelIndex === -1) continue

    const aliasLength = normalizeForMatch(def.aliases[def.aliases.length - 1] || def.labelEs).length
    const valueStart = labelIndex + aliasLength
    let value = def.valueBeforeLabel
      ? extractValueBefore(normalizedText, labelIndex)
      : extractValueAfter(normalizedText, valueStart)

    if (value) {
      found.set(def.key, { label: def.labelEs, value: prettifyValue(value), icon: def.icon })
    }
  }

  const displayOrder = [
    'wireDiameter',
    'distanceBetweenPoints',
    'guidePrecision',
    'maxPower',
    'maxWindingLength',
    'maxCoilDiameter',
    'supplyVoltage',
    'netWeight',
    'maxSpeed',
    'control',
    'display',
    'communication',
    'software',
    'memoryCapacity',
    'memoryExpansion',
    'speedRanges',
    'maxWeightBetweenPoints',
  ]

  const orderedKeys = displayOrder.filter((key) => found.has(key))

  return orderedKeys.map((key) => {
    const entry = found.get(key)
    const def = DEF_BY_KEY[key]
    return {
      label: entry.label,
      value: entry.value,
      icon: entry.icon,
      labelEn: def.labelEn,
    }
  })
}

async function readPdfText(filePath) {
  const buffer = readFileSync(filePath)
  const parser = new PDFParse({ data: buffer })
  try {
    const info = await parser.getInfo()
    const lastPage = info.total || 1
    const specPage = lastPage >= 2 ? lastPage : 1
    const result = await parser.getText({ partial: [specPage] })
    return result.text || ''
  } finally {
    await parser.destroy()
  }
}

function toEnglishSpec(spec) {
  return {
    label: translateText(spec.label) || spec.labelEn || spec.label,
    value: translateText(spec.value) || spec.value,
    icon: spec.icon,
  }
}

function escapeJsString(value) {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

function writeProductSpecificationsFile(specsBySlug) {
  const slugs = Object.keys(specsBySlug).sort()
  const blocks = slugs.map((slug) => {
    const { es, en } = specsBySlug[slug]
    const formatList = (items) =>
      items
        .map(
          (item) =>
            `      { label: '${escapeJsString(item.label)}', value: '${escapeJsString(item.value)}', icon: '${item.icon}' },`
        )
        .join('\n')

    return `  '${slug}': {
    es: [
${formatList(es)}
    ],
    en: [
${formatList(en)}
    ],
  },`
  })

  const content = `// Auto-generated by scripts/extract-specifications-from-pdf.mjs
// Source PDFs: src/assets/FichaTecnica/*.pdf
// Re-run: node scripts/extract-specifications-from-pdf.mjs

import { getDummyProductSpecifications } from './productSpecificationsDummy'

export const productSpecificationsBySlug = {
${blocks.join('\n')}
}

export function getProductSpecifications(slug, language = 'es') {
  const lang = language?.startsWith('es') ? 'es' : 'en'
  return (
    productSpecificationsBySlug[slug]?.[lang] ??
    getDummyProductSpecifications(slug, lang)
  )
}
`

  writeFileSync(OUTPUT_SPECS, content, 'utf8')
}

function slugifyVar(slug) {
  return slug.replace(/[^a-zA-Z0-9]/g, '_')
}

function writeProductSpecPdfsFile(pdfEntries) {
  const imports = pdfEntries
    .map(({ slug, filename }) => {
      const varName = `${slugifyVar(slug)}Pdf`
      return `import ${varName} from '../assets/FichaTecnica/${filename}?url'`
    })
    .join('\n')

  const map = pdfEntries
    .map(({ slug, filename }) => {
      const varName = `${slugifyVar(slug)}Pdf`
      return `  '${slug}': {
    url: ${varName},
    filename: '${filename}',
  },`
    })
    .join('\n')

  const content = `// Auto-generated by scripts/extract-specifications-from-pdf.mjs
${imports}

const productSpecPdfs = {
${map}
}

export function getProductSpecPdf(slug) {
  return productSpecPdfs[slug] || null
}

export function getProductSpecPdfUrl(slug) {
  return getProductSpecPdf(slug)?.url ?? null
}

export function hasProductSpecPdf(slug) {
  return Boolean(getProductSpecPdf(slug))
}
`

  writeFileSync(OUTPUT_PDFS, content, 'utf8')
}

function syncI18nSpecifications(specsBySlug) {
  const es = JSON.parse(readFileSync(ES_LOCALE, 'utf8'))
  const en = JSON.parse(readFileSync(EN_LOCALE, 'utf8'))

  for (const [slug, { es: esSpecs, en: enSpecs }] of Object.entries(specsBySlug)) {
    const esItem = es.productCatalog?.items?.[slug]
    const enItem = en.productCatalog?.items?.[slug]
    if (!esItem || !enItem) continue

    esItem.specifications = esSpecs.map(({ label, value, icon }) => ({ label, value, icon }))
    enItem.specifications = enSpecs.map(({ label, value, icon }) => ({ label, value, icon }))
  }

  writeFileSync(ES_LOCALE, `${JSON.stringify(es, null, 2)}\n`, 'utf8')
  writeFileSync(EN_LOCALE, `${JSON.stringify(en, null, 2)}\n`, 'utf8')
}

async function main() {
  mkdirSync(FICHA_TECNICA_DIR, { recursive: true })

  const pdfFiles = readdirSync(FICHA_TECNICA_DIR)
    .filter((name) => name.toLowerCase().endsWith('.pdf'))
    .sort()

  if (!pdfFiles.length) {
    console.warn(`No PDF files found in ${FICHA_TECNICA_DIR}`)
    process.exit(0)
  }

  const knownSlugs = new Set(products.map((product) => product.slug))
  const specsBySlug = {}
  const pdfEntries = []
  const report = { ok: [], skipped: [], failed: [] }

  for (const filename of pdfFiles) {
    const slug = pdfFilenameToSlug(filename)
    if (!slug) {
      report.skipped.push({ filename, reason: 'Unknown filename pattern' })
      continue
    }

    if (!knownSlugs.has(slug)) {
      report.skipped.push({ filename, slug, reason: 'No matching product slug in products.js' })
      continue
    }

    try {
      const text = await readPdfText(join(FICHA_TECNICA_DIR, filename))
      const extracted = extractSpecificationsFromText(text)

      if (!extracted.length) {
        report.failed.push({ filename, slug, reason: 'No specifications extracted' })
        continue
      }

      const esSpecs = extracted.map(({ label, value, icon }) => ({ label, value, icon }))
      const enSpecs = extracted.map(toEnglishSpec)

      specsBySlug[slug] = { es: esSpecs, en: enSpecs }
      pdfEntries.push({ slug, filename })
      report.ok.push({ filename, slug, count: extracted.length })
    } catch (error) {
      report.failed.push({ filename, slug, reason: error.message })
    }
  }

  if (Object.keys(specsBySlug).length) {
    writeProductSpecificationsFile(specsBySlug)
    writeProductSpecPdfsFile(pdfEntries)
    syncI18nSpecifications(specsBySlug)
  }

  console.log(`Extracted specifications for ${report.ok.length} products`)
  report.ok.forEach(({ filename, slug, count }) => {
    console.log(`  ✓ ${filename} → ${slug} (${count} specs)`)
  })

  if (report.skipped.length) {
    console.log(`Skipped ${report.skipped.length}:`)
    report.skipped.forEach(({ filename, reason }) => console.log(`  - ${filename}: ${reason}`))
  }

  if (report.failed.length) {
    console.log(`Failed ${report.failed.length}:`)
    report.failed.forEach(({ filename, reason }) => console.log(`  ! ${filename}: ${reason}`))
    process.exitCode = 1
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
