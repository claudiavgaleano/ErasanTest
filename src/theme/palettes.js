export const DEFAULT_PALETTE = 'industrial'

export const PALETTE_IDS = ['industrial', 'ocean', 'forest', 'amber', 'violet']

export const palettes = {
  industrial: {
    id: 'industrial',
    nameKey: 'theme.palettes.industrial',
    swatches: ['#dc2626', '#0ea5e9'],
    dark: {
      primary: '#dc2626',
      primaryLight: '#ef4444',
      primaryDark: '#b91c1c',
      secondary: '#0ea5e9',
      secondaryLight: '#38bdf8',
      primaryRgb: '220, 38, 38',
      secondaryRgb: '14, 165, 233',
      gradient: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
      bodyGradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      glowPrimary: 'rgba(220, 38, 38, 0.08)',
      glowSecondary: 'rgba(14, 165, 233, 0.08)',
    },
    light: {
      primary: '#b91c1c',
      primaryLight: '#dc2626',
      primaryDark: '#991b1b',
      secondary: '#0284c7',
      secondaryLight: '#0ea5e9',
      primaryRgb: '185, 28, 28',
      secondaryRgb: '2, 132, 199',
      gradient: 'linear-gradient(135deg, #b91c1c 0%, #dc2626 100%)',
      bodyGradient: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
      glowPrimary: 'rgba(185, 28, 28, 0.05)',
      glowSecondary: 'rgba(2, 132, 199, 0.05)',
    },
  },
  ocean: {
    id: 'ocean',
    nameKey: 'theme.palettes.ocean',
    swatches: ['#0891b2', '#6366f1'],
    dark: {
      primary: '#0891b2',
      primaryLight: '#22d3ee',
      primaryDark: '#0e7490',
      secondary: '#6366f1',
      secondaryLight: '#818cf8',
      primaryRgb: '8, 145, 178',
      secondaryRgb: '99, 102, 241',
      gradient: 'linear-gradient(135deg, #0891b2 0%, #22d3ee 100%)',
      bodyGradient: 'linear-gradient(135deg, #0c1929 0%, #0f2744 50%, #0c1929 100%)',
      glowPrimary: 'rgba(8, 145, 178, 0.1)',
      glowSecondary: 'rgba(99, 102, 241, 0.08)',
    },
    light: {
      primary: '#0e7490',
      primaryLight: '#0891b2',
      primaryDark: '#155e75',
      secondary: '#4f46e5',
      secondaryLight: '#6366f1',
      primaryRgb: '14, 116, 144',
      secondaryRgb: '79, 70, 229',
      gradient: 'linear-gradient(135deg, #0e7490 0%, #0891b2 100%)',
      bodyGradient: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #f8fafc 100%)',
      glowPrimary: 'rgba(14, 116, 144, 0.06)',
      glowSecondary: 'rgba(79, 70, 229, 0.05)',
    },
  },
  forest: {
    id: 'forest',
    nameKey: 'theme.palettes.forest',
    swatches: ['#059669', '#84cc16'],
    dark: {
      primary: '#059669',
      primaryLight: '#34d399',
      primaryDark: '#047857',
      secondary: '#84cc16',
      secondaryLight: '#a3e635',
      primaryRgb: '5, 150, 105',
      secondaryRgb: '132, 204, 22',
      gradient: 'linear-gradient(135deg, #059669 0%, #34d399 100%)',
      bodyGradient: 'linear-gradient(135deg, #0a1f17 0%, #132e24 50%, #0a1f17 100%)',
      glowPrimary: 'rgba(5, 150, 105, 0.1)',
      glowSecondary: 'rgba(132, 204, 22, 0.08)',
    },
    light: {
      primary: '#047857',
      primaryLight: '#059669',
      primaryDark: '#065f46',
      secondary: '#65a30d',
      secondaryLight: '#84cc16',
      primaryRgb: '4, 120, 87',
      secondaryRgb: '101, 163, 13',
      gradient: 'linear-gradient(135deg, #047857 0%, #059669 100%)',
      bodyGradient: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 50%, #f8fafc 100%)',
      glowPrimary: 'rgba(4, 120, 87, 0.06)',
      glowSecondary: 'rgba(101, 163, 13, 0.05)',
    },
  },
  amber: {
    id: 'amber',
    nameKey: 'theme.palettes.amber',
    swatches: ['#d97706', '#f59e0b'],
    dark: {
      primary: '#d97706',
      primaryLight: '#fbbf24',
      primaryDark: '#b45309',
      secondary: '#f59e0b',
      secondaryLight: '#fcd34d',
      primaryRgb: '217, 119, 6',
      secondaryRgb: '245, 158, 11',
      gradient: 'linear-gradient(135deg, #d97706 0%, #fbbf24 100%)',
      bodyGradient: 'linear-gradient(135deg, #1c1408 0%, #292017 50%, #1c1408 100%)',
      glowPrimary: 'rgba(217, 119, 6, 0.1)',
      glowSecondary: 'rgba(245, 158, 11, 0.08)',
    },
    light: {
      primary: '#b45309',
      primaryLight: '#d97706',
      primaryDark: '#92400e',
      secondary: '#d97706',
      secondaryLight: '#f59e0b',
      primaryRgb: '180, 83, 9',
      secondaryRgb: '217, 119, 6',
      gradient: 'linear-gradient(135deg, #b45309 0%, #d97706 100%)',
      bodyGradient: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #f8fafc 100%)',
      glowPrimary: 'rgba(180, 83, 9, 0.06)',
      glowSecondary: 'rgba(217, 119, 6, 0.05)',
    },
  },
  violet: {
    id: 'violet',
    nameKey: 'theme.palettes.violet',
    swatches: ['#7c3aed', '#ec4899'],
    dark: {
      primary: '#7c3aed',
      primaryLight: '#a78bfa',
      primaryDark: '#6d28d9',
      secondary: '#ec4899',
      secondaryLight: '#f472b6',
      primaryRgb: '124, 58, 237',
      secondaryRgb: '236, 72, 153',
      gradient: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
      bodyGradient: 'linear-gradient(135deg, #120a1f 0%, #1e1033 50%, #120a1f 100%)',
      glowPrimary: 'rgba(124, 58, 237, 0.1)',
      glowSecondary: 'rgba(236, 72, 153, 0.08)',
    },
    light: {
      primary: '#6d28d9',
      primaryLight: '#7c3aed',
      primaryDark: '#5b21b6',
      secondary: '#db2777',
      secondaryLight: '#ec4899',
      primaryRgb: '109, 40, 217',
      secondaryRgb: '219, 39, 119',
      gradient: 'linear-gradient(135deg, #6d28d9 0%, #7c3aed 100%)',
      bodyGradient: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 50%, #f8fafc 100%)',
      glowPrimary: 'rgba(109, 40, 217, 0.06)',
      glowSecondary: 'rgba(219, 39, 119, 0.05)',
    },
  },
}

export function getPaletteColors(paletteId, mode) {
  const palette = palettes[paletteId] || palettes[DEFAULT_PALETTE]
  return palette[mode] || palette.dark
}

export function getThemeTokens(mode, paletteId = DEFAULT_PALETTE) {
  const colors = getPaletteColors(paletteId, mode)
  const isDark = mode === 'dark'

  return {
    mode,
    palette: paletteId,
    isDark,
    primaryColor: colors.primary,
    primaryLight: colors.primaryLight,
    primaryDark: colors.primaryDark,
    secondaryColor: colors.secondary,
    secondaryLight: colors.secondaryLight,
    gradientColor: colors.gradient,
    primaryRgb: colors.primaryRgb,
    secondaryRgb: colors.secondaryRgb,
    bodyGradient: colors.bodyGradient,
    glowPrimary: colors.glowPrimary,
    glowSecondary: colors.glowSecondary,
    navTextColor: isDark ? '#f1f5f9' : '#0f172a',
    primaryAlpha: (opacity) => `rgba(${colors.primaryRgb}, ${opacity})`,
    secondaryAlpha: (opacity) => `rgba(${colors.secondaryRgb}, ${opacity})`,
  }
}

export function applyThemeCssVars(mode, paletteId = DEFAULT_PALETTE) {
  const tokens = getThemeTokens(mode, paletteId)
  document.body.setAttribute('data-theme', mode)
  document.body.setAttribute('data-palette', paletteId)
  document.body.style.setProperty('--theme-primary', tokens.primaryColor)
  document.body.style.setProperty('--theme-primary-light', tokens.primaryLight)
  document.body.style.setProperty('--theme-primary-dark', tokens.primaryDark)
  document.body.style.setProperty('--theme-secondary', tokens.secondaryColor)
  document.body.style.setProperty('--theme-gradient', tokens.gradientColor)
  document.body.style.setProperty('--theme-body-gradient', tokens.bodyGradient)
  document.body.style.setProperty('--theme-glow-primary', tokens.glowPrimary)
  document.body.style.setProperty('--theme-glow-secondary', tokens.glowSecondary)
}
