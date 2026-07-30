import { readFileSync, writeFileSync } from 'node:fs'
import { products } from '../src/data/products.js'

const registrySource = readFileSync('src/data/productGalleryImages.js', 'utf8')

function getRegistryImageCount(slug) {
  const escaped = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = registrySource.match(new RegExp(`'${escaped}': \\[([^\\]]*)\\]`))
  if (!match) return 0
  const body = match[1].trim()
  if (!body) return 0
  return body.split(',').length
}

function syncLocale(filePath, detailSuffix) {
  const data = JSON.parse(readFileSync(filePath, 'utf8'))
  let updated = 0

  for (const product of products) {
    const item = data.productCatalog.items[product.slug]
    const imageCount = getRegistryImageCount(product.slug)
    if (!item || imageCount < 2) continue

    if (!Array.isArray(item.gallery)) {
      item.gallery = []
    }

    if (item.gallery.length === 0) {
      item.gallery.push({ caption: item.title })
    }

    if (item.gallery.length === 1) {
      const firstCaption = item.gallery[0]?.caption || item.title
      item.gallery.push({ caption: `${firstCaption}${detailSuffix}` })
      updated += 1
    }

    if (item.highlight && item.highlight.imageIndex !== 1) {
      item.highlight.imageIndex = 1
      updated += 1
    }
  }

  writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
  console.log(`${filePath}: updated ${updated} product entries`)
}

syncLocale('src/i18n/locales/en.json', ' — detail')
syncLocale('src/i18n/locales/es.json', ' — detalle')

for (const product of products) {
  const count = getRegistryImageCount(product.slug)
  if (count < 2) {
    console.warn(`Missing secondary image asset: ${product.slug} (${count} images)`)
  }
}
