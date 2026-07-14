import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import AutorenewIcon from '@mui/icons-material/Autorenew'
import LinearScaleIcon from '@mui/icons-material/LinearScale'
import TransformIcon from '@mui/icons-material/Transform'
import LayersIcon from '@mui/icons-material/Layers'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import SpeedIcon from '@mui/icons-material/Speed'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useThemeTokens } from '../context/ThemeContext'

export default function Services() {
  const { t } = useTranslation()
  const { primaryColor, primaryLight, gradientColor, primaryAlpha, glowPrimary, glowSecondary } = useThemeTokens()

  const services = [
    {
      icon: <AutorenewIcon sx={{ fontSize: 56 }} />,
      title: t('services.webDev'),
      description: t('services.webDevDesc'),
      features: [t('services.features.reactVue'), t('services.features.pwa'), t('services.features.ecommerce')],
    },
    {
      icon: <LinearScaleIcon sx={{ fontSize: 56 }} />,
      title: t('services.mobileApps'),
      description: t('services.mobileAppsDesc'),
      features: [t('services.features.reactNative'), t('services.features.iosAndroid'), t('services.features.aso')],
    },
    {
      icon: <TransformIcon sx={{ fontSize: 56 }} />,
      title: t('services.uiux'),
      description: t('services.uiuxDesc'),
      features: [t('services.features.userResearch'), t('services.features.prototyping'), t('services.features.designSystems')],
    },
    {
      icon: <LayersIcon sx={{ fontSize: 56 }} />,
      title: t('services.backend'),
      description: t('services.backendDesc'),
      features: [t('services.features.nodePython'), t('services.features.cloudServices'), t('services.features.dbDesign')],
    },
    {
      icon: <SmartToyIcon sx={{ fontSize: 56 }} />,
      title: t('services.security'),
      description: t('services.securityDesc'),
      features: [t('services.features.securityAudits'), t('services.features.penTesting'), t('services.features.compliance')],
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 56 }} />,
      title: t('services.performance'),
      description: t('services.performanceDesc'),
      features: [t('services.features.loadTime'), t('services.features.seo'), t('services.features.coreVitals')],
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
            background: `radial-gradient(circle, ${glowPrimary} 0%, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(60px)',
          },
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              textAlign: 'center',
              maxWidth: 800,
              mx: 'auto',
              position: 'relative',
              zIndex: 1,
            }}
          >
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
              {t('services.title')}
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 3,
                fontWeight: 700,
              }}
            >
              {t('services.heroTitle1')}{' '}
              <Box
                component="span"
                sx={{
                  background: gradientColor,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('services.heroTitle2')}
              </Box>
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}
            >
              {t('services.heroDescription')}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Services Grid */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    p: 2,
                    transition: 'all 0.4s ease',
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
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
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      borderColor: primaryAlpha(0.35),
                      '& .service-icon': {
                        color: primaryLight,
                        transform: 'scale(1.1)',
                      },
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      className="service-icon"
                      aria-hidden="true"
                      sx={{
                        color: primaryColor,
                        mb: 2,
                        transition: 'all 0.5s ease',
                      }}
                    >
                      {service.icon}
                    </Box>
                    <Typography variant="h4" sx={{ mb: 2, fontWeight: 600 }}>
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 3, lineHeight: 1.7 }}
                    >
                      {service.description}
                    </Typography>
                    <Box
                      sx={{
                        borderTop: `1px solid ${primaryAlpha(0.18)}`,
                        pt: 2,
                      }}
                    >
                      {service.features.map((feature) => (
                        <Typography
                          key={feature}
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            py: 0.5,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            '&::before': {
                              content: '""',
                              width: 6,
                              height: 6,
                              borderRadius: 1,
                              background: gradientColor,
                            },
                          }}
                        >
                          {feature}
                        </Typography>
                      ))}
                    </Box>
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
            {t('services.ctaTitle')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {t('services.ctaDescription')}
          </Typography>
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/contact"
            endIcon={<ArrowForwardIcon />}
          >
            {t('services.getInTouch')}
          </Button>
        </Container>
      </Box>
    </Box>
  )
}
