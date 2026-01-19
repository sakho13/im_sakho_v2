import { MetadataRoute } from "next"
import { microCMSClient } from "@/lib/microcms"
import { BlogInfo } from "@/types/blog"
import { MicroCMSListResponse } from "microcms-js-sdk"

export const revalidate = 3600 // 1 hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://sakho.jp"

  // Fetch all blog posts
  const blogs = await fetchAllBlogs()

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/techs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/calculates`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/design/anim-planet`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/calculates/1dim-harmonic-phase-space`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/tools/url-encode`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/tools/reformat-json`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/tools/convert-json-yaml`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/tools/text/tips`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ]

  // Dynamic blog routes
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.id}`,
    lastModified: new Date(blog.updatedAt),
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  return [...staticRoutes, ...blogRoutes]
}

async function fetchAllBlogs(): Promise<BlogInfo[]> {
  try {
    const fetchBatch = async (offset: number) => {
      return await microCMSClient.get<MicroCMSListResponse<BlogInfo>>({
        endpoint: "blogs",
        queries: {
          offset,
          limit: 100,
          orders: "-publishedAt",
          fields: ["id", "updatedAt", "createdAt"],
          filters:
            process.env.DEVELOP === "PRODUCTION"
              ? "isTest[equals]false"
              : undefined,
        },
      })
    }

    const firstBatch = await fetchBatch(0)
    let allBlogs = [...firstBatch.contents]

    let offset = allBlogs.length
    while (offset < firstBatch.totalCount) {
      const batch = await fetchBatch(offset)
      allBlogs = [...allBlogs, ...batch.contents]
      offset = allBlogs.length
    }

    return allBlogs
  } catch (error) {
    console.error("Failed to fetch blogs for sitemap:", error)
    return []
  }
}
