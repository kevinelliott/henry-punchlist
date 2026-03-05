'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import StatusBadge from '@/components/status-badge'
import { Plus, MapPin, BarChart3, ChevronRight } from 'lucide-react'

interface Job {
  id: string
  name: string
  address: string
  status: string
  total_items: number
  approved_items: number
  contractor_name: string
}

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const user = session?.user as any

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/')
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/jobs')
        .then((r) => r.json())
        .then((data) => { setJobs(data); setLoading(false) })
    }
  }, [status])

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-400">Loading...</div>
        </div>
      </div>
    )
  }

  const roleTitle = user?.role === 'contractor' ? 'Your Jobs'
    : user?.role === 'subcontractor' ? 'Assigned Jobs'
    : 'Your Properties'

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {roleTitle}
            </h1>
            <p className="text-gray-400 mt-1">
              Welcome back, <span className="text-orange-400">{user?.name}</span>
            </p>
          </div>
          {user?.role === 'contractor' && (
            <Link
              href="/jobs/new"
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Job
            </Link>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Jobs', value: jobs.length },
            { label: 'Active Jobs', value: jobs.filter(j => j.status === 'active').length },
            { label: 'Total Items', value: jobs.reduce((a, j) => a + (j.total_items || 0), 0) },
            { label: 'Approved', value: jobs.reduce((a, j) => a + (j.approved_items || 0), 0) },
          ].map((stat) => (
            <div key={stat.label} className="bg-gray-800 rounded-xl border border-gray-700 p-4">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-gray-400 text-sm mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Jobs list */}
        {jobs.length === 0 ? (
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-12 text-center">
            <div className="text-4xl mb-4">🏗️</div>
            <div className="text-white font-semibold text-lg mb-2">No jobs yet</div>
            {user?.role === 'contractor' && (
              <div className="text-gray-400 mb-4">Create your first job to get started</div>
            )}
            {user?.role === 'contractor' && (
              <Link href="/jobs/new" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors">
                <Plus className="w-4 h-4" />
                Create Job
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map((job) => {
              const pct = job.total_items > 0 ? Math.round((job.approved_items / job.total_items) * 100) : 0
              return (
                <Link
                  key={job.id}
                  href={`/jobs/${job.id}`}
                  className="block bg-gray-800 hover:bg-gray-750 rounded-xl border border-gray-700 hover:border-orange-500/50 p-5 transition-all group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-white font-semibold text-lg group-hover:text-orange-400 transition-colors truncate">
                          {job.name}
                        </h2>
                        <StatusBadge status={job.status} />
                      </div>
                      <div className="flex items-center gap-1 text-gray-400 text-sm mb-3">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        {job.address}
                      </div>

                      {/* Progress bar */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-700 rounded-full h-1.5">
                          <div
                            className="bg-orange-500 h-1.5 rounded-full transition-all"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <div className="flex items-center gap-1 text-gray-400 text-sm whitespace-nowrap">
                          <BarChart3 className="w-3.5 h-3.5" />
                          {job.approved_items}/{job.total_items} approved ({pct}%)
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-orange-400 transition-colors shrink-0 mt-1" />
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
