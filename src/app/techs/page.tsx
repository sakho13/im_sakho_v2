import { NextJsIcon } from "@/components/atoms/NextJsIcon"
import { SimpleTemplate } from "@/components/templates/SimpleTemplate"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Gavel, Wrench } from "lucide-react"
import Link from "next/link"

type TechType = {
  id: string
  icon: React.ReactNode
  name: string
  description: string
  link?: string
}

export default function Page() {
  const tools: TechType[] = [
    {
      id: "nextjs",
      icon: <NextJsIcon />,
      name: "Next.js",
      description: "Reactフレームワーク。",
      link: "https://nextjs.org/",
    },
    {
      id: "tailwindcss",
      icon: <Wrench />,
      name: "Tailwind CSS",
      description: "CSSフレームワーク。クラス名でスタイルを適用。",
      link: "https://tailwindcss.com/",
    },
    {
      id: "typescript",
      icon: <Gavel />,
      name: "TypeScript",
      description: "JavaScriptのスーパーセット。型安全性と開発効率を向上。",
      link: "https://www.typescriptlang.org/",
    },
    {
      id: "shadcn/ui",
      icon: <Wrench />,
      name: "shadcn/ui",
      description:
        "Tailwind CSSをサポートした、シンプルかつ拡張性の高いReactコンポーネントライブラリ。",
      link: "https://ui.shadcn.com/",
    },
    {
      id: "lucide-react",
      icon: <Wrench />,
      name: "lucide-react",
      description: "SVGアイコンセット。Reactコンポーネントとして使用可能。",
      link: "https://lucide.dev/",
    },

    {
      id: "microcms",
      icon: <Wrench />,
      name: "microCMS",
      description: "シンプルなCMSサービス。",
      link: "https://microcms.io/",
    },
    {
      id: "gcp",
      icon: <Wrench />,
      name: "Google Cloud Platform",
      description: "Googleのクラウドサービス。デプロイ環境とCI/CDに使用。",
    },
  ]

  return (
    <SimpleTemplate title='Techs'>
      <div className='grid lg:grid-cols-4 grid-cols-1 gap-2'>
        {tools.map((tool) => (
          <div key={tool.id}>
            <Card>
              <CardHeader>
                <CardTitle className='select-none flex items-center'>
                  {tool.icon}
                  <span className='ml-2'>{tool.name}</span>
                </CardTitle>
              </CardHeader>

              <CardContent className='select-none text-gray-500'>
                {tool.description}
              </CardContent>

              <CardFooter className='flex justify-end'>
                {tool.link && (
                  <Button>
                    <Link href={tool.link} target='_blank'>
                      Link
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </SimpleTemplate>
  )
}
