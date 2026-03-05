import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'

function getAuthToken(req: NextRequest): string | null {
  const auth = req.headers.get('authorization')
  if (!auth?.startsWith('Bearer ')) return null
  return auth.slice(7)
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = getAuthToken(req)
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const supabase = getSupabaseAdmin()

  const { data: job, error: jobError } = await supabase.from('jobs').select('*').eq('id', id).single()
  if (jobError) return NextResponse.json({ error: 'Job not found' }, { status: 404 })

  const { data: items } = await supabase.from('punch_items').select('*').eq('job_id', id).order('created_at')

  return NextResponse.json({ data: { ...job, items: items || [] } })
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = getAuthToken(req)
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const supabase = getSupabaseAdmin()

  const { data, error } = await supabase
    .from('jobs')
    .update(body)
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: 'Failed to update job' }, { status: 500 })
  return NextResponse.json({ data })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = getAuthToken(req)
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const supabase = getSupabaseAdmin()

  const { error } = await supabase.from('jobs').update({ status: 'archived' }).eq('id', id)
  if (error) return NextResponse.json({ error: 'Failed to archive job' }, { status: 500 })

  return NextResponse.json({ success: true })
}
