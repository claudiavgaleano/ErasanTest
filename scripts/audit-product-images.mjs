import { readFileSync } from 'node:fs'
import { products } from '../src/data/products.js'
import { PRODUCT_GALLERY_IMAGES } from '../src/data/productGalleryImages.js'

const en = JSON.parse(readFileSync('src/i18n/locales/en.json', 'utf8'))

for (const product of products) {
  const slug = product.slug
  const assets = PRODUCT_GALLERY_IMAGES[slug]?.length || 0
  const i18nGallery = en.productCatalog.items[slug]?.gallery?.length || 0
  const highlightIndex = en.productCatalog.items[slug]?.highlight?.imageIndex

  if (assets < 2 || i18nGallery < 2) {
    console.log(`${slug}: assets=${assets}, i18nGallery=${i18nGallery}, highlightIndex=${highlightIndex}`)
  }
}
