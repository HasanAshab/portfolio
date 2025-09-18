"use client"

import { useEffect, useState } from "react"
import { BlogTile } from "@/components/sub/BlogTile"
import { log } from "node:console"

interface Blog {
  id: number
  title: string
  excerpt: string
  image?: string
  href: string
}

export function BlogsSection() {
  const [blogs, setBlogs] = useState<Blog[]>([])

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
          image: item.cover_image || item.social_image
        }))

        setBlogs(posts)
      } catch (err) {
        console.error("Failed to fetch Dev.to posts", err)
      }
    }

    fetchDevTo()
  }, [])

  return (
    <section id="blogs" className="w-full py-12 dark:bg-neutral-950">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="mb-8 text-3xl font-bold text-center text-zinc-800 dark:text-zinc-100">
          Blogs
        </h2>

        <div className="grid gap-4">
          {blogs.length === 0 ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            blogs.map((blog) => (
              <BlogTile
                key={blog.id}
                title={blog.title}
                excerpt={blog.excerpt}
                image={blog.image}
                onRead={() => window.open(blog.href, "_blank")}
              />
            ))
          )}
        </div>
      </div>
    </section>
  )
}
