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

    const { data: items } = await supabase
      .from('punch_items')
      .select('status, priority, created_at, verified_at')

    const now = new Date()
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    const recentItems = (items ?? []).filter(i => new Date(i.created_at) > thirtyDaysAgo)
    const verifiedItems = (items ?? []).filter(i => i.status === 'verified' && i.verified_at)

    const avgDaysToVerify = verifiedItems.length > 0
      ? verifiedItems.reduce((sum, i) => {
          const created = new Date(i.created_at).getTime()
          const verified = new Date(i.verified_at).getTime()
          return sum + (verified - created) / (1000 * 60 * 60 * 24)
        }, 0) / verifiedItems.length
      : null

    return NextResponse.json({
      stats: {
        total_items: items?.length ?? 0,
        items_last_30_days: recentItems.length,
        verification_rate: items?.length
          ? Math.round(((items.filter(i => i.status === 'verified').length) / items.length) * 100)
          : 0,
        avg_days_to_verify: avgDaysToVerify ? Math.round(avgDaysToVerify * 10) / 10 : null,
        critical_open: (items ?? []).filter(i => i.priority === 'critical' && i.status === 'open').length,
      },
    })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
