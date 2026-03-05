import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getDb, generateId } from '@/lib/db'

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const db = getDb()
  const job = db.prepare(`
    SELECT j.*, u.name as contractor_name
    FROM jobs j LEFT JOIN users u ON j.contractor_id = u.id
    WHERE j.id = ?
  `).get(params.id)

  if (!job) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const items = db.prepare(`
    SELECT p.*, u.name as assigned_name
    FROM punch_items p
    LEFT JOIN users u ON p.assigned_to = u.id
    WHERE p.job_id = ?
    ORDER BY p.created_at ASC
  `).all(params.id)

  const subs = db.prepare("SELECT id, name, email FROM users WHERE role = 'subcontractor'").all()

  return NextResponse.json({ job, items, subs })
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  const user = session?.user as any
  if (!user || user.role !== 'contractor') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { title, description, assigned_to } = await req.json()
  if (!title) return NextResponse.json({ error: 'Title required' }, { status: 400 })

  const db = getDb()
  const id = generateId()
  db.prepare('INSERT INTO punch_items (id, job_id, title, description, assigned_to) VALUES (?, ?, ?, ?, ?)').run(
    id, params.id, title, description || null, assigned_to || null
  )

  return NextResponse.json({ id })
}
