import { Metadata } from "next"
import { Music2Icon } from "lucide-react"
import { TopicListViewer } from "@/components/molecules/TopicListViewer"
import { SimpleTemplate } from "@/components/templates/SimpleTemplate"
import { CardTitle } from "@/components/ui/card"
import { APP_NAME } from "@/statics/statics"

type ContentType = {
  id: string
  icon: React.ReactNode
  name: string
  description: string
  url: string | null
}

const CONTENTS: ContentType[] = [
  {
    id: "kantele-tab",
    icon: <Music2Icon />,
    name: "カンテレ タブ譜エディタ",
    description:
      "カンテレのタブ譜を作成し、再生・YAMLでのエクスポート/インポートができます。",
    url: "/hobbies/kantele-tab",
  },
]

export const metadata: Metadata = {
  title: `${APP_NAME} | Hobbies`,
  description:
    "趣味コンテンツ一覧ページです。, " +
    CONTENTS.map((content) => content.description).join(", "),
  keywords: ["趣味", "Hobbies", ...CONTENTS.map((content) => content.name)],
}

export default function Page() {
  return (
    <SimpleTemplate title='Hobbies'>
      <TopicListViewer
        list={CONTENTS}
        renderHeader={(content) => (
          <CardTitle className='select-none flex items-center'>
            {content.icon}
            <span className='ml-2'>{content.name}</span>
          </CardTitle>
        )}
        renderBody={(content) => content.description}
      />
    </SimpleTemplate>
  )
}
