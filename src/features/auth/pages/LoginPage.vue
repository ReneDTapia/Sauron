<template>
  <div class="auth-flow">
    <Transition name="screen" mode="out-in">
      <!-- Welcome Screen -->
      <WelcomeScreen
        v-if="currentScreen === 'welcome'"
        key="welcome"
        @show-login="currentScreen = 'login'"
        @show-register="currentScreen = 'register'"
        @social-login="handleSocialLogin"
      />

      <!-- Email Login -->
      <EmailLoginScreen
        v-else-if="currentScreen === 'login'"
        key="login"
        @go-back="currentScreen = 'welcome'"
        @show-register="currentScreen = 'register'"
        @show-forgot-password="currentScreen = 'forgot'"
        @submit="handleLogin"
      />

      <!-- Register -->
      <RegisterScreen
        v-else-if="currentScreen === 'register'"
        key="register"
        @go-back="currentScreen = 'welcome'"
        @show-login="currentScreen = 'login'"
        @submit="handleRegister"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores/auth';
import WelcomeScreen from '../components/WelcomeScreen.vue';
import EmailLoginScreen from '../components/EmailLoginScreen.vue';
import RegisterScreen from '../components/RegisterScreen.vue';

type ScreenType = 'welcome' | 'login' | 'register' | 'forgot';

interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

const router = useRouter();
const $q = useQuasar();
const authStore = useAuthStore();

const currentScreen = ref<ScreenType>('welcome');

const handleLogin = async (data: LoginData) => {
  try {
    await authStore.login(data.email, data.password);

    $q.notify({
      type: 'positive',
      message: 'Login successful',
      position: 'top',
    });

    void router.push('/home');
  } catch (error) {
    console.error('Login error:', error);

    $q.notify({
      type: 'negative',
      message: 'Invalid credentials. Please try again.',
      position: 'top',
    });
  }
};

const handleRegister = (data: RegisterData) => {
  try {
    // TODO: Implement actual registration
    console.log('Register data:', data);

    $q.notify({
      type: 'positive',
      message: 'Account created successfully',
      position: 'top',
    });

    currentScreen.value = 'login';
  } catch (error) {
    console.error('Register error:', error);

    $q.notify({
      type: 'negative',
      message: 'Failed to create account. Please try again.',
      position: 'top',
    });
  }
};

const handleSocialLogin = (provider: 'google' | 'facebook') => {
  console.log(`Social login with ${provider}`);

  $q.notify({
    type: 'info',
    message: `${provider} login coming soon`,
    position: 'top',
  });
};
</script>

<style lang="scss" scoped>
.auth-flow {
  width: 100%;
  height: 100%;
}

// Smooth screen transitions
.screen-enter-active,
.screen-leave-active {
  transition: all 300ms ease-in-out;
}

.screen-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.screen-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.screen-enter-to,
.screen-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
