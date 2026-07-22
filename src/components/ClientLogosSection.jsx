import { Box, Container, Grid, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useThemeMode } from '../context/ThemeContext'
import { HOME_CLIENT_LOGOS } from '../data/homeClientLogos'

export default function ClientLogosSection() {
  const { t } = useTranslation()
  const { mode } = useThemeMode()

  const primaryColor = mode === 'dark' ? '#dc2626' : '#b91c1c'

  if (HOME_CLIENT_LOGOS.length === 0) return null

  return (
    <Box
      component="section"
      aria-label={t('home.clientLogosHeading')}
      sx={{
        py: { xs: 8, md: 10 },
        borderTop: `1px solid ${mode === 'dark' ? 'rgba(220, 38, 38, 0.15)' : 'rgba(185, 28, 28, 0.1)'}`,
        borderBottom: `1px solid ${mode === 'dark' ? 'rgba(220, 38, 38, 0.15)' : 'rgba(185, 28, 28, 0.1)'}`,
        background: `linear-gradient(135deg, ${mode === 'dark' ? 'rgba(220, 38, 38, 0.04)' : 'rgba(185, 28, 28, 0.03)'} 0%, ${mode === 'dark' ? 'rgba(14, 165, 233, 0.05)' : 'rgba(2, 132, 199, 0.03)'} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 6 } }}>
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
            {t('home.clientLogosTitle')}
          </Typography>
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 600 }}>
            {t('home.clientLogosHeading')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 640, mx: 'auto', lineHeight: 1.8 }}>
            {t('home.clientLogosDescription')}
          </Typography>
        </Box>

        <Grid container spacing={3} alignItems="center" justifyContent="center">
          {HOME_CLIENT_LOGOS.map((logo, index) => (
            <Grid item xs={6} sm={4} md={3} key={logo.id}>
              <Box
                sx={{
                  height: 120,
                  px: 2,
                  py: 2.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 2,
                  border: `1px solid ${mode === 'dark' ? 'rgba(220, 38, 38, 0.15)' : 'rgba(185, 28, 28, 0.12)'}`,
                  background: mode === 'dark' ? 'rgba(15, 23, 42, 0.35)' : 'rgba(255, 255, 255, 0.7)',
                  transition: 'all 0.3s ease',
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
                  '@keyframes fadeInUp': {
                    from: { opacity: 0, transform: 'translateY(16px)' },
                    to: { opacity: 1, transform: 'translateY(0)' },
                  },
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    borderColor: mode === 'dark' ? 'rgba(220, 38, 38, 0.35)' : 'rgba(185, 28, 28, 0.25)',
                    '& .client-logo': {
                      opacity: 1,
                      transform: 'scale(1.03)',
                    },
                  },
                }}
              >
                <Box
                  component="img"
                  src={logo.src}
                  alt={logo.name}
                  className="client-logo"
                  sx={{
                    maxWidth: '100%',
                    maxHeight: 72,
                    width: 'auto',
                    height: 'auto',
                    objectFit: 'contain',
                    opacity: 0.88,
                    transition: 'all 0.3s ease',
                  }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
