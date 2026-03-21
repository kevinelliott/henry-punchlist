import Link from 'next/link'

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Documentation</h1>
          <p className="text-xl text-gray-600">
            Everything you need to know about PunchList.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <nav className="sticky top-24 space-y-1">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Getting Started</p>
              <a href="#quick-start" className="block text-sm text-gray-600 hover:text-indigo-600 py-1 transition-colors">Quick Start</a>
              <a href="#concepts" className="block text-sm text-gray-600 hover:text-indigo-600 py-1 transition-colors">Core Concepts</a>
              <a href="#workflow" className="block text-sm text-gray-600 hover:text-indigo-600 py-1 transition-colors">Workflow</a>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 mt-6">Features</p>
              <a href="#punch-items" className="block text-sm text-gray-600 hover:text-indigo-600 py-1 transition-colors">Punch Items</a>
              <a href="#completion-links" className="block text-sm text-gray-600 hover:text-indigo-600 py-1 transition-colors">Completion Links</a>
              <a href="#blocking" className="block text-sm text-gray-600 hover:text-indigo-600 py-1 transition-colors">Payment Blocking</a>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 mt-6">API</p>
              <a href="#api-overview" className="block text-sm text-gray-600 hover:text-indigo-600 py-1 transition-colors">Overview</a>
              <a href="#api-projects" className="block text-sm text-gray-600 hover:text-indigo-600 py-1 transition-colors">Projects</a>
              <a href="#api-items" className="block text-sm text-gray-600 hover:text-indigo-600 py-1 transition-colors">Punch Items</a>
            </nav>
          </aside>

          {/* Content */}
          <main className="md:col-span-3 space-y-12">
            <section id="quick-start">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Start</h2>
              <div className="space-y-4 text-gray-600">
                <p>Get your first punch list running in under 5 minutes:</p>
                <ol className="list-decimal list-inside space-y-3 text-sm">
                  <li className="leading-relaxed">
                    <strong className="text-gray-900">Create a free account</strong> — no credit card required. Free plan includes up to 25 punch items.
                  </li>
                  <li className="leading-relaxed">
                    <strong className="text-gray-900">Create a project</strong> — add the project name, address, owner, and contract value.
                  </li>
                  <li className="leading-relaxed">
                    <strong className="text-gray-900">Add punch items during your walkthrough</strong> — area, trade, description, priority, and assigned sub.
                  </li>
                  <li className="leading-relaxed">
                    <strong className="text-gray-900">Send completion links to subs</strong> — copy the unique link for each item and text or email it to your sub.
                  </li>
                  <li className="leading-relaxed">
                    <strong className="text-gray-900">Verify work</strong> — when a sub submits, review and verify or reject. When all items are verified, payment is unblocked.
                  </li>
                </ol>
              </div>
            </section>

            <section id="concepts">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Core Concepts</h2>
              <div className="space-y-6">
                <ConceptCard
                  title="Project"
                  description="A construction project — a building, renovation, or phase. Has an address, owner, and contract value. Contains all punch items for that scope."
                />
                <ConceptCard
                  title="Punch Item"
                  description="A specific deficiency or incomplete work item found during the final walkthrough. Has an area, trade, description, priority, and assigned sub."
                />
                <ConceptCard
                  title="Area"
                  description="Where the punch item is located — Exterior, Lobby, Floor 2, Penthouse, Mechanical Room, etc. Items are grouped by area for easy navigation."
                />
                <ConceptCard
                  title="Completion Link"
                  description="A unique, public URL for each punch item. The sub visits the link, fills out the completion form with work details and photo filenames, and submits for verification."
                />
                <ConceptCard
                  title="Priority"
                  description="Critical (blocks payment and occupancy), High (blocks payment), Medium (doesn't block), Low (doesn't block)."
                />
              </div>
            </section>

            <section id="workflow">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Workflow</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Open</h4>
                    <p className="text-gray-600 text-sm">Item is logged during walkthrough. Sub has not acknowledged.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">In Progress</h4>
                    <p className="text-gray-600 text-sm">Sub has opened their link and is working on the item.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Submitted</h4>
                    <p className="text-gray-600 text-sm">Sub submitted completion form. GC review required.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Verified</h4>
                    <p className="text-gray-600 text-sm">GC approved the work. Item is closed. Payment blocking removed when all items reach this state.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-gray-100 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">R</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Rejected</h4>
                    <p className="text-gray-600 text-sm">GC rejected the submission. Sub must re-do work and re-submit.</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="punch-items">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Punch Items</h2>
              <div className="prose prose-sm text-gray-600 space-y-3">
                <p>Each punch item requires:</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong className="text-gray-900">Area</strong> — where it is (e.g. Lobby, Floor 2, Penthouse)</li>
                  <li><strong className="text-gray-900">Trade</strong> — electrical, plumbing, painting, drywall, flooring, hvac, glazing, landscaping, other</li>
                  <li><strong className="text-gray-900">Description</strong> — specific description of the deficiency</li>
                  <li><strong className="text-gray-900">Priority</strong> — critical, high, medium, or low</li>
                  <li><strong className="text-gray-900">Assigned Sub</strong> — name and optional email of the responsible subcontractor</li>
                </ul>
              </div>
            </section>

            <section id="completion-links">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Completion Links</h2>
              <div className="text-gray-600 text-sm space-y-3">
                <p>
                  Every punch item gets a unique completion link at <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">/complete/[token]</code>.
                </p>
                <p>
                  Share this link with the sub via text, email, or any messaging app. The sub visits the link and sees:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Item details — area, trade, description, priority</li>
                  <li>A form to submit their name, company, work description, and photo filenames</li>
                </ul>
                <p>
                  No account or login is required for subs. The link is cryptographically unique and can only access that one item.
                </p>
              </div>
            </section>

            <section id="blocking">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment & Occupancy Blocking</h2>
              <div className="text-gray-600 text-sm space-y-3">
                <p>PunchList shows two blocking banners on each project:</p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="font-semibold text-red-800 text-sm">FINAL PAYMENT BLOCKED</p>
                  <p className="text-red-700 text-xs mt-1">Shown when any Critical or High priority item is Open or In Progress. Clears when all Critical/High items are Verified.</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="font-semibold text-amber-800 text-sm">OCCUPANCY BLOCKED</p>
                  <p className="text-amber-700 text-xs mt-1">Shown when any item is not yet Verified or Rejected. Clears only when all items are closed.</p>
                </div>
              </div>
            </section>

            <section id="api-overview">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">API Overview</h2>
              <div className="text-gray-600 text-sm space-y-3">
                <p>
                  The REST API is available on the Growth plan (<Link href="/pricing" className="text-indigo-600 hover:text-indigo-700">$149/mo</Link>).
                  Authenticate with your API key in the <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">Authorization</code> header.
                </p>
                <div className="bg-gray-900 rounded-xl p-4 text-green-400 font-mono text-xs">
                  Authorization: Bearer your-api-key
                </div>
                <p>Base URL: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">https://your-domain.com/api/v1</code></p>
              </div>
            </section>

            <section id="api-projects">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">API — Projects</h2>
              <div className="space-y-4 text-sm">
                <ApiEndpoint method="GET" path="/api/v1/projects" description="List all projects" />
                <ApiEndpoint method="POST" path="/api/v1/projects" description="Create a new project" />
              </div>
            </section>

            <section id="api-items">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">API — Punch Items</h2>
              <div className="space-y-4 text-sm">
                <ApiEndpoint method="GET" path="/api/v1/punch-items" description="List punch items (filter by project_id)" />
                <ApiEndpoint method="POST" path="/api/v1/punch-items" description="Create a new punch item" />
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}

function ConceptCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function ApiEndpoint({ method, path, description }: { method: string; path: string; description: string }) {
  const methodColor = method === 'GET' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
  return (
    <div className="border border-gray-200 rounded-lg p-4 flex items-center gap-3">
      <span className={`text-xs font-bold px-2 py-1 rounded font-mono ${methodColor}`}>{method}</span>
      <code className="font-mono text-xs text-gray-800 flex-1">{path}</code>
      <span className="text-gray-500 text-xs">{description}</span>
    </div>
  )
}
