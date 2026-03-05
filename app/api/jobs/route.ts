import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getDb, generateId } from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const db = getDb()
  const user = session.user as any

  let jobs
  if (user.role === 'contractor') {
    jobs = db.prepare(`
      SELECT j.*, u.name as contractor_name,
        COUNT(p.id) as total_items,
        SUM(CASE WHEN p.status = 'approved' THEN 1 ELSE 0 END) as approved_items
      FROM jobs j
      LEFT JOIN users u ON j.contractor_id = u.id
      LEFT JOIN punch_items p ON j.id = p.job_id
      WHERE j.contractor_id = ?
      GROUP BY j.id
      ORDER BY j.created_at DESC
    `).all(user.id)
  } else if (user.role === 'subcontractor') {
    jobs = db.prepare(`
      SELECT DISTINCT j.*, u.name as contractor_name,
        COUNT(p.id) as total_items,
        SUM(CASE WHEN p.status = 'approved' THEN 1 ELSE 0 END) as approved_items
      FROM jobs j
      LEFT JOIN users u ON j.contractor_id = u.id
      LEFT JOIN punch_items p ON j.id = p.job_id
      WHERE p.assigned_to = ?
      GROUP BY j.id
      ORDER BY j.created_at DESC
    `).all(user.id)
  } else {
    // homeowner
    jobs = db.prepare(`
      SELECT j.*, u.name as contractor_name,
        COUNT(p.id) as total_items,
        SUM(CASE WHEN p.status = 'approved' THEN 1 ELSE 0 END) as approved_items
      FROM jobs j
      LEFT JOIN users u ON j.contractor_id = u.id
      LEFT JOIN punch_items p ON j.id = p.job_id
      WHERE j.homeowner_email = ?
      GROUP BY j.id
      ORDER BY j.created_at DESC
    `).all(session.user.email)
  }

  return NextResponse.json(jobs)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const user = session?.user as any
  if (!user || user.role !== 'contractor') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { name, address, homeowner_email } = await req.json()
  if (!name || !address || !homeowner_email) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const db = getDb()
  const id = generateId()
  db.prepare('INSERT INTO jobs (id, name, address, contractor_id, homeowner_email) VALUES (?, ?, ?, ?, ?)').run(
    id, name, address, user.id, homeowner_email
  )

  return NextResponse.json({ id })
}
