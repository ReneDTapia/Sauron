<template>
  <q-card class="community-card">
    <q-card-section class="community-card__content">
      <div class="community-card__info">
        <h3 class="community-card__name">{{ communityName }}</h3>
        <p class="community-card__unit">{{ unitInfo }}</p>
      </div>
      <q-badge 
        :color="statusColor" 
        :label="statusLabel" 
        class="community-card__status"
      />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
interface Props {
  communityName: string;
  unitInfo: string;
  statusLabel: string;
  statusColor?: string;
}

withDefaults(defineProps<Props>(), {
  statusColor: 'positive'
});
</script>

<style lang="scss" scoped>
.community-card {
  border-radius: 12px;
  box-shadow: none;

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
    h3 {
      font-size: 16px;
      font-weight: 500;
      margin: 0 0 4px 0;
    }

    p {
      font-size: 14px;
      margin: 0;
    }
  }
}

// Dark theme
.community-card {
  background: linear-gradient(135deg, #2d2d2d, #333333);
  border: 1px solid #2d2d2d;

  &__info {
    h3 {
      color: #ffffff;
    }
    p {
      color: #b3b3b3;
    }
  }
}

// Light theme
body:not(.body--dark) {
  .community-card {
    background: #f5f5f5;
    border: 1px solid rgba(0, 0, 0, 0.06);

    &__info {
      h3 {
        color: #1a1a1a;
      }
      p {
        color: #666666;
      }
    }
  }
}

// Dark mode media query
@media (prefers-color-scheme: dark) {
  .community-card {
    background: linear-gradient(135deg, #2d2d2d, #333333);
    border: 1px solid #2d2d2d;

    &__info {
      h3 {
        color: #ffffff;
      }
      p {
        color: #b3b3b3;
      }
    }
  }
}
</style>