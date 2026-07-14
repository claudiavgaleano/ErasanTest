import { useParams, Link } from 'react-router-dom'
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
  Breadcrumbs,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import { useThemeTokens } from '../context/ThemeContext'
import { useProduct, contentHelpers } from '../hooks/useContent'
import { getSectionBackLink } from '../utils/contentHelpers'

const PLACEHOLDER_IMAGE = 'https://placehold.co/800x600/1e293b/dc2626?text=Erasan+Product'

export default function ProductDetail() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const { primaryColor, primaryAlpha } = useThemeTokens()

  const { product, loading, error } = useProduct(slug)

  if (loading) {
    return (
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Skeleton variant="text" width={300} height={24} sx={{ mb: 4 }} />
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Skeleton variant="text" height={48} />
              <Skeleton variant="text" />
              <Skeleton variant="text" />
              <Skeleton variant="text" width="80%" />
              <Skeleton variant="rectangular" height={200} sx={{ mt: 4, borderRadius: 2 }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    )
  }

  if (error || !product) {
    return (
      <Box sx={{ py: 16, textAlign: 'center' }}>
        <Container maxWidth="md">
          <PrecisionManufacturingIcon sx={{ fontSize: 100, color: 'text.secondary', opacity: 0.3, mb: 3 }} />
          <Typography variant="h4" sx={{ mb: 2 }}>
            {t('products.notFound')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {t('products.notFoundDesc')}
          </Typography>
          <Button
            component={Link}
            to="/products"
            variant="contained"
            startIcon={<ArrowBackIcon />}
          >
            {t('products.backToProducts')}
          </Button>
        </Container>
      </Box>
    )
  }

  const acf = contentHelpers.getAcfFields(product)
  const categories = contentHelpers.getCategories(product, t, product.section)
  const sectionBackLink = getSectionBackLink(product.section)
  const featuredImage = contentHelpers.getFeaturedImage(product, 'large') || PLACEHOLDER_IMAGE

  // Parse specifications from ACF fields (customize based on your ACF setup)
  const specifications = acf.specifications || []
  const features = acf.features || []

  return (
    <Box>
      {/* Breadcrumbs */}
      <Box sx={{ py: 3, borderBottom: `1px solid ${primaryAlpha(0.09)}` }}>
        <Container maxWidth="lg">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              {t('nav.home')}
            </Link>
            <Link to="/products" style={{ color: 'inherit', textDecoration: 'none' }}>
              {t('nav.services')}
            </Link>
            <Link to={sectionBackLink.path} style={{ color: 'inherit', textDecoration: 'none' }}>
              {t(sectionBackLink.labelKey)}
            </Link>
            <Typography color="text.primary" dangerouslySetInnerHTML={{ __html: product.title.rendered }} />
          </Breadcrumbs>
        </Container>
      </Box>

      {/* Product Details */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Product Image */}
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <Box
                  component="img"
                  src={featuredImage}
                  alt={product.title.rendered}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
                {acf.featured && (
                  <Chip
                    label={t('products.featured')}
                    color="primary"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      fontWeight: 600,
                    }}
                  />
                )}
              </Card>
            </Grid>

            {/* Product Info */}
            <Grid item xs={12} md={6}>
              {categories.length > 0 && (
                <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {categories.map((cat) => (
                    <Chip
                      key={cat.id}
                      label={cat.name}
                      size="small"
                      variant="outlined"
                      sx={{ borderColor: primaryColor, color: primaryColor }}
                    />
                  ))}
                </Box>
              )}

              <Typography
                variant="h2"
                component="h1"
                sx={{ mb: 3, fontWeight: 700 }}
                dangerouslySetInnerHTML={{ __html: product.title.rendered }}
              />

              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mb: 4,
                  lineHeight: 1.8,
                  '& p': { mb: 2 },
                  '& ul, & ol': { pl: 3, mb: 2 },
                }}
                dangerouslySetInnerHTML={{ __html: product.content.rendered }}
              />

              {/* Quick Actions */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  component={Link}
                  to="/contact"
                  endIcon={<ArrowForwardIcon />}
                >
                  {t('products.requestQuote')}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={Link}
                  to="/contact"
                >
                  {t('products.askQuestion')}
                </Button>
              </Box>

              {/* Key Features */}
              {features.length > 0 && (
                <Card sx={{ mt: 4 }}>
                  <CardContent>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                      {t('products.keyFeatures')}
                    </Typography>
                    <List dense>
                      {features.map((feature, index) => (
                        <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckCircleIcon sx={{ color: primaryColor, fontSize: 20 }} />
                          </ListItemIcon>
                          <ListItemText primary={feature} />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              )}
            </Grid>
          </Grid>

          {/* Specifications Section */}
          {specifications.length > 0 && (
            <Box sx={{ mt: 8 }}>
              <Typography variant="h3" sx={{ mb: 4, fontWeight: 600 }}>
                {t('products.specifications')}
              </Typography>
              <Card>
                <CardContent>
                  <Grid container spacing={2}>
                    {specifications.map((spec, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box
                          sx={{
                            p: 2,
                            borderRadius: 1,
                            background: primaryAlpha(0.04),
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            {spec.label}
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {spec.value}
                          </Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          )}

          {/* Back Button */}
          <Box sx={{ mt: 6 }}>
            <Divider sx={{ mb: 4 }} />
            <Button
              component={Link}
              to={sectionBackLink.path}
              startIcon={<ArrowBackIcon />}
              sx={{ color: 'text.secondary' }}
            >
              {product.section === 'retrofit'
                ? t('products.backToProducts')
                : t('products.backToSection', { section: t(sectionBackLink.labelKey) })}
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

