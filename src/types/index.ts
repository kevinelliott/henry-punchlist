export type ProjectStatus = 'active' | 'walkthrough' | 'punchlist' | 'signed-off'
export type ItemStatus = 'open' | 'acknowledged' | 'in-progress' | 'resolved' | 'rejected'
export type Priority = 'low' | 'normal' | 'high' | 'critical'

export interface Project {
  id: string
  user_id: string
  name: string
  address?: string
  owner_name?: string
  general_contractor?: string
  retainage_amount?: number
  status: ProjectStatus
  created_at: string
}

export interface PunchItem {
  id: string
  project_id: string
  item_number: number
  description: string
  location?: string
  trade?: string
  assigned_to?: string
  assigned_email?: string
  priority: Priority
  fix_token: string
  status: ItemStatus
  acknowledged_at?: string
  resolved_at?: string
  resolved_by?: string
  resolution_notes?: string
  created_at: string
}
