import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { authService } from 'src/features/auth/services/auth.service'

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  house?: string
  role: 'admin' | 'resident' | 'manager' | 'staff' | 'guest'
  avatar?: string
  is_verified?: boolean
  is_active?: boolean
  is_admin?: boolean
  oauth_provider?: string | null
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref<boolean>(false)

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const userRole = computed(() => user.value?.role)
  const userName = computed(() => user.value?.name)
  const isAdmin = computed(() => user.value?.is_admin || false)

  // Actions
  async function login(email: string, password: string): Promise<void> {
    if (!email || !password) {
      throw new Error('Email and password are required')
    }

    isLoading.value = true
    try {
      const response = await authService.login({ email, password })
      
      user.value = response.user
      token.value = response.access_token
      
    } catch (error: any) {
      console.error('Login failed:', error)
      user.value = null
      token.value = null
      throw new Error(error.response?.data?.message || error.message || 'Login failed')
    } finally {
      isLoading.value = false
    }
  }

  async function register(userData: {
    name: string
    email: string
    password: string
    confirmPassword: string
    phone?: string
    house?: string
  }): Promise<void> {
    if (!userData.name || !userData.email || !userData.password) {
      throw new Error('Name, email, and password are required')
    }

    if (userData.password !== userData.confirmPassword) {
      throw new Error('Passwords do not match')
    }

    if (userData.password.length < 8) {
      throw new Error('Password must be at least 8 characters long')
    }

    isLoading.value = true
    try {
      const response = await authService.register({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        confirmPassword: userData.confirmPassword
      })
      
      // Auto-login after successful registration
      user.value = response.user
      token.value = response.access_token
      
    } catch (error: any) {
      console.error('Registration failed:', error)
      throw new Error(error.response?.data?.message || error.message || 'Registration failed')
    } finally {
      isLoading.value = false
    }
  }

  async function logout(): Promise<void> {
    try {
      if (token.value) {
        await authService.logout()
      }
    } catch (error) {
      console.error('Logout error:', error)
      // Continue with local logout even if API call fails
    } finally {
      user.value = null
      token.value = null
    }
  }

  function hasRole(role: string): boolean {
    return user.value?.role === role
  }

  function setUser(userData: User): void {
    user.value = userData
  }

  function setToken(tokenValue: string): void {
    token.value = tokenValue
  }

  return {
    // State
    user,
    token,
    isLoading,
    // Getters
    isAuthenticated,
    userRole,
    userName,
    isAdmin,
    // Actions
    login,
    register,
    logout,
    hasRole,
    setUser,
    setToken,
  }
}, {
  persist: {
    key: 'sauron-auth',
  },
}) 