const ALLOWED_TAGS = new Set([
  'P',
  'BR',
  'STRONG',
  'B',
  'EM',
  'I',
  'U',
  'UL',
  'OL',
  'LI',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'BLOCKQUOTE',
  'A',
  'IMG',
  'CODE',
  'PRE',
  'SPAN',
  'DIV',
  'HR',
  'FIGURE',
  'FIGCAPTION',
])

const ALLOWED_ATTRS = {
  A: new Set(['href', 'title', 'rel', 'target']),
  IMG: new Set(['src', 'alt', 'title', 'width', 'height']),
}

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function htmlToPlainText(html) {
  if (html == null || html === '') return ''
  if (typeof DOMParser === 'undefined') {
    return String(html).replace(/<[^>]*>/g, '')
  }
  const doc = new DOMParser().parseFromString(String(html), 'text/html')
  return doc.body.textContent || ''
}

function isSafeHttpUrl(value) {
  try {
    const parsed = new URL(String(value).trim(), 'https://invalid.local')
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch {
    return false
  }
}

function isSafeHref(value) {
  const trimmed = String(value || '').trim()
  if (!trimmed) return false
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) return true
  if (trimmed.startsWith('#')) return true
  try {
    const parsed = new URL(trimmed, 'https://invalid.local')
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' || parsed.protocol === 'mailto:'
  } catch {
    return false
  }
}

function sanitizeElement(el) {
  const tag = el.tagName

  if (el.hasAttribute('href') && !isSafeHref(el.getAttribute('href'))) {
    el.removeAttribute('href')
  }
  if (el.hasAttribute('src') && !isSafeHttpUrl(el.getAttribute('src'))) {
    el.remove()
    return
  }

  ;[...el.attributes].forEach((attr) => {
    const name = attr.name.toLowerCase()
    if (name.startsWith('on') || name === 'style' || name === 'srcset') {
      el.removeAttribute(attr.name)
      return
    }
    const allowed = ALLOWED_ATTRS[tag]
    if (allowed) {
      if (!allowed.has(name)) el.removeAttribute(attr.name)
    } else if (name !== 'class') {
      el.removeAttribute(attr.name)
    }
  })

  if (tag === 'A') {
    el.setAttribute('rel', 'noopener noreferrer nofollow')
    const href = el.getAttribute('href')
    if (href && /^https?:/i.test(href)) {
      el.setAttribute('target', '_blank')
    }
  }
}

function walk(node) {
  ;[...node.childNodes].forEach((child) => {
    if (child.nodeType === Node.COMMENT_NODE) {
      child.remove()
      return
    }
    if (child.nodeType !== Node.ELEMENT_NODE) return

    const tag = child.tagName
    if (!ALLOWED_TAGS.has(tag)) {
      const parent = child.parentNode
      walk(child)
      while (child.firstChild) {
        parent.insertBefore(child.firstChild, child)
      }
      child.remove()
      return
    }

    sanitizeElement(child)
    if (child.parentNode) walk(child)
  })
}

export function sanitizeHtml(html) {
  if (html == null || html === '') return ''
  if (typeof DOMParser === 'undefined') return escapeHtml(html)

  const doc = new DOMParser().parseFromString(String(html), 'text/html')
  doc.querySelectorAll('script,iframe,object,embed,link,meta,base,form,input,textarea,button,style').forEach((el) => {
    el.remove()
  })
  walk(doc.body)
  return doc.body.innerHTML
}

export function safeMailtoHref(email) {
  const value = String(email || '').trim()
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) return undefined
  return `mailto:${value}`
}

export function safeTelHref(phone) {
  const value = String(phone || '').replace(/[^\d+]/g, '')
  if (!/^\+?\d{7,20}$/.test(value)) return undefined
  return `tel:${value}`
}

export function safeHttpsUrl(url) {
  try {
    const parsed = new URL(String(url || '').trim())
    if (parsed.protocol === 'https:') return parsed.href
  } catch {
    /* ignore */
  }
  return undefined
}
