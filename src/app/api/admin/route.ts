import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

function validateAdminKey(request: NextRequest): boolean {
  const auth = request.headers.get('authorization')
  const key = auth?.startsWith('Bearer ') ? auth.slice(7) : null
  const adminKey = process.env.ADMIN_API_KEY
  if (!adminKey) return false
  return key === adminKey
}

export async function GET(request: NextRequest) {
  if (!validateAdminKey(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = createServiceClient()

    const [projectsResult, itemsResult] = await Promise.all([
      supabase.from('projects').select('id, created_at', { count: 'exact' }),
      supabase.from('punch_items').select('id, status, priority, created_at', { count: 'exact' }),
    ])

    const projects = projectsResult.data ?? []
    const items = itemsResult.data ?? []

    return NextResponse.json({
      overview: {
        total_projects: projectsResult.count ?? projects.length,
        total_punch_items: itemsResult.count ?? items.length,
        items_by_status: {
          open: items.filter(i => i.status === 'open').length,
          in_progress: items.filter(i => i.status === 'in_progress').length,
          submitted: items.filter(i => i.status === 'submitted').length,
          verified: items.filter(i => i.status === 'verified').length,
          rejected: items.filter(i => i.status === 'rejected').length,
        },
        items_by_priority: {
          critical: items.filter(i => i.priority === 'critical').length,
          high: items.filter(i => i.priority === 'high').length,
          medium: items.filter(i => i.priority === 'medium').length,
          low: items.filter(i => i.priority === 'low').length,
        },
      },
    })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
