'use client'

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="bg-[#1e293b] hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
    >
      🖨️ Print Report
    </button>
  )
}
