import { remark } from "remark"
import RemarkHtml from "remark-html"
import RemarkMath from "remark-math"
import RemarkRehype from "remark-rehype"
import RemarkParse from "remark-parse"
import RehypeKaTex from "rehype-katex"
import RehypeStringify from "rehype-stringify"

export async function convertMdToHtml(md: string) {
  const file = await remark()
    .use(RemarkParse)
    .use(RemarkMath)
    .use(RemarkHtml)
    .use(RemarkRehype)
    .use(RehypeKaTex)
    .use(RehypeStringify)
    .process(md)

  return String(file)
}
