<template>
  <div class="qr-list-section">
    <!-- Search and Filters -->
    <div class="list-header">
      <div class="search-container">
        <q-input
          v-model="searchQuery"
          placeholder="Buscar por nombre, propósito o ID..."
          filled
          dense
          clearable
          class="search-input"
          color="primary"
          @update:model-value="handleSearch"
        >
          <template #prepend>
            <q-icon name="search" color="grey-6" />
          </template>
        </q-input>
      </div>

      <div class="filters-container">
        <q-select
          v-model="selectedStatus"
          :options="statusOptions"
          label="Estado"
          filled
          dense
          emit-value
          map-options
          class="filter-select"
          color="primary"
          behavior="menu"
          popup-content-class="filter-popup"
          @update:model-value="applyFilters"
        >
          <template #prepend>
            <q-icon name="circle" size="xs" />
          </template>
        </q-select>

        <q-select
          v-model="selectedType"
          :options="typeOptions"
          label="Tipo"
          filled
          dense
          emit-value
          map-options
          class="filter-select"
          color="primary"
          behavior="menu"
          popup-content-class="filter-popup"
          @update:model-value="applyFilters"
        >
          <template #prepend>
            <q-icon name="category" size="xs" />
          </template>
        </q-select>
      </div>
    </div>

    <!-- QR Cards List -->
    <div class="qr-cards-container">
      <div v-if="loading" class="loading-container">
        <q-spinner size="40px" color="primary" />
        <p>Cargando códigos QR...</p>
      </div>

      <div v-else-if="filteredQRCodes.length === 0" class="empty-state">
        <q-icon name="qr_code_scanner" size="64px" color="grey-4" />
        <h3>No hay códigos QR</h3>
        <p>No se encontraron códigos QR que coincidan con tu búsqueda.</p>
      </div>

      <div v-else class="qr-cards-grid">
        <div v-if="searchLoading" class="search-overlay">
          <q-spinner size="24px" color="primary" />
        </div>
        <QRCard
          v-for="qr in filteredQRCodes"
          :key="qr.id"
          :qr-code="qr"
          :class="{ 'card-searching': searchLoading }"
          @view="viewQRDetails"
          @download="downloadQR"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { QRCode } from 'src/shared/types/models';
import QRCard from './QRCard.vue';

interface Props {
  qrCodes: QRCode[];
  loading?: boolean;
  searchLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  searchLoading: false,
});

const emit = defineEmits<{
  search: [query: string];
}>();

// Reactive state
const searchQuery = ref('');
const selectedStatus = ref('all');
const selectedType = ref('all');

// Options for filters
const statusOptions = [
  { label: 'Todos los estados', value: 'all' },
  { label: 'Activos', value: 'activo' },
  { label: 'Usados', value: 'usado' },
  { label: 'Expirados', value: 'expirado' },
];

const typeOptions = [
  { label: 'Todos los tipos', value: 'all' },
  { label: 'Visitante', value: 'visitante' },
  { label: 'Entrega', value: 'entrega' },
  { label: 'Servicio', value: 'servicio' },
  { label: 'Emergencia', value: 'emergencia' },
];

// Computed properties
const filteredQRCodes = computed(() => {
  let filtered = [...props.qrCodes];

  // Filter by status
  if (selectedStatus.value !== 'all') {
    filtered = filtered.filter((qr) => qr.status === selectedStatus.value);
  }

  // Filter by type
  if (selectedType.value !== 'all') {
    filtered = filtered.filter((qr) => qr.type === selectedType.value);
  }

  return filtered;
});

// Methods
const handleSearch = (value: string | number | null) => {
  if (typeof value === 'string') {
    emit('search', value);
  }
};

const applyFilters = () => {
  // Filters are applied automatically through computed property
};

const viewQRDetails = (qrCode: QRCode) => {
  console.log('View QR details:', qrCode);
  // Implementar lógica para ver detalles
};

const downloadQR = (qrCode: QRCode) => {
  console.log('Download QR:', qrCode);
  // Implementar lógica para descargar
};

// Watch for external changes
watch(
  () => props.qrCodes,
  () => {
    // Reset filters when QR codes change
  },
  { immediate: true },
);
</script>

<style lang="scss" scoped>
.qr-list-section {
  .list-header {
    background: var(--bg-card-solid);
    border: 1px solid var(--border-color);
    padding: 28px;
    border-radius: 20px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    margin-bottom: 24px;

    .search-container {
      margin-bottom: 20px;

      .search-input {
        width: 100%;
        max-width: 500px;

        :deep(.q-field__control) {
          border-radius: 12px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
        }

        :deep(.q-field--filled.q-field--focused .q-field__control) {
          background: var(--bg-secondary);
        }

        :deep(.q-field__native) {
          color: var(--text-primary);
          font-size: 16px;
        }

        :deep(.q-field__label) {
          color: var(--text-secondary);
        }
      }
    }

    .filters-container {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;

      .filter-select {
        min-width: 160px;
        flex: 1;

        :deep(.q-field__control) {
          border-radius: 12px;
          background: var(--bg-secondary);
          border: 1px solid var(--border-color);
        }

        :deep(.q-field--filled.q-field--focused .q-field__control) {
          background: var(--bg-secondary);
        }

        :deep(.q-field__native) {
          color: var(--text-primary);
        }

        :deep(.q-field__label) {
          color: var(--text-secondary);
        }
      }
    }
  }

  .qr-cards-container {
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

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 64px 24px;
      text-align: center;

      h3 {
        margin: 16px 0 8px 0;
        color: var(--text-secondary);
        font-weight: 500;
      }

      p {
        margin: 0;
        color: var(--text-secondary);
      }
    }

    .qr-cards-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
      position: relative;

      .search-overlay {
        position: absolute;
        top: 8px;
        right: 16px;
        background: var(--bg-card-solid);
        border: 1px solid var(--border-color);
        border-radius: 8px;
        padding: 8px 12px;
        display: flex;
        align-items: center;
        gap: 8px;
        z-index: 10;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }

      :deep(.card-searching) {
        opacity: 0.7;
        pointer-events: none;
      }
    }
  }
}

@media (max-width: 768px) {
  .qr-list-section {
    .list-header {
      padding: 20px;

      .filters-container {
        flex-direction: column;
        gap: 12px;

        .filter-select {
          min-width: auto;
          width: 100%;
        }
      }
    }

    .qr-cards-container {
      .qr-cards-grid {
        .search-overlay {
          top: 4px;
          right: 8px;
        }
      }
    }
  }
}
</style>
