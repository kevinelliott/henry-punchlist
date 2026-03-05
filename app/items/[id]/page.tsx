'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import Navbar from '@/components/navbar'
import StatusBadge from '@/components/status-badge'
import { ArrowLeft, User, MessageSquare, Clock } from 'lucide-react'
import Link from 'next/link'

interface ItemData {
  item: any
  comments: any[]
  subs: any[]
}

const STATUS_ACTIONS: Record<string, { label: string; next: string; color: string }[]> = {
  contractor: [
    { label: 'Mark In Progress', next: 'in-progress', color: 'bg-blue-600 hover:bg-blue-700' },
    { label: 'Mark Complete', next: 'completed', color: 'bg-yellow-600 hover:bg-yellow-700' },
  ],
  subcontractor: [
    { label: 'Start Working', next: 'in-progress', color: 'bg-blue-600 hover:bg-blue-700' },
    { label: 'Mark Complete', next: 'completed', color: 'bg-yellow-600 hover:bg-yellow-700' },
  ],
  homeowner: [
    { label: '✓ Approve Item', next: 'approved', color: 'bg-green-600 hover:bg-green-700' },
  ],
}

export default function ItemPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const [data, setData] = useState<ItemData | null>(null)
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')
  const [saving, setSaving] = useState(false)
  const [assignTo, setAssignTo] = useState('')
  const user = session?.user as any

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/')
  }, [status, router])

  const loadData = () => {
    fetch(`/api/items/${params.id}`)
      .then((r) => r.json())
      .then((d) => {
        setData(d)
        setAssignTo(d.item?.assigned_to || '')
        setLoading(false)
      })
  }

  useEffect(() => {
    if (status === 'authenticated') loadData()
  }, [status, params.id])

  const updateItem = async (body: object) => {
    setSaving(true)
    await fetch(`/api/items/${params.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    setSaving(false)
    loadData()
  }

  const handleStatusChange = (next: string) => {
    updateItem({ status: next, comment: `Status changed to ${next}` })
  }

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (!comment.trim()) return
    updateItem({ comment: comment.trim() })
    setComment('')
  }

  const handleAssign = () => {
    updateItem({ assigned_to: assignTo || null })
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

  const { item, comments, subs } = data
  const actions = STATUS_ACTIONS[user?.role] || []
  const validActions = actions.filter((a) => a.next !== item.status)

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back */}
        <Link href={`/jobs/${item.job_id}`} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to Job
        </Link>

        {/* Item header */}
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 mb-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h1 className="text-xl font-bold text-white flex-1">{item.title}</h1>
            <StatusBadge status={item.status} />
          </div>

          {item.description && (
            <p className="text-gray-300 mb-4">{item.description}</p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-5">
            {item.assigned_name && (
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                Assigned to <span className="text-white">{item.assigned_name}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              Created {new Date(item.created_at).toLocaleDateString()}
            </div>
          </div>

          {/* Status actions */}
          {validActions.length > 0 && item.status !== 'approved' && (
            <div className="flex flex-wrap gap-2 mb-5">
              {validActions.map((action) => (
                <button
                  key={action.next}
                  onClick={() => handleStatusChange(action.next)}
                  disabled={saving}
                  className={`${action.color} disabled:opacity-50 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}

          {item.status === 'approved' && (
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-lg px-4 py-2.5 text-green-400 text-sm">
              ✅ This item has been approved by the homeowner
            </div>
          )}

          {/* Assign sub (contractor only) */}
          {user?.role === 'contractor' && (
            <div className="border-t border-gray-700 pt-5 mt-2">
              <div className="flex items-center gap-2">
                <select
                  value={assignTo}
                  onChange={(e) => setAssignTo(e.target.value)}
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-500"
                >
                  <option value="">Unassigned</option>
                  {subs.map((s: any) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <button
                  onClick={handleAssign}
                  disabled={saving}
                  className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  {saving ? 'Saving...' : 'Assign'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Comments */}
        <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-5">
            <MessageSquare className="w-5 h-5 text-gray-400" />
            <h2 className="text-white font-semibold">Comments</h2>
            <span className="text-gray-500 text-sm">({comments.length})</span>
          </div>

          <div className="space-y-4 mb-5">
            {comments.length === 0 && (
              <div className="text-gray-500 text-sm text-center py-4">No comments yet</div>
            )}
            {comments.map((c: any) => (
              <div key={c.id} className="flex gap-3">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0">
                  {c.author_name?.[0] || '?'}
                </div>
                <div className="flex-1 bg-gray-750 rounded-xl p-3 border border-gray-700">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white text-sm font-medium">{c.author_name}</span>
                    <span className="text-gray-500 text-xs capitalize">{c.author_role}</span>
                    <span className="text-gray-500 text-xs ml-auto">{new Date(c.created_at).toLocaleString()}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{c.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Add comment */}
          <form onSubmit={handleComment} className="flex gap-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 text-sm"
              placeholder="Add a comment..."
            />
            <button
              type="submit"
              disabled={!comment.trim() || saving}
              className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors text-sm"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
