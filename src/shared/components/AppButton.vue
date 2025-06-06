<template>
  <button
    :type="type || 'button'"
    :class="buttonClasses"
    :disabled="disabled || loading || false"
    v-bind="$attrs"
    @click="handleClick"
  >
    <!-- Loading spinner -->
    <svg v-if="loading" class="loading-spinner" viewBox="0 0 24 24">
      <circle class="loading-circle" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
    </svg>
    
    <!-- Leading icon -->
    <slot v-if="!loading && leadingIcon" name="leading-icon">
      <svg class="button-icon" viewBox="0 0 24 24" fill="none">
        <!-- Default icon placeholder -->
      </svg>
    </slot>
    
    <!-- Button text/content -->
    <span v-if="!loading" class="button-text">
      <slot>{{ label }}</slot>
    </span>
    
    <!-- Trailing icon -->
    <slot v-if="!loading && trailingIcon" name="trailing-icon">
      <svg class="button-icon" viewBox="0 0 24 24" fill="none">
        <!-- Default icon placeholder -->
      </svg>
    </slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  label?: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  disabled?: boolean;
  leadingIcon?: boolean;
  trailingIcon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  loading: false,
  disabled: false,
});

const emit = defineEmits<{
  click: [event: Event];
}>();

const buttonClasses = computed(() => [
  'app-button',
  `app-button--${props.variant}`,
  `app-button--${props.size}`,
  {
    'app-button--loading': props.loading,
    'app-button--disabled': props.disabled,
  }
]);

const handleClick = (event: Event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};
</script>

<style lang="scss" scoped>
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 12px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  
  &:focus {
    outline: 2px solid #1a1a1a;
    outline-offset: 2px;
  }
  
  &:hover:not(&--disabled):not(&--loading) {
    transform: translateY(-1px);
  }
  
  &:active:not(&--disabled):not(&--loading) {
    transform: translateY(0);
  }
  
  // Sizes
  &--sm {
    padding: 8px 16px;
    font-size: 14px;
    min-height: 36px;
  }
  
  &--md {
    padding: 12px 20px;
    font-size: 15px;
    min-height: 44px;
  }
  
  &--lg {
    padding: 16px 24px;
    font-size: 16px;
    min-height: 52px;
  }
  
  // Variants
  &--primary {
    background: #1a1a1a;
    color: #ffffff;
    
    &:hover:not(&--disabled):not(&--loading) {
      background: #2d2d2d;
      box-shadow: 0 4px 12px rgba(26, 26, 26, 0.15);
    }
  }
  
  &--secondary {
    background: #ffffff;
    color: #1a1a1a;
    border: 1.5px solid #e5e7eb;
    
    &:hover:not(&--disabled):not(&--loading) {
      background: #f9fafb;
      border-color: #d1d5db;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }
  }
  
  &--tertiary {
    background: transparent;
    color: #1a1a1a;
    
    &:hover:not(&--disabled):not(&--loading) {
      background: #f9fafb;
    }
  }
  
  &--destructive {
    background: #ef4444;
    color: #ffffff;
    
    &:hover:not(&--disabled):not(&--loading) {
      background: #dc2626;
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.15);
    }
  }
  
  // States
  &--loading {
    cursor: not-allowed;
    
    .button-text {
      opacity: 0;
    }
  }
  
  &--disabled {
    cursor: not-allowed;
    opacity: 0.6;
    transform: none !important;
    box-shadow: none !important;
  }
}

.button-text {
  transition: opacity 0.2s ease;
}

.button-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.loading-spinner {
  position: absolute;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

.loading-circle {
  stroke-dasharray: 31.416;
  stroke-dashoffset: 31.416;
  animation: loading 2s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes loading {
  0% {
    stroke-dasharray: 0 31.416;
  }
  50% {
    stroke-dasharray: 15.708 15.708;
  }
  100% {
    stroke-dasharray: 31.416 0;
  }
}

// Dark mode support
@media (prefers-color-scheme: dark) {
  .app-button {
    &:focus {
      outline-color: #ffffff;
    }
    
    &--primary {
      background: #ffffff;
      color: #1a1a1a;
      
      &:hover:not(&--disabled):not(&--loading) {
        background: #f5f5f5;
      }
    }
    
    &--secondary {
      background: #1f2937;
      color: #ffffff;
      border-color: #374151;
      
      &:hover:not(&--disabled):not(&--loading) {
        background: #374151;
        border-color: #4b5563;
      }
    }
    
    &--tertiary {
      color: #ffffff;
      
      &:hover:not(&--disabled):not(&--loading) {
        background: #1f2937;
      }
    }
  }
}
</style> 