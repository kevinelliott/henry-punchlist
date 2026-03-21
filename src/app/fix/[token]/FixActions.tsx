'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PunchItem } from '@/types'

interface Props {
  item: PunchItem
  token: string
  isDemo: boolean
}

export default function FixActions({ item, token, isDemo }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)
  const [showResolveForm, setShowResolveForm] = useState(false)
  const [showFlagForm, setShowFlagForm] = useState(false)
  const [resolvedBy, setResolvedBy] = useState('')
  const [notes, setNotes] = useState('')
  const [flagNotes, setFlagNotes] = useState('')
  const [error, setError] = useState('')
  const [demoMsg, setDemoMsg] = useState('')

  async function callAction(action: string, body?: Record<string, string>) {
    if (isDemo) {
      setDemoMsg(`Demo mode: "${action}" action acknowledged but not saved.`)
      setTimeout(() => setDemoMsg(''), 3000)
      return
    }

    setLoading(action)
    setError('')

    try {
      const res = await fetch(`/api/fix/${token}/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Something went wrong.')
      } else {
        router.refresh()
      }
    } catch {
      setError('Network error. Please try again.')
    }

    setLoading(null)
  }

  async function handleAcknowledge() {
    await callAction('acknowledge')
  }

  async function handleInProgress() {
    await callAction('in-progress')
  }

  async function handleResolve(e: React.FormEvent) {
    e.preventDefault()
    await callAction('resolve', { resolved_by: resolvedBy, notes })
    setShowResolveForm(false)
  }

  async function handleFlag(e: React.FormEvent) {
    e.preventDefault()
    await callAction('flag', { notes: flagNotes })
    setShowFlagForm(false)
  }

  if (item.status === 'resolved' || item.status === 'rejected') {
    return null
  }

  return (
    <div className="space-y-3">
      {demoMsg && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
          {demoMsg}
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Acknowledge button — show if open */}
      {item.status === 'open' && (
        <button
          onClick={handleAcknowledge}
          disabled={loading === 'acknowledge'}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-4 px-6 rounded-xl font-bold text-lg transition-colors"
        >
          {loading === 'acknowledge' ? 'Updating...' : '👍 Acknowledge — I See This'}
        </button>
      )}

      {/* In Progress button — show if open or acknowledged */}
      {(item.status === 'open' || item.status === 'acknowledged') && (
        <button
          onClick={handleInProgress}
          disabled={loading === 'in-progress'}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-4 px-6 rounded-xl font-bold text-lg transition-colors"
        >
          {loading === 'in-progress' ? 'Updating...' : '🔧 Mark In Progress'}
        </button>
      )}

      {/* Resolve button — show if acknowledged or in-progress */}
      {(item.status === 'acknowledged' || item.status === 'in-progress' || item.status === 'open') && (
        <>
          {!showResolveForm ? (
            <button
              onClick={() => { setShowResolveForm(true); setShowFlagForm(false) }}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-colors"
            >
              ✅ Mark Resolved — Work Complete
            </button>
          ) : (
            <form
              onSubmit={handleResolve}
              className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-3"
            >
              <h3 className="font-bold text-green-800 text-lg">Mark as Resolved</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={resolvedBy}
                  onChange={(e) => setResolvedBy(e.target.value)}
                  required
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g. Mike Johnson"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Resolution Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Describe what was done..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading === 'resolve'}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white py-3 px-4 rounded-lg font-bold text-base transition-colors"
                >
                  {loading === 'resolve' ? 'Saving...' : 'Confirm Resolved'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowResolveForm(false)}
                  className="px-4 py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </>
      )}

      {/* Flag Issue button */}
      {(item.status === 'in-progress' || item.status === 'acknowledged' || item.status === 'open') && (
        <>
          {!showFlagForm ? (
            <button
              onClick={() => { setShowFlagForm(true); setShowResolveForm(false) }}
              className="w-full border-2 border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-800 py-3 px-6 rounded-xl font-semibold transition-colors"
            >
              🚩 Flag an Issue
            </button>
          ) : (
            <form
              onSubmit={handleFlag}
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3"
            >
              <h3 className="font-bold text-gray-800 text-lg">Flag an Issue</h3>
              <p className="text-sm text-gray-500">Describe the problem that prevents you from completing this work.</p>
              <div>
                <textarea
                  value={flagNotes}
                  onChange={(e) => setFlagNotes(e.target.value)}
                  required
                  rows={3}
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-gray-400"
                  placeholder="e.g. Need access to unit, missing materials, conflict with other trade..."
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading === 'flag'}
                  className="flex-1 bg-gray-700 hover:bg-gray-800 disabled:opacity-50 text-white py-3 px-4 rounded-lg font-bold text-base transition-colors"
                >
                  {loading === 'flag' ? 'Submitting...' : 'Submit Flag'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowFlagForm(false)}
                  className="px-4 py-3 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  )
}
