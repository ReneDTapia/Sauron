<template>
  <q-btn
    :class="buttonClasses"
    :color="computedColor"
    :text-color="computedTextColor"
    :outline="variant === 'secondary'"
    :flat="variant === 'tertiary'"
    :loading="loading"
    :disable="disabled"
    :size="size"
    :rounded="rounded"
    :no-caps="noCaps"
    :style="buttonStyles"
    v-bind="$attrs"
    @click="handleClick"
  >
    <q-icon
      v-if="leadingIcon"
      :name="leadingIcon"
      :size="iconSize"
      class="q-mr-xs"
    />
    
    <span v-if="label">{{ label }}</span>
    <slot v-else />
    
    <q-icon
      v-if="trailingIcon"
      :name="trailingIcon"
      :size="iconSize"
      class="q-ml-xs"
    />
  </q-btn>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  label?: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive';
  size?: string;
  loading?: boolean;
  disabled?: boolean;
  rounded?: boolean;
  noCaps?: boolean;
  leadingIcon?: string;
  trailingIcon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  loading: false,
  disabled: false,
  rounded: true,
  noCaps: true,
});

const emit = defineEmits<{
  click: [event: Event];
}>();

const computedColor = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'primary'; // Ember Orange
    case 'secondary':
      return 'secondary'; // Steel Blue
    case 'tertiary':
      return 'secondary'; // Steel Blue text
    case 'destructive':
      return 'negative'; // Error Red
    default:
      return 'primary';
  }
});

const computedTextColor = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'white';
    case 'secondary':
      return 'secondary';
    case 'tertiary':
      return 'secondary';
    case 'destructive':
      return 'white';
    default:
      return 'white';
  }
});

const iconSize = computed(() => {
  switch (props.size) {
    case 'xs':
      return '16px';
    case 'sm':
      return '18px';
    case 'md':
      return '20px';
    case 'lg':
      return '24px';
    case 'xl':
      return '28px';
    default:
      return '20px';
  }
});

const buttonClasses = computed(() => [
  'app-button',
  `app-button--${props.variant}`,
]);

const buttonStyles = computed(() => ({
  borderRadius: '8px',
  fontFamily: 'Inter, sans-serif',
  fontWeight: props.variant === 'primary' || props.variant === 'destructive' ? '600' : '500',
  minHeight: '44px', // Touch target
  textTransform: 'none',
}));

const handleClick = (event: Event) => {
  if (!props.disabled && !props.loading) {
    emit('click', event);
  }
};
</script>

<style lang="scss" scoped>
@use "sass:color";

.app-button {
  transition: all 200ms ease-out;
  
  &:hover:not(.disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
  }
  
  &:active:not(.disabled) {
    transform: scale(0.98);
  }
  
  &--primary {
    background: $ember-orange;
    
    &:hover:not(.disabled) {
      background: color.adjust($ember-orange, $lightness: -5%);
    }
  }
  
  &--destructive {
    background: $error-red;
    
    &:hover:not(.disabled) {
      background: color.adjust($error-red, $lightness: -5%);
    }
  }
}
</style> 