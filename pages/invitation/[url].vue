<template>
  <div v-if="invitation" class="invitation-public">
    <div class="invitation-header">
      <div class="container">
        <div class="text-center">
          <h1 class="couple-names">
            {{ invitation.groom_name }}
            <span class="and">&</span>
            {{ invitation.bride_name }}
          </h1>
          <p class="invitation-subtitle">Tienen el honor de invitarte a su boda</p>
        </div>
      </div>
    </div>
    
    <div class="invitation-content">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8">
            <div class="event-details">
              <div class="detail-item">
                <i class="ti ti-calendar"></i>
                <div>
                  <h4>Fecha y Hora</h4>
                  <p>{{ formatDateTime(invitation.event_date) }}</p>
                </div>
              </div>
              
              <div class="detail-item">
                <i class="ti ti-map-pin"></i>
                <div>
                  <h4>Lugar</h4>
                  <p>{{ invitation.venue }}</p>
                </div>
              </div>
              
              <div v-if="invitation.description" class="detail-item">
                <i class="ti ti-message-circle"></i>
                <div>
                  <h4>Detalles</h4>
                  <p>{{ invitation.description }}</p>
                </div>
              </div>
            </div>
            
            <div class="rsvp-section">
              <h3>Confirma tu asistencia</h3>
              <div class="rsvp-buttons">
                <button class="btn btn-success btn-lg me-3" @click="rsvp('yes')">
                  <i class="ti ti-check"></i> Asistiré
                </button>
                <button class="btn btn-outline-secondary btn-lg" @click="rsvp('no')">
                  <i class="ti ti-x"></i> No podré asistir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div v-else-if="loading" class="loading-container">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Cargando...</span>
    </div>
  </div>
  
  <div v-else class="error-container">
    <div class="text-center">
      <i class="ti ti-alert-circle" style="font-size: 3rem; color: #dc3545;"></i>
      <h3>Invitación no encontrada</h3>
      <p>La invitación que buscas no existe o ha sido eliminada.</p>
      <NuxtLink to="/" class="btn btn-primary">Volver al inicio</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getInvitationByUrl, formatDateTime } = useInvitations()

const invitation = ref<any>(null)
const loading = ref(true)

onMounted(async () => {
  await loadInvitation()
})

const loadInvitation = async () => {
  try {
    const data = await getInvitationByUrl(route.params.url as string)
    invitation.value = data
  } catch (error) {
    console.error('Error loading invitation:', error)
    invitation.value = null
  } finally {
    loading.value = false
  }
}

const rsvp = async (response: 'yes' | 'no') => {
  // Aquí puedes implementar la funcionalidad de RSVP
  // Por ahora solo muestra una alerta
  const message = response === 'yes' 
    ? '¡Gracias por confirmar tu asistencia!' 
    : 'Entendemos, gracias por avisarnos.'
  
  alert(message)
}
</script>

<style scoped>
.invitation-public {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.invitation-header {
  padding: 4rem 0;
  color: white;
}

.couple-names {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.couple-names .and {
  color: #ffd700;
  margin: 0 1rem;
}

.invitation-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

.invitation-content {
  padding: 4rem 0;
  background: white;
}

.event-details {
  margin-bottom: 3rem;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
}

.detail-item i {
  font-size: 2rem;
  color: #667eea;
  margin-right: 1rem;
  margin-top: 0.5rem;
}

.detail-item h4 {
  margin-bottom: 0.5rem;
  color: #333;
}

.detail-item p {
  margin: 0;
  color: #666;
  font-size: 1.1rem;
}

.rsvp-section {
  text-align: center;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
}

.rsvp-section h3 {
  margin-bottom: 1.5rem;
  color: #333;
}

.rsvp-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.loading-container,
.error-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
}

@media (max-width: 768px) {
  .couple-names {
    font-size: 2rem;
  }
  
  .rsvp-buttons {
    flex-direction: column;
  }
  
  .rsvp-buttons .btn {
    margin: 0.5rem 0;
  }
}
</style> 