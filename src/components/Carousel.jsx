import { useState, useEffect, useCallback, useMemo } from 'react'
import { Box, Typography, IconButton, Container } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TransformIcon from '@mui/icons-material/Transform'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import MemoryIcon from '@mui/icons-material/Memory'
import { HOME_CAROUSEL_SLIDES } from '../data/homeCarouselSlides'

// Source photos are ~1600×567. Locking this ratio keeps object-fit cover under ~20% crop.
const SLIDE_IMAGE_ASPECT = '1600 / 567'

export default function Carousel() {
  const { t } = useTranslation()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const primaryColor = '#b91c1c'
  const secondaryColor = '#dc2626'

  const slides = useMemo(
    () => [
      {
        icon: <TransformIcon aria-hidden="true" />,
        title: t('carousel.slide1.title'),
        description: t('carousel.slide1.description'),
        image: HOME_CAROUSEL_SLIDES[0]?.image,
        gradient: 'linear-gradient(135deg, rgba(185, 28, 28, 0.1) 0%, rgba(2, 132, 199, 0.08) 100%)',
      },
      {
        icon: <PhoneRoundedIcon aria-hidden="true" />,
        title: t('carousel.slide2.title'),
        description: t('carousel.slide2.description'),
        image: HOME_CAROUSEL_SLIDES[1]?.image,
        gradient: 'linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(185, 28, 28, 0.08) 100%)',
      },
      {
        icon: <MemoryIcon aria-hidden="true" />,
        title: t('carousel.slide3.title'),
        description: t('carousel.slide3.description'),
        image: HOME_CAROUSEL_SLIDES[2]?.image,
        gradient: 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(2, 132, 199, 0.08) 100%)',
      },
/*       {
        icon: <BuildIcon sx={{ fontSize: 80 }} aria-hidden="true" />,
        title: t('carousel.slide4.title'),
        description: t('carousel.slide4.description'),
        image: HOME_CAROUSEL_SLIDES[3]?.image,
        gradient: 'linear-gradient(135deg, rgba(185, 28, 28, 0.08) 0%, rgba(220, 38, 38, 0.1) 100%)',
      }, */
    ],
    [t]
  )

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide()
    } else if (e.key === 'ArrowRight') {
      nextSlide()
    }
  }, [nextSlide, prevSlide])

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  return (
    <Box
      component="section"
      aria-label={t('carousel.heading')}
      sx={{
        py: { xs: 6, md: 10 },
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 6 } }}>
          <Typography
            variant="overline"
            component="span"
            sx={{
              color: primaryColor,
              fontWeight: 700,
              letterSpacing: 4,
              mb: 2,
              display: 'block',
              fontSize: '0.85rem',
            }}
          >
            {t('carousel.title')}
          </Typography>
          <Typography variant="h2" component="h2" sx={{ mb: 2, fontWeight: 600 }}>
            {t('carousel.heading')}
          </Typography>
        </Box>

        {/* Carousel Container */}
        <Box
          role="region"
          aria-roledescription="carousel"
          aria-label={t('carousel.heading')}
          sx={{
            position: 'relative',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          {/* Live region for screen readers */}
          <Box
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          >
            {`${t('carousel.slide')} ${currentSlide + 1} ${t('carousel.of')} ${slides.length}: ${slides[currentSlide].title}`}
          </Box>

          {/* Slides */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'stretch',
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {slides.map((slide, index) => (
              <Box
                key={index}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}
                aria-hidden={currentSlide !== index}
                tabIndex={currentSlide === index ? 0 : -1}
                sx={{
                  minWidth: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: { xs: 'stretch', md: 'center' },
                  height: { xs: 400, sm: 400, md: 'auto' },
                  minHeight: { xs: 400, sm: 400, md: 0 },
                  aspectRatio: { xs: 'unset', sm: 'unset', md: '2.4 / 1', lg: SLIDE_IMAGE_ASPECT },
                  background: slide.image ? '#0f172a' : slide.gradient,
                  border: `1px solid rgba(185, 28, 28, 0.15)`,
                  borderRadius: 2,
                  boxSizing: 'border-box',
                  '&::before': slide.image
                    ? undefined
                    : {
                        content: '""',
                        position: 'absolute',
                        top: -100,
                        right: -100,
                        width: 300,
                        height: 300,
                        background: `radial-gradient(circle, rgba(185, 28, 28, 0.05) 0%, transparent 70%)`,
                        borderRadius: '50%',
                      },
                  '&::after': slide.image
                    ? undefined
                    : {
                        content: '""',
                        position: 'absolute',
                        bottom: -80,
                        left: -80,
                        width: 250,
                        height: 250,
                        background: `radial-gradient(circle, rgba(2, 132, 199, 0.06) 0%, transparent 70%)`,
                        borderRadius: '50%',
                      },
                }}
              >
                {slide.image ? (
                  <Box
                    component="img"
                    src={slide.image}
                    alt=""
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: { xs: 'auto', md: 0 },
                      height: '100%',
                      width: { xs: 'auto', md: '100%' },
                      minWidth: '100%',
                      maxWidth: 'none',
                      objectFit: 'cover',
                      objectPosition: { xs: 'right center', md: 'center' },
                      display: 'block',
                      zIndex: 0,
                    }}
                  />
                ) : null}
                {slide.image ? (
                  <Box
                    aria-hidden="true"
                    sx={{
                      display: { xs: 'none', md: 'block' },
                      position: 'absolute',
                      inset: 0,
                      zIndex: 1,
                      background:
                        'linear-gradient(90deg, rgba(15, 23, 42, 0.86) 0%, rgba(15, 23, 42, 0.5) 46%, rgba(15, 23, 42, 0) 72%)',
                    }}
                  />
                ) : null}
                <Box
                  sx={{
                    position: { xs: 'absolute', md: 'relative' },
                    zIndex: 2,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: { xs: '100%', md: '55%' },
                    maxWidth: { xs: 'none', md: 560 },
                    height: { xs: '35%', md: 'auto' },
                    boxSizing: 'border-box',
                    pl: { xs: 2, sm: 2.5, md: 10, lg: 11 },
                    pr: { xs: 2, sm: 2.5, md: 4, lg: 5 },
                    py: { xs: 1.25, sm: 1.5, md: 3 },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'left',
                    bgcolor: {
                      xs: 'rgba(8, 15, 30, 0.92)',
                      md: 'transparent',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: { xs: 'none', md: 'block' },
                      color: slide.image ? '#fff' : primaryColor,
                      mb: 2,
                      '& .MuiSvgIcon-root': {
                        fontSize: 56,
                      },
                      animation: currentSlide === index ? 'bounceIn 0.6s ease-out' : 'none',
                      '@keyframes bounceIn': {
                        '0%': { transform: 'scale(0.8)', opacity: 0 },
                        '50%': { transform: 'scale(1.05)' },
                        '100%': { transform: 'scale(1)', opacity: 1 },
                      },
                    }}
                  >
                    {slide.icon}
                  </Box>
                  <Typography
                    variant="h3"
                    component="h3"
                    sx={{
                      mb: { xs: 0.5, md: 1.5 },
                      fontWeight: 600,
                      fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.75rem', lg: '1.85rem' },
                      lineHeight: 1.25,
                      overflowWrap: 'break-word',
                      color: slide.image ? '#fff' : 'text.primary',
                      animation: currentSlide === index ? 'fadeInUp 0.6s ease-out 0.1s backwards' : 'none',
                      '@keyframes fadeInUp': {
                        from: { opacity: 0, transform: 'translateY(20px)' },
                        to: { opacity: 1, transform: 'translateY(0)' },
                      },
                    }}
                  >
                    {slide.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      maxWidth: { xs: '100%', md: 600 },
                      width: '100%',
                      lineHeight: { xs: 1.4, md: 1.7 },
                      fontSize: { xs: '0.8125rem', sm: '0.875rem', md: '1rem' },
                      overflowWrap: 'break-word',
                      color: slide.image ? 'rgba(255, 255, 255, 0.9)' : 'text.secondary',
                      animation: currentSlide === index ? 'fadeInUp 0.6s ease-out 0.2s backwards' : 'none',
                    }}
                  >
                    {slide.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          {/* Navigation Arrows */}
          <IconButton
            onClick={prevSlide}
            aria-label={t('carousel.previousSlide')}
            sx={{
              position: 'absolute',
              left: { xs: 4, md: 16 },
              top: { xs: '32.5%', md: '50%' },
              transform: 'translateY(-50%)',
              width: { xs: 32, md: 40 },
              height: { xs: 32, md: 40 },
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: `1px solid rgba(185, 28, 28, 0.2)`,
              color: primaryColor,
              zIndex: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: primaryColor,
                color: '#fff',
                transform: 'translateY(-50%) scale(1.1)',
              },
              '&:focus-visible': {
                bgcolor: primaryColor,
                color: '#fff',
              },
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            onClick={nextSlide}
            aria-label={t('carousel.nextSlide')}
            sx={{
              position: 'absolute',
              right: { xs: 4, md: 16 },
              top: { xs: '32.5%', md: '50%' },
              transform: 'translateY(-50%)',
              width: { xs: 32, md: 40 },
              height: { xs: 32, md: 40 },
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: `1px solid rgba(185, 28, 28, 0.2)`,
              color: primaryColor,
              zIndex: 3,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: primaryColor,
                color: '#fff',
                transform: 'translateY(-50%) scale(1.1)',
              },
              '&:focus-visible': {
                bgcolor: primaryColor,
                color: '#fff',
              },
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>

        {/* Dots Indicator */}
        <Box
          role="tablist"
          aria-label={t('carousel.slideIndicators')}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 1.5,
            mt: 4,
          }}
        >
          {slides.map((slide, index) => (
            <Box
              key={index}
              role="tab"
              tabIndex={0}
              aria-selected={currentSlide === index}
              aria-label={`${t('carousel.goToSlide')} ${index + 1}: ${slide.title}`}
              onClick={() => goToSlide(index)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  goToSlide(index)
                }
              }}
              sx={{
                width: currentSlide === index ? 32 : 12,
                height: 12,
                borderRadius: 1,
                background: currentSlide === index
                  ? `linear-gradient(90deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
                  : 'rgba(15, 23, 42, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: currentSlide === index
                    ? `linear-gradient(90deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
                    : 'rgba(185, 28, 28, 0.4)',
                },
                '&:focus-visible': {
                  outline: `3px solid ${primaryColor}`,
                  outlineOffset: 2,
                },
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  )
}
