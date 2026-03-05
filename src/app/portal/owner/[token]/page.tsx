import { CheckSquare, ThumbsUp, ThumbsDown, CheckCircle, XCircle } from 'lucide-react'
import Button from '@/components/ui/Button'

// Demo data for homeowner portal
const demoJob = {
  title: 'Oak Street Renovation',
  address: '123 Oak St, Denver CO',
  client_name: 'John Smith',
  contractor: 'Apex Construction Co.',
}

const demoItems = [
  {
    id: 'item-1',
    title: 'Fix garage door alignment',
    description: 'Door binds when opening. Needs adjustment on the spring tension.',
    category: 'Mechanical',
    status: 'completed' as const,
    completed_note: 'Adjusted spring tension and realigned track. Door opens smoothly.',
    photos: 2,
  },
  {
    id: 'item-2',
    title: 'Touch up paint in master bedroom',
    description: 'Several scuffs and nail holes patched and painted.',
    category: 'Finish Work',
    status: 'approved' as const,
    completed_note: 'All scuffs patched, sanded, and painted to match.',
    photos: 3,
  },
  {
    id: 'item-3',
    title: 'Caulk around master bath tub',
    description: 'Re-caulked where old caulk was cracking.',
    category: 'Plumbing',
    status: 'completed' as const,
    completed_note: 'Removed old caulk and applied fresh bead.',
    photos: 1,
  },
]

const completedItems = demoItems.filter(i => i.status === 'completed')
const approvedItems = demoItems.filter(i => i.status === 'approved')

export default async function OwnerPortalPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-600 font-semibold">Invalid portal link.</p>
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
            <p className="text-xs text-gray-500">Homeowner Portal</p>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Welcome */}
        <div className="bg-indigo-600 rounded-2xl p-6 mb-6 text-white">
          <p className="text-indigo-200 text-sm mb-1">Hello, {demoJob.client_name}</p>
          <h1 className="text-2xl font-bold mb-1">{demoJob.title}</h1>
          <p className="text-indigo-200 text-sm">{demoJob.address}</p>
          <p className="text-indigo-200 text-sm mt-1">Managed by {demoJob.contractor}</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            {
              label: 'Awaiting Your Review',
              value: completedItems.length,
              color: 'text-yellow-600',
              bg: 'bg-yellow-50',
              border: 'border-yellow-200',
            },
            {
              label: 'Approved by You',
              value: approvedItems.length,
              color: 'text-green-600',
              bg: 'bg-green-50',
              border: 'border-green-200',
            },
            {
              label: 'Total Items',
              value: demoItems.length,
              color: 'text-gray-900',
              bg: 'bg-white',
              border: 'border-gray-200',
            },
          ].map((s) => (
            <div key={s.label} className={`${s.bg} rounded-xl border ${s.border} px-4 py-3 text-center`}>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Items awaiting review */}
        {completedItems.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Needs Your Approval ({completedItems.length})
            </h2>
            <div className="space-y-4">
              {completedItems.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border-2 border-yellow-200 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900">{item.title}</h3>
                          {item.category && (
                            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                              {item.category}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                        {item.completed_note && (
                          <div className="bg-gray-50 rounded-lg p-3 mb-3">
                            <p className="text-xs font-semibold text-gray-500 mb-1">Subcontractor note:</p>
                            <p className="text-sm text-gray-700">{item.completed_note}</p>
                          </div>
                        )}
                        {item.photos > 0 && (
                          <p className="text-xs text-indigo-600 font-medium">
                            📷 {item.photos} photo{item.photos > 1 ? 's' : ''} attached
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-gray-100">
                      <Button className="flex-1 gap-2 bg-green-600 hover:bg-green-700">
                        <ThumbsUp className="w-4 h-4" />
                        Approve
                      </Button>
                      <Button variant="danger" className="flex-1 gap-2">
                        <ThumbsDown className="w-4 h-4" />
                        Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Approved items */}
        {approvedItems.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Approved ({approvedItems.length})
            </h2>
            <div className="space-y-3">
              {approvedItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.title}</p>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">
                    Approved
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-10">
          This portal is secured with a unique link. Powered by{' '}
          <a href="/" className="text-indigo-600 hover:underline">PunchList Pro</a>.
        </p>
      </div>
    </div>
  )
}
