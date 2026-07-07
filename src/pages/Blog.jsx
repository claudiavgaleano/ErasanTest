import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Skeleton,
  Pagination,
  TextField,
  InputAdornment,
  Alert,
  Avatar,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ArticleIcon from '@mui/icons-material/Article'
import { useThemeMode } from '../context/ThemeContext'
import { usePosts, useCategories, contentHelpers } from '../hooks/useContent'

const PLACEHOLDER_IMAGE = 'https://placehold.co/600x400/1e293b/dc2626?text=Erasan+Blog'

export default function Blog() {
  const { t, i18n } = useTranslation()
  const { mode } = useThemeMode()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  
  const currentPage = parseInt(searchParams.get('page') || '1', 10)
  const currentCategory = searchParams.get('category') || null
  const activeSearch = searchParams.get('search') || ''

  const primaryColor = mode === 'dark' ? '#dc2626' : '#b91c1c'
  const gradientColor = mode === 'dark' 
    ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)'
    : 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)'

  // Fetch posts from local content
  const { posts, loading, error, totalPages } = usePosts({
    page: currentPage,
    perPage: 9,
    search: activeSearch,
    category: currentCategory,
  })

  // Fetch categories
  const { categories } = useCategories('posts')

  const handlePageChange = (event, page) => {
    const params = { page: page.toString() }
    if (currentCategory) params.category = currentCategory
    if (activeSearch) params.search = activeSearch
    setSearchParams(params)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery.trim() })
    } else {
      setSearchParams({})
    }
  }

  const handleCategoryFilter = (categoryId) => {
    if (categoryId === currentCategory) {
      setSearchParams({})
    } else {
      setSearchParams({ category: categoryId.toString() })
    }
  }

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
            top: '30%',
            right: '-10%',
            width: 500,
            height: 500,
            background: `radial-gradient(circle, ${mode === 'dark' ? 'rgba(220, 38, 38, 0.08)' : 'rgba(185, 28, 28, 0.05)'} 0%, transparent 70%)`,
            borderRadius: '50%',
            filter: 'blur(60px)',
          },
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', position: 'relative', zIndex: 1 }}>
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
              {t('blog.title')}
            </Typography>
            <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 3, fontWeight: 700 }}>
              {t('blog.heroTitle1')}{' '}
              <Box
                component="span"
                sx={{
                  background: gradientColor,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('blog.heroTitle2')}
              </Box>
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 4 }}>
              {t('blog.heroDescription')}
            </Typography>

            {/* Search Bar */}
            <Box component="form" onSubmit={handleSearch} sx={{ maxWidth: 500, mx: 'auto' }}>
              <TextField
                fullWidth
                placeholder={t('blog.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: primaryColor }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Category Filters */}
      {categories.length > 0 && (
        <Container maxWidth="lg" sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Chip
              label={t('blog.allCategories')}
              onClick={() => handleCategoryFilter(null)}
              color={!currentCategory ? 'primary' : 'default'}
              variant={!currentCategory ? 'filled' : 'outlined'}
              sx={{ fontWeight: 500 }}
            />
            {categories.map((cat) => (
              <Chip
                key={cat.id}
                label={cat.name}
                onClick={() => handleCategoryFilter(cat.id)}
                color={parseInt(currentCategory) === cat.id ? 'primary' : 'default'}
                variant={parseInt(currentCategory) === cat.id ? 'filled' : 'outlined'}
                sx={{ fontWeight: 500 }}
              />
            ))}
          </Box>
        </Container>
      )}

      {/* Blog Posts Grid */}
      <Box sx={{ py: 4 }}>
        <Container maxWidth="lg">
          {error && (
            <Alert severity="error" sx={{ mb: 4 }}>
              {t('blog.errorLoading')}
            </Alert>
          )}

          {activeSearch && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="body1" color="text.secondary">
                {t('blog.searchResults', { query: activeSearch })}
                <Button
                  size="small"
                  onClick={() => {
                    setSearchQuery('')
                    setSearchParams({})
                  }}
                  sx={{ ml: 2 }}
                >
                  {t('blog.clearSearch')}
                </Button>
              </Typography>
            </Box>
          )}

          <Grid container spacing={4}>
            {loading
              ? // Skeleton loading state
                Array.from({ length: 6 }).map((_, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                      <Skeleton variant="rectangular" height={200} />
                      <CardContent>
                        <Skeleton variant="text" width="40%" />
                        <Skeleton variant="text" height={32} />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" width="80%" />
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              : posts.length > 0
              ? posts.map((post, index) => {
                  const author = contentHelpers.getAuthor(post)
                  const postCategories = contentHelpers.getCategories(post)
                  const featuredImage = contentHelpers.getFeaturedImage(post) || PLACEHOLDER_IMAGE

                  return (
                    <Grid item xs={12} sm={6} md={4} key={post.id}>
                      <Card
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          transition: 'all 0.3s ease',
                          animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
                          '@keyframes fadeInUp': {
                            from: { opacity: 0, transform: 'translateY(30px)' },
                            to: { opacity: 1, transform: 'translateY(0)' },
                          },
                          '&:hover': {
                            transform: 'translateY(-8px)',
                            borderColor: mode === 'dark' ? 'rgba(220, 38, 38, 0.4)' : 'rgba(185, 28, 28, 0.3)',
                            '& .blog-image': {
                              transform: 'scale(1.05)',
                            },
                          },
                        }}
                      >
                        <Box sx={{ overflow: 'hidden' }}>
                          <CardMedia
                            component="img"
                            height="200"
                            image={featuredImage}
                            alt={post.title.rendered}
                            className="blog-image"
                            sx={{ transition: 'transform 0.4s ease' }}
                          />
                        </Box>
                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                          {/* Categories */}
                          {postCategories.length > 0 && (
                            <Box sx={{ mb: 1, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                              {postCategories.slice(0, 2).map((cat) => (
                                <Chip
                                  key={cat.id}
                                  label={cat.name}
                                  size="small"
                                  sx={{
                                    fontSize: '0.7rem',
                                    height: 22,
                                    backgroundColor: mode === 'dark' ? 'rgba(220, 38, 38, 0.15)' : 'rgba(185, 28, 28, 0.1)',
                                    color: primaryColor,
                                  }}
                                />
                              ))}
                            </Box>
                          )}

                          <Typography
                            variant="h5"
                            component="h3"
                            sx={{ mb: 1, fontWeight: 600, lineHeight: 1.3 }}
                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                          />

                          {/* Meta info */}
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, color: 'text.secondary' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <CalendarTodayIcon sx={{ fontSize: 14 }} />
                              <Typography variant="caption">
                                {contentHelpers.formatDate(post.date, i18n.language === 'es' ? 'es-ES' : 'en-US')}
                              </Typography>
                            </Box>
                          </Box>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 2, flexGrow: 1, lineHeight: 1.7 }}
                          >
                            {contentHelpers.getExcerpt(post.excerpt?.rendered || post.content.rendered, 120)}
                          </Typography>

                          {/* Author & Read More */}
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Avatar
                                src={author.avatar}
                                alt={author.name}
                                sx={{ width: 28, height: 28 }}
                              />
                              <Typography variant="caption" color="text.secondary">
                                {author.name}
                              </Typography>
                            </Box>
                            <Button
                              component={Link}
                              to={`/blog/${post.slug}`}
                              size="small"
                              endIcon={<ArrowForwardIcon />}
                              sx={{ color: primaryColor }}
                            >
                              {t('blog.readMore')}
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  )
                })
              : !loading && (
                  <Grid item xs={12}>
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                      <ArticleIcon sx={{ fontSize: 80, color: 'text.secondary', opacity: 0.3, mb: 2 }} />
                      <Typography variant="h5" color="text.secondary">
                        {t('blog.noPosts')}
                      </Typography>
                    </Box>
                  </Grid>
                )}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  )
}

