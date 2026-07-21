import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Skeleton,
  Pagination,
  Alert,
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import { useThemeMode } from '../context/ThemeContext'
import { useProducts, useCategories } from '../hooks/useContent'
import ProductListCard from '../components/ProductListCard'

export default function Retrofit() {
  const { t } = useTranslation()
  const { mode } = useThemeMode()
  const [searchParams, setSearchParams] = useSearchParams()

  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  const currentCategory = searchParams.get('category') || null

  const primaryColor = mode === 'dark' ? '#dc2626' : '#b91c1c'
  const gradientColor = mode === 'dark'
    ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)'
    : 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)'
  const primaryAlpha = (opacity) =>
    mode === 'dark' ? `rgba(220, 38, 38, ${opacity})` : `rgba(185, 28, 28, ${opacity})`

  const { products, loading, error, totalPages } = useProducts({
    page: currentPage,
    perPage: 9,
    section: 'retrofit',
    category: currentCategory,
  })

  const { categories } = useCategories('retrofit')

  const handlePageChange = (event, page) => {
    setSearchParams({ page: page.toString(), ...(currentCategory && { category: currentCategory }) })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCategoryFilter = (categorySlug) => {
    if (!categorySlug || categorySlug === currentCategory) {
      setSearchParams({})
    } else {
      setSearchParams({ category: categorySlug })
    }
  }

  return (
    <Box>
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
              {t('retrofit.title')}
            </Typography>
            <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 3, fontWeight: 700 }}>
              {t('retrofit.heroTitle1')}{' '}
              <Box
                component="span"
                sx={{
                  background: gradientColor,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('retrofit.heroTitle2')}
              </Box>
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              {t('retrofit.heroDescription')}
            </Typography>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Box
          sx={{
            py: { xs: 4, md: 5 },
            px: { xs: 3, md: 5 },
            borderRadius: 2,
            textAlign: 'center',
            background: primaryAlpha(0.08),
            border: `1px solid ${primaryAlpha(0.15)}`,
          }}
        >
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 700, lineHeight: 1.3 }}>
            {t('retrofit.bannerTitle')}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, lineHeight: 1.7, maxWidth: 720, mx: 'auto' }}>
            {t('retrofit.bannerSubtitle')}
          </Typography>
        </Box>
      </Container>

      {categories.length > 0 && (
        <Container maxWidth="lg" sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Chip
              label={t('retrofit.allCategories')}
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

      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          {error && (
            <Alert severity="error" sx={{ mb: 4 }}>
              {t('retrofit.errorLoading')}
            </Alert>
          )}

          <Grid container spacing={4}>
            {loading
              ? Array.from({ length: 2 }).map((_, index) => (
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
                    <ProductListCard
                      product={product}
                      index={index}
                      mode={mode}
                      viewDetailsLabel={t('retrofit.viewDetails')}
                      featuredLabel={t('retrofit.featured')}
                    />
                  </Grid>
                ))
              : !loading && (
                  <Grid item xs={12}>
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                      <PrecisionManufacturingIcon
                        sx={{ fontSize: 80, color: 'text.secondary', opacity: 0.3, mb: 2 }}
                      />
                      <Typography variant="h5" color="text.secondary">
                        {t('retrofit.noProducts')}
                      </Typography>
                    </Box>
                  </Grid>
                )}
          </Grid>

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

      <Box
        sx={{
          py: 10,
          background: `linear-gradient(135deg, ${mode === 'dark' ? 'rgba(220, 38, 38, 0.08)' : 'rgba(185, 28, 28, 0.05)'} 0%, ${mode === 'dark' ? 'rgba(14, 165, 233, 0.1)' : 'rgba(2, 132, 199, 0.05)'} 100%)`,
          borderTop: `1px solid ${mode === 'dark' ? 'rgba(220, 38, 38, 0.2)' : 'rgba(185, 28, 28, 0.15)'}`,
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 600 }}>
            {t('retrofit.ctaTitle')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {t('retrofit.ctaDescription')}
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/contact"
            endIcon={<ArrowForwardIcon />}
          >
            {t('retrofit.requestQuote')}
          </Button>
        </Container>
      </Box>
    </Box>
  )
}
