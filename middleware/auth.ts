import { defineNuxtRouteMiddleware, navigateTo } from '#imports'
import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.server) return

  const { getCurrentUser } = useAuth()
  const user = await getCurrentUser()
  
  if (!user) {
    return navigateTo('/login')
  }
}) 