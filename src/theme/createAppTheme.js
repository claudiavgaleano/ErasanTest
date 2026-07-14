import { createTheme } from '@mui/material/styles'
import { getPaletteColors } from './palettes'

const sharedTypography = {
  fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: {
    fontFamily: '"Rajdhani", "Inter", sans-serif',
    fontWeight: 700,
    fontSize: '3.5rem',
    letterSpacing: '-0.02em',
    textTransform: 'uppercase',
  },
  h2: {
    fontFamily: '"Rajdhani", "Inter", sans-serif',
    fontWeight: 600,
    fontSize: '2.5rem',
    letterSpacing: '-0.01em',
  },
  h3: {
    fontFamily: '"Rajdhani", "Inter", sans-serif',
    fontWeight: 600,
    fontSize: '2rem',
  },
  h4: {
    fontWeight: 600,
    fontSize: '1.5rem',
  },
  h5: {
    fontWeight: 500,
    fontSize: '1.25rem',
  },
  h6: {
    fontWeight: 500,
    fontSize: '1rem',
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.7,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.6,
  },
  button: {
    textTransform: 'none',
    fontWeight: 600,
  },
}

const sharedShape = {
  borderRadius: 4,
}

function buildComponentOverrides(colors, isDark) {
  const paperBg = isDark ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.9)'
  const appBarBg = isDark ? 'rgba(15, 23, 42, 0.9)' : 'rgba(248, 250, 252, 0.9)'
  const inputBg = isDark ? 'rgba(30, 41, 59, 0.6)' : 'rgba(248, 250, 252, 0.8)'
  const cardShadow = isDark ? '0 8px 32px rgba(0, 0, 0, 0.4)' : '0 8px 32px rgba(15, 23, 42, 0.08)'
  const appBarShadow = isDark ? '0 4px 30px rgba(0, 0, 0, 0.3)' : '0 4px 30px rgba(15, 23, 42, 0.08)'

  return {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '12px 28px',
          fontSize: '0.95rem',
          boxShadow: 'none',
          transition: 'all 0.3s ease',
          fontWeight: 600,
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: `0 8px 25px rgba(${colors.primaryRgb}, 0.35)`,
          },
        },
        contained: {
          background: colors.gradient,
          color: '#ffffff',
          '&:hover': {
            background: `linear-gradient(135deg, ${colors.primaryLight} 0%, ${colors.primary} 100%)`,
          },
        },
        outlined: {
          borderColor: colors.primary,
          borderWidth: 2,
          color: colors.primary,
          '&:hover': {
            borderWidth: 2,
            borderColor: colors.primaryLight,
            backgroundColor: `rgba(${colors.primaryRgb}, ${isDark ? 0.1 : 0.08})`,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: inputBg,
            backdropFilter: 'blur(10px)',
            '& fieldset': {
              borderColor: `rgba(${colors.primaryRgb}, 0.3)`,
              borderWidth: 2,
            },
            '&:hover fieldset': {
              borderColor: `rgba(${colors.primaryRgb}, 0.5)`,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary,
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: paperBg,
          backdropFilter: 'blur(20px)',
          border: `1px solid rgba(${colors.primaryRgb}, ${isDark ? 0.15 : 0.12})`,
          boxShadow: cardShadow,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: appBarBg,
          backdropFilter: 'blur(20px)',
          boxShadow: appBarShadow,
          borderBottom: `1px solid rgba(${colors.primaryRgb}, ${isDark ? 0.2 : 0.15})`,
        },
      },
    },
  }
}

export function createAppTheme(mode, paletteId) {
  const isDark = mode === 'dark'
  const colors = getPaletteColors(paletteId, mode)

  return createTheme({
    palette: {
      mode,
      primary: {
        main: colors.primary,
        light: colors.primaryLight,
        dark: colors.primaryDark,
        contrastText: '#ffffff',
      },
      secondary: {
        main: colors.secondary,
        light: colors.secondaryLight,
        dark: colors.secondary,
        contrastText: '#ffffff',
      },
      background: {
        default: isDark ? '#0f172a' : '#f8fafc',
        paper: isDark ? 'rgba(30, 41, 59, 0.9)' : 'rgba(255, 255, 255, 0.95)',
      },
      text: {
        primary: isDark ? '#f1f5f9' : '#0f172a',
        secondary: isDark ? 'rgba(241, 245, 249, 0.7)' : 'rgba(15, 23, 42, 0.7)',
      },
      error: {
        main: isDark ? '#f87171' : '#dc2626',
      },
      success: {
        main: isDark ? '#22c55e' : '#16a34a',
      },
      grey: {
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
      },
    },
    typography: sharedTypography,
    shape: sharedShape,
    components: buildComponentOverrides(colors, isDark),
  })
}
