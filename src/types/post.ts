import { MicroCMSListContent } from "microcms-js-sdk"
import { CategoryInfo } from "./category"

export type Post = {
  title: string
  content: string
  eyecatch?: {
    height: number
    width: number
    url: string
  }
  category: CategoryInfo[]
  icon: string[]
  isTest: boolean
}

export type PostInfo = Post & MicroCMSListContent
