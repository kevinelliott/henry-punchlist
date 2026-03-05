import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import {
  ClipboardList, Users, Home, Camera, Bell, FileText,
  BarChart3, Lock, Smartphone, Globe, Zap, Shield,
} from 'lucide-react'

const bentoItems = [
  {
    icon: ClipboardList,
    title: 'Smart Punch Lists',
    desc: 'Create itemized punch lists with categories (electrical, plumbing, finish work), priority levels, and due dates. Drag-and-drop reordering keeps you organized.',
    size: 'large',
    color: 'indigo',
  },
  {
    icon: Users,
    title: 'Subcontractor Portal',
    desc: 'Subs get a secure link — no account needed. View assigned items, mark complete, upload before/after photos.',
    size: 'normal',
    color: 'blue',
  },
  {
    icon: Home,
    title: 'Homeowner Sign-off',
    desc: 'Homeowners get their own portal to approve or reject completed items with comments.',
    size: 'normal',
    color: 'green',
  },
  {
    icon: Camera,
    title: 'Photo Documentation',
    desc: 'Attach before/after photos to every punch item. Visual proof for disputes and sign-off.',
    size: 'normal',
    color: 'purple',
  },
  {
    icon: Bell,
    title: 'Real-time Notifications',
    desc: 'Get notified when subs complete items, homeowners approve or reject, and deadlines approach.',
    size: 'normal',
    color: 'orange',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    desc: 'Track completion rates, average close-out time, sub performance, and homeowner satisfaction across all jobs.',
    size: 'large',
    color: 'indigo',
  },
  {
    icon: FileText,
    title: 'PDF Export',
    desc: 'Generate branded punch list reports for your records or lender documentation.',
    size: 'normal',
    color: 'red',
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    desc: 'Fully responsive. Works perfectly on job sites from any device.',
    size: 'normal',
    color: 'cyan',
  },
  {
    icon: Globe,
    title: 'API + MCP Access',
    desc: 'Integrate PunchList Pro into your workflow with our REST API and Model Context Protocol support.',
    size: 'normal',
    color: 'slate',
  },
  {
    icon: Lock,
    title: 'Token-based Auth',
    desc: 'Public portals secured with unique tokens. No password fatigue for subs or homeowners.',
    size: 'normal',
    color: 'yellow',
  },
  {
    icon: Zap,
    title: 'Instant Setup',
    desc: 'Create your first job and share it with your team in under 2 minutes.',
    size: 'normal',
    color: 'emerald',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    desc: 'Data encrypted at rest and in transit. Row-level security. GDPR compliant.',
    size: 'normal',
    color: 'gray',
  },
]

const colorMap: Record<string, string> = {
  indigo: 'bg-indigo-600',
  blue: 'bg-blue-600',
  green: 'bg-green-600',
  purple: 'bg-purple-600',
  orange: 'bg-orange-600',
  red: 'bg-red-600',
  cyan: 'bg-cyan-600',
  slate: 'bg-slate-600',
  yellow: 'bg-yellow-500',
  emerald: 'bg-emerald-600',
  gray: 'bg-gray-600',
}

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-20 pb-12 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Everything you need to close out faster
          </h1>
          <p className="text-xl text-gray-600">
            PunchList Pro packs every feature a contractor needs into one elegant, easy-to-use platform.
          </p>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {bentoItems.map((item) => (
            <div
              key={item.title}
              className={`bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow ${
                item.size === 'large' ? 'md:col-span-2' : ''
              }`}
            >
              <div className={`w-12 h-12 ${colorMap[item.color] || 'bg-indigo-600'} rounded-xl flex items-center justify-center mb-5`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Status Flow */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Clear status flow</h2>
          <p className="text-gray-600 mb-12">Every punch item moves through a defined lifecycle — no ambiguity.</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: 'Open', color: 'bg-gray-100 text-gray-700' },
              { label: '→', color: 'text-gray-400' },
              { label: 'In Progress', color: 'bg-blue-100 text-blue-700' },
              { label: '→', color: 'text-gray-400' },
              { label: 'Completed', color: 'bg-yellow-100 text-yellow-700' },
              { label: '→', color: 'text-gray-400' },
              { label: 'Approved', color: 'bg-green-100 text-green-700' },
            ].map((item, i) => (
              <span
                key={i}
                className={`${item.color} px-4 py-2 rounded-full font-medium text-sm`}
              >
                {item.label}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-6">
            Rejected items return to Open — with a comment explaining why.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
