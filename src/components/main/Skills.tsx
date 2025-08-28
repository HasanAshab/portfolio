'use client'

import React from 'react'
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
//.sort((a, b) => a.skill_name.localeCompare(b.skill_name))

const Skills = () => {
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
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {uniqueSkills.map((skill, index) => (
            <motion.div
              key={skill.skill_name}
              className="group relative flex flex-col items-center p-4 rounded-xl border bg-card hover:bg-accent transition-all duration-300 transform hover:-translate-y-1"
              role="listitem"
              aria-label={skill.skill_name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SkillDataProvider
                src={skill.Image}
                width={50}
                height={50}
                index={index}
                className="group-active:scale-110 group-hover:scale-110 transition-transform duration-200"
              />
              <span className="absolute top-full mt-2 text-xs font-medium text-foreground bg-background px-2 py-1 rounded opacity-0 group-active:opacity-100 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow">
                {skill.skill_name}
              </span>
              <div className="absolute inset-0 rounded-xl opacity-0 group-active:opacity-100 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-primary/10 to-transparent" />
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground italic">
          …and plenty more technologies I&apos;m exploring & mastering every day.
        </p>
      </div>
    </section>
  )
}

export default Skills
