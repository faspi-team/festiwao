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
              <div class="row">
                <div class="col-md-8">
                  <div class="mb-3">
                    <label class="form-label">Número de WhatsApp</label>
                    <div class="input-group">
                      <span class="input-group-text">
                        <i class="fab fa-whatsapp text-success"></i>
                      </span>
                      <input 
                        v-model="form.whatsapp_number" 
                        type="tel" 
                        class="form-control" 
                        placeholder="+1234567890"
                        pattern="^\+?[0-9\s\-\(\)]+$"
                      >
                    </div>
                    <small class="text-muted">
                      <i class="fas fa-info-circle me-1"></i>
                      Los invitados podrán confirmar su asistencia directamente por WhatsApp
                    </small>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-8">
                  <div class="mb-3">
                    <label class="form-label">Enlace de Google Maps</label>
                    <div class="input-group">
                      <span class="input-group-text">
                        <i class="fas fa-map-marker-alt text-danger"></i>
                      </span>
                      <input 
                        v-model="form.google_maps_url" 
                        type="url" 
                        class="form-control" 
                        placeholder="https://maps.google.com/..."
                      >
                    </div>
                    <small class="text-muted">
                      <i class="fas fa-info-circle me-1"></i>
                      Los invitados podrán abrir la ubicación directamente en Google Maps
                    </small>
                  </div>
                </div>
              </div>
              <!-- Personalización de Colores -->
              <div class="mb-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h6 class="mb-0" data-bs-toggle="collapse" data-bs-target="#colorsCollapse" role="button" aria-expanded="false" aria-controls="colorsCollapse" style="cursor: pointer;">
                    <i class="fas fa-palette text-primary me-2"></i>
                    Personalización de Colores
                    <i class="fas fa-chevron-down ms-2 text-muted"></i>
                  </h6>
                  <button 
                    type="button" 
                    class="btn btn-sm btn-outline-secondary"
                    @click="resetColors"
                    title="Restablecer colores por defecto"
                  >
                    <i class="fas fa-undo"></i> Restablecer
                  </button>
                </div>
                
                <div class="collapse" id="colorsCollapse">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Color Principal</label>
                        <div class="d-flex align-items-center">
                          <input 
                            v-model="form.primary_color" 
                            type="color" 
                            class="form-control form-control-color me-2" 
                            style="width: 60px; height: 40px;"
                            title="Seleccionar color principal"
                          >
                          <input 
                            v-model="form.primary_color" 
                            type="text" 
                            class="form-control" 
                            placeholder="#007bff"
                            pattern="^#[0-9A-Fa-f]{6}$"
                          >
                        </div>
                        <small class="text-muted">Color principal para títulos y elementos destacados</small>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Color Secundario</label>
                        <div class="d-flex align-items-center">
                          <input 
                            v-model="form.secondary_color" 
                            type="color" 
                            class="form-control form-control-color me-2" 
                            style="width: 60px; height: 40px;"
                            title="Seleccionar color secundario"
                          >
                          <input 
                            v-model="form.secondary_color" 
                            type="text" 
                            class="form-control" 
                            placeholder="#6c757d"
                            pattern="^#[0-9A-Fa-f]{6}$"
                          >
                        </div>
                        <small class="text-muted">Color secundario para textos y elementos de apoyo</small>
                      </div>
                    </div>
                  </div>
                  
                  <div class="row">
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Color de Fondo</label>
                        <div class="d-flex align-items-center">
                          <input 
                            v-model="form.background_color" 
                            type="color" 
                            class="form-control form-control-color me-2" 
                            style="width: 60px; height: 40px;"
                            title="Seleccionar color de fondo"
                          >
                          <input 
                            v-model="form.background_color" 
                            type="text" 
                            class="form-control" 
                            placeholder="#ffffff"
                            pattern="^#[0-9A-Fa-f]{6}$"
                          >
                        </div>
                        <small class="text-muted">Color de fondo principal de la invitación</small>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="mb-3">
                        <label class="form-label">Color de Texto</label>
                        <div class="d-flex align-items-center">
                          <input 
                            v-model="form.text_color" 
                            type="color" 
                            class="form-control form-control-color me-2" 
                            style="width: 60px; height: 40px;"
                            title="Seleccionar color de texto"
                          >
                          <input 
                            v-model="form.text_color" 
                            type="text" 
                            class="form-control" 
                            placeholder="#212529"
                            pattern="^#[0-9A-Fa-f]{6}$"
                          >
                        </div>
                        <small class="text-muted">Color principal para textos</small>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Vista previa de colores -->
                  <div class="mb-3">
                    <label class="form-label">Vista Previa de Colores</label>
                    <div class="card" :style="{ backgroundColor: form.background_color || '#ffffff' }">
                      <div class="card-body p-3">
                        <h5 :style="{ color: form.primary_color || '#007bff' }">Título Principal</h5>
                        <p :style="{ color: form.text_color || '#212529' }">Este es un ejemplo de texto con los colores seleccionados. Aquí puedes ver cómo se verá tu invitación con la combinación de colores elegida.</p>
                        <span class="badge" :style="{ backgroundColor: form.secondary_color || '#6c757d', color: '#ffffff' }">Elemento Secundario</span>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Paletas de colores predefinidas -->
                  <div class="mb-3">
                    <label class="form-label">Paletas Predefinidas</label>
                    <div class="row">
                      <div 
                        v-for="palette in colorPalettes" 
                        :key="palette.name"
                        class="col-md-3 col-sm-6 mb-2"
                      >
                        <div 
                          class="card cursor-pointer border"
                          :class="{ 'border-primary': selectedPalette === palette.name }"
                          @click="applyColorPalette(palette)"
                          :title="palette.name"
                        >
                          <div class="card-body p-2">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                              <small class="fw-bold">{{ palette.name }}</small>
                              <i v-if="selectedPalette === palette.name" class="fas fa-check text-primary"></i>
                            </div>
                            <div class="d-flex gap-1">
                              <div 
                                class="color-preview" 
                                :style="{ backgroundColor: palette.colors.primary }"
                                :title="palette.colors.primary"
                              ></div>
                              <div 
                                class="color-preview" 
                                :style="{ backgroundColor: palette.colors.secondary }"
                                :title="palette.colors.secondary"
                              ></div>
                              <div 
                                class="color-preview" 
                                :style="{ backgroundColor: palette.colors.background }"
                                :title="palette.colors.background"
                              ></div>
                              <div 
                                class="color-preview" 
                                :style="{ backgroundColor: palette.colors.text }"
                                :title="palette.colors.text"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Historia de Amor -->
              <div class="mb-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h6 class="mb-0" data-bs-toggle="collapse" data-bs-target="#storyCollapse" role="button" aria-expanded="false" aria-controls="storyCollapse" style="cursor: pointer;">
                    <i class="fas fa-heart text-primary me-2"></i>
                    Historia de Amor
                    <i class="fas fa-chevron-down ms-2 text-muted"></i>
                  </h6>
                  <button type="button" class="btn btn-sm btn-outline-primary" @click="addStoryEvent">
                    <i class="ti ti-plus"></i> Agregar Evento
                  </button>
                </div>
                
                <div class="collapse" id="storyCollapse">
                  <div v-if="form.story && form.story.length > 0" class="story-events">
                    <div v-for="(event, index) in form.story" :key="event.id" class="card mb-3">
                      <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                          <h6 class="card-title mb-0">Evento {{ index + 1 }}</h6>
                          <button type="button" class="btn btn-sm btn-outline-danger" @click="removeStoryEvent(index)">
                            <i class="ti ti-trash"></i>
                          </button>
                        </div>
                        
                        <div class="row">
                          <div class="col-md-6">
                            <div class="mb-3">
                              <label class="form-label">Título</label>
                              <input v-model="event.title" type="text" class="form-control" placeholder="Ej: Primer encuentro">
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="mb-3">
                              <label class="form-label">Fecha</label>
                              <input v-model="event.date" type="date" class="form-control">
                            </div>
                          </div>
                        </div>
                        
                        <div class="mb-3">
                          <label class="form-label">Descripción</label>
                          <textarea v-model="event.description" class="form-control" rows="3" placeholder="Cuenta la historia de este momento especial..."></textarea>
                        </div>
                        
                        <div class="mb-3">
                          <label class="form-label">Imagen (opcional)</label>
                          <input @change="handleStoryImageUpload($event, index)" type="file" class="form-control" accept="image/*">
                          <div v-if="event.image" class="mt-2">
                            <img :src="event.image" alt="Imagen del evento" class="img-thumbnail" style="max-height: 100px;">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div v-else class="text-center py-4 text-muted">
                    <i class="ti ti-heart" style="font-size: 2rem;"></i>
                    <p class="mb-0">No hay eventos en la historia. ¡Agrega el primer momento especial!</p>
                  </div>
                </div>
              </div>
              
              <!-- Timeline de la Boda -->
              <div class="mb-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h6 class="mb-0" data-bs-toggle="collapse" data-bs-target="#timelineCollapse" role="button" aria-expanded="false" aria-controls="timelineCollapse" style="cursor: pointer;">
                    <i class="fas fa-calendar-alt text-primary me-2"></i>
                    Planificación de la Boda
                    <i class="fas fa-chevron-down ms-2 text-muted"></i>
                  </h6>
                  <button type="button" class="btn btn-sm btn-outline-primary" @click="addTimelineEvent">
                    <i class="ti ti-plus"></i> Agregar Evento
                  </button>
                </div>
                
                <div class="collapse" id="timelineCollapse">
                  <div v-if="form.wedding_timeline && form.wedding_timeline.length > 0" class="timeline-events">
                    <div v-for="(event, index) in form.wedding_timeline" :key="event.id" class="card mb-3">
                      <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                          <h6 class="card-title mb-0">Evento {{ index + 1 }}</h6>
                          <button type="button" class="btn btn-sm btn-outline-danger" @click="removeTimelineEvent(index)">
                            <i class="ti ti-trash"></i>
                          </button>
                        </div>
                        
                        <div class="row">
                          <div class="col-md-6">
                            <div class="mb-3">
                              <label class="form-label">Título</label>
                              <input v-model="event.title" type="text" class="form-control" placeholder="Ej: Ceremonia">
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="mb-3">
                              <label class="form-label">Horario</label>
                              <input v-model="event.time" type="text" class="form-control" placeholder="Ej: 10:00AM - 11:00AM">
                            </div>
                          </div>
                        </div>
                        
                        <div class="mb-3">
                          <label class="form-label">Descripción</label>
                          <textarea v-model="event.description" class="form-control" rows="2" placeholder="Descripción del evento..."></textarea>
                        </div>
                        
                        <div class="mb-3">
                          <label class="form-label">Icono</label>
                          <div class="row">
                            <div v-for="iconOption in predefinedIcons" :key="iconOption.id" class="col-2 col-md-1 mb-2">
                              <button 
                                type="button" 
                                class="btn btn-outline-secondary w-100 p-2"
                                :class="{ 'active': event.icon === iconOption.icon }"
                                @click="event.icon = iconOption.icon"
                                :title="iconOption.label"
                              >
                                <i :class="iconOption.icon"></i>
                              </button>
                            </div>
                          </div>
                          <small class="text-muted">Selecciona un icono para el evento</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div v-else class="text-center py-4 text-muted">
                    <i class="ti ti-calendar" style="font-size: 2rem;"></i>
                    <p class="mb-0">No hay eventos en el timeline. ¡Agrega el primer evento!</p>
                  </div>
                </div>
              </div>
              
              <!-- Sección de Música -->
              <div class="mb-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h6 class="mb-0" data-bs-toggle="collapse" data-bs-target="#musicCollapse" role="button" aria-expanded="false" aria-controls="musicCollapse" style="cursor: pointer;">
                    <i class="fas fa-music text-primary me-2"></i>
                    Música de Fondo
                    <i class="fas fa-chevron-down ms-2 text-muted"></i>
                  </h6>
                </div>
                
                <div class="collapse" id="musicCollapse">
                  <div class="mb-3">
                    <label class="form-label">Seleccionar Música</label>
                    
                    <!-- Indicador de carga -->
                    <div v-if="musicLoading" class="text-center py-4">
                      <div class="spinner-border text-primary" role="status">
                        <span class="visually-hidden">Cargando música...</span>
                      </div>
                      <p class="mt-2 text-muted">Cargando opciones de música...</p>
                    </div>
                    
                    <!-- Contenido cuando la música está cargada -->
                    <div v-else>
                      <div class="row">
                        <!-- Opción sin música -->
                        <div class="col-md-6 col-lg-4 mb-3">
                          <div 
                            class="card cursor-pointer border"
                            :class="{ 'border-primary bg-light': !form.music_id }"
                            @click="selectNoMusic"
                          >
                            <div class="card-body p-3 text-center">
                              <i class="fas fa-volume-mute text-muted mb-2" style="font-size: 0.95rem;"></i>
                              <h6 class="card-title mb-0">Sin música</h6>
                              <small class="text-muted">Invitación sin música de fondo</small>
                            </div>
                          </div>
                        </div>
                        
                        <!-- Música predefinida -->
                        <div 
                          v-for="music in predefinedMusic" 
                          :key="music.id" 
                          class="col-md-6 col-lg-4 mb-3"
                        >
                          <div 
                            class="card cursor-pointer border"
                            :class="{ 'border-primary bg-light': form.music_id === music.id }"
                            @click="selectMusic(music)"
                          >
                            <div class="card-body p-3">
                              <div class="d-flex align-items-center mb-2">
                                <i class="fas fa-music text-primary me-2"></i>
                                <div class="flex-grow-1">
                                  <h6 class="card-title mb-0 small">{{ music.name }}</h6>
                                  <small class="text-muted">Música predefinida</small>
                                </div>
                                <i 
                                  v-if="form.music_id === music.id" 
                                  class="fas fa-check-circle text-primary"
                                ></i>
                              </div>
                              <div class="d-flex justify-content-between align-items-center">
                                <span class="badge bg-secondary">Predefinida</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <!-- Música personalizada -->
                        <div 
                          v-for="music in customMusic" 
                          :key="music.id" 
                          class="col-md-6 col-lg-4 mb-3"
                        >
                          <div 
                            class="card cursor-pointer border"
                            :class="{ 'border-primary bg-light': form.music_id === music.id }"
                            @click="selectMusic(music)"
                          >
                            <div class="card-body p-3">
                              <div class="d-flex align-items-center mb-2">
                                <i class="fas fa-music text-primary me-2"></i>
                                <div class="flex-grow-1">
                                  <h6 class="card-title mb-0 small">{{ music.name }}</h6>
                                  <small class="text-muted">Música personalizada</small>
                                </div>
                                <div class="d-flex align-items-center">
                                  <i 
                                    v-if="form.music_id === music.id" 
                                    class="fas fa-check-circle text-primary me-2"
                                  ></i>
                                  <button 
                                    type="button" 
                                    class="btn btn-sm btn-outline-danger"
                                    @click.stop="handleDeleteCustomMusic(music.id)"
                                    title="Eliminar música personalizada"
                                  >
                                    <i class="fas fa-trash"></i>
                                  </button>
                                </div>
                              </div>
                              <div class="d-flex justify-content-between align-items-center">
                                <span class="badge bg-warning">Personalizada</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <!-- Mensaje si no hay música disponible -->
                      <div v-if="predefinedMusic.length === 0 && customMusic.length === 0" class="text-center py-4 text-muted">
                        <i class="fas fa-music" style="font-size: 2rem;"></i>
                        <p class="mb-0">No hay música disponible. Sube música personalizada o contacta al administrador.</p>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Subir música personalizada -->
                  <div class="mb-3">
                    <label class="form-label">Subir Música Personalizada</label>
                    <input 
                      type="file" 
                      class="form-control" 
                      accept="audio/*"
                      @change="onMusicFileChange"
                      :disabled="musicLoading"
                    >
                    <div class="form-text">
                      Formatos permitidos: MP3, WAV, OGG. Tamaño máximo: 10MB.
                    </div>
                  </div>
                  
                  <!-- Vista previa de música seleccionada -->
                  <div v-if="selectedMusic" class="mt-3">
                    <div class="card">
                      <div class="card-body p-3">
                        <div class="d-flex align-items-center justify-content-between">
                          <div class="d-flex align-items-center">
                            <i class="fas fa-music text-primary me-2"></i>
                            <div>
                              <strong>{{ selectedMusic.name }}</strong>
                              <div class="small text-muted">
                                {{ selectedMusic.type === 'predefined' ? 'Música predefinida' : 'Música personalizada' }}
                              </div>
                            </div>
                          </div>
                          <audio controls class="ms-3" style="width: 200px;" :key="selectedMusic?.id || 'no-music'">
                            <source :src="`${selectedMusic.url}`" type="audio/mpeg">
                            Tu navegador no soporta el elemento audio.
                          </audio>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="d-flex justify-content-end">
                <NuxtLink to="/invitations" class="btn btn-secondary me-2">Cancelar</NuxtLink>
                <button type="submit" class="btn btn-primary" :disabled="loading || musicLoading">
                  <span v-if="loading || musicLoading" class="spinner-border spinner-border-sm me-2"></span>
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
import { ref, onMounted, computed, watch } from 'vue'
import { useInvitations } from '~/composables/useInvitations'
import { useWeddingIcons } from '~/composables/useWeddingIcons'
import { useMusic } from '~/composables/useMusic'
import type { MusicTrack } from '~/types/invitation'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const router = useRouter()
const route = useRoute()
const { $supabase } = useNuxtApp()
const { user } = useAuth()
const { templates, loadTemplates, createInvitation, updateInvitation } = useInvitations()
const { predefinedIcons } = useWeddingIcons()
const { 
  musicTracks, 
  loadMusicTracks, 
  uploadCustomMusic, 
  validateAudioFile, 
  formatDuration,
  deleteCustomMusic,
  loading: musicLoading 
} = useMusic()

const isEditMode = computed(() => !!route.query.edit)
const invitationId = computed(() => route.query.edit as string)

const form = ref({
  template_id: '',
  music_id: '',
  groom_name: '',
  groom_description: '',
  bride_name: '',
  bride_description: '',
  event_date: '',
  venue: '',
  description: '',
  whatsapp_number: '',
  google_maps_url: '',
  story: [] as { id: string; title: string; date: string; description: string; image: string }[],
  wedding_timeline: [] as { id: string; title: string; time: string; description: string; icon: string }[],
  photo_url: '',
  // Colores personalizados con valores por defecto de la plantilla original
  primary_color: '#fd5d5d',
  secondary_color: '#BBBD98',
  background_color: '#ffffff',
  text_color: '#2F2F2F'
})

const loading = ref(false)

// Computed properties para música
const predefinedMusic = computed(() => {
  return musicTracks.value.filter(track => track.type === 'predefined')
})

const customMusic = computed(() => {
  return musicTracks.value.filter(track => track.type === 'custom')
})

const selectedMusic = computed(() => {
  if (!form.value.music_id) return null
  return musicTracks.value.find(track => track.id === form.value.music_id)
})

// Watcher para detectar cambios en la música seleccionada
watch(selectedMusic, (newMusic, oldMusic) => {
  if (newMusic?.id !== oldMusic?.id) {
    console.log('Música cambiada de:', oldMusic?.name, 'a:', newMusic?.name)
    resetAudioPlayer()
  }
})

const parseJsonField = (field: any, defaultValue: any) => {
  if (!field) return defaultValue
  if (typeof field === 'object') return field
  if (typeof field === 'string') {
    try {
      return JSON.parse(field)
    } catch (error) {
      console.warn('Error parsing JSON field:', error)
      return defaultValue
    }
  }
  return defaultValue
}

onMounted(async () => {
  console.log('Iniciando carga de datos...')
  await Promise.all([
    loadTemplates(),
    loadMusicTracks()
  ])
  
  console.log('Música cargada:', musicTracks.value)
  console.log('Música predefinida:', predefinedMusic.value)
  console.log('Música personalizada:', customMusic.value)
  
  if (isEditMode.value && invitationId.value) {
    try {
      const { data: allData, error: checkError } = await $supabase
        .from('invitations')
        .select(`
          *,
          music:music_tracks(*)
        `)
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
        music_id: data.music_id || '',
        groom_name: data.groom_name || '',
        bride_name: data.bride_name || '',
        groom_description: data.groom_description || '',
        bride_description: data.bride_description || '',
        event_date: data.event_date ? new Date(data.event_date).toISOString().slice(0, 16) : '',
        venue: data.venue || '',
        description: data.description || '',
        whatsapp_number: data.whatsapp_number || '',
        google_maps_url: data.google_maps_url || '',
        photo_url: data.photo_url || '',
        story: parseJsonField(data.story, []),
        wedding_timeline: parseJsonField(data.wedding_timeline, []),
        primary_color: data.primary_color || '#007bff',
        secondary_color: data.secondary_color || '#6c757d',
        background_color: data.background_color || '#ffffff',
        text_color: data.text_color || '#212529'
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

const addStoryEvent = () => {
  form.value.story.push({
    id: Date.now().toString(),
    title: '',
    date: '',
    description: '',
    image: ''
  })
}

const removeStoryEvent = (index: number) => {
  form.value.story.splice(index, 1)
}

const handleStoryImageUpload = async (e: Event, index: number) => {
  const target = e.target as HTMLInputElement
  if (!target.files || !target.files[0]) return
  const file = target.files[0]
  loading.value = true
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `story-event-${Date.now()}-${index}.${fileExt}`
    const { data, error } = await $supabase.storage
      .from('invitations')
      .upload(fileName, file, { upsert: true })
    if (error) throw error
    
    const { data: publicUrlData } = $supabase.storage
      .from('invitations')
      .getPublicUrl(fileName)
    form.value.story[index].image = publicUrlData.publicUrl
  } catch (error) {
    alert('Error subiendo la imagen: ' + error)
  } finally {
    loading.value = false
  }
}

const addTimelineEvent = () => {
  form.value.wedding_timeline.push({
    id: Date.now().toString(),
    title: '',
    time: '',
    description: '',
    icon: 'fas fa-calendar'
  })
}

const removeTimelineEvent = (index: number) => {
  form.value.wedding_timeline.splice(index, 1)
}

// Funciones para manejar música
const selectNoMusic = () => {
  console.log('Seleccionando: Sin música')
  form.value.music_id = ''
  resetAudioPlayer()
}

const selectMusic = (music: MusicTrack) => {
  console.log('Seleccionando música:', music)
  form.value.music_id = music.id
  console.log('music_id actualizado a:', form.value.music_id)
  resetAudioPlayer()
}

// Función para reiniciar el reproductor de audio
const resetAudioPlayer = () => {
  // Forzar re-renderizado del componente de audio
  nextTick(() => {
    setTimeout(() => {
      const audioElement = document.querySelector('audio') as HTMLAudioElement
      if (audioElement) {
        audioElement.pause()
        audioElement.currentTime = 0
        audioElement.load() // Recargar el audio con la nueva fuente
        console.log('Reproductor de audio reiniciado')
      }
    }, 100) // Pequeño delay para asegurar que el DOM se actualice
  })
}

const onMusicFileChange = async (e: Event) => {
  const target = e.target as HTMLInputElement
  if (!target.files || !target.files[0]) return
  
  const file = target.files[0]
  
  // Validar archivo
  const validation = validateAudioFile(file)
  if (!validation.valid) {
    alert(validation.error)
    target.value = ''
    return
  }
  
  try {
    const result = await uploadCustomMusic(file)
    if (result) {
      form.value.music_id = result.id
      resetAudioPlayer()
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
    alert('Error subiendo la música: ' + errorMessage)
    target.value = ''
  }
}

const handleDeleteCustomMusic = async (musicId: string) => {
  if (confirm('¿Estás seguro de que quieres eliminar esta música personalizada?')) {
    const success = await deleteCustomMusic(musicId)
    if (success) {
      // Si la música eliminada era la seleccionada, deseleccionar
      if (form.value.music_id === musicId) {
        form.value.music_id = ''
      }
    } else {
      alert('Error eliminando la música personalizada')
    }
  }
}

const handleSubmit = async () => {
  loading.value = true
  try {
    let result
    
    if (isEditMode.value && invitationId.value) {
      const formData = {
        ...form.value,
        event_date: form.value.event_date ? new Date(form.value.event_date).toISOString() : undefined,
        story: JSON.stringify(form.value.story),
        wedding_timeline: JSON.stringify(form.value.wedding_timeline)
      }
      
      result = await updateInvitation(invitationId.value, formData)
      
      if (result) {
        alert('Invitación actualizada exitosamente')
      } else {
        throw new Error('Error actualizando la invitación')
      }
    } else {
      const formData = {
        ...form.value,
        event_date: form.value.event_date ? new Date(form.value.event_date).toISOString() : undefined,
        story: JSON.stringify(form.value.story),
        wedding_timeline: JSON.stringify(form.value.wedding_timeline)
      }
      result = await createInvitation(formData)
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

// Funciones para personalización de colores
const colorPalettes = [
  {
    name: 'Original',
    description: 'Colores originales de la plantilla',
    colors: {
      primary: '#fd5d5d',
      secondary: '#BBBD98',
      background: '#ffffff',
      text: '#2F2F2F'
    }
  },
  {
    name: 'Azul Claro',
    description: 'Paleta suave en tonos azules',
    colors: {
      primary: '#007bff',
      secondary: '#6c757d',
      background: '#ffffff',
      text: '#212529'
    }
  },
  {
    name: 'Verde Naturaleza',
    description: 'Tonos verdes y tierra',
    colors: {
      primary: '#28a745',
      secondary: '#6f42c1',
      background: '#f8f9fa',
      text: '#495057'
    }
  },
  {
    name: 'Rosa Romántico',
    description: 'Paleta romántica en rosas',
    colors: {
      primary: '#e83e8c',
      secondary: '#fd7e14',
      background: '#fff5f5',
      text: '#6f42c1'
    }
  },
  {
    name: 'Oro Elegante',
    description: 'Tonos dorados y elegantes',
    colors: {
      primary: '#ffc107',
      secondary: '#fd7e14',
      background: '#fff8e1',
      text: '#8d6e63'
    }
  }
]

const selectedPalette = ref('Azul Claro')

const applyColorPalette = (palette: any) => {
  form.value.primary_color = palette.colors.primary
  form.value.secondary_color = palette.colors.secondary
  form.value.background_color = palette.colors.background
  form.value.text_color = palette.colors.text
  selectedPalette.value = palette.name
}

const resetColors = () => {
  form.value.primary_color = '#fd5d5d'
  form.value.secondary_color = '#BBBD98'
  form.value.background_color = '#ffffff'
  form.value.text_color = '#2F2F2F'
}
</script> 

<style scoped>
/* Estilos para los collapsibles */
[data-bs-toggle="collapse"] {
  transition: all 0.3s ease;
}

[data-bs-toggle="collapse"]:hover {
  background-color: rgba(0, 123, 255, 0.05);
  border-radius: 8px;
  padding: 8px 12px;
  margin: -8px -12px;
}

[data-bs-toggle="collapse"][aria-expanded="true"] .fa-chevron-down {
  transform: rotate(180deg);
}

.fa-chevron-down {
  transition: transform 0.3s ease;
}

/* Animación para el contenido del collapse */
.collapse {
  transition: all 0.3s ease;
}

.collapse.show {
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mejoras para las tarjetas de música */
.cursor-pointer {
  cursor: pointer;
  transition: all 0.2s ease;
}

.cursor-pointer:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Estilos para botones de acción */
.btn-outline-primary:hover {
  transform: scale(1.05);
}

/* Responsive para móviles */
@media (max-width: 768px) {
  [data-bs-toggle="collapse"] {
    padding: 6px 8px;
    margin: -6px -8px;
  }
  
  .fa-chevron-down {
    font-size: 0.8rem;
  }
}

/* Estilos para personalización de colores */
.color-preview {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.color-preview:hover {
  transform: scale(1.1);
}

.form-control-color {
  border: 2px solid #dee2e6;
  border-radius: 6px;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.form-control-color:hover {
  border-color: #007bff;
}

.form-control-color:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

/* Vista previa de colores */
.color-preview-card {
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.color-preview-card:hover {
  border-color: #007bff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Paletas de colores */
.palette-card {
  transition: all 0.2s ease;
}

.palette-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.palette-card.border-primary {
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}
</style> 