// @ts-nocheck
import type { User } from '@supabase/supabase-js'

export const useAuth = () => {
  const { $supabase } = useNuxtApp()
  const user = ref<User | null>(null)
  const loading = ref(false)

  onMounted(async () => {
    await getCurrentUser()
    
    const { data: { subscription } } = $supabase.auth.onAuthStateChange(
      async (event, session) => {
        user.value = session?.user ?? null
      }
    )
    
    onUnmounted(() => {
      subscription.unsubscribe()
    })
  })

  const login = async (email: string, password: string) => {
    loading.value = true
    try {
      const { data, error } = await $supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) throw error
      user.value = data.user
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    } finally {
      loading.value = false
    }
  }

  const register = async (email: string, password: string) => {
    loading.value = true
    try {
      const { data, error } = await $supabase.auth.signUp({
        email,
        password
      })
      if (error) throw error
      user.value = data.user
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    } finally {
      loading.value = false
    }
  }

  const logout = async () => {
    loading.value = true
    try {
      const { error } = await $supabase.auth.signOut()
      if (error) throw error
      user.value = null
      return { error: null }
    } catch (error) {
      return { error }
    } finally {
      loading.value = false
    }
  }

  const getCurrentUser = async () => {
    const { data: { user: currentUser } } = await $supabase.auth.getUser()
    user.value = currentUser
    return currentUser
  }

  const onAuthStateChange = (callback: (event: string, session: any) => void) => {
    return $supabase.auth.onAuthStateChange(callback)
  }

  return {
    user: readonly(user),
    loading: readonly(loading),
    login,
    register,
    logout,
    getCurrentUser,
    onAuthStateChange
  }
}
