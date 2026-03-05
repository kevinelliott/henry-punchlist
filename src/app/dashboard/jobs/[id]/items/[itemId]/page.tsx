import Link from 'next/link'
import Button from '@/components/ui/Button'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { ArrowLeft, Camera, MessageSquare, Flag, Clock, Mail, ChevronDown } from 'lucide-react'
import { STATUS_COLORS, PRIORITY_COLORS, formatDate } from '@/lib/utils'

const demoItem = {
  id: 'item-3',
  job_id: 'job-1',
  title: 'Install backsplash tile',
  description: 'Kitchen backsplash still needs to be installed. Tile is on-site (box under kitchen island). Grout color: Pewter #545.',
  category: 'Tile',
  priority: 'critical' as const,
  status: 'in_progress' as const,
  assigned_to_email: 'tiles@works.com',
  due_date: '2025-01-28',
  created_at: '2025-01-15T10:00:00Z',
  updated_at: '2025-01-20T14:30:00Z',
}

const demoPhotos = [
  { id: 'p1', storage_path: '/demo/photo1.jpg', uploaded_by: 'tiles@works.com', created_at: '2025-01-20' },
]

const demoComments = [
  {
    id: 'c1',
    author: 'Contractor',
    content: 'Please match the existing tile in the adjacent bathroom for grout line width.',
    created_at: '2025-01-16T09:00:00Z',
  },
  {
    id: 'c2',
    author: 'tiles@works.com',
    content: 'Understood. Will use 1/8" spacers. Scheduling for Wednesday.',
    created_at: '2025-01-17T11:30:00Z',
  },
]

const statusOptions = ['open', 'in_progress', 'completed', 'approved', 'rejected']

const statusLabel: Record<string, string> = {
  open: 'Open',
  in_progress: 'In Progress',
  completed: 'Completed',
  approved: 'Approved',
  rejected: 'Rejected',
}

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string; itemId: string }>
}) {
  const { id } = await params

  return (
    <div>
      <div className="mb-6">
        <Link
          href={`/dashboard/jobs/${id}`}
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to job
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{demoItem.title}</h1>
            <div className="flex items-center gap-3 mt-2">
              {demoItem.category && (
                <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded font-medium">
                  {demoItem.category}
                </span>
              )}
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex items-center gap-1 ${PRIORITY_COLORS[demoItem.priority]}`}>
                <Flag className="w-3 h-3" />
                {demoItem.priority.charAt(0).toUpperCase() + demoItem.priority.slice(1)}
              </span>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[demoItem.status]}`}>
                {statusLabel[demoItem.status]}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-gray-900">Description</h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {demoItem.description || 'No description provided.'}
              </p>
            </CardContent>
          </Card>

          {/* Photos */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-gray-500" />
                  Photos ({demoPhotos.length})
                </h2>
                <Button variant="secondary" size="sm">Upload photo</Button>
              </div>
            </CardHeader>
            <CardContent>
              {demoPhotos.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl">
                  <Camera className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">No photos yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {demoPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center"
                    >
                      <Camera className="w-8 h-8 text-gray-300" />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Comments */}
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-gray-500" />
                Comments ({demoComments.length})
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-4">
                {demoComments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-indigo-700">
                        {comment.author.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-gray-900">{comment.author}</p>
                        <p className="text-xs text-gray-400">{formatDate(comment.created_at)}</p>
                      </div>
                      <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-indigo-700">C</span>
                </div>
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <Button size="sm">Post</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-gray-900">Details</h2>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Status</dt>
                  <dd>
                    <div className="relative">
                      <select className={`w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none cursor-pointer ${STATUS_COLORS[demoItem.status]}`}>
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>{statusLabel[s]}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 pointer-events-none" />
                    </div>
                  </dd>
                </div>

                <div>
                  <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Assigned to</dt>
                  <dd className="text-sm text-gray-900">
                    {demoItem.assigned_to_email ? (
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                        {demoItem.assigned_to_email}
                      </span>
                    ) : (
                      <span className="text-gray-400 italic">Unassigned</span>
                    )}
                  </dd>
                </div>

                {demoItem.due_date && (
                  <div>
                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Due Date</dt>
                    <dd className="text-sm text-gray-900 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {demoItem.due_date}
                    </dd>
                  </div>
                )}

                <div>
                  <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Created</dt>
                  <dd className="text-sm text-gray-900">{formatDate(demoItem.created_at)}</dd>
                </div>

                <div>
                  <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Last Updated</dt>
                  <dd className="text-sm text-gray-900">{formatDate(demoItem.updated_at)}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Button variant="secondary" className="w-full mb-2">Send sub reminder</Button>
              <Button variant="danger" className="w-full" size="sm">Mark rejected</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
