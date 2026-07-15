import { Box, Card, Typography } from '@mui/material'

const GALLERY_MAX_HEIGHT = 400

export default function ProductGallery({ images }) {
  if (!images.length) return null

  const image = images[0]

  return (
    <Card sx={{ overflow: 'hidden', position: 'relative', backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
      <Box
        component="img"
        src={image.src}
        alt={image.alt}
        sx={{
          width: '100%',
          height: GALLERY_MAX_HEIGHT,
          display: 'block',
          objectFit: 'contain',
          backgroundColor: 'transparent',
        }}
      />

    </Card>
  )
}
