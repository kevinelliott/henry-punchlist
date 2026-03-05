import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { getSupabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: 'Missing signature or secret' }, { status: 400 })
  }

  let event
  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = getSupabaseAdmin()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as { metadata?: { userId?: string; plan?: string }; customer?: string }
      const userId = session.metadata?.userId
      const plan = session.metadata?.plan as 'pro' | 'business' | undefined
      const customerId = typeof session.customer === 'string' ? session.customer : null

      if (userId && plan) {
        await supabase
          .from('profiles')
          .update({ plan, stripe_customer_id: customerId })
          .eq('user_id', userId)
      }
      break
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as { customer?: string }
      const customerId = typeof sub.customer === 'string' ? sub.customer : null
      if (customerId) {
        await supabase
          .from('profiles')
          .update({ plan: 'free' })
          .eq('stripe_customer_id', customerId)
      }
      break
    }

    case 'customer.subscription.updated': {
      const sub = event.data.object as { customer?: string; status?: string }
      const customerId = typeof sub.customer === 'string' ? sub.customer : null
      if (customerId && sub.status === 'active') {
        // Plan already updated via checkout.session.completed
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
