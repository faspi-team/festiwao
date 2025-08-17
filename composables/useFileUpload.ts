export const useFileUpload = () => {
  const { $supabase } = useNuxtApp()
  const { user } = useAuth()

  const uploadFile = async (
    file: File, 
    bucket: string = 'invitations',
    path?: string
  ): Promise<{ url: string; path: string } | null> => {
    if (!user.value) {
      console.error('Usuario no autenticado')
      return null
    }

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = path ? `${path}/${fileName}` : fileName

      // Subir archivo
      const { data, error } = await $supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (error) {
        console.error('Error uploading file:', error)
        throw error
      }

      // Obtener URL pública
      const { data: urlData } = $supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)

      return {
        url: urlData.publicUrl,
        path: filePath
      }
    } catch (error) {
      console.error('Error in uploadFile:', error)
      return null
    }
  }

  const deleteFile = async (
    path: string, 
    bucket: string = 'invitations'
  ): Promise<boolean> => {
    if (!user.value) {
      console.error('Usuario no autenticado')
      return false
    }

    try {
      const { error } = await $supabase.storage
        .from(bucket)
        .remove([path])

      if (error) {
        console.error('Error deleting file:', error)
        return false
      }

      return true
    } catch (error) {
      console.error('Error in deleteFile:', error)
      return false
    }
  }

  const createThumbnail = async (
    file: File,
    maxWidth: number = 300,
    maxHeight: number = 300
  ): Promise<File | null> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()

      img.onload = () => {
        let { width, height } = img
        const ratio = Math.min(maxWidth / width, maxHeight / height)
        
        if (ratio < 1) {
          width *= ratio
          height *= ratio
        }

        canvas.width = width
        canvas.height = height

        ctx?.drawImage(img, 0, 0, width, height)

        canvas.toBlob((blob) => {
          if (blob) {
            const thumbnailFile = new File([blob], `thumb_${file.name}`, {
              type: 'image/jpeg',
              lastModified: Date.now()
            })
            resolve(thumbnailFile)
          } else {
            resolve(null)
          }
        }, 'image/jpeg', 0.8)
      }

      img.onerror = () => {
        resolve(null)
      }

      img.src = URL.createObjectURL(file)
    })
  }

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Solo se permiten archivos de imagen (JPEG, PNG, WebP, GIF)'
      }
    }

    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'El archivo es demasiado grande. Máximo 10MB'
      }
    }

    return { valid: true }
  }

  return {
    uploadFile,
    deleteFile,
    createThumbnail,
    validateFile
  }
}

