<template>
  <div>
    <div class="auth-main">
      <div class="auth-wrapper v3">
        <div class="auth-form">
          <div class="auth-header">
            <NuxtLink to="#"><img src="/assets/images/logo-dark.svg" alt="img"></NuxtLink>
          </div>
          <slot />
          <div class="auth-footer row">
            <div class="col my-1">
              <p class="m-0">Copyright © <NuxtLink to="#">FASPI</NuxtLink></p>
            </div>
            <div class="col-auto my-1">
              <ul class="list-inline footer-link mb-0">
                <li class="list-inline-item"><NuxtLink to="#">Contáctanos</NuxtLink></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  useHead({
    title: 'FestiWao | Iniciar Sesión',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'language', content: 'es' },
      { name: 'lang', content: 'es' },
      { name: 'description', content: 'Sistema de invitaciones de boda - FestiWao' },
      { name: 'keywords', content: 'FestiWao, Invitaciones, Boda, Wedding, Bootstrap 5' },
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
    ]
  })
</script>

<style scoped>
</style>