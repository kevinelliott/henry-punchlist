import { ItemStatus } from '@/types'

interface StatusBadgeProps {
  status: ItemStatus
}

const statusConfig = {
  open: { label: 'Open', className: 'bg-red-100 text-red-800 border border-red-200' },
  acknowledged: { label: 'Acknowledged', className: 'bg-blue-100 text-blue-800 border border-blue-200' },
  'in-progress': { label: 'In Progress', className: 'bg-indigo-100 text-indigo-800 border border-indigo-200' },
  resolved: { label: 'Resolved', className: 'bg-green-100 text-green-800 border border-green-200' },
  rejected: { label: 'Rejected', className: 'bg-gray-100 text-gray-700 border border-gray-200' },
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.open
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  )
}
