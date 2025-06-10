<template>
  <q-card class="quick-action-card" @click="handleClick">
    <q-card-section class="quick-action-card__content">
      <div class="quick-action-card__icon" :class="`quick-action-card__icon--${iconType}`">
        <q-icon :name="icon" />
      </div>
      <h3 class="quick-action-card__title">{{ title }}</h3>
      <p class="quick-action-card__subtitle">{{ subtitle }}</p>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
interface Props {
  icon: string;
  title: string;
  subtitle: string;
  iconType: 'visitor' | 'reserve' | 'report' | 'settings';
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
.quick-action-card {
  border-radius: 12px;
  box-shadow: none;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:active {
    transform: scale(0.95);
  }

  .q-card__section {
    padding: 16px;
    text-align: center;
  }

  &__content {
    padding: 0 !important;
  }

  &__icon {
    width: 48px;
    height: 48px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 12px;

    .q-icon {
      font-size: 24px;
    }

    &--visitor {
      background: rgba(255, 69, 0, 0.15);
      .q-icon { color: #ff4500; }
    }

    &--reserve {
      background: rgba(74, 144, 226, 0.15);
      .q-icon { color: #4a90e2; }
    }

    &--report {
      background: rgba(255, 193, 7, 0.15);
      .q-icon { color: #ffc107; }
    }

    &--settings {
      background: rgba(153, 153, 153, 0.15);
      .q-icon { color: #999999; }
    }
  }

  &__title {
    font-size: 14px;
    font-weight: 500;
    margin: 0 0 4px 0;
  }

  &__subtitle {
    font-size: 12px;
    margin: 0;
  }
}

// Dark theme
.quick-action-card {
  background: #2d2d2d;
  border: 1px solid #2d2d2d;

  &__title {
    color: #ffffff;
  }

  &__subtitle {
    color: #b3b3b3;
  }
}

// Light theme
body:not(.body--dark) {
  .quick-action-card {
    background: #f5f5f5;
    border: 1px solid rgba(0, 0, 0, 0.06);

    &__title {
      color: #1a1a1a;
    }

    &__subtitle {
      color: #666666;
    }
  }
}

// Dark mode media query
@media (prefers-color-scheme: dark) {
  .quick-action-card {
    background: #2d2d2d;
    border: 1px solid #2d2d2d;

    &__title {
      color: #ffffff;
    }

    &__subtitle {
      color: #b3b3b3;
    }
  }
}
</style>