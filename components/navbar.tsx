'use client'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { HardHat, LogOut, LayoutDashboard } from 'lucide-react'

const ROLE_BADGE: Record<string, string> = {
  contractor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  subcontractor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  homeowner: 'bg-green-500/20 text-green-400 border-green-500/30',
}

export default function Navbar() {
  const { data: session } = useSession()
  const user = session?.user as any

  return (
    <nav className="bg-gray-800 border-b border-gray-700 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="bg-orange-500 p-1.5 rounded-lg">
            <HardHat className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-lg">PunchList Pro</span>
        </Link>

        {user && (
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors hidden sm:flex items-center gap-1.5 text-sm">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <div className={`hidden sm:inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-medium ${ROLE_BADGE[user.role] || ''}`}>
              {user.role}
            </div>
            <span className="text-gray-300 text-sm hidden sm:block">{user.name}</span>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Sign out</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
