"use client"

import { useEffect, useState, useMemo } from "react"
import { BlogTile } from "@/components/sub/BlogTile"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Tags } from "lucide-react"
import { log } from "node:console"

interface Blog {
  id: number
  title: string
  excerpt: string
  image?: string
  href: string
  tags: string[]
  createdAt: string
  engagement: number
}

export function BlogsSection() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  useEffect(() => {
    async function fetchDevTo() {
      try {
        const res = await fetch("https://dev.to/api/articles?username=hasan_ashab")
        const data = await res.json() as any
        
        const posts = data.map((item: any) => ({
          id: item.id,
          title: item.title,
          excerpt: item.description,
          href: item.url,
          tags: item.tag_list,
          image: item.cover_image || item.social_image,
          createdAt: item.published_at,
          engagement: item.positive_reactions_count + item.comments_count
        }))

        setBlogs(posts)
      } catch (err) {
        console.error("Failed to fetch Dev.to posts", err)
      }
    }

    fetchDevTo()
  }, [])

  // Extract all unique tags from blogs
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    blogs.forEach(blog => {
      blog.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [blogs])

  // Filter blogs based on selected tags (AND logic)
  const filteredBlogs = useMemo(() => {
    if (selectedTags.length === 0) return blogs
    
    return blogs.filter(blog => 
      selectedTags.every(tag => blog.tags.includes(tag))
    )
  }, [blogs, selectedTags])

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

  return (
    <section id="blogs" className="relative w-full py-20 bg-background overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Floating Geometric Shapes */}
        <div className="absolute top-24 right-12 w-32 h-32 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-60 left-16 w-20 h-20 bg-blue-500/20 rounded-lg rotate-45 animate-bounce"></div>
        <div className="absolute bottom-40 right-1/3 w-16 h-16 bg-primary/15 rounded-full animate-ping"></div>
        <div className="absolute bottom-24 left-1/4 w-24 h-24 bg-blue-400/10 rounded-lg rotate-12 float-animation"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-primary/20 via-blue-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-l from-blue-400/15 via-primary/10 to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 title="My Recent Blogs" className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-blue-500 bg-clip-text text-transparent mb-4">
            My Recent Blogs ✍️
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Insights, tutorials, and thoughts on DevOps, cloud technologies, and software development.
          </p>
        </motion.div>

        {/* Tag Filter Section */}
        {allTags.length > 0 && (
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
                      title={`Filter by ${tag} (Blog)`}
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
        )}

        <div className="grid gap-4">
          {blogs.length === 0 ? (
            <motion.p 
              className="text-center text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Loading blog posts...
            </motion.p>
          ) : filteredBlogs.length === 0 ? (
            <motion.div 
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-muted-foreground text-lg">
                No blog posts match the selected tags. Try selecting different tags.
              </p>
            </motion.div>
          ) : (
            filteredBlogs
            .toSorted((a, b) => {
              const bonusPerB = new Date(b.createdAt).getTime() > new Date(a.createdAt).getTime() 
                ? 1.7 : 1
              const bonusPerA = new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime() 
                ? 1.7 : 1                
              return (b.engagement * bonusPerB) - (a.engagement * bonusPerA)
            })
            .slice(0, 5)
            .map((blog, index) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <BlogTile
                  title={blog.title}
                  excerpt={blog.excerpt}
                  image={blog.image}
                  onRead={() => window.open(blog.href, "_blank")}
                />
              </motion.div>
            ))
          )}
           <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <a
              title="Read all blogs on Dev.to"
              href="https://dev.to/hasan_ashab"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-gradient-to-r from-primary to-blue-500 hover:from-blue-500 hover:to-primary text-primary-foreground px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 inline-block"
            >
              <div className="relative z-10">Read All Blogs</div>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </a>
          </motion.div>
         </div>
      </div>
    </section>
  )
}