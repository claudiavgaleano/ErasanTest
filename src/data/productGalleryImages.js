import stripFoilMain from '../assets/CoilWinding/Folio/strip-foil-main.png'
import stripFoilLateral from '../assets/CoilWinding/Folio/strip-foil-2.png'
import th3Main from '../assets/Accesories/Tensionadores/th3-main.png'
import th3Lateral from '../assets/Accesories/Tensionadores/th3-lateral.png'
import th3IsMain from '../assets/Accesories/Tensionadores/th3-is-main.png'
import th3IsLateral from '../assets/Accesories/Tensionadores/th3-is-lateral.png'
import th3DMain from '../assets/Accesories/Tensionadores/th3-d-main.png'
import th3StandaloneMain from '../assets/Accesories/Tensionadores/th3StandAlonem.png'
import th3StandaloneLateral from '../assets/Accesories/Tensionadores/th3StandAlone1m.png'

export const PRODUCT_GALLERY_IMAGES = {
  'bobinadora-strip-foil': [stripFoilMain, stripFoilLateral],
  'tensionador-de-hilo-th3': [th3Main, th3Lateral],
  'tensionador-de-hilo-th3-is': [th3IsMain, th3IsLateral],
  'tensionador-de-hilo-th3-d': [th3DMain, th3Lateral],
  'tensionador-de-hilo-th3-standalone': [th3StandaloneMain, th3StandaloneLateral],
}

export function getProductGalleryImage(slug, index = 0) {
  return PRODUCT_GALLERY_IMAGES[slug]?.[index] || null
}
