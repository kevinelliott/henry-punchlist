import Link from 'next/link'

interface PunchItem {
  id: string
  area: string
  trade: string
  description: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  assignedSub: string
  status: 'open' | 'in_progress' | 'submitted' | 'verified' | 'rejected'
}

const DEMO_ITEMS: PunchItem[] = [
  // Exterior (5)
  { id: 'e1', area: 'Exterior', trade: 'glazing', description: 'Lobby entry curtain wall — 3 panel seals failed, water intrusion visible', priority: 'critical', assignedSub: 'ClearVision Glazing', status: 'open' },
  { id: 'e2', area: 'Exterior', trade: 'painting', description: 'South facade paint delaminating at parapet — approx 40 LF', priority: 'high', assignedSub: 'SunCoast Painting', status: 'open' },
  { id: 'e3', area: 'Exterior', trade: 'landscaping', description: 'Pool deck drainage grate missing — safety hazard, code violation', priority: 'critical', assignedSub: 'Tropical Landscapes', status: 'in_progress' },
  { id: 'e4', area: 'Exterior', trade: 'other', description: 'Rooftop mechanical screen panel not secured — loose in high wind', priority: 'high', assignedSub: 'Apex Sheet Metal', status: 'submitted' },
  { id: 'e5', area: 'Exterior', trade: 'painting', description: 'Touch-up caulk needed at all window perimeter joints — north face', priority: 'medium', assignedSub: 'SunCoast Painting', status: 'verified' },

  // Lobby (5)
  { id: 'l1', area: 'Lobby', trade: 'electrical', description: 'Concierge desk power receptacles not functional — breaker trips on load', priority: 'critical', assignedSub: 'Bay Electric', status: 'open' },
  { id: 'l2', area: 'Lobby', trade: 'flooring', description: 'Marble floor tile cracked at elevator threshold — 4 tiles need replacement', priority: 'high', assignedSub: 'Premier Stone & Tile', status: 'open' },
  { id: 'l3', area: 'Lobby', trade: 'hvac', description: 'Lobby HVAC supply diffuser misaligned — blowing directly on concierge position', priority: 'medium', assignedSub: 'Coastal Climate', status: 'submitted' },
  { id: 'l4', area: 'Lobby', trade: 'drywall', description: 'Feature wall drywall finish — banding visible under raking light', priority: 'medium', assignedSub: 'Premier Drywall', status: 'verified' },
  { id: 'l5', area: 'Lobby', trade: 'electrical', description: 'Decorative pendant lights — 2 fixtures not operational, ballast failure', priority: 'medium', assignedSub: 'Bay Electric', status: 'rejected' },

  // Floor 2 (5)
  { id: 'f1', area: 'Floor 2', trade: 'plumbing', description: 'Unit 204 — kitchen sink drain leaking at P-trap, drywall below cabinet wet', priority: 'critical', assignedSub: 'Gulf Plumbing', status: 'open' },
  { id: 'f2', area: 'Floor 2', trade: 'electrical', description: 'Corridor emergency egress lighting fails battery test — 3 units', priority: 'high', assignedSub: 'Bay Electric', status: 'in_progress' },
  { id: 'f3', area: 'Floor 2', trade: 'drywall', description: 'Unit 201 master bedroom — corner bead damage at window trim', priority: 'medium', assignedSub: 'Premier Drywall', status: 'submitted' },
  { id: 'f4', area: 'Floor 2', trade: 'flooring', description: 'Hallway carpet seam visible and lifting at unit 206 entry', priority: 'medium', assignedSub: 'Prestige Flooring', status: 'verified' },
  { id: 'f5', area: 'Floor 2', trade: 'painting', description: 'All unit entry doors — paint finish inconsistent, runs at bottom rail', priority: 'low', assignedSub: 'SunCoast Painting', status: 'rejected' },

  // Penthouse (5)
  { id: 'p1', area: 'Penthouse', trade: 'hvac', description: 'PH-A — AC unit not cooling to setpoint, delta T only 8 degrees vs required 20', priority: 'high', assignedSub: 'Coastal Climate', status: 'open' },
  { id: 'p2', area: 'Penthouse', trade: 'electrical', description: 'PH terrace — outdoor kitchen GFCI circuits non-functional', priority: 'high', assignedSub: 'Bay Electric', status: 'open' },
  { id: 'p3', area: 'Penthouse', trade: 'glazing', description: 'PH-B sliding glass door — threshold seal torn, allows water under door', priority: 'medium', assignedSub: 'ClearVision Glazing', status: 'in_progress' },
  { id: 'p4', area: 'Penthouse', trade: 'plumbing', description: 'PH-A master bath — rainfall shower head flow rate below spec', priority: 'medium', assignedSub: 'Gulf Plumbing', status: 'submitted' },
  { id: 'p5', area: 'Penthouse', trade: 'flooring', description: 'PH terrace — porcelain paver grout incomplete at perimeter 12 LF', priority: 'low', assignedSub: 'Premier Stone & Tile', status: 'verified' },

  // Mechanical Room (4)
  { id: 'm1', area: 'Mechanical Room', trade: 'plumbing', description: 'Backflow preventer not tested/tagged — required for CO per code', priority: 'high', assignedSub: 'Gulf Plumbing', status: 'open' },
  { id: 'm2', area: 'Mechanical Room', trade: 'electrical', description: 'MCC panel labeling incomplete — 14 breakers unlabeled per NEC', priority: 'medium', assignedSub: 'Bay Electric', status: 'submitted' },
  { id: 'm3', area: 'Mechanical Room', trade: 'hvac', description: 'Chiller #2 vibration isolators not installed — spec requires 4 isolators', priority: 'medium', assignedSub: 'Coastal Climate', status: 'verified' },
  { id: 'm4', area: 'Mechanical Room', trade: 'other', description: 'Fire pump room — door self-closer not adjusted, door hangs open 6 inches', priority: 'low', assignedSub: 'Apex Sheet Metal', status: 'verified' },
]

const AREAS = ['Exterior', 'Lobby', 'Floor 2', 'Penthouse', 'Mechanical Room']

function priorityColor(p: PunchItem['priority']) {
  if (p === 'critical') return 'bg-red-100 text-red-800 border-red-200'
  if (p === 'high') return 'bg-orange-100 text-orange-800 border-orange-200'
  if (p === 'medium') return 'bg-yellow-100 text-yellow-800 border-yellow-200'
  return 'bg-gray-100 text-gray-600 border-gray-200'
}

function statusColor(s: PunchItem['status']) {
  if (s === 'open') return 'bg-red-100 text-red-700'
  if (s === 'in_progress') return 'bg-blue-100 text-blue-700'
  if (s === 'submitted') return 'bg-purple-100 text-purple-700'
  if (s === 'verified') return 'bg-green-100 text-green-700'
  if (s === 'rejected') return 'bg-gray-100 text-gray-600'
  return 'bg-gray-100 text-gray-600'
}

function statusLabel(s: PunchItem['status']) {
  if (s === 'open') return 'Open'
  if (s === 'in_progress') return 'In Progress'
  if (s === 'submitted') return 'Submitted'
  if (s === 'verified') return 'Verified'
  if (s === 'rejected') return 'Rejected'
  return s
}

function priorityLabel(p: PunchItem['priority']) {
  return p.charAt(0).toUpperCase() + p.slice(1)
}

export default function DemoProjectPage() {
  const totalItems = DEMO_ITEMS.length
  const verifiedItems = DEMO_ITEMS.filter(i => i.status === 'verified').length
  const openItems = DEMO_ITEMS.filter(i => i.status === 'open' || i.status === 'in_progress' || i.status === 'submitted').length
  const criticalOpen = DEMO_ITEMS.filter(i => i.priority === 'critical' && (i.status === 'open' || i.status === 'in_progress')).length
  const percentComplete = Math.round((verifiedItems / totalItems) * 100)
  const anyOpen = openItems > 0

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link href="/dashboard" className="hover:text-gray-900 transition-colors">Dashboard</Link>
        <span>/</span>
        <span className="text-gray-900">Bayside Luxury Condominiums — Tower B</span>
        <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">DEMO</span>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bayside Luxury Condominiums — Tower B</h1>
          <p className="text-gray-500 text-sm mt-1">1 Bayside Dr, Miami, FL 33132</p>
          <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
            <span>Owner: <strong>Bayside Development Group</strong></span>
            <span>GC: <strong>Atlantic General Construction</strong></span>
            <span>Contract: <strong>$12,400,000</strong></span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/auth/signup"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
          >
            Start Free — Use on Your Project
          </Link>
        </div>
      </div>

      {/* Blocking banners */}
      <div className="space-y-3 mb-6">
        {criticalOpen > 0 && (
          <div className="bg-red-600 text-white px-6 py-4 rounded-xl flex items-center gap-3 font-bold text-lg">
            <span>🚫</span>
            <span>FINAL PAYMENT BLOCKED — {criticalOpen} Critical item{criticalOpen !== 1 ? 's' : ''} open</span>
          </div>
        )}
        {anyOpen && (
          <div className="bg-amber-500 text-white px-6 py-4 rounded-xl flex items-center gap-3 font-bold text-base">
            <span>⚠️</span>
            <span>OCCUPANCY BLOCKED — {openItems} item{openItems !== 1 ? 's' : ''} not yet closed</span>
          </div>
        )}
        {!anyOpen && (
          <div className="bg-green-600 text-white px-6 py-4 rounded-xl flex items-center gap-3 font-bold text-lg">
            <span>✅</span>
            <span>All items verified — ready for final payment and occupancy</span>
          </div>
        )}
      </div>

      {/* Stats + progress */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        <StatCard label="Total" value={totalItems} color="text-gray-800" />
        <StatCard label="Open" value={DEMO_ITEMS.filter(i => i.status === 'open').length} color="text-red-600" />
        <StatCard label="In Progress" value={DEMO_ITEMS.filter(i => i.status === 'in_progress').length} color="text-blue-600" />
        <StatCard label="Submitted" value={DEMO_ITEMS.filter(i => i.status === 'submitted').length} color="text-purple-600" />
        <StatCard label="Verified" value={verifiedItems} color="text-green-600" />
      </div>

      {/* Progress bar */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium text-gray-700">Overall Completion</span>
          <span className="font-bold text-gray-900">{verifiedItems}/{totalItems} verified ({percentComplete}%)</span>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </div>

      {/* Items grouped by area */}
      <div className="space-y-6">
        {AREAS.map(area => {
          const areaItems = DEMO_ITEMS.filter(i => i.area === area)
          const areaOpen = areaItems.filter(i => i.status === 'open' || i.status === 'in_progress').length
          return (
            <div key={area} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-5 py-3 flex items-center justify-between">
                <h2 className="font-bold text-gray-900">{area}</h2>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-gray-500">{areaItems.length} items</span>
                  {areaOpen > 0 && (
                    <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-medium">
                      {areaOpen} open
                    </span>
                  )}
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {areaItems.map(item => (
                  <div key={item.id} className="px-5 py-4 flex flex-col sm:flex-row sm:items-start gap-3">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded border ${priorityColor(item.priority)}`}>
                          {priorityLabel(item.priority)}
                        </span>
                        <span className="text-xs text-gray-500 capitalize">{item.trade}</span>
                        <span className="text-xs text-gray-400">·</span>
                        <span className="text-xs text-gray-500">{item.assignedSub}</span>
                      </div>
                      <p className="text-gray-800 text-sm leading-relaxed">{item.description}</p>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor(item.status)}`}>
                        {statusLabel(item.status)}
                      </span>
                      {(item.status === 'submitted') && (
                        <div className="flex gap-1">
                          <button className="text-xs bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded font-medium transition-colors">
                            Verify
                          </button>
                          <button className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded font-medium transition-colors">
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-500 text-sm mb-4">This is a live demo. Sign up to manage your own projects.</p>
        <Link
          href="/auth/signup"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
        >
          Start Free — No Credit Card
        </Link>
      </div>
    </div>
  )
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
      <div className={`text-2xl font-bold font-mono ${color}`}>{value}</div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  )
}
