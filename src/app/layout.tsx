import type { Metadata } from "next"
import { StrictMode } from "react"
import Script from "next/script"
import {
  Sidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { GoogleAnalytics } from "@/components/molecules/GoogleAnalytics"
import { SidebarBody } from "@/components/organisms/SidebarBody"
import { GA_ID } from "@/lib/gtag"
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
              <SidebarBody />
            </Sidebar>

            <main className='w-full'>
              <SidebarTrigger />

              {children}

              <Toaster richColors />
            </main>
          </SidebarProvider>

          <GoogleAnalytics />
        </StrictMode>
      </body>
    </html>
  )
}
