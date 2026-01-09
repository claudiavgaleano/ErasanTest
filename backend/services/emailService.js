import nodemailer from 'nodemailer'

/**
 * Create email transporter based on environment configuration
 * Supports: Gmail, SMTP, Hostinger, IONOS, and custom providers
 */
function createTransporter() {
  const provider = process.env.EMAIL_PROVIDER || 'smtp'

  // Common configurations for popular providers
  const providerConfigs = {
    gmail: {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use App Password for Gmail
      },
    },
    hostinger: {
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    },
    ionos: {
      host: 'smtp.ionos.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    },
    smtp: {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    },
  }

  const config = providerConfigs[provider] || providerConfigs.smtp

  return nodemailer.createTransport(config)
}

/**
 * Send contact form email
 * @param {Object} data - Contact form data
 * @param {string} data.name - Sender's name
 * @param {string} data.email - Sender's email
 * @param {string} data.subject - Email subject
 * @param {string} data.message - Email message
 */
export async function sendContactEmail({ name, email, subject, message }) {
  try {
    const transporter = createTransporter()

    // Verify connection
    await transporter.verify()

    const recipientEmail = process.env.CONTACT_EMAIL || process.env.EMAIL_USER
    const companyName = process.env.COMPANY_NAME || 'Erasan'

    // Email to company (notification of new contact)
    const companyMailOptions = {
      from: `"${companyName} Website" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `[Contact Form] ${subject}`,
      text: `
New contact form submission from ${companyName} website

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FROM: ${name}
EMAIL: ${email}
SUBJECT: ${subject}

MESSAGE:
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This message was sent from the contact form on your website.
You can reply directly to this email to respond to ${name}.
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <!-- Header -->
    <tr>
      <td style="background: linear-gradient(135deg, #b91c1c 0%, #dc2626 100%); padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">
          New Contact Form Submission
        </h1>
      </td>
    </tr>
    
    <!-- Content -->
    <tr>
      <td style="padding: 30px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <!-- Sender Info -->
          <tr>
            <td style="padding-bottom: 20px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #fef2f2; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="padding: 15px;">
                    <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">From</p>
                    <p style="margin: 0; color: #111827; font-size: 16px; font-weight: 600;">${name}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 15px 15px 15px;">
                    <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</p>
                    <p style="margin: 0;">
                      <a href="mailto:${email}" style="color: #b91c1c; text-decoration: none; font-size: 16px;">${email}</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Subject -->
          <tr>
            <td style="padding-bottom: 20px;">
              <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Subject</p>
              <p style="margin: 0; color: #111827; font-size: 18px; font-weight: 600;">${subject}</p>
            </td>
          </tr>
          
          <!-- Message -->
          <tr>
            <td style="padding-bottom: 20px;">
              <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
              <div style="background-color: #f9fafb; border-left: 4px solid #b91c1c; padding: 20px; border-radius: 0 8px 8px 0;">
                <p style="margin: 0; color: #374151; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
              </div>
            </td>
          </tr>
          
          <!-- Reply Button -->
          <tr>
            <td style="text-align: center; padding-top: 10px;">
              <a href="mailto:${email}?subject=Re: ${subject}" style="display: inline-block; background: linear-gradient(135deg, #b91c1c 0%, #dc2626 100%); color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-weight: 600; font-size: 14px;">
                Reply to ${name}
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    
    <!-- Footer -->
    <tr>
      <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0; color: #6b7280; font-size: 13px;">
          This message was sent from the contact form on your website.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
      `.trim(),
    }

    // Send notification to company
    await transporter.sendMail(companyMailOptions)

    // Optional: Send confirmation email to the user
    if (process.env.SEND_CONFIRMATION === 'true') {
      const userMailOptions = {
        from: `"${companyName}" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Thank you for contacting ${companyName}`,
        text: `
Dear ${name},

Thank you for contacting ${companyName}. We have received your message and will get back to you as soon as possible.

Your message:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Subject: ${subject}

${message}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Best regards,
The ${companyName} Team
        `.trim(),
        html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <tr>
      <td style="background: linear-gradient(135deg, #b91c1c 0%, #dc2626 100%); padding: 30px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">
          Thank You for Contacting Us
        </h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 30px;">
        <p style="color: #374151; font-size: 16px; line-height: 1.7;">Dear ${name},</p>
        <p style="color: #374151; font-size: 16px; line-height: 1.7;">
          Thank you for reaching out to ${companyName}. We have received your message and will get back to you as soon as possible, typically within 24-48 hours.
        </p>
        <div style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 12px; text-transform: uppercase;">Your message:</p>
          <p style="margin: 0; color: #374151; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
        <p style="color: #374151; font-size: 16px; line-height: 1.7;">
          Best regards,<br>
          <strong>The ${companyName} Team</strong>
        </p>
      </td>
    </tr>
    <tr>
      <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
        <p style="margin: 0; color: #6b7280; font-size: 13px;">
          © ${new Date().getFullYear()} ${companyName}. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
        `.trim(),
      }

      await transporter.sendMail(userMailOptions)
    }

    console.log(`✓ Contact email sent from ${email}`)
    return { success: true }
  } catch (error) {
    console.error('Email service error:', error)
    return { success: false, error: error.message }
  }
}

