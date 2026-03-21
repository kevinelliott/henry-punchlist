import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  const { token } = params

  // Demo tokens — don't persist
  if (token.startsWith('demo-')) {
    return NextResponse.json({ success: true, demo: true })
  }

  try {
    const body = await request.json()
    const { subName, company, workDescription, photoFilenames } = body

    if (!subName || !company || !workDescription) {
      return NextResponse.json(
        { error: 'subName, company, and workDescription are required' },
        { status: 400 }
      )
    }

    const supabase = createServiceClient()

    // Find item by token
    const { data: item, error: findError } = await supabase
      .from('punch_items')
      .select('id, status')
      .eq('completion_token', token)
      .single()

    if (findError || !item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    if (item.status === 'verified') {
      return NextResponse.json({ error: 'This item is already verified' }, { status: 409 })
    }

    // Update item to submitted
    const { error: updateError } = await supabase
      .from('punch_items')
      .update({
        status: 'submitted',
        completion_notes: `${subName} (${company}): ${workDescription}`,
        photo_filenames: photoFilenames || null,
        submitted_at: new Date().toISOString(),
      })
      .eq('id', item.id)

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
