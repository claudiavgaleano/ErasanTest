import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Grid, Typography } from '@mui/material'
import ProductListCard from '../ProductListCard'
import { useProducts } from '../../hooks/useContent'
import { getSectionI18nPrefix, pickRelatedProducts } from '../../utils/contentHelpers'

export default function RelatedProductsSection({ currentProduct, mode }) {
  const { t } = useTranslation()
  const section = currentProduct?.section

  const { products, loading } = useProducts({
    section,
    perPage: 100,
    enabled: Boolean(section),
  })

  const relatedProducts = useMemo(
    () => pickRelatedProducts(products, currentProduct, 3),
    [products, currentProduct]
  )

  if (!section || (!loading && relatedProducts.length === 0)) {
    return null
  }

  const sectionPrefix = getSectionI18nPrefix(section)

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 600 }}>
        {t('products.relatedProducts')}
      </Typography>
      <Grid container spacing={3}>
        {relatedProducts.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductListCard
              product={product}
              index={index}
              mode={mode}
              viewDetailsLabel={t(`${sectionPrefix}.viewDetails`)}
              featuredLabel={t(`${sectionPrefix}.featured`)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
