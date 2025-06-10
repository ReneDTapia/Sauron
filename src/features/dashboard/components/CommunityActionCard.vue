<template>
  <q-card class="community-action-card" @click="handleClick">
    <q-card-section class="community-action-card__content">
      <div class="community-action-card__info">
        <div class="community-action-card__icon" :class="`community-action-card__icon--${iconType}`">
          <q-icon :name="icon" />
        </div>
        <div class="community-action-card__text">
          <h4 class="community-action-card__title">{{ title }}</h4>
          <p class="community-action-card__subtitle">{{ subtitle }}</p>
        </div>
      </div>
      <div class="community-action-card__meta">
        <q-badge
          v-if="badge"
          :color="badgeColor"
          :label="badge"
          class="community-action-card__badge"
        />
        <q-icon name="chevron_right" class="community-action-card__chevron" />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
interface Props {
  icon: string;
  title: string;
  subtitle: string;
  iconType: 'events' | 'announcements' | 'support';
  badge?: string;
  badgeColor?: string;
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
.community-action-card {
  border-radius: 12px;
  box-shadow: none;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:active {
    transform: scale(0.98);
  }

  .q-card__section {
    padding: 16px;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 !important;
  }

  &__info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;

    .q-icon {
      font-size: 20px;
    }

    &--events {
      background: rgba(40, 167, 69, 0.15);
      .q-icon { color: #28a745; }
    }

    &--announcements {
      background: rgba(74, 144, 226, 0.15);
      .q-icon { color: #4a90e2; }
    }

    &--support {
      background: rgba(255, 193, 7, 0.15);
      .q-icon { color: #ffc107; }
    }
  }

  &__text {
    h4 {
      font-size: 14px;
      font-weight: 500;
      margin: 0 0 4px 0;
    }

    p {
      font-size: 12px;
      margin: 0;
    }
  }

  &__meta {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__badge {
    font-size: 11px;
  }

  &__chevron {
    font-size: 16px;
  }
}

// Dark theme
.community-action-card {
  background: #2d2d2d;
  border: 1px solid #2d2d2d;

  &__text {
    h4 {
      color: #ffffff;
    }
    p {
      color: #b3b3b3;
    }
  }

  &__chevron {
    color: #666666;
  }
}

// Light theme
body:not(.body--dark) {
  .community-action-card {
    background: #f5f5f5;
    border: 1px solid rgba(0, 0, 0, 0.06);

    &__text {
      h4 {
        color: #1a1a1a;
      }
      p {
        color: #666666;
      }
    }

    &__chevron {
      color: #999999;
    }
  }
}

// Dark mode media query
@media (prefers-color-scheme: dark) {
  .community-action-card {
    background: #2d2d2d;
    border: 1px solid #2d2d2d;

    &__text {
      h4 {
        color: #ffffff;
      }
      p {
        color: #b3b3b3;
      }
    }

    &__chevron {
      color: #666666;
    }
  }
}
</style>