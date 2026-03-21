'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const isPlaceholder =
    process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://placeholder.supabase.co' ||
    !process.env.NEXT_PUBLIC_SUPABASE_URL

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (isPlaceholder) {
      setError('Auth is not configured. Set up Supabase credentials to enable sign up.')
      setLoading(false)
      return
    }

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4">
        <div className="max-w-md w-full mx-auto text-center">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="text-4xl mb-4">📬</div>
            <h2 className="text-xl font-bold text-[#1e293b] mb-2">Check your email</h2>
            <p className="text-gray-500 text-sm">
              We sent a confirmation link to <strong>{email}</strong>. Click it to activate your account.
            </p>
            <Link
              href="/auth/login"
              className="mt-6 inline-block text-[#ea580c] hover:text-orange-700 text-sm font-medium"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-[#ea580c] rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">HP</span>
            </div>
            <span className="text-[#1e293b] font-bold text-xl">Henry Punchlist</span>
          </Link>
          <h1 className="text-2xl font-bold text-[#1e293b]">Create your free account</h1>
          <p className="text-gray-500 mt-2">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-[#ea580c] hover:text-orange-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {isPlaceholder && (
            <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
              <strong>Demo mode:</strong> Supabase credentials not configured. Auth won&apos;t work without real credentials, but you can{' '}
              <Link href="/projects/demo" className="underline font-medium">view the demo project</Link>.
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                placeholder="Min 8 characters"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#ea580c] hover:bg-orange-700 disabled:opacity-50 text-white py-2.5 px-4 rounded-lg font-medium transition-colors"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-400">
            Free plan: 1 project, 20 items. No credit card required.
          </p>
        </div>
      </div>
    </div>
  )
}
