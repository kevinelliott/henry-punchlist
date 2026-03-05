import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Code, Terminal, Zap, Lock, Globe } from 'lucide-react'

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <nav className="space-y-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Getting Started</p>
                <a href="#overview" className="block text-sm text-indigo-600 font-medium py-1">Overview</a>
                <a href="#auth" className="block text-sm text-gray-600 hover:text-gray-900 py-1">Authentication</a>
                <a href="#quickstart" className="block text-sm text-gray-600 hover:text-gray-900 py-1">Quick Start</a>
              </nav>
              <nav className="space-y-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">REST API</p>
                <a href="#jobs" className="block text-sm text-gray-600 hover:text-gray-900 py-1">Jobs</a>
                <a href="#items" className="block text-sm text-gray-600 hover:text-gray-900 py-1">Punch Items</a>
                <a href="#portals" className="block text-sm text-gray-600 hover:text-gray-900 py-1">Portals</a>
              </nav>
              <nav className="space-y-1">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">MCP</p>
                <a href="#mcp" className="block text-sm text-gray-600 hover:text-gray-900 py-1">MCP Overview</a>
                <a href="#mcp-tools" className="block text-sm text-gray-600 hover:text-gray-900 py-1">Available Tools</a>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 max-w-3xl">
            <section id="overview" className="mb-16">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">API Documentation</h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                PunchList Pro offers a REST API and MCP (Model Context Protocol) integration for
                programmatic access. Available on Business plan.
              </p>
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
                <div className="flex gap-3">
                  <Globe className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900">Base URL</p>
                    <code className="text-sm text-indigo-700">https://punchlistpro.com/api/v1</code>
                  </div>
                </div>
              </div>
            </section>

            <section id="auth" className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6 text-indigo-600" /> Authentication
              </h2>
              <p className="text-gray-600 mb-4">
                All API requests require a Bearer token in the Authorization header.
                Generate API keys in your dashboard under Settings → API.
              </p>
              <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-green-400">
{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  https://punchlistpro.com/api/v1/jobs`}
                </pre>
              </div>
            </section>

            <section id="quickstart" className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6 text-indigo-600" /> Quick Start
              </h2>
              <p className="text-gray-600 mb-6">Create your first job and punch item via API:</p>
              <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto mb-4">
                <pre className="text-sm text-green-400">
{`# 1. Create a job
curl -X POST https://punchlistpro.com/api/v1/jobs \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Oak Street Renovation",
    "address": "123 Oak St, Denver CO",
    "client_name": "John Smith",
    "client_email": "john@example.com"
  }'

# Response:
# { "id": "job_abc123", "owner_token": "abc...xyz", ... }

# 2. Add a punch item
curl -X POST https://punchlistpro.com/api/v1/jobs/job_abc123/items \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Fix garage door alignment",
    "category": "Mechanical",
    "priority": "high",
    "assigned_to_email": "mike@doorsco.com"
  }'`}
                </pre>
              </div>
            </section>

            <section id="jobs" className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Code className="w-6 h-6 text-indigo-600" /> Jobs API
              </h2>

              {[
                { method: 'GET', path: '/jobs', desc: 'List all jobs for the authenticated contractor' },
                { method: 'POST', path: '/jobs', desc: 'Create a new job' },
                { method: 'GET', path: '/jobs/:id', desc: 'Get a specific job with all punch items' },
                { method: 'PATCH', path: '/jobs/:id', desc: 'Update job details or status' },
                { method: 'DELETE', path: '/jobs/:id', desc: 'Archive a job (soft delete)' },
              ].map((endpoint) => (
                <div key={endpoint.path + endpoint.method} className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded font-mono flex-shrink-0 ${
                    endpoint.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                    endpoint.method === 'POST' ? 'bg-green-100 text-green-700' :
                    endpoint.method === 'PATCH' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>{endpoint.method}</span>
                  <div>
                    <code className="text-sm font-mono text-gray-900">/api/v1{endpoint.path}</code>
                    <p className="text-sm text-gray-500 mt-1">{endpoint.desc}</p>
                  </div>
                </div>
              ))}
            </section>

            <section id="items" className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Punch Items API</h2>
              {[
                { method: 'GET', path: '/jobs/:id/items', desc: 'List all items for a job' },
                { method: 'POST', path: '/jobs/:id/items', desc: 'Create a punch item and optionally invite a subcontractor' },
                { method: 'GET', path: '/items/:id', desc: 'Get item detail with photos and comments' },
                { method: 'PATCH', path: '/items/:id', desc: 'Update item status, priority, or assignment' },
                { method: 'POST', path: '/items/:id/photos', desc: 'Upload a photo to an item' },
                { method: 'POST', path: '/items/:id/comments', desc: 'Add a comment to an item' },
              ].map((endpoint) => (
                <div key={endpoint.path + endpoint.method} className="flex items-start gap-4 py-4 border-b border-gray-100 last:border-0">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded font-mono flex-shrink-0 ${
                    endpoint.method === 'GET' ? 'bg-blue-100 text-blue-700' :
                    endpoint.method === 'POST' ? 'bg-green-100 text-green-700' :
                    endpoint.method === 'PATCH' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>{endpoint.method}</span>
                  <div>
                    <code className="text-sm font-mono text-gray-900">/api/v1{endpoint.path}</code>
                    <p className="text-sm text-gray-500 mt-1">{endpoint.desc}</p>
                  </div>
                </div>
              ))}
            </section>

            <section id="mcp" className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Terminal className="w-6 h-6 text-indigo-600" /> MCP Integration
              </h2>
              <p className="text-gray-600 mb-6">
                PunchList Pro supports the Model Context Protocol (MCP), enabling AI assistants
                like Claude to manage your punch lists directly.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6">
                <p className="text-sm font-semibold text-gray-900 mb-2">MCP Server URL</p>
                <code className="text-sm text-indigo-700">https://punchlistpro.com/api/mcp</code>
              </div>
              <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-green-400">
{`# Claude Desktop config (claude_desktop_config.json)
{
  "mcpServers": {
    "punchlist-pro": {
      "url": "https://punchlistpro.com/api/mcp",
      "headers": {
        "Authorization": "Bearer YOUR_API_KEY"
      }
    }
  }
}`}
                </pre>
              </div>
            </section>

            <section id="mcp-tools" className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available MCP Tools</h2>
              <div className="space-y-4">
                {[
                  { name: 'list_jobs', desc: 'List all jobs with optional status filter', params: 'status?: string' },
                  { name: 'create_job', desc: 'Create a new construction job', params: 'title, address?, client_name?, client_email?' },
                  { name: 'get_job', desc: 'Get job details and all punch items', params: 'job_id: string' },
                  { name: 'add_punch_item', desc: 'Add a punch item to a job', params: 'job_id, title, category?, priority?, assigned_to_email?' },
                  { name: 'update_item_status', desc: 'Update the status of a punch item', params: 'item_id, status: open|in_progress|completed|approved|rejected' },
                  { name: 'get_completion_report', desc: 'Get a summary report for a job', params: 'job_id: string' },
                ].map((tool) => (
                  <div key={tool.name} className="border border-gray-200 rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <code className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded">
                        {tool.name}
                      </code>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{tool.desc}</p>
                    <p className="text-xs text-gray-400 font-mono">Params: {tool.params}</p>
                  </div>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  )
}
