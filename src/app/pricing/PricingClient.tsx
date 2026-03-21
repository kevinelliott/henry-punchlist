'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Props {
  stripeConfigured: boolean
}

export default function PricingClient({ stripeConfigured }: Props) {
  const [toast, setToast] = useState(false)

  function handlePaidPlan(plan: string) {
    if (!stripeConfigured) {
      setToast(true)
      setTimeout(() => setToast(false), 4000)
      return
    }
    window.location.href = `/api/stripe/checkout?plan=${plan}`
  }

  return (
    <div className="py-20 px-4">
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-amber-100 border border-amber-300 text-amber-800 px-6 py-3 rounded-xl shadow-lg font-medium text-sm">
          Demo mode — Stripe not configured. Billing is active in production.
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Simple, honest pricing</h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Start free. Upgrade when you need more. No per-seat fees — one price for your whole team.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Free */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Free</h2>
              <p className="text-gray-500 text-sm">Try it on your next project</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">$0</span>
              <span className="text-gray-500 text-sm">/mo</span>
            </div>
            <ul className="space-y-3 mb-8">
              <PricingFeature text="Up to 25 punch items" />
              <PricingFeature text="1 active project" />
              <PricingFeature text="Sub completion links" />
              <PricingFeature text="Payment blocking banners" />
              <PricingFeature text="Progress tracking" />
            </ul>
            <Link
              href="/auth/signup"
              className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-4 rounded-xl font-semibold transition-colors"
            >
              Get Started Free
            </Link>
          </div>

          {/* Starter */}
          <div className="bg-white rounded-2xl border-2 border-indigo-600 p-8 relative shadow-lg">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                MOST POPULAR
              </span>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Starter</h2>
              <p className="text-gray-500 text-sm">For active GCs</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">$49</span>
              <span className="text-gray-500 text-sm">/mo</span>
            </div>
            <ul className="space-y-3 mb-8">
              <PricingFeature text="Unlimited punch items" highlight />
              <PricingFeature text="Unlimited projects" highlight />
              <PricingFeature text="All priority levels (Critical/High)" highlight />
              <PricingFeature text="GC verify/reject workflow" highlight />
              <PricingFeature text="Sub completion links" highlight />
              <PricingFeature text="Payment &amp; occupancy blocking" highlight />
              <PricingFeature text="Email notifications" highlight />
            </ul>
            <button
              onClick={() => handlePaidPlan('starter')}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl font-bold transition-colors"
            >
              Start Starter Plan
            </button>
            <p className="text-gray-400 text-xs text-center mt-2">14-day free trial</p>
          </div>

          {/* Growth */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-1">Growth</h2>
              <p className="text-gray-500 text-sm">For larger GC firms</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-gray-900">$149</span>
              <span className="text-gray-500 text-sm">/mo</span>
            </div>
            <ul className="space-y-3 mb-8">
              <PricingFeature text="Everything in Starter" />
              <PricingFeature text="REST API access" />
              <PricingFeature text="MCP server integration" />
              <PricingFeature text="Multi-user team accounts" />
              <PricingFeature text="Priority support" />
              <PricingFeature text="Audit log" />
            </ul>
            <button
              onClick={() => handlePaidPlan('growth')}
              className="block w-full text-center border-2 border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 py-3 px-4 rounded-xl font-semibold transition-colors"
            >
              Start Growth Plan
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <FAQ
              q="What counts as a punch item?"
              a="Any task or deficiency identified during a final walkthrough that needs correction before project closeout — missing outlets, paint touch-ups, plumbing leaks, safety issues, etc."
            />
            <FAQ
              q="Do subs need an account to use completion links?"
              a="No. Completion links are public URLs. The sub clicks the link, sees their item, fills out the form, and submits — no login required."
            />
            <FAQ
              q="How does payment blocking work?"
              a="When any Critical or High priority item is open, a red banner appears on the project. When the last blocking item is verified, the banner turns green and final payment is unblocked."
            />
            <FAQ
              q="What is the 25-item limit on Free?"
              a="Free accounts can have up to 25 total punch items across all projects. Upgrade to Starter for unlimited items."
            />
            <FAQ
              q="Can I cancel anytime?"
              a="Yes. No contracts, no lock-in. Cancel from your account settings. Your data is yours — export anytime."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function PricingFeature({ text, highlight }: { text: string; highlight?: boolean }) {
  return (
    <li className="flex items-center gap-2 text-sm text-gray-700">
      <span className={`text-base flex-shrink-0 ${highlight ? 'text-indigo-600' : 'text-green-500'}`}>✓</span>
      {text}
    </li>
  )
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <div className="border-b border-gray-200 pb-6">
      <h3 className="font-semibold text-gray-900 mb-2">{q}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
    </div>
  )
}
