/** Canonical spec labels, icon keys, and PDF label variants (client documentation). */
export const SPEC_DEFINITIONS = [
  {
    key: 'wireDiameter',
    labelEs: 'Diámetro de hilo',
    labelEn: 'Wire diameter',
    icon: 'cableRounded',
    aliases: ['diámetro de hilo', 'diámetro del hilo', 'diámetro hilo'],
    valueBeforeLabel: true,
  },
  {
    key: 'distanceBetweenPoints',
    labelEs: 'Diámetro entre puntos',
    labelEn: 'Distance between points',
    icon: 'highlightOffRounded',
    aliases: ['diámetro entre puntos', 'distancia entre puntos', 'diametro entre puntos'],
    valueBeforeLabel: true,
  },
  {
    key: 'guidePrecision',
    labelEs: 'Precisión del guiador',
    labelEn: 'Wire guide precision',
    icon: 'gpsFixedRounded',
    aliases: ['precisión del guiador', 'precision del guiador'],
    valueBeforeLabel: true,
  },
  {
    key: 'maxPower',
    labelEs: 'Potencia máxima',
    labelEn: 'Maximum power',
    icon: 'boltRounded',
    aliases: ['potencia máxima', 'potencia maxima'],
    valueBeforeLabel: true,
  },
  {
    key: 'maxWindingLength',
    labelEs: 'Longitud máxima de bobinado',
    labelEn: 'Maximum winding length',
    icon: 'heightRounded',
    aliases: ['longitud máxima de bobinado', 'longitud maxima de bobinado'],
    valueBeforeLabel: true,
  },
  {
    key: 'maxCoilDiameter',
    labelEs: 'Diámetro máx. de bobinado',
    labelEn: 'Maximum coil diameter',
    icon: 'filterTiltShiftRounded',
    aliases: [
      'diámetro máx. de bobinado',
      'diámetro máximo de bobinado',
      'diámetro max de bobinado',
      'diámetro max. de bobinado',
      'diámetro máx de bobinado',
    ],
    valueBeforeLabel: true,
  },
  {
    key: 'supplyVoltage',
    labelEs: 'Tensión eléctrica',
    labelEn: 'Electrical voltage',
    icon: 'groupWorkRounded',
    aliases: ['tensión eléctrica', 'tension electrica'],
    valueBeforeLabel: true,
  },
  {
    key: 'netWeight',
    labelEs: 'Peso neto',
    labelEn: 'Net weight',
    icon: 'scaleRounded',
    aliases: ['peso neto'],
    valueBeforeLabel: true,
  },
  {
    key: 'maxSpeed',
    labelEs: 'Velocidad máxima',
    labelEn: 'Maximum speed',
    icon: 'speedRounded',
    aliases: ['velocidad máxima', 'velocidad maxima'],
    valueBeforeLabel: false,
  },
  {
    key: 'control',
    labelEs: 'Control',
    labelEn: 'Control',
    icon: 'touchAppRounded',
    aliases: ['control de la máquina', 'control'],
    valueBeforeLabel: false,
  },
  {
    key: 'display',
    labelEs: 'Pantalla',
    labelEn: 'Display',
    icon: 'tvRounded',
    aliases: ['pantalla táctil', 'pantalla'],
    valueBeforeLabel: false,
  },
  {
    key: 'communication',
    labelEs: 'Comunicación',
    labelEn: 'Communication',
    icon: 'settingsEthernetRounded',
    aliases: ['comunicación ethernet', 'comunicación', 'comunicacion ethernet'],
    valueBeforeLabel: false,
  },
  {
    key: 'software',
    labelEs: 'Software',
    labelEn: 'Software',
    icon: 'windowsRounded',
    aliases: ['software', 'windows software', 'software:winbobbin', 'winbobbin'],
    valueBeforeLabel: false,
  },
  {
    key: 'memoryCapacity',
    labelEs: 'Capacidad de memoria',
    labelEn: 'Memory capacity',
    icon: 'sdStorageRounded',
    aliases: ['capacidad de memoria'],
    valueBeforeLabel: false,
  },
  {
    key: 'memoryExpansion',
    labelEs: 'Ampliación de memoria',
    labelEn: 'Memory expansion',
    icon: 'sdRounded',
    aliases: ['ampliación de memoria', 'ampliacion de memoria'],
    valueBeforeLabel: false,
  },
  {
    key: 'speedRanges',
    labelEs: 'Rangos de velocidad',
    labelEn: 'Speed ranges',
    icon: 'speedRounded',
    aliases: ['rangos de velocidad', 'tabla de velocidades'],
    valueBeforeLabel: false,
  },
  {
    key: 'maxWeightBetweenPoints',
    labelEs: 'Peso máximo entre puntos',
    labelEn: 'Maximum weight between points',
    icon: 'scaleRounded',
    aliases: ['peso máximo entre puntos', 'peso maximo entre puntos'],
    valueBeforeLabel: true,
  },
]

/**
 * Value order as extracted from ERASAN PDF page 2 (spec grid text layer).
 * wire → between points → guide → length → coil Ø → voltage → power → weight
 */
export const MECHANICAL_SPEC_KEYS = [
  'wireDiameter',
  'distanceBetweenPoints',
  'guidePrecision',
  'maxWindingLength',
  'maxCoilDiameter',
  'supplyVoltage',
  'maxPower',
  'netWeight',
]

/**
 * Map PDF filename (without extension) to product slug.
 * Supports:
 *   BOBINADORA-E300.pdf
 *   BOBINADORA-E1200C-SGB.pdf  → cabezal-bobinador-erasan-e1200-c-sgb
 *   ERASAN-FICHA-TECNICA-E300.pdf (legacy)
 */
export function pdfFilenameToSlug(filename) {
  const base = filename.replace(/\.pdf$/i, '').toUpperCase()

  let model = null
  const legacy = base.match(/^ERASAN-FICHA-TECNICA-(.+)$/)
  const modern = base.match(/^BOBINADORA-(.+)$/)

  if (legacy) model = legacy[1]
  else if (modern) model = modern[1]
  else return null

  return modelCodeToSlug(model)
}

export function modelCodeToSlug(modelCode) {
  const code = modelCode.toLowerCase().replace(/_/g, '-')

  // Cabezal: E1200C-SGB, E1200C, E1500B, E1200B (letter immediately after model number)
  const cabezal = code.match(/^e(\d+)([a-z])(?:-(.+))?$/)
  if (cabezal) {
    const [, digits, letter, suffix] = cabezal
    return suffix
      ? `cabezal-bobinador-erasan-e${digits}-${letter}-${suffix}`
      : `cabezal-bobinador-erasan-e${digits}-${letter}`
  }

  return `bobinadora-erasan-${code}`
}
