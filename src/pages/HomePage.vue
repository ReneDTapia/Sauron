<template>
  <q-page class="home">
    <!-- Header Section -->
    <div class="home__header">
      <div class="home__header-content">
        <div class="home__user-info">
          <div class="home__avatar" @click="goToProfile">
            <q-icon name="person" />
          </div>
          <div class="home__greeting">
            <h1 class="home__greeting-title">Good morning</h1>
            <p class="home__greeting-subtitle">Welcome back, {{ userName || 'User' }}</p>
          </div>
        </div>
        <div class="home__notifications">
          <q-btn
            flat
            round
            :icon="$q.dark.isActive ? 'light_mode' : 'dark_mode'"
            @click="$q.dark.toggle()"
            class="home__theme-toggle"
          />
          <q-icon name="notifications" />
          <div class="home__notification-badge"></div>
        </div>
      </div>

      <!-- Community Info Card -->
      <div class="home__community-card">
        <div class="home__community-content">
          <div class="home__community-info">
            <h3 class="home__community-name">Residencial Vista Verde</h3>
            <p class="home__community-unit">Building A, Unit 204</p>
          </div>
          <div class="home__status-badge">Active</div>
        </div>
      </div>
    </div>

    <!-- Quick Actions Section -->
    <div class="home__content">
      <h2 class="home__section-title">Quick Actions</h2>

      <!-- Primary Actions Grid -->
      <div class="home__primary-actions">
        <div
          v-for="action in primaryActions"
          :key="action.id"
          class="home__action-card"
          @click="handleActionClick(action)"
        >
          <div class="home__action-content">
            <div class="home__action-icon" :class="`home__action-icon--${action.id}`">
              <q-icon :name="action.icon" />
            </div>
            <h3 class="home__action-title">{{ action.label }}</h3>
            <p class="home__action-subtitle">{{ action.subtitle }}</p>
          </div>
        </div>
      </div>

      <!-- Secondary Actions List -->
      <h3 class="home__section-subtitle">Community</h3>
      <div class="home__secondary-actions">
        <div
          v-for="action in secondaryActions"
          :key="action.id"
          class="home__list-card"
          @click="handleActionClick(action)"
        >
          <div class="home__list-content">
            <div class="home__list-info">
              <div class="home__list-icon" :class="`home__list-icon--${action.id}`">
                <q-icon :name="action.icon" />
              </div>
              <div class="home__list-text">
                <h4 class="home__list-title">{{ action.label }}</h4>
                <p class="home__list-subtitle">{{ action.subtitle }}</p>
              </div>
            </div>
            <div class="home__list-meta">
              <div
                v-if="action.badge"
                :class="`home__list-badge home__list-badge--${action.badgeColor}`"
              >
                {{ action.badge }}
              </div>
              <q-icon name="chevron_right" class="home__list-chevron" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom spacing for tab bar -->
    <div class="home__bottom-spacing"></div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores/auth';

interface QuickAction {
  id: string;
  icon: string;
  label: string;
  subtitle: string;
  route?: string;
  badge?: string;
  badgeColor?: string;
}

const router = useRouter();
const $q = useQuasar();
const authStore = useAuthStore();

// Get user name for greeting
const { userName } = authStore;

// Primary actions (2x2 grid)
const primaryActions = ref<QuickAction[]>([
  {
    id: 'visitor',
    icon: 'qr_code',
    label: 'Visitor QR',
    subtitle: 'Generate access code',
    route: '/visitor',
  },
  {
    id: 'reserve',
    icon: 'calendar_today',
    label: 'Reserve Space',
    subtitle: 'Book amenities',
    route: '/reservations',
  },
  {
    id: 'report',
    icon: 'warning',
    label: 'Report',
    subtitle: 'Submit incident',
    route: '/reports',
  },
  {
    id: 'settings',
    icon: 'settings',
    label: 'Settings',
    subtitle: 'App preferences',
    route: '/settings',
  },
]);

// Secondary actions (list style)
const secondaryActions = ref<QuickAction[]>([
  {
    id: 'events',
    icon: 'event',
    label: 'Events',
    subtitle: 'Community activities',
    badge: '2 New',
    badgeColor: 'orange',
    route: '/events',
  },
  {
    id: 'announcements',
    icon: 'campaign',
    label: 'Announcements',
    subtitle: 'Important updates',
    badge: '1 New',
    badgeColor: 'negative',
    route: '/announcements',
  },
  {
    id: 'support',
    icon: 'help',
    label: 'Support',
    subtitle: 'Get help & contact',
    route: '/support',
  },
]);

// Methods
function handleActionClick(action: QuickAction) {
  if (action.route) {
    void router.push(action.route);
  }
}

function goToProfile() {
  void router.push('/profile');
}
</script>

<style lang="scss" scoped>
.home {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;

  &__header {
    padding: 32px 24px 24px;

    &-content {
      display: flex;
      align-items: center;
      justify-content: space-between; /* Distributes space between items */
      margin-bottom: 24px;
    }
  }

  &__user-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__avatar {
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, var(--color-ember), var(--color-ember-light));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px rgba(255, 69, 0, 0.3);
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }

    .q-icon {
      font-size: 24px;
      color: #ffffff;
    }
  }

  &__greeting {
    display: flex;
    flex-direction: column; /* Stacks title and subtitle vertically */

    &-title {
      font-size: 24px;
      font-weight: 600;
      margin: 0;
      color: var(--text-primary);
    }

    &-subtitle {
      font-size: 14px;
      color: var(--text-secondary);
      margin: 0;
    }
  }

  &__notifications {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;

    .q-icon {
      font-size: 24px;
      color: var(--text-secondary);
    }
  }

  &__theme-toggle {
    .q-icon {
      color: var(--text-secondary);
      font-size: 20px;
    }

    &:hover .q-icon {
      color: var(--text-primary);
    }
  }

  &__notification-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 12px;
    height: 12px;
    background: var(--color-ember);
    border-radius: 50%;
  }

  &__community-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 16px;
  }

  &__community-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__community-info {
    h3 {
      font-size: 16px;
      font-weight: 500;
      color: var(--text-primary);
      margin: 0 0 4px 0;
    }

    p {
      font-size: 14px;
      color: var(--text-secondary);
      margin: 0;
    }
  }

  &__status-badge {
    background: rgba(40, 167, 69, 0.2);
    color: #28a745;
    border: 1px solid rgba(40, 167, 69, 0.3);
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 500;
  }

  &__content {
    padding: 0 24px 24px;
  }

  &__section-title {
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 16px 0;
    color: var(--text-primary);
  }

  &__section-subtitle {
    font-size: 16px;
    font-weight: 500;
    margin: 24px 0 12px 0;
    color: var(--text-secondary);
  }

  &__primary-actions {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin-bottom: 24px;
  }

  &__action-card {
    background: var(--bg-card-solid);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:active {
      transform: scale(0.95);
    }
  }

  &__action-content {
    padding: 16px;
    text-align: center;
  }

  &__action-icon {
    width: 48px;
    height: 48px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 12px;

    .q-icon {
      font-size: 24px;
    }

    &--visitor {
      background: rgba(255, 69, 0, 0.15);
      .q-icon {
        color: var(--color-ember);
      }
    }

    &--reserve {
      background: rgba(74, 144, 226, 0.15);
      .q-icon {
        color: var(--color-info);
      }
    }

    &--report {
      background: rgba(255, 193, 7, 0.15);
      .q-icon {
        color: var(--color-warning);
      }
    }

    &--settings {
      background: rgba(153, 153, 153, 0.15);
      .q-icon {
        color: var(--color-medium-grey);
      }
    }
  }

  &__action-title {
    font-size: 14px;
    font-weight: 500;
    margin: 0 0 4px 0;
    color: var(--text-primary);
  }

  &__action-subtitle {
    font-size: 12px;
    color: var(--text-secondary);
    margin: 0;
  }

  &__secondary-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__list-card {
    background: var(--bg-card-solid);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    cursor: pointer;
    transition: transform 0.2s ease;

    &:active {
      transform: scale(0.98);
    }
  }

  &__list-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
  }

  &__list-info {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__list-icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;

    .q-icon {
      font-size: 20px;
    }

    &--events {
      background: rgba(40, 167, 69, 0.15);
      .q-icon {
        color: var(--color-success);
      }
    }

    &--announcements {
      background: rgba(74, 144, 226, 0.15);
      .q-icon {
        color: var(--color-info);
      }
    }

    &--support {
      background: rgba(255, 193, 7, 0.15);
      .q-icon {
        color: var(--color-warning);
      }
    }
  }

  &__list-text {
    h4 {
      font-size: 14px;
      font-weight: 500;
      margin: 0 0 4px 0;
      color: var(--text-primary);
    }

    p {
      font-size: 12px;
      color: var(--text-secondary);
      margin: 0;
    }
  }

  &__list-meta {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__list-badge {
    font-size: 11px;
    padding: 2px 6px;
    border-radius: 8px;
    font-weight: 500;

    &--orange {
      background: rgba(255, 69, 0, 0.2);
      color: var(--color-ember);
      border: 1px solid rgba(255, 69, 0, 0.3);
    }

    &--negative {
      background: rgba(220, 53, 69, 0.2);
      color: var(--color-error);
      border: 1px solid rgba(220, 53, 69, 0.3);
    }
  }

  &__list-chevron {
    font-size: 16px;
    color: var(--text-muted);
  }

  &__bottom-spacing {
    height: 100px; // Space for tab bar
  }
}
</style>
