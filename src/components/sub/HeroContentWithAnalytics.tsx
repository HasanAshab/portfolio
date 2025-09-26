'use client'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaRocket } from 'react-icons/fa'
import { FC, useState, useEffect } from 'react'
import { HiSparkles } from 'react-icons/hi'
import { NavbarButton } from '../ui/resizable-navbar'
import { TrackableElement, TrackableContact } from '@/components/analytics/TrackableElement'
import { useAnalyticsContext } from '@/components/analytics/AnalyticsProvider'

const HeroContentWithAnalytics: FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { trackClick } = useAnalyticsContext()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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

  const handleConnectClick = (e: React.MouseEvent<HTMLElement>) => {
    // Track the click
    trackClick(e, 'hero-connect-button', 'Let\'s Connect')
    
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      smoothScrollTo(contactSection, 1500)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative z-10 flex flex-col items-center justify-center text-center gap-8 px-4 sm:px-8 lg:px-16 w-full max-w-6xl mx-auto pt-20 sm:pt-24 lg:pt-28"
    >
      {/* Interactive Cursor Follower */}
      <div
        className="fixed pointer-events-none z-0 w-6 h-6 bg-primary/20 rounded-full blur-sm transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
      />

      {/* Main Content Area */}
      <motion.div variants={itemVariants} className="space-y-6">
        {/* Name with Gradient Effect */}
        <div className="relative">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-foreground via-primary to-blue-500 bg-clip-text text-transparent">
              Hasan Ashab
            </span>
          </h1>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/20 rounded-full animate-bounce"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-500/30 rounded-full animate-pulse"></div>
        </div>

        {/* Role with Modern Design */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-blue-500/10 to-primary/10 rounded-2xl blur-xl"></div>
          <div className="relative bg-card/40 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-blue-500 to-primary bg-clip-text text-transparent mb-3">
              DevOps & Cloud Engineer
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-blue-500 rounded-full mx-auto"></div>
          </div>
        </div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Building scalable infrastructure aligned with company requirements.
        </motion.p>
      </motion.div>

      {/* Action Buttons with Analytics */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row items-center gap-4 mt-8 mb-16"
      >
        <NavbarButton
          variant="primary"
          className="group relative overflow-hidden bg-gradient-to-r from-primary to-blue-500 hover:from-blue-500 hover:to-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          onClick={handleConnectClick}
        >
          <div className="flex items-center gap-3">
            <FaRocket className="w-5 h-5 group-hover:animate-bounce" />
            Let's Connect
            <div className="w-2 h-2 bg-white/80 rounded-full animate-pulse"></div>
          </div>
          <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </NavbarButton>

        <div className="flex items-center gap-3">
          <TrackableContact method="github">
            <NavbarButton
              variant="secondary"
              className="group bg-card/60 backdrop-blur-sm border-primary/30 hover:border-primary/60 hover:bg-primary/10 px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              href="https://github.com/HasanAshab"
            >
              <FaGithub className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            </NavbarButton>
          </TrackableContact>

          <TrackableContact method="linkedin">
            <NavbarButton
              variant="secondary"
              className="group bg-card/60 backdrop-blur-sm border-blue-500/30 hover:border-blue-500/60 hover:bg-blue-500/10 px-6 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              href="https://www.linkedin.com/in/hasan-ashab/"
            >
              <FaLinkedin className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            </NavbarButton>
          </TrackableContact>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        variants={itemVariants}
        className="mt-2"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-sm font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default HeroContentWithAnalytics