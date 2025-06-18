<template>
  <div class="statistics-card" :class="`statistics-card--${color}`">
    <div class="card-content">
      <div class="card-header">
        <div class="card-icon">
          <q-icon :name="icon" />
        </div>
        <div class="card-title">{{ title }}</div>
      </div>

      <div class="card-body">
        <div class="card-value">{{ value }}</div>
        <div class="card-change" :class="changeClass">
          <q-icon :name="changeIcon" size="14px" />
          <span>{{ Math.abs(change) }} vs mes anterior</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title: string;
  value: string;
  change: number;
  icon: string;
  color: string;
}

const props = defineProps<Props>();

const changeClass = computed(() => {
  return props.change >= 0 ? 'card-change--positive' : 'card-change--negative';
});

const changeIcon = computed(() => {
  return props.change >= 0 ? 'arrow_upward' : 'arrow_downward';
});
</script>

<style lang="scss" scoped>
.statistics-card {
  background: var(--bg-card-solid);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border-left: 4px solid transparent;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  &--blue {
    border-left-color: #2196f3;
    .card-icon {
      background: linear-gradient(135deg, #2196f3, #21cbf3);
    }
  }

  &--green {
    border-left-color: #4caf50;
    .card-icon {
      background: linear-gradient(135deg, #4caf50, #8bc34a);
    }
  }

  &--purple {
    border-left-color: #9c27b0;
    .card-icon {
      background: linear-gradient(135deg, #9c27b0, #e91e63);
    }
  }

  &--orange {
    border-left-color: #ff9800;
    .card-icon {
      background: linear-gradient(135deg, #ff9800, #ff5722);
    }
  }
}

.card-content {
  .card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;

    .card-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 24px;
    }

    .card-title {
      font-size: 14px;
      font-weight: 500;
      color: var(--text-secondary);
      flex: 1;
    }
  }

  .card-body {
    .card-value {
      font-size: 32px;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 8px;
      line-height: 1;
    }

    .card-change {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      font-weight: 500;

      &--positive {
        color: #4caf50;
      }

      &--negative {
        color: #f44336;
      }
    }
  }
}

@media (max-width: 768px) {
  .statistics-card {
    padding: 20px;

    .card-content {
      .card-body {
        .card-value {
          font-size: 28px;
        }
      }
    }
  }
}
</style>
