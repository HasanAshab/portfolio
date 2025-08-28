'use client'

import {
  IconArrowWaveRightUp,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from '@tabler/icons-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'
import { Badge } from '../ui/badge'
import { BentoGrid, BentoGridItem } from '../ui/bento-grid'

const projectsData = [
  // {
  //   title: 'ShopXIndia',
  //   description:
  //     'A microservices-based e-commerce platform using AWS ECS Fargate, CI/CD, and full observability on AWS.',
  //   imageURL: '/shopxindia.png',
  //   github: 'https://github.com/HasanAshab/ShopxIndia',
  //   live: 'https://github.com/HasanAshab/ShopxIndia',
  //   icon: <IconClipboardCopy className="h-4 w-4 text-muted-foreground" />,
  // },
  {
    title: 'Retail Store DevOps (AWS)',
    description: 'A microservices-based e-commerce platform using EKS + Terraform & GitOps With ArgoCD & GitHub Actions.',
    imageURL: '/retail-store.png',
    github: 'https://github.com/HasanAshab/retail-store-devops',
  },
  {
    title: 'Three-Tier DevOps (AWS)',
    description: 'A three-tier application using AWS ECS Fargate, CI/CD and CloudFront.',
    imageURL: '/three-tier-aws.png',
    github: 'https://github.com/HasanAshab/three-tier-devops-aws',
  },
  {
    title: 'Three-Tier DevOps (Azure)',
    description: 'A three-tier application using Azure App Service and CI/CD. (includes HA, DR)',
    imageURL: '/three-tier-azure.png',
    github: 'https://github.com/HasanAshab/three-tier-devops-azure',
  },
  {
    title: 'Ranker API (AI)',
    description: 'A gamified Django API for self-improvement. Create challenges, earn XP, unlock titles. leaderboard. Notifications keep users engaged. (UI NOT READY YET)',
    imageURL: '/ranker-api.webp',
    github: 'https://github.com/HasanAshab/ranker-api',
  }
]

const LiveIndicator = () => (
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
  </span>
)

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text ">My Projects</h1>
          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto text-base font-semibold md:text-lg italic">
            A collection of innovative projects showcasing technical expertise & creativity.
          </p>
        </motion.div>
      </div>

      <BentoGrid className="max-w-5xl mx-auto">
        {projectsData.map((project, i) => (
          <BentoGridItem
            key={project.title}
            title={project.title}
            description={
              <div className="space-y-1 text-sm text-foreground">
                <p>{project.description}</p>
                <div className="flex gap-3">
                  <Badge asChild variant="secondary" className="gap-1 rounded-full">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <FaGithub className="size-3" />
                      GitHub
                    </a>
                  </Badge>

                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-0.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <LiveIndicator />
                      Live
                    </a>
                  )}
                </div>
              </div>
            }
            header={
              <div className="relative w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
                <Image
                  src={project.imageURL}
                  alt={project.title}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={80}
                  fill
                />
              </div>
            }
            // icon={project.icon}
            className={i === 3 || i === 6 ? 'md:col-span-2' : ''}
          />
        ))}
      </BentoGrid>
    </section>
  )
}

export default Projects
