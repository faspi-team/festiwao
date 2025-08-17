import { ref, readonly } from 'vue'
import type { MusicTrack } from '~/types/invitation'

export const useMusic = () => {
  const loading = ref(false)
  const musicTracks = ref<MusicTrack[]>([])
  
  // Cargar música desde la base de datos
  const loadMusicTracks = async () => {
    const { $supabase } = useNuxtApp()
    
    loading.value = true
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
    } finally {
      loading.value = false
    }
  }

  // Obtener música predefinida
  const getPredefinedMusic = () => {
    return musicTracks.value.filter(track => track.type === 'predefined')
  }

  // Obtener música personalizada del usuario
  const getCustomMusic = () => {
    return musicTracks.value.filter(track => track.type === 'custom')
  }

  // Subir archivo de música personalizado
  const uploadCustomMusic = async (file: File): Promise<MusicTrack | null> => {
    const { $supabase } = useNuxtApp()
    
    loading.value = true
    try {
      // Validar tipo de archivo
      const allowedTypes = ['audio/mp3', 'audio/mpeg', 'audio/wav', 'audio/ogg']
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Tipo de archivo no permitido. Solo se permiten archivos MP3, WAV y OGG.')
      }

      // Validar tamaño (máximo 10MB)
      const maxSize = 10 * 1024 * 1024 // 10MB
      if (file.size > maxSize) {
        throw new Error('El archivo es demasiado grande. Tamaño máximo: 10MB.')
      }

      // Obtener información del archivo de audio
      const audioInfo = await getAudioInfo(file)
      
      const fileExt = file.name.split('.').pop()?.toLowerCase()
      const fileName = `music-${Date.now()}.${fileExt}`
      
      const { data, error } = await $supabase.storage
        .from('invitations')
        .upload(`music/${fileName}`, file, { 
          upsert: true,
          contentType: file.type
        })
      
      if (error) throw error
      
      const { data: publicUrlData } = $supabase.storage
        .from('invitations')
        .getPublicUrl(`music/${fileName}`)
      
      // Crear registro en la base de datos
      const { data: musicData, error: musicError } = await $supabase
        .from('music_tracks')
        .insert({
          name: audioInfo.name,
          type: 'custom',
          url: publicUrlData.publicUrl,
          file_path: `music/${fileName}`
        })
        .select()
        .single()
      
      if (musicError) throw musicError
      
      musicTracks.value.push(musicData)
      
      return musicData
    } catch (error) {
      console.error('Error uploading music:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // Validar archivo de audio
  const validateAudioFile = (file: File): { valid: boolean; error?: string } => {
    const allowedTypes = ['audio/mp3', 'audio/mpeg', 'audio/wav', 'audio/ogg']
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Tipo de archivo no permitido. Solo se permiten archivos MP3, WAV y OGG.'
      }
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'El archivo es demasiado grande. Tamaño máximo: 10MB.'
      }
    }

    return { valid: true }
  }

  // Formatear duración de audio
  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  // Obtener información del archivo de audio
  const getAudioInfo = (file: File): Promise<{ duration: number; name: string }> => {
    return new Promise((resolve, reject) => {
      const audio = new Audio()
      const url = URL.createObjectURL(file)
      
      audio.onloadedmetadata = () => {
        URL.revokeObjectURL(url)
        resolve({
          duration: audio.duration,
          name: file.name.replace(/\.[^/.]+$/, "")
        })
      }
      
      audio.onerror = () => {
        URL.revokeObjectURL(url)
        reject(new Error('No se pudo cargar el archivo de audio'))
      }
      
      audio.src = url
    })
  }

  // Eliminar música personalizada
  const deleteCustomMusic = async (musicId: string): Promise<boolean> => {
    const { $supabase } = useNuxtApp()
    
    try {
      // Obtener información de la música antes de eliminar
      const { data: musicData, error: fetchError } = await $supabase
        .from('music_tracks')
        .select('*')
        .eq('id', musicId)
        .single()
      
      if (fetchError) throw fetchError
      
      // Eliminar archivo del storage si existe
      if (musicData.file_path) {
        const { error: storageError } = await $supabase.storage
          .from('invitations')
          .remove([musicData.file_path])
        
        if (storageError) {
          console.warn('Error deleting file from storage:', storageError)
        }
      }
      
      // Eliminar registro de la base de datos
      const { error } = await $supabase
        .from('music_tracks')
        .delete()
        .eq('id', musicId)
      
      if (error) throw error
      
      // Remover de la lista local
      musicTracks.value = musicTracks.value.filter(track => track.id !== musicId)
      
      return true
    } catch (error) {
      console.error('Error deleting music track:', error)
      return false
    }
  }

  return {
    loading,
    musicTracks: readonly(musicTracks),
    loadMusicTracks,
    getPredefinedMusic,
    getCustomMusic,
    uploadCustomMusic,
    validateAudioFile,
    formatDuration,
    getAudioInfo,
    deleteCustomMusic
  }
}