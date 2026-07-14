import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { createAppTheme } from '../theme/createAppTheme'
import {
  DEFAULT_PALETTE,
  PALETTE_IDS,
  palettes,
  getThemeTokens,
  applyThemeCssVars,
} from '../theme/palettes'

const ThemeContext = createContext({
  mode: 'dark',
  palette: DEFAULT_PALETTE,
  paletteOptions: PALETTE_IDS,
  tokens: getThemeTokens('dark', DEFAULT_PALETTE),
  toggleTheme: () => {},
  setMode: () => {},
  setPalette: () => {},
})

export const useThemeMode = () => useContext(ThemeContext)

export function useThemeTokens() {
  const { tokens } = useContext(ThemeContext)
  return tokens
}

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    const stored = localStorage.getItem('themeMode')
    if (stored === 'light' || stored === 'dark') {
      return stored
    }
    return 'dark'
  })

  const [palette, setPalette] = useState(() => {
    const stored = localStorage.getItem('themePalette')
    if (stored && PALETTE_IDS.includes(stored)) {
      return stored
    }
    return DEFAULT_PALETTE
  })

  useEffect(() => {
    localStorage.setItem('themeMode', mode)
    localStorage.setItem('themePalette', palette)
    applyThemeCssVars(mode, palette)
  }, [mode, palette])

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const theme = useMemo(() => createAppTheme(mode, palette), [mode, palette])
  const tokens = useMemo(() => getThemeTokens(mode, palette), [mode, palette])

  const contextValue = useMemo(
    () => ({
      mode,
      palette,
      paletteOptions: PALETTE_IDS,
      palettes,
      tokens,
      toggleTheme,
      setMode,
      setPalette,
    }),
    [mode, palette, tokens, toggleTheme]
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
