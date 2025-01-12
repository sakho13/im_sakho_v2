type Props = {
  title: string
}

export function PageSimpleTitle({ title }: Props) {
  return (
    <div className='border-b border-gray-200 pt-4 select-none pb-2 mb-4'>
      <h1 className='mx-4 font-bold text-xl'>{title}</h1>
    </div>
  )
}
