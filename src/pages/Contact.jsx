import { Box, Container, Typography, Card, CardContent } from '@mui/material'
import { useTranslation } from 'react-i18next'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { useThemeMode } from '../context/ThemeContext'

export default function Contact() {
  const { t } = useTranslation()
  const { mode } = useThemeMode()

  const primaryColor = mode === 'dark' ? '#dc2626' : '#b91c1c'
  const steelBlue = mode === 'dark' ? '#0ea5e9' : '#0284c7'
  const gradientColor = mode === 'dark'
    ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)'
    : 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)'

  const glossyPanelSx = {
    p: { xs: 3, md: 3.5 },
    borderRadius: 3,
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    background: mode === 'dark'
      ? 'linear-gradient(145deg, rgba(220, 38, 38, 0.18) 0%, rgba(30, 41, 59, 0.92) 45%, rgba(15, 23, 42, 0.96) 100%)'
      : 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(254, 242, 242, 0.88) 55%, rgba(254, 226, 226, 0.65) 100%)',
    backdropFilter: 'blur(16px)',
    border: `1px solid ${mode === 'dark' ? 'rgba(220, 38, 38, 0.3)' : 'rgba(185, 28, 28, 0.14)'}`,
    boxShadow: mode === 'dark'
      ? '0 12px 40px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      : '0 12px 40px rgba(185, 28, 28, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '45%',
      background: mode === 'dark'
        ? 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)'
        : 'linear-gradient(180deg, rgba(255, 255, 255, 0.65) 0%, transparent 100%)',
      pointerEvents: 'none',
    },
  }

  const contactIconBoxSx = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    flexShrink: 0,
    borderRadius: 1.5,
    color: '#fff',
    background: gradientColor,
    boxShadow: mode === 'dark'
      ? '0 4px 14px rgba(220, 38, 38, 0.35)'
      : '0 4px 14px rgba(185, 28, 28, 0.25)',
  }

  const getContactCardSx = (hasLink) => ({
    width: '100%',
    display: 'flex',
    textDecoration: 'none',
    color: 'inherit',
    background: mode === 'dark'
      ? 'rgba(15, 23, 42, 0.55)'
      : 'rgba(255, 255, 255, 0.75)',
    border: `1px solid ${mode === 'dark' ? 'rgba(220, 38, 38, 0.22)' : 'rgba(185, 28, 28, 0.1)'}`,
    borderLeft: `3px solid ${primaryColor}`,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    ...(hasLink && {
      cursor: 'pointer',
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: mode === 'dark'
          ? '0 6px 20px rgba(220, 38, 38, 0.18)'
          : '0 6px 20px rgba(185, 28, 28, 0.1)',
      },
    }),
  })

  const faqCardSx = {
    width: '100%',
    display: 'flex',
    background: mode === 'dark' ? 'rgba(30, 41, 59, 0.55)' : 'rgba(255, 255, 255, 0.85)',
    border: `1px solid ${mode === 'dark' ? 'rgba(148, 163, 184, 0.14)' : 'rgba(148, 163, 184, 0.22)'}`,
    boxShadow: 'none',
  }

  const faqIconBoxSx = {
    color: steelBlue,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    flexShrink: 0,
    borderRadius: '50%',
    background: mode === 'dark'
      ? 'rgba(14, 165, 233, 0.12)'
      : 'rgba(2, 132, 199, 0.08)',
  }

  const contactInfoItems = [
    {
      icon: <EmailIcon sx={{ fontSize: 24 }} />,
      label: t('contact.emailLabel'),
      value: t('contact.email'),
      href: `mailto:${t('contact.email')}`,
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 24 }} />,
      label: t('contact.phoneLabel'),
      value: t('contact.phone'),
      href: `tel:${t('contact.phone').replace(/\s/g, '')}`,
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 24 }} />,
      label: t('contact.hoursLabel'),
      value: t('contact.hours'),
    },
  ]

  const faqKeys = ['quote', 'support', 'custom', 'responseTime', 'international', 'training']

  const faqItems = faqKeys.map((key) => ({
    question: t(`contact.faq.${key}.question`),
    answer: t(`contact.faq.${key}.answer`),
  }))

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
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 4, md: 4 },
              alignItems: { md: 'flex-start' },
            }}
          >
            {/* Contact info — ~30% */}
            <Box
              sx={{
                width: { xs: '100%', md: '30%' },
                flexShrink: 0,
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Box sx={glossyPanelSx}>
                <Typography
                  variant="overline"
                  sx={{
                    color: primaryColor,
                    fontWeight: 700,
                    letterSpacing: 3,
                    fontSize: '0.78rem',
                    mb: 3,
                    display: 'block',
                    position: 'relative',
                  }}
                >
                  {t('contact.infoTitle')}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, position: 'relative' }}>
                  {contactInfoItems.map((info, index) => (
                    <Card
                      key={index}
                      component={info.href ? 'a' : 'div'}
                      href={info.href}
                      sx={{
                        ...getContactCardSx(Boolean(info.href)),
                        animation: `fadeInLeft 0.6s ease-out ${index * 0.1}s backwards`,
                        '@keyframes fadeInLeft': {
                          from: { opacity: 0, transform: 'translateX(-16px)' },
                          to: { opacity: 1, transform: 'translateX(0)' },
                        },
                      }}
                    >
                      <CardContent
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          py: 2,
                          '&:last-child': { pb: 2 },
                        }}
                      >
                        <Box sx={contactIconBoxSx} aria-hidden="true">
                          {info.icon}
                        </Box>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography
                            variant="overline"
                            sx={{
                              color: primaryColor,
                              fontWeight: 700,
                              letterSpacing: 1.5,
                              fontSize: '0.62rem',
                              mb: 0.25,
                              display: 'block',
                            }}
                          >
                            {info.label}
                          </Typography>
                          <Typography
                            variant="body1"
                            sx={{
                              fontWeight: 700,
                              fontSize: { xs: '0.95rem', md: '1rem' },
                              lineHeight: 1.35,
                              wordBreak: 'break-word',
                            }}
                          >
                            {info.value}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Box>
            </Box>

            {/* FAQ / Assistance — ~70% */}
            <Box sx={{ width: { xs: '100%', md: '70%' }, flex: 1 }}>
              <Typography
                variant="overline"
                sx={{
                  color: primaryColor,
                  fontWeight: 700,
                  letterSpacing: 4,
                  fontSize: '0.85rem',
                  mb: 2,
                  display: 'block',
                }}
              >
                {t('contact.assistanceTitle')}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 3, lineHeight: 1.8, maxWidth: 640 }}
              >
                {t('contact.assistanceIntro')}
              </Typography>

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                  gap: 2.5,
                }}
              >
                {faqItems.map((item, index) => (
                  <Card
                    key={index}
                    sx={{
                      ...faqCardSx,
                      animation: `fadeInUp 0.5s ease-out ${index * 0.08}s backwards`,
                      '@keyframes fadeInUp': {
                        from: { opacity: 0, transform: 'translateY(12px)' },
                        to: { opacity: 1, transform: 'translateY(0)' },
                      },
                    }}
                  >
                    <CardContent sx={{ p: 2.5, '&:last-child': { pb: 2.5 } }}>
                      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start', mb: 1.5 }}>
                        <Box sx={faqIconBoxSx} aria-hidden="true">
                          <HelpOutlineIcon sx={{ fontSize: 20 }} />
                        </Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 700, lineHeight: 1.4, pt: 0.25 }}
                        >
                          {item.question}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.7, pl: 6.5 }}
                      >
                        {item.answer}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
