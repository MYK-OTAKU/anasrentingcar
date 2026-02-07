import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const _inter = Inter({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://rentcaranas.ma'),
  title: {
    default: "Rent Car Anas - Location de voitures au Maroc | Prix compétitifs",
    template: "%s | Rent Car Anas",
  },
  description:
    "Location de voiture au Maroc avec Rent Car Anas. Véhicules récents à prix compétitifs. Service 24/7, assurance complète. Aéroport Mohammed V Casablanca. Réservez maintenant!",
  keywords: [
    "location voiture Maroc",
    "location voiture Casablanca",
    "rental car Morocco",
    "location véhicule pas cher",
    "Rent Car Anas",
    "location voiture aéroport",
    "car rental Casablanca",
    "location longue durée Maroc",
    "voiture de location qualité",
    "location auto Maroc prix",
    "rent a car Morocco",
    "car hire Casablanca",
    "location voiture Rabat",
    "location voiture Marrakech",
    "استئجار سيارة المغرب",
  ],
  authors: [{ name: "Rent Car Anas" }],
  creator: "Rent Car Anas",
  publisher: "Rent Car Anas",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://rentcaranas.ma',
    languages: {
      'en': 'https://rentcaranas.ma/en',
      'ar': 'https://rentcaranas.ma/ar',
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: 'https://rentcaranas.ma',
    siteName: "Rent Car Anas",
    title: "Rent Car Anas - Location de voitures au Maroc",
    description: "Location de voiture au Maroc. Véhicules récents, prix compétitifs, service 24/7. Réservez maintenant!",
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Rent Car Anas Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rent Car Anas - Location de voitures au Maroc',
    description: 'Location de voiture au Maroc. Véhicules récents, prix compétitifs, service 24/7.',
    images: ['/logo.png'],
  },
  verification: {
    // À remplir après création des comptes
    google: 'google-site-verification-code',
    // yandex: 'yandex-verification-code',
    // bing: 'bing-verification-code',
  },
  category: 'business',
  generator: 'Next.js',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png' },
      { url: '/icon-light.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark.png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: "#5D7CA6", // Bleu Acier - Couleur principale de la marque
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
