<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="card">
        <div class="card-header">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Invitaciones</h5>
            <div>
              <button class="btn btn-primary" @click="showCreateModal = true">
                <i class="ti ti-plus"></i> Nueva Invitación
              </button>
            </div>
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
          
          <div v-else class="row">
            <div v-for="invitation in invitations" :key="invitation.id" class="col-md-6 col-lg-4 mb-4">
              <div class="card invitation-card">
                <div class="card-body">
                                     <div class="d-flex justify-content-between align-items-start mb-3">
                     <h6 class="card-title mb-0">Invitación</h6>
                    <div class="dropdown">
                        <button class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                            <i class="ti ti-dots"></i>
                        </button>
                        <ul class="dropdown-menu">
                            <li>
                                <a class="dropdown-item" href="#" @click="viewInvitation(invitation)">
                                    <i class="ti ti-eye"></i> Ver
                                </a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#" @click="copyUrl(invitation)">
                                    <i class="ti ti-copy"></i> Copiar URL
                                </a>
                            </li>
                            <li v-if="invitation.user_id === user?.id"><hr class="dropdown-divider"></li>
                            <li v-if="invitation.user_id === user?.id">
                                <a class="dropdown-item text-danger" href="#" @click="deleteInvitation(invitation.id)">
                                    <i class="ti ti-trash"></i> Eliminar
                                </a>
                            </li>
                       </ul>
                    </div>
                  </div>
                  
                  <div class="invitation-preview mb-3">
                    <div class="text-center">
                      <div class="couple-names">
                        <span class="groom">{{ invitation.groom_name || 'Novio' }}</span>
                        <span class="and">&</span>
                        <span class="bride">{{ invitation.bride_name || 'Novia' }}</span>
                      </div>
                      <div class="date mt-2">
                        {{ formatDate(invitation.event_date) }}
                      </div>
                    </div>
                  </div>
                  
                                     <div class="invitation-stats">
                     <small class="text-muted">
                       <i class="ti ti-calendar"></i> {{ formatDate(invitation.created_at) }}
                     </small>
                     <small v-if="invitation.user_id !== user?.id" class="text-muted d-block">
                       <i class="ti ti-user"></i> Creada por otro usuario
                     </small>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="showCreateModal" class="modal fade show" style="display: block;" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Crear Nueva Invitación</h5>
          <button type="button" class="btn-close" @click="showCreateModal = false"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createInvitation">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Plantilla</label>
                  <select v-model="newInvitation.template_id" class="form-select">
                    <option value="">Seleccionar plantilla</option>
                    <option v-for="template in templates" :key="template.id" :value="template.id">
                      {{ template.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Nombre del Novio</label>
                  <input v-model="newInvitation.groom_name" type="text" class="form-control" placeholder="Nombre del novio">
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Nombre de la Novia</label>
                  <input v-model="newInvitation.bride_name" type="text" class="form-control" placeholder="Nombre de la novia">
                </div>
              </div>
            </div>
            
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Fecha del Evento</label>
                  <input v-model="newInvitation.event_date" type="datetime-local" class="form-control">
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label class="form-label">Lugar</label>
                  <input v-model="newInvitation.venue" type="text" class="form-control" placeholder="Dirección del evento">
                </div>
              </div>
            </div>
            
            <div class="mb-3">
              <label class="form-label">Descripción</label>
              <textarea v-model="newInvitation.description" class="form-control" rows="3" placeholder="Detalles adicionales del evento"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="showCreateModal = false">Cancelar</button>
          <button type="button" class="btn btn-primary" @click="createInvitation" :disabled="creating">
            <span v-if="creating" class="spinner-border spinner-border-sm me-2"></span>
            Crear Invitación
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <div v-if="showCreateModal" class="modal-backdrop fade show"></div>
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
  formatDate 
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
</script>

<style scoped>
.invitation-card {
  transition: transform 0.2s;
  cursor: pointer;
}

.invitation-card:hover {
  transform: translateY(-2px);
}

.couple-names {
  font-size: 1.2rem;
  font-weight: 600;
}

.couple-names .and {
  color: #666;
  margin: 0 0.5rem;
}

.date {
  color: #666;
  font-size: 0.9rem;
}

.invitation-preview {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 8px;
  padding: 1rem;
}

.modal.show {
  background-color: rgba(0, 0, 0, 0.5);
}
</style> 