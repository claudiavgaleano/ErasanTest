import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import {
  translateProductItem,
  translateCategoryDescription,
} from './product-item-en-translator.mjs'
import { translateText, translateTitle } from './product-en-translator.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const ES_PATH = join(ROOT, 'src/i18n/locales/es.json')
const EN_PATH = join(ROOT, 'src/i18n/locales/en.json')
const EN_REF_PATH = join(__dirname, 'en-reference.json')

const CATEGORY_NAME_MAP = {
  'Bobinadoras de banco lineal': 'Linear bench winders',
  'Cabezal bobinador': 'Winding head',
  'Máquina folio': 'Foil machine',
  Tensionadores: 'Wire tensioners',
  Devanadores: 'Dereelers',
  Guiadores: 'Wire guides',
  'Mandriles expandibles': 'Expandable mandrels',
  'Dispensadores de papel': 'Paper dispensers',
  'Proyectos Especiales': 'Special Projects',
  Retrofit: 'Retrofit',
}

const NEW_UI_TRANSLATIONS = {
  'nav.coilWinding': 'Coil Winding Machines',
  'nav.specialProjects': 'Special Projects',
  'nav.accesories': 'Accessories',
  'home.heroTitle1': 'Winding',
  'home.heroTitle2': 'Machines',
  'home.heroTitle3': '',
  'accesories.heroTitle1': 'Accessories',
  'accesories.heroTitle2': 'for our machines',
  'accesories.heroDescription':
    'Discover our complete range of accessories for our winding machines, from manual machine add-ons to fully automated production line accessories.',
  'retrofit.heroTitle1': 'Winding Machine',
  'retrofit.heroTitle2': 'Retrofit',
  'retrofit.heroDescription':
    'We modernize and restore winding machines from any manufacturer. We study each machine to offer the best retrofit solution.',
  'retrofit.bannerTitle': 'Retrofit for any winding machine',
  'retrofit.bannerSubtitle':
    'Regardless of the manufacturer or machine condition, we will study all possibilities',
  'retrofit.ctaTitle': 'Want to modernize your winding machine?',
  'retrofit.ctaDescription':
    'Contact our team and we will study all retrofit possibilities for your machine, regardless of manufacturer or condition.',
  'specialProjects.heroDescription':
    'Custom winding solutions for special applications: flyer machines, taping machines, and extended configurations such as the E600 LONG.',
  'specialProjects.ctaTitle': 'Need a custom solution?',
  'specialProjects.ctaDescription':
    'We specialize in custom machinery manufacturing. Contact us and we will develop the project according to your requirements.',
  'productCatalog.specialProjects.description':
    'We specialize in custom machinery manufacturing. Contact us and we will develop the project according to your requirements.',
  'productCatalog.retrofit.description':
    'Retrofit for any winding machine. Regardless of the manufacturer or machine condition, we will study all possibilities.',
}

function loadJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'))
}

function saveJson(path, data) {
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

function getPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), obj)
}

function clone(value) {
  return JSON.parse(JSON.stringify(value))
}

function translateLeaf(path, esValue, refValue) {
  if (typeof esValue !== 'string') return esValue
  if (NEW_UI_TRANSLATIONS[path]) return NEW_UI_TRANSLATIONS[path]

  const listingPaths = ['specialProjects', 'retrofit']
  const listingKey = path.split('.').pop()
  if (listingPaths.some((section) => path.startsWith(`${section}.`))) {
    const productsRef = getPath(enRefForListing, `products.${listingKey}`)
    if (typeof productsRef === 'string' && productsRef.trim()) return productsRef
  }

  if (typeof refValue === 'string' && refValue.trim()) return refValue
  return translateText(esValue)
}

let enRefForListing = null

function mergeEsIntoEn(esNode, refNode, path = '') {
  if (Array.isArray(esNode)) {
    return esNode.map((item, index) => mergeEsIntoEn(item, refNode?.[index], `${path}.${index}`))
  }

  if (esNode && typeof esNode === 'object') {
    const result = {}
    for (const [key, esValue] of Object.entries(esNode)) {
      const childPath = path ? `${path}.${key}` : key
      if (childPath === 'productCatalog') continue
      result[key] = mergeEsIntoEn(esValue, refNode?.[key], childPath)
    }
    return result
  }

  return translateLeaf(path, esNode, refNode)
}

function translateProductCatalog(catalog, refCatalog = {}) {
  const result = clone(refCatalog)

  for (const section of ['coilWinding', 'accessories']) {
    const esCategories = catalog?.[section]?.categories || {}
    result[section] = {
      ...(refCatalog?.[section] || {}),
      categories: Object.fromEntries(
        Object.entries(esCategories).map(([key, category]) => [
          key,
          {
            name: CATEGORY_NAME_MAP[category.name] || category.name,
            description: translateCategoryDescription(category.description),
          },
        ])
      ),
    }
  }

  if (catalog?.specialProjects) {
    result.specialProjects = {
      title: 'Special Projects',
      description: translateText(catalog.specialProjects.description),
    }
  }

  if (catalog?.retrofit) {
    result.retrofit = {
      title: 'Retrofit',
      description:
        NEW_UI_TRANSLATIONS['productCatalog.retrofit.description'] ||
        translateText(catalog.retrofit.description),
    }
  }

  result.items = Object.fromEntries(
    Object.entries(catalog?.items || {}).map(([key, item]) => [
      key,
      translateProductItem(item, {
        titleOverride: translateTitle(item.title),
        refItem: refCatalog?.items?.[key],
      }),
    ])
  )

  return result
}

function pruneToStructure(source, translated) {
  if (Array.isArray(source)) {
    return source.map((item, index) => pruneToStructure(item, translated?.[index]))
  }
  if (source && typeof source === 'object') {
    return Object.fromEntries(
      Object.keys(source).map((key) => [key, pruneToStructure(source[key], translated?.[key])])
    )
  }
  return translated
}

function syncEnFromEs() {
  const es = loadJson(ES_PATH)
  const enRef = loadJson(EN_REF_PATH)
  enRefForListing = enRef
  const en = pruneToStructure(es, mergeEsIntoEn(es, enRef))
  en.productCatalog = translateProductCatalog(es.productCatalog, enRef.productCatalog)
  en.productCatalog.items = Object.fromEntries(
    Object.entries(es.productCatalog.items).map(([key, esItem]) => [
      key,
      pruneToStructure(esItem, en.productCatalog.items[key]),
    ])
  )
  const pruned = pruneToStructure(es, en)
  saveJson(EN_PATH, pruned)
  console.log(`Translated ${Object.keys(en.productCatalog.items).length} products`)
  console.log(`Saved ${EN_PATH}`)
}

syncEnFromEs()
