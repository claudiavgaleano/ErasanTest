import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { lightTheme } from '../theme'

export function ThemeProvider({ children }) {
   return (
      <MuiThemeProvider theme={lightTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
  )
}
