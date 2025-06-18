<template>
  <q-page class="qr-history-page">
    <!-- Header -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-text">
          <h1 class="page-title">Historial de QR</h1>
          <p class="page-subtitle">Gestiona y revisa todos los códigos QR generados</p>
        </div>
        <!-- <q-btn flat round icon="download" color="primary" class="export-btn" @click="exportData">
          <q-tooltip>Exportar</q-tooltip>
        </q-btn> -->
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="statistics-section">
      <StatisticsCard
        v-for="stat in statistics"
        :key="stat.title"
        :title="stat.title"
        :value="stat.value"
        :change="stat.change"
        :icon="stat.icon"
        :color="stat.color"
      />
    </div>

    <!-- Content Tabs -->
    <div class="content-section">
      <q-tabs
        v-model="activeTab"
        class="content-tabs"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="list" label="Lista de QR" />
        <q-tab name="analysis" label="Análisis" />
      </q-tabs>

      <q-tab-panels v-model="activeTab" class="tab-panels">
        <!-- QR List Tab -->
        <q-tab-panel name="list" class="list-panel">
          <QRListSection
            :qr-codes="qrCodes"
            :loading="loading"
            :search-loading="searchLoading"
            @search="handleSearch"
          />
        </q-tab-panel>

        <!-- Analysis Tab -->
        <q-tab-panel name="analysis" class="analysis-panel">
          <AnalyticsSection :analytics="analytics" />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Notify } from 'quasar';
import StatisticsCard from '../components/qr-history/StatisticsCard.vue';
import QRListSection from '../components/qr-history/QRListSection.vue';
import AnalyticsSection from '../components/qr-history/AnalyticsSection.vue';
import { useQRHistory } from '../composables/useQRHistory';

// Reactive state
const activeTab = ref('list');

// Composable for QR history logic
const { statistics, qrCodes, analytics, loading, searchLoading, loadData, searchQRCodes } =
  useQRHistory();

// Methods
const handleSearch = async (query: string) => {
  try {
    await searchQRCodes(query);
  } catch {
    Notify.create({
      type: 'negative',
      message: 'Error al buscar códigos QR',
    });
  }
};

// const exportData = () => {
//   Notify.create({
//     type: 'positive',
//     message: 'Exportando datos...',
//   });
//   // Implementar lógica de exportación
// };

// Lifecycle
onMounted(async () => {
  try {
    await loadData();
  } catch {
    Notify.create({
      type: 'negative',
      message: 'Error al cargar los datos',
    });
  }
});
</script>

<style lang="scss" scoped>
.qr-history-page {
  padding: 0 0 120px 0; // Espacio suficiente para el tab bar
  background: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
}

.page-header {
  background: var(--bg-primary);
  color: var(--text-primary);
  padding: 32px 16px 24px;
  margin-bottom: 24px;

  .header-content {
    display: flex;
    align-items: flex-start;
    max-width: 1200px;
    margin: 0 auto;
    gap: 16px;
  }

  .header-text {
    flex: 1;
  }

  .page-title {
    font-size: 28px;
    font-weight: 700;
    margin: 0 0 8px 0;
    color: var(--text-primary);
  }

  .page-subtitle {
    font-size: 16px;
    margin: 0;
    color: var(--text-secondary);
    font-weight: 400;
  }
}

.statistics-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  padding: 0 16px;
  margin-bottom: 24px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.content-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}

.content-tabs {
  background: var(--bg-card-solid);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
  color: var(--text-primary);
}

.tab-panels {
  background: transparent;
}

.list-panel,
.analysis-panel {
  padding: 0;
}
</style>
