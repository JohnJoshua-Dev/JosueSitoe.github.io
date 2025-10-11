import type React from "react"
import type { Metadata } from "next"
import { Orbitron, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Josué Joshua - Fullstack Developer",
  description:
    "Portfolio of Josué Rafael Sitoe, a Mozambican Fullstack Developer specializing in modern web technologies",
  generator: "v0.app",
  keywords: ["Fullstack Developer", "Web Developer", "React", "Node.js", "Mozambique"],
  authors: [{ name: "Josué Rafael Sitoe" }],
  openGraph: {
    title: "Josué Joshua - Fullstack Developer",
    description: "Portfolio of Josué Rafael Sitoe, a Mozambican Fullstack Developer",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${orbitron.variable} ${inter.variable} font-sans antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
