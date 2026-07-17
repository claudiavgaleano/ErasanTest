import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { translateRichAccessoryEntry } from './product-en-translator.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const erasanContent = JSON.parse(
  readFileSync(path.join(root, 'src/data/erasan-content.json'), 'utf8')
)
const esLocalePath = path.join(root, 'src/i18n/locales/es.json')
const enLocalePath = path.join(root, 'src/i18n/locales/en.json')
const esLocale = JSON.parse(readFileSync(esLocalePath, 'utf8'))
const enLocale = JSON.parse(readFileSync(enLocalePath, 'utf8'))

const TH3_HERO_SUBTITLE =
  'Tensionador con freno magnético para hilos con un diámetro de 0.50 mm a 3.00mm.'

const TH3_BRAND_BODY = [
  'La tensión del hilo se ajusta gracias al freno magnético que proporciona una tensión constante durante el proceso de bobinado.',
  'El hilo entra en el tensionador a través de un ojal cerámico y una polea de entrada.',
  'Este diseño de entrada permite emplear los carretes de hilo montados en lecheras o devanadores, porque el ojal cerámico se monta sobre una pieza basculante adaptándose al camino natural del hilo cuando sale del carrete.',
  'La regulación del freno se realiza por potenciómetro o por pantalla.',
].join('\n\n')

const STANDALONE_EXTRA = 'En esta versión el tensionador se monta sobre una bancada.'
const MOUNTED_EXTRA = 'En esta versión el tensionador se monta directamente sobre la bobinadora.'

const TAGLINE = 'La clave del bobinado se encuentra en aplicar la correcta tensión y guiado'

const ACCESSORY_IMAGE_KEYS = {
  'Detector de hilo': 'detector-de-hilo',
  Encoder: 'encoder',
}

const STANDARD_ACCESSORIES = [
  {
    title: 'Detector de hilo',
    description: 'Detector que para la máquina en caso de rotura de hilo.',
    imageKey: 'detector-de-hilo',
  },
  {
    title: 'Encoder',
    description:
      'Sistema que contabiliza las vueltas de la polea principal. Permite conocer el consumo de hilo.',
    imageKey: 'encoder',
  },
]

function getBrandBody(slug) {
  if (slug === 'tensionador-de-hilo-th3-standalone') {
    return [
      'La tensión del hilo se ajusta gracias al freno magnético que proporciona una tensión constante durante el proceso de bobinado.',
      'El hilo entra en el tensionador a través de un ojal cerámico y una polea de entrada.',
      'Este diseño de entrada permite emplear los carretes de hilo montados en lecheras o devanadores, porque el ojal cerámico se monta sobre una pieza basculante adaptándose al camino natural del hilo cuando sale del carrete.',
      STANDALONE_EXTRA,
      'La regulación del freno se realiza por potenciómetro o por pantalla.',
    ].join('\n\n')
  }
  if (slug === 'tensionador-de-hilo-th3-d') {
    return [
      'La tensión del hilo se ajusta gracias al freno magnético que proporciona una tensión constante durante el proceso de bobinado.',
      'El hilo entra en el tensionador a través de un ojal cerámico y una polea de entrada.',
      'Este diseño de entrada permite emplear los carretes de hilo montados en lecheras o devanadores, porque el ojal cerámico se monta sobre una pieza basculante adaptándose al camino natural del hilo cuando sale del carrete.',
      MOUNTED_EXTRA,
      'La regulación del freno se realiza por potenciómetro o por pantalla.',
    ].join('\n\n')
  }
  if (slug.startsWith('tensionador-de-hilo-th3')) {
    return TH3_BRAND_BODY
  }
  return ''
}

function getCharacteristicsBody(slug) {
  const labels = {
    'tensionador-de-hilo-th3-standalone': 'tensionador de hilo TH3 StandAlone',
    'tensionador-de-hilo-th3-is': 'tensionador de hilo TH3 IS',
    'tensionador-de-hilo-th3-d': 'tensionador de hilo TH3 D',
    'tensionador-de-hilo-th3': 'tensionador de hilo TH3',
  }
  const label = labels[slug]
  return label ? `Descubre las especificaciones del ${label}.` : ''
}

function getBrandTitle(slug) {
  const titles = {
    'tensionador-de-hilo-th3-standalone': 'Características ERASAN TH3 StandAlone',
    'tensionador-de-hilo-th3-is': 'Características ERASAN TH3 IS',
    'tensionador-de-hilo-th3-d': 'Características ERASAN TH3 D',
    'tensionador-de-hilo-th3': 'Características ERASAN TH3',
  }
  return titles[slug] || ''
}

function buildAccessoryEntry(source) {
  const slug = source.slug
  const title = source.title
  const headings = source.headings || []
  const brandIdx = headings.findIndex((heading) => heading.startsWith('Características ERASAN'))
  const heroSubtitle = headings[1] || TH3_HERO_SUBTITLE

  const accessoryItems = []
  if (brandIdx >= 0) {
    for (let index = brandIdx + 1; index < headings.length - 1; index += 2) {
      const itemTitle = headings[index]
      const description = headings[index + 1]
      if (!itemTitle || itemTitle.startsWith('"') || itemTitle.includes('La clave del bobinado')) break
      accessoryItems.push({
        title: itemTitle,
        description: description || '',
        imageKey: ACCESSORY_IMAGE_KEYS[itemTitle] || '',
      })
    }
  }

  const taglineHeading = headings.find((heading) => heading.includes('La clave del bobinado'))
  const tagline = taglineHeading?.replace(/^"|"$/g, '') || TAGLINE
  const brandTitle = brandIdx >= 0 ? headings[brandIdx] : getBrandTitle(slug)
  const characteristicsBody = getCharacteristicsBody(slug)
  const brandBody = getBrandBody(slug)
  const items = accessoryItems.length ? accessoryItems : STANDARD_ACCESSORIES

  if (!brandTitle && !characteristicsBody && !items.length) {
    return null
  }

  return {
    title,
    heroSubtitle,
    excerpt: heroSubtitle,
    heroIntro: [],
    gallery: [{ caption: title }, { caption: `${title} — lateral` }],
    characteristics: characteristicsBody
      ? { title: 'Características', body: characteristicsBody }
      : null,
    brandFeatures: brandTitle
      ? { title: brandTitle, body: brandBody, items: [] }
      : null,
    productAccessories: items.length ? { title: 'Accesorios', items } : null,
    tagline,
    content: '',
    features: [],
    section: 'accessories',
  }
}

const sourceProducts = erasanContent.pages?.accessories?.products || []
const esItems = esLocale.productCatalog.items
const enItems = enLocale.productCatalog.items

for (const source of sourceProducts) {
  if (!source.slug.startsWith('tensionador-de-hilo-th3')) continue
  const entry = buildAccessoryEntry(source)
  if (entry) {
    esItems[source.slug] = entry
    enItems[source.slug] = translateRichAccessoryEntry(entry)
  }
}

writeFileSync(esLocalePath, `${JSON.stringify(esLocale, null, 2)}\n`, 'utf8')
writeFileSync(enLocalePath, `${JSON.stringify(enLocale, null, 2)}\n`, 'utf8')
console.log('Updated TH3 tensionador accessory layouts in es.json and en.json')
