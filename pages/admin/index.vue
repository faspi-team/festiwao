<template>
  <div class="row">
    <div class="col-xl-3 col-md-6">
      <div class="card stat-widget">
        <div class="card-body">
          <div class="d-flex align-items-center">
            <div class="flex-shrink-0">
              <i class="ti ti-play-card text-primary" style="font-size: 2rem;"></i>
            </div>
            <div class="flex-grow-1 ms-3">
              <h4 class="mb-1">{{ stats.totalInvitations }}</h4>
              <p class="mb-0 text-muted">Total Invitaciones</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-xl-3 col-md-6">
      <div class="card stat-widget">
        <div class="card-body">
          <div class="d-flex align-items-center">
            <div class="flex-shrink-0">
              <i class="ti ti-calendar text-success" style="font-size: 2rem;"></i>
            </div>
            <div class="flex-grow-1 ms-3">
              <h4 class="mb-1">{{ stats.upcomingEvents }}</h4>
              <p class="mb-0 text-muted">Próximos Eventos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-xl-3 col-md-6">
      <div class="card stat-widget">
        <div class="card-body">
          <div class="d-flex align-items-center">
            <div class="flex-shrink-0">
              <i class="ti ti-users text-info" style="font-size: 2rem;"></i>
            </div>
            <div class="flex-grow-1 ms-3">
              <h4 class="mb-1">{{ stats.totalRSVP }}</h4>
              <p class="mb-0 text-muted">Total RSVP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-xl-3 col-md-6">
      <div class="card stat-widget">
        <div class="card-body">
          <div class="d-flex align-items-center">
            <div class="flex-shrink-0">
              <i class="ti ti-check text-warning" style="font-size: 2rem;"></i>
            </div>
            <div class="flex-grow-1 ms-3">
              <h4 class="mb-1">{{ stats.confirmedRSVP }}</h4>
              <p class="mb-0 text-muted">Confirmados</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col-xl-8">
      <div class="card">
        <div class="card-header">
          <h5>Invitaciones Recientes</h5>
        </div>
        <div class="card-body">
          <div v-if="recentInvitations.length === 0" class="text-center py-4">
            <i class="ti ti-play-card" style="font-size: 3rem; color: #ccc;"></i>
            <h6 class="mt-3">No hay invitaciones</h6>
            <p class="text-muted">Crea tu primera invitación para comenzar</p>
            <NuxtLink to="/invitations" class="btn btn-primary">
              Crear Invitación
            </NuxtLink>
          </div>
          
          <div v-else class="table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Título</th>
                  <th>Pareja</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="invitation in recentInvitations" :key="invitation.id">
                  <td>
                    <div>
                      <strong>{{ invitation.groom_name || 'Novio' }} & {{ invitation.bride_name || 'Novia' }}</strong>
                    </div>
                  </td>
                  <td>{{ formatDate(invitation.event_date) }}</td>
                  <td>
                    <div class="btn-group btn-group-sm">
                      <NuxtLink 
                        :to="`/invitation/${invitation.unique_url}`" 
                        class="btn btn-outline-primary"
                        target="_blank"
                      >
                        <i class="ti ti-eye"></i>
                      </NuxtLink>
                      <button 
                        class="btn btn-outline-secondary"
                        @click="copyUrl(invitation)"
                      >
                        <i class="ti ti-copy"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    
    <div class="col-xl-4">
      <div class="card">
        <div class="card-header">
          <h5>Acciones Rápidas</h5>
        </div>
        <div class="card-body">
          <div class="d-grid gap-2">
            <NuxtLink to="/invitations" class="btn btn-primary">
              <i class="ti ti-plus"></i> Nueva Invitación
            </NuxtLink>
            <NuxtLink to="/invitations" class="btn btn-outline-primary">
              <i class="ti ti-list"></i> Ver Todas las Invitaciones
            </NuxtLink>
            <button class="btn btn-outline-secondary">
              <i class="ti ti-download"></i> Exportar Datos
            </button>
          </div>
        </div>
      </div>
      
      <div class="card mt-4">
        <div class="card-header">
          <h5>Estadísticas</h5>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <div class="d-flex justify-content-between mb-1">
              <span>Confirmaciones</span>
              <span>{{ stats.confirmedRSVP }}/{{ stats.totalRSVP }}</span>
            </div>
            <div class="progress">
              <div 
                class="progress-bar bg-success" 
                :style="{ width: stats.rsvpPercentage + '%' }"
              ></div>
            </div>
          </div>
          
          <div class="mb-3">
            <div class="d-flex justify-content-between mb-1">
              <span>Invitaciones Activas</span>
              <span>{{ stats.activeInvitations }}/{{ stats.totalInvitations }}</span>
            </div>
            <div class="progress">
              <div 
                class="progress-bar bg-primary" 
                :style="{ width: stats.activePercentage + '%' }"
              ></div>
            </div>
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

const { invitations, loadInvitations, formatDate } = useInvitations()
const { user } = useAuth()

const stats = ref({
  totalInvitations: 0,
  upcomingEvents: 0,
  totalRSVP: 0,
  confirmedRSVP: 0,
  activeInvitations: 0,
  rsvpPercentage: 0,
  activePercentage: 0
})

const recentInvitations = computed(() => {
  return invitations.value.slice(0, 5)
})

onMounted(async () => {
  await loadInvitations()
  calculateStats()
})

const calculateStats = () => {
  const now = new Date()
  const upcoming = invitations.value.filter(inv => {
    if (!inv.event_date) return false
    return new Date(inv.event_date) > now
  })
  
  const active = invitations.value.filter(inv => inv.is_active)
  
  stats.value = {
    totalInvitations: invitations.value.length,
    upcomingEvents: upcoming.length,
    totalRSVP: 0, // Implementar cuando tengas la tabla de RSVP
    confirmedRSVP: 0, // Implementar cuando tengas la tabla de RSVP
    activeInvitations: active.length,
    rsvpPercentage: 0, // Implementar cuando tengas la tabla de RSVP
    activePercentage: invitations.value.length > 0 
      ? Math.round((active.length / invitations.value.length) * 100) 
      : 0
  }
}

const copyUrl = async (invitation: any) => {
  const url = `${window.location.origin}/invitation/${invitation.unique_url}`
  try {
    await navigator.clipboard.writeText(url)
    // Aquí podrías mostrar una notificación de éxito
  } catch (error) {
    console.error('Error copying URL:', error)
  }
}
</script>

<style scoped>
.stat-widget {
  transition: transform 0.2s;
}

.stat-widget:hover {
  transform: translateY(-2px);
}

.progress {
  height: 8px;
}
</style>
