'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, CheckSquare } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <CheckSquare className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg">PunchList Pro</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
            <Link href="/docs" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Docs
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="secondary" size="sm">Sign in</Button>
            </Link>
            <Link href="/pricing">
              <Button size="sm">Get started</Button>
            </Link>
          </div>

          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/features" className="block py-2 text-gray-600">Features</Link>
            <Link href="/pricing" className="block py-2 text-gray-600">Pricing</Link>
            <Link href="/docs" className="block py-2 text-gray-600">Docs</Link>
            <Link href="/dashboard">
              <Button variant="secondary" size="sm" className="w-full mt-2">Sign in</Button>
            </Link>
            <Link href="/pricing">
              <Button size="sm" className="w-full mt-2">Get started</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
