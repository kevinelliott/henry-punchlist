'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import StatusBadge from '@/components/status-badge'
import { ArrowLeft, Plus, MapPin, User, ChevronRight } from 'lucide-react'

interface PunchItem {
  id: string
  title: string
  description: string
  assigned_to: string | null
  assigned_name: string | null
  status: string
  created_at: string
}

interface Sub {
  id: string
  name: string
  email: string
}

interface JobData {
  job: any
  items: PunchItem[]
  subs: Sub[]
}

export default function JobPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const [data, setData] = useState<JobData | null>(null)
  const [loading, setLoading] = useState(true)
  const [showAddItem, setShowAddItem] = useState(false)
  const [newItem, setNewItem] = useState({ title: '', description: '', assigned_to: '' })
  const [saving, setSaving] = useState(false)
  const user = session?.user as any

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/')
  }, [status, router])

  const loadData = () => {
    fetch(`/api/jobs/${params.id}`)
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false) })
  }

  useEffect(() => {
    if (status === 'authenticated') loadData()
  }, [status, params.id])

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    await fetch(`/api/jobs/${params.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    })
    setNewItem({ title: '', description: '', assigned_to: '' })
    setShowAddItem(false)
    setSaving(false)
    loadData()
  }

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">Loading...</div>
        </div>
      </div>
    )
  }

  const { job, items, subs } = data
  const total = items.length
  const approved = items.filter(i => i.status === 'approved').length
  const pct = total > 0 ? Math.round((approved / total) * 100) : 0

  const statusGroups = [
    { label: 'Open', status: 'open', items: items.filter(i => i.status === 'open') },
    { label: 'In Progress', status: 'in-progress', items: items.filter(i => i.status === 'in-progress') },
    { label: 'Completed', status: 'completed', items: items.filter(i => i.status === 'completed') },
    { label: 'Approved', status: 'approved', items: items.filter(i => i.status === 'approved') },
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back */}
        <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Job header */}
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 mb-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">{job.name}</h1>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <MapPin className="w-3.5 h-3.5" />
                {job.address}
              </div>
            </div>
            <StatusBadge status={job.status} />
          </div>

          {/* Progress */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-gray-400">Progress</span>
                <span className="text-white font-medium">{approved}/{total} approved</span>
              </div>
              <div className="bg-gray-700 rounded-full h-3">
                <div
                  className="bg-orange-500 h-3 rounded-full transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
            <div className="text-2xl font-bold text-orange-400">{pct}%</div>
          </div>
        </div>

        {/* Add item button */}
        {user?.role === 'contractor' && (
          <div className="mb-6">
            {!showAddItem ? (
              <button
                onClick={() => setShowAddItem(true)}
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Punch Item
              </button>
            ) : (
              <div className="bg-gray-800 rounded-xl border border-orange-500/50 p-5">
                <h3 className="text-white font-semibold mb-4">New Punch Item</h3>
                <form onSubmit={handleAddItem} className="space-y-3">
                  <input
                    type="text"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                    placeholder="Item title"
                    required
                    autoFocus
                  />
                  <textarea
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 resize-none"
                    placeholder="Description (optional)"
                    rows={2}
                  />
                  <select
                    value={newItem.assigned_to}
                    onChange={(e) => setNewItem({ ...newItem, assigned_to: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="">Unassigned</option>
                    {subs.map((s) => (
                      <option key={s.id} value={s.id}>{s.name} ({s.email})</option>
                    ))}
                  </select>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setShowAddItem(false)} className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg transition-colors">Cancel</button>
                    <button type="submit" disabled={saving} className="flex-1 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white py-2 rounded-lg transition-colors">
                      {saving ? 'Adding...' : 'Add Item'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Items grouped by status */}
        <div className="space-y-6">
          {statusGroups.map((group) => {
            if (group.items.length === 0) return null
            return (
              <div key={group.status}>
                <div className="flex items-center gap-2 mb-3">
                  <StatusBadge status={group.status} />
                  <span className="text-gray-500 text-sm">({group.items.length})</span>
                </div>
                <div className="space-y-2">
                  {group.items.map((item) => (
                    <Link
                      key={item.id}
                      href={`/items/${item.id}`}
                      className="flex items-center justify-between bg-gray-800 hover:bg-gray-750 rounded-xl border border-gray-700 hover:border-orange-500/40 px-5 py-4 transition-all group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-medium group-hover:text-orange-400 transition-colors truncate">{item.title}</div>
                        {item.description && (
                          <div className="text-gray-400 text-sm mt-0.5 truncate">{item.description}</div>
                        )}
                        {item.assigned_name && (
                          <div className="flex items-center gap-1 text-gray-500 text-xs mt-1">
                            <User className="w-3 h-3" />
                            {item.assigned_name}
                          </div>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-orange-400 transition-colors shrink-0 ml-3" />
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {items.length === 0 && (
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-10 text-center">
            <div className="text-3xl mb-3">📋</div>
            <div className="text-white font-semibold">No punch items yet</div>
            {user?.role === 'contractor' && (
              <div className="text-gray-400 text-sm mt-1">Add your first item to get started</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
