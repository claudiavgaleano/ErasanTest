import { execSync } from 'child_process'
import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const json = execSync('git show HEAD:src/i18n/locales/en.json', {
  cwd: join(__dirname, '..'),
  encoding: 'utf8',
})
writeFileSync(join(__dirname, 'en-reference.json'), json, 'utf8')
