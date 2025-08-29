<template>
  <div>
    <nav>
      <NuxtLink to="/">Inicio</NuxtLink>
      <NuxtLink v-if="user" to="/admin">Administración</NuxtLink>
      <NuxtLink v-else to="/login">Iniciar Sesión</NuxtLink>
    </nav>
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { useAuth } from '~/composables/useAuth'
  const { user } = useAuth()
  
  useHead({
    title: 'FestiWao - Invitaciones de Boda',
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
      { name: 'author', content: 'FASPI' }
    ]
  })
</script> 