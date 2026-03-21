interface RetainageBannerProps {
  openCount: number
  retainageAmount?: number
}

export default function RetainageBanner({ openCount, retainageAmount }: RetainageBannerProps) {
  const formatted = retainageAmount
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(retainageAmount)
    : null

  if (openCount > 0) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">🔴</span>
          <span className="font-semibold text-red-800">
            Retainage Release: BLOCKED — {openCount} item{openCount !== 1 ? 's' : ''} still open
            {formatted && <span className="ml-2 text-red-600">({formatted} held)</span>}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">🔴</span>
          <span className="font-semibold text-red-800">
            Owner Sign-Off: BLOCKED — {openCount} item{openCount !== 1 ? 's' : ''} still open
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-green-200 bg-green-50 p-4">
      <div className="flex items-center gap-2">
        <span className="text-lg">🟢</span>
        <span className="font-semibold text-green-800">
          All items resolved — ready for owner walkthrough
          {formatted && <span className="ml-2 text-green-600">(Release {formatted} retainage)</span>}
        </span>
      </div>
    </div>
  )
}
