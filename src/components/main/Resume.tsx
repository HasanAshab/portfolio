'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { FaDownload, FaExternalLinkAlt } from 'react-icons/fa'

const ResumeSection = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Convert Google Docs edit URL to embeddable format
  const googleDocsUrl = 'https://docs.google.com/document/d/147fIVr0h67cWMlcfYRiU-DhmwO20NrS_2EeXnJaYpe4/edit?tab=t.0'
  const documentId = googleDocsUrl.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1]
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
      className="bg-background text-foreground px-6 py-16 flex flex-col items-center min-h-screen"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight">My Resume</h2>
        <p className="mt-2 text-muted-foreground text-sm italic">
          View my professional qualifications and experience.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="w-full max-w-4xl bg-card border border-border rounded-lg shadow-lg overflow-hidden"
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
                href={googleDocsUrl}
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

      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <motion.a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium shadow-md hover:shadow-lg transition-all"
        >
          <FaDownload className="text-base" />
          Download PDF
        </motion.a>

        <motion.a
          href={googleDocsUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-border bg-background text-foreground font-medium shadow-md hover:shadow-lg transition-all"
        >
          <FaExternalLinkAlt className="text-base" />
          View in Google Docs
        </motion.a>
      </div>
    </section>
  )
}

export default ResumeSection
