'use client'

import { useState } from 'react'

interface Props {
  token: string
  isDemo: boolean
}

export default function CompletionForm({ token, isDemo }: Props) {
  const [form, setForm] = useState({
    subName: '',
    company: '',
    workDescription: '',
    photoFilenames: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (isDemo) {
      setSubmitted(true)
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/complete/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Submission failed. Please try again.')
      } else {
        setSubmitted(true)
      }
    } catch {
      setError('Network error. Please try again.')
    }
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h2 className="text-xl font-bold text-green-800 mb-2">Work Submitted for Verification</h2>
        <p className="text-green-700 text-sm">
          The GC has been notified and will verify your work. You&apos;ll receive confirmation once approved.
        </p>
        {isDemo && (
          <p className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded p-2">
            Demo mode — this submission was not saved.
          </p>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
      <h2 className="font-bold text-gray-900 text-lg mb-1">Submit Work for Verification</h2>
      <p className="text-gray-500 text-sm mb-4">
        Fill out the details below to submit your work. The GC will review and verify.
      </p>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Your Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.subName}
          onChange={e => setForm(p => ({ ...p, subName: e.target.value }))}
          required
          className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g. Mike Johnson"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Company <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.company}
          onChange={e => setForm(p => ({ ...p, company: e.target.value }))}
          required
          className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="e.g. Bay Electric LLC"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Work Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={form.workDescription}
          onChange={e => setForm(p => ({ ...p, workDescription: e.target.value }))}
          required
          rows={4}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Describe what was done to complete this punch item..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Photo Filenames <span className="text-gray-400 font-normal">(comma-separated)</span>
        </label>
        <input
          type="text"
          value={form.photoFilenames}
          onChange={e => setForm(p => ({ ...p, photoFilenames: e.target.value }))}
          className="w-full px-3 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="photo1.jpg, photo2.jpg"
        />
        <p className="text-xs text-gray-400 mt-1">List the filenames of photos documenting your work.</p>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white py-4 px-6 rounded-xl font-bold text-lg transition-colors"
      >
        {loading ? 'Submitting...' : 'Submit for Verification'}
      </button>
    </form>
  )
}
