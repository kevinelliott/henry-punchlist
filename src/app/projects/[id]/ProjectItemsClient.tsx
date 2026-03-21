'use client'

import { useState } from 'react'
import { Project, PunchItem, Priority } from '@/types'
import PriorityBadge from '@/components/PriorityBadge'
import StatusBadge from '@/components/StatusBadge'
import { supabase } from '@/lib/supabase'

interface Props {
  project: Project
  initialItems: PunchItem[]
}

export default function ProjectItemsClient({ project, initialItems }: Props) {
  const [items, setItems] = useState<PunchItem[]>(initialItems)
  const [filterTrade, setFilterTrade] = useState('')
  const [filterPriority, setFilterPriority] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)
  const [copiedToken, setCopiedToken] = useState<string | null>(null)
  const [addError, setAddError] = useState('')
  const [addLoading, setAddLoading] = useState(false)

  const [newItem, setNewItem] = useState({
    description: '',
    location: '',
    trade: '',
    assigned_to: '',
    assigned_email: '',
    priority: 'normal' as Priority,
  })

  const isDemo = project.id === 'demo'

  // Get unique trades for filter
  const trades = Array.from(new Set(items.map((i) => i.trade).filter(Boolean))) as string[]

  const filtered = items.filter((item) => {
    if (filterTrade && item.trade !== filterTrade) return false
    if (filterPriority && item.priority !== filterPriority) return false
    if (filterStatus && item.status !== filterStatus) return false
    return true
  })

  async function copyLink(token: string) {
    const url = `${window.location.origin}/fix/${token}`
    await navigator.clipboard.writeText(url)
    setCopiedToken(token)
    setTimeout(() => setCopiedToken(null), 2000)
  }

  async function handleAddItem(e: React.FormEvent) {
    e.preventDefault()
    if (isDemo) return

    setAddError('')
    setAddLoading(true)

    const nextNumber = items.length > 0 ? Math.max(...items.map((i) => i.item_number)) + 1 : 1

    const payload = {
      project_id: project.id,
      item_number: nextNumber,
      description: newItem.description,
      location: newItem.location || null,
      trade: newItem.trade || null,
      assigned_to: newItem.assigned_to || null,
      assigned_email: newItem.assigned_email || null,
      priority: newItem.priority,
      status: 'open',
    }

    const { data, error } = await supabase.from('punch_items').insert([payload]).select().single()

    if (error) {
      setAddError(error.message)
    } else {
      setItems((prev) => [...prev, data as PunchItem])
      setNewItem({ description: '', location: '', trade: '', assigned_to: '', assigned_email: '', priority: 'normal' })
      setShowAddForm(false)
    }
    setAddLoading(false)
  }

  return (
    <div>
      {/* Filter Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
        <div className="flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            <select
              value={filterTrade}
              onChange={(e) => setFilterTrade(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
            >
              <option value="">All Trades</option>
              {trades.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
            >
              <option value="">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
            >
              <option value="">All Statuses</option>
              <option value="open">Open</option>
              <option value="acknowledged">Acknowledged</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {!isDemo && (
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-[#ea580c] hover:bg-orange-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
            >
              {showAddForm ? '✕ Cancel' : '+ Add Item'}
            </button>
          )}
        </div>
      </div>

      {/* Add Item Form */}
      {showAddForm && !isDemo && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-[#1e293b] mb-3">Add Punch Item</h3>
          <form onSubmit={handleAddItem} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={newItem.description}
                onChange={(e) => setNewItem((p) => ({ ...p, description: e.target.value }))}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
                placeholder="Describe the issue"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={newItem.location}
                  onChange={(e) => setNewItem((p) => ({ ...p, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
                  placeholder="e.g. Unit 204"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Trade</label>
                <input
                  type="text"
                  value={newItem.trade}
                  onChange={(e) => setNewItem((p) => ({ ...p, trade: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
                  placeholder="e.g. electrical"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={newItem.priority}
                  onChange={(e) => setNewItem((p) => ({ ...p, priority: e.target.value as Priority }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Assigned To</label>
                <input
                  type="text"
                  value={newItem.assigned_to}
                  onChange={(e) => setNewItem((p) => ({ ...p, assigned_to: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
                  placeholder="Sub company name"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newItem.assigned_email}
                  onChange={(e) => setNewItem((p) => ({ ...p, assigned_email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#ea580c]"
                  placeholder="sub@company.com"
                />
              </div>
            </div>
            {addError && (
              <p className="text-sm text-red-600">{addError}</p>
            )}
            <button
              type="submit"
              disabled={addLoading}
              className="bg-[#ea580c] hover:bg-orange-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              {addLoading ? 'Adding...' : 'Add Punch Item'}
            </button>
          </form>
        </div>
      )}

      {/* Items Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <div className="text-3xl mb-3">📋</div>
            <p className="font-medium">No items match the current filters</p>
            <p className="text-sm mt-1">Try clearing filters or add a new punch item.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-12">#</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Location</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Description</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Trade</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Assigned To</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Priority</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  <th className="px-4 py-3 w-24"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-400 font-semibold">
                      #{item.item_number}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs max-w-[120px]">
                      {item.location || <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-800 max-w-[280px]">
                      <div className="line-clamp-2">{item.description}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs capitalize">
                      {item.trade || <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs max-w-[120px]">
                      {item.assigned_to || <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      <PriorityBadge priority={item.priority} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => copyLink(item.fix_token)}
                        className="text-xs text-[#ea580c] hover:text-orange-700 font-medium transition-colors whitespace-nowrap"
                      >
                        {copiedToken === item.fix_token ? '✓ Copied!' : 'Copy Link'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400 mt-3">
        Showing {filtered.length} of {items.length} items
        {isDemo && (
          <span className="ml-2 text-amber-600">
            — Demo mode.{' '}
            <a href="/auth/signup" className="underline">Create a free account</a> to manage your own projects.
          </span>
        )}
      </p>
    </div>
  )
}
