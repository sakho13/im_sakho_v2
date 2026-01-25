import { Metadata } from "next"
import { BracesIcon, IterationCcw, Type } from "lucide-react"
import { TopicListViewer } from "@/components/molecules/TopicListViewer"
import { SimpleTemplate } from "@/components/templates/SimpleTemplate"
import { CardTitle } from "@/components/ui/card"
import { APP_NAME } from "@/statics/statics"

type ToolType = {
  id: string
  icon: React.ReactNode
  name: string
  description: string
  url: string | null
}

const TOOLS: ToolType[] = [
  {
    id: "url-encode",
    icon: <IterationCcw />,
    name: "URL encode",
    description: "encodes a string to be used in a URL",
    url: "/tools/url-encode",
  },
  {
    id: "reformat-json",
    icon: <BracesIcon />,
    name: "Reformat JSON",
    description: "reformat JSON text with a specified space",
    url: "/tools/reformat-json",
  },
  {
    id: "convert-json-yaml",
    icon: <BracesIcon />,
    name: "Convert JSON ↔ YAML",
    description: "convert JSON to YAML or YAML to JSON",
    url: "/tools/convert-json-yaml",
  },
  {
    id: "text-tips",
    icon: <Type />,
    name: "Text Tips",
    description:
      "analyze text with character count, space count, line break removal, and text reversal",
    url: "/tools/text/tips",
  },
]

export const metadata: Metadata = {
  title: `${APP_NAME} | ツール一覧`,
  description:
    "ツール一覧ページです。, " +
    TOOLS.map((tool) => tool.description).join(", "),
  keywords: ["ツール", "Tools", "Utility", ...TOOLS.map((tool) => tool.name)],
}

export default function Page() {
  return (
    <SimpleTemplate title='Tools'>
      <TopicListViewer
        list={TOOLS}
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
