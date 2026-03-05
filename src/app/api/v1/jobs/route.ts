import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { generateToken } from '@/lib/utils'

function getAuthToken(req: NextRequest): string | null {
  const auth = req.headers.get('authorization')
  if (!auth?.startsWith('Bearer ')) return null
  return auth.slice(7)
}

export async function GET(req: NextRequest) {
  const token = getAuthToken(req)
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const supabase = getSupabaseAdmin()
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')

    let query = supabase.from('jobs').select('*').order('created_at', { ascending: false })
    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query
    if (error) throw error

    return NextResponse.json({ data })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const token = getAuthToken(req)
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { title, address, client_name, client_email } = body

    if (!title) {
      return NextResponse.json({ error: 'title is required' }, { status: 400 })
    }

    const supabase = getSupabaseAdmin()
    const owner_token = generateToken()

    const { data, error } = await supabase
      .from('jobs')
      .insert({
        title,
        address: address || null,
        client_name: client_name || null,
        client_email: client_email || null,
        owner_token,
        status: 'active',
        contractor_id: 'api-user',
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ data }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create job' }, { status: 500 })
  }
}
