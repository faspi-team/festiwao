<template>
  <div class="d-flex justify-content-center align-items-center" style="height: 100vh;" v-if="loading">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  <div v-if="invitation">    
    <div class="container-fluid carousel-header px-0">
    <div id="carouselId" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner" role="listbox">
            <div class="carousel-item active">
                <img src="/assets/layouts/classic/img/carousel-1.jpg" class="img-fluid" alt="Image">
                <div class="carousel-caption">
                    <div class="p-3 mx-auto animated zoomIn" style="max-width: 900px;">
                        <div class="d-inline-block border-end-0 border-start-0 border-secondary p-2 mb-4" style="border-style: double;">
                            <h4 class="text-white text-uppercase fw-bold mb-0" style="letter-spacing: 3px;">Nos casamos</h4>
                        </div>
                        <h1 class="display-1 text-capitalize text-white mb-3">{{ invitation.bride_name }} <i class="fa fa-heart text-primary"></i> {{ invitation.groom_name }}</h1>
                        <div class="d-inline-block border-end-0 border-start-0 border-secondary p-2 mb-5" style="border-style: double;">
                            <h4 class="text-white text-uppercase fw-bold mb-0" style="letter-spacing: 3px;"> {{ formatDate(invitation.event_date) }}</h4>
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
        <h1 class="text-primary display-1">Hola!</h1>
        <h4 class="text-dark mb-0">Te invitamos a celebrar nuestra boda</h4>
      </div>
      <div class="row">
        <div class="col-lg-12">
            <div class="row g-4 align-items-center">
                <div class="col-lg-5 wow fadeInUp" data-wow-delay="0.3s">
                    <div class="d-flex">
                        <div class="text-end my-auto pe-4">
                            <h3 class="text-primary mb-3">{{ invitation.bride_name }}</h3>
                            <p class="text-dark mb-0" style="line-height: 30px;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                            </p>
                        </div>
                        <img src="/assets/layouts/classic/img/bride.jpg" class="img-fluid img-border" alt="">
                    </div>
                </div>
                <div class="col-lg-2 wow fadeIn" data-wow-delay="0.5s">
                    <div class="d-flex align-items-center justify-content-center">
                        <i class="fa fa-heart fa-5x text-primary"></i>
                    </div>
                </div>
                <div class="col-lg-5 wow fadeInUp" data-wow-delay="0.3s">
                    <div class="d-flex">
                        <img src="/assets/layouts/classic/img/Groom.jpg" class="img-fluid img-border" alt="">
                        <div class="my-auto ps-4">
                            <h3 class="text-primary mb-3">{{ invitation.groom_name }}</h3>
                            <p class="text-dark mb-0" style="line-height: 30px;">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Story Start -->
  <div class="container-fluid story position-relative py-5" id="weddingStory">
      <div class="position-absolute" style="top: -35px; right: 0;">
          <img src="/assets/layouts/classic/img/tamp-bg-1.png" class="img-fluid" alt="">
      </div>
      <div class="position-absolute" style="top: -15px; left: 0; transform: rotate(150deg);">
          <img src="/assets/layouts/classic/img/tamp-bg-1.png" class="img-fluid" alt="">
      </div>
      <div class="container position-relative py-5">
          <div class="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">
              <h5 class="text-uppercase text-primary fw-bold mb-4">Story</h5>
              <h1 class="display-4">Nuestra historia de amor</h1>
          </div>
          <div class="story-timeline">
              <div class="row wow fadeInUp" data-wow-delay="0.2s">
                  <div class="col-md-6 text-end border-0 border-top border-end border-secondary p-4">
                      <div class="d-inline-flex align-items-center h-100">
                          <img src="/assets/layouts/classic/img/story-1.jpg" class="img-fluid w-100 img-border" alt="">
                      </div>
                  </div>
                  <div class="col-md-6 border-start border-top border-secondary p-4 pe-0">
                      <div class="h-100 d-flex flex-column justify-content-center bg-secondary p-4">
                          <h4 class="mb-2 text-dark">First Meet</h4>
                          <p class="text-uppercase text-primary mb-2" style="letter-spacing: 3px;">01 Jan 2050</p>
                          <p class="m-0 fs-5">Lorem elitr magna stet rebum dolores sed. Est stet labore est lorem lorem at amet sea, eos tempor rebum, labore amet ipsum sea lorem, stet rebum eirmod amet. Kasd clita kasd stet amet est dolor elitr.</p>
                      </div>
                  </div>
              </div>
              <div class="row flex-column-reverse flex-md-row wow fadeInUp" data-wow-delay="0.3s">
                  <div class="col-md-6 text-end border-end border-top border-secondary p-4 ps-0">
                      <div class="h-100 d-flex flex-column justify-content-center bg-secondary p-4">
                          <h4 class="text-dark mb-2">First Date</h4>
                          <p class="text-uppercase text-primary mb-2" style="letter-spacing: 3px;">01 Jan 2050</p>
                          <p class="m-0 fs-5">Lorem elitr magna stet rebum dolores sed. Est stet labore est lorem lorem at amet sea, eos tempor rebum, labore amet ipsum sea lorem, stet rebum eirmod amet. Kasd clita kasd stet amet est dolor elitr.</p>
                      </div>
                  </div>
                  <div class="col-md-6 border-start border-top border-secondary p-4">
                      <div class="d-inline-flex align-items-center h-100">
                          <img src="/assets/layouts/classic/img/story-2.jpg" class="img-fluid w-100 img-border" alt="">
                      </div>
                  </div>
              </div>
              <div class="row wow fadeInUp" data-wow-delay="0.4s">
                  <div class="col-md-6 text-end border-end border-top border-secondary p-4 ps-0">
                      <div class="d-inline-flex align-items-center h-100">
                          <img src="/assets/layouts/classic/img/story-3.jpg" class="img-fluid w-100 img-border" alt="">
                      </div>
                  </div>
                  <div class="col-md-6 border-start border-top border-secondary p-4 pe-0">
                      <div class="h-100 d-flex flex-column justify-content-center bg-secondary p-4">
                          <h4 class="text-dark mb-2">Proposal</h4>
                          <p class="text-uppercase text-primary mb-2" style="letter-spacing: 3px;">01 Jan 2050</p>
                          <p class="m-0 fs-5">Lorem elitr magna stet rebum dolores sed. Est stet labore est lorem lorem at amet sea, eos tempor rebum, labore amet ipsum sea lorem, stet rebum eirmod amet. Kasd clita kasd stet amet est dolor elitr.</p>
                      </div>
                  </div>
              </div>
              <div class="row flex-column-reverse flex-md-row wow fadeInUp" data-wow-delay="0.5s">
                  <div class="col-md-6 text-end border border-start-0 border-secondary p-4 ps-0">
                      <div class="h-100 d-flex flex-column justify-content-center bg-secondary p-4">
                          <h4 class="text-dark mb-2">Enagagement</h4>
                          <p class="text-uppercase text-primary mb-2" style="letter-spacing: 3px;">01 Jan 2050</p>
                          <p class="m-0 fs-5">Lorem elitr magna stet rebum dolores sed. Est stet labore est lorem lorem at amet sea, eos tempor rebum, labore amet ipsum sea lorem, stet rebum eirmod amet. Kasd clita kasd stet amet est dolor elitr.</p>
                      </div>
                  </div>
                  <div class="col-md-6 border border-end-0 border-secondary p-4">
                      <div class="d-inline-flex align-items-center h-100">
                          <img src="/assets/layouts/classic/img/story-4.jpg" class="img-fluid w-100 img-border" alt="">
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
          <div class="wedding-date text-center bg-light p-5" style="border-style: double !important; border: 15px solid rgba(253, 93, 93, 0.5);">
              <div class="wedding-date-content">
                  <div class="d-inline-block border-end-0 border-start-0 border-secondary p-2 mb-4" style="border-style: double;">
                      <h4 class="text-dark text-uppercase fw-bold mb-0" style="letter-spacing: 3px;">June 28, 2024</h4>
                  </div>
                  <h1 class="display-4">Nos casamos</h1>
                  <p class="text-dark fs-5">{{ invitation.venue }}</p>
                  <div class="d-flex align-items-center justify-content-center mb-5">
                      <div class="text-dark fs-2 me-4">
                          <div>00</div>
                          <span>Days</span>
                      </div>
                      <div class="text-dark fs-2 me-4">
                          <div>00</div>
                          <span>Hours</span>
                      </div>
                      <div class="text-dark fs-2 me-4">
                          <div>00</div>
                          <span>Mins</span>
                      </div>
                      <div class="text-dark fs-2 me-0">
                          <div>00</div>
                          <span>Secs</span>
                      </div>
                  </div>
              </div>
              <div class="position-absolute" style="top: 15%; right: -30px; transform: rotate(320deg); opacity: 0.5; z-index: 1;">
                  <img src="/assets/layouts/classic/img/attendance-bg.png" class="img-fluid" alt="">
              </div>
              <div class="position-absolute" style="top: 15%; left: -10px; transform: rotate(-320deg); opacity: 0.5; z-index: 1;">
                  <img src="/assets/layouts/classic/img/attendance-bg.png" class="img-fluid" alt="">
              </div>
          </div>
      </div>
  </div>
  <!-- Wedding Date -->

  <!-- Wedding Timeline start -->
  <div class="container-fluid wedding-timeline bg-secondary position-relative overflow-hidden py-5" id="weddingTimeline">
      <div class="position-absolute" style="top: 50%; left: -100px; transform: translateY(-50%); opacity: 0.5;">
          <img src="/assets/layouts/classic/img/wedding-bg.png" class="img-fluid" alt="">
      </div>
      <div class="position-absolute" style="top: 50%; right: -160px; transform: translateY(-50%); opacity: 0.5; rotate: 335deg;">
          <img src="/assets/layouts/classic/img/wedding-bg.png" class="img-fluid" alt="">
      </div>
      <div class="container py-5">
          <div class="text-center mb-5">
              <h1 class="display-4 text-white">Planificación de la boda</h1>
          </div>
          <div class="position-relative wedding-content">
              <div class="row g-4">
                  <div class="col-6 col-md-6 col-xl-3 border border-bottom-0">
                      <div class="text-center p-3 wow fadeIn" data-wow-delay="0.1s">
                          <div class="mb-4 p-3 d-inline-flex">
                              <i class="fas fa-menorah text-primary fa-3x"></i>
                          </div>
                          <p class="text-primary">10:00AM - 11:00AM</p>
                          <h3 class="text-dark">Dinner</h3>
                          <p class="text-dark">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy</p>
                      </div>
                  </div>
                  <div class="col-6 col-md-6 col-xl-3 border border-top-0 border-start-0">
                      <div class="text-center p-3 wow fadeIn" data-wow-delay="0.3s">
                          <div class="mb-4 p-3 d-inline-flex">
                              <i class="fas fa-photo-video text-primary fa-3x"></i>
                          </div>
                          <p class="text-primary">10:00AM - 11:00AM</p>
                          <h3 class="text-dark">Photoshoot</h3>
                          <p class="text-dark">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy</p>
                      </div>
                  </div>
                  <div class="col-6 col-md-6 col-xl-3 border border-bottom-0 border-end-0">
                      <div class="text-center p-3 wow fadeIn" data-wow-delay="0.5s">
                          <div class="mb-4 p-3 d-inline-flex">
                              <i class="fas fa-dungeon text-primary fa-3x"></i>
                          </div>
                          <p class="text-primary">10:00AM - 11:00AM</p>
                          <h3 class="text-dark">Reception</h3>
                          <p class="text-dark">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy</p>
                      </div>
                  </div>
                  <div class="col-6 col-md-6 col-xl-3 border border-top-0">
                      <div class="text-center p-3 wow fadeIn" data-wow-delay="0.7s">
                          <div class="mb-4 p-3 d-inline-flex">
                              <i class="fas fa-ring text-primary fa-3x"></i>
                          </div>
                          <p class="text-primary">10:00AM - 11:00AM</p>
                          <h3 class="text-dark">Ceremony</h3>
                          <p class="text-dark">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy</p>
                      </div>
                  </div>
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
  </div>
  
</template>

<script setup lang="ts">

const route = useRoute()
const { getInvitationByUrl, formatDate } = useInvitations()

definePageMeta({
  layout: 'classic'
})

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
</script> 