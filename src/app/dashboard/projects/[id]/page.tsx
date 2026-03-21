import Link from 'next/link'

export default function DashboardProjectPage({ params }: { params: { id: string } }) {
  const { id } = params

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/dashboard" className="hover:text-gray-900 transition-colors">Dashboard</Link>
        <span>/</span>
        <span className="text-gray-900">Project {id}</span>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Punch List</h1>
          <p className="text-gray-500 text-sm mt-1">Project ID: {id}</p>
        </div>
        <Link
          href={`/dashboard/projects/${id}/item/new`}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
        >
          + Add Punch Item
        </Link>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
        <p className="text-amber-800 font-medium mb-2">Sign in to view your punch list</p>
        <p className="text-amber-700 text-sm mb-4">
          Connect your Supabase instance to manage real projects and punch items.
        </p>
        <Link
          href="/auth/login"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium text-sm transition-colors"
        >
          Sign In
        </Link>
      </div>

      <div className="mt-6 text-center">
        <Link href="/projects/demo" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
          View demo project instead →
        </Link>
      </div>
    </div>
  )
}
