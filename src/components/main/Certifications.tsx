'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { ExternalLink, Award, Calendar } from 'lucide-react'

// Sample certifications data - replace with your actual data
const certificationsData = [
  {
    Image: "/aws-solutions-architect.png",
    width: "100",
    height: "100",
    title: "AWS Solutions Architect Associate",
    description: "Validates ability to design and deploy scalable systems on AWS",
    issued: "2023",
    links: [
      {
        link_name: "View Certificate",
        url: "https://www.credly.com/badges/example-aws"
      },
      {
        link_name: "Verify",
        url: "https://aws.amazon.com/verification"
      }
    ]
  },
  {
    Image: "/kubernetes-cka.png",
    width: "100",
    height: "100",
    title: "Certified Kubernetes Administrator (CKA)",
    description: "Demonstrates competency in Kubernetes administration, troubleshooting, and cluster operations",
    issued: "2023",
    links: [
      {
        link_name: "View Certificate",
        url: "https://www.credly.com/badges/example-cka"
      }
    ]
  },
  {
    Image: "/terraform-associate.png",
    width: "100",
    height: "100",
    title: "HashiCorp Terraform Associate",
    description: "Validates understanding of Terraform core concepts and workflows",
    issued: "2023",
    links: [
      {
        link_name: "View Certificate",
        url: "https://www.credly.com/badges/example-terraform"
      }
    ]
  },
  {
    Image: "/docker-certified.png",
    width: "100",
    height: "100",
    title: "Docker Certified Associate",
    description: "Demonstrates proficiency in Docker containerization and orchestration",
    issued: "2022",
    links: [
      {
        link_name: "View Certificate",
        url: "https://www.credly.com/badges/example-docker"
      }
    ]
  },
  {
    Image: "/azure-fundamentals.png",
    width: "100",
    height: "100",
    title: "Microsoft Azure Fundamentals",
    description: "Validates foundational knowledge of cloud services and Azure core concepts",
    issued: "2022",
    links: [
      {
        link_name: "View Certificate",
        url: "https://www.credly.com/badges/example-azure"
      }
    ]
  },
  {
    Image: "/jenkins-certified.png",
    width: "100",
    height: "100",
    title: "Jenkins Certified Engineer",
    description: "Demonstrates expertise in CI/CD pipeline development and Jenkins administration",
    issued: "2022",
    links: [
      {
        link_name: "View Certificate",
        url: "https://www.credly.com/badges/example-jenkins"
      }
    ]
  }
]

interface Certification {
  Image: string
  width: string
  height: string
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
      className="group relative bg-card border border-border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 h-full"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Card Header with Image */}
      <div className="relative h-32 bg-gradient-to-br from-primary/20 to-primary/5">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-16 h-16 rounded-lg bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
            {certification.Image ? (
              <Image
                src={certification.Image}
                alt={certification.title}
                width={parseInt(certification.width) || 48}
                height={parseInt(certification.height) || 48}
                className="object-contain"
              />
            ) : (
              <Award className="w-8 h-8 text-primary" />
            )}
          </div>
        </div>
        
        {/* Issued Date Badge */}
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="flex items-center gap-1 text-xs">
            <Calendar className="w-3 h-3" />
            {certification.issued}
          </Badge>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">
          {certification.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {certification.description}
        </p>

        {/* Links */}
        <div className="flex flex-wrap gap-2">
          {certification.links.map((link, index) => (
            <Badge
              key={index}
              asChild
              variant="default"
              className="gap-1 rounded-md cursor-pointer transition-all hover:scale-105"
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs"
              >
                <ExternalLink className="w-3 h-3" />
                {link.link_name}
              </a>
            </Badge>
          ))}
        </div>
      </div>

      {/* Hover effect border */}
      <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 rounded-lg transition-all duration-300 pointer-events-none" />
    </motion.div>
  )
}

export function CertificationsSection() {
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
              <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
                {certificationsData.length} Certifications
              </Badge>
            </div>
            <p className="text-muted-foreground mt-2 max-w-3xl mx-auto text-base font-semibold md:text-lg italic">
              Industry-recognized credentials validating my expertise in cloud technologies and DevOps practices.
            </p>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificationsData.map((certification, index) => (
              <motion.div
                key={certification.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <CertificationTile certification={certification} />
              </motion.div>
            ))}
          </div>

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