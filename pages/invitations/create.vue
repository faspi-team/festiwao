<template>
  <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">{{ isEditMode ? 'Editar Invitación' : 'Crear Nueva Invitación' }}</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Plantilla</label>
                    <select v-model="form.template_id" class="form-select">
                      <option value="">Seleccionar plantilla</option>
                      <option v-for="template in templates" :key="template.id" :value="template.id">
                        {{ template.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Foto (opcional)</label>
                    <input type="file" class="form-control" accept="image/*" @change="onFileChange">
                    <div v-if="form.photo_url" class="mt-2">
                      <img :src="form.photo_url" alt="Foto invitación" class="img-thumbnail" style="max-height: 120px;">
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Nombre del Novio</label>
                    <input v-model="form.groom_name" type="text" class="form-control" placeholder="Nombre del novio">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Nombre de la Novia</label>
                    <input v-model="form.bride_name" type="text" class="form-control" placeholder="Nombre de la novia">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Descripción del Novio</label>
                    <textarea v-model="form.groom_description" class="form-control" rows="3" placeholder="Descripción del novio"></textarea>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Descripción de la Novia</label>
                    <textarea v-model="form.bride_description" class="form-control" rows="3" placeholder="Descripción de la novia"></textarea>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Fecha del Evento</label>
                    <input v-model="form.event_date" type="datetime-local" class="form-control">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label">Lugar</label>
                    <input v-model="form.venue" type="text" class="form-control" placeholder="Dirección del evento">
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label">Descripción</label>
                <textarea v-model="form.description" class="form-control" rows="3" placeholder="Detalles adicionales del evento"></textarea>
              </div>
              <div class="d-flex justify-content-end">
                <NuxtLink to="/invitations" class="btn btn-secondary me-2">Cancelar</NuxtLink>
                <button type="submit" class="btn btn-primary" :disabled="loading">
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ isEditMode ? 'Actualizar Invitación' : 'Crear Invitación' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useNuxtApp, useRoute } from '#imports'
import { ref, onMounted, computed } from 'vue'
import { useInvitations } from '~/composables/useInvitations'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const router = useRouter()
const route = useRoute()
const { $supabase } = useNuxtApp()
const { user } = useAuth()
const { templates, loadTemplates, createInvitation, updateInvitation } = useInvitations()

const isEditMode = computed(() => !!route.query.edit)
const invitationId = computed(() => route.query.edit as string)

const form = ref({
  template_id: '',
  groom_name: '',
  bride_name: '',
  groom_description: '',
  bride_description: '',
  event_date: '',
  venue: '',
  description: '',
  photo_url: ''
})

const loading = ref(false)

onMounted(async () => {
  await loadTemplates()
  
  if (isEditMode.value && invitationId.value) {
    try {
      const { data: allData, error: checkError } = await $supabase
        .from('invitations')
        .select('*')
        .eq('id', invitationId.value)
      
      if (checkError) {
        console.error('Error in query:', checkError)
        throw checkError
      }
      
      if (!allData || allData.length === 0) {
        console.error('No invitation found with ID:', invitationId.value)
        alert('Invitación no encontrada')
        router.push('/invitations')
        return
      }
      
      const data = allData[0]
      console.log('Loaded invitation data:', data)
      
      form.value = {
        template_id: data.template_id || '',
        groom_name: data.groom_name || '',
        bride_name: data.bride_name || '',
        groom_description: data.groom_description || '',
        bride_description: data.bride_description || '',
        event_date: data.event_date ? new Date(data.event_date).toISOString().slice(0, 16) : '',
        venue: data.venue || '',
        description: data.description || '',
        photo_url: data.photo_url || ''
      }
      
      console.log('Form preloaded with:', form.value)
    } catch (error) {
      console.error('Error loading invitation:', error)
      alert('Error cargando la invitación: ' + (error instanceof Error ? error.message : 'Error desconocido'))
      router.push('/invitations')
    }
  }
})

const onFileChange = async (e: Event) => {
  const target = e.target as HTMLInputElement
  if (!target.files || !target.files[0]) return
  const file = target.files[0]
  loading.value = true
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `invitation-${Date.now()}.${fileExt}`
    const { data, error } = await $supabase.storage
      .from('invitations')
      .upload(fileName, file, { upsert: true })
    if (error) throw error
    
    const { data: publicUrlData } = $supabase.storage
      .from('invitations')
      .getPublicUrl(fileName)
    form.value.photo_url = publicUrlData.publicUrl
  } catch (error) {
    alert('Error subiendo la imagen: ' + error)
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  loading.value = true
  try {
    let result
    
    if (isEditMode.value && invitationId.value) {
      const formData = {
        ...form.value,
        event_date: form.value.event_date ? new Date(form.value.event_date).toISOString() : undefined
      }
      
      result = await updateInvitation(invitationId.value, formData)
      
      if (result) {
        alert('Invitación actualizada exitosamente')
        router.push('/invitations')
      } else {
        throw new Error('Error actualizando la invitación')
      }
    } else {
      result = await createInvitation(form.value)
      if (result) {
        router.push('/invitations')
      }
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    const action = isEditMode.value ? 'actualizando' : 'creando'
    alert(`Error ${action} invitación: ${errorMessage}`)
  } finally {
    loading.value = false
  }
}
</script> 