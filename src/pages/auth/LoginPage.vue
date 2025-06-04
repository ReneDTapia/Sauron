<template>
  <div class="login-page">
    <div class="login-page__header">
      <h1 class="login-page__title">Iniciar Sesión</h1>
      <p class="login-page__subtitle">
        Accede a tu cuenta para gestionar tu residencia
      </p>
    </div>
    
    <LoginForm 
      @submit="handleLogin"
      @social-login="handleSocialLogin"
    />
    
    <div class="login-page__footer">
      <p class="login-page__signup-prompt">
        ¿No tienes una cuenta? 
        <router-link 
          to="/auth/register" 
          class="login-page__signup-link text-secondary"
        >
          Crear nueva cuenta
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useAuthStore } from '../../stores/auth';
import LoginForm from '../../components/auth/LoginForm.vue';

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const router = useRouter();
const $q = useQuasar();
const authStore = useAuthStore();

const handleLogin = (data: LoginData) => {
  try {
    authStore.login(data.email, data.password);
    
    $q.notify({
      type: 'positive',
      message: 'Inicio de sesión exitoso',
      position: 'top',
    });
    
    // Redirect to dashboard after successful login
    void router.push('/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    
    $q.notify({
      type: 'negative',
      message: 'Error al iniciar sesión. Verifica tus credenciales.',
      position: 'top',
    });
  }
};

const handleSocialLogin = (provider: 'google' | 'facebook') => {
  // TODO: Implement social login logic
  console.log(`Social login with ${provider}`);
  
  $q.notify({
    type: 'info',
    message: `Función de ${provider} próximamente disponible`,
    position: 'top',
  });
};
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  flex-direction: column;
  gap: $spacing-large;
  width: 100%;
  
  &__header {
    text-align: center;
    margin-bottom: $spacing-medium;
  }
  
  &__title {
    font-size: 24px;
    line-height: 32px;
    font-weight: 600;
    color: $obsidian-black;
    margin: 0;
    font-family: $font-family-primary;
    margin-bottom: $spacing-small;
  }
  
  &__subtitle {
    font-size: 16px;
    line-height: 24px;
    color: $medium-grey;
    margin: 0;
    font-family: $font-family-primary;
  }
  
  &__footer {
    text-align: center;
    padding-top: $spacing-medium;
    border-top: 1px solid $light-grey;
  }
  
  &__signup-prompt {
    font-size: 14px;
    line-height: 20px;
    color: $dark-grey;
    margin: 0;
    font-family: $font-family-primary;
  }
  
  &__signup-link {
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

// Responsive adjustments
@media (max-width: 600px) {
  .login-page {
    gap: $spacing-medium;
    
    &__title {
      font-size: 20px;
      line-height: 28px;
    }
    
    &__subtitle {
      font-size: 14px;
      line-height: 20px;
    }
  }
}
</style> 