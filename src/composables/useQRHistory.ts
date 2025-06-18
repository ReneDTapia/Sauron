import { ref, computed } from 'vue';
import type { QRCode, QRStatistics, QRAnalytics } from 'src/shared/types/models';
import { QRServiceFactory } from 'src/services/qr.service';

interface StatisticItem {
  title: string;
  value: string;
  change: number;
  icon: string;
  color: string;
}

export function useQRHistory() {
  // Services (Dependency Injection)
  const statisticsService = QRServiceFactory.createStatisticsService();
  const dataService = QRServiceFactory.createDataService();

  // Reactive state
  const loading = ref(false);
  const searchLoading = ref(false);
  const rawStatistics = ref<QRStatistics | null>(null);
  const qrCodes = ref<QRCode[]>([]);
  const analytics = ref<QRAnalytics | null>(null);

  // Computed properties
  const statistics = computed<StatisticItem[]>(() => {
    if (!rawStatistics.value) return [];

    return [
      {
        title: 'QR Generados',
        value: rawStatistics.value.qrGenerated.total.toString(),
        change: rawStatistics.value.qrGenerated.changeFromPrevious,
        icon: 'qr_code',
        color: 'blue',
      },
      {
        title: 'Visitantes Activos',
        value: rawStatistics.value.activeVisitors.total.toString(),
        change: rawStatistics.value.activeVisitors.changeFromPrevious,
        icon: 'people',
        color: 'green',
      },
      {
        title: 'Accesos Hoy',
        value: rawStatistics.value.todayAccess.total.toString(),
        change: rawStatistics.value.todayAccess.changeFromPrevious,
        icon: 'check_circle',
        color: 'purple',
      },
      {
        title: 'Tasa de Uso',
        value: `${rawStatistics.value.usageRate.percentage}%`,
        change: rawStatistics.value.usageRate.changeFromPrevious,
        icon: 'trending_up',
        color: 'orange',
      },
    ];
  });

  // Methods
  const loadData = async () => {
    loading.value = true;
    try {
      const [statsData, qrData, analyticsData] = await Promise.all([
        statisticsService.getStatistics(),
        dataService.getQRCodes(),
        statisticsService.getAnalytics(),
      ]);

      rawStatistics.value = statsData;
      qrCodes.value = qrData;
      analytics.value = analyticsData;
    } finally {
      loading.value = false;
    }
  };

  const searchQRCodes = async (query: string) => {
    searchLoading.value = true;
    try {
      if (query.trim() === '') {
        qrCodes.value = await dataService.getQRCodes();
      } else {
        qrCodes.value = await dataService.searchQRCodes(query);
      }
    } finally {
      searchLoading.value = false;
    }
  };

  const refreshData = async () => {
    await loadData();
  };

  return {
    // State
    loading,
    searchLoading,
    statistics,
    qrCodes,
    analytics,

    // Methods
    loadData,
    searchQRCodes,
    refreshData,
  };
}
