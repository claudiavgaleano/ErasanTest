import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { seoConfig, buildCanonicalUrl, formatPageTitle, getOgLocale } from '../config/seo'

function upsertMeta(attribute, key, content) {
  if (!content) return

  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) return

  let element = document.head.querySelector(`link[rel="${rel}"]`)
  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', rel)
    document.head.appendChild(element)
  }
  element.setAttribute('href', href)
}

const ROBOTS_INDEX =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
const ROBOTS_NOINDEX = 'noindex, nofollow'

export default function PageSeo({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  noindex = false,
  keywords,
}) {
  const { i18n } = useTranslation()

  useEffect(() => {
    const pageTitle = formatPageTitle(title)
    const pageDescription = description || seoConfig.defaultDescription
    const canonicalUrl = buildCanonicalUrl(path)
    const pageImage = image || seoConfig.defaultImage
    const robots = noindex ? ROBOTS_NOINDEX : ROBOTS_INDEX
    const htmlLang = i18n.language?.startsWith('es') ? 'es' : 'en'

    document.title = pageTitle
    document.documentElement.lang = htmlLang

    upsertMeta('name', 'description', pageDescription)
    upsertMeta('name', 'keywords', keywords || seoConfig.defaultKeywords)
    upsertMeta('name', 'robots', robots)
    upsertMeta('name', 'googlebot', robots)
    upsertLink('canonical', canonicalUrl)

    upsertMeta('property', 'og:title', pageTitle)
    upsertMeta('property', 'og:description', pageDescription)
    upsertMeta('property', 'og:url', canonicalUrl)
    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:image', pageImage)
    upsertMeta('property', 'og:site_name', seoConfig.siteName)
    upsertMeta('property', 'og:locale', getOgLocale(i18n.language))

    upsertMeta('name', 'twitter:card', seoConfig.twitterCard)
    upsertMeta('name', 'twitter:title', pageTitle)
    upsertMeta('name', 'twitter:description', pageDescription)
    upsertMeta('name', 'twitter:image', pageImage)
  }, [title, description, path, image, type, noindex, keywords, i18n.language])

  return null
}
