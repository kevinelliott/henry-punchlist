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

  const { data: item, error } = await supabase.from('punch_items').select('*').eq('id', id).single()
  if (error) return NextResponse.json({ error: 'Item not found' }, { status: 404 })

  const [{ data: photos }, { data: comments }] = await Promise.all([
    supabase.from('item_photos').select('*').eq('item_id', id),
    supabase.from('item_comments').select('*').eq('item_id', id).order('created_at'),
  ])

  return NextResponse.json({ data: { ...item, photos: photos || [], comments: comments || [] } })
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = getAuthToken(req)
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const supabase = getSupabaseAdmin()

  const { data, error } = await supabase
    .from('punch_items')
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: 'Failed to update item' }, { status: 500 })
  return NextResponse.json({ data })
}
