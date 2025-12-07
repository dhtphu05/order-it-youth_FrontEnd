import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ReferralCaptureClient } from "./ReferralCaptureClient"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Xuân Tình Nguyện 2026",
  description: "Chiến dịch tình nguyện mùa xuân 2026",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`${inter.className} antialiased`}>
        <ReferralCaptureClient />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
