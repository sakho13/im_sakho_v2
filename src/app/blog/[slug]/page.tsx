import { SimpleTemplate } from "@/components/templates/SimpleTemplate"
import { microCMSClient } from "@/lib/microcms"
import { DateUtility } from "@/lib/utilities/DateUtility"
import { BlogInfo } from "@/types/blog"

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
        <p>
          作成日: {DateUtility.convertISO8601ToFormattedDate(blog.createdAt)} /
          最終更新日:{" "}
          {DateUtility.convertISO8601ToFormattedDate(blog.updatedAt)}
        </p>
      </div>

      <div className='my-4 mx-2'>
        {/* <div dangerouslySetInnerHTML={{ __html: blog.content }} /> */}
        <p>実装中</p>
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

    // const replacedEqHtml = data.content
    //   .replaceAll(/\$\$[^\$]*\$\$/g, (substring) =>
    //     katex.renderToString(
    //       substring
    //         .replaceAll("$", "")
    //         .replaceAll(/(<br>|<\\br>|&nbsp;|amp;)/g, ""),
    //       { strict: "ignore", displayMode: true },
    //     ),
    //   )
    //   .replaceAll(/\$[^\$]*\$/g, (substring) =>
    //     katex.renderToString(
    //       substring
    //         .replaceAll("$", "")
    //         .replaceAll(/(<br>|<\\br>|&nbsp;|amp;)/g, ""),
    //       { strict: "ignore", displayMode: false },
    //     ),
    //   )

    // const cheerioHtml = cheerio.load(replacedEqHtml)

    // cheerioHtml(".katex-display").each((_, element) => {
    //   cheerioHtml(".katex-html").each((_, katexElement) => {
    //     cheerioHtml(katexElement).css("overflow-x", "auto")
    //     cheerioHtml(katexElement).css("overflow-y", "clip")
    //   })
    // })

    // data.content = cheerioHtml.html()
    return data
  } catch {
    return null
  }
}
