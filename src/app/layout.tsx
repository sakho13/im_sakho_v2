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
import { PlanetsBackground } from "@/components/organisms/PlanetsBackground"
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

        <link
          rel='stylesheet'
          href='https://cdn.jsdelivr.net/npm/katex@0.16.19/dist/katex.min.css'
          integrity='sha384-7lU0muIg/i1plk7MgygDUp3/bNRA65orrBub4/OSWHECgwEsY83HaS1x3bljA/XV'
          crossOrigin='anonymous'
        />

        <script
          defer
          src='https://cdn.jsdelivr.net/npm/katex@0.16.19/dist/katex.min.js'
          integrity='sha384-RdymN7NRJ+XoyeRY4185zXaxq9QWOOx3O7beyyrRK4KQZrPlCDQQpCu95FoCGPAE'
          crossOrigin='anonymous'
        ></script>

        <script
          defer
          src='https://cdn.jsdelivr.net/npm/katex@0.16.19/dist/contrib/auto-render.min.js'
          integrity='sha384-hCXGrW6PitJEwbkoStFjeJxv+fSOOQKOPbJxSfM6G5sWZjAyWhXiTIIAmQqnlLlh'
          crossOrigin='anonymous'
        >
          renderMathInElement(document.body)
        </script>
      </head>

      <body
        className={`h-screen w-screen overflow-y-auto overflow-x-hidden font-mono`}
      >
        <StrictMode>
          <PlanetsBackground />
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
