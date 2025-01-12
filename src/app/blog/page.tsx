import { SimpleTemplate } from "@/components/templates/SimpleTemplate"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { microCMSClient } from "@/lib/microcms"
import { DateUtility } from "@/lib/utilities/DateUtility"
import { Blog, BlogInfo } from "@/types/blog"
import { Post } from "@/types/post"
import { GetRequest, MicroCMSListResponse } from "microcms-js-sdk"
import Link from "next/link"

export const revalidate = 3600

export default async function BlogPage() {
  const blogs = await _fetchPosts()

  return (
    <SimpleTemplate title='Contents'>
      <div className='grid lg:grid-cols-1 grid-cols-1 gap-2'>
        {blogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.id}`}>
            <Card className=''>
              <CardHeader>
                <CardTitle className='select-none flex items-center'>
                  <span>
                    {blog.icon}
                    <span className='ml-2'>{blog.title}</span>
                  </span>
                </CardTitle>
                <CardDescription>
                  作成日:{" "}
                  {DateUtility.convertISO8601ToFormattedDate(blog.createdAt)} /
                  最終更新日:{" "}
                  {DateUtility.convertISO8601ToFormattedDate(blog.updatedAt)}
                </CardDescription>
              </CardHeader>

              <CardContent />
            </Card>
          </Link>
        ))}
      </div>
    </SimpleTemplate>
  )
}

const _fetchPosts = async () => {
  const input = (offset: number): GetRequest => {
    return {
      endpoint: "blogs",
      queries: {
        offset,
        limit: 100,
        orders: "-publishedAt",
        filters:
          process.env.DEVELOP === "PRODUCTION"
            ? "isTest[equals]false" // 実環境
            : undefined, // 開発環境
      },
    }
  }

  let cnt = 0

  const res = await microCMSClient.get<MicroCMSListResponse<Post>>(input(0))
  const totalCount = res.totalCount

  let blogs: BlogInfo[] = [...res.contents]
  cnt = blogs.length

  while (cnt < totalCount) {
    const res = await microCMSClient.get<MicroCMSListResponse<Blog>>(input(cnt))
    blogs = [...blogs, ...res.contents]
    cnt = blogs.length
  }

  return blogs
}
