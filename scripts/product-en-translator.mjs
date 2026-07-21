import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OVERRIDES = JSON.parse(readFileSync(join(__dirname, 'es-en-overrides.json'), 'utf8'))

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
  ['Tensionador con freno magnético para hilos con un diámetro de 0.50 mm a 3.00mm.', 'Magnetic brake wire tensioner for wire diameters from 0.50 mm to 3.00 mm.'],
  ['La tensión del hilo se ajusta gracias al freno magnético que proporciona una tensión constante durante el proceso de bobinado.', 'Wire tension is adjusted by the magnetic brake, which provides constant tension throughout the winding process.'],
  ['El hilo entra en el tensionador a través de un ojal cerámico y una polea de entrada.', 'Wire enters the tensioner through a ceramic eyelet and an inlet pulley.'],
  ['Este diseño de entrada permite emplear los carretes de hilo montados en lecheras o devanadores, porque el ojal cerámico se monta sobre una pieza basculante adaptándose al camino natural del hilo cuando sale del carrete.', 'This inlet design allows wire spools mounted on creels or dereelers to be used, because the ceramic eyelet is mounted on a pivoting piece that adapts to the natural wire path as it leaves the spool.'],
  ['La regulación del freno se realiza por potenciómetro o por pantalla.', 'Brake adjustment is performed via potentiometer or display screen.'],
  ['En esta versión el tensionador se monta sobre una bancada.', 'In this version, the tensioner is mounted on a standalone bench.'],
  ['En esta versión el tensionador se monta directamente sobre la bobinadora.', 'In this version, the tensioner is mounted directly on the winding machine.'],
  ['Descubre las especificaciones del tensionador de hilo TH3 StandAlone.', 'Discover the specifications of the TH3 StandAlone wire tensioner.'],
  ['Descubre las especificaciones del tensionador de hilo TH3 IS.', 'Discover the specifications of the TH3 IS wire tensioner.'],
  ['Descubre las especificaciones del tensionador de hilo TH3 D.', 'Discover the specifications of the TH3 D wire tensioner.'],
  ['Descubre las especificaciones del tensionador de hilo TH3.', 'Discover the specifications of the TH3 wire tensioner.'],
  ['Características ERASAN TH3 StandAlone', 'ERASAN TH3 StandAlone features'],
  ['Características ERASAN TH3 IS', 'ERASAN TH3 IS features'],
  ['Características ERASAN TH3 D', 'ERASAN TH3 D features'],
  ['Características ERASAN TH3', 'ERASAN TH3 features'],
  ['Detector de hilo', 'Wire break detector'],
  ['Detector que para la máquina en caso de rotura de hilo.', 'Detector that stops the machine in the event of wire breakage.'],
  ['Sistema que contabiliza las vueltas de la polea principal. Permite conocer el consumo de hilo.', 'System that counts the revolutions of the main pulley. Allows wire consumption to be tracked.'],
  ['La clave del bobinado se encuentra en aplicar la correcta tensión y guiado', 'The key to winding lies in applying the correct tension and wire guidance'],
  ['Accesorios', 'Accessories'],
  ['Características', 'Features'],
  [' — lateral', ' — side view'],
  ['Tensionador de hilo TH3 D', 'TH3 D Wire Tensioner'],
  ['Tensionador de hilo TH3 IS', 'TH3 IS Wire Tensioner'],
  ['Tensionador de hilo TH3 StandAlone', 'TH3 StandAlone Wire Tensioner'],
  ['Tensionador de hilo TH3 StandAlone', 'TH3 StandAlone Wire Tensioner'],
  ['Tensionador de hilo TH3', 'TH3 Wire Tensioner'],
  ['Máquina de dos papeles y un folio para la fabricación de bobinas para grandes trasformadores de resina/secos para distibución y potencia.', 'Two-paper, one-foil machine for manufacturing coils for large resin-cast/dry-type distribution and power transformers.'],
  ['BOBINADORA ERASAN STRIP FOIL', 'ERASAN STRIP FOIL WINDING MACHINE'],
  ['BOBINADORA ERASAN STRIP FOIL LATERAL', 'ERASAN STRIP FOIL WINDING MACHINE — LATERAL VIEW'],
  ['El devanador de papel cuenta con una fácil carga y descarga gracias a sus ejes neumáticos. Garantiza la constante tensión durante el bobinado que se necesita en el proceso de bobinado además de que, una fotocélula controla la ubicación del papel en todo momento, desplazándose lateralmente si es necesario.\n\nDispone de un control electrónico que proporciona rapidez en el ajuste del papel.', 'The paper dereeler offers easy loading and unloading thanks to its pneumatic shafts. It maintains the constant tension required during winding, while a photocell monitors paper position at all times, shifting laterally when needed.\n\nIt includes electronic control for fast paper adjustment.'],
  ['Unidad de recogida de papel sobrante mediante un rodillo motorizado instalado junto al sistema devanador de folio.', 'Surplus paper collection unit via a motorized roller installed next to the foil dereeler system.'],
  ['Sistema de corte del folio mediante caladora o por cizalla.', 'Foil cutting system by nibbler or shear.'],
  ['Unidad de soldadura, con mesa soldadura opcional.', 'Welding unit with optional welding table.'],
  ['Eliminador de rebabas, para evitar daños en los extremos de la lámina de cobre o aluminio: dos conjuntos de dos rodillos que ejercen presión sobre los extremos de la banda, uno sobre otro.', 'Burr eliminator to prevent damage to copper or aluminum strip ends: two sets of two rollers applying pressure on the band edges, one above the other.'],
  ['Opción: Mesa soldadura TIG.', 'Option: TIG welding table.'],
  ['Opción: Corte Folio por guillotina.', 'Option: Guillotine foil cutting.'],
  ['Zona de bobinado máxima', 'Maximum winding zone'],
  ['Diámetro máximo de bobina', 'Maximum coil diameter'],
  ['Ancho máximo de folio', 'Maximum foil width'],
  ['Espesor de folio', 'Foil thickness'],
  ['Velocidad de bobinado', 'Winding speed'],
  ['Hasta 120 rpm', 'Up to 120 rpm'],
  ['CNC con pantalla táctil 7"', 'CNC with 7" touchscreen'],
  ['Para la fabricación de bobinas para grandes transformadores de resina/secos de distribución y potencia', 'For manufacturing coils for large resin-cast/dry-type distribution and power transformers'],
  ['Bobinadora Folio', 'Folio Winding Machine'],
  ['El nuevo concepto modular de las máquina folio de ERASAN Technology presenta un sistema novedoso en el corte del folio y de tensión constante en los devanadores de papel como en el devanador de folio que hacen que sea una máquina precisa y segura en la creación de grandes bobinas. \n\n  Un sistema de frenado actúa sobre el devanador del folio como el del papel, manteniendo una tensión constante independientemente de la cantidad de folio.', "ERASAN Technology's modular foil machine concept introduces a novel foil cutting system and constant tension in both paper dereelers and the foil dereeler, making it a precise and safe machine for creating large coils.\n\nA braking system acts on both the foil and paper dereelers, maintaining constant tension regardless of the amount of foil."],
  ['Características ERASAN E-FOIL', 'ERASAN E-FOIL Features'],
  ['Módulo de bobinado', 'Winding module'],
  ['Módulo portacerquillos', 'Spool holder module'],
  ['Módulo de soldadura', 'Welding module'],
  ['Módulo de corte', 'Cutting module'],
  ['Módulo devanador de folio', 'Foil dereeler module'],
  ['BOBINADORA ERASAN E1200C SGB', 'ERASAN E1200C SGB Winding Machine'],
  ['BOBINADORA ERASAN E1200C', 'ERASAN E1200C Winding Machine'],
  ['Características ERASAN E1200C SGB', 'ERASAN E1200C SGB Features'],
  ['Características ERASAN E1200C', 'ERASAN E1200C Features'],
  ['Dos versiones de cinemática: hasta 750 rpm de velocidad con un alto par', 'Two kinematic versions: up to 750 rpm with high torque'],
  ['Dos versiones de cinemática: hasta 500 rpm de velocidad con un alto par', 'Two kinematic versions: up to 500 rpm with high torque'],
  ['Permite fabricar bobinas de longitud máxima de 1.100mm', 'Allows manufacturing coils up to 1,100 mm in length'],
  ['Permite la fabricación de bobinas de alta y baja tensión en la misma máquina.', 'Allows manufacturing high and low voltage coils on the same machine.'],
  ['Cuenta con servomotores en cabezal y guiador', 'Equipped with servomotors in winding head and wire guide'],
  ['Cuatro rangos de velocidad con cambio por palancas', 'Four speed ranges with lever shifting'],
  ['Dos rangos de velocidad con cambio de correas manual, o posibilidad de reductor directo al eje de la máquina', 'Two speed ranges with manual belt change, or direct reducer on the machine shaft'],
  ['Permite una fácil adaptación a las necesidades de bobinado en relación par y velocidad.', 'Allows easy adaptation to winding needs in terms of torque and speed.'],
  ['Máquinas bobinadoras Bobifil – de vuelta a la vida', 'Bobifil winding machines – back to life'],
  ['Máquinas bobinadoras Bobifil – de vuelta a la vida. Retrofit completo para devolver al trabajo equipos de cualquier estado.', 'Bobifil winding machines – back to life. Complete retrofit to return equipment of any condition to production.'],
  ['Antes', 'Before'],
  ['Después', 'After'],
  ['Retrofit completo: de vuelta a la vida', 'Complete retrofit: back to life'],
  ['Renovamos bobinadoras Bobifil con cinemática modernizada, servomotores en cabezal y guiador, y control actualizado para maximizar la vida útil de su equipamiento.', 'We renew Bobifil winding machines with modernized kinematics, servomotors in winding head and wire guide, and updated control to maximize equipment lifespan.'],
  ['Descubre las características de los retrofits de BOBIFIL.\n\nEstudiamos cada máquina para ofrecer la mejor solución de modernización, sin importar el fabricante ni el estado del equipamiento.', 'Discover the features of BOBIFIL retrofits.\n\nWe study each machine to offer the best modernization solution, regardless of manufacturer or equipment condition.'],
  ['Características RETROFIT BOBIFIL', 'BOBIFIL RETROFIT Features'],
  ['Hasta 500 rpm con alto par', 'Up to 500 rpm with high torque'],
  ['Dos versiones de cinemática para adaptarse a cada necesidad de bobinado en relación par y velocidad', 'Two kinematic versions to adapt to each winding need in terms of torque and speed'],
  ['Bobinas de hasta 800 mm', 'Coils up to 800 mm'],
  ['Servomotores en cabezal y guiador', 'Servomotors in head and wire guide'],
  ['Precisión y control en todo el proceso de bobinado', 'Precision and control throughout the winding process'],
  ['Dos rangos de velocidad', 'Two speed ranges'],
  ['Cambio de correas manual o reductor directo al eje de la máquina', 'Manual belt change or direct reducer on the machine shaft'],
  ['Kit de Retrofit', 'Retrofit Kit'],
  ['Armario completamente cableado y testeado para instalar en prácticamente cualquier máquina bobinadora del mercado.', 'Fully wired and tested cabinet ready to install on virtually any winding machine on the market.'],
  ['Características ERASAN KIT RETROFIT', 'ERASAN RETROFIT KIT Features'],
  ['Bobinadora E600 Long', 'E600 Long Winding Machine'],
  ['Máquina Flyer', 'Flyer Machine'],
  ['Encintadora', 'Taping Machine'],
  ['Compatible con gran variedad de formatos de aislantes Además de papel, puede ser utilizado con diferentes tipos de forros, cintas y telas.', 'Compatible with a wide variety of insulation formats. In addition to paper, it can be used with different types of liners, tapes, and fabrics.'],
  ['La gama de tensionadores para hilo y pletina DP están concebidos de manera modular. Pueden acoger desde un único carrete hasta 32.', 'The DP wire and strip tensioner range is designed in a modular way. They can hold from a single spool up to 32.'],
  ['Programa visual y sencillo para el operador', 'Visual, user-friendly operator program'],
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
  if (OVERRIDES[text]) return OVERRIDES[text]

  let translated = text
  for (const [es, en] of PHRASES) {
    translated = translated.split(es).join(en)
  }

  translated = translated
    .replace(/\s*Leer más/gi, '')
    .replace(/Características Descubre las especificaciones del/gi, '')
    .replace(/Features Descubre las especificaciones del/gi, '')
    .replace(/Características ERASAN/gi, 'ERASAN Features')
    .replace(/Features ERASAN/gi, 'ERASAN Features')
    .replace(/\s\.\.\.\s*$/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim()

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

export function translateRichAccessoryEntry(item) {
  if (!item) return item

  return {
    ...item,
    title: translateTitle(item.title),
    heroSubtitle: translateText(item.heroSubtitle),
    excerpt: translateText(item.excerpt),
    heroIntro: (item.heroIntro || []).map((paragraph) => translateText(paragraph)),
    gallery: (item.gallery || []).map((entry) => {
      const caption = typeof entry === 'string' ? entry : entry?.caption || ''
      return { caption: translateText(caption) }
    }),
    characteristics: item.characteristics
      ? {
          title: translateText(item.characteristics.title),
          body: translateText(item.characteristics.body),
        }
      : null,
    brandFeatures: item.brandFeatures
      ? {
          title: translateText(item.brandFeatures.title),
          body: translateText(item.brandFeatures.body),
          items: (item.brandFeatures.items || []).map((feature) => translateText(feature)),
        }
      : null,
    productAccessories: item.productAccessories
      ? {
          title: translateText(item.productAccessories.title),
          items: (item.productAccessories.items || []).map((accessory) => ({
            title: translateText(accessory.title),
            description: translateText(accessory.description),
            imageKey: accessory.imageKey || '',
          })),
        }
      : null,
    tagline: translateText(item.tagline),
    content: translateText(item.content),
    features: translateFeatures(item.features || []),
    specifications: translateSpecifications(item.specifications || []),
  }
}

export function translateProductItem(item, { titleOverride = null } = {}) {
  if (!item) return item

  const base = {
    ...item,
    title: titleOverride || translateTitle(item.title),
    excerpt: translateText(item.excerpt),
    content: translateText(item.content),
    features: translateFeatures(item.features || []),
    specifications: translateSpecifications(item.specifications || []),
  }

  if (item.productAccessories || item.heroSubtitle || item.brandFeatures?.body) {
    return translateRichAccessoryEntry({ ...base, ...item, title: base.title })
  }

  return base
}

export function translateCategoryDescription(description) {
  return translateText(description)
}
