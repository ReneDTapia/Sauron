<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
    </q-page-container>
    <TabBar :active-tab="currentTab" @tab-selected="handleTabSelected" />
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TabBar from 'src/components/TabBar.vue';

const route = useRoute();
const router = useRouter();
const currentTab = ref('home');

// Update active tab based on current route
watch(() => route.path, (newPath) => {
  if (newPath === '/home') {
    currentTab.value = 'home';
  } else if (newPath === '/visitor') {
    currentTab.value = 'visitor';
  }
}, { immediate: true });

function handleTabSelected(tabId: string) {
  currentTab.value = tabId;
  if (tabId === 'home') {
    void router.push('/home');
  } else if (tabId === 'visitor') {
    void router.push('/visitor');
  }
}
</script>
