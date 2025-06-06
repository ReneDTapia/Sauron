<template>
  <div class="social-auth">
    <div class="social-auth__divider">
      <span class="social-auth__divider-text">or continue with</span>
    </div>
    
    <div class="social-auth__buttons">
      <AppButton
        variant="secondary"
        :loading="googleLoading"
        @click="handleGoogleAuth"
      >
        <q-icon name="fab fa-google" class="q-mr-sm" />
        Google
      </AppButton>
      
      <AppButton
        variant="secondary"
        :loading="facebookLoading"
        @click="handleFacebookAuth"
      >
        <q-icon name="fab fa-facebook" class="q-mr-sm" />
        Facebook
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AppButton } from 'src/shared'

const googleLoading = ref(false)
const facebookLoading = ref(false)

const emit = defineEmits<{
  googleAuth: []
  facebookAuth: []
}>()

const handleGoogleAuth = () => {
  googleLoading.value = true
  try {
    emit('googleAuth')
  } finally {
    googleLoading.value = false
  }
}

const handleFacebookAuth = () => {
  facebookLoading.value = true
  try {
    emit('facebookAuth')
  } finally {
    facebookLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.social-auth {
  &__divider {
    display: flex;
    align-items: center;
    margin: 24px 0;
    
    &::before,
    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: #e0e0e0;
    }
    
    &-text {
      padding: 0 16px;
      font-size: 12px;
      color: #999999;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }
  
  &__buttons {
    display: flex;
    gap: 12px;
    
    .q-btn {
      flex: 1;
    }
  }
}
</style>