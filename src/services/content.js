import { blogPosts } from '../data/blogPosts'
import { products } from '../data/products'
import { blogCategories, categoriesBySection } from '../data/categories'
import { getProductGalleryImage } from '../data/productGalleryImages'

const PLACEHOLDER_IMAGE = 'https://placehold.co/800x600/1e293b/dc2626?text=Erasan+Product'

function paginate(items, { page = 1, perPage = 10 } = {}) {
  const total = items.length
  const totalPages = Math.max(1, Math.ceil(total / perPage))
  const start = (page - 1) * perPage

  return {
    data: items.slice(start, start + perPage),
    totalPages,
    total,
  }
}

function filterPosts({ search = '', category = null } = {}) {
  let filtered = [...blogPosts]

  if (search) {
    const query = search.toLowerCase()
    filtered = filtered.filter((post) => {
      const title = post.title.rendered.toLowerCase()
      const excerpt = post.excerpt?.rendered?.toLowerCase() || ''
      const content = post.content.rendered.toLowerCase()
      return title.includes(query) || excerpt.includes(query) || content.includes(query)
    })
  }

  if (category) {
    const categoryId = parseInt(category, 10)
    filtered = filtered.filter((post) =>
      post._embedded['wp:term'][0].some((cat) => cat.id === categoryId)
    )
  }

  return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
}

function filterProducts({ section = null, category = null } = {}) {
  let filtered = [...products]

  if (section) {
    filtered = filtered.filter((product) => product.section === section)
  }

  if (category) {
    filtered = filtered.filter((product) => product.categorySlug === category)
  }

  return filtered
}

function toLegacyProduct(product) {
  const featuredImage = getProductGalleryImage(product.slug, 0) || PLACEHOLDER_IMAGE

  return {
    ...product,
    title: { rendered: product.i18nKey },
    excerpt: { rendered: product.i18nKey },
    content: { rendered: product.i18nKey },
    _embedded: {
      'wp:featuredmedia': [
        {
          source_url: featuredImage,
          media_details: {
            sizes: {
              thumbnail: { source_url: featuredImage },
              medium: { source_url: featuredImage },
              large: { source_url: featuredImage },
            },
          },
        },
      ],
      'wp:term': product.categorySlug
        ? [[{ id: product.categoryId, name: product.categorySlug, slug: product.categorySlug }], []]
        : [[], []],
    },
  }
}

export const postsApi = {
  async getAll({ page = 1, perPage = 10, search = '', category = null } = {}) {
    const filtered = filterPosts({ search, category })
    return paginate(filtered, { page, perPage })
  },

  async getBySlug(slug) {
    return blogPosts.find((post) => post.slug === slug) || null
  },

  async getById(id) {
    return blogPosts.find((post) => post.id === id) || null
  },

  async getRecent(count = 5) {
    const sorted = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date))
    return { data: sorted.slice(0, count), totalPages: 1, total: sorted.length }
  },

  async getByCategory(categorySlug, perPage = 10) {
    const category = blogCategories.find((cat) => cat.slug === categorySlug)
    if (!category) return { data: [], totalPages: 0, total: 0 }
    return this.getAll({ category: category.id, perPage })
  },
}

export const productsApi = {
  async getAll({ page = 1, perPage = 12, section = null, category = null } = {}) {
    const filtered = filterProducts({ section, category }).map(toLegacyProduct)
    return paginate(filtered, { page, perPage })
  },

  async getBySlug(slug) {
    const product = products.find((item) => item.slug === slug)
    return product ? toLegacyProduct(product) : null
  },

  async getById(id) {
    const product = products.find((item) => item.id === id)
    return product ? toLegacyProduct(product) : null
  },

  async getFeatured(count = 6) {
    const featured = products.slice(0, count).map(toLegacyProduct)
    return { data: featured, totalPages: 1, total: featured.length }
  },

  async getCategories(section = 'coilWinding') {
    const categories = categoriesBySection[section] || []
    return { data: categories, totalPages: 1, total: categories.length }
  },
}

export const categoriesApi = {
  async getAll() {
    return { data: blogCategories, totalPages: 1, total: blogCategories.length }
  },

  async getBySlug(slug) {
    return blogCategories.find((cat) => cat.slug === slug) || null
  },
}

export { localizeProduct, localizeCategory } from '../utils/contentHelpers'

export default {
  posts: postsApi,
  products: productsApi,
  categories: categoriesApi,
}
