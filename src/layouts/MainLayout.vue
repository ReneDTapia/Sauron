<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Floating Action Button -->
    <q-page-sticky v-if="showFab" position="bottom-right" :offset="[18, 100]">
      <q-btn
        fab
        icon="qr_code_scanner"
        color="primary"
        text-color="white"
        @click="goToVisitorPage"
        class="fab-button"
      >
        <div class="fab-plus-icon">+</div>
      </q-btn>
    </q-page-sticky>

    <TabBar :active-tab="currentTab" @tab-selected="handleTabSelected" />
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TabBar from 'src/components/TabBar.vue';

const route = useRoute();
const router = useRouter();
const currentTab = ref('home');

// Computed property to control FAB visibility
const showFab = computed(() => {
  return route.path !== '/visitor';
});

// Update active tab based on current route
watch(
  () => route.path,
  (newPath) => {
    if (newPath === '/home') {
      currentTab.value = 'home';
    } else if (newPath === '/qrHistory') {
      currentTab.value = 'qr_history';
    }
  },
  { immediate: true },
);

function handleTabSelected(tabId: string) {
  currentTab.value = tabId;
  if (tabId === 'home') {
    void router.push('/home');
  } else if (tabId === 'qr_history') {
    void router.push('/qrHistory');
  }
}

function goToVisitorPage() {
  void router.push('/visitor');
}
</script>

<style lang="scss" scoped>
.fab-button {
  position: relative;
  overflow: visible;
}

.fab-plus-icon {
  position: absolute;
  top: -2px;
  right: -2px;
  background-color: white;
  color: var(--color-ember);
  border-radius: 50%;
  width: 22px;
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  border: 2px solid var(--color-ember);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
