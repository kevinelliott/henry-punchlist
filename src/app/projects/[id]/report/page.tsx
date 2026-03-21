import { notFound } from 'next/navigation'
import Link from 'next/link'
import { demoProject, demoPunchItems } from '@/lib/demo-data'
import { createSupabaseServerClient } from '@/lib/supabase-server'
import { Project, PunchItem } from '@/types'
import PriorityBadge from '@/components/PriorityBadge'
import StatusBadge from '@/components/StatusBadge'
import PrintButton from './PrintButton'

export default async function ReportPage({ params }: { params: { id: string } }) {
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

      if (projectError || !projectData) return notFound()

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

  const totalItems = items.length
  const resolvedItems = items.filter((i) => i.status === 'resolved').length
  const openItems = items.filter((i) => i.status !== 'resolved' && i.status !== 'rejected').length
  const pctComplete = totalItems > 0 ? Math.round((resolvedItems / totalItems) * 100) : 0

  // Group by trade
  const byTrade: Record<string, PunchItem[]> = {}
  for (const item of items) {
    const trade = item.trade || 'Unassigned'
    if (!byTrade[trade]) byTrade[trade] = []
    byTrade[trade].push(item)
  }

  const now = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <div className="print:hidden mb-4 flex items-center gap-3">
        <Link href={`/projects/${id}`} className="text-sm text-gray-500 hover:text-[#ea580c]">
          ← Back to Project
        </Link>
        <PrintButton />
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-8 print:shadow-none print:border-0">
        {/* Report Header */}
        <div className="border-b border-gray-200 pb-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-[#ea580c] rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">HP</span>
                </div>
                <span className="font-bold text-[#1e293b]">Henry Punchlist</span>
              </div>
              <h1 className="text-2xl font-bold text-[#1e293b]">{project.name}</h1>
              {project.address && <p className="text-gray-500 text-sm mt-1">{project.address}</p>}
            </div>
            <div className="text-right text-sm text-gray-500">
              <div>Generated: {now}</div>
              {project.general_contractor && <div>GC: {project.general_contractor}</div>}
              {project.owner_name && <div>Owner: {project.owner_name}</div>}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#1e293b] font-mono">{totalItems}</div>
            <div className="text-xs text-gray-500">Total Items</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600 font-mono">{openItems}</div>
            <div className="text-xs text-gray-500">Open</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 font-mono">{resolvedItems}</div>
            <div className="text-xs text-gray-500">Resolved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#ea580c] font-mono">{pctComplete}%</div>
            <div className="text-xs text-gray-500">Complete</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all"
              style={{ width: `${pctComplete}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{resolvedItems} resolved</span>
            <span>{openItems} remaining</span>
          </div>
        </div>

        {/* Items by Trade */}
        {Object.entries(byTrade).map(([trade, tradeItems]) => (
          <div key={trade} className="mb-8">
            <h2 className="text-sm font-bold text-[#1e293b] uppercase tracking-wide border-b border-gray-200 pb-2 mb-3 capitalize">
              {trade} ({tradeItems.length} items)
            </h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-500">
                  <th className="text-left py-1 w-8">#</th>
                  <th className="text-left py-1">Location</th>
                  <th className="text-left py-1">Description</th>
                  <th className="text-left py-1">Assigned To</th>
                  <th className="text-left py-1">Priority</th>
                  <th className="text-left py-1">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tradeItems.map((item) => (
                  <tr key={item.id} className="text-xs">
                    <td className="py-2 font-mono text-gray-400">#{item.item_number}</td>
                    <td className="py-2 text-gray-600">{item.location || '—'}</td>
                    <td className="py-2 text-gray-800">{item.description}</td>
                    <td className="py-2 text-gray-600">{item.assigned_to || '—'}</td>
                    <td className="py-2"><PriorityBadge priority={item.priority} /></td>
                    <td className="py-2"><StatusBadge status={item.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}

        {/* Retainage Status */}
        {project.retainage_amount && (
          <div className={`mt-6 p-4 rounded-lg border ${openItems > 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
            <p className={`font-semibold text-sm ${openItems > 0 ? 'text-red-800' : 'text-green-800'}`}>
              {openItems > 0
                ? `🔴 Retainage Release BLOCKED — ${openItems} item${openItems !== 1 ? 's' : ''} outstanding`
                : '🟢 All items resolved — retainage may be released'}
            </p>
            <p className={`text-sm mt-1 ${openItems > 0 ? 'text-red-700' : 'text-green-700'}`}>
              Retainage amount: ${project.retainage_amount.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
