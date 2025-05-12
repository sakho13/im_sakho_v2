"use client"

import { BookText, Gavel, Wrench } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { event } from "@/lib/gtag"
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
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a
                    onClick={() => {
                      event({
                        action: "click",
                        category: "sidebar",
                        label: "blog",
                      })
                      redirect("/blog")
                    }}
                    className='hover:cursor-pointer'
                  >
                    <BookText />
                    <span>Blog</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a
                    onClick={() => {
                      event({
                        action: "click",
                        category: "sidebar",
                        label: "tools",
                      })
                      redirect("/tools")
                    }}
                    className='hover:cursor-pointer'
                  >
                    <Gavel />
                    <span>Tools</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
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
                  <a
                    className='hover:cursor-pointer'
                    onClick={() => {
                      event({
                        action: "click",
                        category: "sidebar",
                        label: "used-techs",
                      })
                      redirect("/techs")
                    }}
                  >
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
