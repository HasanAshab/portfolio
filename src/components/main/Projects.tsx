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
import { Tags } from 'lucide-react'

const projectsData = [
  {
    title: 'Three-Tier DevOps (AWS)',
    description: 'A three-tier application using AWS ECS Fargate, CI/CD and CloudFront. Custom domain + SSL configured (Route53, ACM)',
    imageURL: '/three-tier-aws.png',
    github: 'https://github.com/HasanAshab/three-tier-devops-aws',
    blog: 'https://dev.to/hasan_ashab/cost-optimized-three-tier-architecture-on-aws-with-devops-15h2',
    tags: ['AWS', 'Github Actions'],
  },
  {
    title: 'Retail Store DevOps (AWS)',
    description: 'A microservices-based e-commerce platform using EKS + Terraform & GitOps With ArgoCD & GitHub Actions.',
    imageURL: '/retail-store.png',
    github: 'https://github.com/HasanAshab/retail-store-devops',
    blog: 'https://dev.to/hasan_ashab/productionizing-awss-retail-sample-app-with-gitops-on-eks-22f2',
    tags: ['AWS', 'Github Actions', 'Kubernetes', 'ArgoCD'],
  },
  {
    title: 'Three-Tier DevOps (Azure)',
    description: 'A three-tier application using Azure App Service and CI/CD. (includes HA, DR)',
    imageURL: '/three-tier-azure.png',
    github: 'https://github.com/HasanAshab/three-tier-devops-azure',
    tags: ['Azure', 'Github Actions'],
  },
  {
    title: 'Hackathon Project - Chattingo',
    description: 'Full CI/CD pipeline with Jenkins, Docker and Nginx following GitOps, DevSecOps principles for a real-time chat app. Scored 34 out of 40.',
    imageURL: '/chattingo.png',
    github: 'https://github.com/HasanAshab/chattingo',
    video: 'https://youtu.be/DD1U_LmmRw8',
    blog: 'https://dev.to/hasan_ashab/my-3-day-hackathon-journey-building-a-cicd-pipeline-from-scratch-4ifp',
    tags: ['VPS', 'Jenkins', 'GitOps'],
  },
  {
    title: 'Docker Showcase',
    description: 'A collection of Docker and Docker Compose examples. Includes multi-service stacks (e.g. MERN, MEAN, LAMP).',
    imageURL: '/docker-showcase.png',
    github: 'https://github.com/HasanAshab/docker-showcase',
    tags: []
  },
  {
    title: 'Ranker API (AI)',
    description: 'A gamified Django API for self-improvement. Create challenges, earn XP, unlock titles. leaderboard. Notifications keep users engaged. (UI NOT READY YET)',
    imageURL: '/ranker-api.webp',
    github: 'https://github.com/HasanAshab/ranker-api',
    tags: ['Django'],
  }
]

const LiveIndicator = () => (
  <span className="relative flex h-2 w-2">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
  </span>
)

const VideoIndicator = () => (
<svg fill="#000000" width="15px" height="15px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>youtube</title> <path d="M12.932 20.459v-8.917l7.839 4.459zM30.368 8.735c-0.354-1.301-1.354-2.307-2.625-2.663l-0.027-0.006c-3.193-0.406-6.886-0.638-10.634-0.638-0.381 0-0.761 0.002-1.14 0.007l0.058-0.001c-0.322-0.004-0.701-0.007-1.082-0.007-3.748 0-7.443 0.232-11.070 0.681l0.434-0.044c-1.297 0.363-2.297 1.368-2.644 2.643l-0.006 0.026c-0.4 2.109-0.628 4.536-0.628 7.016 0 0.088 0 0.176 0.001 0.263l-0-0.014c-0 0.074-0.001 0.162-0.001 0.25 0 2.48 0.229 4.906 0.666 7.259l-0.038-0.244c0.354 1.301 1.354 2.307 2.625 2.663l0.027 0.006c3.193 0.406 6.886 0.638 10.634 0.638 0.38 0 0.76-0.002 1.14-0.007l-0.058 0.001c0.322 0.004 0.702 0.007 1.082 0.007 3.749 0 7.443-0.232 11.070-0.681l-0.434 0.044c1.298-0.362 2.298-1.368 2.646-2.643l0.006-0.026c0.399-2.109 0.627-4.536 0.627-7.015 0-0.088-0-0.176-0.001-0.263l0 0.013c0-0.074 0.001-0.162 0.001-0.25 0-2.48-0.229-4.906-0.666-7.259l0.038 0.244z"></path> </g></svg>
)
const BlogIndicator = () => (
  <svg fill="#000000" height="15px" width="15px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.8,18H15c-0.6,0-1-0.4-1-1v-2.8c0-0.3,0.1-0.5,0.3-0.7L24.9,2.9c0.2-0.2,0.4-0.3,0.7-0.3l0,0c0.3,0,0.5,0.1,0.7,0.3 l2.8,2.8c0.4,0.4,0.4,1,0,1.4L18.5,17.7C18.3,17.9,18.1,18,17.8,18z"></path> </g> <path d="M19.9,19.1c-0.6,0.6-1.3,0.9-2.1,0.9H15c-1.7,0-3-1.3-3-3v-2.8c0-0.8,0.3-1.6,0.9-2.1L18.9,6H9C7.3,6,6,7.3,6,9v14 c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3v-9.9L19.9,19.1z"></path> </g></svg>
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

      <BentoGrid className="max-w-6xl mx-auto">
        {projectsData.map((project, i) => (
          <BentoGridItem
            key={project.title}
            title={project.title}
            description={
              <div className="space-y-1 text-sm text-foreground">
                <p>{project.description}</p>
                <div className="flex gap-3 ">
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

                  {"live" in project && (
                    <a
                      href={project.live as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-0.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <LiveIndicator />
                      Live
                    </a>
                  )}
                  {"video" in project && (
                    <a
                      href={project.video as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-0.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50" >
                      <VideoIndicator />
                        Video
                      </a>
                  )}
                  {"blog" in project && (
                                        <a
                      href={project.blog as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-0.5 text-xs font-medium text-foreground shadow-sm transition-colors hover:bg-muted hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50" >
                      <BlogIndicator />
                        Blog
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
