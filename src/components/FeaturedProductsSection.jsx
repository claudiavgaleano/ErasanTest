import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Container, Grid, Typography } from '@mui/material'
import ProductListCard from './ProductListCard'
import { useProducts } from '../hooks/useContent'
import { useThemeMode } from '../context/ThemeContext'
import { getSectionI18nPrefix, pickFeaturedProductsBySection } from '../utils/contentHelpers'

export default function FeaturedProductsSection() {
  const { t } = useTranslation()
  const { mode } = useThemeMode()
  const { products, loading } = useProducts({ perPage: 100 })

  const featuredProducts = useMemo(() => pickFeaturedProductsBySection(products), [products])

  if (!loading && featuredProducts.length === 0) return null

  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" sx={{ mb: 2, fontWeight: 600 }}>
          {t('home.featuredProducts')}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
        >
          {t('home.featuredProductsDesc')}
        </Typography>
        <Grid container spacing={3}>
          {featuredProducts.map((product, index) => {
            const sectionPrefix = getSectionI18nPrefix(product.section)
            return (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <ProductListCard
                  product={product}
                  index={index}
                  mode={mode}
                  viewDetailsLabel={t(`${sectionPrefix}.viewDetails`)}
                  featuredLabel={t(`${sectionPrefix}.featured`)}
                />
              </Grid>
            )
          })}
        </Grid>
      </Container>
    </Box>
  )
}
