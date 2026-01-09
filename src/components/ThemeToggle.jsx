import { IconButton, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { useThemeMode } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { t } = useTranslation()
  const { mode, toggleTheme } = useThemeMode()

  const primaryColor = mode === 'dark' ? '#dc2626' : '#b91c1c'

  return (
    <Tooltip title={mode === 'dark' ? t('theme.switchToLight') : t('theme.switchToDark')}>
      <IconButton
        onClick={toggleTheme}
        aria-label={mode === 'dark' ? t('theme.switchToLight') : t('theme.switchToDark')}
        aria-pressed={mode === 'dark'}
        sx={{
          color: primaryColor,
          border: '1px solid',
          borderColor: mode === 'dark' ? 'rgba(220, 38, 38, 0.3)' : 'rgba(185, 28, 28, 0.3)',
          borderRadius: 1,
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: primaryColor,
            backgroundColor: mode === 'dark' ? 'rgba(220, 38, 38, 0.1)' : 'rgba(185, 28, 28, 0.1)',
            transform: 'rotate(180deg)',
          },
        }}
      >
        {mode === 'dark' ? (
          <LightModeIcon aria-hidden="true" sx={{ fontSize: 20 }} />
        ) : (
          <DarkModeIcon aria-hidden="true" sx={{ fontSize: 20 }} />
        )}
      </IconButton>
    </Tooltip>
  )
}
