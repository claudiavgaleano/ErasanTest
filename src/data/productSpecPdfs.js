import e1200Pdf from '../assets/FichaTecnica/ERASAN-FICHA-TECNICA-E1200.pdf?url'
import e1200SgbPdf from '../assets/FichaTecnica/ERASAN-FICHA-TECNICA-E1200-SGB.pdf?url'
import e1200ServotechPdf from '../assets/FichaTecnica/ERASAN-FICHA-TECNICA-E1200-SERVOTECH.pdf?url'
import e300Pdf from '../assets/FichaTecnica/ERASAN-FICHA-TECNICA-E300.pdf?url'
import e600Pdf from '../assets/FichaTecnica/ERASAN-FICHA-TECNICA-E600.pdf?url'
import e900Pdf from '../assets/FichaTecnica/ERASAN-FICHA-TECNICA-E900.pdf?url'
import e900SgbPdf from '../assets/FichaTecnica/ERASAN-FICHA-TECNICA-E900-SGB.pdf?url'
import e900ServotechPdf from '../assets/FichaTecnica/ERASAN-FICHA-TECNICA-E900-SERVOTECH.pdf?url'

const productSpecPdfUrls = {
  'bobinadora-erasan-e1200': e1200Pdf,
  'bobinadora-erasan-e1200-sgb': e1200SgbPdf,
  'bobinadora-erasan-e1200-servotech': e1200ServotechPdf,
  'bobinadora-erasan-e300': e300Pdf,
  'bobinadora-erasan-e600': e600Pdf,
  'bobinadora-erasan-e900': e900Pdf,
  'bobinadora-erasan-e900-sgb': e900SgbPdf,
  'bobinadora-erasan-e900-servotech': e900ServotechPdf,
}

export function getProductSpecPdfUrl(slug) {
  return productSpecPdfUrls[slug] || null
}

export function hasProductSpecPdf(slug) {
  return Boolean(productSpecPdfUrls[slug])
}
