import { BookText, Gavel, Wrench } from "lucide-react"
import Link from "next/link"
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { GitHubIcon } from "@/components/atoms/GitHubIcon"

type SidebarMenuItem = {
  id: string
  label: string
  icon: React.ReactNode
  href: string
}

const SidebarMenuItems: SidebarMenuItem[] = [
  {
    id: "blog",
    label: "Blog",
    icon: <BookText />,
    href: "/blog",
  },
  {
    id: "tools",
    label: "Tools",
    icon: <Gavel />,
    href: "/tools",
  },
]

export function SidebarBody() {
  return (
    <>
      <SidebarHeader className='select-none font-bold px-8 text-lg'>
        <Link href={"/"}>SaKho</Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='select-none'>
            Contents
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {SidebarMenuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <Link href={item.href}>
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className='select-none'>Links</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={"https://github.com/sakho13"} target='_blank'>
                    <GitHubIcon />
                    <span>GitHub</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className='select-none'>Other</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href={"/techs"}>
                    <Wrench />
                    <span>UsedTechs</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className='px-8 py-4 text-sm text-gray-500'>
          <p className='select-none'>© 2025 SaKho</p>
        </div>
      </SidebarFooter>
    </>
  )
}
