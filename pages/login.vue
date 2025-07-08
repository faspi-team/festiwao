<template>
  <div class="card my-5">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-end mb-4">
        <h3 class="mb-0"><b>Login</b></h3>
      </div>
      <div class="form-group mb-3">
        <label class="form-label">Correo electrónico</label>
        <input 
          id="email"
          v-model="email" 
          type="email" 
          placeholder="tu@email.com" 
          required 
          class="form-control"
        />
      </div>
      <div class="form-group mb-3">
        <label class="form-label">Contraseña</label>
        <input 
          id="password"
          v-model="password" 
          type="password" 
          placeholder="••••••••" 
          required 
          class="form-control"
        />
      </div>
      <div class="d-grid mt-4">
        <button type="button" class="btn btn-primary" @click="submitForm">Login</button>
      </div>
      <p v-if="error" class="error-message">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { navigateTo, definePageMeta } from '#imports'
  import { useAuth } from '~/composables/useAuth'

  definePageMeta({
    layout: 'auth'
  })

  const email = ref('')
  const password = ref('')
  const error = ref('')
  const loading = ref(false)

  const { login, getCurrentUser } = useAuth()

  onMounted(async () => {
    const user = await getCurrentUser()
    
    if (user) {
      navigateTo('/')
    }
  })

  const submitForm = async () => {
    error.value = ''
    loading.value = true

    if (!email.value || !password.value) {
      error.value = 'Email y contraseña son obligatorios'
      loading.value = false
      return
    }

    const { data, error: loginError } = await login(email.value, password.value)

    if (loginError) {
      error.value = (loginError as any).message || 'Error de autenticación'
    } else {
      return navigateTo('/admin')
    }
    
    loading.value = false
  }
</script>
