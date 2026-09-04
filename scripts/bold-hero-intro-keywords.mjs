import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const files = [
  join(__dirname, '../src/i18n/locales/es.json'),
  join(__dirname, '../src/i18n/locales/en.json'),
]

const NAMED =
  /\b(WinBobb[ií]n|WinBobbin|Ethernet|servomotores|servo motors|servomotors|CNC|TIG|SGB|DP1R|AP1R|TH3|GH3|GH2|GH1|GP2|GP1|TPE|DP4|DP2|DP1|Bobifil)\b/gi
const MEASURE = /\b\d+(?:[.,]\d+)?\s*(?:rpm|mm|Nm|kW|kg|º|°)\b/gi
const INCH = /\b\d+\s*["”]/g

function mapOutsideBold(text, fn) {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .map((part) => (part.startsWith('**') ? part : fn(part)))
    .join('')
}

function wrapMatches(text, regex) {
  return mapOutsideBold(text, (part) => part.replace(regex, (match) => `**${match}**`))
}

function boldHeroIntro(text) {
  if (typeof text !== 'string' || !text.trim() || text.includes('**')) return text

  let result = text
  result = result.replace(/^([^:]{3,50}):/, '**$1:**')
  result = result.replace(/^(.{8,70}?) (mediante|by means of)\b/i, '**$1** $2')
  result = wrapMatches(result, NAMED)
  result = wrapMatches(result, MEASURE)
  result = wrapMatches(result, INCH)
  return result
}

for (const file of files) {
  const data = JSON.parse(readFileSync(file, 'utf8'))
  const items = data.productCatalog?.items || {}
  let changed = 0

  for (const product of Object.values(items)) {
    if (!Array.isArray(product.heroIntro)) continue
    product.heroIntro = product.heroIntro.map((line) => {
      const next = boldHeroIntro(line)
      if (next !== line) changed += 1
      return next
    })
  }

  writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`)
  console.log(`${file}: updated ${changed} heroIntro lines`)
}
