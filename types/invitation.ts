export interface Template {
  id: string
  name: string
  preview_image?: string
  created_at: string
  updated_at: string
}

export interface Invitation {
  id: string
  user_id: string
  template_id?: string
  groom_name?: string
  bride_name?: string
  event_date?: string
  venue?: string
  description?: string
  unique_url: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface RSVPResponse {
  id: string
  invitation_id: string
  guest_name?: string
  email?: string
  response: boolean
  message?: string
  created_at: string
}

export interface CreateInvitationData {
  title?: string
  template_id?: string
  groom_name?: string
  bride_name?: string
  event_date?: string
  venue?: string
  description?: string
} 