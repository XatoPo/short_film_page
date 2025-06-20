import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Donde nacen los barcos",
  description: "Documental sobre la tradición en la construcción naval tradicional en el Perú.",
  keywords: ["short film", "documentary", "Peru", "traditional shipbuilding", "naval tradition"],
  authors: [{ name: "Flavio Villanueva", url: "https://shortfilmpage.netlify.app/" }],
  creator: "Flavio Villanueva",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-documentary-sand">{children}</body>
    </html>
  )
}
