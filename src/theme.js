import { createTheme } from '@mui/material/styles'

// Industrial theme with Red primary and Steel Blue accents
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

// Dark Theme - Industrial Red
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#dc2626', // Red
      light: '#ef4444',
      dark: '#b91c1c',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0ea5e9', // Steel Blue
      light: '#38bdf8',
      dark: '#0284c7',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0f172a',
      paper: 'rgba(30, 41, 59, 0.9)',
    },
    text: {
      primary: '#f1f5f9',
      secondary: 'rgba(241, 245, 249, 0.7)',
    },
    error: {
      main: '#f87171',
    },
    success: {
      main: '#22c55e',
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
  components: {
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
            boxShadow: '0 8px 25px rgba(220, 38, 38, 0.35)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
          color: '#ffffff',
          '&:hover': {
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          },
        },
        outlined: {
          borderColor: '#dc2626',
          borderWidth: 2,
          color: '#dc2626',
          '&:hover': {
            borderWidth: 2,
            borderColor: '#ef4444',
            backgroundColor: 'rgba(220, 38, 38, 0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(30, 41, 59, 0.6)',
            backdropFilter: 'blur(10px)',
            '& fieldset': {
              borderColor: 'rgba(220, 38, 38, 0.3)',
              borderWidth: 2,
            },
            '&:hover fieldset': {
              borderColor: 'rgba(220, 38, 38, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#dc2626',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(30, 41, 59, 0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(220, 38, 38, 0.15)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
          borderBottom: '1px solid rgba(220, 38, 38, 0.2)',
        },
      },
    },
  },
})

// Light Theme - Industrial Red
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#b91c1c', // Darker red for light mode
      light: '#dc2626',
      dark: '#991b1b',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0284c7', // Steel Blue
      light: '#0ea5e9',
      dark: '#0369a1',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: 'rgba(255, 255, 255, 0.95)',
    },
    text: {
      primary: '#0f172a',
      secondary: 'rgba(15, 23, 42, 0.7)',
    },
    error: {
      main: '#dc2626',
    },
    success: {
      main: '#16a34a',
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
  components: {
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
            boxShadow: '0 8px 25px rgba(185, 28, 28, 0.3)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
          },
        },
        outlined: {
          borderColor: '#b91c1c',
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            borderColor: '#dc2626',
            backgroundColor: 'rgba(185, 28, 28, 0.08)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(248, 250, 252, 0.8)',
            backdropFilter: 'blur(10px)',
            '& fieldset': {
              borderColor: 'rgba(185, 28, 28, 0.3)',
              borderWidth: 2,
            },
            '&:hover fieldset': {
              borderColor: 'rgba(185, 28, 28, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#b91c1c',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(185, 28, 28, 0.12)',
          boxShadow: '0 8px 32px rgba(15, 23, 42, 0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(248, 250, 252, 0.9)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 4px 30px rgba(15, 23, 42, 0.08)',
          borderBottom: '1px solid rgba(185, 28, 28, 0.15)',
        },
      },
    },
  },
})

export default darkTheme
