const PHRASES = [
  ['Unidad de bobinado compuesto por un cabezal fabricado en hierro mecano soldado, rodillo presor con ajuste neumático y un eje expandible.', 'Winding unit comprising a welded steel head, pneumatic press roller, and expandable mandrel.'],
  ['El eje devanador es un eje expandible con sistema hidráulico. Movimiento lateral en el devanador de folio gracias al con una fotocélula para controlar posibles desviaciones.', 'The dereeling mandrel is a hydraulic expandable shaft. Lateral foil dereeler movement is controlled by a photocell to correct possible deviations.'],
  ['Estructura mecánica: construcción de cuerpo mecánico en acero electrosoldado, tratado térmicamente para su estabilización, mecanizado y partes fresadas. Alta rigidez torsional, pintura al horno.', 'Mechanical structure: electrowelded steel body, heat-treated for stabilization, machined and milled components. High torsional rigidity with oven-baked paint finish.'],
  ['Cuerpo compacto en aluminio de gran rigidez, bancada de guiador electrosoldada y mecanizada', 'Compact high-rigidity aluminum body with electrowelded, machined guide bed'],
  ['Cuerpo compacto en aluminio de gran rigidez, bancada de guiador electrosoldada y mecanizada', 'Compact high-rigidity aluminum body with electrowelded, machined guide bed'],
  ['Sistema guiador montada sobre patines de precisión y accionado mediante husillo de recirculación de bolas y contrapunto de cierre rápido', 'Wire guide system mounted on precision slides, driven by a ball-screw and quick-closing tailstock'],
  ['Cuerpo fabricado en acero mecano soldado de gran rigidez', 'Body manufactured from welded steel with high rigidity'],
  ['Bancada mecanizada, contrapunto y sistema guiador de husillo de recirculación de bolas con patines de guiado de precisión', 'Machined bed, tailstock, and ball-screw wire guide system with precision guide slides'],
  ['Bandaca mecanizada, contrapunto y sistema guiador de husillo de recirculación de bolas con patines de guiado de precisión', 'Machined bed, tailstock, and ball-screw wire guide system with precision guide slides'],
  ['Para la fabricación de bobinas eléctricas empleadas para la construcción de solenoides, reactancias, inductancias, transformadores de potencia y distribución', 'For manufacturing electrical coils used in solenoids, reactors, inductors, and power and distribution transformers'],
  ['Varias configuraciones posibles para bobinas de hasta 2.300 mm con una zona de bobinado de 1.800 mm', 'Multiple configurations available for coils up to 2,300 mm with a 1,800 mm winding zone'],
  ['Permite el bobinado de una amplia gama de tamaños y número de transformadores y strips según se requiera.', 'Supports winding a wide range of transformer and strip sizes and quantities as required.'],
  ['Varias configuraciones posibles de hasta 1.500 mm de anchura', 'Multiple configurations available up to 1,500 mm width'],
  ['Permite bobinado de primarias fácilmente y con tiempos de ciclo de producción muy cortos.', 'Enables easy primary winding with very short production cycle times.'],
  ['Tres versiones de cinématica: Velocidad máxima de 9.000 rpm', 'Three kinematic versions: maximum speed of 9,000 rpm'],
  ['permite la fabricación de varias bobinas en el mismo ciclo de trabajo', 'allows manufacturing multiple coils in the same work cycle'],
  ['Posibilidad de conseguir 1.000 Nm en baja velocidad', 'Capable of delivering 1,000 Nm at low speed'],
  ['permitiendo la utilización de hilos redondos, pletinas e incluso folios (dependiendo de las dimensiones), tanto en cobre como en aluminio', 'allowing round wire, strip conductors, and even foil (depending on dimensions), in both copper and aluminum'],
  ['Electromecánica de alta eficiencia', 'High-efficiency electromechanical drive'],
  ['Garantizando un ahorro de energía y reducción de mantenimiento', 'Ensuring energy savings and reduced maintenance'],
  ['Dispone de conexión Ethernet', 'Equipped with Ethernet connectivity'],
  ['Permite realizar asistencias técnicas remotas desde cualquier parte del mundo', 'Enables remote technical support from anywhere in the world'],
  ['Sistema de control de última generación CNC', 'Latest-generation CNC control system'],
  ['Con pantalla táctil de 7" color', 'With 7" color touchscreen'],
  ['Programa visual y sencillo para el operador', 'Visual, operator-friendly program interface'],
  ['Permite la creación de cualquier tipo de bobina y acción que se necesite en el proceso de bobinado, rápido y sin errores', 'Allows creating any coil type and winding action required quickly and without errors'],
  ['No importa el fabricante ni el estado de la máquina, estudiaremos todas las posibilidades', 'Regardless of the manufacturer or machine condition, we will study all possibilities'],
  ['Descubre las características de los retrofits de maquinaria', 'Discover the features of our machinery retrofits'],
  ['Retrofit de cualquier bobinadora. No importa el fabricante ni el estado de la máquina, estudiaremos todas las posibilidades.', 'Retrofit for any winding machine. Regardless of the manufacturer or machine condition, we will study all possibilities.'],
  ['Somos especialistas en la fabricación de maquinaria a media. Contacta con nosotros y desarrollaremos el proyecto según sus requerimientos y especificaciones.', 'We specialize in custom machinery manufacturing. Contact us and we will develop the project according to your requirements and specifications.'],
  ['Características ERASAN Mandril expandible', 'ERASAN expandable mandrel features'],
]

const TITLE_RULES = [
  [/^BOBINADORA ERASAN (.+)$/i, 'ERASAN $1 Winding Machine'],
  [/^Bobinadora Strip Foil$/i, 'Strip Foil Winding Machine'],
  [/^Bobinadora Folio$/i, 'Folio Winding Machine'],
  [/^TENSIONADOR DE HILO (.+)$/i, '$1 Wire Tensioner'],
  [/^GUIADOR DE HILO (.+)$/i, '$1 Wire Guide'],
  [/^GUIADOR DE PLETINA (.+)$/i, '$1 Strip Guide'],
  [/^DEVANADOR (.+)$/i, '$1 Dereeler'],
  [/^DISPENSADOR DE PAPEL[- ](.+)$/i, '$1 Paper Dispenser'],
  [/^MANDRIL EXPANDIBLE CIRCULAR$/i, 'Round Expandable Mandrel'],
  [/^MANDRIL EXPANDIBLE RECTANGULAR$/i, 'Rectangular Expandable Mandrel'],
  [/^CABEZAL BOBINADOR ERASAN (.+)$/i, 'WINDING HEAD ERASAN $1'],
  [/^ERASAN BOBINADORA (.+)$/i, 'ERASAN $1 Winding Machine'],
]

export function translateText(text) {
  if (!text || typeof text !== 'string') return text

  let translated = text
  for (const [es, en] of PHRASES) {
    translated = translated.split(es).join(en)
  }

  return translated
}

export function translateTitle(title) {
  if (!title || typeof title !== 'string') return title

  for (const [pattern, replacement] of TITLE_RULES) {
    if (pattern.test(title)) {
      return title.replace(pattern, replacement)
    }
  }

  return translateText(title)
}

export function translateFeatures(features = []) {
  return features.map((feature) => translateText(feature))
}

export function translateSpecifications(specifications = []) {
  return specifications.map((spec) => ({
    label: translateText(spec.label),
    value: translateText(spec.value),
  }))
}

export function translateProductItem(item, { titleOverride = null } = {}) {
  if (!item) return item

  return {
    ...item,
    title: titleOverride || translateTitle(item.title),
    excerpt: translateText(item.excerpt),
    content: translateText(item.content),
    features: translateFeatures(item.features || []),
    specifications: translateSpecifications(item.specifications || []),
  }
}

export function translateCategoryDescription(description) {
  return translateText(description)
}
