'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function NewProjectPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    address: '',
    owner_name: '',
    general_contractor: '',
    retainage_amount: '',
    status: 'walkthrough',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      setError('You must be signed in to create a project.')
      setLoading(false)
      return
    }

    const payload = {
      name: form.name,
      address: form.address || null,
      owner_name: form.owner_name || null,
      general_contractor: form.general_contractor || null,
      retainage_amount: form.retainage_amount ? parseFloat(form.retainage_amount) : null,
      status: form.status,
      user_id: user.id,
    }

    const { data, error: dbError } = await supabase.from('projects').insert([payload]).select().single()

    if (dbError) {
      setError(dbError.message)
      setLoading(false)
    } else {
      router.push(`/projects/${data.id}`)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="mb-6">
        <Link href="/dashboard" className="text-sm text-gray-500 hover:text-[#ea580c] transition-colors">
          ← Back to Dashboard
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-[#1e293b] mb-1">New Project</h1>
        <p className="text-gray-500 text-sm mb-6">Create a new construction project to track punch items.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
              placeholder="e.g. Harbor Point Mixed-Use Development"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Address
            </label>
            <input
              name="address"
              type="text"
              value={form.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
              placeholder="e.g. 1247 Harbor Blvd, San Pedro, CA 90731"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Owner Name
              </label>
              <input
                name="owner_name"
                type="text"
                value={form.owner_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                placeholder="e.g. Harbor Point LLC"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                General Contractor
              </label>
              <input
                name="general_contractor"
                type="text"
                value={form.general_contractor}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                placeholder="e.g. Pacific Coast Construction"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Retainage Amount ($)
              </label>
              <input
                name="retainage_amount"
                type="number"
                step="0.01"
                min="0"
                value={form.retainage_amount}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
                placeholder="e.g. 180000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ea580c] focus:border-transparent"
              >
                <option value="walkthrough">Walkthrough</option>
                <option value="punchlist">Punchlist</option>
                <option value="active">Active</option>
                <option value="signed-off">Signed Off</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#ea580c] hover:bg-orange-700 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              {loading ? 'Creating...' : 'Create Project'}
            </button>
            <Link
              href="/dashboard"
              className="px-6 py-2.5 rounded-lg font-medium text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
