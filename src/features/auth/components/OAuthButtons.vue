<template>
  <div class="oauth-buttons">
    <div class="oauth-buttons__divider">
      <span class="oauth-buttons__divider-text">{{ dividerText }}</span>
    </div>
    
    <div class="oauth-buttons__container">
      <q-btn
        :loading="isGoogleLoading"
        :disable="isLoading"
        class="oauth-buttons__button oauth-buttons__button--google"
        unelevated
        no-caps
        @click="handleGoogleLogin"
      >
        <div class="oauth-buttons__button-content">
          <img 
            src="/icons/google-icon.svg" 
            alt="Google"
            class="oauth-buttons__icon"
            @error="handleIconError"
          >
          <span>{{ buttonText }} with Google</span>
        </div>
      </q-btn>
      
      <q-btn
        :loading="isFacebookLoading"
        :disable="isLoading"
        class="oauth-buttons__button oauth-buttons__button--facebook"
        unelevated
        no-caps
        @click="handleFacebookLogin"
      >
        <div class="oauth-buttons__button-content">
          <img 
            src="/icons/facebook-icon.svg" 
            alt="Facebook"
            class="oauth-buttons__icon"
            @error="handleIconError"
          >
          <span>{{ buttonText }} with Facebook</span>
        </div>
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useOAuth } from '../composables/useOAuth'

interface Props {
  mode?: 'login' | 'signup'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'login',
  disabled: false
})

const emit = defineEmits<{
  success: [user: any]
  error: [error: Error]
}>()

const { 
  isLoading, 
  currentProvider, 
  loginWithOAuth 
} = useOAuth()

// Computed properties
const buttonText = computed(() => 
  props.mode === 'signup' ? 'Sign up' : 'Continue'
)

const dividerText = computed(() =>
  props.mode === 'signup' ? 'Or sign up with' : 'Or continue with'
)

const isGoogleLoading = computed(() => 
  isLoading.value && currentProvider.value === 'google'
)

const isFacebookLoading = computed(() => 
  isLoading.value && currentProvider.value === 'facebook'
)

const isDisabled = computed(() => 
  props.disabled || isLoading.value
)

// Methods
async function handleGoogleLogin(): Promise<void> {
  if (isDisabled.value) return
  
  try {
    await loginWithOAuth('google')
    // Success is handled by the composable and auth store
  } catch (error) {
    emit('error', error as Error)
  }
}

async function handleFacebookLogin(): Promise<void> {
  if (isDisabled.value) return
  
  try {
    await loginWithOAuth('facebook')
    // Success is handled by the composable and auth store
  } catch (error) {
    emit('error', error as Error)
  }
}

function handleIconError(event: Event): void {
  // Fallback for missing icons - use text instead
  const img = event.target as HTMLImageElement
  const parent = img.parentElement
  if (parent) {
    const provider = img.alt
    const span = document.createElement('span')
    span.textContent = provider
    span.className = 'oauth-buttons__icon-fallback'
    parent.replaceChild(span, img)
  }
}
</script>

<style lang="scss" scoped>
.oauth-buttons {
  width: 100%;
  margin: 24px 0;

  &__divider {
    position: relative;
    text-align: center;
    margin-bottom: 20px;
    
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background-color: var(--border-color, #e0e0e0);
    }
  }

  &__divider-text {
    background-color: var(--bg-primary, #ffffff);
    padding: 0 16px;
    color: var(--text-secondary, #666666);
    font-size: 14px;
    font-weight: 500;
    position: relative;
    z-index: 1;
  }

  &__container {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__button {
    width: 100%;
    height: 48px;
    border-radius: 8px;
    border: 1px solid var(--border-color, #e0e0e0);
    background-color: var(--bg-primary, #ffffff);
    color: var(--text-primary, #333333);
    font-weight: 500;
    transition: all 0.2s ease;

    &:hover:not(.disabled) {
      border-color: var(--color-ember, #ff4500);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    &:active:not(.disabled) {
      transform: translateY(0);
    }

    &--google {
      &:hover:not(.disabled) {
        border-color: #4285f4;
        box-shadow: 0 4px 12px rgba(66, 133, 244, 0.15);
      }
    }

    &--facebook {
      &:hover:not(.disabled) {
        border-color: #1877f2;
        box-shadow: 0 4px 12px rgba(24, 119, 242, 0.15);
      }
    }

    &.disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  &__button-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
  }

  &__icon {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }

  &__icon-fallback {
    font-size: 16px;
    font-weight: 600;
    color: var(--text-secondary, #666666);
  }
}

// Dark mode adjustments
.body--dark {
  .oauth-buttons {
    &__divider-text {
      background-color: var(--bg-primary, #1a1a1a);
    }

    &__button {
      background-color: var(--bg-secondary, #2d2d2d);
      border-color: var(--border-color, #444444);
      color: var(--text-primary, #ffffff);

      &:hover:not(.disabled) {
        background-color: var(--bg-primary, #1a1a1a);
      }
    }
  }
}

// Mobile responsive
@media (max-width: 480px) {
  .oauth-buttons {
    &__button {
      height: 44px;
    }

    &__button-content {
      gap: 8px;
    }

    &__icon {
      width: 18px;
      height: 18px;
    }
  }
}
</style>