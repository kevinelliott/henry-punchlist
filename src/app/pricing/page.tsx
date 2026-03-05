import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import { Check, X, Minus } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    desc: 'Perfect for solo contractors getting started.',
    cta: 'Get started free',
    href: '/dashboard',
    featured: false,
    features: [
      '1 active job',
      'Basic punch list',
      'Export to PDF',
      'Email support',
    ],
    notIncluded: [
      'Subcontractor invites',
      'Homeowner portal',
      'Photo uploads',
      'Team seats',
      'Custom branding',
      'API access',
    ],
  },
  {
    name: 'Pro',
    price: 29,
    period: 'per month',
    desc: 'For contractors managing multiple projects.',
    cta: 'Start Pro trial',
    href: '/dashboard',
    featured: true,
    features: [
      '10 active jobs',
      'Subcontractor invites',
      'Homeowner portal',
      'Photo uploads (50GB)',
      'Email notifications',
      'PDF export',
      'Priority email support',
    ],
    notIncluded: [
      'Team seats',
      'Custom branding',
      'API access',
    ],
  },
  {
    name: 'Business',
    price: 79,
    period: 'per month',
    desc: 'For growing construction companies.',
    cta: 'Start Business trial',
    href: '/dashboard',
    featured: false,
    features: [
      'Unlimited active jobs',
      'Unlimited subcontractor invites',
      'Homeowner portal',
      'Unlimited photo storage',
      'Team seats (up to 25)',
      'Custom branding',
      'REST API + MCP access',
      'Advanced analytics',
      'Bulk import/export',
      'Dedicated support',
    ],
    notIncluded: [],
  },
]

const competitors = [
  {
    name: 'PunchList Pro',
    price: '$29/mo',
    punchList: true,
    homeownerPortal: true,
    subPortal: true,
    photoUploads: true,
    api: true,
    highlight: true,
  },
  {
    name: 'CoConstruct',
    price: '$99/mo',
    punchList: true,
    homeownerPortal: true,
    subPortal: false,
    photoUploads: true,
    api: false,
    highlight: false,
  },
  {
    name: 'Buildertrend',
    price: '$299/mo',
    punchList: true,
    homeownerPortal: true,
    subPortal: true,
    photoUploads: true,
    api: true,
    highlight: false,
  },
]

const faqs = [
  {
    q: 'Do subcontractors need to create accounts?',
    a: 'No. Subs receive a unique secure link via email. They can view and update their assigned items without signing up.',
  },
  {
    q: 'How does the homeowner portal work?',
    a: "Homeowners get a token-based link to their job's portal. They can review completed items, see photos, and click Approve or Reject — no account needed.",
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Cancel anytime and you keep access until the end of your billing period. No cancellation fees.',
  },
  {
    q: 'What happens when I hit my job limit?',
    a: 'You can archive completed jobs to free up slots, or upgrade to a higher plan to add more active jobs.',
  },
  {
    q: 'Is there a free trial for Pro/Business?',
    a: 'Yes — 14 days free, no credit card required. Full access to all features during the trial.',
  },
  {
    q: 'What does API access include?',
    a: 'Business plan includes full REST API and MCP (Model Context Protocol) support for AI integration. Create jobs, add items, and query status programmatically.',
  },
]

function FeatureCheck({ value }: { value: boolean | 'partial' }) {
  if (value === true) return <Check className="w-5 h-5 text-green-600 mx-auto" />
  if (value === 'partial') return <Minus className="w-5 h-5 text-gray-400 mx-auto" />
  return <X className="w-5 h-5 text-gray-300 mx-auto" />
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header */}
      <section className="pt-20 pb-12 text-center bg-gray-50 border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Simple, honest pricing</h1>
          <p className="text-xl text-gray-600">
            No per-seat surprises. No hidden fees. Pick the plan that fits your volume.
          </p>
        </div>
      </section>

      {/* Plans */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border-2 flex flex-col ${
                plan.featured
                  ? 'border-indigo-600 shadow-xl'
                  : 'border-gray-200'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-indigo-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="p-8 flex-1">
                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-gray-500 text-sm mt-1 mb-6">{plan.desc}</p>
                <div className="mb-8">
                  <span className="text-5xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-500 ml-2">/{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-400">
                      <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="px-8 pb-8">
                <Link href={plan.href}>
                  <Button
                    variant={plan.featured ? 'primary' : 'secondary'}
                    size="lg"
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Competitor Table */}
      <section className="bg-gray-50 border-y border-gray-200 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How we stack up
            </h2>
            <p className="text-gray-600">Compare PunchList Pro to other construction management tools.</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Tool</th>
                  <th className="text-center px-4 py-4 text-sm font-semibold text-gray-900">Price</th>
                  <th className="text-center px-4 py-4 text-sm font-semibold text-gray-900">Punch Lists</th>
                  <th className="text-center px-4 py-4 text-sm font-semibold text-gray-900">Homeowner Portal</th>
                  <th className="text-center px-4 py-4 text-sm font-semibold text-gray-900">Sub Portal</th>
                  <th className="text-center px-4 py-4 text-sm font-semibold text-gray-900">Photos</th>
                  <th className="text-center px-4 py-4 text-sm font-semibold text-gray-900">API</th>
                </tr>
              </thead>
              <tbody>
                {competitors.map((c, i) => (
                  <tr
                    key={c.name}
                    className={`${i < competitors.length - 1 ? 'border-b border-gray-200' : ''} ${
                      c.highlight ? 'bg-indigo-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${c.highlight ? 'text-indigo-700' : 'text-gray-900'}`}>
                        {c.name}
                      </span>
                      {c.highlight && (
                        <span className="ml-2 text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full">You</span>
                      )}
                    </td>
                    <td className="text-center px-4 py-4 text-sm font-semibold text-gray-700">{c.price}</td>
                    <td className="text-center px-4 py-4"><FeatureCheck value={c.punchList} /></td>
                    <td className="text-center px-4 py-4"><FeatureCheck value={c.homeownerPortal} /></td>
                    <td className="text-center px-4 py-4"><FeatureCheck value={c.subPortal} /></td>
                    <td className="text-center px-4 py-4"><FeatureCheck value={c.photoUploads} /></td>
                    <td className="text-center px-4 py-4"><FeatureCheck value={c.api} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            * Prices as of 2025. Buildertrend $299/mo, CoConstruct $99/mo base plans.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Frequently asked questions
          </h2>
          <div className="space-y-8">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-gray-200 pb-8 last:border-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 py-20 text-center text-white">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Start closing jobs faster today</h2>
          <p className="text-indigo-200 mb-8">No credit card needed. Up and running in minutes.</p>
          <Link href="/dashboard">
            <Button className="bg-white text-indigo-600 hover:bg-indigo-50" size="lg">
              Create your free account
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
