/**
 * WordPress Headless CMS API Service
 * 
 * Configuration:
 * 1. Install WordPress on your hosting (Hostinger/IONOS)
 * 2. Install required plugins: ACF, ACF to REST API, Contact Form 7, CF7 REST API
 * 3. Update WP_API_URL below with your WordPress URL
 * 4. Create custom post type "products" in WordPress
 */

// WordPress API configuration - UPDATE THIS WITH YOUR WORDPRESS URL
const WP_CONFIG = {
  baseUrl: import.meta.env.VITE_WP_API_URL || 'https://your-wordpress-site.com',
  apiPath: '/wp-json/wp/v2',
}

const API_URL = `${WP_CONFIG.baseUrl}${WP_CONFIG.apiPath}`

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Get total pages from headers for pagination
    const totalPages = response.headers.get('X-WP-TotalPages')
    const total = response.headers.get('X-WP-Total')
    const data = await response.json()

    return {
      data,
      totalPages: totalPages ? parseInt(totalPages, 10) : 1,
      total: total ? parseInt(total, 10) : data.length,
    }
  } catch (error) {
    console.error('WordPress API Error:', error)
    throw error
  }
}

/**
 * Blog Posts API
 */
export const postsApi = {
  /**
   * Get all blog posts with pagination
   * @param {number} page - Page number
   * @param {number} perPage - Posts per page
   * @param {string} search - Search query
   * @param {number} category - Category ID
   */
  async getAll({ page = 1, perPage = 10, search = '', category = null } = {}) {
    let endpoint = `/posts?page=${page}&per_page=${perPage}&_embed`
    if (search) endpoint += `&search=${encodeURIComponent(search)}`
    if (category) endpoint += `&categories=${category}`
    return fetchAPI(endpoint)
  },

  /**
   * Get single post by slug
   * @param {string} slug - Post slug
   */
  async getBySlug(slug) {
    const { data } = await fetchAPI(`/posts?slug=${encodeURIComponent(slug)}&_embed`)
    return data[0] || null
  },

  /**
   * Get single post by ID
   * @param {number} id - Post ID
   */
  async getById(id) {
    const { data } = await fetchAPI(`/posts/${id}?_embed`)
    return data
  },

  /**
   * Get recent posts
   * @param {number} count - Number of posts
   */
  async getRecent(count = 5) {
    return fetchAPI(`/posts?per_page=${count}&_embed`)
  },

  /**
   * Get posts by category slug
   * @param {string} categorySlug - Category slug
   * @param {number} perPage - Posts per page
   */
  async getByCategory(categorySlug, perPage = 10) {
    // First get the category ID
    const { data: categories } = await fetchAPI(`/categories?slug=${categorySlug}`)
    if (categories.length === 0) return { data: [], totalPages: 0, total: 0 }
    
    return fetchAPI(`/posts?categories=${categories[0].id}&per_page=${perPage}&_embed`)
  },
}

/**
 * Products API (Custom Post Type)
 * Requires: Custom post type "products" registered in WordPress
 */
export const productsApi = {
  /**
   * Get all products
   * @param {number} page - Page number
   * @param {number} perPage - Products per page
   * @param {string} category - Product category slug
   */
  async getAll({ page = 1, perPage = 12, category = null } = {}) {
    let endpoint = `/products?page=${page}&per_page=${perPage}&_embed`
    if (category) endpoint += `&product_category=${category}`
    return fetchAPI(endpoint)
  },

  /**
   * Get single product by slug
   * @param {string} slug - Product slug
   */
  async getBySlug(slug) {
    const { data } = await fetchAPI(`/products?slug=${encodeURIComponent(slug)}&_embed`)
    return data[0] || null
  },

  /**
   * Get single product by ID
   * @param {number} id - Product ID
   */
  async getById(id) {
    const { data } = await fetchAPI(`/products/${id}?_embed`)
    return data
  },

  /**
   * Get featured products
   * @param {number} count - Number of products
   */
  async getFeatured(count = 6) {
    // Assumes you have a custom field "featured" or meta query
    return fetchAPI(`/products?per_page=${count}&_embed&meta_key=featured&meta_value=1`)
  },

  /**
   * Get product categories
   */
  async getCategories() {
    return fetchAPI('/product_category')
  },
}

/**
 * Categories API
 */
export const categoriesApi = {
  /**
   * Get all categories
   */
  async getAll() {
    return fetchAPI('/categories')
  },

  /**
   * Get category by slug
   * @param {string} slug - Category slug
   */
  async getBySlug(slug) {
    const { data } = await fetchAPI(`/categories?slug=${encodeURIComponent(slug)}`)
    return data[0] || null
  },
}

/**
 * Pages API
 */
export const pagesApi = {
  /**
   * Get page by slug
   * @param {string} slug - Page slug
   */
  async getBySlug(slug) {
    const { data } = await fetchAPI(`/pages?slug=${encodeURIComponent(slug)}&_embed`)
    return data[0] || null
  },

  /**
   * Get page by ID
   * @param {number} id - Page ID
   */
  async getById(id) {
    const { data } = await fetchAPI(`/pages/${id}?_embed`)
    return data
  },
}

/**
 * Media API
 */
export const mediaApi = {
  /**
   * Get media item by ID
   * @param {number} id - Media ID
   */
  async getById(id) {
    const { data } = await fetchAPI(`/media/${id}`)
    return data
  },
}

/**
 * Contact Information API
 * Fetches contact details from a WordPress page with ACF fields
 * Requires: ACF plugin + ACF to REST API plugin
 * 
 * Setup in WordPress:
 * 1. Create a page called "Contact Info" (slug: contact-info)
 * 2. Add ACF fields: email, phone, address, business_hours, map_url (optional)
 */
export const contactApi = {
  /**
   * Get contact information from WordPress
   * @returns {Object} Contact information
   */
  async getInfo() {
    try {
      const page = await pagesApi.getBySlug('contact-info')
      if (!page) {
        return null
      }
      
      const acf = page.acf || {}
      return {
        email: acf.email || null,
        phone: acf.phone || null,
        address: acf.address || null,
        businessHours: acf.business_hours || null,
        mapUrl: acf.map_url || null,
        // Additional fields you might want
        secondaryPhone: acf.secondary_phone || null,
        fax: acf.fax || null,
        socialLinks: {
          linkedin: acf.linkedin_url || null,
          youtube: acf.youtube_url || null,
          twitter: acf.twitter_url || null,
        },
      }
    } catch (error) {
      console.error('Error fetching contact info:', error)
      return null
    }
  },
}

/**
 * Helper functions for parsing WordPress data
 */
export const wpHelpers = {
  /**
   * Get featured image URL from post
   * @param {Object} post - WordPress post object with _embedded
   * @param {string} size - Image size (thumbnail, medium, large, full)
   */
  getFeaturedImage(post, size = 'large') {
    if (!post?._embedded?.['wp:featuredmedia']?.[0]) {
      return null
    }
    const media = post._embedded['wp:featuredmedia'][0]
    return media.media_details?.sizes?.[size]?.source_url || media.source_url
  },

  /**
   * Get author info from post
   * @param {Object} post - WordPress post object with _embedded
   */
  getAuthor(post) {
    if (!post?._embedded?.author?.[0]) {
      return { name: 'Unknown', avatar: null }
    }
    const author = post._embedded.author[0]
    return {
      name: author.name,
      avatar: author.avatar_urls?.['96'] || null,
      description: author.description,
    }
  },

  /**
   * Get categories from post
   * @param {Object} post - WordPress post object with _embedded
   */
  getCategories(post) {
    if (!post?._embedded?.['wp:term']?.[0]) {
      return []
    }
    return post._embedded['wp:term'][0].map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
    }))
  },

  /**
   * Get tags from post
   * @param {Object} post - WordPress post object with _embedded
   */
  getTags(post) {
    if (!post?._embedded?.['wp:term']?.[1]) {
      return []
    }
    return post._embedded['wp:term'][1].map((tag) => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
    }))
  },

  /**
   * Strip HTML tags from content
   * @param {string} html - HTML content
   */
  stripHtml(html) {
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  },

  /**
   * Get excerpt from content
   * @param {string} content - Post content
   * @param {number} length - Excerpt length
   */
  getExcerpt(content, length = 150) {
    const text = this.stripHtml(content)
    if (text.length <= length) return text
    return text.substring(0, length).trim() + '...'
  },

  /**
   * Format WordPress date
   * @param {string} date - WordPress date string
   * @param {string} locale - Locale for formatting
   */
  formatDate(date, locale = 'en-US') {
    return new Date(date).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  },

  /**
   * Get ACF fields from post (requires ACF to REST API plugin)
   * @param {Object} post - WordPress post object
   */
  getAcfFields(post) {
    return post?.acf || {}
  },
}

export default {
  posts: postsApi,
  products: productsApi,
  categories: categoriesApi,
  pages: pagesApi,
  media: mediaApi,
  contact: contactApi,
  helpers: wpHelpers,
}

