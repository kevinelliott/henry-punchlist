import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 })
  }

  let event
  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Webhook verification failed'
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 })
  }

  const supabase = createServiceClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as { customer_email?: string; subscription?: string; customer?: string }
        console.log('Checkout completed:', session.customer_email)
        // TODO: update user subscription status in DB
        break
      }
      case 'customer.subscription.updated': {
        const subscription = event.data.object as { id: string; status: string }
        console.log('Subscription updated:', subscription.id, subscription.status)
        // TODO: update subscription status in DB
        break
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as { id: string }
        console.log('Subscription deleted:', subscription.id)
        // TODO: downgrade user to free in DB
        break
      }
      case 'invoice.payment_failed': {
        const invoice = event.data.object as { customer_email?: string }
        console.log('Payment failed:', invoice.customer_email)
        // TODO: notify user, handle grace period
        break
      }
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Webhook handler error:', err)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
