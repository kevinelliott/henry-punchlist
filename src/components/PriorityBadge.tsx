import { Priority } from '@/types'

interface PriorityBadgeProps {
  priority: Priority
}

const priorityConfig = {
  critical: { label: 'Critical', icon: '🔴', className: 'bg-red-100 text-red-800 border border-red-200' },
  high: { label: 'High', icon: '🟠', className: 'bg-orange-100 text-orange-800 border border-orange-200' },
  normal: { label: 'Normal', icon: '🟡', className: 'bg-yellow-100 text-yellow-800 border border-yellow-200' },
  low: { label: 'Low', icon: '⚪', className: 'bg-gray-100 text-gray-700 border border-gray-200' },
}

export default function PriorityBadge({ priority }: PriorityBadgeProps) {
  const config = priorityConfig[priority] || priorityConfig.normal
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${config.className}`}>
      <span>{config.icon}</span>
      {config.label}
    </span>
  )
}
