import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname, extname } from 'path'
import { fileURLToPath } from 'url'
import { products } from '../src/data/products.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ASSETS_ROOT = join(__dirname, '../src/assets')
const OUTPUT_REGISTRY = join(__dirname, '../src/data/productGalleryImages.js')

const SKIP_PATTERNS = [
  /logo/i,
  /icon/i,
  /avatar/i,
  /gravatar/i,
  /placeholder/i,
  /spinner/i,
  /emoji/i,
  /flag/i,
  /social/i,
  /facebook|twitter|linkedin|instagram/i,
  /abb-|anstee|ge-|fluke|cern|leroy|schaffner|moretrafo|jesiva/i,
  /tileerasan/i,
  /cropped-erasan-logo/i,
  /\.pdf$/i,
  /elementor\/css/i,
]

const SECTION_FOLDERS = {
  coilWinding: {
    'banco-lineal': 'CoilWinding/DeBancoLineal',
    'cabezal-bobinador': 'CoilWinding/Cabezales',
    'maquina-folio': 'CoilWinding/Folio',
    default: 'CoilWinding/DeBancoLineal',
  },
  accessories: {
    tensionadores: 'Accesories/Tensionadores',
    guiadores: 'Accesories/Guiadores',
    devanadores: 'Accesories/Devanadores',
    'mandriles-expandibles': 'Accesories/Mandriles',
    'dispensadores-de-papel': 'Accesories/DispensadoresDePapel',
    default: 'Accesories',
  },
  specialProjects: {
    default: 'CoilWinding/Especiales',
  },
  retrofit: {
    default: 'Retrofit',
  },
}

const PAGE_URLS = {
  'bobinadora-strip-foil': 'https://erasan.es/bobinadora-strip-foil/',
  'bobinadora-folio': 'https://erasan.es/bobinadora-folio/',
  'cabezal-bobinador-erasan-e1200-c-sgb': 'https://erasan.es/cabezal-bobinador/bobinadora-erasan-e1200-c-sgb/',
  'cabezal-bobinador-erasan-e1200-c': 'https://erasan.es/cabezal-bobinador/bobinadora-erasan-e1200-c/',
  'cabezal-bobinador-erasan-e1500-b': 'https://erasan.es/cabezal-bobinador/bobinadora-erasan-e1500-b/',
  'cabezal-bobinador-erasan-e1200-b': 'https://erasan.es/cabezal-bobinador/bobinadora-erasan-e1200-b/',
  'bobinadora-erasan-e1200-sgb': 'https://erasan.es/maquinas-bobinadoras/bobinadora-erasan-e1200-sgb/',
  'bobinadora-erasan-e1200-servotech': 'https://erasan.es/maquinas-bobinadoras/bobinadora-erasan-e1200-servotech/',
  'bobinadora-erasan-e1200': 'https://erasan.es/maquinas-bobinadoras/erasan-bobinadora-e1200/',
  'bobinadora-erasan-e900-sgb': 'https://erasan.es/maquinas-bobinadoras/bobinadora-erasan-e900-sgb/',
  'bobinadora-erasan-e900-servotech': 'https://erasan.es/maquinas-bobinadoras/bobinadora-erasan-e900-servotech/',
  'bobinadora-erasan-e900': 'https://erasan.es/maquinas-bobinadoras/bobinadora-erasan-e900/',
  'bobinadora-erasan-e600': 'https://erasan.es/bobinadora-erasan-e600/',
  'bobinadora-erasan-e300': 'https://erasan.es/maquinas-bobinadoras/bobinadora-erasan-e300/',
  'bobinadora-erasan-e300w': 'https://erasan.es/bobinadora-erasan-e300w/',
  'dispensador-de-papel-dp1-p': 'https://erasan.es/dispensador-de-papel-dp1-p/',
  'dispensador-de-papel-tpe': 'https://erasan.es/dispensador-de-papel-tpe/',
  'devanador-dp1r-ap1r': 'https://erasan.es/devanador-dp1r-ap1r/',
  'devanador-dp4': 'https://erasan.es/devanador-dp4/',
  'devanador-dp2': 'https://erasan.es/devanador-dp2/',
  'devanador-dp1': 'https://erasan.es/devanador-dp1/',
  'mandril-expandible-rectangular': 'https://erasan.es/mandril-expandible-rectangular/',
  'mandril-expandible-circular': 'https://erasan.es/mandril-expandible-circular/',
  'guiador-de-pletina-gp2': 'https://erasan.es/guiador-de-pletina-gp2/',
  'guiador-de-pletina-gp1': 'https://erasan.es/guiador-de-pletina-gp1/',
  'guiador-de-hilo-gh3': 'https://erasan.es/guiador-de-hilo-gh3/',
  'guiador-de-hilo-gh2': 'https://erasan.es/guiador-de-hilo-gh2/',
  'guiador-de-hilo-gh1': 'https://erasan.es/guiador-de-hilo-gh1/',
  'tensionador-de-hilo-th3-d': 'https://erasan.es/tensionador-de-hilo-th3-d/',
  'tensionador-de-hilo-th3-is': 'https://erasan.es/tensionador-de-hilo-th3-is/',
  'tensionador-de-hilo-th3': 'https://erasan.es/tensionador-de-hilo-th3/',
  'tensionador-de-hilo-th3-standalone': 'https://erasan.es/tensionador-de-hilo-th3-standalone/',
  'bobinadora-e600-long': 'https://erasan.es/especiales/',
  'maquina-flyer': 'https://erasan.es/especiales/',
  encintadora: 'https://erasan.es/especiales/',
  bobifil: 'https://erasan.es/bobifil/',
  'kits-retrofit': 'https://erasan.es/kits-retrofit/',
}

// Keep curated local files when they are already correct.
const KEEP_LOCAL = {
  'bobinadora-strip-foil': ['CoilWinding/Folio/strip-foil-main.png', 'CoilWinding/Folio/strip-foil-2.png'],
  'tensionador-de-hilo-th3': [
    'Accesories/Tensionadores/tensionador-de-hilo-th3-main.png',
    'Accesories/Tensionadores/tensionador-de-hilo-th3-2.png',
  ],
  'tensionador-de-hilo-th3-is': [
    'Accesories/Tensionadores/tensionador-de-hilo-th3-is-main.png',
    'Accesories/Tensionadores/tensionador-de-hilo-th3-is-2.png',
  ],
  'tensionador-de-hilo-th3-d': [
    'Accesories/Tensionadores/tensionador-de-hilo-th3-main.png',
    'Accesories/Tensionadores/tensionador-de-hilo-th3-2.png',
  ],
  'tensionador-de-hilo-th3-standalone': [
    'Accesories/Tensionadores/th3StandAlonem.png',
    'Accesories/Tensionadores/th3StandAlone1m.png',
  ],
  'devanador-dp1r-ap1r': ['Accesories/Devanadores/DP1R-AP1R.png', 'Accesories/Devanadores/DP1R-AP1R-perfil.png'],
  'cabezal-bobinador-erasan-e1200-b': [
    'CoilWinding/Cabezales/cabezal-bobinador-erasan-e1200-c-main.png',
    'CoilWinding/Cabezales/cabezal-bobinador-erasan-e1200-c-2.png',
  ],
  'cabezal-bobinador-erasan-e1500-b': [
    'CoilWinding/Cabezales/cabezal-bobinador-erasan-e1200-c-sgb-main.png',
    'CoilWinding/Cabezales/cabezal-bobinador-erasan-e1200-c-sgb-2.png',
  ],
  'bobinadora-erasan-e300w': [
    'CoilWinding/DeBancoLineal/bobinadora-erasan-e300-main.png',
    'CoilWinding/DeBancoLineal/bobinadora-erasan-e300-2.png',
  ],
}

function getAssetFolder(product) {
  const sectionMap = SECTION_FOLDERS[product.section] || {}
  const categoryKey = product.categorySlug || 'default'
  return sectionMap[categoryKey] || sectionMap.default || product.section
}

function normalizeImageUrl(raw, pageUrl) {
  if (!raw) return null
  let url = raw.replace(/&amp;/g, '&').split(' ')[0]
  if (url.startsWith('//')) url = `https:${url}`
  if (url.startsWith('/')) url = new URL(url, pageUrl).href
  if (!url.startsWith('http')) return null
  return url.split('?')[0]
}

function stripSizeSuffix(url) {
  return url.replace(/-\d+x\d+(?=\.[a-z]{3,4}$)/i, '')
}

function isProductImage(url) {
  if (!url.includes('wp-content/uploads')) return false
  return !SKIP_PATTERNS.some((pattern) => pattern.test(url))
}

function extractImageUrls(html, pageUrl) {
  const urls = new Set()
  const patterns = [
    /<img[^>]+(?:src|data-src|data-lazy-src)=["']([^"']+)["']/gi,
    /srcset=["']([^"']+)["']/gi,
    /url\(["']?(https?:\/\/[^"')]+wp-content\/uploads[^"')]+)["']?\)/gi,
  ]

  for (const pattern of patterns) {
    for (const match of html.matchAll(pattern)) {
      const value = match[1]
      if (pattern.source.includes('srcset')) {
        value.split(',').forEach((part) => {
          const candidate = normalizeImageUrl(part.trim().split(/\s+/)[0], pageUrl)
          if (candidate && isProductImage(candidate)) urls.add(stripSizeSuffix(candidate))
        })
      } else {
        const candidate = normalizeImageUrl(value, pageUrl)
        if (candidate && isProductImage(candidate)) urls.add(stripSizeSuffix(candidate))
      }
    }
  }

  return [...urls].sort((a, b) => b.length - a.length)
}

async function downloadFile(url, destPath) {
  const response = await fetch(url, {
    headers: { 'User-Agent': 'ErasanTest/1.0 (product image sync)' },
  })
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`)
  const buffer = Buffer.from(await response.arrayBuffer())
  mkdirSync(dirname(destPath), { recursive: true })
  writeFileSync(destPath, buffer)
}

function pickExtension(url) {
  const ext = extname(new URL(url).pathname).toLowerCase()
  if (['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(ext)) return ext
  return '.jpg'
}

function slugifyVar(slug) {
  return slug.replace(/-/g, '_')
}

async function fetchProductImages(pageUrl) {
  const response = await fetch(pageUrl, {
    headers: { 'User-Agent': 'ErasanTest/1.0 (product image sync)' },
  })
  if (!response.ok) throw new Error(`Failed page ${pageUrl}: HTTP ${response.status}`)
  const html = await response.text()
  return extractImageUrls(html, pageUrl)
}

async function resolveLocalPaths(product) {
  const { slug } = product
  const folder = getAssetFolder(product)

  if (KEEP_LOCAL[slug]) {
    const paths = KEEP_LOCAL[slug].map((rel) => join(ASSETS_ROOT, rel))
    if (paths.every(existsSync)) return paths
  }

  const pageUrl = PAGE_URLS[slug]
  if (!pageUrl) throw new Error(`Missing page URL for ${slug}`)

  const mainName = `${slug}-main`
  const secondName = `${slug}-2`
  const existing = [join(ASSETS_ROOT, folder, `${mainName}.png`), join(ASSETS_ROOT, folder, `${mainName}.jpg`)]
    .concat([join(ASSETS_ROOT, folder, `${secondName}.png`), join(ASSETS_ROOT, folder, `${secondName}.jpg`)])
    .filter(existsSync)

  const mainPath =
    existing.find((p) => p.includes(`${mainName}.`)) ||
    join(ASSETS_ROOT, folder, `${mainName}.jpg`)
  const secondPath =
    existing.find((p) => p.includes(`${secondName}.`)) ||
    join(ASSETS_ROOT, folder, `${secondName}.jpg`)

  if (existsSync(mainPath) && (slug === 'bobifil' ? existsSync(secondPath) : true)) {
    return existsSync(secondPath) ? [mainPath, secondPath] : [mainPath]
  }

  const imageUrls = await fetchProductImages(pageUrl)
  if (imageUrls.length === 0) throw new Error(`no images found on ${pageUrl}`)

  const maxImages = slug === 'bobifil' ? 2 : Math.min(imageUrls.length, 2)
  const localPaths = []

  for (let i = 0; i < maxImages; i++) {
    const ext = pickExtension(imageUrls[i])
    const destPath = join(ASSETS_ROOT, folder, i === 0 ? `${mainName}${ext}` : `${secondName}${ext}`)
    if (!existsSync(destPath)) {
      await downloadFile(imageUrls[i], destPath)
    }
    localPaths.push(destPath)
  }

  return localPaths
}

async function main() {
  const registry = {}
  const importLines = []
  const report = { ok: [], failed: [] }

  for (const folder of new Set(Object.values(SECTION_FOLDERS).flatMap((m) => Object.values(m)))) {
    mkdirSync(join(ASSETS_ROOT, folder), { recursive: true })
  }

  for (const product of products) {
    const { slug } = product
    try {
      const localPaths = await resolveLocalPaths(product)
      const importNames = localPaths.map((absPath, index) => {
        const relFromData = absPath.replace(/\\/g, '/').split('/src/assets/')[1]
        const varName = `${slugifyVar(slug)}_${index}`
        importLines.push(`import ${varName} from '../assets/${relFromData}'`)
        return varName
      })
      registry[slug] = importNames
      report.ok.push(slug)
    } catch (error) {
      report.failed.push({ slug, reason: error.message })
    }
  }

  const registryBody = Object.entries(registry)
    .map(([slug, vars]) => `  '${slug}': [${vars.join(', ')}],`)
    .join('\n')

  writeFileSync(
    OUTPUT_REGISTRY,
    `${importLines.join('\n')}

export const PRODUCT_GALLERY_IMAGES = {
${registryBody}
}

export function getProductGalleryImage(slug, index = 0) {
  return PRODUCT_GALLERY_IMAGES[slug]?.[index] || null
}
`,
    'utf8'
  )

  console.log(`OK: ${report.ok.length}`)
  console.log(`Failed: ${report.failed.length}`)
  if (report.failed.length) console.log(JSON.stringify(report.failed, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
