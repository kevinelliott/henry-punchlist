const STATUS_STYLES: Record<string, string> = {
  open: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
  'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  completed: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  approved: 'bg-green-500/20 text-green-400 border-green-500/30',
  active: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  complete: 'bg-green-500/20 text-green-400 border-green-500/30',
}

const STATUS_LABELS: Record<string, string> = {
  open: 'Open',
  'in-progress': 'In Progress',
  completed: 'Completed',
  approved: '✓ Approved',
  active: 'Active',
  complete: 'Complete',
}

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-medium ${STATUS_STYLES[status] || ''}`}>
      {STATUS_LABELS[status] || status}
    </span>
  )
}
