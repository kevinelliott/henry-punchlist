import Link from 'next/link'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { ArrowLeft, Plus, Mail, MapPin, User, Flag, ChevronRight, Share2 } from 'lucide-react'
import { STATUS_COLORS, PRIORITY_COLORS } from '@/lib/utils'

// Demo data
const demoJob = {
  id: 'job-1',
  title: 'Oak Street Renovation',
  address: '123 Oak St, Denver CO',
  client_name: 'John Smith',
  client_email: 'john@example.com',
  status: 'active',
  created_at: '2025-01-15',
  owner_token: 'demo-owner-token',
}

const demoItems = [
  {
    id: 'item-1',
    title: 'Fix garage door alignment',
    description: 'Door binds when opening. Needs adjustment on the spring tension.',
    category: 'Mechanical',
    priority: 'high' as const,
    status: 'approved' as const,
    assigned_to_email: 'mike@doorsco.com',
    due_date: '2025-02-01',
  },
  {
    id: 'item-2',
    title: 'Touch up paint in master bedroom',
    description: 'Several scuffs and nail holes to patch before final walk.',
    category: 'Finish Work',
    priority: 'medium' as const,
    status: 'completed' as const,
    assigned_to_email: 'abc@painting.com',
    due_date: '2025-02-05',
  },
  {
    id: 'item-3',
    title: 'Install backsplash tile',
    description: 'Kitchen backsplash still needs to be installed.',
    category: 'Tile',
    priority: 'critical' as const,
    status: 'in_progress' as const,
    assigned_to_email: 'tiles@works.com',
    due_date: '2025-01-28',
  },
  {
    id: 'item-4',
    title: 'Replace light fixture in hallway',
    description: 'Old fixture needs to be swapped out.',
    category: 'Electrical',
    priority: 'low' as const,
    status: 'open' as const,
    assigned_to_email: null,
    due_date: null,
  },
  {
    id: 'item-5',
    title: 'Caulk around master bath tub',
    description: 'Re-caulk where old caulk is cracking.',
    category: 'Plumbing',
    priority: 'medium' as const,
    status: 'open' as const,
    assigned_to_email: null,
    due_date: null,
  },
]

const statusLabel: Record<string, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  completed: 'Completed',
  approved: 'Approved',
  rejected: 'Rejected',
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const summary = {
    open: demoItems.filter(i => i.status === 'open').length,
    in_progress: demoItems.filter(i => i.status === 'in_progress').length,
    completed: demoItems.filter(i => i.status === 'completed').length,
    approved: demoItems.filter(i => i.status === 'approved').length,
  }

  return (
    <div>
      {/* Back + header */}
      <div className="mb-6">
        <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to jobs
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{demoJob.title}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
              {demoJob.address && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" /> {demoJob.address}
                </span>
              )}
              {demoJob.client_name && (
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" /> {demoJob.client_name}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="gap-1.5">
              <Share2 className="w-4 h-4" />
              Share portal
            </Button>
            <Link href={`/dashboard/jobs/${id}/items/new`}>
              <Button size="sm" className="gap-1.5">
                <Plus className="w-4 h-4" />
                Add item
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Open', value: summary.open, color: 'text-gray-700' },
          { label: 'In Progress', value: summary.in_progress, color: 'text-blue-600' },
          { label: 'Awaiting Approval', value: summary.completed, color: 'text-yellow-600' },
          { label: 'Approved', value: summary.approved, color: 'text-green-600' },
        ].map((s) => (
          <Card key={s.label}>
            <div className="px-5 py-4">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{s.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Invite banners */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-4">
          <Mail className="w-8 h-8 text-blue-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-blue-900 text-sm">Invite subcontractors</p>
            <p className="text-xs text-blue-700">They get a secure portal link — no account needed.</p>
          </div>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 flex-shrink-0">Invite</Button>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-4">
          <User className="w-8 h-8 text-green-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-green-900 text-sm">Homeowner portal</p>
            <p className="text-xs text-green-700">Share a link for {demoJob.client_name} to approve items.</p>
          </div>
          <Link href={`/portal/owner/${demoJob.owner_token}`} target="_blank">
            <Button size="sm" className="bg-green-600 hover:bg-green-700 flex-shrink-0">Open portal</Button>
          </Link>
        </div>
      </div>

      {/* Punch items */}
      <Card>
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="font-semibold text-gray-900">Punch Items ({demoItems.length})</h2>
          <div className="flex gap-2">
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">All statuses</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="approved">Approved</option>
            </select>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {demoItems.map((item) => (
            <Link key={item.id} href={`/dashboard/jobs/${id}/items/${item.id}`}>
              <div className="px-6 py-4 hover:bg-gray-50 transition-colors flex items-center gap-4 cursor-pointer">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-900 truncate">{item.title}</p>
                    {item.category && (
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded hidden sm:inline-block">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    {item.assigned_to_email ? (
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {item.assigned_to_email}
                      </span>
                    ) : (
                      <span className="text-gray-400 italic">Unassigned</span>
                    )}
                    {item.due_date && (
                      <span className="text-gray-400">Due {item.due_date}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 ${PRIORITY_COLORS[item.priority]}`}>
                    <Flag className="w-3 h-3" />
                    {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[item.status]}`}>
                    {statusLabel[item.status]}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  )
}
