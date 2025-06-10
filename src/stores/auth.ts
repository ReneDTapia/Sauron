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
  async function login(email: string, password: string): Promise<void> {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    isLoading.value = true;
    try {
      // TODO: Replace with actual API call
      // const response = await authService.login({ email, password });
      
      // TEMPORARY BYPASS FOR TESTING - REMOVE WHEN BACKEND IS READY
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      console.log('Login attempt:', { email });
      
      user.value = {
        id: '1',
        email: email,
        name: email.split('@')[0] || 'User',
        role: 'resident'
      };
      token.value = 'temp-token-' + Date.now();
      
    } catch (error) {
      console.error('Login failed:', error);
      user.value = null;
      token.value = null;
      throw error;
    } finally {
      isLoading.value = false;
    }
  }

  async function register(userData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }): Promise<void> {
    if (!userData.name || !userData.email || !userData.password) {
      throw new Error('All fields are required');
    }

    if (userData.password !== userData.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    if (userData.password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    isLoading.value = true;
    try {
      // TODO: Replace with actual API call
      // const response = await authService.register(userData);
      
      // TEMPORARY IMPLEMENTATION FOR TESTING
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      console.log('Registration successful for:', userData.email);
      
      // For now, just log success - in real implementation, user would need to login after registration
      
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