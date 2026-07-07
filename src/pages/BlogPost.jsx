import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Skeleton,
  Breadcrumbs,
  Divider,
  Avatar,
  Grid,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PersonIcon from '@mui/icons-material/Person'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import ArticleIcon from '@mui/icons-material/Article'
import { useThemeMode } from '../context/ThemeContext'
import { usePost, useRecentPosts, contentHelpers } from '../hooks/useContent'

const PLACEHOLDER_IMAGE = 'https://placehold.co/1200x600/1e293b/dc2626?text=Erasan+Blog'

export default function BlogPost() {
  const { slug } = useParams()
  const { t, i18n } = useTranslation()
  const { mode } = useThemeMode()
  
  const primaryColor = mode === 'dark' ? '#dc2626' : '#b91c1c'
  const gradientColor = mode === 'dark' 
    ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)'
    : 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)'

  const { post, loading, error } = usePost(slug)
  const { posts: recentPosts } = useRecentPosts(3)

  if (loading) {
    return (
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <Skeleton variant="text" width={300} height={24} sx={{ mb: 4 }} />
          <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2, mb: 4 }} />
          <Skeleton variant="text" height={60} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" width="80%" />
        </Container>
      </Box>
    )
  }

  if (error || !post) {
    return (
      <Box sx={{ py: 16, textAlign: 'center' }}>
        <Container maxWidth="md">
          <ArticleIcon sx={{ fontSize: 100, color: 'text.secondary', opacity: 0.3, mb: 3 }} />
          <Typography variant="h4" sx={{ mb: 2 }}>
            {t('blog.postNotFound')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            {t('blog.postNotFoundDesc')}
          </Typography>
          <Button
            component={Link}
            to="/blog"
            variant="contained"
            startIcon={<ArrowBackIcon />}
          >
            {t('blog.backToBlog')}
          </Button>
        </Container>
      </Box>
    )
  }

  const author = contentHelpers.getAuthor(post)
  const categories = contentHelpers.getCategories(post)
  const tags = contentHelpers.getTags(post)
  const featuredImage = contentHelpers.getFeaturedImage(post, 'full') || PLACEHOLDER_IMAGE

  return (
    <Box>
      {/* Breadcrumbs */}
      <Box sx={{ py: 3, borderBottom: `1px solid ${mode === 'dark' ? 'rgba(220, 38, 38, 0.1)' : 'rgba(185, 28, 28, 0.08)'}` }}>
        <Container maxWidth="lg">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              {t('nav.home')}
            </Link>
            <Link to="/blog" style={{ color: 'inherit', textDecoration: 'none' }}>
              {t('blog.title')}
            </Link>
            <Typography color="text.primary" sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            </Typography>
          </Breadcrumbs>
        </Container>
      </Box>

      {/* Article */}
      <Box sx={{ py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Main Content */}
            <Grid item xs={12} md={8}>
              {/* Featured Image */}
              <Box
                sx={{
                  mb: 4,
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="img"
                  src={featuredImage}
                  alt={post.title.rendered}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                  }}
                />
              </Box>

              {/* Categories */}
              {categories.length > 0 && (
                <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {categories.map((cat) => (
                    <Chip
                      key={cat.id}
                      label={cat.name}
                      size="small"
                      component={Link}
                      to={`/blog?category=${cat.id}`}
                      clickable
                      sx={{
                        backgroundColor: mode === 'dark' ? 'rgba(220, 38, 38, 0.15)' : 'rgba(185, 28, 28, 0.1)',
                        color: primaryColor,
                        '&:hover': {
                          backgroundColor: mode === 'dark' ? 'rgba(220, 38, 38, 0.25)' : 'rgba(185, 28, 28, 0.2)',
                        },
                      }}
                    />
                  ))}
                </Box>
              )}

              {/* Title */}
              <Typography
                variant="h1"
                component="h1"
                sx={{ mb: 3, fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700, lineHeight: 1.2 }}
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />

              {/* Meta */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar src={author.avatar} alt={author.name} sx={{ width: 40, height: 40 }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {author.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {t('blog.author')}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                  <CalendarTodayIcon sx={{ fontSize: 16 }} />
                  <Typography variant="body2">
                    {contentHelpers.formatDate(post.date, i18n.language === 'es' ? 'es-ES' : 'en-US')}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ mb: 4 }} />

              {/* Content */}
              <Box
                sx={{
                  '& h1, & h2, & h3, & h4, & h5, & h6': {
                    fontFamily: '"Rajdhani", sans-serif',
                    fontWeight: 600,
                    mt: 4,
                    mb: 2,
                  },
                  '& h2': { fontSize: '1.75rem' },
                  '& h3': { fontSize: '1.5rem' },
                  '& p': { mb: 2, lineHeight: 1.8 },
                  '& ul, & ol': { pl: 3, mb: 2 },
                  '& li': { mb: 1 },
                  '& img': {
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: 2,
                    my: 3,
                  },
                  '& blockquote': {
                    borderLeft: `4px solid ${primaryColor}`,
                    pl: 3,
                    py: 1,
                    my: 3,
                    fontStyle: 'italic',
                    backgroundColor: mode === 'dark' ? 'rgba(220, 38, 38, 0.05)' : 'rgba(185, 28, 28, 0.03)',
                    borderRadius: '0 4px 4px 0',
                  },
                  '& a': {
                    color: primaryColor,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  },
                  '& pre': {
                    backgroundColor: mode === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.05)',
                    p: 2,
                    borderRadius: 1,
                    overflow: 'auto',
                    mb: 2,
                  },
                  '& code': {
                    fontFamily: 'monospace',
                    backgroundColor: mode === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.05)',
                    px: 0.5,
                    borderRadius: 0.5,
                  },
                }}
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />

              {/* Tags */}
              {tags.length > 0 && (
                <Box sx={{ mt: 4, pt: 4, borderTop: `1px solid ${mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <LocalOfferIcon sx={{ color: 'text.secondary', fontSize: 18 }} />
                    {tags.map((tag) => (
                      <Chip
                        key={tag.id}
                        label={tag.name}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Back Button */}
              <Box sx={{ mt: 6 }}>
                <Divider sx={{ mb: 4 }} />
                <Button
                  component={Link}
                  to="/blog"
                  startIcon={<ArrowBackIcon />}
                  sx={{ color: 'text.secondary' }}
                >
                  {t('blog.backToBlog')}
                </Button>
              </Box>
            </Grid>

            {/* Sidebar */}
            <Grid item xs={12} md={4}>
              {/* Recent Posts */}
              <Card sx={{ position: 'sticky', top: 100 }}>
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                    {t('blog.recentPosts')}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {recentPosts
                      .filter((p) => p.id !== post.id)
                      .slice(0, 3)
                      .map((recentPost) => (
                        <Box
                          key={recentPost.id}
                          component={Link}
                          to={`/blog/${recentPost.slug}`}
                          sx={{
                            display: 'flex',
                            gap: 2,
                            textDecoration: 'none',
                            color: 'inherit',
                            p: 1,
                            borderRadius: 1,
                            transition: 'background-color 0.2s',
                            '&:hover': {
                              backgroundColor: mode === 'dark' ? 'rgba(220, 38, 38, 0.1)' : 'rgba(185, 28, 28, 0.05)',
                            },
                          }}
                        >
                          <Box
                            component="img"
                            src={contentHelpers.getFeaturedImage(recentPost, 'thumbnail') || PLACEHOLDER_IMAGE}
                            alt=""
                            sx={{
                              width: 70,
                              height: 70,
                              borderRadius: 1,
                              objectFit: 'cover',
                            }}
                          />
                          <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 500,
                                lineHeight: 1.3,
                                mb: 0.5,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                              }}
                              dangerouslySetInnerHTML={{ __html: recentPost.title.rendered }}
                            />
                            <Typography variant="caption" color="text.secondary">
                              {contentHelpers.formatDate(recentPost.date, i18n.language === 'es' ? 'es-ES' : 'en-US')}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}

