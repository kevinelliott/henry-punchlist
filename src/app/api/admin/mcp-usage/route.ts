import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function validateAdminKey(request: NextRequest): boolean {
  const auth = request.headers.get('authorization')
  const key = auth?.startsWith('Bearer ') ? auth.slice(7) : null
  const adminKey = process.env.ADMIN_API_KEY
  if (!adminKey) return false
  return key === adminKey
}

export async function GET(request: NextRequest) {
  if (!validateAdminKey(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // MCP usage stats — placeholder until actual logging is implemented
  return NextResponse.json({
    mcp_usage: {
      total_calls: 0,
      calls_today: 0,
      calls_last_7_days: 0,
      calls_last_30_days: 0,
      top_tools: [],
      note: 'MCP usage logging not yet implemented. Integrate with your logging provider.',
    },
  })
}
