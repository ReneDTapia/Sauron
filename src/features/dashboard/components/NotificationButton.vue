<template>
  <div class="notification-button" @click="handleClick">
    <q-icon name="notifications" />
    <div v-if="hasNotifications" class="notification-button__badge"></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  hasNotifications?: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  click: [];
}>();

function handleClick() {
  emit('click');
}
</script>

<style lang="scss" scoped>
.notification-button {
  position: relative;
  padding: 8px;
  margin: -8px;
  cursor: pointer;

  .q-icon {
    font-size: 24px;
  }

  &__badge {
    position: absolute;
    top: 4px;
    right: 4px;
    width: 12px;
    height: 12px;
    background: #ff4500;
    border-radius: 50%;
  }
}

// Dark theme
.notification-button {
  .q-icon {
    color: #b3b3b3;
  }
}

// Light theme
body:not(.body--dark) {
  .notification-button {
    .q-icon {
      color: #666666;
    }
  }
}

// Dark mode media query
@media (prefers-color-scheme: dark) {
  .notification-button {
    .q-icon {
      color: #b3b3b3;
    }
  }
}
</style>