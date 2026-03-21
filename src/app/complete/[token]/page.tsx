import CompletionForm from './CompletionForm'

interface DemoItem {
  area: string
  trade: string
  description: string
  priority: string
  assignedSub: string
  projectName: string
}

const DEMO_ITEM: DemoItem = {
  area: 'Lobby',
  trade: 'electrical',
  description: 'Concierge desk power receptacles not functional — breaker trips on load',
  priority: 'critical',
  assignedSub: 'Bay Electric',
  projectName: 'Bayside Luxury Condominiums — Tower B',
}

function priorityColor(p: string) {
  if (p === 'critical') return 'bg-red-100 text-red-800 border-red-200'
  if (p === 'high') return 'bg-orange-100 text-orange-800 border-orange-200'
  if (p === 'medium') return 'bg-yellow-100 text-yellow-800 border-yellow-200'
  return 'bg-gray-100 text-gray-600 border-gray-200'
}

export default function CompletionPage({ params }: { params: { token: string } }) {
  const { token } = params
  const isDemo = token.startsWith('demo-')

  const item = DEMO_ITEM

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center gap-2">
          <span className="text-xl">📋</span>
          <div>
            <span className="font-bold text-gray-900 text-sm">PunchList</span>
            <p className="text-xs text-gray-500">{item.projectName}</p>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {isDemo && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
            This is a demo completion link — submission will not be saved.
          </div>
        )}

        {/* Item details card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-6">
          <div className={`h-2 w-full ${
            item.priority === 'critical' ? 'bg-red-500' :
            item.priority === 'high' ? 'bg-orange-500' :
            item.priority === 'medium' ? 'bg-yellow-400' : 'bg-gray-300'
          }`} />
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Area: {item.area}</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${priorityColor(item.priority)}`}>
                {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)} Priority
              </span>
            </div>
            <h1 className="text-lg font-bold text-gray-900 mb-4 leading-snug">
              {item.description}
            </h1>
            <div className="space-y-2 text-sm">
              <div className="flex gap-2">
                <span className="text-gray-500 w-24 flex-shrink-0">Trade:</span>
                <span className="text-gray-800 font-medium capitalize">{item.trade}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-gray-500 w-24 flex-shrink-0">Assigned To:</span>
                <span className="text-gray-800 font-medium">{item.assignedSub}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Completion form */}
        <CompletionForm token={token} isDemo={isDemo} />

        <div className="mt-6 text-center text-xs text-gray-400">
          <p>Secure completion link for {item.projectName}.</p>
          <p className="mt-1">Questions? Contact your general contractor.</p>
        </div>
      </div>
    </div>
  )
}
