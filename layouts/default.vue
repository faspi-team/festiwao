<template>
  <div>
    <nav>
      <NuxtLink to="/">Home</NuxtLink>
      <NuxtLink v-if="user" to="/admin">Admin</NuxtLink>
      <NuxtLink v-else to="/login">Login</NuxtLink>
    </nav>
    <slot />
  </div>
</template>

<script setup lang="ts">
  import { useAuth } from '~/composables/useAuth'
  const { user } = useAuth()  
</script> 