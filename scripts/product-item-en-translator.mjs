import { translateText, translateTitle, translateFeatures, translateSpecifications } from './product-en-translator.mjs'

function containsSpanish(text) {
  return typeof text === 'string' && /[áéíóúñ¿¡]|(?:\b(?:para|con|del|las|los|máquina|bobinad|fabricación|permite|devanador)\b)/i.test(text)
}

function preferTranslation(esValue, translatedValue, refValue) {
  if (typeof esValue === 'string' && !esValue.trim()) {
    return translatedValue
  }
  if (typeof refValue === 'string' && refValue.trim() && !containsSpanish(refValue)) {
    if (typeof esValue === 'string' && translatedValue === esValue) return refValue
  }
  return translatedValue
}

export function translateRichProductFields(item, refItem = null) {
  if (!item) return item

  const heroIntro = (item.heroIntro || []).map((paragraph, index) =>
    preferTranslation(paragraph, translateText(paragraph), refItem?.heroIntro?.[index])
  )

  const gallery = (item.gallery || []).map((entry, index) => {
    const caption = typeof entry === 'string' ? entry : entry?.caption || ''
    const refCaption =
      typeof refItem?.gallery?.[index] === 'string'
        ? refItem.gallery[index]
        : refItem?.gallery?.[index]?.caption
    return { caption: preferTranslation(caption, translateTitle(caption), refCaption) }
  })

  const highlight = item.highlight?.title
    ? {
        title: preferTranslation(
          item.highlight.title,
          translateText(item.highlight.title),
          refItem?.highlight?.title
        ),
        subtitle: preferTranslation(
          item.highlight.subtitle || '',
          translateText(item.highlight.subtitle || ''),
          refItem?.highlight?.subtitle
        ),
        imageIndex: item.highlight.imageIndex,
      }
    : refItem?.highlight || null

  const benefitCards = (item.benefitCards || []).map((card, index) => ({
    title: preferTranslation(card?.title || '', translateText(card?.title || ''), refItem?.benefitCards?.[index]?.title),
    description: preferTranslation(
      card?.description || '',
      translateText(card?.description || ''),
      refItem?.benefitCards?.[index]?.description
    ),
  }))

  const characteristics = item.characteristics
    ? {
        title: preferTranslation(
          item.characteristics.title || 'Características',
          translateText(item.characteristics.title || 'Características'),
          refItem?.characteristics?.title
        ),
        body: preferTranslation(
          item.characteristics.body || '',
          translateText(item.characteristics.body || ''),
          refItem?.characteristics?.body
        ),
      }
    : null

  const brandFeatures = item.brandFeatures
    ? {
        title: preferTranslation(
          item.brandFeatures.title || '',
          translateText(item.brandFeatures.title || ''),
          refItem?.brandFeatures?.title
        ),
        body: preferTranslation(
          item.brandFeatures.body || '',
          translateText(item.brandFeatures.body || ''),
          refItem?.brandFeatures?.body
        ),
        items: (item.brandFeatures.items || []).map((feature, index) =>
          preferTranslation(feature, translateText(feature), refItem?.brandFeatures?.items?.[index])
        ),
      }
    : refItem?.brandFeatures || null

  const productAccessories = item.productAccessories?.items
    ? {
        title: preferTranslation(
          item.productAccessories.title || 'Accesorios',
          translateText(item.productAccessories.title || 'Accesorios'),
          refItem?.productAccessories?.title
        ),
        items: item.productAccessories.items.map((accessory, index) => ({
          title: preferTranslation(
            accessory.title,
            translateText(accessory.title),
            refItem?.productAccessories?.items?.[index]?.title
          ),
          description: preferTranslation(
            accessory.description || '',
            translateText(accessory.description || ''),
            refItem?.productAccessories?.items?.[index]?.description
          ),
          imageKey: accessory.imageKey || refItem?.productAccessories?.items?.[index]?.imageKey || '',
        })),
      }
    : refItem?.productAccessories || null

  return {
    heroSubtitle: preferTranslation(
      item.heroSubtitle || item.excerpt || '',
      translateText(item.heroSubtitle || item.excerpt || ''),
      refItem?.heroSubtitle
    ),
    heroIntro,
    gallery,
    highlight,
    benefitCards,
    characteristics,
    brandFeatures,
    productAccessories,
    tagline: preferTranslation(item.tagline || '', translateText(item.tagline || ''), refItem?.tagline),
  }
}

export function translateProductItem(item, { titleOverride = null, refItem = null } = {}) {
  if (!item) return item

  const rich = translateRichProductFields(item, refItem)

  return {
    ...item,
    ...rich,
    title: titleOverride || preferTranslation(item.title, translateTitle(item.title), refItem?.title),
    excerpt: preferTranslation(item.excerpt, translateText(item.excerpt), refItem?.excerpt),
    content: preferTranslation(item.content, translateText(item.content), refItem?.content),
    features: (item.features || []).map((feature, index) =>
      preferTranslation(feature, translateText(feature), refItem?.features?.[index])
    ),
    specifications: (item.specifications || []).map((spec, index) => ({
      label: preferTranslation(spec.label, translateText(spec.label), refItem?.specifications?.[index]?.label),
      value: preferTranslation(spec.value, translateText(spec.value), refItem?.specifications?.[index]?.value),
      icon: spec.icon || refItem?.specifications?.[index]?.icon || '',
    })),
    section: item.section,
  }
}

export function translateCategoryDescription(description, refDescription = '') {
  return preferTranslation(description, translateText(description), refDescription)
}
