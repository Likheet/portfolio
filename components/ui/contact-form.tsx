'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

export default function ContactForm() {
  const [result, setResult] = useState('')
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false)
  const [captchaCompleted, setCaptchaCompleted] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js'
    script.async = true
    script.defer = true
    script.onload = () => {
      setRecaptchaLoaded(true)
      ;(window as any).recaptchaCallback = () => {
        setCaptchaCompleted(true)
      }
    }
    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    if (!captchaCompleted) {
      setResult('Please complete the CAPTCHA verification.')
      return
    }
    
    setResult('Sending....')
    
    const form = event.currentTarget
    const formData = new FormData(form)
    formData.append('access_key', 'cad71167-9b5a-4c27-b161-261815e8cc34')

    const recaptchaResponse = (window as any).grecaptcha?.getResponse()
    formData.append('g-recaptcha-response', recaptchaResponse)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      
      if (data.success) {
        setResult('')
        setShowSuccessDialog(true)
        form.reset()
        ;(window as any).grecaptcha?.reset()
        setCaptchaCompleted(false)
        
        setTimeout(() => setShowSuccessDialog(false), 3000)
      } else {
        console.log('Error', data)
        setResult('Failed to send message. Please try again.')
        ;(window as any).grecaptcha?.reset()
        setCaptchaCompleted(false)
      }
    } catch (error) {
      console.log('Error', error)
      setResult('An error occurred. Please try again.')
      ;(window as any).grecaptcha?.reset()
      setCaptchaCompleted(false)
    }
  }

  return (
    <>
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
            data-callback="recaptchaCallback"
          />
        </div>

        {result && !result.includes('Sending') && (
          <div
            className={`p-3 rounded-md text-sm ${
              result.includes('Please complete')
                ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                : 'bg-red-500/10 text-red-500 border border-red-500/20'
            }`}
          >
            {result}
          </div>
        )}

        <button
          type="submit"
          disabled={result === 'Sending....' || !captchaCompleted}
          className="w-full px-6 py-3 bg-foreground text-background rounded-md hover:bg-foreground/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {result === 'Sending....' ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      <AnimatePresence>
        {showSuccessDialog && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              className="bg-background border border-border rounded-lg p-8 shadow-2xl max-w-sm mx-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="flex justify-center mb-4"
              >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
              </motion.div>
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-center mb-2"
              >
                Sent!
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center text-muted-foreground"
              >
                Your message has been sent successfully. I'll get back to you soon!
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
