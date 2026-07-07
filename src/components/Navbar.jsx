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
  Menu,
  MenuItem,
  Collapse,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeToggle from './ThemeToggle'
import { useThemeMode } from '../context/ThemeContext'

const PRODUCT_PATHS = ['/products', '/coil-winding', '/accesories', '/retrofit']

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
  const [productsMenuAnchor, setProductsMenuAnchor] = useState(null)
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
  const location = useLocation()

  const productSubItems = [
    { label: t('nav.coilWinding'), path: '/coil-winding' },
    { label: t('nav.accesories'), path: '/accesories' },
    { label: t('nav.retrofit'), path: '/retrofit' },
  ]

  const navItems = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.blog'), path: '/blog' },
    { label: t('nav.contact'), path: '/contact' },
  ]

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const isActive = (path) => location.pathname === path

  const isProductsActive = () => {
    return PRODUCT_PATHS.some(
      (path) =>
        location.pathname === path ||
        (path === '/products' && location.pathname.startsWith('/products/'))
    )
  }

  const isProductSubActive = (path) => location.pathname === path

  const primaryColor = mode === 'dark' ? '#dc2626' : '#b91c1c'
  const gradientColor = mode === 'dark'
    ? 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)'
    : 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)'

  const navButtonSx = (active) => ({
    color: active ? primaryColor : mode === 'dark' ? '#f1f5f9' : '#0f172a',
    fontWeight: active ? 600 : 500,
    position: 'relative',
    px: 2,
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 6,
      left: '50%',
      transform: 'translateX(-50%)',
      width: active ? '60%' : 0,
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
  })

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
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/"
            onClick={handleDrawerToggle}
            sx={{
              py: 2,
              px: 4,
              '&:hover': {
                backgroundColor: mode === 'dark' ? 'rgba(220, 38, 38, 0.1)' : 'rgba(185, 28, 28, 0.1)',
              },
            }}
          >
            <ListItemText
              primary={t('nav.home')}
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '1.2rem',
                  fontWeight: isActive('/') ? 600 : 400,
                  color: isActive('/') ? primaryColor : mode === 'dark' ? '#f1f5f9' : '#0f172a',
                },
              }}
            />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/about"
            onClick={handleDrawerToggle}
            sx={{
              py: 2,
              px: 4,
              '&:hover': {
                backgroundColor: mode === 'dark' ? 'rgba(220, 38, 38, 0.1)' : 'rgba(185, 28, 28, 0.1)',
              },
            }}
          >
            <ListItemText
              primary={t('nav.about')}
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '1.2rem',
                  fontWeight: isActive('/about') ? 600 : 400,
                  color: isActive('/about') ? primaryColor : mode === 'dark' ? '#f1f5f9' : '#0f172a',
                },
              }}
            />
          </ListItemButton>
        </ListItem>

        {/* Products expandable section */}
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
            sx={{
              py: 2,
              px: 4,
              '&:hover': {
                backgroundColor: mode === 'dark' ? 'rgba(220, 38, 38, 0.1)' : 'rgba(185, 28, 28, 0.1)',
              },
            }}
          >
            <ListItemText
              primary={t('nav.services')}
              sx={{
                '& .MuiListItemText-primary': {
                  fontSize: '1.2rem',
                  fontWeight: isProductsActive() ? 600 : 400,
                  color: isProductsActive() ? primaryColor : mode === 'dark' ? '#f1f5f9' : '#0f172a',
                },
              }}
            />
            {mobileProductsOpen ? <ExpandLess sx={{ color: primaryColor }} /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={mobileProductsOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              component={Link}
              to="/products"
              onClick={handleDrawerToggle}
              sx={{ pl: 6, py: 1.5 }}
            >
              <ListItemText
                primary={t('nav.allProducts')}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: '1rem',
                    fontWeight: isActive('/products') ? 600 : 400,
                    color: isActive('/products') ? primaryColor : 'text.secondary',
                  },
                }}
              />
            </ListItemButton>
            {productSubItems.map((item) => (
              <ListItemButton
                key={item.path}
                component={Link}
                to={item.path}
                onClick={handleDrawerToggle}
                sx={{ pl: 6, py: 1.5 }}
              >
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '1rem',
                      fontWeight: isProductSubActive(item.path) ? 600 : 400,
                      color: isProductSubActive(item.path) ? primaryColor : 'text.secondary',
                    },
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        {navItems.slice(2).map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              onClick={handleDrawerToggle}
              sx={{
                py: 2,
                px: 4,
                '&:hover': {
                  backgroundColor: mode === 'dark' ? 'rgba(220, 38, 38, 0.1)' : 'rgba(185, 28, 28, 0.1)',
                },
              }}
            >
              <ListItemText
                primary={item.label}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontSize: '1.2rem',
                    fontWeight: isActive(item.path) ? 600 : 400,
                    color: isActive(item.path) ? primaryColor : mode === 'dark' ? '#f1f5f9' : '#0f172a',
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
                <Button component={Link} to="/" sx={navButtonSx(isActive('/'))}>
                  {t('nav.home')}
                </Button>
                <Button component={Link} to="/about" sx={navButtonSx(isActive('/about'))}>
                  {t('nav.about')}
                </Button>

                {/* Products Dropdown */}
                <Box
                  onMouseEnter={(e) => setProductsMenuAnchor(e.currentTarget)}
                  onMouseLeave={() => setProductsMenuAnchor(null)}
                >
                  <Button
                    component={Link}
                    to="/products"
                    endIcon={<KeyboardArrowDownIcon sx={{ fontSize: '1rem !important' }} />}
                    aria-haspopup="true"
                    aria-expanded={Boolean(productsMenuAnchor)}
                    sx={navButtonSx(isProductsActive())}
                  >
                    {t('nav.services')}
                  </Button>
                  <Menu
                    anchorEl={productsMenuAnchor}
                    open={Boolean(productsMenuAnchor)}
                    onClose={() => setProductsMenuAnchor(null)}
                    MenuListProps={{
                      onMouseEnter: () => setProductsMenuAnchor(productsMenuAnchor),
                      onMouseLeave: () => setProductsMenuAnchor(null),
                      'aria-label': t('nav.productsMenu'),
                    }}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    sx={{ pointerEvents: productsMenuAnchor ? 'auto' : 'none' }}
                  >
                    {productSubItems.map((item) => (
                      <MenuItem
                        key={item.path}
                        component={Link}
                        to={item.path}
                        onClick={() => setProductsMenuAnchor(null)}
                        selected={isProductSubActive(item.path)}
                        sx={{
                          minWidth: 220,
                          fontWeight: isProductSubActive(item.path) ? 600 : 400,
                          color: isProductSubActive(item.path) ? primaryColor : 'inherit',
                        }}
                      >
                        {item.label}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>

                {navItems.slice(2).map((item) => (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    sx={navButtonSx(isActive(item.path))}
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
