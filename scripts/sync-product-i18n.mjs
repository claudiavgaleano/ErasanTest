import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import {
  translateProductItem,
  translateCategoryDescription,
  translateText,
  translateTitle,
} from './product-en-translator.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const EN_PATH = join(ROOT, 'src/i18n/locales/en.json')
const ES_PATH = join(ROOT, 'src/i18n/locales/es.json')
const PRODUCTS_PATH = join(ROOT, 'src/data/products.js')

function loadJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'))
}

function saveJson(path, data) {
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

function loadProductI18nKeys() {
  const source = readFileSync(PRODUCTS_PATH, 'utf8')
  const keys = [...source.matchAll(/"i18nKey":\s*"([^"]+)"/g)].map((match) => match[1])
  return [...new Set(keys)]
}

function getEnglishTitle(esItem) {
  return translateTitle(esItem.title)
}

const es = loadJson(ES_PATH)
const en = loadJson(EN_PATH)
const productKeys = loadProductI18nKeys()

const esItems = es.productCatalog?.items || {}
const enItems = en.productCatalog?.items || {}

for (const key of productKeys) {
  const esItem = esItems[key]

  if (!esItem) {
    console.warn(`Missing Spanish catalog entry for: ${key}`)
    continue
  }

  enItems[key] = translateProductItem(esItem, {
    titleOverride: getEnglishTitle(esItem),
  })
}

for (const section of ['coilWinding', 'accessories']) {
  const esCategories = es.productCatalog?.[section]?.categories || {}
  const enCategories = en.productCatalog?.[section]?.categories || {}

  for (const [categoryKey, esCategory] of Object.entries(esCategories)) {
    enCategories[categoryKey] = {
      name: enCategories[categoryKey]?.name || esCategory.name,
      description: translateCategoryDescription(esCategory.description),
    }
  }

  en.productCatalog[section].categories = enCategories
}

if (es.productCatalog?.retrofit) {
  en.productCatalog.retrofit = {
    title: es.productCatalog.retrofit.title,
    description: translateText(es.productCatalog.retrofit.description),
  }
}

en.productCatalog.items = enItems
saveJson(EN_PATH, en)

console.log(`Synced English product catalog for ${productKeys.length} products`)
