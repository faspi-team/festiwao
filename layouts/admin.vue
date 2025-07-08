<template>
  <nav class="pc-sidebar">
    <div class="navbar-wrapper">
      <div class="m-header">
        <NuxtLink to="/" class="b-brand text-primary">
          <img src="/assets/images/logo-dark.svg" class="img-fluid logo-lg" alt="logo">
        </NuxtLink>
      </div>
      <div class="navbar-content">
        <ul class="pc-navbar">
          <li class="pc-item">
            <NuxtLink to="/admin" class="pc-link">
              <span class="pc-micon"><i class="ti ti-dashboard"></i></span>
              <span class="pc-mtext">Dashboard</span>
            </NuxtLink>
          </li>

          <li class="pc-item">
            <NuxtLink to="/" class="pc-link">
              <span class="pc-micon"><i class="ti ti-play-card"></i></span>
              <span class="pc-mtext">Invitaciones</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <header class="pc-header">
    <div class="header-wrapper">
      <div class="me-auto pc-mob-drp">
        <ul class="list-unstyled">
          <li class="pc-h-item pc-sidebar-collapse">
            <a href="#" class="pc-head-link ms-0" id="sidebar-hide">
              <i class="ti ti-menu-2"></i>
            </a>
          </li>
          <li class="pc-h-item pc-sidebar-popup">
            <a href="#" class="pc-head-link ms-0" id="mobile-collapse">
              <i class="ti ti-menu-2"></i>
            </a>
          </li> 
        </ul>
      </div>
      <div class="ms-auto">
        <ul class="list-unstyled">
          <li class="dropdown pc-h-item header-user-profile">
            <a
              class="pc-head-link dropdown-toggle arrow-none me-0"
              data-bs-toggle="dropdown"
              href="#"
              aria-haspopup="false"
              data-bs-auto-close="outside"
              aria-expanded="false"
            >
              <img src="/assets/images/user/avatar-2.jpg" alt="user-image" class="user-avtar">
              <span>{{ truncate(user?.email, 20) }}</span>
            </a>
            <div class="dropdown-menu dropdown-user-profile dropdown-menu-end pc-h-dropdown">
              <div class="dropdown-header">
                <div class="d-flex mb-1">
                  <div class="flex-shrink-0">
                    <img src="/assets/images/user/avatar-2.jpg" alt="user-image" class="user-avtar wid-35">
                  </div>
                  <div class="flex-grow-1 ms-3">
                    <h6 class="mb-1">{{ user?.name }}</h6>
                    <span>{{ truncate(user?.email, 10) }}</span>
                  </div>
                  <a href="#!" class="pc-head-link bg-transparent"><i class="ti ti-power text-danger"></i></a>
                </div>
              </div>
              <ul class="nav drp-tabs nav-fill nav-tabs" id="mydrpTab" role="tablist">
                <li class="nav-item" role="presentation">
                  <a href="#" class="dropdown-item" @click="clickLogout">
                    <i class="ti ti-power"></i>
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </header>
  <div class="pc-container">
    <div class="pc-content">
      <div class="page-header">
        <div class="page-block">
          <div class="row align-items-center">
            <div class="col-md-12">
              <div class="page-header-title">
                <h5 class="m-b-10">Página de administración</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-sm-12">
          <slot />
        </div>
      </div>
    </div>
  </div>
  <footer class="pc-footer">
    <div class="footer-wrapper container-fluid">
      <div class="row">
        <div class="col-sm my-1">
          <p class="m-0"
            >Generador de Invitaciones. Creado por <a href="https://themewagon.com/">FASPI</a>.</p
          >
        </div>
        <div class="col-auto my-1">
          <ul class="list-inline footer-link mb-0">
            <li class="list-inline-item"><a href="/">Home</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import { useAuth } from '~/composables/useAuth'
  import { navigateTo, useHead, onMounted } from '#imports'
  
  const { logout } = useAuth()

  const clickLogout = () => {
    logout()
    navigateTo('/login')
  }

  useHead({
    title: 'Admin | Dashboard',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'description', content: 'Admin Dashboard' },
      { name: 'author', content: 'FASPI' }
    ],
    link: [
      { rel: 'icon', href: '/favicon.svg', type: 'image/x-icon' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Public+Sans:wght@300;400;500;600;700&display=swap' },
      { rel: 'stylesheet', href: '/assets/fonts/tabler-icons.min.css' },
      { rel: 'stylesheet', href: '/assets/fonts/feather.css' },
      { rel: 'stylesheet', href: '/assets/fonts/fontawesome.css' },
      { rel: 'stylesheet', href: '/assets/fonts/material.css' },
      { rel: 'stylesheet', href: '/assets/css/style.css' },
      { rel: 'stylesheet', href: '/assets/css/style-preset.css' }
    ],
    script: [
      { src: '/assets/js/plugins/popper.min.js' },
      { src: '/assets/js/plugins/simplebar.min.js' },
      { src: '/assets/js/plugins/bootstrap.min.js' },
      { src: '/assets/js/pcoded.js', defer: true },
      { src: '/assets/js/plugins/feather.min.js', defer: true },
    ]
  })

  const { user } = useAuth()

  const truncate = (text: string, length: number = 10) => {
    if (!text) return ''
    return text.length > length ? text.substring(0, length) + '...' : text
  }
</script>

<style scoped>
</style>