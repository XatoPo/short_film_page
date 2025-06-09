import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Short Film',
  description: 'Documentary about the making of a short film',
  keywords: ['short film', 'documentary', 'making of', 'behind the scenes'],
  authors: [{ name: 'Your Name', url: 'https://yourwebsite.com' }],
  creator: 'Flavio Villanueva',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-[#1D37F5]">{children}</body>
    </html>
  )
}
