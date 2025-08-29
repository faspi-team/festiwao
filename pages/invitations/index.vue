<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="card">
        <div class="card-header">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Invitaciones</h5>
            <NuxtLink to="/invitations/create" class="btn btn-primary">
              <i class="ti ti-plus"></i> Nueva Invitación
            </NuxtLink>
          </div>
        </div>
        <div class="card-body">
          <div v-if="loading" class="text-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Cargando...</span>
            </div>
          </div>
          
          <div v-else-if="invitations.length === 0" class="text-center py-5">
            <i class="ti ti-play-card" style="font-size: 3rem; color: #ccc;"></i>
            <h6 class="mt-3">No hay invitaciones</h6>
            <p class="text-muted">Crea tu primera invitación para comenzar</p>
            <button class="btn btn-primary" @click="showCreateModal = true">
              Crear Invitación
            </button>
          </div>
          
          <div v-else class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Pareja</th>
                  <th>Fecha del Evento</th>   
                  <th>Estado</th>
                  <th>Creada</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="invitation in invitations" :key="invitation.id">
                  <td>
                    <div class="d-flex align-items-center">
                      <div class="me-3">
                        <img 
                          :src="invitation.photo_url || '/assets/images/default-invitation.svg'" 
                          :alt="invitation.photo_url ? 'Foto invitación' : 'Imagen por defecto'"
                          class="rounded-circle"
                          style="width: 50px; height: 50px; object-fit: cover;"
                          @error="handleImageError"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          :data-bs-title="invitation.photo_url ? 'Foto personalizada de la invitación' : 'Imagen por defecto de la invitación'"
                        >
                      </div>
                      <div>
                        <div class="fw-bold">
                          {{ invitation.groom_name || 'Novio' }} & {{ invitation.bride_name || 'Novia' }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div>
                      <div class="fw-medium">{{ formatDate(invitation.event_date) }}</div>
                      <small class="text-muted">{{ formatDateTime(invitation.event_date) }}</small>
                    </div>
                  </td>
                  <td>
                    <span 
                      class="badge"
                      :class="invitation.is_active ? 'bg-success' : 'bg-secondary'"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      :data-bs-title="invitation.is_active ? 'La invitación está activa y visible públicamente' : 'La invitación está inactiva y no es visible públicamente'"
                    >
                      {{ invitation.is_active ? 'Activa' : 'Inactiva' }}
                    </span>
                  </td>
                  <td>
                    <small class="text-muted">
                      <i class="ti ti-calendar me-1"></i>
                      {{ formatDate(invitation.created_at) }}
                    </small>
                  </td>
                  <td>
                    <div class="btn-group btn-group-sm">
                      <button 
                        @click="viewInvitation(invitation)" 
                        class="btn btn-outline-primary"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Ver invitación"
                      >
                        <i class="ti ti-eye"></i>
                      </button>
                      <button 
                        @click="copyUrl(invitation)" 
                        class="btn btn-outline-secondary"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Copiar URL de la invitación"
                      >
                        <i class="ti ti-copy"></i>
                      </button>
                      <NuxtLink 
                        v-if="invitation.user_id === user?.id"
                        :to="`/admin/gallery/${invitation.unique_url}`" 
                        class="btn btn-outline-info"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Gestionar galería"
                      >
                        <i class="ti ti-photo"></i>
                      </NuxtLink>
                      <NuxtLink 
                        v-if="invitation.user_id === user?.id"
                        :to="`/invitations/create?edit=${invitation.id}`" 
                        class="btn btn-outline-warning"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Editar"
                      >
                        <i class="ti ti-edit"></i>
                      </NuxtLink>
                      <!-- <button 
                        v-if="invitation.user_id === user?.id"
                        @click="deleteInvitation(invitation.id)" 
                        class="btn btn-outline-danger"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Eliminar invitación permanentemente"
                      >
                        <i class="ti ti-trash"></i>
                      </button> -->
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const { 
  invitations, 
  templates, 
  loading, 
  loadInvitations, 
  loadTemplates, 
  createInvitation: createInvitationComposable,
  deleteInvitation: deleteInvitationComposable,
  formatDate,
  formatDateTime
} = useInvitations()

const { user } = useAuth()
const creating = ref(false)
const showCreateModal = ref(false)

const newInvitation = ref({
  template_id: '',
  groom_name: '',
  bride_name: '',
  event_date: '',
  venue: '',
  description: ''
})

watch(user, async (newUser) => {
  if (newUser) {
    await loadInvitations()
    await loadTemplates()
  }
}, { immediate: true })

onMounted(() => {
  initializeTooltips()
})

onUpdated(() => {
  initializeTooltips()
})

const initializeTooltips = () => {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new (window as any).bootstrap.Tooltip(tooltipTriggerEl))
}

const createInvitation = async () => {
  creating.value = true
  try {
    const result = await createInvitationComposable(newInvitation.value)
    if (result) {
      newInvitation.value = {
        template_id: '',
        groom_name: '',
        bride_name: '',
        event_date: '',
        venue: '',
        description: ''
      }
      showCreateModal.value = false
    }
  } catch (error) {
    console.error('Error creating invitation:', error)
  } finally {
    creating.value = false
  }
}

const viewInvitation = (invitation: any) => {
    window.open(`/invitation/${invitation.unique_url}`, '_blank')
}

const copyUrl = async (invitation: any) => {
  const url = `${window.location.origin}/invitation/${invitation.unique_url}`
  try {
    await navigator.clipboard.writeText(url)
  } catch (error) {
    console.error('Error copying URL:', error)
  }
}

const deleteInvitation = async (id: string) => {
  if (!confirm('¿Estás seguro de que quieres eliminar esta invitación?')) return
  
  const success = await deleteInvitationComposable(id)
  if (!success) {
    console.error('Error deleting invitation')
  }
}

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = '/assets/images/default-invitation.svg'
}
</script>

<style scoped>
.table th {
  font-weight: 600;
  color: #495057;
  border-bottom: 2px solid #dee2e6;
}

.table td {
  vertical-align: middle;
}

.btn-group-sm .btn {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

/* Estilos para la imagen por defecto */
.table img[src*="default-invitation.svg"] {
  background-color: #f8f9fa;
  border: 2px solid #dee2e6;
  padding: 2px;
}

/* Estilos para tooltips personalizados */
.tooltip {
  font-size: 0.875rem;
}

.tooltip-inner {
  background-color: #495057;
  color: white;
  border-radius: 6px;
  padding: 8px 12px;
  max-width: 250px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.tooltip.bs-tooltip-top .tooltip-arrow::before {
  border-top-color: #495057;
}

.tooltip.bs-tooltip-bottom .tooltip-arrow::before {
  border-bottom-color: #495057;
}

.tooltip.bs-tooltip-start .tooltip-arrow::before {
  border-left-color: #495057;
}

.tooltip.bs-tooltip-end .tooltip-arrow::before {
  border-right-color: #495057;
}

.modal.show {
  background-color: rgba(0, 0, 0, 0.5);
}
</style> 