'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Skill, skills } from '@/constants'
import SkillDataProvider from '../sub/SkillDataProvider'

const uniqueSkills: Skill[] = Array.from(
  skills
    .reduce((map, skill) => {
      if (!map.has(skill.skill_name)) {
        map.set(skill.skill_name, { ...skill, width: 40, height: 40 })
      }
      return map
    }, new Map<string, Skill>())
    .values(),
)

const Skills = () => {
  const [showAll, setShowAll] = useState(false)
  const [maxItemsToShow, setMaxItemsToShow] = useState(12) // Default value

  useEffect(() => {
    // This function will run only on the client side
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth > 768) {
          setMaxItemsToShow(12)
        } else if (window.innerWidth <= 768 && window.innerWidth > 425) {
          setMaxItemsToShow(8)
        } else {
          setMaxItemsToShow(6)
        }
      }
    }

    // Set initial value
    handleResize()

    // Add event listener for window resize
    window.addEventListener('resize', handleResize)

    // Clean up
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const skillsToShow = showAll ? uniqueSkills : uniqueSkills.slice(0, maxItemsToShow)

  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center gap-12 py-16 px-4 sm:px-8 min-h-[600px] bg-gradient-to-br from-background to-muted"
      aria-labelledby="skills-heading"
    >
      <div className="absolute inset-0 z-[-1] opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,_theme(colors.blue.400_/_20%),_transparent_70%)] dark:bg-[radial-gradient(circle_at_50%_20%,_theme(colors.blue.600_/_20%),_transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_80%_80%,_theme(colors.blue.400_/_15%),_transparent_70%)] dark:bg-[radial-gradient(circle_at_80%_80%,_theme(colors.blue.600_/_15%),_transparent_70%)]" />
      </div>

      <div className="text-center max-w-3xl">
        <h2
          id="skills-heading"
          className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground"
        >
          Technical Skills
        </h2>
        <p className="mt-2 text-muted-foreground font-semibold text-sm italic">
          A curated selection of my expertise in devops and backend development
        </p>
      </div>

      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {skillsToShow.map((skill, index) => (
            <motion.div
              key={skill.skill_name}
              className="group relative flex flex-col items-center p-4 rounded-xl border bg-card hover:bg-accent transition-all duration-300 transform hover:-translate-y-1"
              role="listitem"
              aria-label={skill.skill_name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex flex-col items-center gap-3">
                <SkillDataProvider
                  src={skill.Image}
                  width={30}
                  height={30}
                  index={index}
                  className="group-active:scale-110 group-hover:scale-110 transition-transform duration-200"
                />
                {/* Skill name permanently displayed below the icon */}
                <span className="text-xs font-medium text-foreground text-center leading-tight line-clamp-2">
                  {skill.skill_name}
                </span>
              </div>
              <div className="absolute inset-0 rounded-xl opacity-0 group-active:opacity-100 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-primary/10 to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Show All / Show Less Button */}
        {uniqueSkills.length > maxItemsToShow && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              {showAll ? 'Show Less' : `Show All (${uniqueSkills.length - maxItemsToShow})`}
            </button>
          </div>
        )}

        <p className="mt-8 text-center text-sm text-muted-foreground italic">
          …and plenty more technologies I&apos;m exploring & mastering every day.
        </p>
      </div>
    </section>
  )
}

export default Skills