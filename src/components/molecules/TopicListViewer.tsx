import { Card, CardContent, CardFooter, CardHeader } from "../ui/card"

type TopicBase = {
  id: string | number
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
  renderFooter,
}: Props<T>) {
  return (
    <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-2'>
      {list.map((item) => (
        <div key={item.id}>
          <Card>
            {renderHeader ? (
              <CardHeader>{renderHeader(item)}</CardHeader>
            ) : null}
            {renderBody ? (
              <CardContent className='select-none text-gray-500'>
                {renderBody(item)}
              </CardContent>
            ) : null}
            {renderFooter ? (
              <CardFooter className='flex justify-end'>
                {renderFooter(item)}
              </CardFooter>
            ) : null}
          </Card>
        </div>
      ))}
    </div>
  )
}
