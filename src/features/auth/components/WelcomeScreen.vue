<template>
  <div class="welcome-screen">
    <!-- Logo Section -->
    <div class="logo-section">
      <div class="brand-frame">
        <div class="logo-horizontal">
          <div class="logo-container">
            <!-- Light mode logo (default) -->
            <img
              src="/src/assets/sauron-logo.svg"
              width="40"
              height="40"
              class="logo logo-dark"
              alt="Sauron Logo"
            />
            <!-- Dark mode logo -->
            <img
              src="/src/assets/sauron-logo-light.svg"
              width="40"
              height="40"
              class="logo logo-light"
              alt="Sauron Logo Light"
            />
          </div>
          <span class="brand-name">Sauron</span>
        </div>
      </div>
      <p class="tagline">Smart residential management</p>
    </div>

    <!-- Action Buttons -->
    <div class="actions">
      <!-- OAuth Buttons -->
      <OAuthButtons
        mode="login"
        @success="handleOAuthSuccess"
        @error="handleOAuthError"
      />

      <!-- Divider -->
      <div class="divider">
        <span>or</span>
      </div>

      <!-- Email Options -->
      <div class="email-actions">
        <button class="email-btn primary" @click="$emit('showLogin')">Sign in with email</button>

        <div class="signup-option">
          <span>Don't have an account?</span>
          <button class="link-btn" @click="$emit('showRegister')">Sign up</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import OAuthButtons from './OAuthButtons.vue'

const router = useRouter()
const $q = useQuasar()

defineEmits<{
  showLogin: [];
  showRegister: [];
  socialLogin: [provider: 'google' | 'facebook'];
}>()

function handleOAuthSuccess(user: any): void {
  $q.notify({
    type: 'positive',
    message: 'Successfully logged in!',
    position: 'top'
  })
  
  void router.push('/home')
}

function handleOAuthError(error: Error): void {
  console.error('OAuth login error:', error)
  
  $q.notify({
    type: 'negative',
    message: error.message || 'Login failed. Please try again.',
    position: 'top'
  })
}
</script>

<style lang="scss" scoped>
.welcome-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px;
  text-align: center;
}

// Logo Section
.logo-section {
  margin-bottom: 48px;
}

.brand-frame {
  position: relative;
  display: inline-block;
  padding: 16px 20px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
  transition: all 200ms ease;

  &:hover {
    border-color: #d0d0d0;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
}

.logo-horizontal {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  z-index: 5;
}

.brand-name {
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  letter-spacing: -0.025em;
}

.tagline {
  font-size: 16px;
  color: #999999;
  margin: 0;
  font-weight: 400;
  text-align: center;
}

// Actions
.actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

// Social Buttons
.social-btn {
  width: 100%;
  height: 48px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: #ffffff;
  color: #333333;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  transition: all 200ms ease;

  &:hover {
    border-color: #d0d0d0;
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: scale(0.98);
  }
}

// Divider
.divider {
  position: relative;
  margin: 16px 0;
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #f0f0f0;
  }

  span {
    background: #ffffff;
    padding: 0 16px;
    color: #999999;
    font-size: 14px;
    font-weight: 500;
    position: relative;
    z-index: 1;
  }
}

// Email Actions
.email-actions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.email-btn {
  width: 100%;
  height: 48px;
  background: #000000;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms ease;

  &:hover {
    background: #1a1a1a;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }
}

.signup-option {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 14px;
  color: #999999;
}

.link-btn {
  background: none;
  border: none;
  color: #8b4513;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #a0522d;
  }
}

// Dark mode
// Logo container and switching
.logo-container {
  position: relative;
  width: 40px;
  height: 40px;
}

.logo {
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 200ms ease;
}

// Light mode: show dark logo, hide light logo
.logo-dark {
  opacity: 1;
}

.logo-light {
  opacity: 0;
}

// Automatic dark mode support
@media (prefers-color-scheme: dark) {
  .welcome-screen {
    background: #121212;
    color: #ffffff;
  }

  // Dark mode: hide dark logo, show light logo
  .logo-dark {
    opacity: 0;
  }

  .logo-light {
    opacity: 1;
  }

  .brand-frame {
    border-color: #2d2d2d;
    background: #1a1a1a;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);

    &:hover {
      border-color: #404040;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
    }
  }

  .brand-name {
    color: #ffffff;
  }

  .tagline {
    color: #b3b3b3;
  }

  .social-btn {
    background: #1e1e1e;
    border-color: #2d2d2d;
    color: #ffffff;

    &:hover {
      border-color: #404040;
    }
  }

  .divider {
    &::before {
      background: #2d2d2d;
    }

    span {
      background: #121212;
      color: #666666;
    }
  }

  .email-btn {
    background: #ffffff;
    color: #1a1a1a;

    &:hover {
      background: #f0f0f0;
    }
  }

  .signup-option {
    color: #666666;
  }
}

body.body--dark {
  .welcome-screen {
    background: #121212;
    color: #ffffff;
  }

  // Dark mode: hide dark logo, show light logo
  .logo-dark {
    opacity: 0;
  }

  .logo-light {
    opacity: 1;
  }

  .brand-frame {
    border-color: #2d2d2d;
    background: #1a1a1a;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);

    &:hover {
      border-color: #404040;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
    }
  }

  .brand-name {
    color: #ffffff;
  }

  .tagline {
    color: #b3b3b3;
  }

  .social-btn {
    background: #1e1e1e;
    border-color: #2d2d2d;
    color: #ffffff;

    &:hover {
      border-color: #404040;
    }
  }

  .divider {
    &::before {
      background: #2d2d2d;
    }

    span {
      background: #121212;
      color: #666666;
    }
  }

  .email-btn {
    background: #ffffff;
    color: #1a1a1a;

    &:hover {
      background: #f0f0f0;
    }
  }

  .signup-option {
    color: #666666;
  }
}

// Responsive
</style>
