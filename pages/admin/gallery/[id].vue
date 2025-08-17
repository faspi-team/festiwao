<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <div class="d-flex justify-content-between align-items-center">
              <h4 class="mb-0">Galería de Fotos - {{ invitation?.bride_name }} & {{ invitation?.groom_name }}</h4>
              <button 
                @click="showUploadModal = true" 
                class="btn btn-primary"
              >
                <i class="fas fa-plus me-2"></i>Agregar Foto
              </button>
            </div>
          </div>
          <div class="card-body">
            <!-- Loading -->
            <div v-if="loading" class="text-center py-5">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>

            <!-- Galería de fotos -->
            <div v-else-if="galleryPhotos.length > 0" class="row g-4">
              <div 
                v-for="photo in galleryPhotos" 
                :key="photo.id"
                class="col-md-6 col-lg-4 col-xl-3"
              >
                <div class="card h-100">
                  <img 
                    :src="photo.image_url" 
                    :alt="photo.title || 'Foto de la galería'"
                    class="card-img-top"
                    style="height: 200px; object-fit: cover;"
                  >
                  <div class="card-body">
                    <h6 class="card-title">{{ photo.title || 'Sin título' }}</h6>
                    <p class="card-text small text-muted">{{ photo.description || 'Sin descripción' }}</p>
                    <div class="d-flex justify-content-between align-items-center">
                      <small class="text-muted">Orden: {{ photo.order_index }}</small>
                      <div class="btn-group btn-group-sm">
                        <button 
                          @click="editPhoto(photo)" 
                          class="btn btn-outline-primary"
                          title="Editar"
                        >
                          <i class="fas fa-edit"></i>
                        </button>
                        <button 
                          @click="deletePhoto(photo.id)" 
                          class="btn btn-outline-danger"
                          title="Eliminar"
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mensaje cuando no hay fotos -->
            <div v-else class="text-center py-5">
              <i class="fas fa-images fa-3x text-muted mb-3"></i>
              <h5 class="text-muted">No hay fotos en la galería</h5>
              <p class="text-muted">Agrega la primera foto para comenzar la galería.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para subir/editar foto -->
    <div 
      v-if="showUploadModal" 
      class="modal fade show" 
      style="display: block;"
      tabindex="-1"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ editingPhoto ? 'Editar Foto' : 'Agregar Foto' }}</h5>
            <button 
              @click="closeModal" 
              type="button" 
              class="btn-close"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="savePhoto">
              <div class="mb-3">
                <label class="form-label">Título</label>
                <input 
                  v-model="photoForm.title" 
                  type="text" 
                  class="form-control"
                  placeholder="Título de la foto"
                >
              </div>
              
              <div class="mb-3">
                <label class="form-label">Descripción</label>
                <textarea 
                  v-model="photoForm.description" 
                  class="form-control" 
                  rows="3"
                  placeholder="Descripción de la foto"
                ></textarea>
              </div>
              
              <!-- Subida de archivos -->
              <div class="mb-3">
                <label class="form-label">Subir imagen</label>
                <div class="upload-area" 
                     @click="triggerFileInput"
                     @dragover.prevent="handleDragOver"
                     @dragleave.prevent="handleDragLeave"
                     @drop.prevent="handleDrop"
                     :class="{ 'dragover': isDragOver, 'has-file': selectedFile }"
                >
                  <div v-if="!selectedFile" class="upload-placeholder">
                    <i class="fas fa-cloud-upload-alt fa-2x mb-2"></i>
                    <p class="mb-1">Arrastra una imagen aquí o haz clic para seleccionar</p>
                    <small class="text-muted">JPEG, PNG, WebP, GIF - Máximo 10MB</small>
                  </div>
                  <div v-else class="file-preview">
                    <img :src="filePreview" alt="Preview" class="img-thumbnail">
                    <div class="file-info">
                      <p class="mb-1">{{ selectedFile.name }}</p>
                      <small class="text-muted">{{ formatFileSize(selectedFile.size) }}</small>
                    </div>
                    <button 
                      @click.stop="removeSelectedFile" 
                      type="button" 
                      class="btn btn-sm btn-outline-danger"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
                <input 
                  ref="fileInput"
                  type="file" 
                  accept="image/*"
                  @change="handleFileSelect"
                  style="display: none;"
                >
              </div>

              <!-- URL manual (opcional) -->
              <div class="mb-3">
                <label class="form-label">O ingresar URL manualmente (opcional)</label>
                <input 
                  v-model="photoForm.image_url" 
                  type="url" 
                  class="form-control"
                  placeholder="https://ejemplo.com/imagen.jpg"
                >
                <small class="text-muted">Si no subes un archivo, puedes ingresar una URL directamente</small>
              </div>
              
              <div class="mb-3">
                <label class="form-label">Orden</label>
                <input 
                  v-model.number="photoForm.order_index" 
                  type="number" 
                  class="form-control"
                  min="0"
                  placeholder="0"
                >
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button 
              @click="closeModal" 
              type="button" 
              class="btn btn-secondary"
            >
              Cancelar
            </button>
            <button 
              @click="savePhoto" 
              type="button" 
              class="btn btn-primary"
              :disabled="saving"
            >
              <span v-if="saving" class="spinner-border spinner-border-sm me-2"></span>
              {{ editingPhoto ? 'Actualizar' : 'Guardar' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Overlay del modal -->
    <div 
      v-if="showUploadModal" 
      class="modal-backdrop fade show"
    ></div>
  </div>
</template>

<script setup lang="ts">
import type { GalleryPhoto, CreateGalleryPhotoData } from '~/types/invitation'

const route = useRoute()
const { getInvitationByUrl, loadGalleryPhotos, createGalleryPhoto, updateGalleryPhoto, deleteGalleryPhoto } = useInvitations()
const { uploadFile, deleteFile, createThumbnail, validateFile } = useFileUpload()

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const invitation = ref<any>(null)
const galleryPhotos = ref<GalleryPhoto[]>([])
const loading = ref(true)
const saving = ref(false)

// Modal state
const showUploadModal = ref(false)
const editingPhoto = ref<GalleryPhoto | null>(null)

// File upload state
const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const filePreview = ref<string>('')
const isDragOver = ref(false)
const uploadProgress = ref(0)

// Form data
const photoForm = ref<CreateGalleryPhotoData>({
  invitation_id: '',
  title: '',
  description: '',
  image_url: '',
  thumbnail_url: '',
  order_index: 0
})

onMounted(async () => {
  await loadData()
})

const loadData = async () => {
  try {
    loading.value = true
    const invitationId = route.params.id as string
    
    // Cargar invitación
    invitation.value = await getInvitationByUrl(invitationId)
    if (!invitation.value) {
      throw new Error('Invitación no encontrada')
    }
    
    // Cargar fotos de la galería
    galleryPhotos.value = await loadGalleryPhotos(invitation.value.id)
    
    // Actualizar el ID de la invitación en el formulario
    photoForm.value.invitation_id = invitation.value.id
  } catch (error) {
    console.error('Error loading data:', error)
  } finally {
    loading.value = false
  }
}

const editPhoto = (photo: GalleryPhoto) => {
  editingPhoto.value = photo
  photoForm.value = {
    invitation_id: photo.invitation_id,
    title: photo.title || '',
    description: photo.description || '',
    image_url: photo.image_url,
    thumbnail_url: photo.thumbnail_url || '',
    order_index: photo.order_index
  }
  showUploadModal.value = true
}

const closeModal = () => {
  showUploadModal.value = false
  editingPhoto.value = null
  removeSelectedFile()
  resetForm()
}

const resetForm = () => {
  photoForm.value = {
    invitation_id: invitation.value?.id || '',
    title: '',
    description: '',
    image_url: '',
    thumbnail_url: '',
    order_index: 0
  }
}

const savePhoto = async () => {
  try {
    saving.value = true
    
    let imageUrl = photoForm.value.image_url
    let thumbnailUrl = photoForm.value.thumbnail_url
    
    // Si hay un archivo seleccionado, subirlo primero
    if (selectedFile.value) {
      // Subir imagen principal
      const uploadResult = await uploadFile(selectedFile.value, 'invitations', `gallery/${invitation.value?.id}`)
      if (!uploadResult) {
        throw new Error('Error al subir la imagen')
      }
      
      imageUrl = uploadResult.url
      
      // Crear y subir thumbnail
      const thumbnailFile = await createThumbnail(selectedFile.value)
      if (thumbnailFile) {
        const thumbnailResult = await uploadFile(thumbnailFile, 'invitations', `gallery/${invitation.value?.id}/thumbnails`)
        if (thumbnailResult) {
          thumbnailUrl = thumbnailResult.url
        }
      }
    }
    
    // Validar que tengamos una URL de imagen
    if (!imageUrl) {
      throw new Error('Debes subir una imagen o proporcionar una URL')
    }
    
    const photoData = {
      ...photoForm.value,
      image_url: imageUrl,
      thumbnail_url: thumbnailUrl
    }
    
    if (editingPhoto.value) {
      // Actualizar foto existente
      const updatedPhoto = await updateGalleryPhoto(editingPhoto.value.id, photoData)
      if (updatedPhoto) {
        const index = galleryPhotos.value.findIndex(p => p.id === editingPhoto.value!.id)
        if (index !== -1) {
          galleryPhotos.value[index] = updatedPhoto
        }
      }
    } else {
      // Crear nueva foto
      const newPhoto = await createGalleryPhoto(photoData)
      if (newPhoto) {
        galleryPhotos.value.push(newPhoto)
      }
    }
    
    closeModal()
  } catch (error) {
    console.error('Error saving photo:', error)
    alert('Error al guardar la foto: ' + (error as Error).message)
  } finally {
    saving.value = false
  }
}

const deletePhoto = async (photoId: string) => {
  if (!confirm('¿Estás seguro de que quieres eliminar esta foto?')) {
    return
  }
  
  try {
    const success = await deleteGalleryPhoto(photoId)
    if (success) {
      galleryPhotos.value = galleryPhotos.value.filter(p => p.id !== photoId)
    }
  } catch (error) {
    console.error('Error deleting photo:', error)
  }
}

// File upload functions
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    processSelectedFile(file)
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = true
}

const handleDragLeave = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
  
  const files = event.dataTransfer?.files
  if (files && files.length > 0) {
    processSelectedFile(files[0])
  }
}

const processSelectedFile = (file: File) => {
  // Validar archivo
  const validation = validateFile(file)
  if (!validation.valid) {
    alert(validation.error)
    return
  }

  selectedFile.value = file
  
  // Crear preview
  const reader = new FileReader()
  reader.onload = (e) => {
    filePreview.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

const removeSelectedFile = () => {
  selectedFile.value = null
  filePreview.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>

<style scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}

.upload-area {
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #f8f9fa;
}

.upload-area:hover {
  border-color: #007bff;
  background-color: #f0f8ff;
}

.upload-area.dragover {
  border-color: #007bff;
  background-color: #e3f2fd;
  transform: scale(1.02);
}

.upload-area.has-file {
  border-color: #28a745;
  background-color: #f8fff9;
}

.upload-placeholder {
  color: #6c757d;
}

.upload-placeholder i {
  color: #007bff;
}

.file-preview {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: white;
  border-radius: 6px;
  border: 1px solid #dee2e6;
}

.file-preview img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.file-info {
  flex: 1;
  text-align: left;
}

.file-info p {
  margin: 0;
  font-weight: 500;
  color: #333;
}

.file-info small {
  color: #6c757d;
}
</style>
