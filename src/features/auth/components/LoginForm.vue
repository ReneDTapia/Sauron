<template>
  <div class="login-form">
    <!-- Logo and Header -->
    <div class="header">
      <div class="logo">
        <svg viewBox="0 0 48 48" width="32" height="32">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color: #1a1a1a" />
              <stop offset="100%" style="stop-color: #2d2d2d" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="48" height="48" rx="12" ry="12" fill="url(#logoGradient)" />
          <circle cx="24" cy="24" r="16" fill="none" stroke="#ffffff" stroke-width="2.5" />
          <circle cx="24" cy="24" r="5" fill="#ffffff" />
        </svg>
        <span class="logo-text">Sauron</span>
      </div>

      <h1 class="title">Welcome back</h1>
      <p class="subtitle">Sign in to your account</p>
    </div>

    <!-- Social Buttons -->
    <div class="social-section">
      <button class="social-btn" @click="handleGoogleLogin">
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </button>

      <button class="social-btn" @click="handleFacebookLogin">
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            fill="#1877F2"
            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
          />
        </svg>
        Continue with Facebook
      </button>
    </div>

    <!-- Divider -->
    <div class="divider">
      <span>or</span>
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
        />
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
          />
          <button type="button" class="password-toggle" @click="showPassword = !showPassword">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path v-if="!showPassword" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle v-if="!showPassword" cx="12" cy="12" r="3" />
              <path v-if="showPassword" d="m1 1 22 22" />
              <path v-if="showPassword" d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
              <path
                v-if="showPassword"
                d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 11 8 11 8a13.16 13.16 0 0 1-1.67 2.68"
              />
              <path
                v-if="showPassword"
                d="M6.61 6.61A13.526 13.526 0 0 0 1 12s4 8 11 8a9.74 9.74 0 0 0 5-1.28"
              />
            </svg>
          </button>
        </div>
        <span v-if="errors.password" class="error-text">{{ errors.password }}</span>
      </div>

      <div class="form-options">
        <label class="checkbox">
          <input type="checkbox" v-model="form.rememberMe" />
          <span class="checkmark"></span>
          Remember me
        </label>
        <router-link to="/auth/forgot-password" class="forgot-link"> Forgot password? </router-link>
      </div>

      <button type="submit" class="submit-btn" :disabled="!isFormValid || isLoading">
        <span v-if="!isLoading">Sign in</span>
        <span v-else>Signing in...</span>
      </button>
    </form>

    <!-- Footer -->
    <div class="footer">
      <span>Don't have an account? </span>
      <router-link to="/auth/register" class="signup-link">Sign up</router-link>
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
  submit: [data: LoginForm];
  socialLogin: [provider: 'google' | 'facebook'];
}>();

const form = reactive<LoginForm>({
  email: '',
  password: '',
  rememberMe: false,
});

const errors = reactive<FormErrors>({});
const isLoading = ref(false);
const showPassword = ref(false);

// Computed properties
const isFormValid = computed(() => {
  return (
    form.email &&
    form.password &&
    !errors.email &&
    !errors.password &&
    /.+@.+\..+/.test(form.email) &&
    form.password.length >= 6
  );
});

// Methods
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
    // Reset loading state after emission
    setTimeout(() => {
      isLoading.value = false;
    }, 1000);
  }
};

const handleGoogleLogin = () => {
  emit('socialLogin', 'google');
};

const handleFacebookLogin = () => {
  emit('socialLogin', 'facebook');
};
</script>

<style lang="scss" scoped>
.login-form {
  width: 100%;
  max-width: 400px;
}

// Header section
.header {
  text-align: center;
  margin-bottom: 32px;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
}

.logo-text {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  letter-spacing: -0.02em;
}

.title {
  font-size: 32px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px 0;
  letter-spacing: -0.025em;
  line-height: 1.1;
}

.subtitle {
  font-size: 16px;
  color: #999999;
  margin: 0;
  font-weight: 400;
}

// Social buttons
.social-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.social-btn {
  width: 100%;
  height: 48px;
  border: 1px solid #f5f5f5;
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
  transition: all 150ms ease-out;

  &:hover {
    border-color: #e0e0e0;
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
  text-align: center;
  margin: 24px 0;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #f5f5f5;
  }

  span {
    background: #ffffff;
    padding: 0 16px;
    color: #999999;
    font-size: 14px;
    font-weight: 500;
  }
}

// Form
.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  border: 1px solid #f5f5f5;
  border-radius: 8px;
  font-size: 16px;
  background: #ffffff;
  transition: all 150ms ease-out;

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
  margin-top: 4px;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #333333;
  cursor: pointer;

  input[type='checkbox'] {
    width: 16px;
    height: 16px;
    margin: 0;
  }
}

.forgot-link {
  font-size: 14px;
  color: #4a90e2;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
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
  transition: all 150ms ease-out;

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
}

.signup-link {
  color: #4a90e2;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
}

// Dark mode
body.body--dark {
  .logo-text,
  .title {
    color: #ffffff;
  }

  .subtitle {
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

  .checkbox {
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
  .title {
    font-size: 28px;
  }

  .social-btn,
  input,
  .submit-btn {
    height: 44px;
  }

  .form-options {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
