import Link from 'next/link'

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Every feature you need.{' '}
            <span className="text-indigo-600">Nothing you don&apos;t.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Built from the ground up for general contractors who need fast closeouts and clean payment.
          </p>
          <Link
            href="/auth/signup"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Start Free — No Credit Card
          </Link>
        </div>
      </section>

      {/* Bento grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Large card */}
            <div className="lg:col-span-2 bg-indigo-50 border border-indigo-100 rounded-2xl p-8">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Punch List by Area</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Organize every punch item by building area — Exterior, Lobby, Floor by Floor, Penthouse, Mechanical Room. Each item carries trade, priority, assigned sub, and status through the entire workflow.
              </p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <Feature text="Group by area" />
                <Feature text="Trade assignment" />
                <Feature text="Priority levels" />
                <Feature text="Status tracking" />
              </div>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-2xl p-8">
              <div className="text-4xl mb-4">🚫</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Payment Blocking</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Final payment stays blocked with a red banner until every Critical and High priority item reaches zero. No more chasing subs or owner sign-off.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-8">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Occupancy Blocking</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                An amber banner blocks occupancy sign-off when any items remain open — not just critical ones. Complete the list, get the CO.
              </p>
            </div>

            <div className="bg-green-50 border border-green-100 rounded-2xl p-8">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">GC Verification</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                When a sub submits work, GC reviews and either verifies or rejects with notes. Full audit trail throughout.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Completion Links</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Every punch item gets a unique link. Text or email it to your sub. They submit work details and photos — no login required.
              </p>
            </div>

            {/* Another large card */}
            <div className="lg:col-span-2 bg-gray-50 border border-gray-200 rounded-2xl p-8">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Progress Tracking</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                See the completion percentage at a glance with a live progress bar. Track item counts across all statuses: Open, In Progress, Submitted, Verified, and Rejected.
              </p>
              <div className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">Overall Completion</span>
                  <span className="font-bold text-gray-900">7/24 verified (29%)</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '29%' }} />
                </div>
                <div className="flex gap-3 mt-3 text-xs text-gray-500">
                  <span className="text-red-600 font-semibold">8 Open</span>
                  <span className="text-blue-600 font-semibold">4 In Progress</span>
                  <span className="text-purple-600 font-semibold">5 Submitted</span>
                  <span className="text-green-600 font-semibold">5 Verified</span>
                  <span className="text-gray-500 font-semibold">2 Rejected</span>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-100 rounded-2xl p-8">
              <div className="text-4xl mb-4">🔌</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">API Access</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                REST API to integrate with your existing project management tools. Available on Growth plan.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure by Default</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Auth via Google, GitHub, or email. Row-level security in the database. Every project and punch item is yours alone.
              </p>
            </div>

            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-8">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mobile-First</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Sub completion links are designed for the job site — readable in direct sunlight on a phone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to close out faster?</h2>
          <p className="text-gray-500 mb-8">Start free, no credit card required.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Start Free
            </Link>
            <Link
              href="/projects/demo"
              className="border border-gray-300 hover:border-gray-400 text-gray-700 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 text-gray-700">
      <span className="text-indigo-600">✓</span>
      <span>{text}</span>
    </div>
  )
}
