<template>
  <div class="analytics-section">
    <div v-if="!analytics" class="loading-container">
      <q-spinner size="40px" color="primary" />
      <p>Cargando análisis...</p>
    </div>

    <div v-else class="analytics-content">
      <!-- Usage by Type Chart -->
      <div class="chart-card">
        <div class="chart-header">
          <div class="chart-title">
            <q-icon name="pie_chart" />
            <h3>Uso por Tipo</h3>
          </div>
        </div>
        <div class="chart-content">
          <div class="chart-items">
            <div v-for="(item, type) in analytics.usageByType" :key="type" class="chart-item">
              <div class="item-indicator" :class="`indicator--${type}`"></div>
              <div class="item-info">
                <span class="item-label">{{ getTypeLabel(type) }}</span>
                <div class="item-stats">
                  <span class="item-count">{{ item.count }}</span>
                  <span class="item-percentage">({{ item.percentage.toFixed(1) }}%)</span>
                </div>
              </div>
              <div class="item-bar">
                <div
                  class="bar-fill"
                  :class="`bar--${type}`"
                  :style="{ width: `${item.percentage}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Status Distribution Chart -->
      <div class="chart-card">
        <div class="chart-header">
          <div class="chart-title">
            <q-icon name="donut_small" />
            <h3>Estado de QR</h3>
          </div>
        </div>
        <div class="chart-content">
          <div class="chart-items">
            <div
              v-for="(item, status) in analytics.statusDistribution"
              :key="status"
              class="chart-item"
            >
              <div class="item-indicator" :class="`indicator--${status}`"></div>
              <div class="item-info">
                <span class="item-label">{{ getStatusLabel(status) }}</span>
                <div class="item-stats">
                  <span class="item-count">{{ item.count }}</span>
                  <span class="item-percentage">({{ item.percentage.toFixed(1) }}%)</span>
                </div>
              </div>
              <div class="item-bar">
                <div
                  class="bar-fill"
                  :class="`bar--status-${status}`"
                  :style="{ width: `${item.percentage}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="summary-cards">
        <div class="summary-card">
          <div class="summary-icon">
            <q-icon name="trending_up" />
          </div>
          <div class="summary-content">
            <h4>Tipo más usado</h4>
            <p>{{ mostUsedType }}</p>
          </div>
        </div>

        <div class="summary-card">
          <div class="summary-icon">
            <q-icon name="access_time" />
          </div>
          <div class="summary-content">
            <h4>Tiempo promedio</h4>
            <p>2.5 horas</p>
          </div>
        </div>

        <div class="summary-card">
          <div class="summary-icon">
            <q-icon name="check_circle" />
          </div>
          <div class="summary-content">
            <h4>Tasa de éxito</h4>
            <p>{{ successRate }}%</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { QRAnalytics } from 'src/shared/types/models';

interface Props {
  analytics: QRAnalytics | null;
}

const props = defineProps<Props>();

// Computed properties
const mostUsedType = computed(() => {
  if (!props.analytics) return 'N/A';

  let maxCount = 0;
  let mostUsed = 'N/A';

  Object.entries(props.analytics.usageByType).forEach(([type, data]) => {
    if (data.count > maxCount) {
      maxCount = data.count;
      mostUsed = getTypeLabel(type);
    }
  });

  return mostUsed;
});

const successRate = computed(() => {
  if (!props.analytics) return '0';

  const used = props.analytics.statusDistribution.usados?.percentage || 0;
  const active = props.analytics.statusDistribution.activos?.percentage || 0;

  return (used + active).toFixed(0);
});

// Methods
const getTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    visitante: 'Visitante',
    entrega: 'Entrega',
    servicio: 'Servicio',
    emergencia: 'Emergencia',
  };
  return labels[type] || type;
};

const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    activos: 'Activos',
    usados: 'Usados',
    expirados: 'Expirados',
  };
  return labels[status] || status;
};
</script>

<style lang="scss" scoped>
.analytics-section {
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 64px 24px;
    text-align: center;
    color: var(--text-secondary);

    p {
      margin-top: 16px;
      font-size: 16px;
    }
  }

  .analytics-content {
    display: grid;
    gap: 24px;
  }
}

.chart-card {
  background: var(--bg-card-solid);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .chart-header {
    margin-bottom: 20px;

    .chart-title {
      display: flex;
      align-items: center;
      gap: 8px;

      .q-icon {
        color: var(--color-primary);
        font-size: 24px;
      }

      h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: var(--text-primary);
      }
    }
  }

  .chart-content {
    .chart-items {
      display: flex;
      flex-direction: column;
      gap: 16px;

      .chart-item {
        display: flex;
        align-items: center;
        gap: 12px;

        .item-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          flex-shrink: 0;

          &--visitante {
            background: #2196f3;
          }

          &--entrega {
            background: #4caf50;
          }

          &--servicio {
            background: #ff9800;
          }

          &--emergencia {
            background: #f44336;
          }

          &--activos {
            background: #4caf50;
          }

          &--usados {
            background: #2196f3;
          }

          &--expirados {
            background: #f44336;
          }
        }

        .item-info {
          min-width: 120px;

          .item-label {
            font-weight: 500;
            color: var(--text-primary);
            display: block;
            margin-bottom: 2px;
          }

          .item-stats {
            font-size: 12px;
            color: var(--text-secondary);

            .item-count {
              font-weight: 600;
            }

            .item-percentage {
              margin-left: 4px;
            }
          }
        }

        .item-bar {
          flex: 1;
          height: 8px;
          background: rgba(128, 128, 128, 0.2);
          border-radius: 4px;
          overflow: hidden;

          .bar-fill {
            height: 100%;
            border-radius: 4px;
            transition: width 0.3s ease;

            &.bar--visitante {
              background: linear-gradient(90deg, #2196f3, #21cbf3);
            }

            &.bar--entrega {
              background: linear-gradient(90deg, #4caf50, #8bc34a);
            }

            &.bar--servicio {
              background: linear-gradient(90deg, #ff9800, #ffc107);
            }

            &.bar--emergencia {
              background: linear-gradient(90deg, #f44336, #e91e63);
            }

            &.bar--status-activos {
              background: linear-gradient(90deg, #4caf50, #8bc34a);
            }

            &.bar--status-usados {
              background: linear-gradient(90deg, #2196f3, #21cbf3);
            }

            &.bar--status-expirados {
              background: linear-gradient(90deg, #f44336, #e91e63);
            }
          }
        }
      }
    }
  }
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;

  .summary-card {
    background: var(--bg-card-solid);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 16px;

    .summary-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: linear-gradient(135deg, var(--color-ember), var(--color-ember-light));
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 24px;
      flex-shrink: 0;
    }

    .summary-content {
      flex: 1;

      h4 {
        margin: 0 0 4px 0;
        font-size: 14px;
        font-weight: 500;
        color: var(--text-secondary);
      }

      p {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: var(--text-primary);
      }
    }
  }
}

@media (max-width: 768px) {
  .chart-card {
    padding: 20px;

    .chart-content {
      .chart-items {
        .chart-item {
          .item-info {
            min-width: 100px;
          }
        }
      }
    }
  }

  .summary-cards {
    grid-template-columns: 1fr;

    .summary-card {
      padding: 16px;

      .summary-icon {
        width: 40px;
        height: 40px;
        font-size: 20px;
      }
    }
  }
}
</style>
