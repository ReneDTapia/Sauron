<template>
  <div class="app-input">
    <div class="input-wrapper">
      <input
        v-model="inputValue"
        :type="actualType"
        :placeholder="placeholder || ''"
        :disabled="disabled || false"
        :readonly="readonly || false"
        :class="inputClasses"
        v-bind="autocomplete ? { autocomplete } : {}"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
      />
      
      <!-- Trailing icon -->
      <button
        v-if="type === 'password'"
        type="button"
        class="input-icon"
        @click="togglePasswordVisibility"
        :aria-label="showPassword ? 'Hide password' : 'Show password'"
      >
        <svg v-if="showPassword" viewBox="0 0 24 24" fill="none" class="icon-svg">
          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24m-5.66-2.12a11 11 0 0 1 13.06 0m-9.54 4.24a11 11 0 0 0 7.56 0M12 3c5.525 0 10 7 10 9s-4.475 9-10 9S2 14 2 12s4.475-9 10-9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3 3l18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" class="icon-svg">
          <path d="M12 3c5.525 0 10 7 10 9s-4.475 9-10 9S2 14 2 12s4.475-9 10-9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    
    <!-- Error message -->
    <div v-if="hasError && errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  modelValue?: string | number;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
  disabled?: boolean;
  readonly?: boolean;
  error?: boolean;
  errorMessage?: string;
  autocomplete?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  error: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string | number];
  focus: [event: Event];
  blur: [event: Event];
}>();

const showPassword = ref(false);

const inputValue = computed({
  get: () => props.modelValue || '',
  set: (value) => emit('update:modelValue', value)
});

const hasError = computed(() => props.error || !!props.errorMessage);

const inputClasses = computed(() => [
  'input-field',
  {
    'input-field--error': hasError.value,
    'input-field--disabled': props.disabled,
  }
]);

const actualType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password';
  }
  return props.type;
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const handleFocus = (event: Event) => {
  emit('focus', event);
};

const handleBlur = (event: Event) => {
  emit('blur', event);
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style lang="scss" scoped>
.app-input {
  width: 100%;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

.input-field {
  width: 100%;
  padding: 16px 16px;
  border: 1.5px solid #e5e7eb;
  border-radius: 12px;
  font-size: 16px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #ffffff;
  transition: all 0.2s ease;
  outline: none;
  color: #1f2937;
  
  &::placeholder {
    color: #9ca3af;
    font-weight: 400;
  }
  
  &:focus {
    border-color: #1a1a1a;
    box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.08);
    background: #ffffff;
  }
  
  &:hover:not(:focus):not(:disabled) {
    border-color: #d1d5db;
  }
  
  &--error {
    border-color: #ef4444;
    
    &:focus {
      border-color: #ef4444;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.08);
    }
  }
  
  &--disabled {
    background: #f9fafb;
    color: #9ca3af;
    cursor: not-allowed;
    
    &::placeholder {
      color: #d1d5db;
    }
  }
  
  // Password field adjustments
  &[type="password"] {
    padding-right: 48px;
  }
}

.input-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #374151;
    background: #f9fafb;
  }
  
  &:focus {
    outline: 2px solid #1a1a1a;
    outline-offset: 2px;
  }
}

.icon-svg {
  width: 18px;
  height: 18px;
}

.error-message {
  display: block;
  margin-top: 6px;
  font-size: 14px;
  color: #ef4444;
  font-weight: 400;
}

// Dark mode support
@media (prefers-color-scheme: dark) {
  .input-field {
    background: #1f2937;
    border-color: #374151;
    color: #ffffff;
    
    &::placeholder {
      color: #6b7280;
    }
    
    &:focus {
      background: #1f2937;
      border-color: #ffffff;
      box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.08);
    }
    
    &:hover:not(:focus):not(:disabled) {
      border-color: #4b5563;
    }
    
    &--disabled {
      background: #374151;
      color: #6b7280;
      
      &::placeholder {
        color: #4b5563;
      }
    }
  }
  
  .input-icon {
    color: #9ca3af;
    
    &:hover {
      color: #e5e7eb;
      background: #374151;
    }
    
    &:focus {
      outline-color: #ffffff;
    }
  }
}

// iOS specific adjustments
@supports (-webkit-appearance: none) {
  .input-field {
    font-size: 16px; // Prevent zoom on iOS
    -webkit-appearance: none;
  }
}
</style> 