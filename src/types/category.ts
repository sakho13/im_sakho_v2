import { MicroCMSListContent } from "microcms-js-sdk"

export type Category = {
  name: string
  subCategories: CategoryInfo[]
  isSubCategory: boolean
}

export type MenuCategory = {
  id: string
  name: string
}

export type CategoryInfo = Category & MicroCMSListContent
