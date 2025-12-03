import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "YR Car Location - Location de voitures au Maroc | Prix compétitifs",
    template: "%s | YR Car Location",
  },
  description:
    "Location de voiture au Maroc avec YR Car Location. Véhicules récents à prix compétitifs. Service 24/7, assurance complète. Casablanca, Rabat, Marrakech. Réservez maintenant!",
  keywords: [
    "location voiture Maroc",
    "location voiture Casablanca",
    "rental car Morocco",
    "location véhicule pas cher",
    "YR Car Location",
    "location voiture aéroport",
    "car rental Casablanca",
    "location longue durée Maroc",
    "voiture de location qualité",
    "location auto Maroc prix",
  ],
  authors: [{ name: "YR Car Location" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "YR Car Location",
    title: "YR Car Location - Location de voitures au Maroc",
    description: "Location de voiture au Maroc. Véhicules récents, prix compétitifs, service 24/7. Réservez maintenant!",
  },
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/apple-icon.png',
  },
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
    <html lang="fr" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
