import './globals.css'
import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'

import Footer from '@/components/footer'
import Navbar from '@/components/navbar'

const font = Space_Grotesk({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ECommerce store',
  description: 'Ecommerce store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  )
}
