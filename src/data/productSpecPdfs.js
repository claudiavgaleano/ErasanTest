import e1200Pdf from '../assets/FichaTecnica/ERASAN-FICHA-TECNICA-E1200.pdf?url'
import e1200SgbPdf from '../assets/FichaTecnica/ERASAN-FICHA-TECNICA-E1200-SGB.pdf?url'
import e1200ServotechPdf from '../assets/FichaTecnica/ERASAN-FICHA-TECNICA-E1200-SERVOTECH.pdf?url'
import e300Pdf from '../assets/FichaTecnica/ERASAN-FICHA-TECNICA-E300.pdf?url'
import e600Pdf from '../assets/FichaTecnica/ERASAN-FICHA-TECNICA-E600.pdf?url'
import e900Pdf from '../assets/FichaTecnica/ERASAN-FICHA-TECNICA-E900.pdf?url'
import e900SgbPdf from '../assets/FichaTecnica/ERASAN-FICHA-TECNICA-E900-SGB.pdf?url'
import e900ServotechPdf from '../assets/FichaTecnica/ERASAN-FICHA-TECNICA-E900-SERVOTECH.pdf?url'

const productSpecPdfs = {
  'bobinadora-erasan-e1200': {
    url: e1200Pdf,
    filename: 'ERASAN-FICHA-TECNICA-E1200.pdf',
  },
  'bobinadora-erasan-e1200-sgb': {
    url: e1200SgbPdf,
    filename: 'ERASAN-FICHA-TECNICA-E1200-SGB.pdf',
  },
  'bobinadora-erasan-e1200-servotech': {
    url: e1200ServotechPdf,
    filename: 'ERASAN-FICHA-TECNICA-E1200-SERVOTECH.pdf',
  },
  'bobinadora-erasan-e300': {
    url: e300Pdf,
    filename: 'ERASAN-FICHA-TECNICA-E300.pdf',
  },
  'bobinadora-erasan-e600': {
    url: e600Pdf,
    filename: 'ERASAN-FICHA-TECNICA-E600.pdf',
  },
  'bobinadora-erasan-e900': {
    url: e900Pdf,
    filename: 'ERASAN-FICHA-TECNICA-E900.pdf',
  },
  'bobinadora-erasan-e900-sgb': {
    url: e900SgbPdf,
    filename: 'ERASAN-FICHA-TECNICA-E900-SGB.pdf',
  },
  'bobinadora-erasan-e900-servotech': {
    url: e900ServotechPdf,
    filename: 'ERASAN-FICHA-TECNICA-E900-SERVOTECH.pdf',
  },
}

export function getProductSpecPdf(slug) {
  return productSpecPdfs[slug] || null
}

export function getProductSpecPdfUrl(slug) {
  return getProductSpecPdf(slug)?.url ?? null
}

export function hasProductSpecPdf(slug) {
  return Boolean(getProductSpecPdf(slug))
}
