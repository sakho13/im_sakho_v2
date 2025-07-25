import { SimpleTemplate } from "@/components/templates/SimpleTemplate"
import { microCMSClient } from "@/lib/microcms"
import { DateUtility } from "@/lib/utilities/DateUtility"
import { BlogInfo } from "@/types/blog"
import { renderToString } from "katex"
import { load as cheerioLoad } from "cheerio"
import post_style from "./post_style.module.scss"

type Props = {
  params: Promise<{ slug: string }>
}

export const revalidate = 60

export default async function Page({ params }: Props) {
  const slug = (await params).slug

  const blog = await _fetchPost(slug)

  if (!blog) {
    return (
      <SimpleTemplate title='存在しないページ'>
        <h1 className='text-red-600 text-2xl font-bold'>404 Not Found</h1>
      </SimpleTemplate>
    )
  }

  return (
    <SimpleTemplate title={blog.title}>
      <div>
        <p className='text-sm text-gray-500 select-none'>
          作成日: {DateUtility.convertISO8601ToFormattedDate(blog.createdAt)} /
          最終更新日:{" "}
          {DateUtility.convertISO8601ToFormattedDate(blog.updatedAt)}
        </p>
      </div>

      <div className='mt-4 mb-16 mx-2'>
        <div
          className={post_style.content}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </SimpleTemplate>
  )
}

async function _fetchPost(contentId: string): Promise<BlogInfo | null> {
  try {
    const data = await microCMSClient.get<BlogInfo>({
      endpoint: "blogs",
      contentId: contentId,
      queries: {
        limit: 1,
      },
    })

    const replacedEqHtml = data.content
      .replaceAll(/\$\$[^\$]*\$\$/g, (substring) =>
        renderToString(
          substring
            .replaceAll("$", "")
            .replaceAll(/(<br>|<\\br>|&nbsp;|amp;)/g, ""),
          { strict: "ignore", displayMode: true },
        ),
      )
      .replaceAll(/\$[^\$]*\$/g, (substring) =>
        renderToString(
          substring
            .replaceAll("$", "")
            .replaceAll(/(<br>|<\\br>|&nbsp;|amp;)/g, ""),
          { strict: "ignore", displayMode: false },
        ),
      )

    const cheerioHtml = cheerioLoad(replacedEqHtml)

    cheerioHtml(".katex-display").each(() => {
      cheerioHtml(".katex-html").each((_, katexElement) => {
        cheerioHtml(katexElement).css("overflow-x", "auto")
        cheerioHtml(katexElement).css("overflow-y", "clip")
      })
    })

    data.content = cheerioHtml.html()
    return data
  } catch {
    return null
  }
}
