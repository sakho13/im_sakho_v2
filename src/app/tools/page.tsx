import { SimpleTemplate } from "@/components/templates/SimpleTemplate"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { IterationCcw } from "lucide-react"
import Link from "next/link"

type ToolType = {
  id: string
  icon: React.ReactNode
  name: string
  description: string
}

export default function Page() {
  const tools: ToolType[] = [
    {
      id: "url-encode",
      icon: <IterationCcw />,
      name: "URL encode",
      description: "encodes a string to be used in a URL",
    },
  ]

  return (
    <SimpleTemplate title='Tools'>
      <div className='grid lg:grid-cols-4 grid-cols-1'>
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
                <Button>
                  <Link href={`/tools/${tool.id}`}>Link</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </SimpleTemplate>
  )
}
