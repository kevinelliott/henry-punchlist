'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewJob() {
  const { data: session } = useSession()
  const router = useRouter()
  const user = session?.user as any
  const [form, setForm] = useState({ name: '', address: '', homeowner_email: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (user?.role !== 'contractor') {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">Only contractors can create jobs.</div>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      const { id } = await res.json()
      router.push(`/jobs/${id}`)
    } else {
      setError('Failed to create job')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8">
          <h1 className="text-2xl font-bold text-white mb-1">Create New Job</h1>
          <p className="text-gray-400 text-sm mb-6">Set up a new construction job with its punch list</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1.5">Job Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="e.g. Riverside Kitchen Remodel"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1.5">Job Address</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="123 Main St, Portland OR 97201"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1.5">Homeowner Email</label>
              <input
                type="email"
                value={form.homeowner_email}
                onChange={(e) => setForm({ ...form, homeowner_email: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                placeholder="homeowner@example.com"
                required
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <div className="flex gap-3 pt-2">
              <Link
                href="/dashboard"
                className="flex-1 text-center bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                {loading ? 'Creating...' : 'Create Job'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
