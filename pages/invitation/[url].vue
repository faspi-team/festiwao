<template>
  <div class="d-flex justify-content-center align-items-center" style="height: 100vh;" v-if="loading">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-if="invitation" :style="invitationStyles">
    <!-- music player -->
    <div v-if="invitation.music && invitation.music.url" class="music-player-container">
      <div class="music-player">
        <div class="music-controls">
          <button @click="toggleMusic" class="btn btn-sm rounded-circle me-2"
            :style="{ backgroundColor: primaryColor, borderColor: primaryColor }"
            :title="isPlaying ? 'Pausar música' : 'Reproducir música'">
            <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
          </button>
          <div class="music-info">
            <small class="d-block" :style="{ color: textColor }">{{ invitation.music.name
              }}</small>
          </div>
          <button @click="toggleMute" class="btn btn-outline-secondary btn-sm rounded-circle ms-2"
            :title="isMuted ? 'Activar sonido' : 'Silenciar'">
            <i :class="isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'"></i>
          </button>
        </div>
        <audio ref="audioPlayer" :src="invitation.music.url" loop preload="metadata" @loadeddata="onAudioLoaded"
          @play="isPlaying = true" @pause="isPlaying = false" @ended="isPlaying = false" @error="onAudioError" />
      </div>
    </div>

    <!-- Navbar start -->
    <div class="container-fluid sticky-top px-0">
      <div class="container-fluid">
        <div class="container px-0">
          <nav class="navbar navbar-light navbar-expand-xl px-md-0" id="navBar">
            <button class="navbar-toggler py-2 px-3" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse">
              <span class="fa fa-bars text-primary"></span>
            </button>
            <div class="collapse navbar-collapse py-3" id="navbarCollapse">
              <div class="navbar-nav me-auto border-top">
                <a href="#weddingHome" class="nav-item nav-link active">Inicio</a>
                <a href="#weddingAbout" class="nav-item nav-link">Sobre nosotros</a>
                <a href="#weddingStory" class="nav-item nav-link">Nuestra historia</a>
                <a href="#weddingTimeline" class="nav-item nav-link">Detalles del evento</a>
                <a href="#weddingGallery" class="nav-item nav-link">Galeria</a>
                <a :href="whatsappUrl" target="_blank" class="nav-item nav-link"><i class="fab fa-whatsapp"></i>
                  Confirmar asistencia</a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
    <!-- Navbar End -->

    <div class="container-fluid carousel-header px-0">
      <div id="carouselId" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner" role="listbox">
          <div class="carousel-item active">
            <img src="/assets/layouts/classic/img/carousel-1.jpg" class="img-fluid" alt="Image">
            <div class="carousel-caption">
              <div class="p-3 mx-auto animated zoomIn" style="max-width: 900px;">
                <div class="d-inline-block border-end-0 border-start-0 border-secondary p-2 mb-4"
                  style="border-style: double;">
                  <h4 class="text-white text-uppercase fw-bold mb-0" style="letter-spacing: 3px;">Nos casamos</h4>
                </div>
                <h1 class="display-1 text-capitalize text-white mb-3">{{ invitation.bride_name }} <i class="fa fa-heart"
                    :style="{ color: '#fd5d5d' }"></i> {{ invitation.groom_name }}</h1>
                <div class="d-inline-block border-end-0 border-start-0 border-secondary p-2 mb-5"
                  style="border-style: double;">
                  <h4 class="text-white text-uppercase fw-bold mb-0" style="letter-spacing: 3px;"> {{
                    formatDate(invitation.event_date) }}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-fluid position-relative py-5" id="weddingAbout">
      <div class="position-absolute" style="top: -35px; right: 0;">
        <img src="/assets/layouts/classic/img/tamp-bg-1.png" class="img-fluid" alt="">
      </div>
      <div class="position-absolute" style="top: -10px; left: 0; transform: rotate(150deg);">
        <img src="/assets/layouts/classic/img/tamp-bg-1.png" class="img-fluid" alt="">
      </div>
      <div class="container position-relative py-5">
        <div class="mx-auto text-center mb-5 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 800;">
          <h1 class="display-1" :style="{ color: primaryColor }">Hola!</h1>
          <h4 class="mb-0" :style="{ color: textColor }">Te invitamos a celebrar nuestra boda
          </h4>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="row g-4 align-items-center">
              <div class="col-lg-5 wow fadeInUp" data-wow-delay="0.3s">
                <div class="d-flex">
                  <div class="text-end my-auto pe-4">
                    <h3 class="mb-3" :style="{ color: primaryColor }">{{ invitation.bride_name }}</h3>
                    <p class="mb-0" :style="{ color: textColor, lineHeight: '30px' }">{{
                      invitation.bride_description }}</p>
                  </div>
                  <img src="/assets/layouts/classic/img/bride.jpg" class="img-fluid img-border" alt="">
                </div>
              </div>
              <div class="col-lg-2 wow fadeIn" data-wow-delay="0.5s">
                <div class="d-flex align-items-center justify-content-center">
                  <i class="fa fa-heart fa-5x" :style="{ color: primaryColor }"></i>
                </div>
              </div>
              <div class="col-lg-5 wow fadeInUp" data-wow-delay="0.3s">
                <div class="d-flex">
                  <img src="/assets/layouts/classic/img/Groom.jpg" class="img-fluid img-border" alt="">
                  <div class="my-auto ps-4">
                    <h3 class="mb-3" :style="{ color: primaryColor }">{{ invitation.groom_name }}</h3>
                    <p class="mb-0" :style="{ color: textColor, lineHeight: '30px' }">{{
                      invitation.groom_description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Story Start -->
    <div v-if="storyEvents && storyEvents.length > 0" class="container-fluid story position-relative py-5"
      id="weddingStory">
      <div class="position-absolute" style="top: -35px; right: 0;">
        <img src="/assets/layouts/classic/img/tamp-bg-1.png" class="img-fluid" alt="">
      </div>
      <div class="position-absolute" style="top: -15px; left: 0; transform: rotate(150deg);">
        <img src="/assets/layouts/classic/img/tamp-bg-1.png" class="img-fluid" alt="">
      </div>
      <div class="container position-relative py-5">
        <div class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
          <h5 class="text-uppercase fw-bold mb-4" :style="{ color: primaryColor }">Story</h5>
          <h1 class="display-4" :style="{ color: textColor }">Nuestra historia de amor</h1>
        </div>
        <div class="story-timeline">
          <div v-for="(event, index) in storyEvents" :key="event.id" class="row wow fadeInUp"
            :class="{ 'flex-column-reverse flex-md-row': index % 2 === 1 }" :data-wow-delay="`${0.4 + index * 0.1}s`">
            <div v-if="index % 2 === 0" class="col-md-6 text-end border-0 border-top border-end border-secondary p-4">
              <div class="d-inline-flex align-items-center h-100">
                <img :src="event.image || '/assets/layouts/classic/img/story-4.jpg'" class="img-fluid w-100 img-border"
                  :alt="event.title">
              </div>
            </div>
            <div class="col-md-6 border-top border-secondary p-4"
              :class="index % 2 === 0 ? 'border-start pe-0' : 'text-end border-end ps-0'">
              <div class="h-100 d-flex flex-column justify-content-center bg-secondary p-4">
                <h4 class="mb-2" :style="{ color: invitation.text_color || '#2F2F2F' }">{{ event.title }}</h4>
                <p class="text-uppercase mb-2" :style="{ color: primaryColor, letterSpacing: '3px' }">
                  {{ formatStoryDate(event.date) }}
                </p>
                <p class="m-0 fs-5" :style="{ color: invitation.text_color || '#2F2F2F' }">{{ event.description }}</p>
              </div>
            </div>
            <div v-if="index % 2 === 1" class="col-md-6 border-start border-top border-secondary p-4">
              <div class="d-inline-flex align-items-center h-100">
                <img :src="event.image || '/assets/layouts/classic/img/story-4.jpg'" class="img-fluid w-100 img-border"
                  :alt="event.title">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Story End -->

    <!--- Wedding Date -->
    <div class="container-fluid wedding-date-bg position-relative py-5">
      <div class="position-absolute" style="top: -100px; right: 0;">
        <img src="/assets/layouts/classic/img/tamp-bg-1.png" class="img-fluid" alt="">
      </div>
      <div class="position-absolute" style="top: -80px; left: 0; transform: rotate(150deg);">
        <img src="/assets/layouts/classic/img/tamp-bg-1.png" class="img-fluid" alt="">
      </div>
      <div class="container py-5 wow zoomIn" data-wow-delay="0.1s">
        <div class="wedding-date text-center bg-light p-5"
          style="border-style: double !important; border: 15px solid rgba(253, 93, 93, 0.5);">
          <div class="wedding-date-content">
            <div class="d-inline-block border-end-0 border-start-0 border-secondary p-2 mb-4"
              style="border-style: double;">
              <h4 class="text-uppercase fw-bold mb-0"
                :style="{ color: invitation.text_color || '#2F2F2F', letterSpacing: '3px' }">{{
                  formatDate(invitation.event_date) }}</h4>
            </div>
            <h1 class="display-4" :style="{ color: invitation.text_color || '#2F2F2F' }">Nos casamos</h1>
            <p class="fs-5" :style="{ color: invitation.text_color || '#2F2F2F' }">{{ invitation.venue }}</p>
            <div class="d-flex align-items-center justify-content-center mb-5">
              <div class="fs-2 me-4" :style="{ color: invitation.text_color || '#2F2F2F' }">
                <div>{{ countdown.days }}</div>
                <span>Días</span>
              </div>
              <div class="fs-2 me-4" :style="{ color: invitation.text_color || '#2F2F2F' }">
                <div>{{ countdown.hours }}</div>
                <span>Horas</span>
              </div>
              <div class="fs-2 me-4" :style="{ color: invitation.text_color || '#2F2F2F' }">
                <div>{{ countdown.minutes }}</div>
                <span>Mins</span>
              </div>
              <div class="fs-2 me-0" :style="{ color: invitation.text_color || '#2F2F2F' }">
                <div>{{ countdown.seconds }}</div>
                <span>Secs</span>
              </div>
            </div>
          </div>
          <div class="position-absolute"
            style="top: 15%; right: -30px; transform: rotate(320deg); opacity: 0.5; z-index: 1;">
            <img src="/assets/layouts/classic/img/attendance-bg.png" class="img-fluid" alt="">
          </div>
          <div class="position-absolute"
            style="top: 15%; left: -10px; transform: rotate(-320deg); opacity: 0.5; z-index: 1;">
            <img src="/assets/layouts/classic/img/attendance-bg.png" class="img-fluid" alt="">
          </div>
        </div>
      </div>
    </div>
    <!-- Wedding Date -->

    <!-- Wedding Timeline start -->
    <div class="container-fluid wedding-timeline bg-secondary position-relative overflow-hidden py-5"
      id="weddingTimeline">
      <div class="position-absolute" style="top: 50%; left: -100px; transform: translateY(-50%); opacity: 0.5;">
        <img src="/assets/layouts/classic/img/wedding-bg.png" class="img-fluid" alt="">
      </div>
      <div class="position-absolute"
        style="top: 50%; right: -160px; transform: translateY(-50%); opacity: 0.5; rotate: 335deg;">
        <img src="/assets/layouts/classic/img/wedding-bg.png" class="img-fluid" alt="">
      </div>
      <div class="container py-5">
        <div class="text-center mb-5">
          <h1 class="display-4 text-white">Planificación de la boda</h1>
        </div>
        <div class="position-relative wedding-content">
          <div v-if="weddingTimeline.length > 0" class="row g-4 justify-content-center">
            <div v-for="(event, index) in weddingTimeline" :key="event.id" class="col-6 col-md-4 col-lg-3">
              <div class="border rounded p-3 h-100 text-center wow fadeIn" :data-wow-delay="`${0.1 + index * 0.2}s`">
                <div class="mb-4 p-3 d-inline-flex">
                  <i :class="`${event.icon || 'fas fa-calendar'} fa-3x`" :style="{ color: primaryColor }"></i>
                </div>
                <p :style="{ color: primaryColor }">{{ event.time }}</p>
                <h3 :style="{ color: textColor }">{{ event.title }}</h3>
                <p :style="{ color: textColor }">{{ event.description }}</p>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-5">
            <div class="mb-4">
              <i class="fas fa-calendar text-primary fa-4x"></i>
            </div>
            <h3 class="text-white">Planificación de la boda próximamente</h3>
            <p class="text-white-50">Los detalles del cronograma se publicarán pronto</p>
          </div>
          <div class="position-absolute heart-circle " style="bottom: 0; left: -18px;">
            <div class="border border-2 border-primary rounded-circle p-1 bg-secondary"></div>
          </div>
          <div class="position-absolute heart-circle" style="top: 18px; right: -17px;">
            <div class="border border-2 border-primary rounded-circle p-1 bg-secondary"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- Wedding Timeline End -->

    <!-- Gallery Start -->
    <div class="container-fluid gallery position-relative py-5" id="weddingGallery">
      <div class="position-absolute" style="top: -95px; right: 0;">
        <img src="/assets/layouts/classic/img/tamp-bg-1.png" class="img-fluid" alt="">
      </div>
      <div class="position-absolute" style="top: -80px; left: 0; transform: rotate(150deg);">
        <img src="/assets/layouts/classic/img/tamp-bg-1.png" class="img-fluid" alt="">
      </div>
      <div class="container position-relative py-5">
        <div class="text-center mx-auto pb-5 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 800px;">
          <h1 class="display-2 text-dark">Galería de Fotos</h1>
        </div>
        <div class="row g-4">
          <template v-if="galleryPhotos.length > 0">
            <div v-for="(photo, index) in galleryPhotos" :key="photo.id" class="col-md-6 col-lg-4 col-xl-3 wow fadeInUp"
              :data-wow-delay="`${0.2 + (index * 0.2)}s`">
              <div class="gallery-item">
                <div class="gallery-img">
                  <img class="img-fluid w-100" :src="photo.image_url" :alt="photo.title || 'Foto de la galería'">
                  <div class="hover-style"></div>
                  <div class="search-icon">
                    <a :href="photo.image_url" :data-lightbox="`Gallery-${photo.id}`" class="my-auto">
                      <i class="fas fa-plus btn-primary btn-primary-outline-0 p-3"></i>
                    </a>
                  </div>
                </div>
                <div class="gallery-overlay bg-light border-secondary border-top-0 p-4" style="border-style: double;">
                  <h5>{{ photo.title || 'Foto de la boda' }}</h5>
                  <p class="text-dark mb-0">{{ photo.description || formatDate(invitation.event_date) }}</p>
                </div>
              </div>
            </div>
          </template>
          <!-- Mensaje cuando no hay fotos -->
          <template v-else>
            <div class="col-12 text-center">
              <div class="py-5">
                <i class="fas fa-images fa-3x mb-3" :style="{ color: primaryColor }"></i>
                <h4 class="mb-3" :style="{ color: textColor }">Galería de Fotos</h4>
                <p class="text-muted">Las fotos de nuestra boda aparecerán aquí pronto.</p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- Gallery end -->

    <!-- Confirmación Start -->
    <div class="container-fluid position-relative py-5" id="confirmation" v-if="invitation.whatsapp_number">
      <div class="position-absolute" style="top: -35px; right: 0;">
        <img src="/assets/layouts/classic/img/tamp-bg-1.png" class="img-fluid" alt="">
      </div>
      <div class="position-absolute" style="top: -10px; left: 0; transform: rotate(150deg);">
        <img src="/assets/layouts/classic/img/tamp-bg-1.png" class="img-fluid" alt="">
      </div>
      <div class="container position-relative py-5">
        <div class="mx-auto text-center mb-5 wow fadeInUp" data-wow-delay="0.1s" style="max-width: 800px;">
          <h1 class="display-1" :style="{ color: primaryColor }">¡Confirma tu asistencia!</h1>
          <h4 class="mb-4" :style="{ color: textColor }">Nos encantaría que nos acompañes en
            nuestro día especial</h4>
          <p class="lead mb-5" :style="{ color: textColor }">
            Haz clic en el botón de abajo para confirmar tu asistencia a través de WhatsApp
          </p>
          <div class="d-flex justify-content-center">
            <a :href="whatsappUrl" target="_blank" class="btn btn-md px-5 py-3 text-white fw-bold" :style="{
              backgroundColor: primaryColor,
              borderColor: primaryColor
            }" style="border-radius: 50px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">
              <i class="fab fa-whatsapp me-3"></i>
              Confirmar Asistencia
            </a>
          </div>

          <div class="mt-4">
            <small class="text-muted">
              <i class="fas fa-info-circle me-1"></i>
              Se abrirá WhatsApp con un mensaje predefinido
            </small>
          </div>
        </div>
      </div>
    </div>
    <!-- Confirmación End -->
  </div>

</template>

<style scoped>
.music-player-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 2000;
  animation: fadeInRight 1s ease-out 2s both;
}

.music-player {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 6px 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-width: 280px;
}

.music-controls {
  display: flex;
  align-items: center;
}

.music-info {
  flex: 1;
  min-width: 0;
}

.music-info small {
  font-size: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  line-height: 1.2;
}

.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  transform: scale(1.05);
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Responsive para móviles */
@media (max-width: 1200px) {
  .music-player-container {
    top: 10px;
    border: 0px;
  }

  .music-player {
    padding: 5px 5px;
  }

  .music-info small {
    font-size: 0.7rem;
  }
}

.music-controls button {
  cursor: pointer;
}

.music-player {
  user-select: none;
}

:root {
  --primary-color: #fd5d5d;
  --secondary-color: #BBBD98;
  --background-color: #ffffff;
  --text-color: #2F2F2F;
}

.text-primary {
  color: var(--primary-color) !important;
}

.bg-primary {
  background-color: var(--primary-color) !important;
}

.text-secondary {
  color: var(--secondary-color) !important;
}

.bg-secondary {
  background-color: var(--secondary-color) !important;
}

/* Estilos para elementos con colores personalizados */
.custom-primary {
  color: var(--primary-color);
}

.custom-secondary {
  color: var(--secondary-color);
}

.custom-background {
  background-color: var(--background-color);
}

.custom-text {
  color: var(--text-color);
}

/* Animación para el estado de carga */
@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.music-info small:first-of-type {
  animation: pulse 2s infinite;
}

.text-warning {
  color: #ffc107 !important;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3) !important;
  transition: all 0.3s ease;
}

@keyframes whatsappPulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}

.btn[href*="wa.me"] {
  animation: whatsappPulse 2s infinite;
}

.btn[href*="wa.me"]:hover {
  animation: none;
}
</style>

<script setup lang="ts">

import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const route = useRoute()
const { getInvitationByUrl, formatDate } = useInvitations()

definePageMeta({
  layout: 'classic'
})

const invitation = ref<any>(null)
const loading = ref(true)

const audioPlayer = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const isMuted = ref(false)
const audioLoaded = ref(false)
const autoplayBlocked = ref(false)

const storyEvents = computed(() => {
  if (!invitation.value?.story) return []
  try {
    return typeof invitation.value.story === 'string'
      ? JSON.parse(invitation.value.story)
      : invitation.value.story
  } catch (error) {
    console.error('Error parsing story:', error)
    return []
  }
})

const weddingTimeline = computed(() => {
  if (!invitation.value?.wedding_timeline) return []
  try {
    return typeof invitation.value.wedding_timeline === 'string'
      ? JSON.parse(invitation.value.wedding_timeline)
      : invitation.value.wedding_timeline
  } catch (error) {
    console.error('Error parsing wedding timeline:', error)
    return []
  }
})

const galleryPhotos = computed(() => {
  if (!invitation.value?.gallery_photos) return []
  return invitation.value.gallery_photos
})

const whatsappUrl = computed(() => {
  if (!invitation.value?.whatsapp_number) return ''

  const cleanNumber = invitation.value.whatsapp_number.replace(/[\s\-\(\)]/g, '')

  const numberWithCountry = cleanNumber.startsWith('+') ? cleanNumber : `+${cleanNumber}`

  const message = encodeURIComponent(
    `¡Hola! Confirmo mi asistencia. Encantado de asistir a su boda. ¡Gracias por invitarme!`
  )

  return `https://wa.me/${numberWithCountry}?text=${message}`
})

// helper colors
const primaryColor = computed(() => invitation.value?.primary_color || '#fd5d5d')
const secondaryColor = computed(() => invitation.value?.secondary_color || '#BBBD98')
const backgroundColor = computed(() => invitation.value?.background_color || '#ffffff')
const textColor = computed(() => invitation.value?.text_color || '#2F2F2F')

const countdown = ref({
  days: '00',
  hours: '00',
  minutes: '00',
  seconds: '00'
})

const formatStoryDate = (dateString: string): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).toUpperCase()
}

function updateCountdown() {
  if (!invitation.value?.event_date) return
  const eventDate = new Date(invitation.value.event_date)
  const now = new Date()
  const diff = eventDate.getTime() - now.getTime()

  if (diff <= 0) {
    countdown.value = { days: '00', hours: '00', minutes: '00', seconds: '00' }
    return
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)

  countdown.value = {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0')
  }
}

let interval: any

onMounted(() => {
  updateCountdown()
  interval = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
  // Pausar música cuando se desmonta el componente
  if (audioPlayer.value) {
    audioPlayer.value.pause()
  }
})

// functions for music player
const toggleMusic = () => {
  if (!audioPlayer.value || !audioLoaded.value) return

  if (isPlaying.value) {
    audioPlayer.value.pause()
  } else {
    audioPlayer.value.play().catch(error => {
      console.log('Reproducción manual iniciada por el usuario')
    })
  }
}

const toggleMute = () => {
  if (!audioPlayer.value) return

  isMuted.value = !isMuted.value
  audioPlayer.value.muted = isMuted.value
}

const onAudioLoaded = () => {
  audioLoaded.value = true
  if (audioPlayer.value) {
    audioPlayer.value.volume = 0.5

    setTimeout(() => {
      if (audioPlayer.value && audioLoaded.value) {
        audioPlayer.value.play().then(() => {
          console.log('Autoplay exitoso')
          autoplayBlocked.value = false
        }).catch(error => {
          console.log('Autoplay bloqueado por el navegador - el usuario puede reproducir manualmente')
          autoplayBlocked.value = true
        })
      }
    }, 2000)
  }
}

const onAudioError = (event: Event) => {
  const audioElement = event.target as HTMLAudioElement
  console.error('Error de reproducción de audio:', audioElement.error)
  audioLoaded.value = false
  isPlaying.value = false
}

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

// Estilos dinámicos para la invitación
const invitationStyles = computed(() => {
  if (!invitation.value) return {}

  return {
    '--primary-color': invitation.value.primary_color || '#fd5d5d',
    '--secondary-color': invitation.value.secondary_color || '#BBBD98',
    '--background-color': invitation.value.background_color || '#ffffff',
    '--text-color': invitation.value.text_color || '#2F2F2F'
  }
})
</script>