import Link from 'next/link'
import Button from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { Plus, MapPin, User, ChevronRight, Briefcase } from 'lucide-react'

// Demo jobs data
const demoJobs = [
  {
    id: 'job-1',
    title: 'Oak Street Renovation',
    address: '123 Oak St, Denver CO',
    client_name: 'John Smith',
    status: 'active' as const,
    itemCount: 12,
    openCount: 4,
    completedCount: 6,
    approvedCount: 2,
    created_at: '2025-01-15',
  },
  {
    id: 'job-2',
    title: 'Maple Ave New Construction',
    address: '456 Maple Ave, Boulder CO',
    client_name: 'Sarah Johnson',
    status: 'active' as const,
    itemCount: 24,
    openCount: 18,
    completedCount: 4,
    approvedCount: 2,
    created_at: '2025-02-01',
  },
]

const statusVariant: Record<string, 'success' | 'info' | 'default'> = {
  active: 'success',
  completed: 'info',
  archived: 'default',
}

export default function DashboardPage() {
  const isAtLimit = demoJobs.length >= 1 // Free plan limit

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Jobs</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your construction projects</p>
        </div>
        {isAtLimit ? (
          <Link href="/pricing">
            <Button variant="secondary" className="gap-2">
              <Plus className="w-4 h-4" />
              Upgrade to add more
            </Button>
          </Link>
        ) : (
          <Link href="/dashboard/jobs/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New job
            </Button>
          </Link>
        )}
      </div>

      {/* Free plan banner */}
      {isAtLimit && (
        <div className="mb-6 bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="font-semibold text-indigo-900">You&apos;re on the Free plan</p>
            <p className="text-sm text-indigo-700">Upgrade to Pro to manage up to 10 active jobs.</p>
          </div>
          <Link href="/pricing">
            <Button size="sm">Upgrade to Pro →</Button>
          </Link>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active Jobs', value: demoJobs.length },
          { label: 'Total Items', value: demoJobs.reduce((a, j) => a + j.itemCount, 0) },
          { label: 'Pending Review', value: demoJobs.reduce((a, j) => a + j.completedCount, 0) },
          { label: 'Approved', value: demoJobs.reduce((a, j) => a + j.approvedCount, 0) },
        ].map((stat) => (
          <Card key={stat.label}>
            <div className="px-5 py-4">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Jobs list */}
      {demoJobs.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-2xl">
          <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs yet</h3>
          <p className="text-gray-500 mb-6">Create your first job to get started.</p>
          <Link href="/dashboard/jobs/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" /> Create job
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {demoJobs.map((job) => (
            <Link key={job.id} href={`/dashboard/jobs/${job.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <div className="px-6 py-5 flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-indigo-600" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{job.title}</h3>
                      <Badge variant={statusVariant[job.status]}>
                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      {job.address && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" />
                          {job.address}
                        </span>
                      )}
                      {job.client_name && (
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5" />
                          {job.client_name}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 flex-shrink-0">
                    <div className="hidden md:flex gap-4 text-sm">
                      <div className="text-center">
                        <p className="font-semibold text-gray-900">{job.openCount}</p>
                        <p className="text-gray-400 text-xs">Open</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-yellow-600">{job.completedCount}</p>
                        <p className="text-gray-400 text-xs">Review</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-green-600">{job.approvedCount}</p>
                        <p className="text-gray-400 text-xs">Approved</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Progress bar */}
                <div className="px-6 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 rounded-full transition-all"
                        style={{ width: `${Math.round(((job.completedCount + job.approvedCount) / job.itemCount) * 100)}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400">
                      {Math.round(((job.completedCount + job.approvedCount) / job.itemCount) * 100)}% done
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
