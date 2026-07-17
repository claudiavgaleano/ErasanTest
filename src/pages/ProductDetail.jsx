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
  Tooltip,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DownloadIcon from '@mui/icons-material/Download'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import { useThemeMode } from '../context/ThemeContext'
import { useProduct, contentHelpers } from '../hooks/useContent'
import { getSectionBackLink } from '../utils/contentHelpers'
import { getProductSpecPdfUrl } from '../data/productSpecPdfs'
import ProductGallery from '../components/productDetail/ProductGallery'
import BenefitCardsSection from '../components/productDetail/BenefitCardsSection'
import SpecificationsSection from '../components/productDetail/SpecificationsSection'

const PLACEHOLDER_IMAGE = 'https://placehold.co/800x600/1e293b/dc2626?text=Erasan+Product'

function SpecDownloadButton({ specPdfUrl, t, size = 'large', sx }) {
  return (
    <Tooltip
      title={specPdfUrl ? '' : t('products.downloadSpecsComingSoon')}
      disableHoverListener={Boolean(specPdfUrl)}
    >
      <span>
        <Button
          variant="outlined"
          size={size}
          component={specPdfUrl ? 'a' : 'button'}
          href={specPdfUrl || undefined}
          download={specPdfUrl ? true : undefined}
          target={specPdfUrl ? '_blank' : undefined}
          rel={specPdfUrl ? 'noopener noreferrer' : undefined}
          disabled={!specPdfUrl}
          startIcon={<DownloadIcon />}
          sx={sx}
        >
          {t('products.downloadSpecs')}
        </Button>
      </span>
    </Tooltip>
  )
}

function ProductHeroRow({ product, gallery, categories, heroIntro, primaryColor }) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        gap: { xs: 4, lg: 6 },
        alignItems: { lg: 'flex-start' },
      }}
    >
      {gallery.length > 0 && (
        <Box sx={{ mb: { xs: 2, lg: 0 }, width: { xs: '100%', lg: '48%' }, flexShrink: 0 }}>
          <ProductGallery images={gallery} />
        </Box>
      )}
      <Box sx={{ mb: 6, width: { xs: '100%', lg: '52%' }, flex: 1 }}>
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
          sx={{ mb: 2, fontWeight: 700 }}
          dangerouslySetInnerHTML={{ __html: product.title.rendered }}
        />

        {product.excerpt?.rendered && (
          <Typography variant="h5" component="p" color="text.secondary" sx={{ mb: 3, fontWeight: 500, lineHeight: 1.5 }}>
            {product.excerpt.rendered}
          </Typography>
        )}

        {heroIntro.map((paragraph, index) => (
          <Typography key={index} variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
            {paragraph}
          </Typography>
        ))}
      </Box>
    </Container>
  )
}

function BrandFeaturesSection({ brandFeatures, specPdfUrl, primaryColor, t }) {
  if (!brandFeatures) return null

  return (
    <Card sx={{ mb: 8 }}>
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
          {brandFeatures.title}
        </Typography>
        {brandFeatures.body ? (
          brandFeatures.body.split('\n\n').map((paragraph, index) => (
            <Typography key={index} variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
              {paragraph}
            </Typography>
          ))
        ) : (
          <List dense>
            {brandFeatures.items.map((item, index) => (
              <ListItem key={index} disablePadding sx={{ py: 0.75, alignItems: 'flex-start' }}>
                <ListItemIcon sx={{ minWidth: 36, mt: 0.25 }}>
                  <CheckCircleIcon sx={{ color: primaryColor, fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText primary={item} primaryTypographyProps={{ lineHeight: 1.7 }} />
              </ListItem>
            ))}
          </List>
        )}
        <Box sx={{ mt: 4 }}>
          <SpecDownloadButton specPdfUrl={specPdfUrl} t={t} />
        </Box>
      </CardContent>
    </Card>
  )
}

function ClassicProductLayout({
  product,
  acf,
  categories,
  featuredImage,
  features,
  specifications,
  specPdfUrl,
  primaryColor,
  primaryAlpha,
  t,
}) {
  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Card sx={{ overflow: 'hidden', position: 'relative' }}>
            <Box
              component="img"
              src={featuredImage}
              alt={product.title.rendered}
              sx={{ width: '100%', height: 'auto', display: 'block' }}
            />
            {acf.featured && (
              <Chip
                label={t('products.featured')}
                color="primary"
                sx={{ position: 'absolute', top: 16, right: 16, fontWeight: 600 }}
              />
            )}
          </Card>
        </Grid>

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
            <Button variant="outlined" size="large" component={Link} to="/contact">
              {t('products.askQuestion')}
            </Button>
            <SpecDownloadButton specPdfUrl={specPdfUrl} t={t} />
          </Box>

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

      <SpecificationsSection
        specifications={specifications}
        title={t('products.specifications')}
        primaryColor={primaryColor}
        primaryAlpha={primaryAlpha}
        sx={{ mt: 8 }}
      />
    </>
  )
}

function resolveHighlightImage(gallery, highlight, featuredImage, productTitle) {
  const preferredIndex = Number.isInteger(highlight?.imageIndex) ? highlight.imageIndex : 0
  const candidates = [
    gallery[preferredIndex],
    gallery[0],
    gallery[gallery.length - 1],
  ].filter(Boolean)

  for (const item of candidates) {
    if (item.src && !item.src.includes('placehold.co')) {
      return item
    }
  }

  return { src: featuredImage, alt: productTitle }
}

function RichProductLayout({
  product,
  acf,
  categories,
  featuredImage,
  specifications,
  specPdfUrl,
  primaryColor,
  primaryAlpha,
  t,
}) {
  const {
    heroIntro = [],
    gallery = [],
    characteristics,
    brandFeatures,
    highlight,
    benefitCards = [],
  } = acf

  const highlightImage = resolveHighlightImage(gallery, highlight, featuredImage, product.title.rendered)

  return (
    <>
      <ProductHeroRow
        product={product}
        gallery={gallery}
        categories={categories}
        heroIntro={heroIntro}
        primaryColor={primaryColor}
      />

      {characteristics && (
        <Card sx={{ mb: 6 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
              {characteristics.title}
            </Typography>
            {characteristics.body.split('\n\n').map((paragraph, index) => (
              <Typography key={index} variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
                {paragraph}
              </Typography>
            ))}
          </CardContent>
        </Card>
      )}

      <BrandFeaturesSection
        brandFeatures={brandFeatures}
        specPdfUrl={specPdfUrl}
        primaryColor={primaryColor}
        t={t}
      />

      {highlight && (
        <Box
          sx={{
            mb: 8,
            py: { xs: 4, md: 6 },
            px: { xs: 3, md: 5 },
            borderRadius: 2,
            background: primaryAlpha(0.06),
            border: `1px solid ${primaryAlpha(0.12)}`,
          }}
        >
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={5}>
              <Box
                component="img"
                src={highlightImage.src}
                alt={highlightImage.alt}
                sx={{ width: '100%', height: 'auto', borderRadius: 2, display: 'block' }}
              />
            </Grid>
            <Grid item xs={12} md={7}>
              <Typography variant="h3" sx={{ mb: 2, fontWeight: 700, lineHeight: 1.3 }}>
                {highlight.title}
              </Typography>
              {highlight.subtitle && (
                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, lineHeight: 1.6 }}>
                  {highlight.subtitle}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      )}

      <BenefitCardsSection
        benefitCards={benefitCards}
        primaryColor={primaryColor}
        primaryAlpha={primaryAlpha}
        sx={{ mb: 8 }}
      />

      <SpecificationsSection
        specifications={specifications}
        title={t('products.specifications')}
        primaryColor={primaryColor}
        primaryAlpha={primaryAlpha}
        sx={{ mb: 8 }}
      />

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button variant="contained" size="large" component={Link} to="/contact" endIcon={<ArrowForwardIcon />}>
          {t('products.requestQuote')}
        </Button>
        <Button variant="outlined" size="large" component={Link} to="/contact">
          {t('products.askQuestion')}
        </Button>
      </Box>
    </>
  )
}

function AccessoryProductLayout({
  product,
  acf,
  categories,
  specifications,
  specPdfUrl,
  primaryColor,
  primaryAlpha,
  t,
}) {
  const {
    heroIntro = [],
    gallery = [],
    characteristics,
    brandFeatures,
    productAccessories,
    tagline,
  } = acf

  const secondaryImage = gallery[1] || null

  return (
    <>
      <ProductHeroRow
        product={product}
        gallery={gallery}
        categories={categories}
        heroIntro={heroIntro}
        primaryColor={primaryColor}
      />

      {characteristics && (
        <Card sx={{ mb: 6 }}>
          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
              {characteristics.title}
            </Typography>
            {characteristics.body.split('\n\n').map((paragraph, index) => (
              <Typography key={index} variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.8 }}>
                {paragraph}
              </Typography>
            ))}
          </CardContent>
        </Card>
      )}

      <BrandFeaturesSection
        brandFeatures={brandFeatures}
        specPdfUrl={specPdfUrl}
        primaryColor={primaryColor}
        t={t}
      />

      {secondaryImage && (
        <Box sx={{ mb: 8, display: 'flex', justifyContent: 'center' }}>
          <Box
            component="img"
            src={secondaryImage.src}
            alt={secondaryImage.alt}
            sx={{
              width: '100%',
              maxWidth: 720,
              height: 'auto',
              borderRadius: 2,
              display: 'block',
            }}
          />
        </Box>
      )}

      {productAccessories?.items?.length > 0 && (
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" sx={{ mb: 4, fontWeight: 700 }}>
            {productAccessories.title}
          </Typography>
          <Grid container spacing={3}>
            {productAccessories.items.map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    overflow: 'hidden',
                    borderLeft: `4px solid ${primaryColor}`,
                    background: primaryAlpha(0.03),
                  }}
                >
                  {item.src && (
                    <Box
                      component="img"
                      src={item.src}
                      alt={item.alt || item.title}
                      sx={{
                        width: '100%',
                        height: 220,
                        objectFit: 'contain',
                        display: 'block',
                        bgcolor: 'background.paper',
                        p: 2,
                      }}
                    />
                  )}
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h5" sx={{ mb: 1.5, fontWeight: 700 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {tagline && (
        <Box
          sx={{
            mb: 8,
            py: 4,
            px: { xs: 2, md: 4 },
            textAlign: 'center',
            borderTop: `1px solid ${primaryAlpha(0.15)}`,
            borderBottom: `1px solid ${primaryAlpha(0.15)}`,
          }}
        >
          <Typography
            variant="h5"
            component="p"
            sx={{ fontStyle: 'italic', fontWeight: 500, lineHeight: 1.6, color: 'text.primary' }}
          >
            &ldquo;{tagline}&rdquo;
          </Typography>
        </Box>
      )}

      <SpecificationsSection
        specifications={specifications}
        title={t('products.specifications')}
        primaryColor={primaryColor}
        primaryAlpha={primaryAlpha}
        sx={{ mb: 8 }}
      />

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Button variant="contained" size="large" component={Link} to="/contact" endIcon={<ArrowForwardIcon />}>
          {t('products.requestQuote')}
        </Button>
        <Button variant="outlined" size="large" component={Link} to="/contact">
          {t('products.askQuestion')}
        </Button>
      </Box>
    </>
  )
}

export default function ProductDetail() {
  const { slug } = useParams()
  const { t } = useTranslation()
  const { mode } = useThemeMode()
  const primaryColor = mode === 'dark' ? '#dc2626' : '#b91c1c'
  const primaryAlpha = (opacity) =>
    mode === 'dark' ? `rgba(220, 38, 38, ${opacity})` : `rgba(185, 28, 28, ${opacity})`

  const { product, loading, error } = useProduct(slug)

  if (loading) {
    return (
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Skeleton variant="text" width={300} height={24} sx={{ mb: 4 }} />
          <Skeleton variant="text" height={48} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="70%" sx={{ mb: 4 }} />
          <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2, mb: 4 }} />
          <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
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
          <Button component={Link} to="/products" variant="contained" startIcon={<ArrowBackIcon />}>
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

  const specifications = acf.specifications || []
  const features = acf.features || []
  const specPdfUrl = getProductSpecPdfUrl(product.slug)
  const layout = acf.layout || 'classic'

  return (
    <Box>
      <Box sx={{ py: 3, borderBottom: `1px solid ${primaryAlpha(0.1)}` }}>
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

      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          {layout === 'accessory' ? (
            <AccessoryProductLayout
              product={product}
              acf={acf}
              categories={categories}
              specifications={specifications}
              specPdfUrl={specPdfUrl}
              primaryColor={primaryColor}
              primaryAlpha={primaryAlpha}
              t={t}
            />
          ) : layout === 'rich' ? (
            <RichProductLayout
              product={product}
              acf={acf}
              categories={categories}
              featuredImage={featuredImage}
              specifications={specifications}
              specPdfUrl={specPdfUrl}
              primaryColor={primaryColor}
              primaryAlpha={primaryAlpha}
              t={t}
            />
          ) : (
            <ClassicProductLayout
              product={product}
              acf={acf}
              categories={categories}
              featuredImage={featuredImage}
              features={features}
              specifications={specifications}
              specPdfUrl={specPdfUrl}
              primaryColor={primaryColor}
              primaryAlpha={primaryAlpha}
              t={t}
            />
          )}

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
