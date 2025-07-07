import { TopicListViewer } from "@/components/molecules/TopicListViewer"
import { SimpleTemplate } from "@/components/templates/SimpleTemplate"
import { CardTitle } from "@/components/ui/card"
import { BracesIcon, IterationCcw } from "lucide-react"

type ToolType = {
  id: string
  icon: React.ReactNode
  name: string
  description: string
  url: string | null
}

export default function Page() {
  const tools: ToolType[] = [
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
  ]

  return (
    <SimpleTemplate title='Tools'>
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
