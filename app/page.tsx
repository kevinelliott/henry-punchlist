'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { HardHat, AlertCircle } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      setError('Invalid email or password')
      setLoading(false)
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="bg-orange-500 p-2 rounded-lg">
            <HardHat className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-xl">PunchList Pro</h1>
            <p className="text-gray-400 text-xs">Construction Punch List Manager</p>
          </div>
        </div>
      </div>

      {/* Hero + Login */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Hero */}
        <div className="flex-1 flex flex-col justify-center px-8 py-12 md:px-16">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-orange-400 text-sm font-medium">Built for the job site</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Keep your punch list <span className="text-orange-500">moving</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Connect contractors, subcontractors, and homeowners on one platform. 
              Track every item from open to approved — no clipboards, no confusion.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { role: 'Contractor', desc: 'Create & assign', icon: '🏗️' },
                { role: 'Subcontractor', desc: 'Complete items', icon: '🔧' },
                { role: 'Homeowner', desc: 'Review & approve', icon: '🏠' },
              ].map((r) => (
                <div key={r.role} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                  <div className="text-2xl mb-2">{r.icon}</div>
                  <div className="text-white font-semibold text-sm">{r.role}</div>
                  <div className="text-gray-500 text-xs">{r.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="flex items-center justify-center px-8 py-12 md:px-16">
          <div className="w-full max-w-md">
            <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8">
              <h3 className="text-white text-2xl font-bold mb-2">Sign in</h3>
              <p className="text-gray-400 text-sm mb-6">Access your punch lists</p>

              {error && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 mb-4">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span className="text-red-400 text-sm">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-gray-500 text-xs mb-2 font-medium uppercase tracking-wide">Demo accounts</p>
                <div className="space-y-1 text-xs text-gray-400">
                  <div>contractor@test.com · sub1@test.com · owner@test.com</div>
                  <div className="text-gray-500">All use: password123</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
