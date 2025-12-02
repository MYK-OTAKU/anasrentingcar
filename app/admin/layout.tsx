import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Administration",
    template: "%s | Admin YR Location",
  },
  robots: "noindex, nofollow",
}

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
