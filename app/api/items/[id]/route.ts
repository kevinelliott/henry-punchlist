import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getDb, generateId } from '@/lib/db'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const db = getDb()
  const item = db.prepare(`
    SELECT p.*, u.name as assigned_name, u.email as assigned_email
    FROM punch_items p
    LEFT JOIN users u ON p.assigned_to = u.id
    WHERE p.id = ?
  `).get(params.id)

  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const comments = db.prepare(`
    SELECT c.*, u.name as author_name, u.role as author_role
    FROM comments c
    JOIN users u ON c.user_id = u.id
    WHERE c.item_id = ?
    ORDER BY c.created_at ASC
  `).all(params.id)

  const subs = db.prepare("SELECT id, name, email FROM users WHERE role = 'subcontractor'").all()

  return NextResponse.json({ item, comments, subs })
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  const user = session?.user as any
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const db = getDb()
  const item = db.prepare('SELECT * FROM punch_items WHERE id = ?').get(params.id) as any
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = await req.json()
  const { status, assigned_to, comment } = body

  // Permission checks
  if (status === 'approved' && user.role !== 'homeowner') {
    return NextResponse.json({ error: 'Only homeowners can approve items' }, { status: 403 })
  }
  if ((status === 'completed' || status === 'in-progress') && user.role !== 'subcontractor' && user.role !== 'contractor') {
    return NextResponse.json({ error: 'Only subs or contractors can mark items complete' }, { status: 403 })
  }

  if (status) {
    db.prepare("UPDATE punch_items SET status = ?, updated_at = datetime('now') WHERE id = ?").run(status, params.id)
  }
  if (assigned_to !== undefined) {
    db.prepare("UPDATE punch_items SET assigned_to = ?, updated_at = datetime('now') WHERE id = ?").run(assigned_to || null, params.id)
  }

  if (comment) {
    const commentId = generateId()
    db.prepare('INSERT INTO comments (id, item_id, user_id, text) VALUES (?, ?, ?, ?)').run(
      commentId, params.id, user.id, comment
    )
  }

  return NextResponse.json({ success: true })
}
