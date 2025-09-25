import { BlogsSection } from '@/components/main/Blogs'
import ContactUs from '@/components/main/ContactUs'
import Hero from '@/components/main/Hero'
import Projects from '@/components/main/Projects'
import ResumeSection from '@/components/main/Resume'
import Skills from '@/components/main/Skills'
import Timeline from '@/components/main/Timeline'
import { Toaster } from 'react-hot-toast'
import { Metadata } from 'next'
import CertificationsSection from '@/components/main/Certifications'

export const metadata: Metadata = {
  title: 'Hasan Ashab - DevOps & Cloud Engineer Portfolio | AWS, Kubernetes, Docker',
  description: 'Professional DevOps and Cloud Engineer portfolio showcasing expertise in AWS, Kubernetes, Docker, CI/CD pipelines, and infrastructure automation. View my projects and experience.',
  alternates: {
    canonical: 'https://hasanashab.vercel.app',
  },
}

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen">
      {/* Hidden SEO content for better indexing */}
      <div className="sr-only">
        <h1>Hasan Ashab - DevOps Engineer and Cloud Specialist Portfolio</h1>
        <p>
          Welcome to my professional portfolio. I am a DevOps engineer and cloud specialist
          with expertise in AWS, Kubernetes, Docker, CI/CD pipelines, infrastructure automation,
          and scalable cloud solutions. Browse my projects, skills, and professional experience.
        </p>
      </div>

      <div className="flex flex-col gap-10">
        <Hero />
        <Skills />
        <ResumeSection />
        <Timeline />
        {/* <CertificationsSection /> */}
        <Projects />
        <BlogsSection />
        <ContactUs />
        <Toaster position="bottom-right" />
      </div>
    </div>
  )
}
