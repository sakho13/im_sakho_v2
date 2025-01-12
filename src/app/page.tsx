import { SimpleTemplate } from "@/components/templates/SimpleTemplate"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  const careerer = [
    {
      span: "2024/07 - now",
      text: "株式会社OMS(旧 株式会社大宮商会)",
    },
    {
      span: "2024/04 - 2024/06",
      text: "株式会社モビテック",
    },
    {
      span: "2021/08 - 2024/03",
      text: "株式会社大宮商会",
    },
    {
      span: "2021/04 - 2024/03",
      text: "東京理科大学 理学部 物理学科 / Department of Physics, Faculty of Science, Tokyo University of Science",
    },
    {
      span: "2016/04 - 2021/03",
      text: "東京都立産業技術高等専門学校 電子情報工学コース / Tokyo Metropolitan College of Industrial Technology",
    },
  ]

  return (
    <SimpleTemplate title='Top'>
      <div className='select-none grid lg:grid-cols-2 grid-cols-1 gap-2'>
        <Card className='h-fit'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-xl'>Profile</CardTitle>
          </CardHeader>

          <CardContent className='mx-2 text-gray-700'>
            <p className='text-lg'>
              <span className='font-bold'>Name: </span>
              SaKho
            </p>

            <p>
              <span className='font-bold'>Location: </span>
              Tokyo, Japan
            </p>

            <p>
              <span className='font-bold'>Skills: </span>
              JavaScript, TypeScript, React, Next.js, Vue.js, Node.js,
              Express.js, C
            </p>

            <p>
              <span className='font-bold'>License: </span>
              基本情報技術者(FE), 普通自動車第一種免許(AT), 普通自動二輪免許
            </p>

            <p>
              <span className='font-bold'>GitHub: </span>
              <Link
                href={"https://github.com/sakho13"}
                target='_blank'
                className='hover:underline'
              >
                here
              </Link>
            </p>

            <p>
              <span className='font-bold'>YouTube: </span>
              <Link
                href={
                  "https://www.youtube.com/channel/UCfIemfzMpKiNJHjYatg7MXg"
                }
                target='_blank'
                className='hover:underline'
              >
                here
              </Link>
            </p>

            <p>
              <span className='font-bold'>Qiita: </span>
              <Link
                href={"https://qiita.com/SaKho13"}
                target='_blank'
                className='hover:underline'
              >
                here
              </Link>
            </p>
          </CardContent>
        </Card>

        <Card className='h-fit'>
          <CardHeader className='pb-2'>
            <CardTitle className='text-xl'>Careerer</CardTitle>

            <CardContent className='mx-2 text-gray-700'>
              {careerer.map((c) => (
                <p key={c.span} className='mb-2 flex flex-col'>
                  <span className='font-bold'>{c.span}</span>
                  <span className='ml-1'>{c.text}</span>
                </p>
              ))}
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </SimpleTemplate>
  )
}
