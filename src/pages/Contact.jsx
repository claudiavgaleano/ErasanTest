import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material'
import { useTranslation } from 'react-i18next'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { useThemeTokens } from '../context/ThemeContext'

export default function Contact() {
  const { t } = useTranslation()
  const { primaryColor, gradientColor, primaryAlpha, secondaryAlpha, glowPrimary } = useThemeTokens()

  const address = t('contact.address')
  const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`
  const mapsLinkUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

  const contactInfoItems = [
    {
      icon: <EmailIcon sx={{ fontSize: 28 }} />,
      label: t('contact.emailLabel'),
      value: t('contact.email'),
      href: `mailto:${t('contact.email')}`,
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 28 }} />,
      label: t('contact.phoneLabel'),
      value: t('contact.phone'),
      href: `tel:${t('contact.phone').replace(/\s/g, '')}`,
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 28 }} />,
      label: t('contact.hoursLabel'),
      value: t('contact.hours'),
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
            left: '-10%',
            width: 500,
            height: 500,
            background: `radial-gradient(circle, ${glowPrimary} 0%, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(60px)',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: '20%',
            right: '-5%',
            width: 400,
            height: 400,
            background: `radial-gradient(circle, ${secondaryAlpha(0.08)} 0%, transparent 70%)`,
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
              {t('contact.title')}
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 3,
                fontWeight: 700,
              }}
            >
              {t('contact.heroTitle1')}{' '}
              <Box
                component="span"
                sx={{
                  background: gradientColor,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('contact.heroTitle2')}
              </Box>
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}
            >
              {t('contact.heroDescription')}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={6}>
            {/* Contact Info */}
            <Grid item xs={12} md={5}>
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
                {t('contact.infoTitle')}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 4 }}>
                {contactInfoItems.map((info, index) => (
                  <Card
                    key={index}
                    sx={{
                      animation: `fadeInLeft 0.6s ease-out ${index * 0.1}s backwards`,
                      '@keyframes fadeInLeft': {
                        from: {
                          opacity: 0,
                          transform: 'translateX(-20px)',
                        },
                        to: {
                          opacity: 1,
                          transform: 'translateX(0)',
                        },
                      },
                    }}
                  >
                    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          color: primaryColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 56,
                          height: 56,
                          borderRadius: 1,
                          background: primaryAlpha(0.09),
                        }}
                        aria-hidden="true"
                      >
                        {info.icon}
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          {info.label}
                        </Typography>
                        {info.href ? (
                          <Typography
                            component="a"
                            href={info.href}
                            variant="body1"
                            sx={{
                              color: 'text.primary',
                              textDecoration: 'none',
                              fontWeight: 500,
                              transition: 'color 0.3s ease',
                              '&:hover': {
                                color: primaryColor,
                              },
                            }}
                          >
                            {info.value}
                          </Typography>
                        ) : (
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {info.value}
                          </Typography>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Grid>

            {/* Google Maps */}
            <Grid item xs={12} md={7}>
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
                {t('contact.mapTitle')}
              </Typography>
              <Card
                sx={{
                  mt: 4,
                  overflow: 'hidden',
                  animation: 'fadeInRight 0.6s ease-out',
                  '@keyframes fadeInRight': {
                    from: {
                      opacity: 0,
                      transform: 'translateX(20px)',
                    },
                    to: {
                      opacity: 1,
                      transform: 'translateX(0)',
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: { xs: 320, sm: 400, md: 480 },
                  }}
                >
                  <Box
                    component="iframe"
                    title={t('contact.mapAriaLabel')}
                    src={mapsEmbedUrl}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      border: 0,
                    }}
                  />
                </Box>
                <CardContent
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 2,
                    flexWrap: 'wrap',
                    borderTop: `1px solid ${primaryAlpha(0.12)}`,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOnIcon sx={{ color: primaryColor }} aria-hidden="true" />
                    <Typography variant="body2" color="text.secondary">
                      {address}
                    </Typography>
                  </Box>
                  <Typography
                    component="a"
                    href={mapsLinkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="body2"
                    sx={{
                      color: primaryColor,
                      fontWeight: 600,
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    {t('contact.openInMaps')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
