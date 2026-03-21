import { notFound } from 'next/navigation'
import Link from 'next/link'
import { demoProject, demoPunchItems } from '@/lib/demo-data'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { Project, PunchItem } from '@/types'
import PriorityBadge from '@/components/PriorityBadge'
import StatusBadge from '@/components/StatusBadge'
import RetainageBanner from '@/components/RetainageBanner'
import ProjectItemsClient from './ProjectItemsClient'

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const { id } = params

  let project: Project
  let items: PunchItem[]

  if (id === 'demo') {
    project = demoProject
    items = demoPunchItems
  } else {
    try {
      const supabase = createSupabaseServerClient()
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()

      if (projectError || !projectData) {
        return notFound()
      }

      const { data: itemsData } = await supabase
        .from('punch_items')
        .select('*')
        .eq('project_id', id)
        .order('item_number', { ascending: true })

      project = projectData as Project
      items = (itemsData || []) as PunchItem[]
    } catch {
      return notFound()
    }
  }

  const openItems = items.filter((i) => i.status !== 'resolved' && i.status !== 'rejected')
  const openCount = openItems.length

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Link href="/dashboard" className="hover:text-[#ea580c] transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-[#1e293b]">{project.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1e293b]">{project.name}</h1>
            {project.address && (
              <p className="text-gray-500 text-sm mt-1">{project.address}</p>
            )}
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
              {project.owner_name && <span>Owner: <strong>{project.owner_name}</strong></span>}
              {project.general_contractor && <span>GC: <strong>{project.general_contractor}</strong></span>}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {project.retainage_amount && (
              <div className="text-right">
                <div className="text-xs text-gray-500 uppercase tracking-wide">Retainage</div>
                <div className="text-xl font-bold text-[#1e293b] font-mono">
                  {formatCurrency(project.retainage_amount)}
                </div>
              </div>
            )}
            <Link
              href={`/projects/${id}/report`}
              className="border border-gray-300 hover:border-gray-400 text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Print Report
            </Link>
            {id === 'demo' ? (
              <Link
                href="/auth/signup"
                className="bg-[#ea580c] hover:bg-orange-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Start Free
              </Link>
            ) : null}
          </div>
        </div>
      </div>

      {/* Retainage Banner */}
      <div className="mb-6">
        <RetainageBanner openCount={openCount} retainageAmount={project.retainage_amount} />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard label="Total Items" value={items.length} color="text-gray-800" />
        <StatCard label="Open" value={items.filter(i => i.status === 'open').length} color="text-red-600" />
        <StatCard label="In Progress" value={items.filter(i => i.status === 'in-progress' || i.status === 'acknowledged').length} color="text-blue-600" />
        <StatCard label="Resolved" value={items.filter(i => i.status === 'resolved').length} color="text-green-600" />
      </div>

      {/* Items with client-side filtering and add form */}
      <ProjectItemsClient project={project} initialItems={items} />
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
