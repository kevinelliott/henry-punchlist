import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Henry Punchlist — Construction Punchlist Management',
  description: 'Gate retainage release on punch item resolution. Built for GCs and project owners.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <nav className="bg-[#1e293b] border-b border-slate-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[#ea580c] rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">HP</span>
                </div>
                <span className="text-white font-bold text-lg tracking-tight">
                  Henry <span className="text-[#ea580c]">Punchlist</span>
                </span>
              </Link>
              <div className="flex items-center gap-4">
                <Link href="/projects/demo" className="text-slate-300 hover:text-white text-sm transition-colors">
                  Demo
                </Link>
                <Link href="/pricing" className="text-slate-300 hover:text-white text-sm transition-colors">
                  Pricing
                </Link>
                <Link href="/dashboard" className="text-slate-300 hover:text-white text-sm transition-colors">
                  Dashboard
                </Link>
                <Link
                  href="/auth/login"
                  className="bg-[#ea580c] hover:bg-orange-700 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}
