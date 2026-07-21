import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import ExtensionIcon from '@mui/icons-material/Extension'
import EngineeringIcon from '@mui/icons-material/Engineering'
import UpgradeIcon from '@mui/icons-material/Upgrade'
import { useThemeMode } from '../context/ThemeContext'

export default function Products() {
  const { t } = useTranslation()
  const { mode } = useThemeMode()

  const primaryColor = mode === 'dark' ? '#dc2626' : '#b91c1c'
  const secondaryColor = mode === 'dark' ? '#ef4444' : '#dc2626'
  const gradientColor = mode === 'dark'
    ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)'
    : 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)'

  const categories = [
    {
      icon: <PrecisionManufacturingIcon sx={{ fontSize: 56 }} />,
      title: t('nav.coilWinding'),
      description: t('coilWinding.heroDescription'),
      path: '/coil-winding',
    },
    {
      icon: <ExtensionIcon sx={{ fontSize: 56 }} />,
      title: t('nav.accesories'),
      description: t('accesories.heroDescription'),
      path: '/accesories',
    },
    {
      icon: <UpgradeIcon sx={{ fontSize: 56 }} />,
      title: t('nav.retrofit'),
      description: t('productCatalog.retrofit.description'),
      path: '/retrofit',
    },
    {
      icon: <EngineeringIcon sx={{ fontSize: 56 }} />,
      title: t('nav.specialProjects'),
      description: t('specialProjects.heroDescription'),
      path: '/proyectos-especiales',
    },
  ]

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
              {t('products.title')}
            </Typography>
            <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 3, fontWeight: 700 }}>
              {t('products.heroTitle1')}{' '}
              <Box
                component="span"
                sx={{
                  background: gradientColor,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('products.heroTitle2')}
              </Box>
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              {t('products.heroDescription')}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Product Categories */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" sx={{ mb: 2, fontWeight: 600 }}>
            {t('products.categoriesHeading')}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
          >
            {t('products.categoriesDescription')}
          </Typography>
          <Grid container spacing={4}>
            {categories.map((category, index) => (
              <Grid item xs={12} sm={6} md={6} lg={3} key={category.path}>
                <Card
                  sx={{
                    height: '100%',
                    p: 2,
                    textAlign: 'center',
                    transition: 'all 0.4s ease',
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
                    '@keyframes fadeInUp': {
                      from: { opacity: 0, transform: 'translateY(30px)' },
                      to: { opacity: 1, transform: 'translateY(0)' },
                    },
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      borderColor: mode === 'dark' ? 'rgba(220, 38, 38, 0.4)' : 'rgba(185, 28, 28, 0.3)',
                      '& .category-icon': {
                        color: secondaryColor,
                        transform: 'scale(1.1)',
                      },
                    },
                  }}
                >
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Box
                      className="category-icon"
                      aria-hidden="true"
                      sx={{
                        color: primaryColor,
                        mb: 2,
                        transition: 'all 0.5s ease',
                      }}
                    >
                      {category.icon}
                    </Box>
                    <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
                      {category.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 3, lineHeight: 1.7, flexGrow: 1 }}
                    >
                      {category.description}
                    </Typography>
                    <Button
                      component={Link}
                      to={category.path}
                      variant="outlined"
                      endIcon={<ArrowForwardIcon />}
                      fullWidth
                    >
                      {t('products.exploreCategory')}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
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
            {t('products.ctaTitle')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {t('products.ctaDescription')}
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/contact"
            endIcon={<ArrowForwardIcon />}
          >
            {t('products.requestQuote')}
          </Button>
        </Container>
      </Box>
    </Box>
  )
}
