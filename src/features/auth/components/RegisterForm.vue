<template>
  <q-form @submit="handleSubmit" @reset="handleReset" class="register-form">
    <div class="register-form__fields">
      <AppInput
        v-model="form.name"
        label="Nombre completo"
        type="text"
        placeholder="Tu nombre completo"
        leading-icon="person"
        :rules="nameRules"
      />
      
      <AppInput
        v-model="form.email"
        label="Correo electrónico"
        type="email"
        placeholder="tu@email.com"
        leading-icon="mail"
        :rules="emailRules"
      />
      
      <AppInput
        v-model="form.password"
        label="Contraseña"
        type="password"
        placeholder="Mínimo 6 caracteres"
        leading-icon="lock"
        :rules="passwordRules"
      />
      
      <AppInput
        v-model="form.confirmPassword"
        label="Confirmar contraseña"
        type="password"
        placeholder="Confirma tu contraseña"
        leading-icon="lock"
        :rules="confirmPasswordRules"
      />
    </div>
    
    <div class="register-form__terms">
      <q-checkbox 
        v-model="form.acceptTerms" 
        color="secondary"
        class="register-form__checkbox"
      >
        <span class="register-form__terms-text">
          Acepto los 
          <router-link to="/terms" class="text-secondary">
            términos y condiciones
          </router-link>
          y la 
          <router-link to="/privacy" class="text-secondary">
            política de privacidad
          </router-link>
        </span>
      </q-checkbox>
    </div>
    
    <div class="register-form__actions">
      <AppButton
        type="submit"
        label="Crear Cuenta"
        variant="primary"
        :loading="isLoading"
        :disabled="!isFormValid"
        class="full-width"
      />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
import AppInput from 'src/shared/components/AppInput.vue';
import AppButton from 'src/shared/components/AppButton.vue';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const emit = defineEmits<{
  submit: [data: RegisterForm];
}>();

const form = reactive<RegisterForm>({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
});

const isLoading = ref(false);

// Validation rules
const nameRules = [
  (val: string | number) => !!val || 'El nombre es requerido',
  (val: string | number) => String(val).length >= 2 || 'El nombre debe tener al menos 2 caracteres',
];

const emailRules = [
  (val: string | number) => !!val || 'El correo electrónico es requerido',
  (val: string | number) => /.+@.+\..+/.test(String(val)) || 'Ingresa un correo electrónico válido',
];

const passwordRules = [
  (val: string | number) => !!val || 'La contraseña es requerida',
  (val: string | number) => String(val).length >= 6 || 'La contraseña debe tener al menos 6 caracteres',
];

const confirmPasswordRules = [
  (val: string | number) => !!val || 'Confirma tu contraseña',
  (val: string | number) => String(val) === form.password || 'Las contraseñas no coinciden',
];

// Computed properties
const isFormValid = computed(() => {
  return form.name && 
         form.email && 
         form.password && 
         form.confirmPassword &&
         form.acceptTerms &&
         String(form.name).length >= 2 &&
         /.+@.+\..+/.test(String(form.email)) &&
         String(form.password).length >= 6 &&
         form.password === String(form.confirmPassword);
});

// Methods
const handleSubmit = () => {
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
  form.name = '';
  form.email = '';
  form.password = '';
  form.confirmPassword = '';
  form.acceptTerms = false;
};
</script>

<style lang="scss" scoped>
.register-form {
  display: flex;
  flex-direction: column;
  gap: $spacing-large;
  
  &__fields {
    display: flex;
    flex-direction: column;
    gap: $spacing-medium;
  }
  
  &__terms {
    padding: $spacing-small 0;
  }
  
  &__checkbox {
    font-family: $font-family-primary;
    font-size: 14px;
    align-items: flex-start;
  }
  
  &__terms-text {
    font-family: $font-family-primary;
    font-size: 14px;
    line-height: 20px;
    color: $dark-grey;
    
    a {
      text-decoration: none;
      font-weight: 500;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
  
  &__actions {
    display: flex;
    flex-direction: column;
    gap: $spacing-medium;
  }
}
</style> 