<template>
  <q-page class="profile">
    <!-- Header -->
    <div class="profile__header">
      <q-btn flat round icon="arrow_back" @click="goBack" class="profile__back-btn" />
      <h1 class="profile__title">Perfil</h1>
    </div>

    <!-- User Info Section -->
    <div class="profile__content">
      <div class="profile__user-section">
        <div class="profile__avatar">
          <q-icon name="person" />
        </div>
        <h2 class="profile__user-name">{{ userName || 'Usuario' }}</h2>
        <p class="profile__user-email">{{ user?.email || 'usuario@ejemplo.com' }}</p>
      </div>

      <!-- Community Info -->
      <div class="profile__section">
        <h3 class="profile__section-title">Información de la Comunidad</h3>
        <div class="profile__info-card">
          <div class="profile__info-item">
            <span class="profile__info-label">Comunidad:</span>
            <span class="profile__info-value">Residencial Vista Verde</span>
          </div>
          <div class="profile__info-item">
            <span class="profile__info-label">Edificio:</span>
            <span class="profile__info-value">Building A</span>
          </div>
          <div class="profile__info-item">
            <span class="profile__info-label">Unidad:</span>
            <span class="profile__info-value">Unit 204</span>
          </div>
          <div class="profile__info-item">
            <span class="profile__info-label">Estado:</span>
            <span class="profile__status-active">Activo</span>
          </div>
        </div>
      </div>

      <!-- Settings Section -->
      <div class="profile__section">
        <h3 class="profile__section-title">Configuración</h3>
        <div class="profile__settings-list">
          <div class="profile__setting-item">
            <div class="profile__setting-info">
              <q-icon name="notifications" class="profile__setting-icon" />
              <span class="profile__setting-label">Notificaciones</span>
            </div>
            <q-toggle v-model="notificationsEnabled" />
          </div>

          <div class="profile__setting-item">
            <div class="profile__setting-info">
              <q-icon name="dark_mode" class="profile__setting-icon" />
              <span class="profile__setting-label">Modo Oscuro</span>
            </div>
            <q-toggle :model-value="$q.dark.isActive" @update:model-value="$q.dark.toggle()" />
          </div>

          <div class="profile__setting-item">
            <div class="profile__setting-info">
              <q-icon name="language" class="profile__setting-icon" />
              <span class="profile__setting-label">Idioma</span>
            </div>
            <span class="profile__setting-value">Español</span>
          </div>
        </div>
      </div>

      <!-- Logout Section -->
      <div class="profile__logout-section">
        <q-btn
          class="profile__logout-btn"
          color="negative"
          outline
          no-caps
          size="lg"
          @click="handleLogout"
        >
          <q-icon name="logout" class="q-mr-sm" />
          Cerrar Sesión
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores/auth';

const router = useRouter();
const $q = useQuasar();
const authStore = useAuthStore();

// User data
const { userName, user } = authStore;

// Settings
const notificationsEnabled = ref(true);

// Methods
const goBack = () => {
  router.back();
};

const handleLogout = () => {
  try {
    authStore.logout();

    $q.notify({
      type: 'positive',
      message: 'Sesión cerrada correctamente',
      position: 'top',
    });

    void router.push('/auth');
  } catch (error) {
    console.error('Logout error:', error);

    $q.notify({
      type: 'negative',
      message: 'Error al cerrar sesión',
      position: 'top',
    });
  }
};
</script>

<style lang="scss" scoped>
.profile {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;

  &__header {
    display: flex;
    align-items: center;
    padding: 16px 0px 0px 24px;
    border-bottom: 1px solid var(--border-color);
  }

  &__back-btn {
    .q-icon {
      color: var(--text-primary);
    }
  }

  &__title {
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 0 16px;
    color: var(--text-primary);
  }

  &__spacer {
    flex: 1;
  }

  &__content {
    padding: 24px 24px 60px 24px;
  }

  &__user-section {
    text-align: center;
    margin-bottom: 32px;
  }

  &__avatar {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, var(--color-ember), var(--color-ember-light));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    box-shadow: 0 4px 12px rgba(255, 69, 0, 0.3);

    .q-icon {
      font-size: 40px;
      color: #ffffff;
    }
  }

  &__user-name {
    font-size: 24px;
    font-weight: 600;
    margin: 0 0 8px 0;
    color: var(--text-primary);
  }

  &__user-email {
    font-size: 16px;
    color: var(--text-secondary);
    margin: 0;
  }

  &__section {
    margin-bottom: 32px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__section-title {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 16px 0;
    color: var(--text-primary);
  }

  &__info-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 16px;
  }

  &__info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;

    &:not(:last-child) {
      border-bottom: 1px solid var(--border-color);
    }
  }

  &__info-label {
    font-size: 14px;
    color: var(--text-secondary);
    font-weight: 500;
  }

  &__info-value {
    font-size: 14px;
    color: var(--text-primary);
  }

  &__status-active {
    font-size: 14px;
    color: #28a745;
    font-weight: 500;
  }

  &__settings-list {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    overflow: hidden;
  }

  &__setting-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;

    &:not(:last-child) {
      border-bottom: 1px solid var(--border-color);
    }
  }

  &__setting-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__setting-icon {
    font-size: 20px;
    color: var(--text-secondary);
  }

  &__setting-label {
    font-size: 16px;
    color: var(--text-primary);
  }

  &__setting-value {
    font-size: 14px;
    color: var(--text-secondary);
  }

  &__logout-section {
    border-radius: 12px;
    padding: 0px 20px;
    margin-bottom: 50px;
  }

  &__logout-btn {
    width: 100%;
    min-height: 48px;
    padding: 16px;
    font-size: 16px;
    font-weight: 600;
    border-width: 2px;

    .q-btn__content {
      gap: 0px;
    }

    &:hover {
      background-color: rgba(220, 53, 69, 0.1);
    }
  }
}
</style>
