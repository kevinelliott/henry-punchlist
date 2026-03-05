# PunchList Pro — henry-punchlist

A three-sided construction punch list manager for contractors, subcontractors, and homeowners.

## Tech Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** — dark construction theme (gray + safety orange)
- **SQLite** (better-sqlite3) — zero-config local database
- **NextAuth.js** — role-based credentials auth

## Three Roles

| Role | Can Do |
|------|--------|
| **Contractor** | Create jobs, add punch items, assign to subs, view all |
| **Subcontractor** | View assigned items, mark in-progress/complete |
| **Homeowner** | View all items, approve completed items |

## Item Status Flow

```
open → in-progress → completed → approved
```
- Subs/contractors move items through open → in-progress → completed
- Only homeowners can approve completed items

## Setup

```bash
npm install
npm run seed     # Create demo data + users
npm run dev      # Start on http://localhost:3000
```

## Demo Accounts (password: `password123`)

| Role | Email |
|------|-------|
| Contractor | contractor@test.com |
| Subcontractor | sub1@test.com |
| Subcontractor | sub2@test.com |
| Homeowner | owner@test.com |

## Deploy to Vercel

```bash
vercel deploy
```

Add environment variables:
- `NEXTAUTH_SECRET` — any random string
- `NEXTAUTH_URL` — your deployment URL

> **Note:** SQLite is local-only. For production, swap `better-sqlite3` for a hosted DB (Supabase/PlanetScale).
