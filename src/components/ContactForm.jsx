import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Snackbar,
  CircularProgress,
  InputAdornment,
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import EmailIcon from '@mui/icons-material/Email'
import SubjectIcon from '@mui/icons-material/Subject'
import MessageIcon from '@mui/icons-material/Message'
import SendIcon from '@mui/icons-material/Send'
import { useThemeMode } from '../context/ThemeContext'
import { submitContactForm } from '../services/contactApi'

const initialFormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

export default function ContactForm() {
  const { t } = useTranslation()
  const { mode } = useThemeMode()
  const [formData, setFormData] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  const iconColor = mode === 'dark' ? 'rgba(220, 38, 38, 0.7)' : 'rgba(185, 28, 28, 0.7)'

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = t('contact.form.errors.nameRequired')
    } else if (formData.name.trim().length < 2) {
      newErrors.name = t('contact.form.errors.nameMin')
    }

    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.errors.emailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.form.errors.emailInvalid')
    }

    if (!formData.subject.trim()) {
      newErrors.subject = t('contact.form.errors.subjectRequired')
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact.form.errors.messageRequired')
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('contact.form.errors.messageMin')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const result = await submitContactForm(formData)

      if (result.success) {
        setSnackbar({
          open: true,
          message: t('contact.form.success'),
          severity: 'success',
        })
        setFormData(initialFormState)
      } else {
        // Handle server-side validation errors
        if (result.errors && result.errors.length > 0) {
          const serverErrors = {}
          result.errors.forEach((err) => {
            serverErrors[err.field] = err.message
          })
          setErrors(serverErrors)
        }
        setSnackbar({
          open: true,
          message: result.message || t('contact.form.error'),
          severity: 'error',
        })
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: t('contact.form.error'),
        severity: 'error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }))
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      aria-label={t('contact.form.title')}
      noValidate
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Typography 
        variant="h4" 
        component="h2"
        id="contact-form-title"
        sx={{ mb: 2, fontFamily: '"Rajdhani", sans-serif', fontWeight: 600 }}
      >
        {t('contact.form.title')}
      </Typography>

      <TextField
        fullWidth
        id="contact-name"
        label={t('contact.form.name')}
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={!!errors.name}
        helperText={errors.name}
        required
        autoComplete="name"
        aria-required="true"
        aria-invalid={!!errors.name}
        aria-describedby={errors.name ? 'name-error' : undefined}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon sx={{ color: iconColor }} aria-hidden="true" />
            </InputAdornment>
          ),
        }}
        FormHelperTextProps={{
          id: 'name-error',
          role: errors.name ? 'alert' : undefined,
        }}
        sx={{
          '& .MuiFormHelperText-root': {
            marginLeft: 0,
          },
        }}
      />

      <TextField
        fullWidth
        id="contact-email"
        label={t('contact.form.email')}
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        required
        autoComplete="email"
        aria-required="true"
        aria-invalid={!!errors.email}
        aria-describedby={errors.email ? 'email-error' : undefined}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon sx={{ color: iconColor }} aria-hidden="true" />
            </InputAdornment>
          ),
        }}
        FormHelperTextProps={{
          id: 'email-error',
          role: errors.email ? 'alert' : undefined,
        }}
        sx={{
          '& .MuiFormHelperText-root': {
            marginLeft: 0,
          },
        }}
      />

      <TextField
        fullWidth
        id="contact-subject"
        label={t('contact.form.subject')}
        name="subject"
        value={formData.subject}
        onChange={handleChange}
        error={!!errors.subject}
        helperText={errors.subject}
        required
        aria-required="true"
        aria-invalid={!!errors.subject}
        aria-describedby={errors.subject ? 'subject-error' : undefined}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SubjectIcon sx={{ color: iconColor }} aria-hidden="true" />
            </InputAdornment>
          ),
        }}
        FormHelperTextProps={{
          id: 'subject-error',
          role: errors.subject ? 'alert' : undefined,
        }}
        sx={{
          '& .MuiFormHelperText-root': {
            marginLeft: 0,
          },
        }}
      />

      <TextField
        fullWidth
        id="contact-message"
        label={t('contact.form.message')}
        name="message"
        multiline
        rows={5}
        value={formData.message}
        onChange={handleChange}
        error={!!errors.message}
        helperText={errors.message}
        required
        aria-required="true"
        aria-invalid={!!errors.message}
        aria-describedby={errors.message ? 'message-error' : undefined}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
              <MessageIcon sx={{ color: iconColor }} aria-hidden="true" />
            </InputAdornment>
          ),
        }}
        FormHelperTextProps={{
          id: 'message-error',
          role: errors.message ? 'alert' : undefined,
        }}
        sx={{
          '& .MuiFormHelperText-root': {
            marginLeft: 0,
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
        endIcon={
          isSubmitting ? (
            <CircularProgress size={20} color="inherit" aria-hidden="true" />
          ) : (
            <SendIcon aria-hidden="true" />
          )
        }
        sx={{
          mt: 2,
          py: 1.5,
          fontSize: '1rem',
        }}
      >
        {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          role="alert"
          aria-live="polite"
          sx={{
            width: '100%',
            backgroundColor: snackbar.severity === 'success' 
              ? mode === 'dark' ? 'rgba(34, 197, 94, 0.9)' : 'rgba(22, 163, 74, 0.9)'
              : undefined,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
