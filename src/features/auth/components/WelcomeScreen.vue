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
      <!-- Social Login -->
      <button class="social-btn google-btn" @click="handleGoogleLogin">
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

      <button class="social-btn facebook-btn" @click="handleFacebookLogin">
        <svg width="20" height="20" viewBox="0 0 24 24">
          <path
            fill="#1877F2"
            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
          />
        </svg>
        Continue with Facebook
      </button>

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
defineEmits<{
  showLogin: [];
  showRegister: [];
  socialLogin: [provider: 'google' | 'facebook'];
}>();

const handleGoogleLogin = () => {
  console.log('Google login');
  // emit('socialLogin', 'google');
};

const handleFacebookLogin = () => {
  console.log('Facebook login');
  // emit('socialLogin', 'facebook');
};
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
