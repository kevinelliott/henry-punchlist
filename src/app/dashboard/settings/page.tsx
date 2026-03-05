import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { Crown } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account and subscription</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">Profile</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                <input
                  type="text"
                  defaultValue="Contractor User"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company name</label>
                <input
                  type="text"
                  placeholder="Your company"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  defaultValue="contractor@example.com"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <Button>Save changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">Plan & Billing</h2>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center">
                <Crown className="w-5 h-5 text-gray-500" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Free Plan</p>
                <p className="text-sm text-gray-500">1 active job · Limited features</p>
              </div>
            </div>
            <Link href="/pricing">
              <Button className="w-full">Upgrade to Pro — $29/mo</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900">API Access</h2>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              API access is available on the Business plan. Use our REST API or MCP integration
              to connect PunchList Pro to your workflow.
            </p>
            <Link href="/docs">
              <Button variant="secondary">View API docs</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-semibold text-gray-900 text-red-600">Danger Zone</h2>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Permanently delete your account and all data. This cannot be undone.
            </p>
            <Button variant="danger">Delete account</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
