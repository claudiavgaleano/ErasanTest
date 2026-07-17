import detectorDeHilo from '../assets/Accesories/Tensionadores/detector-de-hilo.png'
import encoder from '../assets/Accesories/Tensionadores/encoder.png'

export const PRODUCT_ACCESSORY_IMAGES = {
  'detector-de-hilo': detectorDeHilo,
  encoder,
}

export function getProductAccessoryImage(imageKey) {
  if (!imageKey) return null
  return PRODUCT_ACCESSORY_IMAGES[imageKey] || null
}
