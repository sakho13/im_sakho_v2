import { Metadata } from "next"
import { TopicListViewer } from "@/components/molecules/TopicListViewer"
import { SimpleTemplate } from "@/components/templates/SimpleTemplate"
import { CardTitle } from "@/components/ui/card"
import { APP_NAME } from "@/statics/statics"
import { OrbitIcon } from "lucide-react"

type ToolType = {
  id: string
  icon: React.ReactNode
  name: string
  description: string
  url: string | null
}

const CONTENTS: ToolType[] = [
  {
    id: "1dim-harmonic-phase-space",
    icon: <OrbitIcon />,
    name: "1次元調和位相空間",
    description: "1次元の調和振動子の位相空間を可視化します。",
    url: "/calculates/1dim-harmonic-phase-space",
  },
]

export const metadata: Metadata = {
  title: `${APP_NAME} | 計算コンテンツ一覧`,
  description: "計算コンテンツ一覧ページです。",
  keywords: [
    "計算",
    "コンテンツ",
    "Calculates",
    "Contents",
    ...CONTENTS.map((tool) => tool.name),
  ],
}

export default function Page() {
  return (
    <SimpleTemplate title='Contents'>
      <TopicListViewer
        list={CONTENTS}
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
