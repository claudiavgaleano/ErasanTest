import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { darkTheme, lightTheme } from '../theme'

const ThemeContext = createContext({
  mode: 'dark',
  toggleTheme: () => {},
  setMode: () => {},
})

export const useThemeMode = () => useContext(ThemeContext)

export function ThemeProvider({ children }) {
  // Initialize with system preference or stored preference
  const [mode, setMode] = useState(() => {
    // Check localStorage first
    const stored = localStorage.getItem('themeMode')
    if (stored === 'light' || stored === 'dark') {
      return stored
    }
    // Fall back to system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
    }
    return 'dark'
  })

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)')
    
    const handleChange = (e) => {
      // Only auto-switch if no manual preference is stored
      const stored = localStorage.getItem('themeMode')
      if (!stored) {
        setMode(e.matches ? 'light' : 'dark')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Update body class and localStorage when mode changes
  useEffect(() => {
    document.body.setAttribute('data-theme', mode)
    localStorage.setItem('themeMode', mode)
  }, [mode])

  const toggleTheme = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode])

  const contextValue = useMemo(
    () => ({
      mode,
      toggleTheme,
      setMode,
    }),
    [mode]
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeContext

