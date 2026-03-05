import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-indigo-600 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Page not found</h2>
        <p className="text-gray-500 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/">
          <Button>Back to home</Button>
        </Link>
      </div>
    </div>
  )
}
