import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params

  if (token.startsWith('demo-token-')) {
    return NextResponse.json({ success: true, demo: true })
  }

  const body = await request.json().catch(() => ({}))
  const { notes } = body

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
  )

  const { error } = await supabase
    .from('punch_items')
    .update({
      status: 'rejected',
      resolution_notes: notes || null,
    })
    .eq('fix_token', token)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
