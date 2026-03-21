import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

function getApiKey(request: NextRequest): string | null {
  const auth = request.headers.get('authorization')
  if (auth?.startsWith('Bearer ')) return auth.slice(7)
  return null
}

function validateApiKey(key: string | null): boolean {
  const adminKey = process.env.ADMIN_API_KEY
  if (!adminKey) return false
  return key === adminKey
}

export async function GET(request: NextRequest) {
  const key = getApiKey(request)
  if (!validateApiKey(key)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('project_id')

    const supabase = createServiceClient()
    let query = supabase.from('punch_items').select('*').order('created_at', { ascending: true })

    if (projectId) {
      query = query.eq('project_id', projectId)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ punch_items: data, count: data?.length ?? 0 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const key = getApiKey(request)
  if (!validateApiKey(key)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const {
      project_id,
      user_id,
      area,
      trade,
      description,
      priority,
      assigned_to_name,
      assigned_to_email,
    } = body

    if (!project_id || !area || !trade || !description) {
      return NextResponse.json(
        { error: 'project_id, area, trade, and description are required' },
        { status: 400 }
      )
    }

    const supabase = createServiceClient()
    const { data, error } = await supabase
      .from('punch_items')
      .insert([{
        project_id,
        user_id,
        area,
        trade,
        description,
        priority: priority || 'medium',
        assigned_to_name,
        assigned_to_email,
        status: 'open',
      }])
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ punch_item: data }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
