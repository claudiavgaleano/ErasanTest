import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import AspectRatioIcon from '@mui/icons-material/AspectRatio'
import BoltIcon from '@mui/icons-material/Bolt'
import CableIcon from '@mui/icons-material/Cable'
import CompressIcon from '@mui/icons-material/Compress'
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices'
import HeightIcon from '@mui/icons-material/Height'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import ScaleIcon from '@mui/icons-material/Scale'
import SettingsIcon from '@mui/icons-material/Settings'
import SpeedIcon from '@mui/icons-material/Speed'
import StraightenIcon from '@mui/icons-material/Straighten'
import ThermostatIcon from '@mui/icons-material/Thermostat'
import WidthFullIcon from '@mui/icons-material/WidthFull'

const ICON_BY_KEY = {
  speed: SpeedIcon,
  power: BoltIcon,
  voltage: ElectricalServicesIcon,
  temperature: ThermostatIcon,
  weight: ScaleIcon,
  dimension: StraightenIcon,
  width: WidthFullIcon,
  height: HeightIcon,
  diameter: AspectRatioIcon,
  tension: CompressIcon,
  wire: CableIcon,
  capacity: Inventory2Icon,
  settings: SettingsIcon,
  manufacturing: PrecisionManufacturingIcon,
}

const LABEL_ICON_RULES = [
  { pattern: /velocidad|rpm|speed/i, icon: SpeedIcon },
  { pattern: /potencia|power|kw|nm/i, icon: BoltIcon },
  { pattern: /voltaje|voltage|tension electric|corriente/i, icon: ElectricalServicesIcon },
  { pattern: /temperatura|temperature|°c/i, icon: ThermostatIcon },
  { pattern: /peso|weight|kg/i, icon: ScaleIcon },
  { pattern: /ancho|width|anchura/i, icon: WidthFullIcon },
  { pattern: /alto|height|altura|longitud|length/i, icon: HeightIcon },
  { pattern: /di[aá]metro|diameter|mm|cm|metro|dimension|tama[nñ]o|medida/i, icon: StraightenIcon },
  { pattern: /tensi[oó]n|tension|freno/i, icon: CompressIcon },
  { pattern: /hilo|wire|pleta|strip|folio/i, icon: CableIcon },
  { pattern: /capacidad|capacity|carrete|bobina/i, icon: Inventory2Icon },
  { pattern: /control|configuraci[oó]n|setting/i, icon: SettingsIcon },
]

export function getSpecificationIcon(spec) {
  if (spec?.icon && ICON_BY_KEY[spec.icon]) {
    return ICON_BY_KEY[spec.icon]
  }

  const label = spec?.label || ''
  const match = LABEL_ICON_RULES.find((rule) => rule.pattern.test(label))
  return match?.icon || PrecisionManufacturingIcon
}

function SpecificationCard({ spec, primaryColor, primaryAlpha }) {
  const Icon = getSpecificationIcon(spec)

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
        <Icon sx={{ fontSize: 24 }} />
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
  primaryColor,
  primaryAlpha,
  sx,
}) {
  if (!specifications?.length) return null

  return (
    <Box sx={sx}>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 600 }}>
        {title}
      </Typography>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            {specifications.map((spec, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <SpecificationCard
                  spec={spec}
                  primaryColor={primaryColor}
                  primaryAlpha={primaryAlpha}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  )
}
