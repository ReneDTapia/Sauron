<template>
  <div class="app-input">
    <q-input
      v-model="inputValue"
      :label="label"
      :type="actualType"
      :outlined="true"
      :placeholder="placeholder"
      :disable="disabled"
      :readonly="readonly"
      :loading="loading"
      :error="hasError"
      :error-message="errorMessage"
      :hint="hint"
      :rules="rules"
      :lazy-rules="lazyRules"
      :class="inputClasses"
      :style="inputStyles"
      v-bind="$attrs"
      @update:model-value="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <template v-if="leadingIcon" #prepend>
        <q-icon :name="leadingIcon" :color="iconColor" />
      </template>
      
      <template #append>
        <!-- Password visibility toggle -->
        <q-icon
          v-if="type === 'password'"
          :name="showPassword ? 'visibility' : 'visibility_off'"
          :color="iconColor"
          class="cursor-pointer"
          @click="togglePasswordVisibility"
        />
        
        <!-- Clear button -->
        <q-icon
          v-else-if="clearable && modelValue"
          name="close"
          :color="iconColor"
          class="cursor-pointer"
          @click="clearInput"
        />
        
        <!-- Trailing icon -->
        <q-icon
          v-else-if="trailingIcon"
          :name="trailingIcon"
          :color="iconColor"
        />
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  modelValue?: string | number;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'textarea' | 'time' | 'date' | 'datetime-local' | 'file';
  disabled?: boolean;
  readonly?: boolean;
  loading?: boolean;
  error?: boolean;
  errorMessage?: string;
  hint?: string;
  rules?: Array<(val: string | number) => boolean | string>;
  lazyRules?: boolean;
  leadingIcon?: string;
  trailingIcon?: string;
  clearable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  loading: false,
  error: false,
  lazyRules: true,
  clearable: false,
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

const iconColor = computed(() => 
  hasError.value ? 'negative' : 'grey-6'
);

const inputClasses = computed(() => [
  'app-input__field',
  {
    'app-input__field--error': hasError.value,
    'app-input__field--disabled': props.disabled,
  }
]);

const inputStyles = computed(() => ({
  '--input-border-radius': '8px',
  '--input-font-family': 'Inter, sans-serif',
}));

const actualType = computed(() => {
  if (props.type === 'password') {
    return showPassword.value ? 'text' : 'password';
  }
  return props.type;
});

const handleInput = (value: string | number | null) => {
  emit('update:modelValue', value || '');
};

const handleFocus = (event: Event) => {
  emit('focus', event);
};

const handleBlur = (event: Event) => {
  emit('blur', event);
};

const clearInput = () => {
  emit('update:modelValue', '');
};

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};
</script>

<style lang="scss" scoped>
.app-input {
  &__field {
    font-family: var(--input-font-family);
    
    :deep(.q-field__control) {
      border-radius: var(--input-border-radius);
      min-height: 48px;
      
      &:before {
        border-color: $medium-grey;
        transition: border-color 200ms ease;
      }
      
      &:hover:before {
        border-color: $steel-blue;
      }
    }
    
    :deep(.q-field__native) {
      font-size: 14px;
      line-height: 20px;
      padding: 12px 16px;
    }
    
    :deep(.q-field__label) {
      font-size: 14px;
      color: $medium-grey;
      font-family: var(--input-font-family);
      transition: color 200ms ease;
    }
    
    :deep(.q-field--focused) {
      .q-field__label {
        color: $steel-blue;
      }
      
      .q-field__control:before {
        border-color: $steel-blue;
        border-width: 2px;
      }
    }
    
    :deep(.q-field--error) {
      .q-field__label {
        color: $error-red;
      }
      
      .q-field__control:before {
        border-color: $error-red;
      }
    }
    
    &--disabled {
      opacity: 0.6;
      
      :deep(.q-field__control) {
        background-color: $light-grey;
      }
    }
  }
}
</style> 