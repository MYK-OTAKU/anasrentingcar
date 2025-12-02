import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "YR Location - Location de voitures",
    template: "%s | YR Location",
  },
  description:
    "Louez votre voiture en toute simplicité avec YR Location. Large gamme de véhicules, prix compétitifs et service client de qualité.",
  keywords: ["location voiture", "rental car", "location véhicule", "YR Location"],
  authors: [{ name: "YR Location" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "YR Location",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#f59e0b",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
