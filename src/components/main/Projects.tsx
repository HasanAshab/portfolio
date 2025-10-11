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
import { useState, useMemo } from 'react'

const projectsData = [
  {
    title: 'Serverless Todo App',
    description: 'A full-stack serverless todo app built on AWS, showcasing a comprehensive DevOps implementation with Terraform, GitHub Actions CI/CD, and a modern serverless architecture.',
    imageURL: '/serverless-todo.jpg',
    github: 'https://github.com/HasanAshab/serverless-todo-app',
    blog: 'https://dev.to/hasan_ashab/a-serverless-todo-app-on-aws-with-terraform-and-github-actions-mo9',
    tags: ['AWS', 'Serverless', 'Terraform', 'Github Actions', 'DevSecOps', 'GitOps'],
  },
  {
    title: 'E-commerce Store DevOps',
    description: 'A microservices-based e-commerce platform using EKS + Terraform & GitOps With ArgoCD & GitHub Actions.',
    imageURL: '/retail-store.png',
    github: 'https://github.com/HasanAshab/retail-store-devops',
    blog: 'https://dev.to/hasan_ashab/productionizing-awss-retail-sample-app-with-gitops-on-eks-22f2',
    tags: ['AWS', 'Github Actions', 'Kubernetes', 'ArgoCD', 'Terraform', 'GitOps', 'DevSecOps', 'Docker'],
  },
  {
    title: 'Retail Store App - Terraform Fix Contribution',
    description: 'Contributed to TrainWithShubham open-source Retail Store Sample App by fixing the Terraform deployment issue',
    imageURL: '/retail-store-contribution-n.png',
    live: 'http://k8s-ingressn-ingressn-458fe101d6-c35438a11e41fed0.elb.us-west-2.amazonaws.com/',
    github: 'https://github.com/LondheShubham153/retail-store-sample-app/pull/11',
    tags: ['Terraform', 'DevOps', 'Open Source Contribution'],
  },
  {
    title: 'Three-Tier DevOps (AWS)',
    description: 'A three-tier application using AWS ECS Fargate, CI/CD and CloudFront. Custom domain + SSL configured (Route53, ACM)',
    imageURL: '/three-tier-aws.png',
    github: 'https://github.com/HasanAshab/three-tier-devops-aws',
    blog: 'https://dev.to/hasan_ashab/cost-optimized-three-tier-architecture-on-aws-with-devops-15h2',
    tags: ['AWS', 'Github Actions', 'Terraform', 'GitOps', 'DevSecOps', 'Docker'],
  },
  {
    title: '2048 Game in the Cloud',
    description: 'Transformed the classic 2048 game into a cloud-native application using AWS EKS, Docker, Terraform, GitHub Actions CI/CD, and ArgoCD to practice end-to-end DevOps workflows.',
    imageURL: '/2048-game.png',
    github: 'https://github.com/HasanAshab/2048-game-devops',
    blog: 'https://dev.to/hasan_ashab/2048-in-the-cloud-devops-with-aws-argocd-1gpe',
    tags: ['AWS', 'EKS', 'ArgoCD', 'Terraform', 'Github Actions', 'Docker', 'GitOps'],
  },
  {
    title: 'Website Uptime Monitor',
    description: 'An AWS-based monitoring system that checks website uptime, response time, and content validity every 5 minutes. Alerts via SNS and stores history in DynamoDB. Built entirely with Terraform.',
    imageURL: '/web-uptime-monitor.png',
    github: 'https://github.com/HasanAshab/website-uptime-monitor',
    blog: 'https://dev.to/hasan_ashab/never-miss-a-downtime-aws-website-uptime-monitor-with-terraform-5f2o',
    tags: ['AWS', 'Lambda', 'DynamoDB', 'SNS', 'S3', 'Terraform', 'Monitoring', 'Serverless'],
  },
  {
    title: 'EC2 Automated Backup System',
    description: 'A fully automated EC2 backup system using Lambda and EventBridge. Includes snapshot creation, retention policy, and S3 logs — all managed with Terraform.',
    imageURL: '/ec2-backup-system.png',
    github: 'https://github.com/HasanAshab/aws-ec2-backup-lambda',
    blog: 'https://dev.to/hasan_ashab/automate-ec2-backups-on-aws-with-lambda-eventbridge-and-terraform-k4n',
    tags: ['AWS', 'Terraform', 'Lambda', 'EventBridge', 'DevOps', 'Serverless'],
  },
  {
    title: 'EC2 Automated Backup System (V2)',
    description: 'Automated EC2 backup using AWS Backup',
    imageURL: '/ec2-backup-system-v2.png',
    github: 'https://github.com/HasanAshab/aws-backup-ec2-terraform',
    blog: 'https://dev.to/hasan_ashab/why-you-should-use-aws-backup-instead-of-custom-lambda-solutions-3n02',
    tags: ['AWS', 'Terraform', 'DevOps', 'Serverless', 'AWS Backup'],
  },
  {
    title: 'Hackathon Project - Chattingo',
    description: 'Full CI/CD pipeline with Jenkins, Docker and Nginx following GitOps, DevSecOps principles for a real-time chat app. Scored 34 out of 40.',
    imageURL: '/chattingo.png',
    github: 'https://github.com/HasanAshab/chattingo',
    video: 'https://youtu.be/DD1U_LmmRw8',
    blog: 'https://dev.to/hasan_ashab/my-3-day-hackathon-journey-building-a-cicd-pipeline-from-scratch-4ifp',
    tags: ['VPS', 'Jenkins', 'GitOps', 'DevSecOps', 'Ansible', 'Docker', '🏆Contests'],
  },
  {
    title: 'Three-Tier DevOps (Azure)',
    description: 'A three-tier application using Azure App Service and CI/CD. (includes HA, DR)',
    imageURL: '/three-tier-azure.png',
    github: 'https://github.com/HasanAshab/three-tier-devops-azure',
    tags: ['Azure', 'Github Actions', 'Terraform', 'GitOps', 'DevSecOps', 'Docker'],
  },
  {
    title: 'Docker Showcase',
    description: 'A collection of Docker and Docker Compose examples. Includes multi-service stacks (e.g. MERN, MEAN, LAMP).',
    imageURL: '/docker-showcase.png',
    github: 'https://github.com/HasanAshab/docker-showcase',
    tags: ['Docker']
  },
  {
    title: 'Bechakena Admin Panel QA',
    description: 'Performed complete functional testing of an e-commerce admin dashboard. Covered authentication, product management, and order modules. Delivered structured bug reports and documented findings with evidence.',
    imageURL: '/bechakena-admin-qa.png',
    github: 'https://github.com/HasanAshab/bechakena-admin-qa',
    live: 'https://devcore.bechakeena.com/',
    tags: ['QA', 'Manual Testing', 'Bug Reporting'],
  },
  {
    title: 'Qtec Corporate Website QA',
    description: 'Conducted end-to-end QA analysis on Qtec staging website. Identified navigation, content, and UI/UX issues across devices and browsers, focusing on usability, responsiveness, and accessibility.',
    imageURL: '/qtec-website-qa.png',
    github: 'https://github.com/HasanAshab/qtec-website-qa',
    live: 'https://staging.qtecsolution.com/',
    tags: ['QA', 'Manual Testing', 'Bug Reporting'],
  },
  {
    title: 'SamerArtisan CLI',
    description: 'A Laravel Artisan-inspired CLI framework for Node.js. Built as a personal tribute to Laravels elegance, it provides structured commands, interactive prompts, and scalable CLI architecture.',
    imageURL: '/samer-artisan.jpg',
    github: 'https://github.com/HasanAshab/samer-artisan',
    blog: 'https://dev.to/hasan_ashab/creating-a-cli-tool-with-nodejs-5b1k',
    tags: ['Node.js', 'CLI', 'TypeScript', 'npm'],
  },
  {
    title: 'Ranker API (AI)',
    description: 'A gamified Django API for self-improvement. Create challenges, earn XP, unlock titles. leaderboard. Notifications keep users engaged. (UI NOT READY YET)',
    imageURL: '/ranker-api.webp',
    github: 'https://github.com/HasanAshab/ranker-api',
    tags: ['Django'],
  },
]

// Extract all unique tags from projects
const allTags = Array.from(
  new Set(projectsData.flatMap(project => project.tags))
).sort();

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
  <svg fill="#000000" height="15px" width="15px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.8,18H15c-0.6,0-1-0.4-1-1v-2.8c0-0.3,0.1-0.5,0.3-0.7L24.9,2.9c0.2-0.2,0.4-0.3,0.7-0.3l0,0c0.3,0,0.5,0.1,0.7,0.3 l2.8,2.8c0.4,0.4,0.4,1,0,1.4L18.5,17.7C18.3,17.9,18.1,18,17.8,18z"></path> </g> <path d="M19.9,19.1c-0.6,0.6-1.3,0.9-2.1,0.9H15c-1.7,0-3-1.3-3-3v-2.8c0-0.8,0.3-1.6,0.9-2.1L18.9,6H9<C7.3,6,6,7.3,6,9v14 c0,1.7,1.3,3,3,3h14c1.7,0,3-1.3,3-3v-9.9L19.9,19.1z"></path> </g></svg>
)

const Projects = () => {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [showAll, setShowAll] = useState(false)

  // Filter projects based on selected tags
  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return projectsData

    return projectsData.filter(project =>
      selectedTags.every(tag => project.tags.includes(tag))
    )
  }, [selectedTags])

  // Determine which projects to display based on showAll state
  const projectsToDisplay = useMemo(() => {
    if (showAll) return filteredProjects
    return filteredProjects.slice(0, 5) // Show only first 5 projects when showAll is false
  }, [filteredProjects, showAll])

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSelectedTags([])
  }

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  let lastColSpan2Index = 0
  const isColSpan2 = (index: number) => {
    if (index === lastColSpan2Index + 3) {
      lastColSpan2Index = index
      return true
    }
    return false
  }

  const totalProjects = projectsData.length // only added: data to show

  return (
    <section id="projects" className="relative py-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Floating Geometric Shapes */}
        <div className="absolute top-32 left-16 w-28 h-28 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-80 right-24 w-20 h-20 bg-blue-500/20 rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute bottom-60 left-1/3 w-16 h-16 bg-primary/15 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 right-1/4 w-24 h-24 bg-blue-400/10 rounded-lg rotate-12 float-animation"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        {/* Gradient Orbs */}
        <div className="absolute top-1/4 right-1/2 translate-x-1/2 w-96 h-96 bg-gradient-to-r from-primary/20 via-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-l from-blue-400/15 via-primary/10 to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 title="My Projects" className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-blue-500 bg-clip-text text-transparent mb-4">
            My Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-3">
            A collection of innovative projects showcasing technical expertise & creativity.
          </p>
          <p className="text-sm text-muted-foreground font-medium">
            Total projects: {totalProjects}
          </p>
        </motion.div>

        {/* Tag Filter Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col items-center">
            <div className="relative bg-card/60 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Tags className="h-5 w-5 text-primary" />
                <h3 title="Filter by tags" className="text-lg font-medium">Filter by tags</h3>
                {selectedTags.length > 0 && (
                  <button
                    title="Clear all filters"
                    onClick={clearFilters}
                    className="text-sm text-muted-foreground hover:text-primary ml-2 underline transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    title={`Filter by ${tag} (Project)`}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer px-3 py-1 rounded-full transition-all hover:scale-105 hover:shadow-md"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <BentoGrid className="max-w-6xl mx-auto [@media(max-width:425px)]:grid-cols-1">
        {projectsToDisplay.map((project, i) => {
          const isFifthProject = !showAll && i === 4
          const isHiddenProject = !showAll && i >= 5

          if (isHiddenProject) return null

          return (
            <div key={project.title} className={`relative ${isColSpan2(i) ? 'md:col-span-2' : ''}`}>
              <BentoGridItem
                title={project.title}
                description={
                  <div className="space-y-1 text-sm text-foreground">
                    <p>{project.description}</p>
                    <div className="flex flex-wrap gap-3 ">
                      <Badge asChild variant="secondary" className="gap-1 rounded-full">
                        <a
                          title={`View ${project.title} on GitHub`}
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
                          title={`View ${project.title} live demo`}
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
                          title={`Watch ${project.title} video demo`}
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
                          title={`Read ${project.title} blog post`}
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
                  <div className="relative w-full h-full [@media(max-width:425px)]:min-h-[9rem] min-h-[6rem] rounded-xl overflow-hidden">
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
                className={isFifthProject ? 'blur-[3px] pointer-events-none' : ''}
              />

              {/* Show All Button overlay for 5th project */}
              {isFifthProject && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <button
                    title={`Show All Projects (${filteredProjects.length - 4})`}
                    onClick={toggleShowAll}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors shadow-lg"
                  >
                    Show All ({filteredProjects.length}) Projects
                  </button>
                </div>
              )}
            </div>
          )
        })}

        {/* Show message when no projects match the filter */}
        {filteredProjects.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground text-lg">
              No projects match the selected tags. Try selecting different tags.
            </p>
          </div>
        )}

        {/* Show Less button when showAll is true */}
        {showAll && filteredProjects.length > 5 && (
          <div className="col-span-full text-center mt-8">
            <button
              title="Show Less Projects"
              onClick={toggleShowAll}
              className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Show Less
            </button>
          </div>
        )}
      </BentoGrid>
    </section>
  )
}

export default Projects
