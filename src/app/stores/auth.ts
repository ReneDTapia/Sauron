import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'resident' | 'manager';
  avatar?: string;
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null);
  const token = ref<string | null>(null);
  const isLoading = ref<boolean>(false);

  // Getters
  const isAuthenticated = computed(() => !!token.value);
  const userRole = computed(() => user.value?.role);
  const userName = computed(() => user.value?.name);

  // Actions
  function login(email: string, password: string) {
    isLoading.value = true;
    try {
      // TODO: Implement actual login logic
      console.log('Login attempt:', { email, password });
      
      // Placeholder for successful login
      // This will be replaced with actual API call
      throw new Error('Login logic not implemented yet');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  function register(userData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    isLoading.value = true;
    try {
      // TODO: Implement actual registration logic
      console.log('Registration attempt:', userData);
      
      // Placeholder for successful registration
      // This will be replaced with actual API call
      throw new Error('Registration logic not implemented yet');
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  function logout() {
    user.value = null;
    token.value = null;
  }

  function hasRole(role: string): boolean {
    return user.value?.role === role;
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
    // Actions
    login,
    register,
    logout,
    hasRole,
  };
}, {
  persist: {
    key: 'sauron-auth',
  },
}); 