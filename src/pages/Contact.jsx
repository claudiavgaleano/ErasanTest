import { Box, Container, Typography, Grid, Card, CardContent, Skeleton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import ContactForm from '../components/ContactForm'
import { useThemeMode } from '../context/ThemeContext'
import { useContactInfo } from '../hooks/useWordPress'

export default function Contact() {
  const { t } = useTranslation()
  const { mode } = useThemeMode()
  
  // Fetch contact info from WordPress (optional - falls back to translations)
  const { contactInfo: wpContactInfo, loading: wpLoading } = useContactInfo()

  const primaryColor = mode === 'dark' ? '#dc2626' : '#b91c1c'
  const gradientColor = mode === 'dark' 
    ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)'
    : 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)'

  // Use WordPress data if available, otherwise fall back to translations
  const email = wpContactInfo?.email || t('contact.email')
  const phone = wpContactInfo?.phone || t('contact.phone')
  const address = wpContactInfo?.address || t('contact.address')
  const hours = wpContactInfo?.businessHours || t('contact.hours')

  const contactInfoItems = [
    {
      icon: <EmailIcon sx={{ fontSize: 28 }} />,
      label: t('contact.emailLabel'),
      value: email,
      href: `mailto:${email}`,
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 28 }} />,
      label: t('contact.phoneLabel'),
      value: phone,
      href: `tel:${phone.replace(/\s/g, '')}`,
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 28 }} />,
      label: t('contact.addressLabel'),
      value: address,
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 28 }} />,
      label: t('contact.hoursLabel'),
      value: hours,
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
            background: `radial-gradient(circle, ${mode === 'dark' ? 'rgba(220, 38, 38, 0.08)' : 'rgba(185, 28, 28, 0.05)'} 0%, transparent 70%)`,
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
            background: `radial-gradient(circle, ${mode === 'dark' ? 'rgba(14, 165, 233, 0.1)' : 'rgba(2, 132, 199, 0.06)'} 0%, transparent 70%)`,
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
                {wpLoading
                  ? // Loading skeleton
                    Array.from({ length: 4 }).map((_, index) => (
                      <Card key={index}>
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Skeleton variant="rounded" width={56} height={56} />
                          <Box sx={{ flex: 1 }}>
                            <Skeleton variant="text" width="40%" />
                            <Skeleton variant="text" width="70%" />
                          </Box>
                        </CardContent>
                      </Card>
                    ))
                  : contactInfoItems.map((info, index) => (
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
                              background: mode === 'dark' 
                                ? 'rgba(220, 38, 38, 0.1)' 
                                : 'rgba(185, 28, 28, 0.08)',
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

            {/* Contact Form */}
            <Grid item xs={12} md={7}>
              <Card
                sx={{
                  p: { xs: 3, md: 4 },
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
                <ContactForm />
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
