<template>
  <div class="email-login-screen">
    <!-- Header -->
    <div class="header">
      <button class="back-btn" @click="$emit('goBack')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m15 18-6-6 6-6"/>
        </svg>
      </button>
      <h1 class="title">Sign in</h1>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="form">
      <div class="input-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="Enter your email"
          :class="{ error: errors.email }"
          @blur="validateEmail"
          autofocus
        >
        <span v-if="errors.email" class="error-text">{{ errors.email }}</span>
      </div>

      <div class="input-group">
        <label for="password">Password</label>
        <div class="password-input">
          <input
            id="password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter your password"
            :class="{ error: errors.password }"
            @blur="validatePassword"
          >
          <button
            type="button"
            class="password-toggle"
            @click="showPassword = !showPassword"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path v-if="!showPassword" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle v-if="!showPassword" cx="12" cy="12" r="3"/>
              <path v-if="showPassword" d="m1 1 22 22"/>
              <path v-if="showPassword" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
              <path v-if="showPassword" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 11 8 11 8a13.16 13.16 0 0 1-1.67 2.68"/>
              <path v-if="showPassword" d="M6.61 6.61A13.526 13.526 0 0 0 1 12s4 8 11 8a9.74 9.74 0 0 0 5-1.28"/>
            </svg>
          </button>
        </div>
        <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
      </div>

      <div class="form-actions">
        <label class="remember-me">
          <input type="checkbox" v-model="form.rememberMe">
          <span class="checkmark"></span>
          Remember me
        </label>
        
        <button type="button" class="forgot-link" @click="$emit('showForgotPassword')">
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        class="submit-btn"
        :disabled="!isFormValid || isLoading"
      >
        <span v-if="!isLoading">Sign in</span>
        <span v-else>Signing in...</span>
      </button>
    </form>

    <!-- Footer -->
    <div class="footer">
      <span>Don't have an account?</span>
      <button class="link-btn" @click="$emit('showRegister')">
        Sign up
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const emit = defineEmits<{
  goBack: [];
  showRegister: [];
  showForgotPassword: [];
  submit: [data: LoginForm];
}>();

const form = reactive<LoginForm>({
  email: '',
  password: '',
  rememberMe: false,
});

const errors = reactive<FormErrors>({});
const isLoading = ref(false);
const showPassword = ref(false);

const isFormValid = computed(() => {
  return form.email && 
         form.password && 
         !errors.email && 
         !errors.password &&
         /.+@.+\..+/.test(form.email) &&
         form.password.length >= 6;
});

const validateEmail = () => {
  errors.email = '';
  
  if (!form.email) {
    errors.email = 'Email is required';
    return;
  }
  
  if (!/.+@.+\..+/.test(form.email)) {
    errors.email = 'Please enter a valid email';
  }
};

const validatePassword = () => {
  errors.password = '';
  
  if (!form.password) {
    errors.password = 'Password is required';
    return;
  }
  
  if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
};

const handleSubmit = () => {
  validateEmail();
  validatePassword();
  
  if (isFormValid.value) {
    isLoading.value = true;
    emit('submit', { ...form });
    
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  }
};
</script>

<style lang="scss" scoped>
.email-login-screen {
  max-width: 400px;
  margin: 0 auto;
  padding: 32px 0;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
}

// Header
.header {
  display: flex;
  align-items: center;
  margin-bottom: 48px;
  position: relative;
}

.back-btn {
  position: absolute;
  left: 0;
  background: none;
  border: none;
  color: #999999;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  
  &:hover {
    color: #333333;
    background: #f5f5f5;
  }
}

.title {
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  flex: 1;
  text-align: center;
}

// Form
.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 48px;
  flex: 1;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  &:not(:last-child) {
    margin-bottom: 8px;
  }
}

label {
  font-size: 14px;
  font-weight: 500;
  color: #333333;
}

input {
  width: 100%;
  height: 48px;
  padding: 12px 16px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  font-size: 16px;
  background: #ffffff;
  transition: all 150ms ease;
  
  &::placeholder {
    color: #999999;
  }
  
  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.1);
  }
  
  &.error {
    border-color: #dc3545;
  }
}

.password-input {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999999;
  cursor: pointer;
  padding: 4px;
  
  &:hover {
    color: #333333;
  }
}

.error-text {
  font-size: 12px;
  color: #dc3545;
  margin-top: -4px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 0 32px 0;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333333;
  cursor: pointer;
  
  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    margin: 0;
  }
}

.forgot-link {
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

.submit-btn {
  width: 100%;
  height: 48px;
  background: #1a1a1a;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 150ms ease;
  
  &:hover:not(:disabled) {
    background: #2d2d2d;
    transform: translateY(-1px);
  }
  
  &:active:not(:disabled) {
    transform: scale(0.98);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
}

// Footer
.footer {
  text-align: center;
  font-size: 14px;
  color: #999999;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
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
@media (prefers-color-scheme: dark) {
  .email-login-screen {
    background: #121212;
    color: #ffffff;
  }
  
  .title {
    color: #ffffff;
  }
  
  .back-btn {
    color: #b3b3b3;
    
    &:hover {
      color: #ffffff;
      background: #2d2d2d;
    }
  }
  
  label {
    color: #ffffff;
  }
  
  input {
    background: #1e1e1e;
    border-color: #2d2d2d;
    color: #ffffff;
    
    &::placeholder {
      color: #666666;
    }
    
    &:focus {
      border-color: #4a90e2;
    }
  }
  
  .remember-me {
    color: #ffffff;
  }
  
  .submit-btn {
    background: #ffffff;
    color: #1a1a1a;
    
    &:hover:not(:disabled) {
      background: #f0f0f0;
    }
  }
  
  .footer {
    color: #666666;
  }
}

body.body--dark {
  .email-login-screen {
    background: #121212;
    color: #ffffff;
  }
  
  .title {
    color: #ffffff;
  }
  
  .back-btn {
    color: #b3b3b3;
    
    &:hover {
      color: #ffffff;
      background: #2d2d2d;
    }
  }
  
  label {
    color: #ffffff;
  }
  
  input {
    background: #1e1e1e;
    border-color: #2d2d2d;
    color: #ffffff;
    
    &::placeholder {
      color: #666666;
    }
    
    &:focus {
      border-color: #4a90e2;
    }
  }
  
  .remember-me {
    color: #ffffff;
  }
  
  .submit-btn {
    background: #ffffff;
    color: #1a1a1a;
    
    &:hover:not(:disabled) {
      background: #f0f0f0;
    }
  }
  
  .footer {
    color: #666666;
  }
}

// Responsive
@media (max-width: 480px) {
  .email-login-screen {
    max-width: 280px;
  }
  
  .title {
    font-size: 22px;
  }
  
  input,
  .submit-btn {
    height: 44px;
  }
  
  .form-actions {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>