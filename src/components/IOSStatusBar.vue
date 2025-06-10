<template>
  <div class="ios-status-bar">
    <div class="ios-status-bar__time">9:41</div>
    <div class="ios-status-bar__indicators">
      <q-icon name="signal_cellular_alt" class="ios-status-bar__icon" />
      <q-icon name="wifi" class="ios-status-bar__icon" />
      <q-icon name="battery_full" class="ios-status-bar__icon ios-status-bar__icon--battery" />
    </div>
  </div>
</template>

<script setup lang="ts">
// iOS status bar component
</script>

<style lang="scss" scoped>
.ios-status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px 4px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
  position: relative;
  z-index: 10;

  &__time {
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
  }

  &__indicators {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  &__icon {
    font-size: 16px;
    color: #ffffff;
    
    &--battery {
      font-size: 18px;
      width: 24px;
      height: 12px;
    }
  }
}

// Light mode override
@media (prefers-color-scheme: light) {
  body:not(.body--dark) {
    .ios-status-bar {
      color: #1a1a1a;

      &__time {
        color: #1a1a1a;
      }

      &__icon {
        color: #1a1a1a;
      }
    }
  }
}

// Dark mode support
@media (prefers-color-scheme: dark) {
  .ios-status-bar {
    color: #ffffff;

    &__time {
      color: #ffffff;
    }

    &__icon {
      color: #ffffff;
    }
  }
}

body.body--dark {
  .ios-status-bar {
    color: #ffffff;

    &__time {
      color: #ffffff;
    }

    &__icon {
      color: #ffffff;
    }
  }
}
</style>