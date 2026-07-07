import { Box, Container, Typography, Grid, Card, CardContent, Avatar } from '@mui/material'
import { useTranslation } from 'react-i18next'
import GroupsIcon from '@mui/icons-material/Groups'
import FactoryIcon from '@mui/icons-material/Factory'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { useThemeMode } from '../context/ThemeContext'

export default function About() {
  const { t } = useTranslation()
  const { mode } = useThemeMode()

  const primaryColor = mode === 'dark' ? '#dc2626' : '#b91c1c'
  const steelBlue = mode === 'dark' ? '#0ea5e9' : '#0284c7'
  const gradientColor = mode === 'dark' 
    ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)'
    : 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)'

  const stats = [
    { icon: <GroupsIcon />, value: '50+', label: t('about.teamMembers') },
    { icon: <FactoryIcon />, value: '500+', label: t('about.projectsCompleted') },
    { icon: <ThumbUpIcon />, value: '99%', label: t('about.clientSatisfaction') },
  ]

  const team = [
    {
      name: 'José María Mora',
      role: t('about.ceo'),
      initials: 'JM',
      color: primaryColor,
    },
    {
      name: 'José María Mora',
      role: t('about.leadDev'),
      initials: 'JM',
      color: steelBlue,
    },
    {
      name: 'José María Mora',
      role: t('about.designDirector'),
      initials: 'JM',
      color: mode === 'dark' ? '#ef4444' : '#dc2626',
    },
    {
      name: 'José María Mora',
      role: t('about.projectManager'),
      initials: 'JM',
      color: mode === 'dark' ? '#38bdf8' : '#0ea5e9',
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
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 600,
            background: `radial-gradient(circle, ${mode === 'dark' ? 'rgba(220, 38, 38, 0.08)' : 'rgba(185, 28, 28, 0.05)'} 0%, transparent 70%)`,
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
              {t('about.title')}
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                mb: 3,
                fontWeight: 700,
              }}
            >
              {t('about.heroTitle1')}{' '}
              <Box
                component="span"
                sx={{
                  background: gradientColor,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('about.heroTitle2')}
              </Box>
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}
            >
              {t('about.heroDescription')}
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card
                  sx={{
                    textAlign: 'center',
                    py: 4,
                    animation: `fadeInUp 0.6s ease-out ${index * 0.15}s backwards`,
                    '@keyframes fadeInUp': {
                      from: {
                        opacity: 0,
                        transform: 'translateY(20px)',
                      },
                      to: {
                        opacity: 1,
                        transform: 'translateY(0)',
                      },
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ color: primaryColor, mb: 2 }}>{stat.icon}</Box>
                    <Typography
                      variant="h2"
                      sx={{
                        background: gradientColor,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 700,
                        mb: 1,
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Mission Section */}
      <Box
        sx={{
          py: 10,
          background: `linear-gradient(135deg, ${mode === 'dark' ? 'rgba(220, 38, 38, 0.05)' : 'rgba(185, 28, 28, 0.03)'} 0%, ${mode === 'dark' ? 'rgba(14, 165, 233, 0.08)' : 'rgba(2, 132, 199, 0.04)'} 100%)`,
          borderTop: `1px solid ${mode === 'dark' ? 'rgba(220, 38, 38, 0.1)' : 'rgba(185, 28, 28, 0.1)'}`,
          borderBottom: `1px solid ${mode === 'dark' ? 'rgba(220, 38, 38, 0.1)' : 'rgba(185, 28, 28, 0.1)'}`,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
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
                {t('about.missionTitle')}
              </Typography>
              <Typography variant="h2" sx={{ mb: 3, fontWeight: 600 }}>
                {t('about.missionHeading')}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
                {t('about.missionDescription1')}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                {t('about.missionDescription2')}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: 400,
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${mode === 'dark' ? 'rgba(220, 38, 38, 0.12)' : 'rgba(185, 28, 28, 0.08)'} 0%, ${mode === 'dark' ? 'rgba(14, 165, 233, 0.15)' : 'rgba(2, 132, 199, 0.1)'} 100%)`,
                  border: `1px solid ${mode === 'dark' ? 'rgba(220, 38, 38, 0.2)' : 'rgba(185, 28, 28, 0.15)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 200,
                    height: 200,
                    background: `radial-gradient(circle, ${mode === 'dark' ? 'rgba(220, 38, 38, 0.2)' : 'rgba(185, 28, 28, 0.12)'} 0%, transparent 70%)`,
                    borderRadius: '50%',
                  },
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: '8rem',
                    opacity: 0.15,
                    fontFamily: '"Rajdhani", sans-serif',
                    fontWeight: 700,
                    color: primaryColor,
                  }}
                >
                  30+
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
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
              {t('about.teamTitle')}
            </Typography>
            <Typography variant="h2" sx={{ mb: 2, fontWeight: 600 }}>
              {t('about.teamHeading')}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              {t('about.teamDescription')}
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {team.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={member.name}>
                <Card
                  sx={{
                    textAlign: 'center',
                    py: 4,
                    transition: 'all 0.3s ease',
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      borderColor: mode === 'dark' ? 'rgba(220, 38, 38, 0.4)' : 'rgba(185, 28, 28, 0.3)',
                      '& .team-avatar': {
                        transform: 'scale(1.1)',
                        boxShadow: `0 0 30px ${member.color}50`,
                      },
                    },
                  }}
                >
                  <CardContent>
                    <Avatar
                      className="team-avatar"
                      sx={{
                        width: 100,
                        height: 100,
                        mx: 'auto',
                        mb: 2,
                        bgcolor: member.color,
                        fontSize: '1.8rem',
                        fontWeight: 600,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {member.initials}
                    </Avatar>
                    <Typography variant="h5" sx={{ mb: 0.5, fontWeight: 600 }}>
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {member.role}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
