import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUTPUT_PATH = join(__dirname, '../src/data/erasan-content.json')
const BASE_URL = 'https://erasan.es'

const NAV_NOISE_PATTERNS = [
  /^máquinas bobinadoras/i,
  /^accesorios/i,
  /^retrofit/i,
  /^contacto$/i,
  /^blog$/i,
  /^idiomas$/i,
  /^menú$/i,
  /^banco lineal$/i,
  /^cabezal bobinador$/i,
  /^folio$/i,
  /^especiales$/i,
  /^tensionadores$/i,
  /^guiadores$/i,
  /^devanadores$/i,
  /^mandriles expandibles$/i,
  /^dispensadores$/i,
  /^kits retrofit$/i,
  /^reparaciones$/i,
  /^bobifil$/i,
]

const FOOTER_BOILERPLATE = new Set([
  'BOBINADORAS',
  'Accesorios',
  'retrofit',
  'CONTACTA',
  'De banco lineal',
  'Cabezal bobinador',
  'Máquinas folio',
  'Proyectos especiales',
  'Tensionadores',
  'Guiadores',
  'Devanadores',
  'Mandriles expandibles',
  'Dispensadores',
  'Bobifil',
  'Kits de retrofit',
  'Reparaciones',
  'Bobinadoras usadas',
  '+34 961 98 63 73',
  'info@erasan.es',
  'Ronda Auguste y Louis Lumiere 45, 46980 - Paterna Valencia (España)',
  'Ronda Auguste y Louis Lumiere 45, 46980 - PaternaValencia (España)',
  'ERASAN TECHNOLOGY',
  'Menú',
  'Saltar al contenido',
  'Search for:',
  'Recent Comments',
])

function isNoiseText(text) {
  if (!text) return true
  if (FOOTER_BOILERPLATE.has(text)) return true
  if (text.length < 20 && !/\d/.test(text)) {
    return NAV_NOISE_PATTERNS.some((pattern) => pattern.test(text))
  }
  return NAV_NOISE_PATTERNS.some((pattern) => pattern.test(text))
}

const CATEGORY_MAP = {
  home: ['home'],
  coilWindingMachines: {
    overview: ['maquinas-bobinadoras'],
    categories: ['banco-lineal', 'cabezal-bobinador', 'folio', 'especiales'],
    products: (slug) => slug.startsWith('bobinadora-') || slug === 'bobinadora-strip-foil',
  },
  accessories: {
    overview: ['accesorios'],
    categories: ['tensionadores', 'guiadores', 'devanadores', 'mandriles-expandibles', 'dispensadores'],
    products: (slug) =>
      slug.startsWith('tensionador-') ||
      slug.startsWith('guiador-') ||
      slug.startsWith('devanador-') ||
      slug.startsWith('mandril-') ||
      slug.startsWith('dispensador-'),
  },
  retrofit: {
    overview: ['retrofit'],
    categories: ['bobifil', 'kits-retrofit', 'reparaciones'],
    products: () => false,
  },
  usedMachines: ['exitos'],
  blog: ['blog'],
  english: ['home-english'],
}

function decodeHtml(text = '') {
  return text
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/&#8211;/g, '–')
    .replace(/&#8217;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8230;/g, '...')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function stripHtml(html = '') {
  return decodeHtml(html)
}

function uniqueTexts(items) {
  const seen = new Set()
  return items.filter((item) => {
    const key = item.toLowerCase()
    if (!item || seen.has(key) || isNoiseText(item)) return false
    seen.add(key)
    return true
  })
}

function extractTexts(html = '') {
  const headings = uniqueTexts(
    [...html.matchAll(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gis)].map((match) => stripHtml(match[1]))
  )

  const paragraphs = uniqueTexts(
    [...html.matchAll(/<p[^>]*>(.*?)<\/p>/gis)]
      .map((match) => stripHtml(match[1]))
      .filter((text) => text.length > 2)
  )

  const listItems = uniqueTexts(
    [...html.matchAll(/<li[^>]*>(.*?)<\/li>/gis)]
      .map((match) => stripHtml(match[1]))
      .filter((text) => text.length > 2)
  )

  const elementorHeadings = uniqueTexts(
    [...html.matchAll(/elementor-heading-title[^>]*>(.*?)<\//gis)].map((match) => stripHtml(match[1]))
  )

  const elementorTexts = uniqueTexts(
    [...html.matchAll(/elementor-widget-text-editor[\s\S]*?<div class="elementor-widget-container">([\s\S]*?)<\/div>/gi)]
      .map((match) => stripHtml(match[1]))
      .filter((text) => text.length > 10)
  )

  const allParagraphs = uniqueTexts([...paragraphs, ...elementorTexts, ...listItems])

  return {
    headings: uniqueTexts([...headings, ...elementorHeadings]),
    paragraphs: allParagraphs,
    listItems,
  }
}

function classifyPage(slug) {
  if (CATEGORY_MAP.home.includes(slug)) return { section: 'home', type: 'page' }
  if (CATEGORY_MAP.english.includes(slug)) return { section: 'english', type: 'page' }
  if (CATEGORY_MAP.usedMachines.includes(slug)) return { section: 'usedMachines', type: 'page' }
  if (CATEGORY_MAP.blog.includes(slug)) return { section: 'blog', type: 'overview' }

  for (const [section, config] of Object.entries(CATEGORY_MAP)) {
    if (!config.overview) continue
    if (config.overview.includes(slug)) return { section, type: 'overview' }
    if (config.categories?.includes(slug)) return { section, type: 'category' }
    if (config.products?.(slug)) return { section, type: 'product' }
  }

  return { section: 'other', type: 'page' }
}

function normalizePage(page) {
  const slug = page.slug
  const title = stripHtml(page.title?.rendered || '')
  const excerpt = stripHtml(page.excerpt?.rendered || '')
  const texts = extractTexts(page.content?.rendered || '')
  const classification = classifyPage(slug)

  return {
    id: page.id,
    slug,
    url: page.link || `${BASE_URL}/${slug}/`,
    title,
    excerpt,
    headings: texts.headings,
    paragraphs: texts.paragraphs,
    listItems: texts.listItems,
    section: classification.section,
    type: classification.type,
    modified: page.modified,
  }
}

function normalizePost(post) {
  const texts = extractTexts(post.content?.rendered || '')

  return {
    id: post.id,
    slug: post.slug,
    url: post.link,
    title: stripHtml(post.title?.rendered || ''),
    excerpt: stripHtml(post.excerpt?.rendered || ''),
    date: post.date,
    headings: texts.headings,
    paragraphs: texts.paragraphs,
    listItems: texts.listItems,
  }
}

async function fetchJson(path) {
  const response = await fetch(`${BASE_URL}${path}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status}`)
  }
  return response.json()
}

function groupPages(pages) {
  const grouped = {
    home: null,
    english: null,
    usedMachines: null,
    coilWindingMachines: { overview: null, categories: [], products: [] },
    accessories: { overview: null, categories: [], products: [] },
    retrofit: { overview: null, categories: [], products: [] },
    blog: { overview: null },
    other: [],
  }

  for (const page of pages) {
    const { section, type } = page

    if (section === 'home') {
      grouped.home = page
      continue
    }

    if (section === 'english') {
      grouped.english = page
      continue
    }

    if (section === 'usedMachines') {
      grouped.usedMachines = page
      continue
    }

    if (section === 'blog' && type === 'overview') {
      grouped.blog.overview = page
      continue
    }

    if (grouped[section] && typeof grouped[section] === 'object') {
      if (type === 'overview') grouped[section].overview = page
      else if (type === 'category') grouped[section].categories.push(page)
      else if (type === 'product') grouped[section].products.push(page)
      else grouped.other.push(page)
      continue
    }

    grouped.other.push(page)
  }

  return grouped
}

async function main() {
  const [pages, posts] = await Promise.all([
    fetchJson('/wp-json/wp/v2/pages?per_page=100&_fields=id,slug,link,title,excerpt,content,modified'),
    fetchJson('/wp-json/wp/v2/posts?per_page=100&_fields=id,slug,link,title,excerpt,content,date'),
  ])

  const normalizedPages = pages.map(normalizePage)
  const normalizedPosts = posts.map(normalizePost)

  const output = {
    meta: {
      source: BASE_URL,
      extractedAt: new Date().toISOString(),
      primaryLanguage: 'es',
      pageCount: normalizedPages.length,
      postCount: normalizedPosts.length,
    },
    contact: {
      phone: '+34 961 98 63 73',
      email: 'info@erasan.es',
      address: 'Ronda Auguste y Louis Lumiere 45, 46980 - Paterna, Valencia (España)',
    },
    navigation: [
      {
        label: 'Máquinas bobinadoras',
        path: '/maquinas-bobinadoras',
        children: [
          { label: 'Banco lineal', path: '/banco-lineal' },
          { label: 'Cabezal bobinador', path: '/cabezal-bobinador' },
          { label: 'Folio', path: '/folio' },
          { label: 'Especiales', path: '/especiales' },
        ],
      },
      {
        label: 'Accesorios',
        path: '/accesorios',
        children: [
          { label: 'Tensionadores', path: '/tensionadores' },
          { label: 'Guiadores', path: '/guiadores' },
          { label: 'Devanadores', path: '/devanadores' },
          { label: 'Mandriles expandibles', path: '/mandriles-expandibles' },
          { label: 'Dispensadores', path: '/dispensadores' },
        ],
      },
      {
        label: 'Retrofit',
        path: '/retrofit',
        children: [
          { label: 'BOBIFIL', path: '/bobifil' },
          { label: 'KITS RETROFIT', path: '/kits-retrofit' },
          { label: 'REPARACIONES', path: '/reparaciones' },
        ],
      },
      { label: 'Bobinadoras usadas', path: '/exitos' },
      { label: 'Contacto', path: '/contacto' },
      { label: 'Blog', path: '/blog' },
    ],
    pages: groupPages(normalizedPages),
    blogPosts: normalizedPosts,
    allPages: normalizedPages,
  }

  writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), 'utf8')
  console.log(`Wrote ${OUTPUT_PATH}`)
  console.log(`Pages: ${normalizedPages.length}, Posts: ${normalizedPosts.length}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
