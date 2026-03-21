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

    const { data: projects } = await supabase
      .from('projects')
      .select('user_id, created_at')

    const userMap = new Map<string, { project_count: number; first_project: string }>()

    for (const p of projects ?? []) {
      if (!p.user_id) continue
      const existing = userMap.get(p.user_id)
      if (!existing) {
        userMap.set(p.user_id, { project_count: 1, first_project: p.created_at })
      } else {
        existing.project_count++
        if (p.created_at < existing.first_project) {
          existing.first_project = p.created_at
        }
      }
    }

    const users = Array.from(userMap.entries()).map(([user_id, stats]) => ({
      user_id,
      ...stats,
    }))

    return NextResponse.json({ users, total: users.length })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
