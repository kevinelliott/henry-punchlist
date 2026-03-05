import { CheckSquare, Camera, MessageSquare, Clock, Flag, CheckCircle2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import { PRIORITY_COLORS, STATUS_COLORS } from '@/lib/utils'

// Demo data for subcontractor portal
const demoSub = {
  email: 'mike@doorsco.com',
  jobTitle: 'Oak Street Renovation',
  jobAddress: '123 Oak St, Denver CO',
}

const demoItems = [
  {
    id: 'item-1',
    title: 'Fix garage door alignment',
    description: 'Door binds when opening. Needs adjustment on the spring tension and possibly track realignment.',
    category: 'Mechanical',
    priority: 'high' as const,
    status: 'in_progress' as const,
    due_date: '2025-02-01',
    created_at: '2025-01-15',
  },
  {
    id: 'item-6',
    title: 'Lubricate all door hinges',
    description: 'Several interior door hinges are squeaking.',
    category: 'Mechanical',
    priority: 'low' as const,
    status: 'open' as const,
    due_date: null,
    created_at: '2025-01-16',
  },
]

const priorityLabel: Record<string, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
}

const statusLabel: Record<string, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  completed: 'Completed',
  approved: 'Approved',
  rejected: 'Rejected',
}

export default async function SubPortalPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-600 font-semibold">Invalid portal link.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
            <CheckSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-gray-900">PunchList Pro</p>
            <p className="text-xs text-gray-500">Subcontractor Portal</p>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Job info */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-6">
          <h1 className="text-xl font-bold text-gray-900 mb-1">{demoSub.jobTitle}</h1>
          <p className="text-gray-500 text-sm mb-4">{demoSub.jobAddress}</p>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-500">Viewing as: <strong className="text-gray-900">{demoSub.email}</strong></span>
            <span className="bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
              Subcontractor
            </span>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Assigned', value: demoItems.length, color: 'text-gray-900' },
            { label: 'In Progress', value: demoItems.filter(i => i.status === 'in_progress').length, color: 'text-blue-600' },
            { label: 'Completed', value: demoItems.filter(i => i.status === 'completed').length, color: 'text-green-600' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-200 px-4 py-3 text-center">
              <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Items */}
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Your Assigned Items</h2>
        <div className="space-y-4">
          {demoItems.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      {item.category && (
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{item.category}</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 ${PRIORITY_COLORS[item.priority]}`}>
                    <Flag className="w-3 h-3" />
                    {priorityLabel[item.priority]}
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[item.status]}`}>
                    {statusLabel[item.status]}
                  </span>
                  {item.due_date && (
                    <span className="text-xs text-gray-400 flex items-center gap-1 ml-auto">
                      <Clock className="w-3 h-3" />
                      Due {item.due_date}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  <Button size="sm" className="gap-1.5 flex-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Mark Complete
                  </Button>
                  <Button variant="secondary" size="sm" className="gap-1.5">
                    <Camera className="w-4 h-4" />
                    Add Photo
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1.5">
                    <MessageSquare className="w-4 h-4" />
                    Comment
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          This portal is secured with a unique link. Powered by PunchList Pro.
        </p>
      </div>
    </div>
  )
}
