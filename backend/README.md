# Erasan Contact Form Backend

Simple Express.js backend API for handling contact form submissions.

## Features

- ✅ Email sending via SMTP (supports Gmail, Hostinger, IONOS, custom)
- ✅ Input validation and sanitization
- ✅ Rate limiting (10 requests per 15 minutes per IP)
- ✅ CORS protection
- ✅ Security headers (Helmet)
- ✅ Beautiful HTML email templates
- ✅ Optional confirmation email to sender

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

```bash
# Copy the example file
cp .env.example .env

# Edit with your settings
nano .env
```

### 3. Start the Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

## Email Provider Configuration

### Gmail

1. Enable 2-Factor Authentication on your Google account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Configure `.env`:

```env
EMAIL_PROVIDER=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Hostinger

```env
EMAIL_PROVIDER=hostinger
EMAIL_USER=your-email@yourdomain.com
EMAIL_PASS=your-email-password
```

### IONOS

```env
EMAIL_PROVIDER=ionos
EMAIL_USER=your-email@yourdomain.com
EMAIL_PASS=your-email-password
```

### Custom SMTP

```env
EMAIL_PROVIDER=smtp
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-password
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_SECURE=false
```

## API Endpoints

### Health Check

```
GET /api/health
```

Response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Submit Contact Form

```
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Product Inquiry",
  "message": "I would like to learn more about your winding machines..."
}
```

Success Response:
```json
{
  "success": true,
  "message": "Message sent successfully. We will get back to you shortly."
}
```

Validation Error Response:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    { "field": "email", "message": "Please provide a valid email address" }
  ]
}
```

## Security Features

- **Rate Limiting**: 10 requests per 15 minutes per IP address
- **Input Validation**: All fields are validated and sanitized
- **CORS**: Only allowed origins can access the API
- **Helmet**: Security headers are applied
- **Body Size Limit**: Request body limited to 10KB

## Production Deployment

### Option 1: Same Server as Frontend

Run alongside your React app on the hosting server.

### Option 2: Separate Server

Deploy on:
- Railway.app (free tier available)
- Render.com (free tier available)
- DigitalOcean App Platform
- AWS Lambda / Vercel Functions

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3001
ALLOWED_ORIGINS=https://your-domain.com
EMAIL_PROVIDER=hostinger
EMAIL_USER=info@your-domain.com
EMAIL_PASS=your-secure-password
CONTACT_EMAIL=contact@your-domain.com
COMPANY_NAME=Erasan
SEND_CONFIRMATION=true
```

## Troubleshooting

### Gmail "Less Secure Apps" Error

Gmail requires App Passwords. Regular passwords won't work.

1. Go to: https://myaccount.google.com/security
2. Enable 2-Step Verification
3. Go to: https://myaccount.google.com/apppasswords
4. Generate a new App Password for "Mail"
5. Use this 16-character password in `.env`

### Hostinger/IONOS Connection Issues

- Verify your email credentials in the hosting control panel
- Check if SMTP is enabled for your email account
- Try port 465 with `SMTP_SECURE=true`

### CORS Errors

Add your frontend URL to `ALLOWED_ORIGINS` in `.env`:

```env
ALLOWED_ORIGINS=http://localhost:5173,https://your-production-domain.com
```

## License

MIT

