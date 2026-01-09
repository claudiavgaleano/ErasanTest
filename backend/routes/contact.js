import express from 'express'
import { body, validationResult } from 'express-validator'
import { sendContactEmail } from '../services/emailService.js'

const router = express.Router()

// Validation rules
const contactValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('subject')
    .trim()
    .notEmpty().withMessage('Subject is required')
    .isLength({ max: 200 }).withMessage('Subject must be less than 200 characters'),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10 }).withMessage('Message must be at least 10 characters')
    .isLength({ max: 5000 }).withMessage('Message must be less than 5000 characters'),
]

// POST /api/contact - Submit contact form
router.post('/', contactValidation, async (req, res) => {
  try {
    // Check validation errors
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg,
        })),
      })
    }

    const { name, email, subject, message } = req.body

    // Send email
    const result = await sendContactEmail({ name, email, subject, message })

    if (result.success) {
      res.status(200).json({
        success: true,
        message: 'Message sent successfully. We will get back to you shortly.',
      })
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again later.',
      })
    }
  } catch (error) {
    console.error('Contact form error:', error)
    res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again later.',
    })
  }
})

export { router as contactRouter }

