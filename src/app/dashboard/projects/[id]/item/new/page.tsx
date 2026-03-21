'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export default function NewPunchItemPage() {
  const params = useParams()
  const projectId = params.id as string

  const [form, setForm] = useState({
    area: '',
    trade: 'electrical',
    description: '',
    priority: 'medium',
    assignedName: '',
    assignedEmail: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [token] = useState(() => Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2))

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    const completionUrl = typeof window !== 'undefined'
      ? `${window.location.origin}/complete/${token}`
      : `/complete/${token}`

    return (
      <div className="max-w-2xl mx-auto py-12 px-4">
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <div className="text-4xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-green-800 mb-2">Punch Item Created</h2>
          <p className="text-green-700 text-sm mb-6">
            Share this completion link with <strong>{form.assignedName || 'the subcontractor'}</strong>:
          </p>
          <div className="bg-white border border-green-300 rounded-lg p-4 mb-4 font-mono text-sm text-gray-700 break-all">
            {completionUrl}
          </div>
          <p className="text-green-600 text-xs mb-6">
            The sub can use this link to submit their work — no login required.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/dashboard/projects/${projectId}`}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors"
            >
              Back to Project
            </Link>
            <button
              onClick={() => setSubmitted(false)}
              className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium text-sm transition-colors"
            >
              Add Another Item
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/dashboard" className="hover:text-gray-900 transition-colors">Dashboard</Link>
        <span>/</span>
        <Link href={`/dashboard/projects/${projectId}`} className="hover:text-gray-900 transition-colors">
          Project
        </Link>
        <span>/</span>
        <span className="text-gray-900">Add Punch Item</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add Punch Item</h1>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-gray-200 rounded-xl p-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Area <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.area}
            onChange={e => setForm(p => ({ ...p, area: e.target.value }))}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. Exterior, Lobby, Floor 2, Penthouse"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trade <span className="text-red-500">*</span>
          </label>
          <select
            value={form.trade}
            onChange={e => setForm(p => ({ ...p, trade: e.target.value }))}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="electrical">Electrical</option>
            <option value="plumbing">Plumbing</option>
            <option value="painting">Painting</option>
            <option value="drywall">Drywall</option>
            <option value="flooring">Flooring</option>
            <option value="hvac">HVAC</option>
            <option value="glazing">Glazing</option>
            <option value="landscaping">Landscaping</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={form.description}
            onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Describe the deficiency in detail..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            value={form.priority}
            onChange={e => setForm(p => ({ ...p, priority: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="critical">Critical — blocks payment &amp; occupancy</option>
            <option value="high">High — blocks payment</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Sub Name</label>
            <input
              type="text"
              value={form.assignedName}
              onChange={e => setForm(p => ({ ...p, assignedName: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Company or contact name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sub Email</label>
            <input
              type="email"
              value={form.assignedEmail}
              onChange={e => setForm(p => ({ ...p, assignedEmail: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="sub@company.com"
            />
          </div>
        </div>

        <div className="pt-2 flex gap-3">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors"
          >
            Create Punch Item
          </button>
          <Link
            href={`/dashboard/projects/${projectId}`}
            className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-2.5 rounded-lg font-medium text-sm transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
