import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language'
import CheckIcon from '@mui/icons-material/Check'
import { useThemeMode } from '../context/ThemeContext'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
]

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const { mode } = useThemeMode()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode)
    handleClose()
  }

  const currentLang = languages.find((lang) => lang.code === i18n.language) || languages[0]
  const primaryColor = mode === 'dark' ? '#dc2626' : '#b91c1c'

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        id="language-button"
        aria-label={t('language.changeLanguage')}
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{
          color: primaryColor,
          border: '1px solid',
          borderColor: mode === 'dark' ? 'rgba(220, 38, 38, 0.3)' : 'rgba(185, 28, 28, 0.3)',
          borderRadius: 1,
          px: 1.5,
          gap: 0.5,
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: primaryColor,
            backgroundColor: mode === 'dark' ? 'rgba(220, 38, 38, 0.1)' : 'rgba(185, 28, 28, 0.1)',
          },
        }}
      >
        <LanguageIcon aria-hidden="true" sx={{ fontSize: 20 }} />
        <Box component="span" sx={{ fontSize: '1rem' }}>
          {currentLang.flag}
        </Box>
      </IconButton>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-button',
        }}
        PaperProps={{
          sx: {
            backgroundColor: mode === 'dark' ? 'rgba(30, 41, 59, 0.98)' : 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            border: '1px solid',
            borderColor: mode === 'dark' ? 'rgba(220, 38, 38, 0.2)' : 'rgba(185, 28, 28, 0.2)',
            mt: 1,
          },
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            selected={i18n.language === lang.code}
            sx={{
              py: 1.5,
              px: 2,
              '&.Mui-selected': {
                backgroundColor: mode === 'dark' ? 'rgba(220, 38, 38, 0.15)' : 'rgba(185, 28, 28, 0.15)',
              },
              '&:hover': {
                backgroundColor: mode === 'dark' ? 'rgba(220, 38, 38, 0.1)' : 'rgba(185, 28, 28, 0.1)',
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              <Box component="span" sx={{ fontSize: '1.2rem' }}>
                {lang.flag}
              </Box>
            </ListItemIcon>
            <ListItemText primary={lang.name} />
            {i18n.language === lang.code && (
              <CheckIcon aria-hidden="true" sx={{ color: primaryColor, ml: 1, fontSize: 18 }} />
            )}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}
