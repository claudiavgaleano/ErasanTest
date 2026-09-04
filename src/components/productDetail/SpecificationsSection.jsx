import { Box, Button, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import BoltRoundedIcon from '@mui/icons-material/BoltRounded'
import CableRoundedIcon from '@mui/icons-material/CableRounded'
import FilterTiltShiftRoundedIcon from '@mui/icons-material/FilterTiltShiftRounded'
import GpsFixedRoundedIcon from '@mui/icons-material/GpsFixedRounded'
import GroupWorkRoundedIcon from '@mui/icons-material/GroupWorkRounded'
import HeightRoundedIcon from '@mui/icons-material/HeightRounded'
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded'
import LayersRoundedIcon from '@mui/icons-material/LayersRounded'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import ScaleRoundedIcon from '@mui/icons-material/ScaleRounded'
import SdRoundedIcon from '@mui/icons-material/SdRounded'
import SdStorageRoundedIcon from '@mui/icons-material/SdStorageRounded'
import SettingsEthernetRoundedIcon from '@mui/icons-material/SettingsEthernetRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded'
import StraightenRoundedIcon from '@mui/icons-material/StraightenRounded'
import SwapHorizRoundedIcon from '@mui/icons-material/SwapHorizRounded'
import TouchAppRoundedIcon from '@mui/icons-material/TouchAppRounded'
import TuneRoundedIcon from '@mui/icons-material/TuneRounded'
import TvRoundedIcon from '@mui/icons-material/TvRounded'
import WindowRoundedIcon from '@mui/icons-material/WindowRounded'

const HORIZONTAL_HEIGHT_SX = { transform: 'rotate(90deg)' }

/** Strict client documentation icon keys → MUI Rounded icons */
const ICON_BY_KEY = {
  cableRounded: { Icon: CableRoundedIcon },
  heightRounded: { Icon: HeightRoundedIcon, sx: HORIZONTAL_HEIGHT_SX },
  speedRounded: { Icon: SpeedRoundedIcon },
  windowsRounded: { Icon: WindowRoundedIcon },
  highlightOffRounded: { Icon: HighlightOffRoundedIcon },
  filterTiltShiftRounded: { Icon: FilterTiltShiftRoundedIcon },
  touchAppRounded: { Icon: TouchAppRoundedIcon },
  sdStorageRounded: { Icon: SdStorageRoundedIcon },
  gpsFixedRounded: { Icon: GpsFixedRoundedIcon },
  groupWorkRounded: { Icon: GroupWorkRoundedIcon },
  tvRounded: { Icon: TvRoundedIcon },
  sdRounded: { Icon: SdRoundedIcon },
  boltRounded: { Icon: BoltRoundedIcon },
  scaleRounded: { Icon: ScaleRoundedIcon },
  settingsEthernetRounded: { Icon: SettingsEthernetRoundedIcon },
  settingsRounded: { Icon: SettingsRoundedIcon },
  capacityRounded: { Icon: LayersRoundedIcon },
  tensionRounded: { Icon: TuneRoundedIcon },
  dimensionRounded: { Icon: StraightenRoundedIcon },
  widthRounded: { Icon: SwapHorizRoundedIcon },
  manufacturingRounded: { Icon: PrecisionManufacturingIcon },
  // Dummy datasheet keys (productSpecificationsDummy.js)
  wire: { Icon: CableRoundedIcon },
  height: { Icon: HeightRoundedIcon, sx: HORIZONTAL_HEIGHT_SX },
  speed: { Icon: SpeedRoundedIcon },
  diameter: { Icon: FilterTiltShiftRoundedIcon },
  voltage: { Icon: GroupWorkRoundedIcon },
  power: { Icon: BoltRoundedIcon },
  settings: { Icon: SettingsRoundedIcon },
  capacity: { Icon: LayersRoundedIcon },
  tension: { Icon: TuneRoundedIcon },
  dimension: { Icon: StraightenRoundedIcon },
  width: { Icon: SwapHorizRoundedIcon },
  manufacturing: { Icon: PrecisionManufacturingIcon },
}

const LABEL_ICON_RULES = [
  { pattern: /di[aá]metro del hilo|wire diameter/i, key: 'cableRounded' },
  {
    pattern: /longitud m[aá]xima de bobinado|maximum winding length|maximum winding zone/i,
    key: 'heightRounded',
  },
  { pattern: /velocidad m[aá]xima|maximum speed|winding speed/i, key: 'speedRounded' },
  { pattern: /^software$/i, key: 'windowsRounded' },
  { pattern: /di[aá]metro entre puntos|distance between points|point diameter/i, key: 'highlightOffRounded' },
  {
    pattern: /di[aá]metro m[aá]x\.?\s*(de|del)\s*bobinado|maximum coil diameter|maximum winding diameter/i,
    key: 'filterTiltShiftRounded',
  },
  { pattern: /^control$/i, key: 'touchAppRounded' },
  { pattern: /capacidad de memoria|memory capacity/i, key: 'sdStorageRounded' },
  { pattern: /precisi[oó]n del guiador|guide precision|wire guide precision/i, key: 'gpsFixedRounded' },
  { pattern: /tensi[oó]n el[eé]ctrica|electrical voltage/i, key: 'groupWorkRounded' },
  { pattern: /^pantalla$|^screen$|display/i, key: 'tvRounded' },
  { pattern: /ampliaci[oó]n de memoria|memory expansion/i, key: 'sdRounded' },
  { pattern: /potencia m[aá]xima|maximum power/i, key: 'boltRounded' },
  { pattern: /peso neto|net weight/i, key: 'scaleRounded' },
  { pattern: /comunicaci[oó]n|communication|ethernet/i, key: 'settingsEthernetRounded' },
  { pattern: /di[aá]metro de hilo/i, key: 'cableRounded' },
  { pattern: /distancia entre puntos|distance between centres/i, key: 'highlightOffRounded' },
  { pattern: /rangos de velocidad|speed ranges/i, key: 'speedRounded' },
  { pattern: /par m[aá]ximo|maximum torque/i, key: 'boltRounded' },
  { pattern: /supply voltage/i, key: 'groupWorkRounded' },
  { pattern: /anchura m[aá]xima|ancho m[aá]ximo|maximum winding width|maximum foil width/i, key: 'widthRounded' },
  { pattern: /espesor|foil thickness/i, key: 'dimensionRounded' },
  { pattern: /n[uú]mero de carretes|number of spools/i, key: 'capacityRounded' },
  { pattern: /di[aá]metro m[aá]ximo de carrete|maximum spool diameter/i, key: 'filterTiltShiftRounded' },
  { pattern: /di[aá]metro m[aá]ximo de bobina|maximum roll diameter/i, key: 'filterTiltShiftRounded' },
  { pattern: /longitud m[aá]xima de bobina|maximum roll length/i, key: 'heightRounded' },
  { pattern: /sistema de freno|brake system/i, key: 'tensionRounded' },
  {
    pattern: /^tensi[oó]n$|^tension$|regulaci[oó]n de tensi[oó]n|tension adjustment|tensi[oó]n m[aá]xima|maximum tension/i,
    key: 'tensionRounded',
  },
  { pattern: /entrada de hilo|wire entry/i, key: 'cableRounded' },
  { pattern: /tipo de guiado|guide type|[aá]ngulo de trabajo|working angle/i, key: 'dimensionRounded' },
  {
    pattern: /material conductor|conductor material|tipo de conductor|conductor type|tipo de material|material type|^material$/i,
    key: 'cableRounded',
  },
  { pattern: /eje portabobina|spool mandrel/i, key: 'manufacturingRounded' },
  { pattern: /^montaje$|^mounting$|^regulaci[oó]n$|^adjustment$|^expansi[oó]n$|^expansion$/i, key: 'settingsRounded' },
  { pattern: /^guiado$|^guiding$|^encintado$|^taping$/i, key: 'manufacturingRounded' },
  {
    pattern: /^tipo$|^type$|tipo de proyecto|project type|tipo de bobinado|winding type|tipo de servicio|service type/i,
    key: 'dimensionRounded',
  },
  { pattern: /^fabricaci[oó]n$|^manufacturing$|^acabado$|^finish$|^contenido$|^contents$|^instalaci[oó]n$|^installation$/i, key: 'manufacturingRounded' },
  { pattern: /^aplicaci[oó]n$|^application$/i, key: 'capacityRounded' },
  { pattern: /^accionamiento$|^drive$|^compatibilidad$|^compatibility$|teleasistencia|remote support/i, key: 'settingsRounded' },
]

export function getSpecificationIcon(spec) {
  const key = spec?.icon
  if (key && ICON_BY_KEY[key]) {
    return ICON_BY_KEY[key]
  }

  const label = spec?.label || ''
  const match = LABEL_ICON_RULES.find((rule) => rule.pattern.test(label))
  if (match?.key && ICON_BY_KEY[match.key]) {
    return ICON_BY_KEY[match.key]
  }

  return { Icon: PrecisionManufacturingIcon }
}

function SpecDownloadButton({ specPdf, size = 'large', sx }) {
  const { t } = useTranslation()
  const [downloading, setDownloading] = useState(false)

  const handleDownload = async () => {
    if (!specPdf?.url || downloading) return

    setDownloading(true)
    try {
      const response = await fetch(specPdf.url)
      if (!response.ok) throw new Error('Failed to fetch PDF')

      const blob = await response.blob()
      const objectUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = objectUrl
      link.download = specPdf.filename || 'ficha-tecnica.pdf'
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(objectUrl)
    } catch {
      window.open(specPdf.url, '_blank', 'noopener,noreferrer')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <Button
      variant="outlined"
      size={size}
      onClick={handleDownload}
      disabled={!specPdf?.url || downloading}
      startIcon={downloading ? <CircularProgress size={18} color="inherit" /> : <DownloadIcon />}
      sx={sx}
    >
      {t('products.downloadSpecs')}
    </Button>
  )
}

function SpecificationCard({ spec, primaryColor, primaryAlpha }) {
  const { Icon, sx: iconSx } = getSpecificationIcon(spec)

  return (
    <Box
      sx={{
        p: 2.5,
        height: '100%',
        borderRadius: 2,
        background: primaryAlpha(0.05),
        border: `1px solid ${primaryAlpha(0.1)}`,
        display: 'flex',
        gap: 2,
        alignItems: 'flex-start',
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          bgcolor: primaryAlpha(0.12),
          color: primaryColor,
        }}
      >
        <Icon sx={{ fontSize: 24, ...iconSx }} />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, lineHeight: 1.4 }}>
          {spec.label}
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 600, lineHeight: 1.5 }}>
          {spec.value}
        </Typography>
      </Box>
    </Box>
  )
}

export default function SpecificationsSection({
  specifications,
  title,
  specPdf,
  primaryColor,
  primaryAlpha,
  sx,
}) {
  if (!specifications?.length && !specPdf?.url) return null

  return (
    <Box sx={sx}>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 600 }}>
        {title}
      </Typography>
      <Card>
        <CardContent>
          {specifications?.length > 0 && (
            <Grid container spacing={2} sx={{ mb: specPdf?.url ? 3 : 0 }}>
              {specifications.map((spec, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <SpecificationCard
                    spec={spec}
                    primaryColor={primaryColor}
                    primaryAlpha={primaryAlpha}
                  />
                </Grid>
              ))}
            </Grid>
          )}
          {specPdf && <SpecDownloadButton specPdf={specPdf} sx={{ mt: 2 }} />}
        </CardContent>
      </Card>
    </Box>
  )
}
