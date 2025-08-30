export interface Template {
  id: string
  name: string
  preview_image?: string
  created_at: string
  updated_at: string
}

export interface MusicTrack {
  id: string
  name: string
  type: 'predefined' | 'custom'
  url?: string
  file_path?: string
  created_at: string
  updated_at: string
}

export interface StoryEvent {
  id: string
  title: string
  date: string
  description: string
  image?: string
}

export interface WeddingTimelineEvent {
  id: string
  title: string
  time: string
  description: string
  icon: string
}

export interface GalleryPhoto {
  id: string
  invitation_id: string
  title?: string
  description?: string
  image_url: string
  thumbnail_url?: string
  order_index: number
  created_at: string
  updated_at: string
}

export interface Invitation {
  id: string
  user_id: string
  template_id?: string
  music_id?: string
  groom_name?: string
  groom_description?: string
  bride_name?: string
  bride_description?: string
  event_date?: string
  venue?: string
  description?: string
  whatsapp_number?: string
  unique_url: string
  is_active: boolean
  story?: StoryEvent[]
  wedding_timeline?: WeddingTimelineEvent[]
  created_at: string
  updated_at: string
  photo_url?: string
  // Colores personalizados
  primary_color?: string
  secondary_color?: string
  background_color?: string
  text_color?: string
  // Relación con música (opcional, para cuando se hace JOIN)
  music?: MusicTrack
  // Relación con galería de fotos (opcional, para cuando se hace JOIN)
  gallery_photos?: GalleryPhoto[]
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
  template_id?: string
  music_id?: string
  groom_name?: string
  groom_description?: string
  bride_name?: string
  bride_description?: string
  event_date?: string
  venue?: string
  description?: string
  whatsapp_number?: string
  photo_url?: string
  story?: string
  wedding_timeline?: string
  // Colores personalizados
  primary_color?: string
  secondary_color?: string
  background_color?: string
  text_color?: string
}

export interface CreateMusicTrackData {
  name: string
  type: 'predefined' | 'custom'
  url?: string
  file_path?: string
}

export interface CreateGalleryPhotoData {
  invitation_id: string
  title?: string
  description?: string
  image_url: string
  thumbnail_url?: string
  order_index?: number
} 