import Link from 'next/link'
import PricingClient from './PricingClient'

export default function PricingPage() {
  const stripeConfigured = !!(process.env.STRIPE_SECRET_KEY)

  return (
    <div className="min-h-screen bg-gray-50">
      <PricingClient stripeConfigured={stripeConfigured} />
    </div>
  )
}
