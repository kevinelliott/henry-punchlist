import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { plan, userId, email } = body

  const priceIds: Record<string, string> = {
    pro: process.env.STRIPE_PRO_PRICE_ID || 'price_placeholder_pro',
    business: process.env.STRIPE_BUSINESS_PRICE_ID || 'price_placeholder_business',
  }

  const priceId = priceIds[plan]
  if (!priceId) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://punchlistpro.com'

  try {
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/dashboard?upgraded=1`,
      cancel_url: `${appUrl}/pricing`,
      metadata: { userId, plan },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
