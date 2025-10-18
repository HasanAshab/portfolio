'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { FaLinkedin, FaTwitter } from 'react-icons/fa'
import { RxGithubLogo } from 'react-icons/rx'
import { TrackableElement, TrackableContact } from '@/components/analytics/TrackableElement'

const Footer: FC = () => {
  const socialLinks = [
    {
      href: 'https://github.com/HasanAshab',
      icon: <RxGithubLogo className="w-5 h-5" />,
      label: 'GitHub',
    },
    {
      href: 'https://www.linkedin.com/in/hasan-ashab/',
      icon: <FaLinkedin className="w-5 h-5" />,
      label: 'LinkedIn',
    },
  ]

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blogs', href: '#blogs' },
  ]

  const servicesLinks = [
    { name: 'DevOps Engineer', href: '/devops-engineer' },
    { name: 'Cloud Engineer', href: '/cloud-engineer' },
    { name: 'DevOps Best Practices', href: '/blog/devops-best-practices' },
  ]

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  }

  const childVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <footer className="relative w-full px-6 py-12 mt-20 bg-background text-foreground border-t border-border transition-colors">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500" />
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="space-y-4" variants={childVariants}>
            <h1 title="Hasan Ashab" className="text-2xl font-extrabold bg-clip-text">Hasan Ashab</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              DevOps & Cloud Engineer specializing in AWS, Kubernetes, Docker, and CI/CD automation. 
              Building scalable infrastructure aligned with company requirements.
            </p>
          </motion.div>

          <motion.div className="space-y-4" variants={childVariants}>
            <h2 title="Quick Links" className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Quick Links
            </h2>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <TrackableElement elementId={`footer-nav-${item.name.toLowerCase()}`} elementText={`Footer: ${item.name}`}>
                    <a
                      href={item.href}
                      className="hover:text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                      aria-label={`Navigate to ${item.name} section`}
                    >
                      {item.name}
                    </a>
                  </TrackableElement>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="space-y-4" variants={childVariants}>
            <h2 title="Services" className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Services
            </h2>
            <ul className="space-y-2 text-sm">
              {servicesLinks.map((item) => (
                <li key={item.name}>
                  <TrackableElement elementId={`footer-service-${item.name.toLowerCase().replace(/\s+/g, '-')}`} elementText={`Service: ${item.name}`}>
                    <a
                      href={item.href}
                      className="hover:text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                      aria-label={`Learn about ${item.name}`}
                    >
                      {item.name}
                    </a>
                  </TrackableElement>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="space-y-4" variants={childVariants}>
            <h2 title="Connect" className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Connect
            </h2>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <TrackableContact key={link.label} method={`footer-${link.label.toLowerCase()}`}>
                  <motion.a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-muted rounded-full hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    aria-label={`Visit my ${link.label} profile`}
                  >
                    {link.icon}
                  </motion.a>
                </TrackableContact>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-xs text-muted-foreground">
                Keywords: DevOps Portfolio, Cloud Engineer, AWS, Kubernetes, Docker, CI/CD
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
