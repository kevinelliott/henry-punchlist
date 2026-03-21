import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  return POST(request)
}

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    let plan = searchParams.get('plan') || 'starter'

    let body: Record<string, string> = {}
    try {
      body = await request.json()
      if (body.plan) plan = body.plan
    } catch {
      // GET request or no body
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Stripe not configured. Set STRIPE_SECRET_KEY.' },
        { status: 503 }
      )
    }

    const priceId = plan === 'growth'
      ? process.env.STRIPE_GROWTH_PRICE_ID
      : process.env.STRIPE_STARTER_PRICE_ID

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID not configured' }, { status: 503 })
    }

    const stripe = getStripe()
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || request.headers.get('origin') || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/dashboard?checkout=success`,
      cancel_url: `${baseUrl}/pricing?checkout=cancelled`,
    })

    return NextResponse.json({ url: session.url, sessionId: session.id })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Checkout failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
