<template>
  <q-form @submit="handleSubmit" @reset="handleReset" class="login-form">
    <div class="login-form__fields">
      <AppInput
        v-model="form.email"
        label="Correo electrónico"
        type="email"
        placeholder="tu@email.com"
        leading-icon="mail"
        :rules="emailRules"
        :error="!!errors.email"
        v-bind="errors.email ? { errorMessage: errors.email } : {}"
        @blur="validateEmail"
      />
      
      <AppInput
        v-model="form.password"
        label="Contraseña"
        type="password"
        placeholder="Ingresa tu contraseña"
        leading-icon="lock"
        :rules="passwordRules"
        :error="!!errors.password"
        v-bind="errors.password ? { errorMessage: errors.password } : {}"
        @blur="validatePassword"
      />
    </div>
    
    <div class="login-form__options">
      <q-checkbox 
        v-model="form.rememberMe" 
        label="Recordarme"
        color="secondary"
        class="login-form__checkbox"
      />
      
      <router-link 
        to="/auth/forgot-password" 
        class="login-form__forgot-link text-secondary"
      >
        ¿Olvidaste tu contraseña?
      </router-link>
    </div>
    
    <div class="login-form__actions">
      <AppButton
        type="submit"
        label="Iniciar Sesión"
        variant="primary"
        :loading="isLoading"
        :disabled="!isFormValid"
        class="full-width"
      />
      
      <div class="login-form__divider">
        <span>o</span>
      </div>
      
      <div class="login-form__social">
        <AppButton
          label="Continuar con Google"
          variant="secondary"
          leading-icon="fab fa-google"
          class="full-width q-mb-sm"
          @click="handleGoogleLogin"
        />
        
        <AppButton
          label="Continuar con Facebook"
          variant="secondary"
          leading-icon="fab fa-facebook"
          class="full-width"
          @click="handleFacebookLogin"
        />
      </div>
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import AppInput from '../common/AppInput.vue';
import AppButton from '../common/AppButton.vue';

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

// Validation rules
const emailRules = [
  (val: string | number) => !!val || 'El correo electrónico es requerido',
  (val: string | number) => /.+@.+\..+/.test(String(val)) || 'Ingresa un correo electrónico válido',
];

const passwordRules = [
  (val: string | number) => !!val || 'La contraseña es requerida',
  (val: string | number) => String(val).length >= 6 || 'La contraseña debe tener al menos 6 caracteres',
];

// Computed properties
const isFormValid = computed(() => {
  return form.email && 
         form.password && 
         !errors.email && 
         !errors.password &&
         /.+@.+\..+/.test(form.email) &&
         form.password.length >= 6;
});

// Methods
const validateEmail = () => {
  errors.email = '';
  
  if (!form.email) {
    errors.email = 'El correo electrónico es requerido';
    return;
  }
  
  if (!/.+@.+\..+/.test(form.email)) {
    errors.email = 'Ingresa un correo electrónico válido';
  }
};

const validatePassword = () => {
  errors.password = '';
  
  if (!form.password) {
    errors.password = 'La contraseña es requerida';
    return;
  }
  
  if (form.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres';
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

const handleReset = () => {
  form.email = '';
  form.password = '';
  form.rememberMe = false;
  errors.email = '';
  errors.password = '';
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
  display: flex;
  flex-direction: column;
  gap: $spacing-large;
  
  &__fields {
    display: flex;
    flex-direction: column;
    gap: $spacing-medium;
  }
  
  &__options {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: $spacing-small;
  }
  
  &__checkbox {
    font-family: $font-family-primary;
    font-size: 14px;
  }
  
  &__forgot-link {
    font-family: $font-family-primary;
    font-size: 14px;
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  &__actions {
    display: flex;
    flex-direction: column;
    gap: $spacing-medium;
  }
  
  &__divider {
    position: relative;
    text-align: center;
    margin: $spacing-small 0;
    
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 1px;
      background: $light-grey;
    }
    
    span {
      background: $pure-white;
      padding: 0 $spacing-medium;
      color: $medium-grey;
      font-size: 14px;
      font-family: $font-family-primary;
    }
  }
  
  &__social {
    display: flex;
    flex-direction: column;
    gap: $spacing-small;
  }
}

// Responsive adjustments
@media (max-width: 600px) {
  .login-form {
    &__options {
      flex-direction: column;
      align-items: flex-start;
      gap: $spacing-medium;
    }
  }
}
</style> 