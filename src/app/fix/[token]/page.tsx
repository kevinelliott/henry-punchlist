import { notFound } from 'next/navigation'
import { demoPunchItems, demoProject } from '@/lib/demo-data'
import { createClient } from '@supabase/supabase-js'
import { PunchItem, Project } from '@/types'
import PriorityBadge from '@/components/PriorityBadge'
import StatusBadge from '@/components/StatusBadge'
import FixActions from './FixActions'

async function getItemByToken(token: string): Promise<{ item: PunchItem; project: Project } | null> {
  // Demo tokens
  if (token.startsWith('demo-token-')) {
    const item = demoPunchItems.find((i) => i.fix_token === token)
    if (!item) return null
    return { item, project: demoProject }
  }

  // Real token — use public Supabase client (no auth required)
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
    )

    const { data: itemData, error: itemError } = await supabase
      .from('punch_items')
      .select('*')
      .eq('fix_token', token)
      .single()

    if (itemError || !itemData) return null

    const { data: projectData } = await supabase
      .from('projects')
      .select('*')
      .eq('id', itemData.project_id)
      .single()

    if (!projectData) return null

    return { item: itemData as PunchItem, project: projectData as Project }
  } catch {
    return null
  }
}

export default async function FixPage({ params }: { params: { token: string } }) {
  const { token } = params
  const result = await getItemByToken(token)

  if (!result) return notFound()

  const { item, project } = result
  const isDemo = token.startsWith('demo-token-')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-first header */}
      <div className="bg-[#1e293b] text-white px-4 py-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 bg-[#ea580c] rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">HP</span>
            </div>
            <span className="text-sm font-semibold text-slate-300">Henry Punchlist</span>
          </div>
          <p className="text-xs text-slate-400 truncate">{project.name}</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {isDemo && (
          <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
            Demo item — actions won&apos;t save in demo mode.
          </div>
        )}

        {/* Item Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden mb-4">
          {/* Priority stripe */}
          <div className={`h-2 w-full ${
            item.priority === 'critical' ? 'bg-red-500' :
            item.priority === 'high' ? 'bg-orange-500' :
            item.priority === 'normal' ? 'bg-yellow-400' :
            'bg-gray-300'
          }`} />

          <div className="p-5">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <span className="font-mono text-sm text-gray-400 font-semibold">
                  Item #{item.item_number}
                </span>
                {item.location && (
                  <span className="ml-2 text-sm text-gray-500">— {item.location}</span>
                )}
              </div>
              <StatusBadge status={item.status} />
            </div>

            <h1 className="text-xl font-bold text-[#1e293b] mb-4 leading-snug">
              {item.description}
            </h1>

            <div className="space-y-2 text-sm">
              {item.trade && (
                <div className="flex gap-2">
                  <span className="text-gray-500 w-24 flex-shrink-0">Trade:</span>
                  <span className="text-gray-800 font-medium capitalize">{item.trade}</span>
                </div>
              )}
              {item.assigned_to && (
                <div className="flex gap-2">
                  <span className="text-gray-500 w-24 flex-shrink-0">Assigned To:</span>
                  <span className="text-gray-800 font-medium">{item.assigned_to}</span>
                </div>
              )}
              <div className="flex gap-2 items-center">
                <span className="text-gray-500 w-24 flex-shrink-0">Priority:</span>
                <PriorityBadge priority={item.priority} />
              </div>
            </div>
          </div>
        </div>

        {/* Resolution info if resolved */}
        {item.status === 'resolved' && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">✅</span>
              <h2 className="font-bold text-green-800 text-lg">Resolved</h2>
            </div>
            {item.resolved_by && (
              <p className="text-sm text-green-700">Resolved by: <strong>{item.resolved_by}</strong></p>
            )}
            {item.resolved_at && (
              <p className="text-sm text-green-700">
                On: {new Date(item.resolved_at).toLocaleDateString('en-US', {
                  year: 'numeric', month: 'long', day: 'numeric'
                })}
              </p>
            )}
            {item.resolution_notes && (
              <div className="mt-3 pt-3 border-t border-green-200">
                <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-1">Notes</p>
                <p className="text-sm text-green-800">{item.resolution_notes}</p>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <FixActions item={item} token={token} isDemo={isDemo} />

        <div className="mt-6 text-center text-xs text-gray-400">
          <p>This is a secure link for {project.name}.</p>
          <p className="mt-1">Questions? Contact your general contractor.</p>
        </div>
      </div>
    </div>
  )
}
