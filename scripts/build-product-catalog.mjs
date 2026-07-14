import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import {
  translateProductItem,
  translateCategoryDescription,
  translateText,
} from './product-en-translator.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const ERASAN_PATH = join(ROOT, 'src/data/erasan-content.json')
const PRODUCTS_PATH = join(ROOT, 'src/data/products.js')
const CATEGORIES_PATH = join(ROOT, 'src/data/categories.js')
const EN_PATH = join(ROOT, 'src/i18n/locales/en.json')
const ES_PATH = join(ROOT, 'src/i18n/locales/es.json')

const erasan = JSON.parse(readFileSync(ERASAN_PATH, 'utf8'))

const COIL_CATEGORIES = [
  { id: 1, slug: 'banco-lineal', i18nKey: 'bancoLineal', sourceSlug: 'banco-lineal', displayNameEs: 'Bobinadoras de banco lineal', displayNameEn: 'Linear bench winders' },
  { id: 2, slug: 'cabezal-bobinador', i18nKey: 'cabezalBobinador', sourceSlug: 'cabezal-bobinador', displayNameEs: 'Cabezal bobinador', displayNameEn: 'Winding head' },
  { id: 3, slug: 'maquina-folio', i18nKey: 'maquinaFolio', sourceSlug: 'folio', displayNameEs: 'Máquina folio', displayNameEn: 'Foil machine' },
]

const ACCESSORY_CATEGORIES = [
  { id: 4, slug: 'tensionadores', i18nKey: 'tensionadores', sourceSlug: 'tensionadores', displayNameEs: 'Tensionadores', displayNameEn: 'Wire tensioners' },
  { id: 5, slug: 'devanadores', i18nKey: 'devanadores', sourceSlug: 'devanadores', displayNameEs: 'Devanadores', displayNameEn: 'Dereelers' },
  { id: 6, slug: 'guiadores', i18nKey: 'guiadores', sourceSlug: 'guiadores', displayNameEs: 'Guiadores', displayNameEn: 'Wire guides' },
  { id: 7, slug: 'mandriles-expandibles', i18nKey: 'mandrilesExpandibles', sourceSlug: 'mandriles-expandibles', displayNameEs: 'Mandriles expandibles', displayNameEn: 'Expandable mandrels' },
  { id: 8, slug: 'dispensadores-de-papel', i18nKey: 'dispensadoresPapel', sourceSlug: 'dispensadores', displayNameEs: 'Dispensadores de papel', displayNameEn: 'Paper dispensers' },
]

function findPage(slug) {
  return erasan.allPages.find((page) => page.slug === slug)
}

function getMeaningfulParagraphs(page) {
  return (page?.paragraphs || []).filter((text) => text.length > 30)
}

function getFeatures(page) {
  const headings = page?.headings || []
  const startIndex = headings.findIndex((heading) => /características/i.test(heading))
  if (startIndex === -1) return headings.slice(1, 6)
  return headings.slice(startIndex + 1).filter((heading) => !/características/i.test(heading)).slice(0, 8)
}

function getCoilCategorySlug(page) {
  const productSlug = page.slug
  if (productSlug === 'bobinadora-folio' || productSlug === 'bobinadora-strip-foil') return 'maquina-folio'
  if (page.url?.includes('/cabezal-bobinador/')) return 'cabezal-bobinador'
  return 'banco-lineal'
}

function getAccessoryCategorySlug(productSlug) {
  if (productSlug.startsWith('tensionador-')) return 'tensionadores'
  if (productSlug.startsWith('devanador-')) return 'devanadores'
  if (productSlug.startsWith('guiador-')) return 'guiadores'
  if (productSlug.startsWith('mandril-expandible')) return 'mandriles-expandibles'
  if (productSlug.startsWith('dispensador-')) return 'dispensadores-de-papel'
  return null
}

function buildLocalizedItem(page, section) {
  const paragraphs = getMeaningfulParagraphs(page)
  const features = getFeatures(page)
  const title = page.title || page.headings?.[0] || page.slug
  const excerpt = paragraphs[0] || page.excerpt || title
  const content = paragraphs.join('\n\n')

  return {
    title,
    excerpt,
    content,
    features,
    section,
  }
}

function getCategoryDescription(page) {
  const headings = (page?.headings || []).filter(
    (heading) =>
      heading.length > 40 &&
      !/500 fabricantes/i.test(heading) &&
      !/ERASAN TECHNOLOGY/i.test(heading) &&
      !/¿Conoces nuestras/i.test(heading)
  )
  return headings[0] || getMeaningfulParagraphs(page)[0] || ''
}

function buildCategoryTranslations(section, categories, sourceResolver) {
  const result = {}
  for (const category of categories) {
    const source = sourceResolver(category)
    result[category.i18nKey] = {
      name: category.displayNameEs,
      description: getCategoryDescription(source),
    }
  }
  return result
}

function buildCatalogTranslations() {
  const coilEs = buildCategoryTranslations('coilWinding', COIL_CATEGORIES, (cat) => findPage(cat.sourceSlug))
  const coilEn = Object.fromEntries(
    COIL_CATEGORIES.map((cat) => [
      cat.i18nKey,
      {
        name: cat.displayNameEn,
        description: translateCategoryDescription(coilEs[cat.i18nKey].description),
      },
    ])
  )

  const accessoriesEs = {}
  const accessoriesEn = {}

  for (const category of ACCESSORY_CATEGORIES) {
    const source = findPage(category.sourceSlug) || findPage(category.slug)
    accessoriesEs[category.i18nKey] = {
      name: category.displayNameEs,
      description: getCategoryDescription(source),
    }
    accessoriesEn[category.i18nKey] = {
      name: category.displayNameEn,
      description: translateCategoryDescription(accessoriesEs[category.i18nKey].description),
    }
  }

  const retrofitPage = findPage('retrofit')
  const retrofitLocalized = buildLocalizedItem(retrofitPage, 'retrofit')

  const itemsEs = {}
  const itemsEn = {}

  for (const page of erasan.pages.coilWindingMachines.products) {
    itemsEs[page.slug] = buildLocalizedItem(page, 'coilWinding')
    itemsEn[page.slug] = translateProductItem(itemsEs[page.slug])
  }

  for (const page of erasan.pages.accessories.products) {
    itemsEs[page.slug] = buildLocalizedItem(page, 'accessories')
    itemsEn[page.slug] = translateProductItem(itemsEs[page.slug])
  }

  itemsEs.retrofit = retrofitLocalized
  itemsEn.retrofit = translateProductItem({
    title: 'Retrofit',
    excerpt: translateText(retrofitLocalized.excerpt),
    content: translateText(retrofitLocalized.content),
    features: retrofitLocalized.features,
    section: 'retrofit',
  })

  return {
    es: {
      coilWinding: { categories: coilEs },
      accessories: { categories: accessoriesEs },
      retrofit: {
        title: retrofitPage?.title || 'Retrofit',
        description: retrofitLocalized.excerpt,
      },
      items: itemsEs,
    },
    en: {
      coilWinding: { categories: coilEn },
      accessories: { categories: accessoriesEn },
      retrofit: {
        title: 'Retrofit',
        description: translateText(retrofitLocalized.excerpt),
      },
      items: itemsEn,
    },
  }
}

function createProductRecord({ id, slug, section, categorySlug, categoryId, features = [] }) {
  return {
    id,
    slug,
    section,
    categorySlug,
    categoryId,
    i18nKey: slug,
    acf: { features },
  }
}

function buildProducts() {
  const products = []
  let id = 1

  for (const page of erasan.pages.coilWindingMachines.products) {
    const categorySlug = getCoilCategorySlug(page)
    const category = COIL_CATEGORIES.find((cat) => cat.slug === categorySlug)
    products.push(
      createProductRecord({
        id: id++,
        slug: page.slug,
        section: 'coilWinding',
        categorySlug,
        categoryId: category.id,
        features: getFeatures(page),
      })
    )
  }

  for (const page of erasan.pages.accessories.products) {
    const categorySlug = getAccessoryCategorySlug(page.slug)
    const category = ACCESSORY_CATEGORIES.find((cat) => cat.slug === categorySlug)
    products.push(
      createProductRecord({
        id: id++,
        slug: page.slug,
        section: 'accessories',
        categorySlug,
        categoryId: category.id,
        features: getFeatures(page),
      })
    )
  }

  const retrofitPage = findPage('retrofit')
  products.push(
    createProductRecord({
      id: id++,
      slug: 'retrofit',
      section: 'retrofit',
      categorySlug: null,
      categoryId: null,
      features: getFeatures(retrofitPage),
    })
  )

  return products
}

function writeProductsFile(products) {
  const content = `// Auto-generated from erasan-content.json. Run: node scripts/build-product-catalog.mjs

export const PRODUCT_SECTIONS = {
  coilWinding: 'coilWinding',
  accessories: 'accessories',
  retrofit: 'retrofit',
}

export const products = ${JSON.stringify(products, null, 2)}
`
  writeFileSync(PRODUCTS_PATH, content, 'utf8')
}

function writeCategoriesFile() {
  const content = `// Auto-generated from erasan-content.json. Run: node scripts/build-product-catalog.mjs

export const blogCategories = [
  { id: 1, name: 'Industry News', slug: 'industry-news' },
  { id: 2, name: 'Technology', slug: 'technology' },
  { id: 3, name: 'Technical', slug: 'technical' },
  { id: 4, name: 'Guides', slug: 'guides' },
]

export const coilWindingCategories = ${JSON.stringify(COIL_CATEGORIES, null, 2)}

export const accessoriesCategories = ${JSON.stringify(ACCESSORY_CATEGORIES, null, 2)}

export const categoriesBySection = {
  coilWinding: coilWindingCategories,
  accessories: accessoriesCategories,
  retrofit: [],
}
`
  writeFileSync(CATEGORIES_PATH, content, 'utf8')
}

function mergeCatalogIntoLocale(path, catalog) {
  const locale = JSON.parse(readFileSync(path, 'utf8'))
  locale.productCatalog = catalog
  writeFileSync(path, `${JSON.stringify(locale, null, 2)}\n`, 'utf8')
}

const products = buildProducts()
const translations = buildCatalogTranslations()

writeProductsFile(products)
writeCategoriesFile()
mergeCatalogIntoLocale(EN_PATH, translations.en)
mergeCatalogIntoLocale(ES_PATH, translations.es)

console.log(`Built ${products.length} products`)
console.log(`Coil winding categories: ${COIL_CATEGORIES.length}`)
console.log(`Accessory categories: ${ACCESSORY_CATEGORIES.length}`)
