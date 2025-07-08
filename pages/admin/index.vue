<template>
    <div>
        <h1>Bienvenido a la app de Invitaciones</h1>
        <p>¡Has iniciado sesión correctamente!</p>
    </div>
</template>
<script setup lang="ts">
  import { definePageMeta } from '#imports'
  
  definePageMeta({
    layout: 'admin',
    middleware: 'auth'
  })
</script>
