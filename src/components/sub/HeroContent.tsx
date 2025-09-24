'use client'

import { Badge } from '@/components/ui/badge'
import { slideInFromLeft, slideInFromRight, slideInFromTop } from '@/utils/motion'
import { motion } from 'framer-motion'
import { FaGithub } from 'react-icons/fa'
import { FC } from 'react'
import { TbDeviceLaptop } from 'react-icons/tb'
import { PointerHighlight } from '../ui/pointer-highlight'
import { NavbarButton } from '../ui/resizable-navbar'

const HeroContent: FC = () => {
  function smoothScrollTo(element: HTMLElement, duration = 1000) {
    const start = window.scrollY
    const end = element.getBoundingClientRect().top + start
    const distance = end - start
    const startTime = performance.now()

    function scroll(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)

      window.scrollTo(0, start + distance * ease)

      if (elapsed < duration) {
        requestAnimationFrame(scroll)
      }
    }

    requestAnimationFrame(scroll)
  }

  const handleConnectClick = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      smoothScrollTo(contactSection, 4200)
    }
  }

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center text-center gap-8 px-4 sm:px-8 lg:px-16 lg:pt-5 w-full min-h-[calc(100vh-80px)] bg-background"
    >
      <motion.div variants={slideInFromTop} className="flex items-center gap-2">
        <Badge variant="secondary" className="bg-red-500 text-white dark:bg-red-500 font-extrabold">
          <TbDeviceLaptop />
          The Developer
        </Badge>
      </motion.div>

      <motion.div
        variants={slideInFromLeft(0.5)}
        className="flex flex-col items-center justify-between gap-3 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
          Hasan Ashab
        </h1>
        <PointerHighlight rectangleClassName="rounded-none">
          <h2 className="text-primary p-3 text-3xl lg:text-6xl">DevOps & Cloud Engineer</h2>
        </PointerHighlight>
        <p className="text-base text-muted-foreground italic max-w-[500px] mx-auto">
          Building scalable cloud infrastructure and automating deployment pipelines with AWS, Kubernetes, Docker, and modern DevOps practices.
        </p>
      </motion.div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="mt-4 flex flex-row items-center justify-between gap-2"
      >
        <NavbarButton
          variant="primary"
          className="flex items-center gap-2 shadow"
          aria-label="Scroll Down"
          onClick={handleConnectClick}
        >
          <span className="w-2 h-2 bg-destructive rounded-full"></span>
          Let&apos;s Connect ↓
        </NavbarButton>
        <NavbarButton
          variant="dark"
          className="flex items-center gap-2 shadow outline"
          aria-label="github"
          href="https://github.com/HasanAshab"
        >
          <FaGithub className="mr-1" />
          <span>GitHub</span>
        </NavbarButton>
      </motion.div>
    </motion.section>
  )
}

export default HeroContent
