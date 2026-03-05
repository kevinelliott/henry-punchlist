import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

function isAdmin(req: NextRequest): boolean {
  const auth = req.headers.get('authorization')
  const adminKey = process.env.ADMIN_API_KEY || 'admin-placeholder'
  return auth === `Bearer ${adminKey}`
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const supabase = getSupabaseAdmin()

  const [
    { count: jobCount },
    { count: itemCount },
    { count: profileCount },
  ] = await Promise.all([
    supabase.from('jobs').select('id', { count: 'exact', head: true }),
    supabase.from('punch_items').select('id', { count: 'exact', head: true }),
    supabase.from('profiles').select('id', { count: 'exact', head: true }),
  ])

  return NextResponse.json({
    stats: {
      jobs: jobCount || 0,
      items: itemCount || 0,
      users: profileCount || 0,
    },
  })
}
