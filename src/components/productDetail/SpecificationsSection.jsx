import { Box, Button, Card, CardContent, CircularProgress, Grid, Tooltip, Typography } from '@mui/material'
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
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import ScaleRoundedIcon from '@mui/icons-material/ScaleRounded'
import SdRoundedIcon from '@mui/icons-material/SdRounded'
import SdStorageRoundedIcon from '@mui/icons-material/SdStorageRounded'
import SettingsEthernetRoundedIcon from '@mui/icons-material/SettingsEthernetRounded'
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded'
import TouchAppRoundedIcon from '@mui/icons-material/TouchAppRounded'
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
    <Tooltip
      title={specPdf?.url ? '' : t('products.downloadSpecsComingSoon')}
      disableHoverListener={Boolean(specPdf?.url)}
    >
      <span>
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
      </span>
    </Tooltip>
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
          <SpecDownloadButton specPdf={specPdf} sx={{ mt: 2 }} />
        </CardContent>
      </Card>
    </Box>
  )
}
