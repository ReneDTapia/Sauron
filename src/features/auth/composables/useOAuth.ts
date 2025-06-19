import { ref, computed, nextTick } from 'vue'
import { authService } from '../services/auth.service'
import { useAuthStore } from 'src/stores/auth'
import { Notify } from 'quasar'
import { useRouter } from 'vue-router'

export type OAuthProvider = 'google' | 'facebook'

export interface OAuthState {
  provider: OAuthProvider
  state: string
  redirectUrl: string
}

export function useOAuth() {
  const authStore = useAuthStore()
  const router = useRouter()
  const isLoading = ref(false)
  const currentProvider = ref<OAuthProvider | null>(null)
  
  // Store OAuth state securely
  const oauthStates = ref<Map<string, OAuthState>>(new Map())
  
  const isOAuthInProgress = computed(() => currentProvider.value !== null)

  /**
   * Initiate OAuth login flow
   */
  async function loginWithOAuth(provider: OAuthProvider): Promise<void> {
    try {
      isLoading.value = true
      currentProvider.value = provider
      
      // Get redirect URL from backend
      const response = await authService.getOAuthRedirectUrl(provider)
      
      console.log(`${provider} OAuth Response:`, response)
      
      // Store state for security validation
      const oauthState: OAuthState = {
        provider,
        state: response.data.state,
        redirectUrl: response.data.redirect_url
      }
      
      oauthStates.value.set(response.data.state, oauthState)
      
      // Store in sessionStorage as backup (for page refreshes)
      sessionStorage.setItem(`oauth_state_${response.data.state}`, JSON.stringify(oauthState))
      
      console.log(`Opening OAuth URL: ${response.data.redirect_url}`)
      
      // Open OAuth popup or redirect
      await openOAuthWindow(response.data.redirect_url, provider)
      
    } catch (error: unknown) {
      console.error(`${provider} OAuth initiation failed:`, error)
      
      Notify.create({
        type: 'negative',
        message: `Failed to start ${provider} login. Please try again.`,
        position: 'top'
      })
      
      currentProvider.value = null
      throw error
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Handle OAuth callback with authorization code
   */
  async function handleOAuthCallback(code: string, state: string, receivedProvider?: OAuthProvider): Promise<boolean> {
    try {
      isLoading.value = true
      
      // Validate state parameter
      const storedState = oauthStates.value.get(state) || 
                         JSON.parse(sessionStorage.getItem(`oauth_state_${state}`) || 'null')
      
      if (!storedState || (receivedProvider && storedState.provider !== receivedProvider)) {
        throw new Error('Invalid OAuth state - possible CSRF attack')
      }
      
      // Exchange code for tokens
      const loginResponse = await authService.handleOAuthCallback(storedState.provider, {
        code,
        state
      })
      
      // Update auth store
      authStore.setUser(loginResponse.user)
      authStore.setToken(loginResponse.access_token)
      
      console.log('OAuth callback successful, user data:', loginResponse.user)
      console.log('Auth store state after OAuth callback:', {
        isAuthenticated: authStore.isAuthenticated,
        user: authStore.user,
        token: !!authStore.token
      })
      
      // Clean up state
      oauthStates.value.delete(state)
      sessionStorage.removeItem(`oauth_state_${state}`)
      currentProvider.value = null
      
      Notify.create({
        type: 'positive',
        message: `Successfully logged in with ${storedState.provider}!`,
        position: 'top'
      })
      
      // Wait for next tick to ensure store is updated before navigation
      void nextTick().then(() => {
        // Force a small delay to ensure persistence
        setTimeout(() => {
          console.log('Store updated, navigating to /home after OAuth callback')
          console.log('Final auth state before navigation:', {
            isAuthenticated: authStore.isAuthenticated,
            user: authStore.user,
            token: !!authStore.token
          })
          void router.replace('/home')
        }, 50)
      })
      
      return true
      
    } catch (error: unknown) {
      console.error('OAuth callback failed:', error)
      
      // Clean up state even on error
      oauthStates.value.delete(state)
      sessionStorage.removeItem(`oauth_state_${state}`)
      currentProvider.value = null
      
      Notify.create({
        type: 'negative',
        message: error instanceof Error ? error.message : 'OAuth login failed. Please try again.',
        position: 'top'
      })
      
      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Open OAuth authorization window
   */
  async function openOAuthWindow(url: string, provider: OAuthProvider): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if we're in a mobile environment
      const isMobile = (window as typeof window & { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor?.isNativePlatform?.() || false
      
      if (isMobile) {
        // For mobile: open in system browser
        window.open(url, '_system')
        resolve()
      } else {
        // For web, use popup window
        console.log(`Opening popup for ${provider} with URL:`, url)
        
        const popup = window.open(
          url, 
          `${provider}_oauth`,
          'width=500,height=600,scrollbars=yes,resizable=yes'
        )
        
        if (!popup) {
          console.error('Popup was blocked by browser')
          reject(new Error('Popup blocked. Please allow popups for OAuth login.'))
          return
        }
        
        console.log('Popup opened successfully:', popup)
        
        // Listen for popup to close or message
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            console.log('OAuth popup was closed by user or completed')
            clearInterval(checkClosed)
            currentProvider.value = null
            resolve()
          }
        }, 1000)
        
        // Listen for postMessage from popup
        const messageListener = (event: MessageEvent) => {
          // Accept messages from backend (OAuth callback page)
          const allowedOrigins = [window.location.origin, 'http://localhost:8000']
          if (!allowedOrigins.includes(event.origin)) {
            return
          }
          
          if (event.data?.type === 'oauth_callback') {
            clearInterval(checkClosed)
            popup.close()
            window.removeEventListener('message', messageListener)
            
            if (event.data.success) {
              // Update auth store directly with the received data
              authStore.setUser(event.data.data.user)
              authStore.setToken(event.data.data.access_token)
              
              
              currentProvider.value = null
              
              // Show success notification (temporarily disabled for debugging)
              console.log(`Successfully logged in with ${event.data.provider}!`)
              
              // Wait for next tick to ensure store is updated before navigation
              void nextTick().then(() => {
                // Force a small delay to ensure persistence
                setTimeout(() => {
                  console.log('About to navigate to /home after OAuth success')
                  console.log('Current route:', router.currentRoute.value.path)
                  console.log('Auth store state before navigation:', {
                    isAuthenticated: authStore.isAuthenticated,
                    user: !!authStore.user,
                    token: !!authStore.token
                  })
                  
                  router.replace('/home').then(() => {
                    console.log('Navigation to /home completed')
                  }).catch((error) => {
                    console.error('Navigation to /home failed:', error)
                    console.log('Trying fallback navigation with window.location')
                    window.location.href = '/home'
                  })
                }, 50)
              })
              
              resolve()
            } else {
              reject(new Error(event.data.error || 'OAuth login failed'))
            }
          }
        }
        
        window.addEventListener('message', messageListener)
        
        // Cleanup timeout
        setTimeout(() => {
          if (!popup.closed) {
            popup.close()
            clearInterval(checkClosed)
            window.removeEventListener('message', messageListener)
            currentProvider.value = null
            reject(new Error('OAuth login timed out'))
          }
        }, 300000) // 5 minute timeout
      }
    })
  }

  /**
   * Get OAuth status for current user
   */
  async function getOAuthStatus() {
    try {
      return await authService.getOAuthStatus()
    } catch (error) {
      console.error('Failed to get OAuth status:', error)
      return null
    }
  }

  /**
   * Unlink OAuth provider from current user
   */
  async function unlinkOAuthProvider(): Promise<boolean> {
    try {
      isLoading.value = true
      
      await authService.unlinkOAuthProvider()
      
      Notify.create({
        type: 'positive',
        message: 'OAuth provider unlinked successfully',
        position: 'top'
      })
      
      return true
      
    } catch (error: unknown) {
      console.error('Failed to unlink OAuth provider:', error)
      
      Notify.create({
        type: 'negative',
        message: error instanceof Error ? error.message : 'Failed to unlink OAuth provider',
        position: 'top'
      })
      
      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Cancel current OAuth flow
   */
  function cancelOAuth(): void {
    currentProvider.value = null
    isLoading.value = false
    
    // Clear all stored states
    oauthStates.value.clear()
    
    // Clear sessionStorage states
    Object.keys(sessionStorage).forEach(key => {
      if (key.startsWith('oauth_state_')) {
        sessionStorage.removeItem(key)
      }
    })
  }

  return {
    // State
    isLoading,
    currentProvider,
    isOAuthInProgress,
    
    // Methods
    loginWithOAuth,
    handleOAuthCallback,
    getOAuthStatus,
    unlinkOAuthProvider,
    cancelOAuth,
  }
}