"use client"

import { useEffect, useState, useMemo } from "react"
import { BlogTile } from "@/components/sub/BlogTile"

interface Blog {
  id: number
  title: string
  excerpt: string
  image?: string
  href: string
  tags: string[]
}

export function BlogsSection() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

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

  // Extract all unique tags from blogs
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    blogs.forEach(blog => {
      blog.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [blogs])

  // Filter blogs based on selected tag
  const filteredBlogs = useMemo(() => {
    if (!selectedTag) return blogs
    return blogs.filter(blog => blog.tags.includes(selectedTag))
  }, [blogs, selectedTag])

  return (
    <section id="blogs" className="w-full py-12 dark:bg-neutral-950">
      <div className="mx-auto max-w-5xl px-4">
        <h2 className="mb-8 text-4xl font-bold text-center text-zinc-800 dark:text-zinc-100">
          My Recent Blogs ✍️
        </h2>

        {/* Tag Filter Section */}
        {allTags.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTag === null
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                All Posts
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTag === tag
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid gap-4">
          {blogs.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
          ) : filteredBlogs.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No blog posts found for the selected tag.
            </p>
          ) : (
            filteredBlogs.map((blog) => (
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
        <button className="block mx-auto mt-8 px-4 py-2 rounded-full bg-black text-white"><a href="your link here">See All Blogs</a></button>
      </div>
    </section>
  )
}