'use client'

import { Variants, motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { FC, FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaRegCopy,
  FaSpinner,
  FaUser,
} from 'react-icons/fa'
import { FaSquarePhone } from 'react-icons/fa6'
import { buttonVariants } from '../ui/button'
import { cn } from '@/lib/utils'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

const ContactUs: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('Message sent successfully!')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('Failed to send message. Please try again.')
      }
    } catch {
      setStatus('An error occurred. Please try again later.')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setStatus(''), 5000)
    }
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copied!`)
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    hover: {
      scale: 1.02,
      transition: { duration: 0.3 },
    },
  }

  const inputVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, delay: i * 0.1 },
    }),
  }

  return (
    <section id="contact" className="py-20 bg-background text-foreground transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-7xl mx-auto bg-muted/50 backdrop-blur-lg rounded-none p-8 sm:p-10 shadow-2xl border border-border"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <div className="flex flex-col md:flex-row gap-12">
            <motion.div
              className="w-full md:w-1/2 space-y-6"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-4xl font-extrabold">Connect With Me</h2>
              <p className="text-muted-foreground leading-relaxed text-base">
                Have a project in mind or a question? Reach out and let&apos;s turn your ideas into
                reality.
              </p>

              <div className="space-y-5 text-foreground">
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-primary text-lg" />
                  <span className="text-sm font-medium select-text">hasanashab.18205@gmail.com</span>
                  <button
                    onClick={() => copyToClipboard('hasanashab.18205@gmail.com', 'Email')}
                    className="text-muted-foreground hover:text-primary transition"
                    aria-label="Copy email"
                  >
                    <FaRegCopy />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <FaSquarePhone className="text-primary text-lg" />
                  <span className="text-sm font-medium select-text">+880 16273 18919</span>
                  <button
                    onClick={() => copyToClipboard('+880 16273 18919', 'Phone number')}
                    className="text-muted-foreground hover:text-primary transition"
                    aria-label="Copy phone number"
                  >
                    <FaRegCopy />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-primary text-lg" />
                  <span className="text-sm font-medium select-text">Dhaka, Bangladesh</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="w-full md:w-1/2 space-y-6"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <form onSubmit={handleSubmit} className="space-y-5" aria-label="Contact Form">
                {['name', 'email', 'subject'].map((field, i) => (
                  <motion.div
                    key={field}
                    custom={i}
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="relative">
                      {field === 'name' && (
                        <FaUser className="absolute top-3.5 left-3 text-muted-foreground" />
                      )}
                      {field === 'email' && (
                        <FaEnvelope className="absolute top-3.5 left-3 text-muted-foreground" />
                      )}
                      {field === 'subject' && (
                        <MessageCircle className="absolute top-3.5 left-3 text-muted-foreground" />
                      )}
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        name={field}
                        value={formData[field as keyof FormData]}
                        onChange={handleChange}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        className="w-full pl-10 pr-4 py-3 bg-background/50 text-foreground rounded-none focus:outline-none focus:ring-2 focus:ring-primary placeholder-muted-foreground transition-all"
                        required
                        aria-label={field}
                      />
                    </div>
                  </motion.div>
                ))}
                <motion.div custom={3} variants={inputVariants} initial="hidden" animate="visible">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please Drop Your Short Message..."
                    className="w-full pl-4 pr-4 py-3 bg-background/50 text-foreground rounded-none h-36 resize-none focus:outline-none focus:ring-2 focus:ring-primary placeholder-muted-foreground transition-all"
                    required
                    aria-label="Message"
                  />
                </motion.div>
                <motion.button
                  type="submit"
                  className={cn(
                    buttonVariants({
                      className:
                        'w-full py-3 rounded-none flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed',
                    }),
                  )}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane /> Send Message
                    </>
                  )}
                </motion.button>
                {status && (
                  <motion.p
                    className={`text-center text-sm ${
                      status.includes('successfully') ? 'text-green-500' : 'text-red-500'
                    }`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {status}
                  </motion.p>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactUs
