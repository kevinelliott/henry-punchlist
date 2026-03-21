import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-[#1e293b] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-[#ea580c]/20 text-[#ea580c] text-sm font-semibold px-3 py-1 rounded-full mb-6">
            Construction Punchlist Management
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Retainage is money{' '}
            <span className="text-[#ea580c]">you already earned.</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            Stop leaving it on the table because punchlist items fall through the cracks.
            Henry Punchlist gates retainage release on item resolution — so your subs fix
            things fast, and you get paid.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/login"
              className="bg-[#ea580c] hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Start Free
            </Link>
            <Link
              href="/projects/demo"
              className="border border-slate-500 hover:border-slate-300 text-slate-300 hover:text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              View Demo Project
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#ea580c] py-6 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 text-center text-white">
          <div>
            <div className="text-2xl font-bold">$180K</div>
            <div className="text-sm opacity-90">Avg retainage per project</div>
          </div>
          <div>
            <div className="text-2xl font-bold">47 days</div>
            <div className="text-sm opacity-90">Avg punchlist completion</div>
          </div>
          <div>
            <div className="text-2xl font-bold">12x</div>
            <div className="text-sm opacity-90">Faster sub response with fix links</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#1e293b] mb-4">
            Built for the job site
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            No bloat. No training. Just a clean punchlist that tells your subs exactly what to fix — and blocks retainage until they do.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon="📋"
              title="Project Tracking"
              description="Track multiple projects with full punchlist management. Organize by trade, priority, and status."
            />
            <FeatureCard
              icon="📱"
              title="Sub Notifications"
              description="Send subs a direct link to their punch items. Mobile-first design readable on a bright job site."
            />
            <FeatureCard
              icon="💰"
              title="Retainage Gating"
              description="Retainage release is BLOCKED until every punch item is resolved. No more chasing subs."
            />
            <FeatureCard
              icon="🔗"
              title="Fix Links"
              description="Each punch item gets a unique link. Subs acknowledge, update status, and attach notes — no login needed."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#1e293b] mb-12">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Step
              num="1"
              title="Create your punchlist"
              description="Add punch items with trade, location, priority, and assigned sub. Import from walkthrough notes or add in-field."
            />
            <Step
              num="2"
              title="Send fix links to subs"
              description="Copy the unique fix link for each item and text or email it to your sub. They click, acknowledge, and mark resolved."
            />
            <Step
              num="3"
              title="Release retainage"
              description="Once all items are resolved, the retainage banner turns green. Owner signs off. You get paid."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1e293b] py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start your first project free
          </h2>
          <p className="text-slate-300 mb-8">
            No credit card required. 1 project, 20 items — free forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="bg-[#ea580c] hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Create Free Account
            </Link>
            <Link
              href="/pricing"
              className="border border-slate-500 hover:border-slate-300 text-slate-300 hover:text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              See Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e293b] border-t border-slate-700 py-8 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-slate-400 text-sm">
            © 2025 Henry Punchlist. Built for construction professionals.
          </div>
          <div className="flex gap-6 text-sm text-slate-400">
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/projects/demo" className="hover:text-white transition-colors">Demo</Link>
            <Link href="/auth/login" className="hover:text-white transition-colors">Sign In</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-bold text-[#1e293b] mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function Step({ num, title, description }: { num: string; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-[#ea580c] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {num}
      </div>
      <h3 className="font-bold text-[#1e293b] mb-2 text-lg">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  )
}
