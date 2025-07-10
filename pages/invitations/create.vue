<template>
  <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card">
          <div class="card-header">
            <h5 class="mb-0">Crear Nueva Invitación</h5>
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
                  Crear Invitación
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
import { useRouter, useNuxtApp } from '#imports'
import { ref, onMounted } from 'vue'
import { useInvitations } from '~/composables/useInvitations'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const router = useRouter()
const { $supabase } = useNuxtApp()
const { templates, loadTemplates, createInvitation } = useInvitations()

const form = ref({
  template_id: '',
  groom_name: '',
  bride_name: '',
  event_date: '',
  venue: '',
  description: '',
  photo_url: ''
})

const loading = ref(false)

onMounted(async () => {
  await loadTemplates()
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
    alert('Error subiendo la imagen: ' + error.message)
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  loading.value = true
  try {
    const result = await createInvitation(form.value)
    if (result) {
      router.push('/invitations')
    }
  } catch (error) {
    alert('Error creando invitación: ' + error.message)
  } finally {
    loading.value = false
  }
}
</script> 