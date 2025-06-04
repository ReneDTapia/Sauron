<template>
  <div class="register-page">
    <div class="register-page__header">
      <h1 class="register-page__title">Crear Cuenta</h1>
      <p class="register-page__subtitle">
        Únete a nuestra plataforma de gestión residencial
      </p>
    </div>
    
    <RegisterForm 
      @submit="handleRegister"
    />
    
    <div class="register-page__footer">
      <p class="register-page__login-prompt">
        ¿Ya tienes una cuenta? 
        <router-link 
          to="/auth/login" 
          class="register-page__login-link text-secondary"
        >
          Iniciar sesión
        </router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useAuthStore } from '../../stores/auth';
import RegisterForm from '../../components/auth/RegisterForm.vue';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const router = useRouter();
const $q = useQuasar();
const authStore = useAuthStore();

const handleRegister = (data: RegisterData) => {
  try {
    authStore.register({
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
    
    $q.notify({
      type: 'positive',
      message: 'Cuenta creada exitosamente',
      position: 'top',
    });
    
    // Redirect to login page after successful registration
    void router.push('/auth/login');
  } catch (error) {
    console.error('Registration error:', error);
    
    $q.notify({
      type: 'negative',
      message: 'Error al crear la cuenta. Intenta nuevamente.',
      position: 'top',
    });
  }
};
</script>

<style lang="scss" scoped>
.register-page {
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
  
  &__login-prompt {
    font-size: 14px;
    line-height: 20px;
    color: $dark-grey;
    margin: 0;
    font-family: $font-family-primary;
  }
  
  &__login-link {
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

// Responsive adjustments
@media (max-width: 600px) {
  .register-page {
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