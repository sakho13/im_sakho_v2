import type { Metadata } from "next"
import { StrictMode } from "react"
import Script from "next/script"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { BookText, Gavel, Wrench } from "lucide-react"
import { GitHubIcon } from "@/components/atoms/GitHubIcon"
import "./globals.css"

export const metadata: Metadata = {
  title: "SaKho",
  description: "SaKho's personal website",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const GA_ID = process.env.GA_ID

  return (
    <html lang='ja' suppressHydrationWarning>
      <head>
        {GA_ID ? (
          <>
            <Script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script id='ga' defer strategy='afterInteractive'>
              {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
            </Script>
          </>
        ) : null}
      </head>

      <body
        className={`h-screen w-screen overflow-y-auto overflow-x-hidden font-mono`}
      >
        <StrictMode>
          <SidebarProvider>
            <Sidebar>
              <SidebarHeader className='select-none font-bold px-8 text-lg'>
                <Link href={"/"}>SaKho</Link>
              </SidebarHeader>

              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>Contents</SidebarGroupLabel>

                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <a href={"/blog"}>
                            <BookText />
                            <span>Blog</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>

                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <a href={"/tools"}>
                            <Gavel />
                            <span>Tools</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                  <SidebarGroupLabel>Links</SidebarGroupLabel>

                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <a
                            href={"https://github.com/sakho13"}
                            target='_blank'
                          >
                            <GitHubIcon />
                            <span>GitHub</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                  <SidebarGroupLabel>Other</SidebarGroupLabel>

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
            </Sidebar>

            <main className='w-full'>
              <SidebarTrigger />

              {children}

              <Toaster richColors />
            </main>
          </SidebarProvider>
        </StrictMode>
      </body>
    </html>
  )
}
