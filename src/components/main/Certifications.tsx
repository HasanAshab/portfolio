'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Award } from 'lucide-react'
import { useState, useMemo } from 'react'

// Sample certifications data - replace with your actual data
const certificationsData = [
  {
    Image: "/ovi_test_certif.png",
    title: "AWS Solutions Architect Associate",
    description: "Validates ability to design and deploy scalable systems on AWS",
    issued: "2023",
    links: [
      {
        link_name: "Certificate",
        url: "https://www.credly.com/badges/example-aws"
      },
      {
        link_name: "Verify",
        url: "https://aws.amazon.com/verification"
      }
    ]
  },
  {
    Image: "/ovi_test_certif_2.png",
    title: "Certified Kubernetes Administrator (CKA)",
    description: "Demonstrates competency in Kubernetes administration, troubleshooting, and cluster operations",
    issued: "2023",
    links: [
      {
        link_name: "Certificate",
        url: "https://www.credly.com/badges/example-cka"
      }
    ]
  },
  {
    Image: "/ovi_test_certif_2.png",
    title: "Certified Kubernetes Administrator (CKA)",
    description: "Demonstrates competency in Kubernetes administration, troubleshooting, and cluster operations",
    issued: "2023",
    links: [
      {
        link_name: "Certificate",
        url: "https://www.credly.com/badges/example-cka"
      }
    ]
  },
  {
    Image: "/ovi_test_certif_2.png",
    title: "Certified Kubernetes Administrator (CKA)",
    description: "Demonstrates competency in Kubernetes administration, troubleshooting, and cluster operations",
    issued: "2023",
    links: [
      {
        link_name: "Certificate",
        url: "https://www.credly.com/badges/example-cka"
      }
    ]
  },
  {
    Image: "/ovi_test_certif_2.png",
    title: "Certified Kubernetes Administrator (CKA)",
    description: "Demonstrates competency in Kubernetes administration, troubleshooting, and cluster operations",
    issued: "2023",
    links: [
      {
        link_name: "Certificate",
        url: "https://www.credly.com/badges/example-cka"
      }
    ]
  }

]

interface Certification {
  Image: string
  title: string
  description: string
  issued: string
  links: {
    link_name: string
    url: string
  }[]
}

interface CertificationTileProps {
  certification: Certification
}

const CertificationTile = ({ certification }: CertificationTileProps) => {
  return (
    <motion.div
      className="group relative bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full max-w-[200px] mx-auto"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Card Header with Certificate Image as Full Background */}
      <div
        className="relative h-48 min-[650px]:h-40 md:h-38 bg-gray-50 group/image"
        style={{
          backgroundImage: certification.Image ? `url(${certification.Image})` : 'none',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Fallback for missing image */}
        {!certification.Image && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <Award className="w-16 h-16 text-primary" />
          </div>
        )}
      </div>

      {/* Card Content - Simplified */}
      <div className="p-4 min-[650px]:p-3 md:p-3">
        {/* Title */}
        <h3 className="text-lg min-[650px]:text-base md:text-base font-bold text-foreground mb-4 min-[650px]:mb-3 md:mb-3 line-clamp-2">
          {certification.title}
        </h3>

        {/* Links */}
        <div className="flex flex-wrap gap-2 min-[650px]:gap-1 md:gap-1">
          {certification.links.map((link, index) => (
            <Badge
              key={index}
              asChild
              variant="default"
              className="gap-1 min-[650px]:gap-0.5 md:gap-0.5 rounded-md cursor-pointer transition-all hover:scale-105"
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 min-[650px]:gap-0.5 md:gap-0.5 text-xs min-[650px]:text-[10px] md:text-[10px]"
                onMouseEnter={(e) => e.currentTarget.closest('.group')?.classList.add('links-hovered')}
                onMouseLeave={(e) => e.currentTarget.closest('.group')?.classList.remove('links-hovered')}
              >
                <ExternalLink className="w-3 h-3" />
                {link.link_name}
              </a>
            </Badge>
          ))}
        </div>
      </div>

      {/* Description tooltip on hover - only show when not hovering links */}
      <div className="absolute inset-0 bg-black/80 text-white p-6 flex items-center justify-center opacity-0 group-hover:opacity-100 group-[.links-hovered]:opacity-0 transition-opacity duration-300 rounded-lg pointer-events-none">
        <div className="text-center">
          <h4 className="font-semibold mb-2">{certification.title}</h4>
          <p className="text-sm text-gray-200">{certification.description}</p>
          {certification.issued && (
            <p className="text-xs text-gray-300 mt-2">Issued: {certification.issued}</p>
          )}
        </div>
      </div>

      {/* Hover effect border */}
      <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 rounded-lg transition-all duration-300 pointer-events-none" />
    </motion.div>
  )
}

export function CertificationsSection() {
  const [showAll, setShowAll] = useState(false)

  // Determine which certifications to display based on showAll state and screen size
  const certificationsToDisplay = useMemo(() => {
    return certificationsData
  }, [])

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  return (
    <section id="certifications" className="w-full py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-4 mb-4">
              <Award className="h-8 w-8 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Certifications
              </h1>
            </div>
            <p className="text-muted-foreground mt-2 max-w-3xl mx-auto text-base font-semibold md:text-lg italic">
              Industry-recognized credentials validating my expertise in cloud technologies and DevOps practices.
            </p>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 min-[425px]:grid-cols-2 min-[650px]:grid-cols-3 lg:grid-cols-4 gap-4">
            {certificationsToDisplay.map((certification, index) => {
              // For screens < 650px: show only first card normally, second card blurred, hide rest
              const isSecondCard = index === 1
              const isHiddenCard = index >= 2

              // Only apply show/hide logic for screens < 650px
              if (!showAll && isHiddenCard) {
                return (
                  <motion.div
                    key={certification.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full max-[649px]:hidden"
                  >
                    <CertificationTile certification={certification} />
                  </motion.div>
                )
              }

              return (
                <div key={certification.title} className="relative h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`h-full ${!showAll && isSecondCard ? 'max-[649px]:blur-[3px] max-[649px]:pointer-events-none' : ''}`}
                  >
                    <CertificationTile certification={certification} />
                  </motion.div>

                  {/* Show All Button overlay for second card on screens < 650px */}
                  {!showAll && isSecondCard && (
                    <div className="absolute inset-0 max-[649px]:flex items-center justify-center z-10 min-[650px]:hidden">
                      <button
                        onClick={toggleShowAll}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg text-sm"
                      >
                        Show All ({certificationsData.length - 1})
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Show Less button when showAll is true - only on screens < 650px */}
          {showAll && certificationsData.length > 2 && (
            <div className="max-[649px]:flex justify-center mt-8 min-[650px]:hidden">
              <button
                onClick={toggleShowAll}
                className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Show Less
              </button>
            </div>
          )}

          {/* Empty state */}
          {certificationsData.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                No certifications to display yet. Check back soon!
              </p>
            </motion.div>
          )}
        </div>

        {/* Additional note */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm text-muted-foreground">
            Continuously learning and expanding my skill set with new certifications and technologies.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default CertificationsSection