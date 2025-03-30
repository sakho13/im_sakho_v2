type Props = {
  id?: string
  children: React.ReactNode
}

export function SubParagraph({ id, children }: Props) {
  return (
    <p id={id} className='text-gray-500 text-sm w-fit select-none'>
      {children}
    </p>
  )
}
