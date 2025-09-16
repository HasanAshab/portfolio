"use client"

import { useEffect, useState } from "react"
import { BlogTile } from "@/components/sub/BlogTile"

interface Blog {
  id: string
  title: string
  excerpt: string
  href: string
}

export function BlogsSection() {
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    async function fetchMedium() {
      try {
        // Use rss2json API to convert RSS to JSON
        const res = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@hasan-ashab`
        )
        const data = await res.json() as { items: Blog[] }

        const posts = data.items.map((item: any) => ({
          id: item.guid,
          title: item.title,
          excerpt: item.description.replace(/<[^>]+>/g, "").slice(0, 120) + "...",
          href: item.link,
        }))

        setBlogs(posts)        
      } catch (err) {
        console.error("Failed to fetch Medium posts", err)
      }
    }

    fetchMedium()
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
                onRead={() => window.open(blog.href, "_blank")}
              />
            ))
          )}
        </div>
      </div>
    </section>
  )
}
