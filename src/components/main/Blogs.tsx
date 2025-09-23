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
    <section id="blogs" className="w-full py-20 bg-background">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            My Recent Blogs ✍️
          </h2>
          <p className="text-muted-foreground mt-4 max-w-3xl mx-auto text-base font-semibold md:text-lg italic">
            Insights, tutorials, and thoughts on DevOps, cloud technologies, and software development.
          </p>
        </motion.div>

        {/* Tag Filter Section - Same as Projects component */}
        {allTags.length > 0 && (
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mb-4">
                <Tags className="h-5 w-5" />
                <h3 className="text-lg font-medium">Filter by tags</h3>
                {selectedTags.length > 0 && (
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-muted-foreground hover:text-foreground ml-2 underline"
                  >
                    Clear all
                  </button>
                )}
              </div>
              
              <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
                {allTags.map(tag => (
                  <Badge
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer px-3 py-1 rounded-full transition-all"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
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
            .slice(0, 4)
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
           <div className="mt-8 text-center">
            <button
              className="px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
             <a href="https://dev.to/hasan_ashab" target="_blank">Read All Blogs</a>
            </button>
          </div>
         </div>
      </div>
    </section>
  )
}