import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
import { products } from '../src/data/products.js'
import { blogPosts } from '../src/data/blogPosts.js'

const require = createRequire(import.meta.url)
const pkg = require('../package.json')

const __dirname = dirname(fileURLToPath(import.meta.url))
const siteUrl = (process.env.VITE_SITE_URL || 'https://claudiavgaleano.github.io').replace(/\/$/, '')
const basePath = new URL(pkg.homepage).pathname.replace(/\/$/, '')

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/services', priority: '0.8', changefreq: 'monthly' },
  { path: '/products', priority: '0.9', changefreq: 'weekly' },
  { path: '/coil-winding', priority: '0.9', changefreq: 'weekly' },
  { path: '/proyectos-especiales', priority: '0.8', changefreq: 'monthly' },
  { path: '/accesories', priority: '0.8', changefreq: 'monthly' },
  { path: '/retrofit', priority: '0.8', changefreq: 'monthly' },
  { path: '/products/retrofit', priority: '0.7', changefreq: 'monthly' },
  { path: '/blog', priority: '0.7', changefreq: 'weekly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
]

function buildLoc(path) {
  const suffix = path === '/' ? '/' : path
  return `${siteUrl}${basePath}${suffix}`
}

function toUrlEntry({ path, priority, changefreq }) {
  return `  <url>
    <loc>${buildLoc(path)}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

const productEntries = products.map((product) =>
  toUrlEntry({
    path: `/products/${product.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
  })
)

const blogEntries = blogPosts.map((post) =>
  toUrlEntry({
    path: `/blog/${post.slug}`,
    priority: '0.6',
    changefreq: 'monthly',
  })
)

const urlEntries = [
  ...staticRoutes.map(toUrlEntry),
  ...productEntries,
  ...blogEntries,
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join('\n')}
</urlset>
`

const outputPath = join(__dirname, '../public/sitemap.xml')
writeFileSync(outputPath, sitemap, 'utf8')
console.log(`Generated sitemap with ${urlEntries.length} URLs at public/sitemap.xml`)
