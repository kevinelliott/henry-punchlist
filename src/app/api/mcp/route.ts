import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { generateToken } from '@/lib/utils'

// MCP (Model Context Protocol) endpoint
// Supports JSON-RPC 2.0 style requests

interface MCPRequest {
  jsonrpc: '2.0'
  method: string
  params?: Record<string, unknown>
  id: string | number
}

function getAuthToken(req: NextRequest): string | null {
  const auth = req.headers.get('authorization')
  if (!auth?.startsWith('Bearer ')) return null
  return auth.slice(7)
}

const tools = [
  {
    name: 'list_jobs',
    description: 'List all jobs for the authenticated contractor',
    inputSchema: {
      type: 'object',
      properties: {
        status: { type: 'string', enum: ['active', 'completed', 'archived'], description: 'Filter by status' },
      },
    },
  },
  {
    name: 'create_job',
    description: 'Create a new construction job',
    inputSchema: {
      type: 'object',
      required: ['title'],
      properties: {
        title: { type: 'string', description: 'Job title' },
        address: { type: 'string', description: 'Job site address' },
        client_name: { type: 'string', description: "Client's name" },
        client_email: { type: 'string', description: "Client's email" },
      },
    },
  },
  {
    name: 'get_job',
    description: 'Get job details and all punch items',
    inputSchema: {
      type: 'object',
      required: ['job_id'],
      properties: {
        job_id: { type: 'string', description: 'Job ID' },
      },
    },
  },
  {
    name: 'add_punch_item',
    description: 'Add a punch item to a job',
    inputSchema: {
      type: 'object',
      required: ['job_id', 'title'],
      properties: {
        job_id: { type: 'string', description: 'Job ID' },
        title: { type: 'string', description: 'Item title' },
        description: { type: 'string', description: 'Detailed description' },
        category: { type: 'string', description: 'Category (e.g. Electrical, Plumbing)' },
        priority: { type: 'string', enum: ['low', 'medium', 'high', 'critical'] },
        assigned_to_email: { type: 'string', description: "Subcontractor's email" },
        due_date: { type: 'string', description: 'Due date (YYYY-MM-DD)' },
      },
    },
  },
  {
    name: 'update_item_status',
    description: 'Update the status of a punch item',
    inputSchema: {
      type: 'object',
      required: ['item_id', 'status'],
      properties: {
        item_id: { type: 'string', description: 'Item ID' },
        status: { type: 'string', enum: ['open', 'in_progress', 'completed', 'approved', 'rejected'] },
      },
    },
  },
  {
    name: 'get_completion_report',
    description: 'Get a completion summary report for a job',
    inputSchema: {
      type: 'object',
      required: ['job_id'],
      properties: {
        job_id: { type: 'string', description: 'Job ID' },
      },
    },
  },
]

async function handleTool(
  name: string,
  params: Record<string, unknown>,
  _apiKey: string
): Promise<unknown> {
  const supabase = getSupabaseAdmin()

  switch (name) {
    case 'list_jobs': {
      let query = supabase.from('jobs').select('*').order('created_at', { ascending: false })
      if (params.status) query = query.eq('status', params.status as string)
      const { data, error } = await query
      if (error) throw new Error(error.message)
      return data
    }

    case 'create_job': {
      const { data, error } = await supabase
        .from('jobs')
        .insert({
          title: params.title as string,
          address: (params.address as string) || null,
          client_name: (params.client_name as string) || null,
          client_email: (params.client_email as string) || null,
          owner_token: generateToken(),
          status: 'active',
          contractor_id: 'mcp-user',
        })
        .select()
        .single()
      if (error) throw new Error(error.message)
      return data
    }

    case 'get_job': {
      const { data: job, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', params.job_id as string)
        .single()
      if (error) throw new Error('Job not found')
      const { data: items } = await supabase
        .from('punch_items')
        .select('*')
        .eq('job_id', params.job_id as string)
      return { ...job, items: items || [] }
    }

    case 'add_punch_item': {
      const subToken = params.assigned_to_email ? generateToken() : null
      const { data, error } = await supabase
        .from('punch_items')
        .insert({
          job_id: params.job_id as string,
          title: params.title as string,
          description: (params.description as string) || null,
          category: (params.category as string) || null,
          priority: (params.priority as 'low' | 'medium' | 'high' | 'critical') || 'medium',
          status: 'open',
          assigned_to_email: (params.assigned_to_email as string) || null,
          sub_token: subToken,
          due_date: (params.due_date as string) || null,
        })
        .select()
        .single()
      if (error) throw new Error(error.message)
      return data
    }

    case 'update_item_status': {
      const { data, error } = await supabase
        .from('punch_items')
        .update({
          status: params.status as string,
          updated_at: new Date().toISOString(),
        })
        .eq('id', params.item_id as string)
        .select()
        .single()
      if (error) throw new Error(error.message)
      return data
    }

    case 'get_completion_report': {
      const { data: items, error } = await supabase
        .from('punch_items')
        .select('status')
        .eq('job_id', params.job_id as string)
      if (error) throw new Error(error.message)
      const total = items.length
      const counts = items.reduce((acc: Record<string, number>, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1
        return acc
      }, {})
      return {
        total,
        ...counts,
        completion_rate: total > 0 ? Math.round(((counts.approved || 0) / total) * 100) : 0,
      }
    }

    default:
      throw new Error(`Unknown tool: ${name}`)
  }
}

export async function GET() {
  return NextResponse.json({
    name: 'punchlist-pro',
    version: '1.0.0',
    description: 'PunchList Pro MCP Server — manage construction punch lists via AI',
    tools,
  })
}

export async function POST(req: NextRequest) {
  const apiKey = getAuthToken(req)
  if (!apiKey) {
    return NextResponse.json(
      { jsonrpc: '2.0', error: { code: -32001, message: 'Unauthorized' }, id: null },
      { status: 401 }
    )
  }

  let body: MCPRequest
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({
      jsonrpc: '2.0',
      error: { code: -32700, message: 'Parse error' },
      id: null,
    })
  }

  const { method, params = {}, id } = body

  // Handle tool/list
  if (method === 'tools/list') {
    return NextResponse.json({ jsonrpc: '2.0', result: { tools }, id })
  }

  // Handle tool/call
  if (method === 'tools/call') {
    const toolName = params.name as string
    const toolArgs = (params.arguments as Record<string, unknown>) || {}

    try {
      const result = await handleTool(toolName, toolArgs, apiKey)
      return NextResponse.json({
        jsonrpc: '2.0',
        result: { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] },
        id,
      })
    } catch (err) {
      return NextResponse.json({
        jsonrpc: '2.0',
        error: { code: -32000, message: err instanceof Error ? err.message : 'Tool error' },
        id,
      })
    }
  }

  return NextResponse.json({
    jsonrpc: '2.0',
    error: { code: -32601, message: 'Method not found' },
    id,
  })
}
