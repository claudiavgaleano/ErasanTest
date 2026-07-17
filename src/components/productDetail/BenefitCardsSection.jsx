import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import BoltIcon from '@mui/icons-material/Bolt'
import ComputerIcon from '@mui/icons-material/Computer'
import LanIcon from '@mui/icons-material/Lan'
import MemoryIcon from '@mui/icons-material/Memory'
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing'
import SettingsIcon from '@mui/icons-material/Settings'
import SpeedIcon from '@mui/icons-material/Speed'
import TouchAppIcon from '@mui/icons-material/TouchApp'
import WifiIcon from '@mui/icons-material/Wifi'

const ICON_BY_KEY = {
  efficiency: BoltIcon,
  ethernet: LanIcon,
  remote: WifiIcon,
  control: SettingsIcon,
  cnc: MemoryIcon,
  touchscreen: TouchAppIcon,
  software: ComputerIcon,
  speed: SpeedIcon,
  manufacturing: PrecisionManufacturingIcon,
}

const BENEFIT_ICON_RULES = [
  { pattern: /ethernet|conexi[oó]n|remot|asistencia t[eé]cnica/i, icon: LanIcon },
  { pattern: /electromec[aá]nica|eficiencia|energ[ií]a|mantenimiento|ahorro/i, icon: BoltIcon },
  { pattern: /control|cnc|pantalla|t[aá]ctil/i, icon: TouchAppIcon },
  { pattern: /programa|visual|operador|software|sencillo/i, icon: ComputerIcon },
  { pattern: /velocidad|rpm/i, icon: SpeedIcon },
  { pattern: /configuraci[oó]n|setting/i, icon: SettingsIcon },
]

export function getBenefitCardIcon(card) {
  if (card?.icon && ICON_BY_KEY[card.icon]) {
    return ICON_BY_KEY[card.icon]
  }

  const text = `${card?.title || ''} ${card?.description || ''}`
  const match = BENEFIT_ICON_RULES.find((rule) => rule.pattern.test(text))
  return match?.icon || PrecisionManufacturingIcon
}

function BenefitCard({ card, primaryColor, primaryAlpha }) {
  const Icon = getBenefitCardIcon(card)

  return (
    <Card
      sx={{
        height: '100%',
        borderTop: `3px solid ${primaryColor}`,
        transition: 'transform 0.2s ease',
        '&:hover': { transform: 'translateY(-4px)' },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 2,
            bgcolor: primaryAlpha(0.12),
            color: primaryColor,
          }}
        >
          <Icon sx={{ fontSize: 26 }} />
        </Box>
        <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 700, color: primaryColor }}>
          {card.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          {card.description}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default function BenefitCardsSection({ benefitCards, primaryColor, primaryAlpha, sx }) {
  if (!benefitCards?.length) return null

  return (
    <Box sx={sx}>
      <Grid container spacing={3}>
        {benefitCards.map((card, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <BenefitCard card={card} primaryColor={primaryColor} primaryAlpha={primaryAlpha} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
