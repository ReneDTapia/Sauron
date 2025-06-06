import { computed } from 'vue'
import { useAuthStore } from 'src/app/stores/auth'

export function useAuth() {
  const authStore = useAuthStore()

  const isAuthenticated = computed(() => authStore.isAuthenticated)
  const user = computed(() => authStore.user)
  const isLoading = computed(() => authStore.isLoading)

  const login = (email: string, password: string) => {
    return authStore.login(email, password)
  }

  const register = (userData: {
    name: string
    email: string
    password: string
    confirmPassword: string
  }) => {
    return authStore.register(userData)
  }

  const logout = () => {
    authStore.logout()
  }

  const hasRole = (role: string) => {
    return authStore.hasRole(role)
  }

  return {
    // State
    isAuthenticated,
    user,
    isLoading,
    // Actions
    login,
    register,
    logout,
    hasRole,
  }
}