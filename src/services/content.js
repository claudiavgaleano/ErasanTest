import { blogPosts } from '../data/blogPosts'
import { products } from '../data/products'
import { blogCategories, productCategories } from '../data/categories'
import { contentHelpers } from '../utils/contentHelpers'

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
      const excerpt = contentHelpers.stripHtml(post.excerpt?.rendered || '').toLowerCase()
      const content = contentHelpers.stripHtml(post.content.rendered).toLowerCase()
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

function filterProducts({ category = null } = {}) {
  let filtered = [...products]

  if (category) {
    filtered = filtered.filter((product) =>
      product._embedded['wp:term'][0].some((cat) => cat.slug === category)
    )
  }

  return filtered
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
  async getAll({ page = 1, perPage = 12, category = null } = {}) {
    const filtered = filterProducts({ category })
    return paginate(filtered, { page, perPage })
  },

  async getBySlug(slug) {
    return products.find((product) => product.slug === slug) || null
  },

  async getById(id) {
    return products.find((product) => product.id === id) || null
  },

  async getFeatured(count = 6) {
    const featured = products.filter((product) => product.acf?.featured)
    return { data: featured.slice(0, count), totalPages: 1, total: featured.length }
  },

  async getCategories() {
    return { data: productCategories, totalPages: 1, total: productCategories.length }
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

export { contentHelpers }

export default {
  posts: postsApi,
  products: productsApi,
  categories: categoriesApi,
  helpers: contentHelpers,
}
