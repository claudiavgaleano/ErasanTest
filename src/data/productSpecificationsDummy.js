// Placeholder specifications for products without official PDF datasheets.
// Values are indicative and based on catalog content; replace when datasheets are available.

function specs(es, en) {
  return { es, en }
}

const electronicSystem10 = {
  es: [
    { label: 'Control', value: 'CNC con pantalla táctil 10" color', icon: 'settings' },
    { label: 'Comunicación', value: 'Ethernet incluida', icon: 'settings' },
    { label: 'Software', value: 'WinBobbín (Windows)', icon: 'settings' },
  ],
  en: [
    { label: 'Control', value: 'CNC with 10" color touchscreen', icon: 'settings' },
    { label: 'Communication', value: 'Ethernet included', icon: 'settings' },
    { label: 'Software', value: 'WinBobbín (Windows)', icon: 'settings' },
  ],
}

const electronicSystem7 = {
  es: [
    { label: 'Control', value: 'CNC con pantalla táctil 7" color', icon: 'settings' },
    { label: 'Comunicación', value: 'Ethernet incluida', icon: 'settings' },
    { label: 'Software', value: 'WinBobbín (Windows)', icon: 'settings' },
  ],
  en: [
    { label: 'Control', value: 'CNC with 7" color touchscreen', icon: 'settings' },
    { label: 'Communication', value: 'Ethernet included', icon: 'settings' },
    { label: 'Software', value: 'WinBobbín (Windows)', icon: 'settings' },
  ],
}

function devanadorSpecs(spoolCount) {
  return specs(
    [
      { label: 'Número de carretes', value: String(spoolCount), icon: 'capacity' },
      { label: 'Diámetro máximo de carrete', value: '750 mm', icon: 'diameter' },
      { label: 'Diámetro de hilo', value: '0,01 a 3 mm', icon: 'wire' },
      { label: 'Sistema de freno', value: 'Disco hidráulico neumático', icon: 'tension' },
      { label: 'Tensión', value: 'Constante durante el bobinado', icon: 'tension' },
      { label: 'Montaje', value: 'Independiente o integrado en máquina', icon: 'settings' },
    ],
    [
      { label: 'Number of spools', value: String(spoolCount), icon: 'capacity' },
      { label: 'Maximum spool diameter', value: '750 mm', icon: 'diameter' },
      { label: 'Wire diameter', value: '0.01 to 3 mm', icon: 'wire' },
      { label: 'Brake system', value: 'Pneumatic hydraulic disc', icon: 'tension' },
      { label: 'Tension', value: 'Constant during winding', icon: 'tension' },
      { label: 'Mounting', value: 'Standalone or machine-integrated', icon: 'settings' },
    ]
  )
}

function th3Specs(mountEs, mountEn) {
  return specs(
    [
      { label: 'Diámetro de hilo', value: '0,50 a 3,00 mm', icon: 'wire' },
      { label: 'Sistema de freno', value: 'Magnético', icon: 'tension' },
      { label: 'Regulación de tensión', value: 'Potenciómetro o pantalla', icon: 'settings' },
      { label: 'Entrada de hilo', value: 'Ojal cerámico y polea basculante', icon: 'wire' },
      { label: 'Montaje', value: mountEs, icon: 'manufacturing' },
    ],
    [
      { label: 'Wire diameter', value: '0.50 to 3.00 mm', icon: 'wire' },
      { label: 'Brake system', value: 'Magnetic', icon: 'tension' },
      { label: 'Tension adjustment', value: 'Potentiometer or screen', icon: 'settings' },
      { label: 'Wire entry', value: 'Ceramic eyelet and pivoting pulley', icon: 'wire' },
      { label: 'Mounting', value: mountEn, icon: 'manufacturing' },
    ]
  )
}

function wireGuideSpecs(maxDiameterMm) {
  return specs(
    [
      { label: 'Diámetro de hilo', value: `Hasta ${maxDiameterMm} mm`, icon: 'wire' },
      { label: 'Tipo de guiado', value: 'Tubo guiahilos y poleas', icon: 'manufacturing' },
      { label: 'Ángulo de trabajo', value: '45°', icon: 'dimension' },
      { label: 'Material conductor', value: 'Cobre y aluminio', icon: 'wire' },
      { label: 'Montaje', value: 'Sobre máquina bobinadora', icon: 'settings' },
    ],
    [
      { label: 'Wire diameter', value: `Up to ${maxDiameterMm} mm`, icon: 'wire' },
      { label: 'Guide type', value: 'Wire guide tube and pulleys', icon: 'manufacturing' },
      { label: 'Working angle', value: '45°', icon: 'dimension' },
      { label: 'Conductor material', value: 'Copper and aluminium', icon: 'wire' },
      { label: 'Mounting', value: 'On winding machine', icon: 'settings' },
    ]
  )
}

export const productSpecificationsDummyBySlug = {
  'bobinadora-folio': specs(
    [
      { label: 'Anchura máxima de bobinado', value: '1.500 mm', icon: 'width' },
      { label: 'Ancho máximo de folio', value: '400 mm', icon: 'width' },
      { label: 'Espesor de folio', value: '0,5 – 3,0 mm', icon: 'dimension' },
      { label: 'Velocidad de bobinado', value: 'Hasta 120 rpm', icon: 'speed' },
      { label: 'Tensión eléctrica', value: '380V+N+GND Vca/50 Hz', icon: 'voltage' },
      ...electronicSystem7.es,
    ],
    [
      { label: 'Maximum winding width', value: '1,500 mm', icon: 'width' },
      { label: 'Maximum foil width', value: '400 mm', icon: 'width' },
      { label: 'Foil thickness', value: '0.5 – 3.0 mm', icon: 'dimension' },
      { label: 'Winding speed', value: 'Up to 120 rpm', icon: 'speed' },
      { label: 'Supply voltage', value: '380V+N+GND Vac/50 Hz', icon: 'voltage' },
      ...electronicSystem7.en,
    ]
  ),

  'cabezal-bobinador-erasan-e1200-c-sgb': specs(
    [
      { label: 'Diámetro de hilo', value: '0,01 a 3 mm', icon: 'wire' },
      { label: 'Longitud máxima de bobinado', value: '1.100 mm', icon: 'height' },
      { label: 'Par máximo', value: '1.000 Nm (baja velocidad)', icon: 'power' },
      { label: 'Velocidad máxima', value: '750 rpm', icon: 'speed' },
      { label: 'Rangos de velocidad', value: '4 posiciones por palancas', icon: 'speed' },
      { label: 'Precisión del guiador', value: '0,01 mm', icon: 'dimension' },
      ...electronicSystem10.es,
    ],
    [
      { label: 'Wire diameter', value: '0.01 to 3 mm', icon: 'wire' },
      { label: 'Maximum winding length', value: '1,100 mm', icon: 'height' },
      { label: 'Maximum torque', value: '1,000 Nm (low speed)', icon: 'power' },
      { label: 'Maximum speed', value: '750 rpm', icon: 'speed' },
      { label: 'Speed ranges', value: '4 lever positions', icon: 'speed' },
      { label: 'Guide precision', value: '0.01 mm', icon: 'dimension' },
      ...electronicSystem10.en,
    ]
  ),

  'cabezal-bobinador-erasan-e1200-c': specs(
    [
      { label: 'Diámetro de hilo', value: '0,01 a 3 mm', icon: 'wire' },
      { label: 'Longitud máxima de bobinado', value: '1.100 mm', icon: 'height' },
      { label: 'Par máximo', value: '1.000 Nm (baja velocidad)', icon: 'power' },
      { label: 'Velocidad máxima', value: '500 rpm', icon: 'speed' },
      { label: 'Rangos de velocidad', value: '2 posiciones por correas (manual)', icon: 'speed' },
      { label: 'Precisión del guiador', value: '0,01 mm', icon: 'dimension' },
      ...electronicSystem10.es,
    ],
    [
      { label: 'Wire diameter', value: '0.01 to 3 mm', icon: 'wire' },
      { label: 'Maximum winding length', value: '1,100 mm', icon: 'height' },
      { label: 'Maximum torque', value: '1,000 Nm (low speed)', icon: 'power' },
      { label: 'Maximum speed', value: '500 rpm', icon: 'speed' },
      { label: 'Speed ranges', value: '2 belt positions (manual)', icon: 'speed' },
      { label: 'Guide precision', value: '0.01 mm', icon: 'dimension' },
      ...electronicSystem10.en,
    ]
  ),

  'cabezal-bobinador-erasan-e1500-b': specs(
    [
      { label: 'Diámetro de hilo', value: '0,01 a 3 mm', icon: 'wire' },
      { label: 'Distancia entre puntos', value: '1.500 mm', icon: 'dimension' },
      { label: 'Longitud máxima de bobinado', value: '1.300 mm', icon: 'height' },
      { label: 'Diámetro máximo de bobinado', value: '900 mm', icon: 'diameter' },
      { label: 'Par máximo', value: '1.200 Nm (baja velocidad)', icon: 'power' },
      { label: 'Velocidad máxima', value: '500 rpm', icon: 'speed' },
      ...electronicSystem10.es,
    ],
    [
      { label: 'Wire diameter', value: '0.01 to 3 mm', icon: 'wire' },
      { label: 'Distance between centres', value: '1,500 mm', icon: 'dimension' },
      { label: 'Maximum winding length', value: '1,300 mm', icon: 'height' },
      { label: 'Maximum winding diameter', value: '900 mm', icon: 'diameter' },
      { label: 'Maximum torque', value: '1,200 Nm (low speed)', icon: 'power' },
      { label: 'Maximum speed', value: '500 rpm', icon: 'speed' },
      ...electronicSystem10.en,
    ]
  ),

  'cabezal-bobinador-erasan-e1200-b': specs(
    [
      { label: 'Diámetro de hilo', value: '0,01 a 3 mm', icon: 'wire' },
      { label: 'Distancia entre puntos', value: '1.250 mm', icon: 'dimension' },
      { label: 'Longitud máxima de bobinado', value: '1.100 mm', icon: 'height' },
      { label: 'Par máximo', value: '1.000 Nm (baja velocidad)', icon: 'power' },
      { label: 'Velocidad máxima', value: '500 rpm', icon: 'speed' },
      { label: 'Precisión del guiador', value: '0,01 mm', icon: 'dimension' },
      ...electronicSystem10.es,
    ],
    [
      { label: 'Wire diameter', value: '0.01 to 3 mm', icon: 'wire' },
      { label: 'Distance between centres', value: '1,250 mm', icon: 'dimension' },
      { label: 'Maximum winding length', value: '1,100 mm', icon: 'height' },
      { label: 'Maximum torque', value: '1,000 Nm (low speed)', icon: 'power' },
      { label: 'Maximum speed', value: '500 rpm', icon: 'speed' },
      { label: 'Guide precision', value: '0.01 mm', icon: 'dimension' },
      ...electronicSystem10.en,
    ]
  ),

  'bobinadora-erasan-e300w': specs(
    [
      { label: 'Diámetro de hilo', value: '0,01 a 3 mm', icon: 'wire' },
      { label: 'Distancia entre puntos', value: '550 mm', icon: 'dimension' },
      { label: 'Longitud máxima de bobinado', value: '390 mm', icon: 'height' },
      { label: 'Diámetro máximo de bobinado', value: '400 mm', icon: 'diameter' },
      { label: 'Potencia máxima', value: '2,2 kW', icon: 'power' },
      { label: 'Velocidad máxima', value: '9.000 rpm', icon: 'speed' },
      ...electronicSystem7.es,
    ],
    [
      { label: 'Wire diameter', value: '0.01 to 3 mm', icon: 'wire' },
      { label: 'Distance between centres', value: '550 mm', icon: 'dimension' },
      { label: 'Maximum winding length', value: '390 mm', icon: 'height' },
      { label: 'Maximum winding diameter', value: '400 mm', icon: 'diameter' },
      { label: 'Maximum power', value: '2.2 kW', icon: 'power' },
      { label: 'Maximum speed', value: '9,000 rpm', icon: 'speed' },
      ...electronicSystem7.en,
    ]
  ),

  'dispensador-de-papel-dp1-p': specs(
    [
      { label: 'Tipo de material', value: 'Papel, forros, cintas y telas', icon: 'wire' },
      { label: 'Sistema de freno', value: 'Electromagnético', icon: 'tension' },
      { label: 'Eje portabobina', value: 'Expandible', icon: 'manufacturing' },
      { label: 'Regulación', value: 'Software o potenciómetro', icon: 'settings' },
      { label: 'Montaje', value: 'Integrado en máquina o independiente', icon: 'settings' },
      { label: 'Guiado', value: 'Dos juegos de rodillos regulables', icon: 'manufacturing' },
    ],
    [
      { label: 'Material type', value: 'Paper, liners, tapes and fabrics', icon: 'wire' },
      { label: 'Brake system', value: 'Electromagnetic', icon: 'tension' },
      { label: 'Spool mandrel', value: 'Expandable', icon: 'manufacturing' },
      { label: 'Adjustment', value: 'Software or potentiometer', icon: 'settings' },
      { label: 'Mounting', value: 'Machine-integrated or standalone', icon: 'settings' },
      { label: 'Guiding', value: 'Two adjustable roller sets', icon: 'manufacturing' },
    ]
  ),

  'dispensador-de-papel-tpe': specs(
    [
      { label: 'Diámetro máximo de bobina', value: '400 mm', icon: 'diameter' },
      { label: 'Longitud máxima de bobina', value: '310 mm', icon: 'height' },
      { label: 'Tipo de material', value: 'Papel, forros, cintas y telas', icon: 'wire' },
      { label: 'Sistema de freno', value: 'Electromagnético', icon: 'tension' },
      { label: 'Eje portabobina', value: 'Expandible', icon: 'manufacturing' },
      { label: 'Regulación', value: 'Software o potenciómetro', icon: 'settings' },
    ],
    [
      { label: 'Maximum roll diameter', value: '400 mm', icon: 'diameter' },
      { label: 'Maximum roll length', value: '310 mm', icon: 'height' },
      { label: 'Material type', value: 'Paper, liners, tapes and fabrics', icon: 'wire' },
      { label: 'Brake system', value: 'Electromagnetic', icon: 'tension' },
      { label: 'Spool mandrel', value: 'Expandable', icon: 'manufacturing' },
      { label: 'Adjustment', value: 'Software or potentiometer', icon: 'settings' },
    ]
  ),

  'devanador-dp1r-ap1r': specs(
    [
      { label: 'Número de carretes', value: '1', icon: 'capacity' },
      { label: 'Diámetro máximo de carrete', value: '750 mm', icon: 'diameter' },
      { label: 'Diámetro de hilo', value: '0,01 a 3 mm', icon: 'wire' },
      { label: 'Sistema de freno', value: 'Doble freno hidráulico + AP1R', icon: 'tension' },
      { label: 'Tensión', value: 'Constante con compensación de holgura', icon: 'tension' },
      { label: 'Montaje', value: 'Independiente o integrado en máquina', icon: 'settings' },
    ],
    [
      { label: 'Number of spools', value: '1', icon: 'capacity' },
      { label: 'Maximum spool diameter', value: '750 mm', icon: 'diameter' },
      { label: 'Wire diameter', value: '0.01 to 3 mm', icon: 'wire' },
      { label: 'Brake system', value: 'Dual hydraulic brake + AP1R', icon: 'tension' },
      { label: 'Tension', value: 'Constant with slack compensation', icon: 'tension' },
      { label: 'Mounting', value: 'Standalone or machine-integrated', icon: 'settings' },
    ]
  ),

  'devanador-dp4': devanadorSpecs(4),
  'devanador-dp2': devanadorSpecs(2),
  'devanador-dp1': devanadorSpecs(1),

  'mandril-expandible-rectangular': specs(
    [
      { label: 'Tipo', value: 'Rectangular', icon: 'dimension' },
      { label: 'Fabricación', value: 'Completamente a medida', icon: 'manufacturing' },
      { label: 'Acabado', value: 'Barras de aluminio', icon: 'manufacturing' },
      { label: 'Expansión', value: 'Levas mecánicas y anillos de apoyo', icon: 'settings' },
      { label: 'Aplicación', value: 'Núcleos de hierro o láminas', icon: 'capacity' },
    ],
    [
      { label: 'Type', value: 'Rectangular', icon: 'dimension' },
      { label: 'Manufacturing', value: 'Fully custom-built', icon: 'manufacturing' },
      { label: 'Finish', value: 'Aluminium bars', icon: 'manufacturing' },
      { label: 'Expansion', value: 'Mechanical cams and support rings', icon: 'settings' },
      { label: 'Application', value: 'Iron cores or laminations', icon: 'capacity' },
    ]
  ),

  'mandril-expandible-circular': specs(
    [
      { label: 'Tipo', value: 'Circular', icon: 'diameter' },
      { label: 'Fabricación', value: 'Completamente a medida', icon: 'manufacturing' },
      { label: 'Acabado', value: 'Barras de aluminio', icon: 'manufacturing' },
      { label: 'Expansión', value: 'Levas mecánicas y anillos de apoyo', icon: 'settings' },
      { label: 'Aplicación', value: 'Núcleos de hierro o láminas', icon: 'capacity' },
    ],
    [
      { label: 'Type', value: 'Circular', icon: 'diameter' },
      { label: 'Manufacturing', value: 'Fully custom-built', icon: 'manufacturing' },
      { label: 'Finish', value: 'Aluminium bars', icon: 'manufacturing' },
      { label: 'Expansion', value: 'Mechanical cams and support rings', icon: 'settings' },
      { label: 'Application', value: 'Iron cores or laminations', icon: 'capacity' },
    ]
  ),

  'guiador-de-pletina-gp2': specs(
    [
      { label: 'Tipo de conductor', value: 'Pletina rectangular', icon: 'wire' },
      { label: 'Guiado', value: 'Poleas y rodillos regulables', icon: 'manufacturing' },
      { label: 'Tensión máxima', value: 'Alta tensión (múltiples pletinas)', icon: 'tension' },
      { label: 'Encintado', value: 'Guiador devanador de cinta integrado', icon: 'settings' },
      { label: 'Montaje', value: 'Sobre máquina bobinadora', icon: 'settings' },
    ],
    [
      { label: 'Conductor type', value: 'Rectangular strip', icon: 'wire' },
      { label: 'Guiding', value: 'Adjustable pulleys and rollers', icon: 'manufacturing' },
      { label: 'Maximum tension', value: 'High tension (multiple strips)', icon: 'tension' },
      { label: 'Taping', value: 'Integrated tape guide winder', icon: 'settings' },
      { label: 'Mounting', value: 'On winding machine', icon: 'settings' },
    ]
  ),

  'guiador-de-pletina-gp1': specs(
    [
      { label: 'Tipo de conductor', value: 'Pletina rectangular', icon: 'wire' },
      { label: 'Guiado', value: 'Poleas y rodillos regulables', icon: 'manufacturing' },
      { label: 'Tensión máxima', value: 'Hasta 2 kg/mm de sección', icon: 'tension' },
      { label: 'Encintado', value: 'Guiador devanador de cinta integrado', icon: 'settings' },
      { label: 'Montaje', value: 'Sobre máquina bobinadora', icon: 'settings' },
    ],
    [
      { label: 'Conductor type', value: 'Rectangular strip', icon: 'wire' },
      { label: 'Guiding', value: 'Adjustable pulleys and rollers', icon: 'manufacturing' },
      { label: 'Maximum tension', value: 'Up to 2 kg/mm cross-section', icon: 'tension' },
      { label: 'Taping', value: 'Integrated tape guide winder', icon: 'settings' },
      { label: 'Mounting', value: 'On winding machine', icon: 'settings' },
    ]
  ),

  'guiador-de-hilo-gh3': wireGuideSpecs('8,00'),
  'guiador-de-hilo-gh2': wireGuideSpecs('3,00'),
  'guiador-de-hilo-gh1': wireGuideSpecs('1,00'),

  'tensionador-de-hilo-th3-d': th3Specs(
    'Montado directamente sobre la bobinadora',
    'Mounted directly on the winding machine'
  ),
  'tensionador-de-hilo-th3-is': th3Specs(
    'Integrado en máquina con regulación por pantalla',
    'Machine-integrated with screen adjustment'
  ),
  'tensionador-de-hilo-th3': th3Specs(
    'Montaje flexible según configuración',
    'Flexible mounting depending on configuration'
  ),
  'tensionador-de-hilo-th3-standalone': th3Specs(
    'Unidad independiente con estructura propia',
    'Standalone unit with dedicated frame'
  ),

  'bobinadora-e600-long': specs(
    [
      { label: 'Diámetro de hilo', value: '0,01 a 3 mm', icon: 'wire' },
      { label: 'Distancia entre puntos', value: '1.200 mm', icon: 'dimension' },
      { label: 'Longitud máxima de bobinado', value: '900 mm', icon: 'height' },
      { label: 'Diámetro máximo de bobinado', value: '300 mm', icon: 'diameter' },
      { label: 'Potencia máxima', value: '2,2 kW', icon: 'power' },
      { label: 'Velocidad máxima', value: '9.000 rpm', icon: 'speed' },
      { label: 'Tipo de proyecto', value: 'Especial — bancada extendida', icon: 'manufacturing' },
      ...electronicSystem7.es,
    ],
    [
      { label: 'Wire diameter', value: '0.01 to 3 mm', icon: 'wire' },
      { label: 'Distance between centres', value: '1,200 mm', icon: 'dimension' },
      { label: 'Maximum winding length', value: '900 mm', icon: 'height' },
      { label: 'Maximum winding diameter', value: '300 mm', icon: 'diameter' },
      { label: 'Maximum power', value: '2.2 kW', icon: 'power' },
      { label: 'Maximum speed', value: '9,000 rpm', icon: 'speed' },
      { label: 'Project type', value: 'Special — extended bed', icon: 'manufacturing' },
      ...electronicSystem7.en,
    ]
  ),

  'maquina-flyer': specs(
    [
      { label: 'Tipo de bobinado', value: 'Flyer', icon: 'manufacturing' },
      { label: 'Diámetro de hilo', value: 'Según proyecto', icon: 'wire' },
      { label: 'Control', value: 'CNC ERASAN', icon: 'settings' },
      { label: 'Guiado', value: 'Control preciso del conductor', icon: 'manufacturing' },
      { label: 'Fabricación', value: 'Proyecto especial a medida', icon: 'settings' },
    ],
    [
      { label: 'Winding type', value: 'Flyer', icon: 'manufacturing' },
      { label: 'Wire diameter', value: 'Project-dependent', icon: 'wire' },
      { label: 'Control', value: 'ERASAN CNC', icon: 'settings' },
      { label: 'Guiding', value: 'Precise conductor control', icon: 'manufacturing' },
      { label: 'Manufacturing', value: 'Custom special project', icon: 'settings' },
    ]
  ),

  'encintadora': specs(
    [
      { label: 'Aplicación', value: 'Encintado de bobinas eléctricas', icon: 'manufacturing' },
      { label: 'Material', value: 'Cinta aislante', icon: 'wire' },
      { label: 'Tensión', value: 'Control constante durante el encintado', icon: 'tension' },
      { label: 'Guiado', value: 'Preciso del material aislante', icon: 'manufacturing' },
      { label: 'Fabricación', value: 'Configuración adaptable al proyecto', icon: 'settings' },
    ],
    [
      { label: 'Application', value: 'Electrical coil taping', icon: 'manufacturing' },
      { label: 'Material', value: 'Insulating tape', icon: 'wire' },
      { label: 'Tension', value: 'Constant control during taping', icon: 'tension' },
      { label: 'Guiding', value: 'Precise insulating material guidance', icon: 'manufacturing' },
      { label: 'Manufacturing', value: 'Project-adaptable configuration', icon: 'settings' },
    ]
  ),

  bobifil: specs(
    [
      { label: 'Longitud máxima de bobinado', value: '800 mm', icon: 'height' },
      { label: 'Diámetro máximo de bobinado', value: '800 mm', icon: 'diameter' },
      { label: 'Velocidad máxima', value: '500 rpm', icon: 'speed' },
      { label: 'Par máximo', value: 'Alto par en baja velocidad', icon: 'power' },
      { label: 'Accionamiento', value: 'Servomotores en cabezal y guiador', icon: 'settings' },
      { label: 'Tipo de servicio', value: 'Retrofit completo Bobifil', icon: 'manufacturing' },
    ],
    [
      { label: 'Maximum winding length', value: '800 mm', icon: 'height' },
      { label: 'Maximum winding diameter', value: '800 mm', icon: 'diameter' },
      { label: 'Maximum speed', value: '500 rpm', icon: 'speed' },
      { label: 'Maximum torque', value: 'High torque at low speed', icon: 'power' },
      { label: 'Drive', value: 'Servo motors on head and guide', icon: 'settings' },
      { label: 'Service type', value: 'Full Bobifil retrofit', icon: 'manufacturing' },
    ]
  ),

  'kits-retrofit': specs(
    [
      { label: 'Contenido', value: 'Armario cableado y testeado', icon: 'manufacturing' },
      { label: 'Compatibilidad', value: 'Mayoría de bobinadoras del mercado', icon: 'settings' },
      { label: 'Control', value: 'Electrónica ERASAN de última generación', icon: 'settings' },
      { label: 'Teleasistencia', value: 'Router integrado', icon: 'settings' },
      { label: 'Instalación', value: 'Lista para montar en máquina existente', icon: 'manufacturing' },
    ],
    [
      { label: 'Contents', value: 'Wired and tested control cabinet', icon: 'manufacturing' },
      { label: 'Compatibility', value: 'Most winding machines on the market', icon: 'settings' },
      { label: 'Control', value: 'Latest-generation ERASAN electronics', icon: 'settings' },
      { label: 'Remote support', value: 'Integrated router', icon: 'settings' },
      { label: 'Installation', value: 'Ready to mount on existing machine', icon: 'manufacturing' },
    ]
  ),
}

export function getDummyProductSpecifications(slug, language = 'es') {
  const lang = language?.startsWith('es') ? 'es' : 'en'
  return productSpecificationsDummyBySlug[slug]?.[lang] ?? null
}
