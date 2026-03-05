import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'

export const supabase = createClient(url, anonKey)

export function getSupabaseAdmin() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key'
  return createClient(url, serviceKey)
}

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          email: string
          full_name: string | null
          company_name: string | null
          plan: 'free' | 'pro' | 'business'
          stripe_customer_id: string | null
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['profiles']['Row']>
      }
      jobs: {
        Row: {
          id: string
          contractor_id: string
          title: string
          address: string | null
          client_name: string | null
          client_email: string | null
          owner_token: string
          status: 'active' | 'completed' | 'archived'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['jobs']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['jobs']['Row']>
      }
      punch_items: {
        Row: {
          id: string
          job_id: string
          title: string
          description: string | null
          category: string | null
          priority: 'low' | 'medium' | 'high' | 'critical'
          status: 'open' | 'in_progress' | 'completed' | 'approved' | 'rejected'
          assigned_to_email: string | null
          sub_token: string | null
          due_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['punch_items']['Row'], 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['punch_items']['Row']>
      }
      item_photos: {
        Row: {
          id: string
          item_id: string
          storage_path: string
          uploaded_by: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['item_photos']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['item_photos']['Row']>
      }
      item_comments: {
        Row: {
          id: string
          item_id: string
          author: string
          content: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['item_comments']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['item_comments']['Row']>
      }
      sub_assignments: {
        Row: {
          id: string
          item_id: string
          sub_email: string
          sub_token: string
          invited_at: string
        }
        Insert: Omit<Database['public']['Tables']['sub_assignments']['Row'], 'id' | 'invited_at'>
        Update: Partial<Database['public']['Tables']['sub_assignments']['Row']>
      }
    }
  }
}
