import { SimpleTemplate } from "@/components/templates/SimpleTemplate"

export default function NotFound() {
  return (
    <SimpleTemplate title='存在しないページ'>
      <h1 className='text-red-600 text-2xl font-bold'>404 Not Found</h1>
    </SimpleTemplate>
  )
}
