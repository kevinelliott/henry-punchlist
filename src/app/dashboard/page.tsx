import Link from 'next/link'

interface DemoProject {
  id: string
  name: string
  address: string
  totalItems: number
  openCount: number
  percentComplete: number
  status: 'active' | 'complete' | 'blocked'
}

const DEMO_PROJECTS: DemoProject[] = [
  {
    id: 'demo',
    name: 'Bayside Luxury Condominiums — Tower B',
    address: '1 Bayside Dr, Miami, FL 33132',
    totalItems: 24,
    openCount: 8,
    percentComplete: 29,
    status: 'blocked',
  },
  {
    id: 'demo-2',
    name: 'Harbor Office Complex — Phase 2',
    address: '500 Harbor Blvd, Long Beach, CA 90802',
    totalItems: 18,
    openCount: 3,
    percentComplete: 83,
    status: 'active',
  },
  {
    id: 'demo-3',
    name: 'Westside Medical Center Renovation',
    address: '200 Medical Pkwy, Houston, TX 77030',
    totalItems: 11,
    openCount: 0,
    percentComplete: 100,
    status: 'complete',
  },
]

function statusBadge(status: DemoProject['status']) {
  if (status === 'blocked') return 'bg-red-100 text-red-800'
  if (status === 'complete') return 'bg-green-100 text-green-800'
  return 'bg-blue-100 text-blue-800'
}

function statusLabel(status: DemoProject['status']) {
  if (status === 'blocked') return 'Blocked'
  if (status === 'complete') return 'Complete'
  return 'Active'
}

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* Sign-in banner */}
      <div className="mb-8 p-4 bg-indigo-50 border border-indigo-200 rounded-xl flex items-center justify-between gap-4">
        <div>
          <p className="text-indigo-900 font-semibold">Viewing demo projects</p>
          <p className="text-indigo-700 text-sm mt-0.5">
            Sign in to manage your own projects and punch lists.
          </p>
        </div>
        <Link
          href="/auth/login"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors whitespace-nowrap"
        >
          Sign In
        </Link>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-500 text-sm mt-1">Your active construction projects</p>
        </div>
        <button
          disabled
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-sm opacity-50 cursor-not-allowed"
          title="Sign in to create projects"
        >
          + New Project
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {DEMO_PROJECTS.map((project) => (
          <Link
            key={project.id}
            href={project.id === 'demo' ? '/projects/demo' : '#'}
            className="block group"
          >
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:border-indigo-300 hover:shadow-md transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 truncate text-sm">{project.name}</h3>
                  <p className="text-gray-500 text-xs mt-1 truncate">{project.address}</p>
                </div>
                <span className={`ml-2 flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${statusBadge(project.status)}`}>
                  {statusLabel(project.status)}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold font-mono ${project.openCount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {project.openCount}
                  </div>
                  <div className="text-xs text-gray-500">open</div>
                </div>
                <div className="text-gray-300 text-lg">/</div>
                <div className="text-center">
                  <div className="text-2xl font-bold font-mono text-gray-700">{project.totalItems}</div>
                  <div className="text-xs text-gray-500">total</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{project.percentComplete}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${project.percentComplete === 100 ? 'bg-green-500' : 'bg-indigo-600'}`}
                      style={{ width: `${project.percentComplete}%` }}
                    />
                  </div>
                </div>
              </div>

              {project.openCount > 0 ? (
                <div className="text-xs bg-red-50 text-red-700 border border-red-200 rounded px-2 py-1">
                  FINAL PAYMENT BLOCKED — {project.openCount} items open
                </div>
              ) : (
                <div className="text-xs bg-green-50 text-green-700 border border-green-200 rounded px-2 py-1">
                  All verified — ready for closeout
                </div>
              )}

              {project.id === 'demo' && (
                <div className="mt-3 text-xs text-indigo-600 font-medium group-hover:text-indigo-700">
                  View demo project →
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
