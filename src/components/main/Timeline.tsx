'use client'

import { motion } from 'framer-motion'
import { FC, JSX } from 'react'
import Image from 'next/image'
import { Timeline as TimelineComponent } from '@/components/ui/timeline'
import { FaBriefcase, FaBuilding, FaCode, FaLaptopCode } from 'react-icons/fa'

export interface TimelineItem {
  id: number
  type: 'work' | 'project'
  title: string
  company: string
  location: string
  date: string
  imageURL: string
  description: string
  achievements: string[]
  icon: JSX.Element
  companyIcon: JSX.Element
}

export const timelineData: TimelineItem[] = [
  {
    id: 1,
    type: 'project',
    title: 'Backend Developer (Contract)',
    company: 'Yum Foods',
    location: 'Remote',
    imageURL: '/yumfoods.png',
    date: 'Nov 2023 - Aug 2024',
    description: 'Food delivery platform for a locally reputed restaurant.',
    achievements: [
      'Launched the restaurant platform on a shared cloud environment.',
      'Reducing initial infrastructure costs by 40%',
      'Transitioning to AWS infrastructure to handle 3x user traffic',
      'Architected and maintained the application on AWS (EC2, RDS, ElastiCache), managing server configuration and a PostgreSQL database.',
      'Automated and streamlined deployments by Implementing a CI/CD pipeline (GitHub Actions).',
      'Reduced and controlled infrastructure costs by applying FinOps best practices',
      'Budgeted monthly expenses to $50 without compromising performance.',
    ],
    icon: <FaCode className="w-6 h-6 text-primary" />,
    companyIcon: <FaLaptopCode className="w-8 h-8 text-blue-500" />,
  },
]

export const TimelineElement: FC<{ item: TimelineItem; index: number }> = ({ item, index }) => (
  <div className="space-y-6" key={index}>
    <div className="flex items-center gap-4">
      {item.type === 'work' && (
        <Image
          src={item.imageURL}
          alt={`${item.company} Logo`}
          width={48}
          height={48}
          className="rounded-md shadow bg-muted p-1"
        />
      )}
      <div>
        <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
        <p className="text-sm text-muted-foreground">
          {item.company} • {item.location}
        </p>
        <p className="text-sm text-muted-foreground">{item.date}</p>
      </div>
    </div>

    <p className="text-sm text-muted-foreground">{item.description}</p>

    <ul className="list-disc pl-5 space-y-1 text-sm text-foreground">
      {item.achievements.map((ach) => (
        <li key={ach}>{ach}</li>
      ))}
    </ul>

    {item.type === 'project' && (
      <div className="w-full mt-4">
        <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-md bg-background">
          <Image
            src={item.imageURL}
            alt={`${item.title} Architecture`}
            className="object-contain"
            loading="lazy"
            fill
          />
        </div>
      </div>
    )}
  </div>
)

const Timeline: FC = () => {
  const timelineContent = timelineData.map((item) => ({
    title: item.date,
    content: <TimelineElement key={item.id} item={item} index={item.id} />,
  }))

  return (
    <section id="experience" className="py-20 bg-background text-foreground transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold tracking-tight text-primary">
            Professional Experience & Projects
          </h1>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-base">
            Highlights of my career and key projects showcasing my skills & impact.
          </p>
        </motion.div>

        <div className="relative w-full">
          <TimelineComponent data={timelineContent} />
        </div>
      </div>
    </section>
  )
}

export default Timeline
