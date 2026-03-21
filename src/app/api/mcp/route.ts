import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

interface McpTool {
  name: string
  description: string
  inputSchema: {
    type: string
    properties: Record<string, unknown>
    required?: string[]
  }
}

const TOOLS: McpTool[] = [
  {
    name: 'list_projects',
    description: 'List all construction projects',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_punch_items',
    description: 'Get punch items for a project',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'Project UUID' },
        status: { type: 'string', description: 'Filter by status: open, in_progress, submitted, verified, rejected' },
      },
      required: ['project_id'],
    },
  },
  {
    name: 'create_punch_item',
    description: 'Create a new punch item',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'Project UUID' },
        area: { type: 'string', description: 'Area of the building' },
        trade: { type: 'string', description: 'Trade: electrical, plumbing, painting, drywall, flooring, hvac, glazing, landscaping, other' },
        description: { type: 'string', description: 'Detailed description of the deficiency' },
        priority: { type: 'string', description: 'Priority: critical, high, medium, low' },
        assigned_to_name: { type: 'string', description: 'Subcontractor name' },
        assigned_to_email: { type: 'string', description: 'Subcontractor email' },
      },
      required: ['project_id', 'area', 'trade', 'description'],
    },
  },
  {
    name: 'get_project_summary',
    description: 'Get a summary of a project including item counts by status and priority',
    inputSchema: {
      type: 'object',
      properties: {
        project_id: { type: 'string', description: 'Project UUID' },
      },
      required: ['project_id'],
    },
  },
]

function validateApiKey(request: NextRequest): boolean {
  const auth = request.headers.get('authorization')
  const key = auth?.startsWith('Bearer ') ? auth.slice(7) : null
  const adminKey = process.env.ADMIN_API_KEY
  if (!adminKey) return false
  return key === adminKey
}

export async function GET() {
  return NextResponse.json({
    name: 'punchlist-mcp',
    version: '1.0.0',
    description: 'MCP server for PunchList construction punch list management',
    tools: TOOLS,
  })
}

export async function POST(request: NextRequest) {
  if (!validateApiKey(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { tool, input } = body

    if (!tool) {
      return NextResponse.json({ error: 'tool is required' }, { status: 400 })
    }

    const supabase = createServiceClient()

    if (tool === 'list_projects') {
      const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ result: { projects: data } })
    }

    if (tool === 'get_punch_items') {
      const { project_id, status } = input || {}
      if (!project_id) return NextResponse.json({ error: 'project_id required' }, { status: 400 })
      let query = supabase.from('punch_items').select('*').eq('project_id', project_id)
      if (status) query = query.eq('status', status)
      const { data, error } = await query
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ result: { punch_items: data, count: data?.length ?? 0 } })
    }

    if (tool === 'create_punch_item') {
      const { project_id, area, trade, description, priority, assigned_to_name, assigned_to_email } = input || {}
      if (!project_id || !area || !trade || !description) {
        return NextResponse.json({ error: 'project_id, area, trade, description required' }, { status: 400 })
      }
      const { data, error } = await supabase.from('punch_items').insert([{
        project_id, area, trade, description,
        priority: priority || 'medium',
        assigned_to_name, assigned_to_email,
        status: 'open',
      }]).select().single()
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      return NextResponse.json({ result: { punch_item: data } })
    }

    if (tool === 'get_project_summary') {
      const { project_id } = input || {}
      if (!project_id) return NextResponse.json({ error: 'project_id required' }, { status: 400 })
      const { data: items, error } = await supabase.from('punch_items').select('*').eq('project_id', project_id)
      if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      const summary = {
        total: items?.length ?? 0,
        by_status: {
          open: items?.filter(i => i.status === 'open').length ?? 0,
          in_progress: items?.filter(i => i.status === 'in_progress').length ?? 0,
          submitted: items?.filter(i => i.status === 'submitted').length ?? 0,
          verified: items?.filter(i => i.status === 'verified').length ?? 0,
          rejected: items?.filter(i => i.status === 'rejected').length ?? 0,
        },
        by_priority: {
          critical: items?.filter(i => i.priority === 'critical').length ?? 0,
          high: items?.filter(i => i.priority === 'high').length ?? 0,
          medium: items?.filter(i => i.priority === 'medium').length ?? 0,
          low: items?.filter(i => i.priority === 'low').length ?? 0,
        },
        payment_blocked: (items?.filter(i => (i.priority === 'critical' || i.priority === 'high') && i.status !== 'verified').length ?? 0) > 0,
        occupancy_blocked: (items?.filter(i => i.status !== 'verified' && i.status !== 'rejected').length ?? 0) > 0,
      }
      return NextResponse.json({ result: { summary } })
    }

    return NextResponse.json({ error: `Unknown tool: ${tool}` }, { status: 400 })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
