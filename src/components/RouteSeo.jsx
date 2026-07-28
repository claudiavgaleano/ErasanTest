import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PageSeo from './PageSeo'

const STATIC_ROUTES = [
  { test: (path) => path === '/', key: 'home' },
  { test: (path) => path === '/about', key: 'about' },
  { test: (path) => path === '/services', key: 'services' },
  { test: (path) => path === '/products', key: 'products' },
  { test: (path) => path === '/coil-winding', key: 'coilWinding' },
  { test: (path) => path === '/proyectos-especiales', key: 'specialProjects' },
  { test: (path) => path === '/accesories', key: 'accessories' },
  { test: (path) => path === '/retrofit' || path === '/products/retrofit', key: 'retrofit' },
  { test: (path) => path === '/blog', key: 'blog' },
  { test: (path) => path === '/contact', key: 'contact' },
  { test: (path) => path === '/legal', key: 'legal' },
]

function isDynamicRoute(pathname) {
  if (/^\/products\/[^/]+$/.test(pathname) && pathname !== '/products/retrofit') {
    return true
  }
  return /^\/blog\/[^/]+$/.test(pathname)
}

export default function RouteSeo() {
  const { pathname } = useLocation()
  const { t } = useTranslation()

  if (isDynamicRoute(pathname)) {
    return null
  }

  const route = STATIC_ROUTES.find(({ test }) => test(pathname))

  if (!route) {
    return (
      <PageSeo
        title={t('seo.default.title')}
        description={t('seo.default.description')}
        path={pathname}
        noindex
      />
    )
  }

  return (
    <PageSeo
      title={t(`seo.${route.key}.title`)}
      description={t(`seo.${route.key}.description`)}
      path={pathname}
      noindex={route.key === 'legal'}
    />
  )
}
