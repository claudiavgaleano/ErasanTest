import { useState, useEffect, useCallback } from 'react'
import { postsApi, productsApi, categoriesApi, contactApi, wpHelpers } from '../services/wordpress'

/**
 * Hook for fetching blog posts
 * @param {Object} options - Fetch options
 */
export function usePosts(options = {}) {
  const { page = 1, perPage = 10, search = '', category = null, enabled = true } = options
  
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalPages, setTotalPages] = useState(0)
  const [total, setTotal] = useState(0)

  const fetchPosts = useCallback(async () => {
    if (!enabled) return
    
    setLoading(true)
    setError(null)
    
    try {
      const result = await postsApi.getAll({ page, perPage, search, category })
      setPosts(result.data)
      setTotalPages(result.totalPages)
      setTotal(result.total)
    } catch (err) {
      setError(err.message)
      setPosts([])
    } finally {
      setLoading(false)
    }
  }, [page, perPage, search, category, enabled])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  return { posts, loading, error, totalPages, total, refetch: fetchPosts }
}

/**
 * Hook for fetching a single post by slug
 * @param {string} slug - Post slug
 */
export function usePost(slug) {
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      return
    }

    const fetchPost = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const data = await postsApi.getBySlug(slug)
        setPost(data)
      } catch (err) {
        setError(err.message)
        setPost(null)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [slug])

  return { post, loading, error }
}

/**
 * Hook for fetching products
 * @param {Object} options - Fetch options
 */
export function useProducts(options = {}) {
  const { page = 1, perPage = 12, category = null, enabled = true } = options
  
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [totalPages, setTotalPages] = useState(0)
  const [total, setTotal] = useState(0)

  const fetchProducts = useCallback(async () => {
    if (!enabled) return
    
    setLoading(true)
    setError(null)
    
    try {
      const result = await productsApi.getAll({ page, perPage, category })
      setProducts(result.data)
      setTotalPages(result.totalPages)
      setTotal(result.total)
    } catch (err) {
      setError(err.message)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [page, perPage, category, enabled])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, loading, error, totalPages, total, refetch: fetchProducts }
}

/**
 * Hook for fetching a single product by slug
 * @param {string} slug - Product slug
 */
export function useProduct(slug) {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) {
      setLoading(false)
      return
    }

    const fetchProduct = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const data = await productsApi.getBySlug(slug)
        setProduct(data)
      } catch (err) {
        setError(err.message)
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [slug])

  return { product, loading, error }
}

/**
 * Hook for fetching categories
 * @param {string} type - 'posts' or 'products'
 */
export function useCategories(type = 'posts') {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const result = type === 'products' 
          ? await productsApi.getCategories()
          : await categoriesApi.getAll()
        setCategories(result.data)
      } catch (err) {
        setError(err.message)
        setCategories([])
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [type])

  return { categories, loading, error }
}

/**
 * Hook for fetching contact information from WordPress
 * Returns contact details managed in WordPress admin
 */
export function useContactInfo() {
  const [contactInfo, setContactInfo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchContactInfo = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const info = await contactApi.getInfo()
        setContactInfo(info)
      } catch (err) {
        setError(err.message)
        setContactInfo(null)
      } finally {
        setLoading(false)
      }
    }

    fetchContactInfo()
  }, [])

  return { contactInfo, loading, error }
}

/**
 * Hook for recent posts (sidebar, footer, etc.)
 * @param {number} count - Number of posts to fetch
 */
export function useRecentPosts(count = 5) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const result = await postsApi.getRecent(count)
        setPosts(result.data)
      } catch (err) {
        console.error('Error fetching recent posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRecent()
  }, [count])

  return { posts, loading }
}

/**
 * Hook for featured products
 * @param {number} count - Number of products to fetch
 */
export function useFeaturedProducts(count = 6) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const result = await productsApi.getFeatured(count)
        setProducts(result.data)
      } catch (err) {
        console.error('Error fetching featured products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchFeatured()
  }, [count])

  return { products, loading }
}

// Export helpers for use in components
export { wpHelpers }

