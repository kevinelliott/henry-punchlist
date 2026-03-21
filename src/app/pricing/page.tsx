import Link from 'next/link'
import PricingClient from './PricingClient'

export default function PricingPage() {
  const stripeConfigured = !!(process.env.STRIPE_SECRET_KEY)
  return (
    <div className="min-h-screen bg-white">
      <PricingClient stripeConfigured={stripeConfigured} />
    </div>
  )
}
