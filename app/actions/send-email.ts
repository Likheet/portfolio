'use server'

export async function sendEmail(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const subject = formData.get('subject') as string
  const message = formData.get('message') as string

  try {
    // For now, we'll use a simple mailto approach
    // In production, you should integrate with Resend, SendGrid, or similar service
    
    // Simple validation
    if (!name || !email || !subject || !message) {
      return { success: false, message: 'All fields are required.' }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { success: false, message: 'Please enter a valid email address.' }
    }

    const emailBody = `
New Contact Form Submission

From: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
    `.trim()

    // Log for debugging
    console.log('[v0] Contact form submission:', { name, email, subject, message })
    console.log('[v0] Email would be sent to: likheet.s@gmail.com')

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY || 'YOUR_ACCESS_KEY_HERE',
        subject: `Portfolio Contact: ${subject}`,
        from_name: name,
        email: email,
        message: emailBody,
        to: 'likheet.s@gmail.com'
      })
    })

    const data = await response.json()

    if (data.success) {
      return { success: true, message: 'Message sent successfully!' }
    } else {
      return { success: false, message: 'Failed to send message. Please try again.' }
    }
  } catch (error) {
    console.error('[v0] Error sending email:', error)
    return { success: false, message: 'An error occurred. Please try again later.' }
  }
}
