'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Props {
  stripeConfigured: boolean
}

export default function PricingClient({ stripeConfigured }: Props) {
  const [toast, setToast] = useState(false)

  useEffect(() => {
    if (!stripeConfigured) {
      setToast(true)
      const timer = setTimeout(() => setToast(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [stripeConfigured])

  function handlePaidPlan() {
    if (!stripeConfigured) {
      setToast(true)
      setTimeout(() => setToast(false), 4000)
      return
    }
    // Would redirect to Stripe checkout
    window.location.href = '/auth/signup'
  }

  return (
    <div className="py-16 px-4">
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-amber-100 border border-amber-300 text-amber-800 px-6 py-3 rounded-xl shadow-lg font-medium text-sm flex items-center gap-2">
          ⚠️ Demo mode — Stripe not configured. Billing will be active in production.
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#1e293b] mb-4">Simple, honest pricing</h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Start free. Upgrade when you need more projects. No per-seat fees — one price for your whole team.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Free */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#1e293b] mb-1">Free</h2>
              <p className="text-gray-500 text-sm">Perfect for trying it out</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-[#1e293b]">$0</span>
              <span className="text-gray-500 text-sm">/mo</span>
            </div>
            <ul className="space-y-3 mb-8">
              <PricingFeature text="1 project" />
              <PricingFeature text="Up to 20 punch items" />
              <PricingFeature text="Fix links for subs" />
              <PricingFeature text="Retainage tracking" />
              <PricingFeature text="Printable reports" />
            </ul>
            <Link
              href="/auth/signup"
              className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-xl font-semibold transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Pro — highlighted */}
          <div className="bg-[#1e293b] rounded-2xl border-2 border-[#ea580c] p-8 relative shadow-xl">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-[#ea580c] text-white text-xs font-bold px-4 py-1 rounded-full">
                MOST POPULAR
              </span>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-white mb-1">Pro</h2>
              <p className="text-slate-400 text-sm">For active GCs</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$45</span>
              <span className="text-slate-400 text-sm">/mo</span>
            </div>
            <ul className="space-y-3 mb-8">
              <PricingFeature text="Unlimited projects" dark />
              <PricingFeature text="Unlimited punch items" dark />
              <PricingFeature text="Priority tagging (critical/high)" dark />
              <PricingFeature text="PDF export" dark />
              <PricingFeature text="Fix links for subs" dark />
              <PricingFeature text="Retainage gating" dark />
              <PricingFeature text="Email notifications" dark />
            </ul>
            <button
              onClick={handlePaidPlan}
              className="w-full bg-[#ea580c] hover:bg-orange-700 text-white py-3 px-4 rounded-xl font-bold transition-colors"
            >
              Start Pro Trial
            </button>
            <p className="text-slate-400 text-xs text-center mt-2">14-day free trial, no credit card required</p>
          </div>

          {/* Team */}
          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#1e293b] mb-1">Team</h2>
              <p className="text-gray-500 text-sm">For larger GC firms</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-[#1e293b]">$129</span>
              <span className="text-gray-500 text-sm">/mo</span>
            </div>
            <ul className="space-y-3 mb-8">
              <PricingFeature text="Everything in Pro" />
              <PricingFeature text="Multi-user access" />
              <PricingFeature text="Custom fields" />
              <PricingFeature text="Owner portal access" />
              <PricingFeature text="Priority support" />
              <PricingFeature text="Audit log" />
            </ul>
            <button
              onClick={handlePaidPlan}
              className="block w-full text-center border-2 border-[#1e293b] hover:bg-[#1e293b] hover:text-white text-[#1e293b] py-3 px-4 rounded-xl font-semibold transition-colors"
            >
              Contact Sales
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1e293b] text-center mb-8">Questions</h2>
          <div className="space-y-6">
            <FAQ
              q="What counts as a 'punch item'?"
              a="Any task or deficiency identified during a walkthrough that needs to be corrected before project closeout — missing outlets, paint touch-ups, plumbing leaks, etc."
            />
            <FAQ
              q="Do my subs need an account to use fix links?"
              a="No. Fix links are public URLs. Your sub clicks the link, sees their item, and taps to acknowledge or resolve — no login required."
            />
            <FAQ
              q="How does retainage gating work?"
              a="When you create a project with a retainage amount, the dashboard shows a red BLOCKED banner until every punch item is resolved. When the last item resolves, it flips green and you can release retainage."
            />
            <FAQ
              q="Can I cancel anytime?"
              a="Yes. No contracts, no lock-in. Cancel from your account settings. Your data is yours — export any time."
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function PricingFeature({ text, dark }: { text: string; dark?: boolean }) {
  return (
    <li className={`flex items-center gap-2 text-sm ${dark ? 'text-slate-300' : 'text-gray-700'}`}>
      <span className={`text-base flex-shrink-0 ${dark ? 'text-[#ea580c]' : 'text-green-500'}`}>✓</span>
      {text}
    </li>
  )
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <div className="border-b border-gray-200 pb-6">
      <h3 className="font-semibold text-[#1e293b] mb-2">{q}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
    </div>
  )
}
