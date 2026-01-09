/**
 * Contact Form API Service
 * Handles form submission to the backend email service
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

/**
 * Submit contact form to backend
 * @param {Object} formData - Form data
 * @param {string} formData.name - Sender's name
 * @param {string} formData.email - Sender's email
 * @param {string} formData.subject - Message subject
 * @param {string} formData.message - Message content
 * @returns {Promise<{success: boolean, message: string, errors?: Array}>}
 */
export async function submitContactForm(formData) {
  try {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'Failed to send message',
        errors: data.errors || [],
      }
    }

    return {
      success: true,
      message: data.message,
    }
  } catch (error) {
    console.error('Contact form submission error:', error)
    
    // Check if it's a network error
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return {
        success: false,
        message: 'Unable to connect to server. Please try again later.',
      }
    }

    return {
      success: false,
      message: 'An error occurred. Please try again later.',
    }
  }
}

