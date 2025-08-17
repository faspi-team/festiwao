import type { Invitation, Template, CreateInvitationData, MusicTrack, CreateMusicTrackData } from '~/types/invitation'

export const useInvitations = () => {
  const { $supabase } = useNuxtApp()
  const { user } = useAuth()

  const invitations = ref<Invitation[]>([])
  const templates = ref<Template[]>([])
  const musicTracks = ref<MusicTrack[]>([])
  const loading = ref(false)

  const loadInvitations = async () => {
    
    if (!user.value) {
      console.log('No user found, waiting...')
      return
    }
    
    loading.value = true
    try {
      const { data, error } = await $supabase
        .from('invitations')
        .select(`
          *,
          music:music_tracks(*)
        `)
        .order('created_at', { ascending: false })
      
      if (error) {
        console.error('Supabase error:', error)
        throw error
      }
      
      invitations.value = data || []
    } catch (error) {
      console.error('Error loading invitations:', error)
      invitations.value = []
    } finally {
      loading.value = false
    }
  }

  const loadTemplates = async () => {
    try {
      const { data, error } = await $supabase
        .from('templates')
        .select('*')
        .order('name')
      
      if (error) throw error
      templates.value = data || []
    } catch (error) {
      console.error('Error loading templates:', error)
      templates.value = []
    }
  }

  const loadMusicTracks = async () => {
    try {
      const { data, error } = await $supabase
        .from('music_tracks')
        .select('*')
        .order('name')
      
      if (error) throw error
      musicTracks.value = data || []
    } catch (error) {
      console.error('Error loading music tracks:', error)
      musicTracks.value = []
    }
  }

  const createMusicTrack = async (musicData: CreateMusicTrackData): Promise<MusicTrack | null> => {
    if (!user.value) return null
    
    try {
      const { data, error } = await $supabase
        .from('music_tracks')
        .insert(musicData)
        .select()
        .single()
      
      if (error) throw error
      
      musicTracks.value.push(data)
      
      return data
    } catch (error) {
      console.error('Error creating music track:', error)
      return null
    }
  }

  const createInvitation = async (invitationData: CreateInvitationData): Promise<Invitation | null> => {
    if (!user.value) return null
    
    try {
      const { data, error } = await $supabase
        .from('invitations')
        .insert({
          user_id: user.value.id,
          ...invitationData,
          unique_url: generateUniqueUrl()
        })
        .select(`
          *,
          music:music_tracks(*)
        `)
        .single()
      
      if (error) throw error
      
      invitations.value.unshift(data)
      
      return data
    } catch (error) {
      console.error('Error creating invitation:', error)
      return null
    }
  }

  const getInvitationByUrl = async (uniqueUrl: string): Promise<Invitation | null> => {
    try {
      const { data, error } = await $supabase
        .from('invitations')
        .select(`
          *,
          music:music_tracks(*)
        `)
        .eq('unique_url', uniqueUrl)
        .eq('is_active', true)
        .single()
      
      if (error) throw error
      return data
    } catch (error) {
      console.error('Error loading invitation:', error)
      return null
    }
  }

  const updateInvitation = async (id: string, invitationData: Partial<CreateInvitationData>): Promise<Invitation | null> => {
    if (!user.value) return null
    
    try {
      const { data, error } = await $supabase
        .from('invitations')
        .update(invitationData)
        .eq('id', id)
        .select(`
          *,
          music:music_tracks(*)
        `)
      
      console.log('Update result:', { data, error })
      return data?.[0] || null
    } catch (error) {
      console.error('Error:', error)
      throw error
    }
  }

  const deleteInvitation = async (id: string): Promise<boolean> => {
    try {
      const { error } = await $supabase
        .from('invitations')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      invitations.value = invitations.value.filter(inv => inv.id !== id)
      return true
    } catch (error) {
      console.error('Error deleting invitation:', error)
      return false
    }
  }

  const generateUniqueUrl = (): string => {
    return 'inv-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
  }

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatDateTime = (dateString: string | undefined): string => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return {
    invitations: readonly(invitations),
    templates: readonly(templates),
    musicTracks: readonly(musicTracks),
    loading: readonly(loading),
    loadInvitations,
    loadTemplates,
    loadMusicTracks,
    createMusicTrack,
    createInvitation,
    updateInvitation,
    getInvitationByUrl,
    deleteInvitation,
    formatDate,
    formatDateTime
  }
} 