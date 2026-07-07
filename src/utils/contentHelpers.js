export const contentHelpers = {
  getFeaturedImage(post, size = 'large') {
    if (!post?._embedded?.['wp:featuredmedia']?.[0]) {
      return null
    }
    const media = post._embedded['wp:featuredmedia'][0]
    return media.media_details?.sizes?.[size]?.source_url || media.source_url
  },

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

  stripHtml(html) {
    const tmp = document.createElement('div')
    tmp.innerHTML = html
    return tmp.textContent || tmp.innerText || ''
  },

  getExcerpt(content, length = 150) {
    const text = this.stripHtml(content)
    if (text.length <= length) return text
    return text.substring(0, length).trim() + '...'
  },

  formatDate(date, locale = 'en-US') {
    return new Date(date).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  },

  getAcfFields(post) {
    return post?.acf || {}
  },
}
