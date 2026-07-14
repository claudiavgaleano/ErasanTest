import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material'
import PaletteIcon from '@mui/icons-material/Palette'
import CheckIcon from '@mui/icons-material/Check'
import { useThemeMode, useThemeTokens } from '../context/ThemeContext'

export default function ColorPaletteSwitcher() {
  const { t } = useTranslation()
  const { palette, paletteOptions, palettes, setPalette } = useThemeMode()
  const { primaryColor, primaryAlpha } = useThemeTokens()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  return (
    <>
      <Tooltip title={t('theme.choosePalette')}>
        <IconButton
          onClick={(e) => setAnchorEl(e.currentTarget)}
          aria-label={t('theme.choosePalette')}
          aria-haspopup="true"
          aria-expanded={open}
          sx={{
            color: primaryColor,
            border: '1px solid',
            borderColor: primaryAlpha(0.3),
            borderRadius: 1,
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: primaryColor,
              backgroundColor: primaryAlpha(0.1),
            },
          }}
        >
          <PaletteIcon aria-hidden="true" sx={{ fontSize: 20 }} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: { minWidth: 220 },
          },
        }}
      >
        {paletteOptions.map((paletteId) => {
          const option = palettes[paletteId]
          const selected = palette === paletteId

          return (
            <MenuItem
              key={paletteId}
              selected={selected}
              onClick={() => {
                setPalette(paletteId)
                setAnchorEl(null)
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  {option.swatches.map((color) => (
                    <Box
                      key={color}
                      sx={{
                        width: 14,
                        height: 14,
                        borderRadius: '50%',
                        backgroundColor: color,
                        border: '1px solid rgba(255,255,255,0.2)',
                      }}
                    />
                  ))}
                </Box>
              </ListItemIcon>
              <ListItemText primary={t(option.nameKey)} />
              {selected && (
                <CheckIcon fontSize="small" sx={{ ml: 1, color: primaryColor }} />
              )}
            </MenuItem>
          )
        })}
      </Menu>
    </>
  )
}
