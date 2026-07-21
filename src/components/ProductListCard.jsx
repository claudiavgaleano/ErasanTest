import { Link } from 'react-router-dom'
import { Box, Card, CardContent, CardMedia, Chip, Typography } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { contentHelpers } from '../hooks/useContent'

export default function ProductListCard({ product, index = 0, mode, viewDetailsLabel, featuredLabel }) {
  const primaryColor = mode === 'dark' ? '#dc2626' : '#b91c1c'

  return (
    <Card
      component={Link}
      to={`/products/${product.slug}`}
      aria-label={`${viewDetailsLabel}: ${String(product.title.rendered).replace(/<[^>]*>/g, '')}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        color: 'inherit',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
        '@keyframes fadeInUp': {
          from: { opacity: 0, transform: 'translateY(30px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        '&:hover': {
          transform: 'translateY(-8px)',
          borderColor: mode === 'dark' ? 'rgba(220, 38, 38, 0.4)' : 'rgba(185, 28, 28, 0.3)',
          '& .product-image': {
            transform: 'scale(1.05)',
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
      <Box sx={{ overflow: 'hidden', position: 'relative' }}>
        <CardMedia
          component="img"
          height="220"
          image={contentHelpers.getFeaturedImage(product)}
          alt={product.title.rendered}
          className="product-image"
          sx={{ transition: 'transform 0.4s ease', backgroundSize: 'contain', justifySelf: 'center', width: 'unset' }}
        />
        {product.acf?.featured && (
          <Chip
            label={featuredLabel}
            color="primary"
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              fontWeight: 600,
            }}
          />
        )}
      </Box>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography
          variant="h5"
          component="h3"
          sx={{ mb: 2, fontWeight: 600 }}
          dangerouslySetInnerHTML={{ __html: product.title.rendered }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1, lineHeight: 1.7 }}>
          {contentHelpers.getExcerpt(product.excerpt?.rendered || product.content.rendered, 120)}
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
            {viewDetailsLabel}
          </Typography>
          <ArrowForwardIcon fontSize="small" aria-hidden="true" />
        </Box>
      </CardContent>
    </Card>
  )
}
