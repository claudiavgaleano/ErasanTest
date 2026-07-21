import slide1Image from '../assets/Home/home-1.jpg'
import slide2Image from '../assets/Home/home-2.jpg'
import slide3Image from '../assets/Home/home-3.jpg'
import slide4Image from '../assets/Home/TileErasan.jpg'

/**
 * Home carousel slide backgrounds, indexed to match carousel.slide1–slide4 in i18n.
 * Swap image imports here to change carousel backgrounds without editing Carousel.jsx.
 */
export const HOME_CAROUSEL_SLIDES = [
  { id: 'slide1', image: slide1Image },
  { id: 'slide2', image: slide2Image },
  { id: 'slide3', image: slide3Image },
  { id: 'slide4', image: slide4Image },
]

export function getHomeCarouselSlide(index) {
  return HOME_CAROUSEL_SLIDES[index] || null
}
