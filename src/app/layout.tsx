import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Nav from '@/components/nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PunchList — Construction Punch List Management',
  description: 'Track every punch item from final walk to verified close. Final payment and occupancy stay blocked until your list hits zero.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white min-h-screen`}>
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  )
}
