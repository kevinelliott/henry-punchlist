import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe not configured.' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { customerId } = body

    if (!customerId) {
      return NextResponse.json({ error: 'customerId is required' }, { status: 400 })
    }

    const stripe = getStripe()
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || request.headers.get('origin') || 'http://localhost:3000'

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${baseUrl}/dashboard`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Portal session failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
