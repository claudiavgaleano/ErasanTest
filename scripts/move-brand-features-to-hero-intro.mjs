import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const localeFiles = [
  join(__dirname, '../src/i18n/locales/en.json'),
  join(__dirname, '../src/i18n/locales/es.json'),
]

function moveBrandFeaturesItemsToHeroIntro(filePath) {
  const data = JSON.parse(readFileSync(filePath, 'utf8'))
  const items = data.productCatalog?.items

  if (!items || typeof items !== 'object') {
    throw new Error(`No productCatalog.items found in ${filePath}`)
  }

  let updated = 0

  for (const [slug, product] of Object.entries(items)) {
    const brandItems = product.brandFeatures?.items
    if (!Array.isArray(brandItems) || brandItems.length === 0) continue

    product.heroIntro = [...brandItems]
    product.brandFeatures.items = []
    updated += 1
  }

  writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
  console.log(`${filePath}: moved brandFeatures.items to heroIntro for ${updated} products`)
}

for (const filePath of localeFiles) {
  moveBrandFeaturesItemsToHeroIntro(filePath)
}
