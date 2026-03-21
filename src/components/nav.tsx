import Link from "next/link"

export default function Nav() {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">📋</span>
            <span className="text-gray-900 font-bold text-xl">PunchList</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/features" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              Features
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              Pricing
            </Link>
            <Link href="/docs" className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors">
              Docs
            </Link>
            <Link
              href="/dashboard"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
