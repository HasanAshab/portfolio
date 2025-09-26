'use client'

import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  NavItems,
  NavbarLogo,
  Navbar as NavbarWrapper,
} from '@/components/ui/resizable-navbar'
import { ThemeToggle } from '@/hooks/use-toogle'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaBlog, FaBriefcase, FaCode, FaEnvelope, FaProjectDiagram, FaUser } from 'react-icons/fa'
import { Button } from '../ui/button'
import { TrackableElement, TrackableContact } from '@/components/analytics/TrackableElement'
import { useAnalyticsContext } from '@/components/analytics/AnalyticsProvider'

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { trackClick } = useAnalyticsContext()

  const navItems = [
    { name: 'About', link: '#about', icon: <FaUser /> },
    { name: 'Skills', link: '#skills', icon: <FaCode /> },
    { name: 'Experience', link: '#experience', icon: <FaBriefcase /> },
    { name: 'Projects', link: '#projects', icon: <FaProjectDiagram /> },
    { name: 'Blogs', link: '#blogs', icon: <FaBlog /> },
  ]

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-300`}>
      <NavbarWrapper className="flex flex-col items-center justify-between gap-4 px-4 py-2">
        <NavBody>
          <NavbarLogo isScrolled={isScrolled} />

          <NavItems items={navItems} isScrolled={isScrolled} />

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <TrackableContact method="navbar-contact">
              <Button
                title="Contact me"
                variant="default"
                className="rounded-full z-50"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <FaEnvelope />
              </Button>
            </TrackableContact>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo isScrolled={isScrolled} />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item) => (
              <TrackableElement 
                key={`mobile-link-${item.name}`}
                elementId={`mobile-nav-${item.name.toLowerCase()}`}
                elementText={`Mobile Nav: ${item.name}`}
              >
                <Link
                  href={item.link}
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    document
                      .getElementById(item.link.slice(1))
                      ?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="relative text-neutral-600 dark:text-neutral-300 flex gap-2 items-center"
                >
                  {item.icon} <span>{item.name}</span>
                </Link>
              </TrackableElement>
            ))}
            <div className="flex w-full flex-col gap-4">
              <ThemeToggle />
              <TrackableContact method="mobile-navbar-contact">
                <Button
                  title="Contact me"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  variant="default"
                  className="w-full rounded-full"
                >
                  <FaEnvelope />
                </Button>
              </TrackableContact>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </NavbarWrapper>
      <div className="flex items-center justify-center">
        {!isScrolled && (
          <hr className="h-1/2 w-[90vw] rounded-full border-gray-500 bg-gradient-to-r from-primary-600 to-primary-800 shadow-md" />
        )}
      </div>
    </div>
  )
}
