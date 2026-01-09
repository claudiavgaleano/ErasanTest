import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Container,
  useScrollTrigger,
  Slide,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'
import { useThemeMode } from '../context/ThemeContext'

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger()
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

export default function Navbar() {
  const { t } = useTranslation()
  const { mode } = useThemeMode()
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.services'), path: '/products' },
    { label: t('nav.blog'), path: '/blog' },
    { label: t('nav.contact'), path: '/contact' },
  ]

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const isActive = (path) => location.pathname === path

  const primaryColor = mode === 'dark' ? '#dc2626' : '#b91c1c'
  const gradientColor = mode === 'dark' 
    ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)'
    : 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)'

  const drawer = (
    <Box
      sx={{
        height: '100%',
        background: mode === 'dark' 
          ? 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)'
          : 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)',
        pt: 2,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, mb: 4 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <ThemeToggle />
          <LanguageSwitcher />
        </Box>
        <IconButton 
          onClick={handleDrawerToggle} 
          aria-label={t('nav.closeMenu')}
          sx={{ color: primaryColor }}
        >
          <CloseIcon aria-hidden="true" />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                py: 2,
                px: 4,
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: isActive(item.path) ? 4 : 0,
                  height: '60%',
                  background: gradientColor,
                  borderRadius: 2,
                  transition: 'width 0.3s ease',
                },
                '&:hover': {
                  backgroundColor: mode === 'dark' 
                    ? 'rgba(220, 38, 38, 0.1)'
                    : 'rgba(185, 28, 28, 0.1)',
                },
              }}
            >
              <ListItemText
                primary={item.label}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: '1.2rem',
                    fontWeight: isActive(item.path) ? 600 : 400,
                    color: isActive(item.path) ? primaryColor : (mode === 'dark' ? '#f1f5f9' : '#0f172a'),
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <>
      <HideOnScroll>
        <AppBar position="fixed" elevation={0}>
          <Container maxWidth="lg">
            <Toolbar sx={{ py: 1 }}>
              <Box
                component={Link}
                to="/"
                aria-label={`${t('brand')} - ${t('nav.home')}`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  gap: 1.5,
                  flexGrow: 1,
                }}
              >
                <PrecisionManufacturingIcon
                  aria-hidden="true"
                  sx={{
                    color: primaryColor,
                    fontSize: 36,
                  }}
                />
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Rajdhani", sans-serif',
                    fontWeight: 700,
                    background: gradientColor,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '0.1em',
                    fontSize: '1.5rem',
                  }}
                >
                  {t('brand')}
                </Typography>
              </Box>

              {/* Desktop Navigation */}
              <Box 
                component="nav" 
                aria-label={t('nav.mainNavigation')}
                sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}
              >
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: isActive(item.path) ? primaryColor : (mode === 'dark' ? '#f1f5f9' : '#0f172a'),
                      fontWeight: isActive(item.path) ? 600 : 500,
                      position: 'relative',
                      px: 2,
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 6,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: isActive(item.path) ? '60%' : 0,
                        height: 2,
                        background: gradientColor,
                        borderRadius: 1,
                        transition: 'width 0.3s ease',
                      },
                      '&:hover': {
                        backgroundColor: 'transparent',
                        color: primaryColor,
                        '&::after': {
                          width: '60%',
                        },
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
                <Box sx={{ ml: 2, display: 'flex', gap: 1 }}>
                  <ThemeToggle />
                  <LanguageSwitcher />
                </Box>
              </Box>

              {/* Mobile Menu Button */}
              <IconButton
                color="inherit"
                aria-label={t('nav.openMenu')}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{
                  display: { md: 'none' },
                  color: primaryColor,
                }}
              >
                <MenuIcon aria-hidden="true" />
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>

      {/* Mobile Drawer */}
      <Drawer
        id="mobile-menu"
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        aria-label={t('nav.mobileNavigation')}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 280,
            border: 'none',
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Toolbar spacer */}
      <Toolbar sx={{ mb: 2 }} />
    </>
  )
}
