import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block bg-indigo-50 text-indigo-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            Construction Punch List Management
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Close Out Faster.{' '}
            <span className="text-indigo-600">Get Paid Sooner.</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Track every punch item from final walk to verified close. Final payment and occupancy
            stay blocked until your list hits zero.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/auth/signup"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Start Free — No Credit Card
            </Link>
            <Link
              href="/projects/demo"
              className="border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              View Live Demo
            </Link>
          </div>
          {/* Stat callout */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 max-w-2xl mx-auto">
            <p className="text-gray-600 text-sm leading-relaxed">
              <strong className="text-gray-900">The average commercial project has 150+ punch list items at final walk.</strong>{' '}
              Disputes over incomplete work are the #1 cause of payment delays.
            </p>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-indigo-600 py-8 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 text-center text-white">
          <div>
            <div className="text-3xl font-bold">150+</div>
            <div className="text-sm opacity-90 mt-1">Avg punch items per commercial project</div>
          </div>
          <div>
            <div className="text-3xl font-bold">#1</div>
            <div className="text-sm opacity-90 mt-1">Cause of payment delays is incomplete work</div>
          </div>
          <div>
            <div className="text-3xl font-bold">0</div>
            <div className="text-sm opacity-90 mt-1">Open items to release final payment</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
            Built for the final stretch
          </h2>
          <p className="text-center text-gray-500 mb-14 max-w-xl mx-auto">
            No bloat, no training required. A clean punch list that tells subs exactly what to fix and blocks payment until they do.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon="📋"
              title="Item Tracking"
              description="Track every punch item by area, trade, priority, and assigned sub — from walk to verified close."
            />
            <FeatureCard
              icon="🔗"
              title="Completion Links"
              description="Each item gets a unique link. Subs submit their work and photos — no login needed."
            />
            <FeatureCard
              icon="🚫"
              title="Payment Blocking"
              description="Final payment stays blocked until every Critical and High item reaches zero."
            />
            <FeatureCard
              icon="✅"
              title="GC Verification"
              description="GC reviews each submission and verifies or rejects — full audit trail throughout."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-14">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <Step
              num="1"
              title="Walk the project"
              description="Add punch items during final walkthrough. Group by area, assign trades, set priorities."
            />
            <Step
              num="2"
              title="Subs complete the work"
              description="Send each sub their unique completion link. They submit work details and photos — no account needed."
            />
            <Step
              num="3"
              title="Verify and release"
              description="GC verifies each submission. When the list hits zero, final payment and occupancy are unlocked."
            />
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple pricing</h2>
          <p className="text-gray-500 mb-10">Start free. Upgrade when you&apos;re ready.</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-xl p-6 text-left">
              <h3 className="font-bold text-gray-900 mb-1">Free</h3>
              <div className="text-2xl font-bold text-gray-900 mb-4">$0<span className="text-sm font-normal text-gray-500">/mo</span></div>
              <p className="text-gray-600 text-sm">25 punch items. Try it on your next project.</p>
            </div>
            <div className="border-2 border-indigo-600 rounded-xl p-6 text-left relative">
              <div className="absolute -top-3 left-4">
                <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">POPULAR</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-1">Starter</h3>
              <div className="text-2xl font-bold text-gray-900 mb-4">$49<span className="text-sm font-normal text-gray-500">/mo</span></div>
              <p className="text-gray-600 text-sm">Unlimited items. Everything you need.</p>
            </div>
            <div className="border border-gray-200 rounded-xl p-6 text-left">
              <h3 className="font-bold text-gray-900 mb-1">Growth</h3>
              <div className="text-2xl font-bold text-gray-900 mb-4">$149<span className="text-sm font-normal text-gray-500">/mo</span></div>
              <p className="text-gray-600 text-sm">API access, team accounts, priority support.</p>
            </div>
          </div>
          <div className="mt-8">
            <Link href="/pricing" className="text-indigo-600 hover:text-indigo-700 font-medium">
              See full pricing details →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start your first project free
          </h2>
          <p className="text-gray-400 mb-8">
            No credit card required. Up to 25 punch items free forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Start Free — No Credit Card
            </Link>
            <Link
              href="/projects/demo"
              className="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              View Demo Project
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">📋</span>
            <span className="font-bold text-gray-900">PunchList</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link href="/features" className="hover:text-gray-900 transition-colors">Features</Link>
            <Link href="/pricing" className="hover:text-gray-900 transition-colors">Pricing</Link>
            <Link href="/docs" className="hover:text-gray-900 transition-colors">Docs</Link>
            <Link href="/projects/demo" className="hover:text-gray-900 transition-colors">Demo</Link>
          </div>
          <div className="text-gray-400 text-sm">© 2026 PunchList. Built for construction professionals.</div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function Step({ num, title, description }: { num: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {num}
      </div>
      <h3 className="font-bold text-gray-900 mb-2 text-lg">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  )
}
