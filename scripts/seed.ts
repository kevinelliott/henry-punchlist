import bcrypt from 'bcryptjs'
import { getDb, generateId } from '../lib/db'

async function seed() {
  const db = getDb()

  console.log('🌱 Seeding database...')

  // Clear existing data
  db.exec('DELETE FROM comments; DELETE FROM punch_items; DELETE FROM jobs; DELETE FROM users;')

  // Create users
  const users = [
    { id: generateId(), name: 'Bob Contractor', email: 'contractor@test.com', role: 'contractor' },
    { id: generateId(), name: 'Sam Plumber', email: 'sub1@test.com', role: 'subcontractor' },
    { id: generateId(), name: 'Mike Electrician', email: 'sub2@test.com', role: 'subcontractor' },
    { id: generateId(), name: 'Jennifer Owner', email: 'owner@test.com', role: 'homeowner' },
  ]

  const passwordHash = await bcrypt.hash('password123', 10)

  const insertUser = db.prepare(
    'INSERT INTO users (id, name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)'
  )

  for (const user of users) {
    insertUser.run(user.id, user.name, user.email, passwordHash, user.role)
    console.log(`  ✅ Created ${user.role}: ${user.email}`)
  }

  // Create a job
  const contractor = users[0]
  const sub1 = users[1]
  const sub2 = users[2]

  const jobId = generateId()
  db.prepare(
    'INSERT INTO jobs (id, name, address, contractor_id, homeowner_email) VALUES (?, ?, ?, ?, ?)'
  ).run(jobId, 'Riverside Kitchen Remodel', '123 Riverside Dr, Portland OR 97201', contractor.id, 'owner@test.com')

  console.log(`  ✅ Created job: Riverside Kitchen Remodel`)

  // Create punch list items
  const items = [
    { title: 'Install kitchen cabinets', description: 'Upper and lower cabinets, soft-close hinges', assignedTo: sub1.id, status: 'approved' },
    { title: 'Plumbing rough-in', description: 'Hot/cold supply lines and drain for sink', assignedTo: sub1.id, status: 'approved' },
    { title: 'Electrical panel upgrade', description: 'Upgrade to 200A service, add dedicated circuits for appliances', assignedTo: sub2.id, status: 'completed' },
    { title: 'Under-cabinet lighting', description: 'LED strip lights under all upper cabinets', assignedTo: sub2.id, status: 'in-progress' },
    { title: 'Install sink and faucet', description: 'Farmhouse sink, pull-down faucet', assignedTo: sub1.id, status: 'in-progress' },
    { title: 'Countertop installation', description: 'Quartz countertops, all edges finished', assignedTo: null, status: 'open' },
    { title: 'Backsplash tile', description: 'Subway tile, full height behind range', assignedTo: null, status: 'open' },
    { title: 'Final inspection walkthrough', description: 'Owner walkthrough and punch list sign-off', assignedTo: null, status: 'open' },
  ]

  const insertItem = db.prepare(
    'INSERT INTO punch_items (id, job_id, title, description, assigned_to, status) VALUES (?, ?, ?, ?, ?, ?)'
  )

  for (const item of items) {
    const itemId = generateId()
    insertItem.run(itemId, jobId, item.title, item.description, item.assignedTo, item.status)
    console.log(`  ✅ Item [${item.status}]: ${item.title}`)

    // Add a sample comment on the first item
    if (item.status === 'approved') {
      const commentId = generateId()
      db.prepare('INSERT INTO comments (id, item_id, user_id, text) VALUES (?, ?, ?, ?)').run(
        commentId,
        itemId,
        contractor.id,
        'Great work on this one! Cabinets look perfect.'
      )
    }
  }

  console.log('\n✅ Seed complete!')
  console.log('\n📋 Login credentials:')
  console.log('  Contractor: contractor@test.com / password123')
  console.log('  Sub 1:      sub1@test.com / password123')
  console.log('  Sub 2:      sub2@test.com / password123')
  console.log('  Homeowner:  owner@test.com / password123')
}

seed().catch(console.error)
