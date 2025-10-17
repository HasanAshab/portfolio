'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaDownload, FaExternalLinkAlt } from 'react-icons/fa'

const ResumeSection = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Convert Google Docs edit URL to embeddable format
  const documentId = '1qZgghs6C5OIRRDT0kZCRDkGJqPUezZ5Rcx58LaeQDDM'
  const embedUrl = `https://docs.google.com/document/d/${documentId}/preview`
  const pdfUrl = `https://docs.google.com/document/d/${documentId}/export?format=pdf`

  const handleIframeLoad = () => {
    setIsLoading(false)
  }

  const handleIframeError = () => {
    setError('Failed to load resume from Google Docs')
    setIsLoading(false)
  }

  return (
    <section
      id="resume"
      className="relative bg-background text-foreground px-6 py-20 flex flex-col items-center min-h-screen overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Floating Geometric Shapes */}
        <div className="absolute top-32 right-16 w-28 h-28 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-80 left-20 w-20 h-20 bg-blue-500/20 rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute bottom-60 right-1/3 w-16 h-16 bg-primary/15 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-1/4 w-24 h-24 bg-blue-400/10 rounded-lg rotate-12 float-animation"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-primary/20 via-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-l from-blue-400/15 via-primary/10 to-transparent rounded-full blur-2xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-10 relative z-10"
      >
        <h2 title="My Resume" className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-blue-500 bg-clip-text text-transparent tracking-tight mb-4">
          My Resume
        </h2>
        <p className="text-lg text-muted-foreground">
          View my professional qualifications and experience.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full max-w-4xl bg-card/60 backdrop-blur-sm border border-primary/20 rounded-2xl shadow-2xl overflow-hidden relative z-10"
      >
        <div className="relative w-full h-[800px] overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-muted-foreground">Loading resume...</p>
              </div>
            </div>
          )}

          {error ? (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <p className="text-destructive text-lg mb-4">{error}</p>
              <motion.a
                title="View resume on Google Docs"
                href={embedUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium"
              >
                <FaExternalLinkAlt className="text-sm" />
                View on Google Docs
              </motion.a>
            </div>
          ) : (
            <iframe
              src={embedUrl}
              className="w-full h-full border-0"
              onLoad={handleIframeLoad}
              onError={handleIframeError}
              title="Resume"
              allow="autoplay"
            />
          )}
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 flex flex-wrap gap-4 justify-center relative z-10"
      >
        <motion.a
          title="Download resume as PDF"
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative overflow-hidden inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-blue-500 hover:from-blue-500 hover:to-primary text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <div className="relative z-10 flex items-center gap-2">
            <FaDownload className="text-base" />
            Download PDF
          </div>
          <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </motion.a>

        <motion.a
          title="View resume in Google Docs"
          href={embedUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-card/60 backdrop-blur-sm border border-primary/30 hover:border-primary/60 hover:bg-card/80 text-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <FaExternalLinkAlt className="text-base" />
          View in Google Docs
        </motion.a>
      </motion.div>
    </section>
  )
}

export default ResumeSection
