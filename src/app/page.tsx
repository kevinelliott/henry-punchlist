import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Button from '@/components/ui/Button'
import { CheckCircle, Users, Home, ClipboardList, ArrowRight, Star, Shield, Zap } from 'lucide-react'

const stats = [
  { label: 'Active Contractors', value: '2,400+' },
  { label: 'Punch Items Closed', value: '180,000+' },
  { label: 'Time Saved per Job', value: '8 hrs' },
  { label: 'Customer Satisfaction', value: '4.9/5' },
]

const features = [
  {
    icon: ClipboardList,
    title: 'Create & Manage',
    desc: 'Contractors build punch lists with categories, priorities, and due dates. Full visibility across all jobs.',
  },
  {
    icon: Users,
    title: 'Assign to Subs',
    desc: 'Invite subcontractors via email. They get a secure portal link — no account required.',
  },
  {
    icon: Home,
    title: 'Homeowner Sign-off',
    desc: 'Homeowners review completed items and approve or reject with a single click.',
  },
]

const testimonials = [
  {
    name: 'Marcus R.',
    role: 'General Contractor, Phoenix AZ',
    quote:
      'Closed out our last three jobs in half the time. The homeowner portal is a game-changer — no more chasing approvals over text.',
    rating: 5,
  },
  {
    name: 'Sarah K.',
    role: 'Project Manager, Denver CO',
    quote:
      'Finally a tool built for how construction actually works. Subs love the mobile portal, and clients feel more in control.',
    rating: 5,
  },
  {
    name: 'Tony B.',
    role: 'Home Builder, Austin TX',
    quote:
      'We used to manage punch lists in spreadsheets. PunchList Pro cut our close-out time by 60%.',
    rating: 5,
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-full px-4 py-1.5 text-sm text-indigo-700 font-medium mb-6">
              <Zap className="w-4 h-4" />
              Built for the modern construction workflow
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Punch lists that{' '}
              <span className="text-indigo-600">close faster</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              The only punch list manager with separate portals for contractors,
              subcontractors, and homeowners. Assign items, upload photos, and get
              sign-off — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pricing">
                <Button size="lg" className="gap-2">
                  Start free <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/features">
                <Button variant="secondary" size="lg">See how it works</Button>
              </Link>
            </div>
          </div>

          {/* Mock UI */}
          <div className="mt-16 relative max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 border-b border-gray-200 px-6 py-3 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="ml-4 text-xs text-gray-500">punchlistpro.com/dashboard</div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-900">Oak Street Renovation</h3>
                    <p className="text-sm text-gray-500">12 items · 3 pending approval</p>
                  </div>
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">Active</span>
                </div>
                <div className="space-y-3">
                  {[
                    { title: 'Fix garage door alignment', priority: 'High', status: 'Approved', sub: 'Mike\'s Doors' },
                    { title: 'Touch up paint in master bedroom', priority: 'Medium', status: 'Completed', sub: 'ABC Painting' },
                    { title: 'Install backsplash tile', priority: 'Critical', status: 'In Progress', sub: 'Tile Works' },
                    { title: 'Replace light fixture in hallway', priority: 'Low', status: 'Open', sub: 'Unassigned' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                      <CheckCircle className={`w-5 h-5 flex-shrink-0 ${item.status === 'Approved' ? 'text-green-500' : item.status === 'Completed' ? 'text-yellow-500' : 'text-gray-300'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.sub}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          item.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                          item.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                          item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>{item.priority}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          item.status === 'Approved' ? 'bg-green-100 text-green-700' :
                          item.status === 'Completed' ? 'bg-yellow-100 text-yellow-700' :
                          item.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-600'
                        }`}>{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold text-indigo-600">{s.value}</p>
                <p className="text-sm text-gray-600 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Three roles. One workflow.</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              PunchList Pro is built around how construction projects actually work — with separate,
              purpose-built views for every stakeholder.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="text-center p-8 rounded-2xl border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all">
                <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="py-16 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-white">
            {[
              { icon: Shield, title: 'Enterprise Security', desc: 'SOC 2 ready. Data encrypted at rest and in transit. Token-based portal auth.' },
              { icon: Zap, title: 'Instant Onboarding', desc: 'Create your first job in 2 minutes. No training required. Subs need zero accounts.' },
              { icon: Star, title: '4.9★ Rated', desc: 'Loved by 2,400+ contractors. Top-rated in construction management.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                  <p className="text-indigo-200 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by builders everywhere</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to close your first job faster?
          </h2>
          <p className="text-lg text-gray-600 mb-10">
            Start free, no credit card required. Upgrade when you need more jobs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing">
              <Button size="lg" className="gap-2">
                Get started free <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="secondary" size="lg">Read the docs</Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
