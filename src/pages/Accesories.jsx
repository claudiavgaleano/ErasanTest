import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Skeleton,
  Pagination,
  Alert,
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import { useThemeMode } from '../context/ThemeContext'
import { useProducts, useCategories, contentHelpers } from '../hooks/useContent'

// Placeholder image for products without featured image
const PLACEHOLDER_IMAGE = 'https://placehold.co/600x400/1e293b/dc2626?text=Erasan+Product'

export default function Accesories() {
  const { t } = useTranslation()
  const { mode } = useThemeMode()
  const [searchParams, setSearchParams] = useSearchParams()
  
  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  const currentCategory = searchParams.get('category') || null

  const primaryColor = mode === 'dark' ? '#dc2626' : '#b91c1c'
  const gradientColor = mode === 'dark' 
    ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)'
    : 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)'

  // Fetch products from local content
  const { products, loading, error, totalPages } = useProducts({
    page: currentPage,
    perPage: 9,
    category: currentCategory,
  })

  // Fetch product categories
  const { categories } = useCategories('products')

  const handlePageChange = (event, page) => {
    setSearchParams({ page: page.toString(), ...(currentCategory && { category: currentCategory }) })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCategoryFilter = (categorySlug) => {
    if (categorySlug === currentCategory) {
      setSearchParams({})
    } else {
      setSearchParams({ category: categorySlug })
    }
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '30%',
            right: '-10%',
            width: 500,
            height: 500,
            background: `radial-gradient(circle, ${mode === 'dark' ? 'rgba(220, 38, 38, 0.08)' : 'rgba(185, 28, 28, 0.05)'} 0%, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(60px)',
          },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', position: 'relative', zIndex: 1 }}>
            <Typography
              variant="overline"
              sx={{
                color: primaryColor,
                fontWeight: 700,
                letterSpacing: 4,
                mb: 2,
                display: 'block',
                fontSize: '0.85rem',
              }}
            >
              {t('accesories.title')}
            </Typography>
            <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 3, fontWeight: 700 }}>
              {t('accesories.heroTitle1')}{' '}
              <Box
                component="span"
                sx={{
                  background: gradientColor,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('accesories.heroTitle2')}
              </Box>
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              {t('accesories.heroDescription')}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Category Filters */}
      {categories.length > 0 && (
        <Container maxWidth="lg" sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Chip
              label={t('accesories.allCategories')}
              onClick={() => handleCategoryFilter(null)}
              color={!currentCategory ? 'primary' : 'default'}
              variant={!currentCategory ? 'filled' : 'outlined'}
              sx={{ fontWeight: 500 }}
            />
            {categories.map((cat) => (
              <Chip
                key={cat.id}
                label={cat.name}
                onClick={() => handleCategoryFilter(cat.slug)}
                color={currentCategory === cat.slug ? 'primary' : 'default'}
                variant={currentCategory === cat.slug ? 'filled' : 'outlined'}
                sx={{ fontWeight: 500 }}
              />
            ))}
          </Box>
        </Container>
      )}

      {/* Products Grid */}
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          {error && (
            <Alert severity="error" sx={{ mb: 4 }}>
              {t('accesories.errorLoading')}
            </Alert>
          )}

          <Grid container spacing={4}>
            {loading
              ? // Skeleton loading state
                Array.from({ length: 6 }).map((_, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                      <Skeleton variant="rectangular" height={220} />
                      <CardContent>
                        <Skeleton variant="text" height={32} />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" width="60%" />
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              : products.length > 0
              ? products.map((product, index) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s ease',
                        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
                        '@keyframes fadeInUp': {
                          from: { opacity: 0, transform: 'translateY(30px)' },
                          to: { opacity: 1, transform: 'translateY(0)' },
                        },
                        '&:hover': {
                          transform: 'translateY(-8px)',
                          borderColor: mode === 'dark' ? 'rgba(220, 38, 38, 0.4)' : 'rgba(185, 28, 28, 0.3)',
                          '& .product-image': {
                            transform: 'scale(1.05)',
                          },
                        },
                      }}
                    >
                      <Box sx={{ overflow: 'hidden', position: 'relative' }}>
                        <CardMedia
                          component="img"
                          height="220"
                          image={contentHelpers.getFeaturedImage(product) || PLACEHOLDER_IMAGE}
                          alt={product.title.rendered}
                          className="product-image"
                          sx={{ transition: 'transform 0.4s ease' }}
                        />
                        {product.acf?.featured && (
                          <Chip
                            label={t('accesories.featured')}
                            color="primary"
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 12,
                              right: 12,
                              fontWeight: 600,
                            }}
                          />
                        )}
                      </Box>
                      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Typography
                          variant="h5"
                          component="h3"
                          sx={{ mb: 2, fontWeight: 600 }}
                          dangerouslySetInnerHTML={{ __html: product.title.rendered }}
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2, flexGrow: 1, lineHeight: 1.7 }}
                        >
                          {contentHelpers.getExcerpt(product.excerpt?.rendered || product.content.rendered, 120)}
                        </Typography>
                        <Button
                          component={Link}
                          to={`/products/${product.slug}`}
                          variant="outlined"
                          endIcon={<ArrowForwardIcon />}
                          fullWidth
                        >
                          {t('accesories.viewDetails')}
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              : !loading && (
                  <Grid item xs={12}>
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                      <PrecisionManufacturingIcon
                        sx={{ fontSize: 80, color: 'text.secondary', opacity: 0.3, mb: 2 }}
                      />
                      <Typography variant="h5" color="text.secondary">
                        {t('accesories.noProducts')}
                      </Typography>
                    </Box>
                  </Grid>
                )}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                sx={{
                  '& .MuiPaginationItem-root': {
                    fontWeight: 500,
                  },
                }}
              />
            </Box>
          )}
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: 10,
          background: `linear-gradient(135deg, ${mode === 'dark' ? 'rgba(220, 38, 38, 0.08)' : 'rgba(185, 28, 28, 0.05)'} 0%, ${mode === 'dark' ? 'rgba(14, 165, 233, 0.1)' : 'rgba(2, 132, 199, 0.05)'} 100%)`,
          borderTop: `1px solid ${mode === 'dark' ? 'rgba(220, 38, 38, 0.2)' : 'rgba(185, 28, 28, 0.15)'}`,
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 600 }}>
            {t('accesories.ctaTitle')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {t('accesories.ctaDescription')}
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/contact"
            endIcon={<ArrowForwardIcon />}
          >
            {t('accesories.requestQuote')}
          </Button>
        </Container>
      </Box>
    </Box>
  )
}

