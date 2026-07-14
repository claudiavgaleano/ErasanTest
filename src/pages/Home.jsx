import { Box, Container, Typography, Button, Grid, Card, CardContent } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import EngineeringIcon from '@mui/icons-material/Engineering'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useThemeTokens } from '../context/ThemeContext'
import Carousel from '../components/Carousel'

export default function Home() {
  const { t } = useTranslation()
  const { primaryColor, primaryLight, gradientColor, primaryAlpha, secondaryAlpha, glowPrimary, glowSecondary } = useThemeTokens()

  const features = [
    {
      icon: <EngineeringIcon sx={{ fontSize: 48 }} />,
      title: t('home.modernDesign'),
      description: t('home.modernDesignDesc'),
    },
    {
      icon: <SettingsSuggestIcon sx={{ fontSize: 48 }} />,
      title: t('home.cleanCode'),
      description: t('home.cleanCodeDesc'),
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 48 }} />,
      title: t('home.support'),
      description: t('home.supportDesc'),
    },
  ]

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '20%',
            right: '-10%',
            width: 500,
            height: 500,
            background: `radial-gradient(circle, ${primaryAlpha(0.1)} 0%, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(60px)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '10%',
            left: '-5%',
            width: 400,
            height: 400,
            background: `radial-gradient(circle, ${secondaryAlpha(0.12)} 0%, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(60px)',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box
                sx={{
                  animation: 'fadeInUp 0.8s ease-out',
                  '@keyframes fadeInUp': {
                    from: {
                      opacity: 0,
                      transform: 'translateY(30px)',
                    },
                    to: {
                      opacity: 1,
                      transform: 'translateY(0)',
                    },
                  },
                }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: primaryColor,
                    fontWeight: 700,
                    letterSpacing: 4,
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    fontSize: '0.85rem',
                  }}
                >
                  <PrecisionManufacturingIcon sx={{ fontSize: 20 }} aria-hidden="true" /> {t('home.welcome')}
                </Typography>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '4.5rem' },
                    lineHeight: 1.1,
                    mb: 3,
                    fontWeight: 700,
                  }}
                >
                  {t('home.heroTitle1')}{' '}
                  <Box
                    component="span"
                    sx={{
                      background: gradientColor,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {t('home.heroTitle2')}
                  </Box>
                  <br />
                  {t('home.heroTitle3')}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    fontSize: '1.15rem',
                    mb: 4,
                    maxWidth: 520,
                    lineHeight: 1.8,
                  }}
                >
                  {t('home.heroDescription')}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/contact"
                    endIcon={<ArrowForwardIcon />}
                  >
                    {t('home.getStarted')}
                  </Button>
                  <Button variant="outlined" size="large" component={Link} to="/products">
                    {t('home.ourServices')}
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  justifyContent: 'center',
                  alignItems: 'center',
                  animation: 'float 6s ease-in-out infinite',
                  '@keyframes float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                  },
                }}
              >
                <Box
                  sx={{
                    width: 380,
                    height: 380,
                    borderRadius: 4,
                    background: `linear-gradient(135deg, ${primaryAlpha(0.12)} 0%, ${secondaryAlpha(0.12)} 100%)`,
                    border: `2px solid ${primaryAlpha(0.28)}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      inset: -20,
                      borderRadius: 6,
                      border: `1px dashed ${secondaryAlpha(0.35)}`,
                      animation: 'rotate 30s linear infinite',
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      inset: -40,
                      borderRadius: 8,
                      border: `1px solid ${primaryAlpha(0.18)}`,
                    },
                    '@keyframes rotate': {
                      from: { transform: 'rotate(0deg)' },
                      to: { transform: 'rotate(360deg)' },
                    },
                  }}
                >
                  <PrecisionManufacturingIcon
                    aria-hidden="true"
                    sx={{
                      fontSize: 150,
                      color: primaryColor,
                      filter: `drop-shadow(0 0 40px ${primaryAlpha(0.35)})`,
                    }}
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Carousel Section */}
      <Carousel />

      {/* Features Section */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            sx={{ mb: 2, fontWeight: 600 }}
          >
            {t('home.whyChooseUs')}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            align="center"
            sx={{ mb: 6, maxWidth: 600, mx: 'auto' }}
          >
            {t('home.whyChooseUsDesc')}
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    textAlign: 'center',
                    p: 3,
                    transition: 'all 0.3s ease',
                    animation: `fadeInUp 0.6s ease-out ${index * 0.2}s backwards`,
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      borderColor: primaryAlpha(0.35),
                      '& .feature-icon': {
                        color: primaryLight,
                        transform: 'scale(1.1)',
                      },
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      className="feature-icon"
                      aria-hidden="true"
                      sx={{
                        color: primaryColor,
                        mb: 3,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
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
          background: `linear-gradient(135deg, ${glowPrimary} 0%, ${glowSecondary} 100%)`,
          borderTop: `1px solid ${primaryAlpha(0.18)}`,
          borderBottom: `1px solid ${primaryAlpha(0.18)}`,
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 600 }}>
            {t('home.ctaTitle')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {t('home.ctaDescription')}
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/contact"
            endIcon={<ArrowForwardIcon />}
          >
            {t('home.contactUs')}
          </Button>
        </Container>
      </Box>
    </Box>
  )
}
