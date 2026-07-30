import { Box, Card, Typography } from '@mui/material'

const GALLERY_MAX_HEIGHT = 400

export default function ProductGallery({ images }) {
  if (!images.length) return null

  const image = images[0]

  return (
    <Card sx={{ overflow: 'hidden', position: 'relative', backgroundColor: 'rgb(253, 253, 253)', border: 'none', boxShadow: 'none', padding: '16px 64px' }}>
      <Box
        component="img"
        src={image.src}
        alt={image.alt}
        sx={{
          width: '100%',
          height: GALLERY_MAX_HEIGHT,
          display: 'block',
          objectFit: 'contain',
          backgroundColor: 'rgb(253, 253, 253)',
        }}
      />

    </Card>
  )
}
