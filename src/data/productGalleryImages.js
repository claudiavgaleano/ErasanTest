import stripFoilMain from '../assets/strip-foil-main.png'

export const PRODUCT_GALLERY_IMAGES = {
  'bobinadora-strip-foil': [stripFoilMain],
}

export function getProductGalleryImage(slug, index = 0) {
  return PRODUCT_GALLERY_IMAGES[slug]?.[index] || null
}
