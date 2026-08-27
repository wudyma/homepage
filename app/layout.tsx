import "@/app/globals.css"
import type { Metadata } from "next"

import { RootProvider } from "fumadocs-ui/provider/next"
import { Inter, JetBrains_Mono, Noto_Sans_SC } from "next/font/google"

import { baseUrl } from "@/lib/metadata"

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
})

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
})

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans",
})

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    default: "Zheng Ma — Computational Mathematics & AI for Science",
    template: "%s | Zheng Ma",
  },
  description:
    "Academic homepage of Zheng Ma, a mathematician at Shanghai Jiao Tong University working on computational mathematics, inverse problems, kinetic equations, and AI for science.",
  applicationName: "Zheng Ma's Homepage",
  authors: [{ name: "Zheng Ma" }],
  creator: "Zheng Ma",
  keywords: [
    "Zheng Ma",
    "computational mathematics",
    "AI for science",
    "inverse problems",
    "kinetic equations",
    "scientific machine learning",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Zheng Ma",
    title: "Zheng Ma — Computational Mathematics & AI for Science",
    description:
      "Research, publications, teaching, and notes on computational mathematics and AI for science.",
  },
  twitter: {
    card: "summary",
    title: "Zheng Ma — Computational Mathematics & AI for Science",
    description:
      "Research, publications, teaching, and notes on computational mathematics and AI for science.",
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${interSans.variable} ${jetBrainsMono.variable} ${notoSansSC.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
