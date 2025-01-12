import { PageSimpleTitle } from "../atoms/PageSimpleTitle"

type Props = {
  title: string
  children: React.ReactNode
}

export function SimpleTemplate({ title, children }: Props) {
  return (
    <div className='px-4'>
      <PageSimpleTitle title={title} />

      <div className='my-4 lg:px-8 px-0'>{children}</div>
    </div>
  )
}
