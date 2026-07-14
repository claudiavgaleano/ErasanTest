import { useThemeTokens } from '../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import { Box, Container, Typography } from '@mui/material'

export default function Legal() {
  const { t } = useTranslation()
  const { primaryColor } = useThemeTokens()

  const companyDetails = [
    'description1',
    'description2',
    'description3',
    'description4',
    'description5',
    'description6',
  ]

  const privacyDetails = [
    ['description8', 'description9'],
    ['description10', 'description11'],
    ['description12', 'description13'],
  ]

  const mapsDetails = [
    ['description15', 'description16'],
    ['description17', 'description18'],
    ['description19', 'description20'],
  ]

  return (
    <Box sx={{ py: { xs: 8, md: 10 } }}>
      <Container maxWidth="md">
        <Typography variant="h1" color="primary" align="center" gutterBottom sx={{ fontSize: { xs: '2rem', md: '2.75rem' }, mb: 4 }}>
          {t('legal.title')}
        </Typography>

        <Typography variant="h2" color="primary" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, mb: 2 }}>
          {t('legal.title2')}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {t('legal.description')}
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 4 }}>
          {companyDetails.map((key) => (
            <Box component="li" key={key} sx={{ mb: 1 }}>
              <Typography variant="body1" color="text.secondary">
                {t(`legal.${key}`)}
              </Typography>
            </Box>
          ))}
        </Box>

        <Typography variant="h2" color="primary" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, mb: 2 }}>
          {t('legal.title3')}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {t('legal.description7')}
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 4 }}>
          {privacyDetails.map(([titleKey, bodyKey]) => (
            <Box component="li" key={titleKey} sx={{ mb: 2 }}>
              <Typography variant="body1" color="text.primary" sx={{ fontWeight: 600 }}>
                {t(`legal.${titleKey}`)}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {t(`legal.${bodyKey}`)}
              </Typography>
            </Box>
          ))}
        </Box>

        <Typography variant="h2" color="primary" gutterBottom sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, mb: 2 }}>
          {t('legal.title4')}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {t('legal.description14')}
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 4 }}>
          {mapsDetails.map(([titleKey, bodyKey]) => (
            <Box component="li" key={titleKey} sx={{ mb: 2 }}>
              <Typography variant="body1" color="text.primary" sx={{ fontWeight: 600 }}>
                {t(`legal.${titleKey}`)}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {t(`legal.${bodyKey}`)}
              </Typography>
            </Box>
          ))}
        </Box>
        <Typography variant="body1" color="text.secondary">
          {t('legal.description21')}{' '}
          <Box
            component="a"
            href={t('legal.link2')}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: primaryColor, fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
          >
            {t('legal.link')}
          </Box>
          .
        </Typography>
      </Container>
    </Box>
  )
}