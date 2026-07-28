const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '')

const siteUrl = (import.meta.env.VITE_SITE_URL || 'https://claudiavgaleano.github.io').replace(/\/$/, '')

export const seoConfig = {
  siteName: 'Erasan',
  siteUrl,
  basePath: BASE_PATH,
  defaultTitle: 'Erasan - Coil Winding Machines & Precision Engineering',
  defaultDescription:
    'Industry-leading coil winding machines, accessories, and retrofit solutions for transformers, motors, and electrical components. Precision engineering trusted by manufacturers worldwide.',
  defaultKeywords:
    'coil winding machines, winding equipment, transformer winding, motor coils, precision engineering, ERASAN',
  defaultImage: `${siteUrl}${BASE_PATH}/favicon.jpg`,
  twitterCard: 'summary_large_image',
}

export function buildCanonicalUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  const suffix = normalizedPath === '/' ? '/' : normalizedPath
  return `${seoConfig.siteUrl}${seoConfig.basePath}${suffix}`
}

export function getOgLocale(language) {
  return language?.startsWith('es') ? 'es_ES' : 'en_US'
}

export function formatPageTitle(title) {
  if (!title) return seoConfig.defaultTitle
  if (title.includes(seoConfig.siteName)) return title
  return `${title} | ${seoConfig.siteName}`
}
