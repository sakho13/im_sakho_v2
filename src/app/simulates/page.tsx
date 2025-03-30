import { SimpleTemplate } from "@/components/templates/SimpleTemplate"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CpuIcon } from "lucide-react"
import Link from "next/link"

type ItemType = {
  id: string
  icon: React.ReactNode
  name: string
  description: string
}

export default function Page() {
  const items: ItemType[] = [
    {
      id: "assembly-simulator",
      icon: <CpuIcon />,
      name: "Assembly Simulator",
      description: "Simulate assembly code.",
    },
  ]

  return (
    <SimpleTemplate title='Simulators'>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-2'>
        {items.map((item) => (
          <div key={item.id}>
            <Card>
              <CardHeader>
                <CardTitle className='select-none flex items-center'>
                  {item.icon}
                  <span className='ml-2'>{item.name}</span>
                </CardTitle>
              </CardHeader>

              <CardContent className='select-none text-gray-500'>
                {item.description}
              </CardContent>

              <CardFooter className='flex justify-end'>
                <Button>
                  <Link href={`/simulates/${item.id}`}>Link</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </SimpleTemplate>
  )
}
