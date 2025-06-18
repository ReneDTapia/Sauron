<template>
  <div class="qr-card" :class="`qr-card--${qrCode.status}`">
    <div class="card-header">
      <div class="card-identity">
        <div class="identity-icon" :class="`icon--${qrCode.type}`">
          <q-icon :name="typeIcon" />
        </div>
        <div class="identity-info">
          <h3 class="identity-name">{{ qrCode.name }}</h3>
          <p class="identity-purpose">{{ qrCode.purpose }}</p>
        </div>
      </div>
      <div class="card-status">
        <q-chip :color="statusColor" text-color="white" :label="statusLabel" size="sm" />
      </div>
    </div>

    <div class="card-details">
      <div class="detail-item">
        <q-icon name="schedule" size="16px" />
        <div class="detail-content">
          <span class="detail-label">Creado:</span>
          <span class="detail-value">{{ formatDate(qrCode.createdAt) }}</span>
        </div>
      </div>

      <div class="detail-item">
        <q-icon name="access_time" size="16px" />
        <div class="detail-content">
          <span class="detail-label">Expira:</span>
          <span class="detail-value">{{ formatDate(qrCode.expiresAt) }}</span>
        </div>
      </div>

      <div v-if="qrCode.usedAt" class="detail-item">
        <q-icon name="check_circle" size="16px" />
        <div class="detail-content">
          <span class="detail-label">Usado:</span>
          <span class="detail-value">{{ formatDate(qrCode.usedAt) }}</span>
        </div>
      </div>

      <div class="detail-item">
        <q-icon name="phone" size="16px" />
        <div class="detail-content">
          <span class="detail-label">Teléfono:</span>
          <span class="detail-value">{{ qrCode.phone }}</span>
        </div>
      </div>

      <div v-if="qrCode.vehicle" class="detail-item">
        <q-icon name="directions_car" size="16px" />
        <div class="detail-content">
          <span class="detail-label">Vehículo:</span>
          <span class="detail-value">{{ qrCode.vehicle }}</span>
        </div>
      </div>
    </div>

    <div v-if="qrCode.accessRecords.length > 0" class="access-records">
      <h4 class="records-title">Registro de accesos:</h4>
      <div class="records-list">
        <div v-for="record in qrCode.accessRecords" :key="record.id" class="record-item">
          <div class="record-icon" :class="`record-icon--${record.type}`">
            <q-icon :name="record.type === 'entrada' ? 'login' : 'logout'" />
          </div>
          <div class="record-info">
            <span class="record-type">{{ record.type === 'entrada' ? 'Entrada' : 'Salida' }}</span>
            <span class="record-location">{{ record.location }}</span>
          </div>
          <div class="record-time">
            {{ formatTime(record.timestamp) }}
          </div>
        </div>
      </div>
    </div>

    <div class="card-actions">
      <q-btn
        flat
        icon="visibility"
        label="Ver"
        color="primary"
        size="sm"
        @click="$emit('view', qrCode)"
      />
      <q-btn
        flat
        icon="download"
        label="Descargar"
        color="grey-7"
        size="sm"
        @click="$emit('download', qrCode)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { QRCode } from 'src/shared/types/models';

interface Props {
  qrCode: QRCode;
}

const props = defineProps<Props>();

defineEmits<{
  view: [qrCode: QRCode];
  download: [qrCode: QRCode];
}>();

// Computed properties
const typeIcon = computed(() => {
  const icons = {
    visitante: 'person',
    entrega: 'local_shipping',
    servicio: 'build',
    emergencia: 'emergency',
  };
  return icons[props.qrCode.type];
});

const statusColor = computed(() => {
  const colors = {
    activo: 'green',
    usado: 'blue',
    expirado: 'red',
  };
  return colors[props.qrCode.status];
});

const statusLabel = computed(() => {
  const labels = {
    activo: 'Activo',
    usado: 'Usado',
    expirado: 'Expirado',
  };
  return labels[props.qrCode.status];
});

// Methods
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};
</script>

<style lang="scss" scoped>
.qr-card {
  background: var(--bg-card-solid);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border-left: 4px solid transparent;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  &--activo {
    border-left-color: #4caf50;
  }

  &--usado {
    border-left-color: #2196f3;
  }

  &--expirado {
    border-left-color: #f44336;
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .card-identity {
    display: flex;
    gap: 12px;
    align-items: center;
    flex: 1;

    .identity-icon {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 24px;
      flex-shrink: 0;

      // Diferentes colores según el tipo
      &.icon--visitante {
        background: linear-gradient(135deg, #2196f3, #21cbf3);
      }

      &.icon--entrega {
        background: linear-gradient(135deg, #4caf50, #8bc34a);
      }

      &.icon--servicio {
        background: linear-gradient(135deg, #ff9800, #ffc107);
      }

      &.icon--emergencia {
        background: linear-gradient(135deg, #f44336, #e91e63);
      }
    }

    .identity-info {
      flex: 1;
      min-width: 0;

      .identity-name {
        font-size: 18px;
        font-weight: 600;
        color: var(--text-primary);
        margin: 0 0 4px 0;
        word-break: break-word;
        line-height: 1.3;
      }

      .identity-purpose {
        font-size: 14px;
        color: var(--text-secondary);
        margin: 0;
        word-break: break-word;
      }
    }
  }

  .card-status {
    flex-shrink: 0;
  }
}

.card-details {
  display: grid;
  gap: 12px;
  margin-bottom: 20px;

  .detail-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;

    .q-icon {
      color: var(--text-secondary);
      flex-shrink: 0;
    }

    .detail-content {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      flex: 1;

      .detail-label {
        color: var(--text-secondary);
        font-weight: 500;
      }

      .detail-value {
        color: var(--text-primary);
      }
    }
  }
}

.access-records {
  margin-bottom: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);

  .records-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 12px 0;
  }

  .records-list {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .record-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
      background: var(--bg-secondary);
      border-radius: 8px;
      font-size: 12px;

      .record-icon {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 12px;

        &--entrada {
          background: #4caf50;
        }

        &--salida {
          background: #f44336;
        }
      }

      .record-info {
        flex: 1;
        display: flex;
        flex-direction: column;

        .record-type {
          font-weight: 500;
          color: var(--text-primary);
        }

        .record-location {
          color: var(--text-secondary);
        }
      }

      .record-time {
        color: var(--text-secondary);
        font-size: 11px;
      }
    }
  }
}

.card-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  padding-top: 16px;
  border-top: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .qr-card {
    padding: 20px;

    .card-header {
      .card-identity {
        .identity-icon {
          width: 40px;
          height: 40px;
          font-size: 20px;
        }

        .identity-info {
          .identity-name {
            font-size: 16px;
          }
        }
      }
    }

    .card-actions {
      justify-content: stretch;

      .q-btn {
        flex: 1;
      }
    }
  }
}
</style>
