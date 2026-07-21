import { Link } from 'react-router-dom'
import { Box, Card, CardContent, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export default function CategoryListCard({
  icon,
  title,
  description,
  path,
  index = 0,
  mode,
  actionLabel,
}) {
  const primaryColor = mode === 'dark' ? '#dc2626' : '#b91c1c'
  const secondaryColor = mode === 'dark' ? '#ef4444' : '#dc2626'

  return (
    <Card
      component={Link}
      to={path}
      aria-label={`${actionLabel}: ${title}`}
      sx={{
        height: '100%',
        p: 2,
        textAlign: 'center',
        textDecoration: 'none',
        color: 'inherit',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
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
          '& .view-details-hint': {
            color: primaryColor,
          },
        },
        '&:focus-visible': {
          outline: `3px solid ${primaryColor}`,
          outlineOffset: 2,
        },
      }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1 }}>
        <Box
          className="category-icon"
          aria-hidden="true"
          sx={{
            color: primaryColor,
            mb: 2,
            transition: 'all 0.5s ease',
          }}
        >
          {icon}
        </Box>
        <Typography variant="h4" component="h3" sx={{ mb: 2, fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7, flexGrow: 1 }}>
          {description}
        </Typography>
        <Box
          className="view-details-hint"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.5,
            color: 'text.secondary',
            fontWeight: 600,
            transition: 'color 0.3s ease',
          }}
        >
          <Typography variant="body2" component="span" sx={{ fontWeight: 600 }}>
            {actionLabel}
          </Typography>
          <ArrowForwardIcon fontSize="small" aria-hidden="true" />
        </Box>
      </CardContent>
    </Card>
  )
}
