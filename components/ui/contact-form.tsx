'use client'

import { useState, useEffect } from 'react'

export default function ContactForm() {
  const [result, setResult] = useState('')
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js'
    script.async = true
    script.defer = true
    script.onload = () => setRecaptchaLoaded(true)
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setResult('Sending....')
    
    const form = event.currentTarget
    const formData = new FormData(form)
    formData.append('access_key', 'cad71167-9b5a-4c27-b161-261815e8cc34')

    const recaptchaResponse = (window as any).grecaptcha?.getResponse()
    
    if (!recaptchaResponse) {
      setResult('Please complete the CAPTCHA verification.')
      return
    }

    formData.append('g-recaptcha-response', recaptchaResponse)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      
      if (data.success) {
        setResult('Message sent successfully!')
        form.reset()
        ;(window as any).grecaptcha?.reset()
        setTimeout(() => setResult(''), 5000)
      } else {
        console.log('Error', data)
        setResult('Failed to send message. Please try again.')
        ;(window as any).grecaptcha?.reset()
      }
    } catch (error) {
      console.log('Error', error)
      setResult('An error occurred. Please try again.')
      ;(window as any).grecaptcha?.reset()
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        required
        className="w-full px-4 py-3 bg-background border border-border/50 rounded-md focus:outline-none focus:border-muted-foreground/50 transition-colors duration-300 text-foreground placeholder:text-muted-foreground/50"
        placeholder="Your Name*"
      />

      <input
        type="email"
        name="email"
        required
        className="w-full px-4 py-3 bg-background border border-border/50 rounded-md focus:outline-none focus:border-muted-foreground/50 transition-colors duration-300 text-foreground placeholder:text-muted-foreground/50"
        placeholder="Your Email*"
      />

      <input
        type="text"
        name="subject"
        required
        className="w-full px-4 py-3 bg-background border border-border/50 rounded-md focus:outline-none focus:border-muted-foreground/50 transition-colors duration-300 text-foreground placeholder:text-muted-foreground/50"
        placeholder="Subject*"
      />

      <textarea
        name="message"
        required
        rows={5}
        className="w-full px-4 py-3 bg-background border border-border/50 rounded-md focus:outline-none focus:border-muted-foreground/50 transition-colors duration-300 resize-none text-foreground placeholder:text-muted-foreground/50"
        placeholder="Type your message here*"
      />

      <div className="flex justify-center">
        <div
          className="g-recaptcha"
          data-sitekey="6LfQUA4sAAAAAO1tnhCJGzZlpWJ71Ew7AM4kP6ut"
          data-theme="dark"
        />
      </div>

      {result && (
        <div
          className={`p-3 rounded-md text-sm ${
            result.includes('successfully')
              ? 'bg-green-500/10 text-green-500 border border-green-500/20'
              : result.includes('Sending')
              ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
              : 'bg-red-500/10 text-red-500 border border-red-500/20'
          }`}
        >
          {result}
        </div>
      )}

      <button
        type="submit"
        disabled={result === 'Sending....'}
        className="w-full px-6 py-3 bg-foreground text-background rounded-md hover:bg-foreground/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        {result === 'Sending....' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}
