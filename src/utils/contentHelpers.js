import { categoriesBySection } from '../data/categories'
import { getProductGalleryImage } from '../data/productGalleryImages'
import { getProductAccessoryImage } from '../data/productAccessoryImages'

const PLACEHOLDER_IMAGE = 'https://placehold.co/800x600/1e293b/dc2626?text=Erasan+Product'

const SECTION_BACK_LINKS = {
  coilWinding: { labelKey: 'nav.coilWinding', path: '/coil-winding' },
  specialProjects: { labelKey: 'nav.specialProjects', path: '/proyectos-especiales' },
  accessories: { labelKey: 'nav.accesories', path: '/accesories' },
  retrofit: { labelKey: 'nav.retrofit', path: '/retrofit' },
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

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function localizeRichLayout(product, t, itemKey) {
  const heroIntroRaw = t(`${itemKey}.heroIntro`, { returnObjects: true, defaultValue: [] })
  const galleryRaw = t(`${itemKey}.gallery`, { returnObjects: true, defaultValue: [] })
  const characteristicsRaw = t(`${itemKey}.characteristics`, { returnObjects: true, defaultValue: null })
  const brandFeaturesRaw = t(`${itemKey}.brandFeatures`, { returnObjects: true, defaultValue: null })
  const highlightRaw = t(`${itemKey}.highlight`, { returnObjects: true, defaultValue: null })
  const benefitCardsRaw = t(`${itemKey}.benefitCards`, { returnObjects: true, defaultValue: [] })
  const productAccessoriesRaw = t(`${itemKey}.productAccessories`, { returnObjects: true, defaultValue: null })
  const tagline = t(`${itemKey}.tagline`, { defaultValue: '' })

  const heroIntro = Array.isArray(heroIntroRaw) ? heroIntroRaw.filter(Boolean) : []
  const benefitCards =
    Array.isArray(benefitCardsRaw) && benefitCardsRaw.some((card) => card?.title) ? benefitCardsRaw : []

  const baseGallery = product.acf?.gallery || []
  const gallery =
    Array.isArray(galleryRaw) && galleryRaw.length > 0
      ? galleryRaw.map((item, index) => {
          const caption = typeof item === 'string' ? item : item?.caption || ''
          const base = baseGallery[index] || {}
          const resolvedSrc =
            getProductGalleryImage(product.slug, index) ||
            (index > 0 ? getProductGalleryImage(product.slug, 0) : null) ||
            base.src ||
            base.url ||
            PLACEHOLDER_IMAGE
          return {
            src: resolvedSrc,
            alt: base.alt || caption || product.title?.rendered || product.slug,
            caption,
          }
        })
      : []

  const characteristics =
    isPlainObject(characteristicsRaw) && characteristicsRaw.body
      ? {
          title: characteristicsRaw.title || t('products.characteristics'),
          body: characteristicsRaw.body,
        }
      : null

  const brandFeatures =
    isPlainObject(brandFeaturesRaw) &&
    (brandFeaturesRaw.body || (Array.isArray(brandFeaturesRaw.items) && brandFeaturesRaw.items.length))
      ? {
          title: brandFeaturesRaw.title || '',
          body: brandFeaturesRaw.body || '',
          items: (brandFeaturesRaw.items || []).filter(Boolean),
        }
      : null

  const productAccessories =
    isPlainObject(productAccessoriesRaw) && Array.isArray(productAccessoriesRaw.items)
      ? {
          title: productAccessoriesRaw.title || t('products.productAccessories'),
          items: productAccessoriesRaw.items
            .filter((item) => item?.title)
            .map((item) => ({
              title: item.title,
              description: item.description || '',
              imageKey: item.imageKey || '',
              src: getProductAccessoryImage(item.imageKey) || null,
              alt: item.title,
            })),
        }
      : null

  const highlight =
    isPlainObject(highlightRaw) && highlightRaw.title
      ? {
          title: highlightRaw.title,
          subtitle: highlightRaw.subtitle || '',
          imageIndex: Number.isInteger(highlightRaw.imageIndex) ? highlightRaw.imageIndex : 1,
        }
      : null

  let layout = 'classic'
  if (product.acf?.layout === 'accessory' || productAccessories?.items?.length) {
    layout = 'accessory'
  } else if (
    product.acf?.layout === 'rich' ||
    benefitCards.length > 0 ||
    Boolean(characteristics)
  ) {
    layout = 'rich'
  }

  return {
    layout,
    heroIntro,
    gallery,
    characteristics,
    brandFeatures,
    highlight,
    benefitCards,
    productAccessories,
    tagline,
  }
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

  const translatedSpecifications = t(`${itemKey}.specifications`, { returnObjects: true })
  const localizedSpecifications = Array.isArray(translatedSpecifications)
    ? translatedSpecifications.map((spec, index) => ({
        label: spec?.label || t(`${itemKey}.specifications.${index}.label`),
        value: spec?.value || t(`${itemKey}.specifications.${index}.value`),
        icon: spec?.icon || t(`${itemKey}.specifications.${index}.icon`, { defaultValue: '' }),
      }))
    : (product.acf?.specifications || []).map((spec, index) => ({
        label: t(`${itemKey}.specifications.${index}.label`, { defaultValue: spec.label }),
        value: t(`${itemKey}.specifications.${index}.value`, { defaultValue: spec.value }),
        icon: t(`${itemKey}.specifications.${index}.icon`, { defaultValue: spec.icon || '' }),
      }))

  const rawTitle = t(`${itemKey}.title`, { defaultValue: product.title?.rendered || key })
  const rawExcerpt = t(`${itemKey}.heroSubtitle`, {
    defaultValue: t(`${itemKey}.excerpt`, { defaultValue: product.excerpt?.rendered || '' }),
  })
  const rawContent = t(`${itemKey}.content`, { defaultValue: product.content?.rendered || '' })
  const richLayout = localizeRichLayout(product, t, itemKey)

  return {
    ...product,
    title: { rendered: toTitleCase(rawTitle) },
    excerpt: { rendered: rawExcerpt },
    content: {
      rendered: rawContent
        .split('\n\n')
        .filter(Boolean)
        .map((paragraph) => `<p>${paragraph}</p>`)
        .join(''),
    },
    acf: {
      ...product.acf,
      features: localizedFeatures,
      specifications: localizedSpecifications,
      ...richLayout,
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
    const slug = post?.slug
    const localImage = slug ? getProductGalleryImage(slug, 0) : null
    if (localImage) return localImage

    if (!post?._embedded?.['wp:featuredmedia']?.[0]) {
      return PLACEHOLDER_IMAGE
    }
    const media = post._embedded['wp:featuredmedia'][0]
    const embeddedUrl = media.media_details?.sizes?.[size]?.source_url || media.source_url
    if (!embeddedUrl || embeddedUrl.includes('placehold.co')) {
      return PLACEHOLDER_IMAGE
    }
    return embeddedUrl
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
