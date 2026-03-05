import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PunchList Pro — Construction Punch List Manager',
  description:
    'The modern three-sided punch list manager for contractors, subcontractors, and homeowners. Streamline your construction close-out process.',
  keywords: ['punch list', 'construction management', 'contractor software', 'subcontractor portal'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
