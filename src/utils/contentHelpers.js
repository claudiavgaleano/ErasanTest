import { categoriesBySection } from '../data/categories'

const PLACEHOLDER_IMAGE = 'https://placehold.co/800x600/1e293b/dc2626?text=Erasan+Product'

const SECTION_BACK_LINKS = {
  coilWinding: { labelKey: 'nav.coilWinding', path: '/coil-winding' },
  accessories: { labelKey: 'nav.accesories', path: '/accesories' },
  retrofit: { labelKey: 'nav.retrofit', path: '/products/retrofit' },
}

export function getSectionBackLink(section) {
  return SECTION_BACK_LINKS[section] || { labelKey: 'nav.services', path: '/products' }
}

export function toTitleCase(text) {
  if (!text || typeof text !== 'string') return text
  return text
    .toLowerCase()
    .split(' ')
    .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : word))
    .join(' ')
}

export function localizeProduct(product, t) {
  if (!product) return null

  const key = product.i18nKey || product.slug
  const itemKey = `productCatalog.items.${key}`
  const translatedFeatures = t(`${itemKey}.features`, { returnObjects: true })
  const localizedFeatures = Array.isArray(translatedFeatures)
    ? translatedFeatures
    : (product.acf?.features || []).map((feature, index) =>
        t(`${itemKey}.features.${index}`, { defaultValue: feature })
      )

  const rawTitle = t(`${itemKey}.title`, { defaultValue: product.title?.rendered || key })

  return {
    ...product,
    title: { rendered: toTitleCase(rawTitle) },
    excerpt: { rendered: t(`${itemKey}.excerpt`, { defaultValue: product.excerpt?.rendered || '' }) },
    content: {
      rendered: t(`${itemKey}.content`, { defaultValue: product.content?.rendered || '' })
        .split('\n\n')
        .filter(Boolean)
        .map((paragraph) => `<p>${paragraph}</p>`)
        .join(''),
    },
    acf: {
      ...product.acf,
      features: localizedFeatures,
    },
  }
}

export function localizeCategory(category, section, t) {
  if (!category) return null

  const key = `productCatalog.${section}.categories.${category.i18nKey}`
  return {
    ...category,
    name: t(`${key}.name`, { defaultValue: category.name || category.slug }),
    description: t(`${key}.description`, { defaultValue: category.description || '' }),
  }
}

export const contentHelpers = {
  getFeaturedImage(post, size = 'large') {
    if (!post?._embedded?.['wp:featuredmedia']?.[0]) {
      return PLACEHOLDER_IMAGE
    }
    const media = post._embedded['wp:featuredmedia'][0]
    return media.media_details?.sizes?.[size]?.source_url || media.source_url || PLACEHOLDER_IMAGE
  },

  getAuthor(post) {
    if (!post?._embedded?.author?.[0]) {
      return { name: 'Unknown', avatar: null }
    }
    const author = post._embedded.author[0]
    return {
      name: author.name,
      avatar: author.avatar_urls?.['96'] || null,
      description: author.description,
    }
  },

  getCategories(post, t, section) {
    if (!post?.categorySlug || !t || !section) {
      return []
    }

    const category = (categoriesBySection[section] || []).find((cat) => cat.slug === post.categorySlug)
    if (!category) {
      return [{ id: post.categoryId, name: post.categorySlug, slug: post.categorySlug }]
    }

    const localized = localizeCategory(category, section, t)
    return [{ id: category.id, name: localized.name, slug: category.slug }]
  },

  getTags(post) {
    if (!post?._embedded?.['wp:term']?.[1]) {
      return []
    }
    return post._embedded['wp:term'][1].map((tag) => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
    }))
  },

  stripHtml(html) {
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  },

  getExcerpt(content, length = 150) {
    const text = this.stripHtml(content)
    if (text.length <= length) return text
    return text.substring(0, length).trim() + '...'
  },

  formatDate(date, locale = 'en-US') {
    return new Date(date).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  },

  getAcfFields(post) {
    return post?.acf || {}
  },
}
