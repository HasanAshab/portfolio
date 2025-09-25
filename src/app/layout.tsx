import { Analytics } from '@vercel/analytics/next';
import Footer from '@/components/main/Footer'
import { Navbar } from '@/components/main/Navbar'
import { ThemeProvider } from '@/components/theme-provider'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Hasan Ashab - DevOps & Cloud Engineer Portfolio | AWS, Kubernetes, Docker',
  description:
    'Experienced DevOps and Cloud Engineer specializing in AWS, Kubernetes, Docker, and CI/CD. View my portfolio showcasing cloud infrastructure projects, automation solutions, and scalable deployments.',
  keywords: [
    'devops portfolio',
    'cloud engineer portfolio', 
    'devops engineer',
    'cloud engineer',
    'hasan ashab',
    'hasan ashab portfolio',
    'portfolio website',
    'aws devops',
    'kubernetes engineer',
    'docker specialist',
    'ci cd pipeline',
    'infrastructure automation',
    'cloud architecture',
    'terraform',
    'ansible',
    'jenkins'
  ],
  authors: [{ name: 'Hasan Ashab' }],
  creator: 'Hasan Ashab',
  publisher: 'Hasan Ashab',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hasanashab.vercel.app',
    title: 'Hasan Ashab - DevOps & Cloud Engineer Portfolio',
    description: 'Experienced DevOps and Cloud Engineer specializing in AWS, Kubernetes, Docker, and CI/CD. View my portfolio showcasing cloud infrastructure projects.',
    siteName: 'Hasan Ashab Portfolio',
    images: [
      {
        url: '/profile-pic.jpg',
        width: 1200,
        height: 630,
        alt: 'Hasan Ashab - DevOps & Cloud Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hasan Ashab - DevOps & Cloud Engineer Portfolio',
    description: 'Experienced DevOps and Cloud Engineer specializing in AWS, Kubernetes, Docker, and CI/CD.',
    images: ['/profile-pic.jpg'],
    creator: '@hasanashab',
  },
  alternates: {
    canonical: 'https://hasanashab.vercel.app',
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Hasan Ashab',
    jobTitle: 'DevOps & Cloud Engineer',
    description: 'Experienced DevOps and Cloud Engineer specializing in AWS, Kubernetes, Docker, and CI/CD automation',
    url: 'https://hasanashab.vercel.app',
    image: 'https://hasanashab.vercel.app/profile-pic.jpg',
    sameAs: [
      'https://github.com/HasanAshab',
      'https://linkedin.com/in/hasanashab', // Add your LinkedIn
    ],
    knowsAbout: [
      'DevOps',
      'Cloud Engineering', 
      'AWS',
      'Kubernetes',
      'Docker',
      'CI/CD',
      'Infrastructure as Code',
      'Terraform',
      'Ansible',
      'Jenkins',
      'Monitoring',
      'Automation'
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance'
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href="https://hasanashab.vercel.app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1e40af" media="(prefers-color-scheme: dark)" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main role="main">
            {children}
          </main>
        </ThemeProvider>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
