<template>
  <div class="tab-bar">
    <div class="tab-bar__container">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        class="tab"
        :class="{ 'tab--active': tab.id === activeTab }"
        @click="selectTab(tab.id)"
      >
        <div class="tab__icon">
          <q-icon :name="tab.icon" />
        </div>
        <div class="tab__label">
          {{ tab.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Tab {
  id: string;
  icon: string;
  label: string;
  route?: string;
}

interface Props {
  activeTab?: string;
}

withDefaults(defineProps<Props>(), {
  activeTab: 'home',
});

const emit = defineEmits<{
  tabSelected: [tabId: string];
}>();

const tabs = ref<Tab[]>([
  {
    id: 'home',
    icon: 'home',
    label: 'Home',
    route: '/home',
  },
  {
    id: 'qr_history',
    icon: 'history',
    label: 'QR History',
    route: '/qrHistory',
  },
]);

function selectTab(tabId: string) {
  emit('tabSelected', tabId);
}
</script>

<style lang="scss" scoped>
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--tab-bar-bg);
  backdrop-filter: blur(20px);
  border-top: 1px solid var(--tab-bar-border);
  padding-bottom: env(safe-area-inset-bottom, 0);
  z-index: 1000;

  &__container {
    display: flex;
    justify-content: center;
    max-width: 400px;
    margin: 0 auto;
  }
}

.tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 8px 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  max-width: 120px;

  &__icon {
    font-size: 22px;
    color: var(--text-muted);
    margin-bottom: 4px;
    transition: color 0.2s ease;
  }

  &__label {
    font-size: 10px;
    font-weight: 500;
    color: var(--text-muted);
    transition: color 0.2s ease;
  }

  &--active {
    .tab__icon,
    .tab__label {
      color: var(--color-ember);
    }
  }

  &:active {
    transform: scale(0.95);
  }
}
</style>
