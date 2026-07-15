import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const erasanContent = JSON.parse(
  readFileSync(path.join(root, 'src/data/erasan-content.json'), 'utf8')
)
const esLocalePath = path.join(root, 'src/i18n/locales/es.json')
const esLocale = JSON.parse(readFileSync(esLocalePath, 'utf8'))

const SLUG_TO_I18N_KEY = {
  'bobinadora-erasan-e1200-c-sgb': 'cabezal-bobinador-erasan-e1200-c-sgb',
  'bobinadora-erasan-e1200-c': 'cabezal-bobinador-erasan-e1200-c',
  'bobinadora-erasan-e1500-b': 'cabezal-bobinador-erasan-e1500-b',
  'bobinadora-erasan-e1200-b': 'cabezal-bobinador-erasan-e1200-b',
}

const FOOTER_PARAGRAPH_MARKERS = [
  'De banco lineal',
  'Máquinas a medida',
  'Máquinas actualizadas',
  'Ocasión - segunda mano',
]

const FOOTER_LIST_MARKERS = [
  'De banco lineal',
  'Máquinas a medida',
  'Máquinas actualizadas',
  'Ocasión',
]

function cleanParagraphs(paragraphs = []) {
  return paragraphs.filter(
    (paragraph) =>
      paragraph &&
      !FOOTER_PARAGRAPH_MARKERS.some((marker) => paragraph.includes(marker))
  )
}

function cleanListItems(listItems = []) {
  return listItems.filter(
    (item) => item && !FOOTER_LIST_MARKERS.some((marker) => item.includes(marker))
  )
}

function findIndex(headings, matcher) {
  return headings.findIndex((heading) => matcher(heading))
}

function parseRichProduct(source) {
  const headings = source.headings || []
  const paragraphs = cleanParagraphs(source.paragraphs)
  const listItems = cleanListItems(source.listItems)

  const brandIdx = findIndex(headings, (heading) => heading.startsWith('Características ERASAN'))
  const benefitStartIdx = headings.indexOf('Electromecánica de alta eficiencia')

  const heroSubtitle = headings[1] || ''
  const heroIntro = paragraphs

  let highlight = null
  if (brandIdx >= 0 && benefitStartIdx > brandIdx + 1) {
    const title = headings[brandIdx + 1]
    const subtitle = headings[brandIdx + 2]
    if (title && title !== 'Electromecánica de alta eficiencia') {
      highlight = {
        title,
        subtitle: subtitle || '',
        imageIndex: 0,
      }
    }
  }

  const benefitCards = []
  if (benefitStartIdx >= 0) {
    for (let index = 0; index < 4; index += 1) {
      const title = headings[benefitStartIdx + index * 2]
      const description = headings[benefitStartIdx + index * 2 + 1]
      if (title) {
        benefitCards.push({
          title,
          description: description || '',
        })
      }
    }
  }

  const brandFeatures =
    brandIdx >= 0
      ? {
          title: headings[brandIdx],
          items: listItems,
        }
      : null

  const gallery = [{ caption: source.title }]

  const hasRichContent =
    heroSubtitle ||
    heroIntro.length > 0 ||
    highlight ||
    benefitCards.length > 0 ||
    (brandFeatures?.items?.length ?? 0) > 0

  if (!hasRichContent) {
    return {
      title: source.title,
      excerpt: source.title,
      content: '',
      features: [],
      section: 'coilWinding',
    }
  }

  const entry = {
    title: source.title,
    heroSubtitle,
    excerpt: heroSubtitle || source.title,
    heroIntro,
    gallery,
    highlight,
    benefitCards,
    content: '',
    features: [],
    section: 'coilWinding',
  }

  if (brandFeatures?.title && brandFeatures.items.length > 0) {
    entry.brandFeatures = brandFeatures
  }

  return entry
}

function preserveStripFoilManualFields(nextEntry, existingEntry) {
  if (!existingEntry) return nextEntry

  if (existingEntry.characteristics?.body) {
    nextEntry.characteristics = existingEntry.characteristics
  }

  if (existingEntry.brandFeatures?.items?.length) {
    nextEntry.brandFeatures = existingEntry.brandFeatures
  }

  if (existingEntry.gallery?.length > 1) {
    nextEntry.gallery = existingEntry.gallery
  }

  if (existingEntry.highlight) {
    nextEntry.highlight = existingEntry.highlight
  }

  return nextEntry
}

const sourceProducts = erasanContent.pages?.coilWindingMachines?.products || []
const items = esLocale.productCatalog.items

for (const source of sourceProducts) {
  const i18nKey = SLUG_TO_I18N_KEY[source.slug] || source.slug
  const existing = items[i18nKey]
  let nextEntry = parseRichProduct(source)

  if (source.slug === 'bobinadora-strip-foil') {
    nextEntry = preserveStripFoilManualFields(nextEntry, existing)
  }

  items[i18nKey] = nextEntry
}

const STALE_I18N_KEYS = [
  'bobinadora-erasan-e1200-c-sgb',
  'bobinadora-erasan-e1200-c',
  'bobinadora-erasan-e1500-b',
  'bobinadora-erasan-e1200-b',
]

for (const staleKey of STALE_I18N_KEYS) {
  delete items[staleKey]
}

writeFileSync(esLocalePath, `${JSON.stringify(esLocale, null, 2)}\n`, 'utf8')

const updatedKeys = sourceProducts.map((product) => SLUG_TO_I18N_KEY[product.slug] || product.slug)
console.log(`Updated ${updatedKeys.length} coil winding products in es.json:`)
updatedKeys.forEach((key) => console.log(`  - ${key}`))
