<template>
  <div class="user-greeting">
    <div class="user-greeting__avatar">
      <q-icon name="person" />
    </div>
    <div class="user-greeting__text">
      <h1 class="user-greeting__title">Good morning</h1>
      <p class="user-greeting__subtitle">Welcome back, {{ userName || 'User' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  userName?: string;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.user-greeting {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;

  &__avatar {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #ff4500, #ff6b35);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(255, 69, 0, 0.3);
    flex-shrink: 0;

    .q-icon {
      font-size: 24px;
      color: #ffffff;
    }
  }

  &__text {
    flex: 1;
  }

  &__title {
    font-size: 24px;
    font-weight: 600;
    margin: 0 0 2px 0;
    line-height: 1.2;
  }

  &__subtitle {
    font-size: 14px;
    margin: 0;
    line-height: 1.3;
  }
}

// Dark theme
.user-greeting {
  &__title {
    color: #ffffff;
  }
  &__subtitle {
    color: #b3b3b3;
  }
}

// Light theme
body:not(.body--dark) {
  .user-greeting {
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
  .user-greeting {
    &__title {
      color: #ffffff;
    }
    &__subtitle {
      color: #b3b3b3;
    }
  }
}
</style>