import { Box, Container, Typography, IconButton, Link as MuiLink, Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import YouTubeIcon from '@mui/icons-material/YouTube'
import EmailIcon from '@mui/icons-material/Email'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import { useThemeMode } from '../context/ThemeContext'

const socialLinks = [
  { icon: <LinkedInIcon aria-hidden="true" />, url: '#', label: 'LinkedIn' },
  { icon: <YouTubeIcon aria-hidden="true" />, url: '#', label: 'YouTube' },
  { icon: <EmailIcon aria-hidden="true" />, url: 'mailto:info@erasan.com', label: 'Email' },
]

export default function Footer() {
  const { t } = useTranslation()
  const { mode } = useThemeMode()

  const primaryColor = mode === 'dark' ? '#dc2626' : '#b91c1c'
  const gradientColor = mode === 'dark' 
    ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)'
    : 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)'

  const footerLinks = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.services'), path: '/products' },
    { label: t('nav.blog'), path: '/blog' },
    { label: t('nav.contact'), path: '/contact' },
  ]

  return (
    <Box
      component="footer"
      sx={{
        mt: 'auto',
        py: 6,
        px: 2,
        background: mode === 'dark'
          ? 'linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.95) 100%)'
          : 'linear-gradient(180deg, transparent 0%, rgba(226, 232, 240, 0.95) 100%)',
        borderTop: `1px solid ${mode === 'dark' ? 'rgba(220, 38, 38, 0.2)' : 'rgba(185, 28, 28, 0.15)'}`,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={4} justifyContent="space-between" alignItems="center">
          {/* Logo & Description */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <PrecisionManufacturingIcon aria-hidden="true" sx={{ color: primaryColor, fontSize: 32 }} />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: '"Rajdhani", sans-serif',
                  fontWeight: 700,
                  background: gradientColor,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '0.1em',
                }}
              >
                {t('brand')}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
              {t('footer.description')}
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={4}>
            <Box 
              component="nav" 
              aria-label={t('footer.quickLinks')}
              sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'center' }, gap: 3, flexWrap: 'wrap' }}
            >
              {footerLinks.map((link) => (
                <MuiLink
                  key={link.path}
                  component={Link}
                  to={link.path}
                  sx={{
                    color: 'text.secondary',
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: primaryColor,
                    },
                  }}
                >
                  {link.label}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          {/* Social Links */}
          <Grid item xs={12} md={4}>
            <Box 
              aria-label={t('footer.socialLinks')}
              sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 1 }}
            >
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  href={social.url}
                  aria-label={social.label}
                  sx={{
                    color: 'text.secondary',
                    border: `1px solid ${mode === 'dark' ? 'rgba(220, 38, 38, 0.3)' : 'rgba(185, 28, 28, 0.3)'}`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: primaryColor,
                      borderColor: primaryColor,
                      backgroundColor: mode === 'dark' ? 'rgba(220, 38, 38, 0.1)' : 'rgba(185, 28, 28, 0.1)',
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: `1px solid ${mode === 'dark' ? 'rgba(241, 245, 249, 0.1)' : 'rgba(15, 23, 42, 0.1)'}`,
            textAlign: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </Typography>
        </Box>
      </Container>
    </Box>
  )
}
