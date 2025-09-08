import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/contexts/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { CacheCleaner } from "@/components/cache-cleaner"
import { Suspense } from "react"
import "./globals.css"
import dynamic from "next/dynamic"

export const metadata: Metadata = {
  title: "O CLUBE DO STL - Área de Membros",
  description: "Área exclusiva para membros do Clube STL",
  generator: "v0.app",
}

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`font-sans ${inter.variable} bg-black text-white`}>
        <link rel="manifest" href="/manifest.webmanifest" />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Suspense fallback={null}>
            <AuthProvider>
              <CacheCleaner />
              <div className="min-h-screen lg:pl-80">
                {children}
              </div>
              {/** Banner PWA (apenas no client) */}
              {dynamic(() => import("@/components/pwa-install-banner"), { ssr: false })()}
            </AuthProvider>
          </Suspense>
          <Toaster position="top-right" richColors />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
