import { createAppTheme } from './theme/createAppTheme'
import { DEFAULT_PALETTE } from './theme/palettes'

export { createAppTheme } from './theme/createAppTheme'
export {
  palettes,
  PALETTE_IDS,
  DEFAULT_PALETTE,
  getThemeTokens,
  getPaletteColors,
  applyThemeCssVars,
} from './theme/palettes'

export const darkTheme = createAppTheme('dark', DEFAULT_PALETTE)
export const lightTheme = createAppTheme('light', DEFAULT_PALETTE)

export default darkTheme
