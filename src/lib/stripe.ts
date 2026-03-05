export function getStripe() {
  const Stripe = require('stripe')
  const key = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder'
  return new Stripe(key, { apiVersion: '2024-12-18.acacia' })
}

export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    priceId: null,
    features: ['1 active job', 'Basic punch list', 'Export to PDF'],
    limits: { jobs: 1 },
  },
  pro: {
    name: 'Pro',
    price: 29,
    priceId: process.env.STRIPE_PRO_PRICE_ID || null,
    features: [
      '10 active jobs',
      'Subcontractor invites',
      'Homeowner portal',
      'Photo uploads',
      'Email notifications',
      'PDF export',
    ],
    limits: { jobs: 10 },
  },
  business: {
    name: 'Business',
    price: 79,
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID || null,
    features: [
      'Unlimited jobs',
      'Team seats',
      'Custom branding',
      'API access',
      'Priority support',
      'Advanced analytics',
      'Bulk import/export',
    ],
    limits: { jobs: Infinity },
  },
} as const
