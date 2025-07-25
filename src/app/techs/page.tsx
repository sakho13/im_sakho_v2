import { NextJsIcon } from "@/components/atoms/NextJsIcon"
import { TopicListViewer } from "@/components/molecules/TopicListViewer"
import { SimpleTemplate } from "@/components/templates/SimpleTemplate"
import { CardTitle } from "@/components/ui/card"
import { Gavel, Wrench } from "lucide-react"

type TechType = {
  id: string
  icon: React.ReactNode
  name: string
  description: string
  link?: string
  url: string | null
}

export default function Page() {
  const tools: TechType[] = [
    {
      id: "nextjs",
      icon: <NextJsIcon />,
      name: "Next.js",
      description: "Reactフレームワーク。",
      url: "https://nextjs.org/",
    },
    {
      id: "tailwindcss",
      icon: <Wrench />,
      name: "Tailwind CSS",
      description: "CSSフレームワーク。クラス名でスタイルを適用。",
      url: "https://tailwindcss.com/",
    },
    {
      id: "typescript",
      icon: <Gavel />,
      name: "TypeScript",
      description: "JavaScriptのスーパーセット。型安全性と開発効率を向上。",
      url: "https://www.typescriptlang.org/",
    },
    {
      id: "shadcn/ui",
      icon: <Wrench />,
      name: "shadcn/ui",
      description:
        "Tailwind CSSをサポートした、シンプルかつ拡張性の高いReactコンポーネントライブラリ。",
      url: "https://ui.shadcn.com/",
    },
    {
      id: "lucide-react",
      icon: <Wrench />,
      name: "lucide-react",
      description: "SVGアイコンセット。Reactコンポーネントとして使用可能。",
      url: "https://lucide.dev/",
    },

    {
      id: "microcms",
      icon: <Wrench />,
      name: "microCMS",
      description: "シンプルなCMSサービス。",
      url: "https://microcms.io/",
    },
    {
      id: "gcp",
      icon: <Wrench />,
      name: "Google Cloud Platform",
      description: "Googleのクラウドサービス。デプロイ環境とCI/CDに使用。",
      url: null,
    },
  ]

  return (
    <SimpleTemplate title='Techs'>
      <TopicListViewer
        list={tools}
        renderHeader={(tool) => (
          <CardTitle className='select-none flex items-center'>
            {tool.icon}
            <span className='ml-2'>{tool.name}</span>
          </CardTitle>
        )}
        renderBody={(tool) => tool.description}
      />
    </SimpleTemplate>
  )
}
