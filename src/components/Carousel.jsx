import { useState, useEffect, useCallback } from 'react'
import { Box, Typography, IconButton, Container } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import TransformIcon from '@mui/icons-material/Transform'
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices'
import MemoryIcon from '@mui/icons-material/Memory'
import BuildIcon from '@mui/icons-material/Build'
import { useThemeMode } from '../context/ThemeContext'

export default function Carousel() {
  const { t } = useTranslation()
  const { mode } = useThemeMode()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const primaryColor = mode === 'dark' ? '#dc2626' : '#b91c1c'
  const secondaryColor = mode === 'dark' ? '#ef4444' : '#dc2626'
  const steelBlue = mode === 'dark' ? '#0ea5e9' : '#0284c7'

  const slides = [
    {
      icon: <TransformIcon sx={{ fontSize: 80 }} aria-hidden="true" />,
      title: t('carousel.slide1.title'),
      description: t('carousel.slide1.description'),
      gradient: mode === 'dark' 
        ? 'linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(14, 165, 233, 0.1) 100%)'
        : 'linear-gradient(135deg, rgba(185, 28, 28, 0.1) 0%, rgba(2, 132, 199, 0.08) 100%)',
    },
    {
      icon: <ElectricalServicesIcon sx={{ fontSize: 80 }} aria-hidden="true" />,
      title: t('carousel.slide2.title'),
      description: t('carousel.slide2.description'),
      gradient: mode === 'dark'
        ? 'linear-gradient(135deg, rgba(14, 165, 233, 0.12) 0%, rgba(220, 38, 38, 0.1) 100%)'
        : 'linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(185, 28, 28, 0.08) 100%)',
    },
    {
      icon: <MemoryIcon sx={{ fontSize: 80 }} aria-hidden="true" />,
      title: t('carousel.slide3.title'),
      description: t('carousel.slide3.description'),
      gradient: mode === 'dark'
        ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.12) 0%, rgba(14, 165, 233, 0.1) 100%)'
        : 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(2, 132, 199, 0.08) 100%)',
    },
    {
      icon: <BuildIcon sx={{ fontSize: 80 }} aria-hidden="true" />,
      title: t('carousel.slide4.title'),
      description: t('carousel.slide4.description'),
      gradient: mode === 'dark'
        ? 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(239, 68, 68, 0.12) 100%)'
        : 'linear-gradient(135deg, rgba(185, 28, 28, 0.08) 0%, rgba(220, 38, 38, 0.1) 100%)',
    },
  ]

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
        py: 10,
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
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
            minHeight: 400,
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
                  p: { xs: 4, md: 6 },
                  background: slide.gradient,
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${mode === 'dark' ? 'rgba(220, 38, 38, 0.2)' : 'rgba(185, 28, 28, 0.15)'}`,
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: -100,
                    right: -100,
                    width: 300,
                    height: 300,
                    background: `radial-gradient(circle, ${mode === 'dark' ? 'rgba(220, 38, 38, 0.08)' : 'rgba(185, 28, 28, 0.05)'} 0%, transparent 70%)`,
                    borderRadius: '50%',
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -80,
                    left: -80,
                    width: 250,
                    height: 250,
                    background: `radial-gradient(circle, ${mode === 'dark' ? 'rgba(14, 165, 233, 0.1)' : 'rgba(2, 132, 199, 0.06)'} 0%, transparent 70%)`,
                    borderRadius: '50%',
                  },
                }}
              >
                <Box
                  sx={{
                    color: primaryColor,
                    mb: 3,
                    position: 'relative',
                    zIndex: 1,
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
                    mb: 2,
                    position: 'relative',
                    zIndex: 1,
                    fontWeight: 600,
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
                  color="text.secondary"
                  sx={{
                    maxWidth: 600,
                    position: 'relative',
                    zIndex: 1,
                    lineHeight: 1.8,
                    animation: currentSlide === index ? 'fadeInUp 0.6s ease-out 0.2s backwards' : 'none',
                  }}
                >
                  {slide.description}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Navigation Arrows */}
          <IconButton
            onClick={prevSlide}
            aria-label={t('carousel.previousSlide')}
            sx={{
              position: 'absolute',
              left: { xs: 8, md: 16 },
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: mode === 'dark' ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${mode === 'dark' ? 'rgba(220, 38, 38, 0.3)' : 'rgba(185, 28, 28, 0.2)'}`,
              color: primaryColor,
              zIndex: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: primaryColor,
                color: mode === 'dark' ? '#0f172a' : '#fff',
                transform: 'translateY(-50%) scale(1.1)',
              },
              '&:focus-visible': {
                bgcolor: primaryColor,
                color: mode === 'dark' ? '#0f172a' : '#fff',
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
              right: { xs: 8, md: 16 },
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: mode === 'dark' ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${mode === 'dark' ? 'rgba(220, 38, 38, 0.3)' : 'rgba(185, 28, 28, 0.2)'}`,
              color: primaryColor,
              zIndex: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: primaryColor,
                color: mode === 'dark' ? '#0f172a' : '#fff',
                transform: 'translateY(-50%) scale(1.1)',
              },
              '&:focus-visible': {
                bgcolor: primaryColor,
                color: mode === 'dark' ? '#0f172a' : '#fff',
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
                  : mode === 'dark' ? 'rgba(241, 245, 249, 0.2)' : 'rgba(15, 23, 42, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: currentSlide === index
                    ? `linear-gradient(90deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
                    : mode === 'dark' ? 'rgba(220, 38, 38, 0.5)' : 'rgba(185, 28, 28, 0.4)',
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
