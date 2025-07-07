import Link from "next/link"
import { Card, CardContent, CardHeader } from "../ui/card"
import { joinCN } from "@/lib/functions/joinCN"

type TopicBase = {
  id: string | number
  url: string | null
}

type Props<T extends TopicBase> = {
  list: T[]
  renderHeader?: (item: T) => React.ReactNode
  renderBody?: (item: T) => React.ReactNode
  renderFooter?: (item: T) => React.ReactNode
}

export function TopicListViewer<T extends TopicBase>({
  list,
  renderHeader,
  renderBody,
}: Props<T>) {
  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-2'>
      {list.map((item) => (
        <Link key={item.id} href={item.url || "#"}>
          <Card
            className={joinCN(
              "duration-300",
              item.url ? "hover:shadow-lg transition-shadow" : "cursor-default",
            )}
          >
            {renderHeader ? (
              <CardHeader>{renderHeader(item)}</CardHeader>
            ) : null}
            {renderBody ? (
              <CardContent className='select-none text-gray-500'>
                {renderBody(item)}
              </CardContent>
            ) : null}
          </Card>
        </Link>
      ))}
    </div>
  )
}
