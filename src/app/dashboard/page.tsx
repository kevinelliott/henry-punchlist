import Link from 'next/link'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { Project, PunchItem } from '@/types'
import { demoProject, demoPunchItems } from '@/lib/demo-data'

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

function statusLabel(status: string) {
  const map: Record<string, string> = {
    active: 'Active',
    walkthrough: 'Walkthrough',
    punchlist: 'Punchlist',
    'signed-off': 'Signed Off',
  }
  return map[status] || status
}

function statusColor(status: string) {
  const map: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    walkthrough: 'bg-blue-100 text-blue-800',
    punchlist: 'bg-orange-100 text-orange-800',
    'signed-off': 'bg-gray-100 text-gray-700',
  }
  return map[status] || 'bg-gray-100 text-gray-700'
}

interface ProjectWithStats extends Project {
  openCount: number
  totalCount: number
}

export default async function DashboardPage() {
  let projects: ProjectWithStats[] = []
  let isDemo = false

  try {
    const supabase = createSupabaseServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      isDemo = true
    } else {
      const { data: projectsData } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (projectsData && projectsData.length > 0) {
        const projectIds = projectsData.map((p: Project) => p.id)
        const { data: itemsData } = await supabase
          .from('punch_items')
          .select('project_id, status')
          .in('project_id', projectIds)

        projects = projectsData.map((p: Project) => {
          const items = (itemsData || []).filter((i: { project_id: string; status: string }) => i.project_id === p.id)
          const openCount = items.filter((i: { project_id: string; status: string }) => i.status !== 'resolved' && i.status !== 'rejected').length
          return { ...p, openCount, totalCount: items.length }
        })
      }
    }
  } catch {
    isDemo = true
  }

  const demoOpenCount = demoPunchItems.filter(
    (i) => i.status !== 'resolved' && i.status !== 'rejected'
  ).length

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1e293b]">Projects</h1>
          <p className="text-gray-500 text-sm mt-1">
            {isDemo
              ? 'Viewing demo — sign in to manage your own projects'
              : 'Your active construction projects'}
          </p>
        </div>
        {!isDemo && (
          <Link
            href="/dashboard/new-project"
            className="bg-[#ea580c] hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
          >
            + New Project
          </Link>
        )}
      </div>

      {isDemo && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-800 text-sm">
            <strong>Not signed in.</strong> Showing demo project.{' '}
            <Link href="/auth/login" className="underline font-medium">Sign in</Link>{' '}
            to manage your own projects, or{' '}
            <Link href="/auth/signup" className="underline font-medium">create a free account</Link>.
          </p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Always show demo project card */}
        <Link href="/projects/demo" className="block">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:border-[#ea580c] hover:shadow-md transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-[#1e293b] truncate">{demoProject.name}</h3>
                {demoProject.address && (
                  <p className="text-gray-500 text-xs mt-1 truncate">{demoProject.address}</p>
                )}
              </div>
              <span className={`ml-2 flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(demoProject.status)}`}>
                {statusLabel(demoProject.status)}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-3">
              <div className="text-center">
                <div className={`text-2xl font-bold font-mono ${demoOpenCount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {demoOpenCount}
                </div>
                <div className="text-xs text-gray-500">open</div>
              </div>
              <div className="text-gray-300 text-lg">/</div>
              <div className="text-center">
                <div className="text-2xl font-bold font-mono text-gray-700">{demoPunchItems.length}</div>
                <div className="text-xs text-gray-500">total</div>
              </div>
            </div>

            {demoProject.retainage_amount && (
              <div className="text-sm text-gray-600 mb-3">
                Retainage: <span className="font-semibold text-[#1e293b]">{formatCurrency(demoProject.retainage_amount)}</span>
              </div>
            )}

            {demoOpenCount > 0 ? (
              <div className="text-xs bg-red-50 text-red-700 border border-red-200 rounded px-2 py-1">
                🔴 Retainage BLOCKED — {demoOpenCount} items open
              </div>
            ) : (
              <div className="text-xs bg-green-50 text-green-700 border border-green-200 rounded px-2 py-1">
                🟢 All resolved — ready for sign-off
              </div>
            )}

            <div className="mt-3 text-xs text-[#ea580c] font-medium">Demo Project →</div>
          </div>
        </Link>

        {/* Real projects */}
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`} className="block">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:border-[#ea580c] hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#1e293b] truncate">{project.name}</h3>
                  {project.address && (
                    <p className="text-gray-500 text-xs mt-1 truncate">{project.address}</p>
                  )}
                </div>
                <span className={`ml-2 flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(project.status)}`}>
                  {statusLabel(project.status)}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-3">
                <div className="text-center">
                  <div className={`text-2xl font-bold font-mono ${project.openCount > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {project.openCount}
                  </div>
                  <div className="text-xs text-gray-500">open</div>
                </div>
                <div className="text-gray-300 text-lg">/</div>
                <div className="text-center">
                  <div className="text-2xl font-bold font-mono text-gray-700">{project.totalCount}</div>
                  <div className="text-xs text-gray-500">total</div>
                </div>
              </div>

              {project.retainage_amount && (
                <div className="text-sm text-gray-600 mb-3">
                  Retainage: <span className="font-semibold text-[#1e293b]">{formatCurrency(project.retainage_amount)}</span>
                </div>
              )}

              {project.openCount > 0 ? (
                <div className="text-xs bg-red-50 text-red-700 border border-red-200 rounded px-2 py-1">
                  🔴 Retainage BLOCKED — {project.openCount} items open
                </div>
              ) : (
                <div className="text-xs bg-green-50 text-green-700 border border-green-200 rounded px-2 py-1">
                  🟢 All resolved — ready for sign-off
                </div>
              )}
            </div>
          </Link>
        ))}

        {/* New project CTA */}
        {!isDemo && (
          <Link href="/dashboard/new-project" className="block">
            <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-6 flex flex-col items-center justify-center min-h-[200px] hover:border-[#ea580c] hover:bg-orange-50 transition-all cursor-pointer">
              <div className="text-3xl mb-2">+</div>
              <p className="font-medium text-gray-500">New Project</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}
