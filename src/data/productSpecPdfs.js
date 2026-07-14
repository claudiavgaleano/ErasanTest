// Register technical specification PDFs as they are added to public/specs/.
// Key: product slug (from products.js). Value: filename inside public/specs/.

export const productSpecPdfs = {
  // Example (uncomment when the PDF is added):
  // 'bobinadora-erasan-e600': 'bobinadora-erasan-e600.pdf',
}

export function getProductSpecPdfUrl(slug) {
  const filename = productSpecPdfs[slug]
  if (!filename) return null

  const base = import.meta.env.BASE_URL || '/'
  const normalizedBase = base.endsWith('/') ? base : `${base}/`
  return `${normalizedBase}specs/${filename}`
}

export function hasProductSpecPdf(slug) {
  return Boolean(productSpecPdfs[slug])
}
