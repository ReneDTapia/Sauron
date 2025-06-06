<template>
  <q-layout class="auth-layout">
    <q-page-container>
      <q-page class="auth-page">
        <div class="auth-container">
          <router-view />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
// No need for additional logic in this layout component
</script>

<style lang="scss" scoped>
.auth-layout {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #ffffff;
}

.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.auth-container {
  width: 100%;
  max-width: 400px;
}

// Dark mode support
@media (prefers-color-scheme: dark) {
  .auth-layout {
    background: #121212;
  }
}

body.body--dark {
  .auth-layout {
    background: #121212;
  }
}
</style>