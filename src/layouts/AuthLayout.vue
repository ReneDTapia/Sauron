<template>
  <q-layout view="lHh Lpr lFf" class="auth-layout">
    <q-page-container>
      <q-page class="auth-layout__page">
        <div class="auth-layout__container">
          <div class="auth-layout__brand">
            <div class="auth-layout__logo">
              <q-icon name="visibility" size="48px" color="primary" />
            </div>
            <h1 class="auth-layout__title">Sauron</h1>
            <p class="auth-layout__subtitle">
              Gestión inteligente de residencias
            </p>
          </div>
          
          <div class="auth-layout__content">
            <router-view />
          </div>
          
          <div class="auth-layout__footer">
            <p class="text-caption text-grey-6">
              © 2024 Sauron App. Todos los derechos reservados.
            </p>
          </div>
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
  background: linear-gradient(135deg, $pure-white 0%, $light-grey 100%);
  min-height: 100vh;
  
  &__page {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: $spacing-medium;
  }
  
  &__container {
    width: 100%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-large;
  }
  
  &__brand {
    text-align: center;
    margin-bottom: $spacing-medium;
  }
  
  &__logo {
    margin-bottom: $spacing-medium;
    
    .q-icon {
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    }
  }
  
  &__title {
    font-size: 32px;
    line-height: 40px;
    font-weight: 600;
    color: $obsidian-black;
    margin: 0;
    font-family: $font-family-primary;
    margin-bottom: $spacing-small;
  }
  
  &__subtitle {
    font-size: 16px;
    line-height: 24px;
    color: $medium-grey;
    margin: 0;
    font-family: $font-family-primary;
  }
  
  &__content {
    width: 100%;
    background: $pure-white;
    border-radius: $border-radius-card;
    padding: $spacing-xl;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border: 1px solid rgba(0, 0, 0, 0.04);
  }
  
  &__footer {
    text-align: center;
    padding-top: $spacing-medium;
  }
}

// Responsive design
@media (max-width: 600px) {
  .auth-layout {
    &__page {
      padding: $spacing-medium $spacing-small;
    }
    
    &__container {
      max-width: none;
    }
    
    &__content {
      padding: $spacing-large;
    }
    
    &__title {
      font-size: 28px;
      line-height: 36px;
    }
  }
}
</style> 