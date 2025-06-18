<template>
  <q-page class="visitor-qr-page" :class="{ 'plates-input-focused': isPlatesInputFocused }">
    <!-- Show form when not showing QR -->
    <div v-if="!showQR">
      <!-- Header -->
      <div class="page-header">
        <!-- <div class="header-content">
          <div class="header-text">
            <h1 class="page-title">Generar QR</h1>
            <p class="page-subtitle">Completa el formulario para crear un nuevo acceso.</p>
          </div>
        </div> -->
      </div>

      <!-- Form Section -->
      <div class="form-section">
        <q-form @submit.prevent="generateQR" class="visitor-form">
          <div class="form-header">
            <div class="form-icon">
              <q-icon name="person_add" size="24px" />
            </div>
            <div class="form-title-section">
              <h2 class="form-title">Información del Visitante</h2>
              <p class="form-subtitle">Ingresa los datos necesarios para el acceso</p>
            </div>
          </div>

          <div class="form-content">
            <div class="form-grid">
              <!-- Guest Name -->
              <div class="input-group">
                <label class="input-label">Nombre del visitante *</label>
                <q-input
                  v-model="guestForm.name"
                  placeholder="Ingresa el nombre completo"
                  filled
                  dense
                  lazy-rules
                  :rules="[(val) => !!val || 'El nombre es obligatorio']"
                  class="modern-input"
                  @focus="scrollToInput"
                >
                  <template #prepend>
                    <div class="input-icon">
                      <q-icon name="person" />
                    </div>
                  </template>
                </q-input>
              </div>

              <!-- Purpose -->
              <div class="input-group">
                <label class="input-label">Propósito de la visita *</label>
                <q-select
                  v-model="guestForm.purpose"
                  :options="selectOptions"
                  filled
                  dense
                  lazy-rules
                  :rules="[
                    (val) => (!!val && val !== 'placeholder') || 'El propósito es obligatorio',
                  ]"
                  behavior="menu"
                  popup-content-class="filter-popup"
                  class="modern-input"
                  emit-value
                  map-options
                >
                  <template #prepend>
                    <div class="input-icon">
                      <q-icon name="work" />
                    </div>
                  </template>
                </q-select>
              </div>

              <!-- Phone Number -->
              <div class="input-group">
                <label class="input-label">Número de teléfono *</label>
                <q-input
                  v-model="guestForm.phone"
                  placeholder="Ej: +52 555 123 4567"
                  filled
                  dense
                  mask="+52 ### ### ####"
                  lazy-rules
                  :rules="[(val) => !!val || 'El número de teléfono es obligatorio']"
                  class="modern-input"
                  @focus="scrollToInput"
                >
                  <template #prepend>
                    <div class="input-icon">
                      <q-icon name="phone" />
                    </div>
                  </template>
                </q-input>
              </div>

              <!-- Vehicle Plates -->
              <div class="input-group">
                <label class="input-label">Placas del vehículo *</label>
                <q-input
                  v-model="guestForm.plates"
                  placeholder="Ej: ABC-123-XYZ"
                  filled
                  dense
                  lazy-rules
                  :rules="[
                    (val) => !!val || 'Las placas del vehículo son obligatorias',
                    (val) =>
                      /^[A-Z]{3}-\d{3}-[A-Z]{3}$/.test(val.toUpperCase()) ||
                      'Formato inválido. Usa: ABC-123-XYZ',
                  ]"
                  class="modern-input"
                  mask="AAA-###-AAA"
                  fill-mask
                  @update:model-value="formatPlates"
                  @focus="handlePlatesInputFocus"
                  @blur="handlePlatesInputBlur"
                >
                  <template #prepend>
                    <div class="input-icon">
                      <q-icon name="directions_car" />
                    </div>
                  </template>
                </q-input>
              </div>
            </div>

            <!-- Actions -->
            <div class="form-actions">
              <q-btn
                type="submit"
                label="Generar Código QR"
                icon="qr_code_scanner"
                color="primary"
                class="generate-button"
                size="lg"
                :loading="isGenerating"
                :disable="!isFormValid"
                no-caps
              />
            </div>
          </div>
        </q-form>
      </div>
    </div>

    <!-- Generated QR Display -->
    <div v-else class="qr-display-section">
      <!-- <div class="qr-header"> -->
      <!-- <h1 class="qr-title">¡QR Generado Exitosamente!</h1> -->
      <!-- <p class="qr-subtitle">Comparte este código con el visitante</p> -->
      <!-- </div> -->

      <div class="qr-container">
        <div class="qr-card">
          <div class="qr-code-area">
            <div class="qr-placeholder">
              <q-icon name="qr_code" size="120px" color="primary" />
              <p class="qr-mock-text">Código QR para<br />{{ generatedQRData.name }}</p>
            </div>
          </div>

          <div class="qr-info">
            <div class="qr-info-item">
              <q-icon name="person" />
              <span>{{ generatedQRData.name }}</span>
            </div>
            <div class="qr-info-item">
              <q-icon name="work" />
              <span>{{ generatedQRData.purpose }}</span>
            </div>
            <div class="qr-info-item">
              <q-icon name="phone" />
              <span>{{ generatedQRData.phone }}</span>
            </div>
            <div class="qr-info-item">
              <q-icon name="directions_car" />
              <span>{{ generatedQRData.plates }}</span>
            </div>
            <div class="qr-info-item">
              <q-icon name="schedule" />
              <span>Válido por 24 horas</span>
            </div>
          </div>
        </div>
      </div>

      <div class="qr-actions">
        <q-btn
          label="Compartir QR"
          icon="share"
          color="primary"
          class="action-button"
          @click="shareQR"
        />
        <q-btn
          label="Nuevo Visitante"
          icon="person_add"
          outline
          color="primary"
          class="action-button"
          @click="resetForm"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { Notify } from 'quasar';
import { QRServiceFactory } from 'src/services/qr.service';

interface GuestForm {
  name: string;
  phone: string;
  plates: string;
  purpose: string;
}

const isGenerating = ref(false);
const purposeOptions = ref<string[]>([]);
const showQR = ref(false);
const isPlatesInputFocused = ref(false);
const generatedQRData = ref<GuestForm>({
  name: '',
  phone: '',
  plates: '',
  purpose: '',
});
const dataService = QRServiceFactory.createDataService();

// Initialize form with placeholder
const guestForm = ref<GuestForm>({
  name: '',
  phone: '',
  plates: '',
  purpose: 'placeholder',
});

// Computed options for select with placeholder
const selectOptions = computed(() => [
  { label: 'Seleccionar opción', value: 'placeholder', disable: false },
  ...purposeOptions.value.map((option) => ({ label: option, value: option })),
]);

// Form validation
const isFormValid = computed(() => {
  return (
    guestForm.value.name.trim().length > 0 &&
    guestForm.value.purpose.trim().length > 0 &&
    guestForm.value.purpose !== 'placeholder' &&
    guestForm.value.phone.trim().length > 0 &&
    guestForm.value.plates.trim().length > 0
  );
});

// Methods
const loadPurposes = async () => {
  try {
    const types = await dataService.getUniqueTypes();
    purposeOptions.value = types;
  } catch {
    Notify.create({
      type: 'negative',
      message: 'No se pudieron cargar los tipos.',
    });
  }
};

const formatPlates = (value: string | number | null) => {
  // Convert to uppercase for Mexican plate format
  if (value && typeof value === 'string') {
    guestForm.value.plates = value.toUpperCase();
  }
};

const scrollToInput = () => {
  // Scroll to bottom when input is focused to avoid keyboard overlap
  setTimeout(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }, 300);
};

const handlePlatesInputFocus = () => {
  // Set flag to add extra padding when plates input is focused
  isPlatesInputFocused.value = true;
  // Also scroll to bottom
  scrollToInput();
};

const handlePlatesInputBlur = () => {
  // Remove extra padding when plates input loses focus
  isPlatesInputFocused.value = false;
};

const generateQR = () => {
  if (!isFormValid.value) return;

  isGenerating.value = true;

  // Mock generation
  setTimeout(() => {
    isGenerating.value = false;

    // Store generated data
    generatedQRData.value = { ...guestForm.value };

    // Show QR display
    showQR.value = true;

    Notify.create({
      type: 'positive',
      message: `QR generado para ${guestForm.value.name}`,
      icon: 'check',
    });
  }, 1500);
};

const shareQR = () => {
  Notify.create({
    type: 'info',
    message: 'Función de compartir en desarrollo',
    icon: 'share',
  });
};

const resetForm = () => {
  // Reset form and go back to form view
  guestForm.value = {
    name: '',
    phone: '',
    plates: '',
    purpose: 'placeholder',
  };
  showQR.value = false;
};

// Lifecycle
onMounted(() => {
  void loadPurposes();
});
</script>

<style lang="scss" scoped>
.visitor-qr-page {
  padding: 0 0 120px 0;
  background: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  transition: padding-bottom 0.3s ease;

  // Add extra padding when plates input is focused to prevent keyboard overlap
  &.plates-input-focused {
    padding-bottom: 370px;
  }
}

.page-header {
  background: var(--bg-primary);
  padding: 32px 16px 24px;

  .header-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .header-text {
    text-align: center;

    .page-title {
      font-size: 32px;
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1.2;
      margin-bottom: 8px;
    }

    .page-subtitle {
      font-size: 16px;
      color: var(--text-secondary);
      margin: 0;
      font-weight: 400;
    }
  }
}

.form-section {
  padding: 0 16px;
  max-width: 800px;
  margin: 0 auto;
}

.visitor-form {
  background: var(--bg-card-solid) !important;
  border: 1px solid var(--border-color);
  border-radius: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  overflow: hidden;

  .form-header {
    background: linear-gradient(135deg, var(--color-primary) 0%, rgba(255, 69, 0, 0.8) 100%);
    padding: 32px 32px 16px 32px;
    display: flex;
    align-items: center;
    gap: 16px;

    .form-icon {
      width: 48px;
      height: 48px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .form-title-section {
      flex: 1;

      .form-title {
        font-size: 24px;
        font-weight: 700;
        color: white;
        margin: 0 0 8px 0;
        line-height: 1.1;
      }

      .form-subtitle {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.9);
        margin: 0;
        font-weight: 400;
        line-height: 1.2;
      }
    }

    // Light mode adjustments
    body.body--light & {
      .form-icon {
        background: rgba(0, 0, 0, 0.1);
        color: var(--text-primary);
      }

      .form-title-section {
        .form-title {
          color: var(--text-primary);
        }

        .form-subtitle {
          color: var(--text-secondary);
        }
      }
    }
  }

  .form-content {
    padding: 8px 20px 24px 20px;
  }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
    margin-bottom: 0px;

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;
      gap: 10px 16px;

      .input-group:nth-child(1),
      .input-group:nth-child(2) {
        grid-column: 1 / -1;
      }
    }
  }

  .input-group {
    .input-label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 4px;
      letter-spacing: 0.025em;
    }

    .modern-input {
      :deep(.q-field__control) {
        border-radius: 12px;
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
      }

      :deep(.q-field--filled.q-field--focused .q-field__control) {
        background: var(--bg-secondary);
      }

      :deep(.q-field__native) {
        color: var(--text-primary);
        font-size: 16px;
      }

      :deep(.q-field__label) {
        color: var(--text-secondary);
      }

      // Custom icon styling with proper light/dark mode support
      :deep(.q-field__prepend) {
        padding-right: 12px;

        .input-icon {
          width: 14px;
          height: 14px;
          background: linear-gradient(135deg, var(--color-primary), rgba(255, 69, 0, 0.8));
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 16px;
        }
      }
    }

    // Light mode icon adjustments - moved outside of .modern-input
    body.body--light & {
      :deep(.q-field__prepend) {
        .input-icon {
          background: transparent !important;
          color: var(--color-primary) !important;

          .q-icon {
            color: var(--color-primary) !important;
          }
        }
      }
    }
  }

  .form-actions {
    display: flex;
    justify-content: center;
    padding-top: 16px;
    border-top: 1px solid var(--border-color);

    .generate-button {
      min-width: 200px;
      height: 52px;
      border-radius: 12px;
      font-weight: 700;
      font-size: 16px;
      letter-spacing: 0.025em;
      box-shadow: 0 4px 16px rgba(255, 69, 0, 0.3);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 20px rgba(255, 69, 0, 0.4);
      }

      &:active {
        transform: translateY(0);
      }
    }
  }
}

// Global styles for popup
:global(.filter-popup) {
  border-radius: 12px !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15) !important;
  border: 1px solid var(--border-color) !important;
}

// QR Display Section Styles
.qr-display-section {
  padding: 64px 24px 0px;
  background: var(--bg-primary);
  color: var(--text-primary);
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qr-header {
  text-align: center;
  margin-bottom: 0%;

  .qr-title {
    font-size: 28px;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0 0 8px 0;
    line-height: 1.1;
  }

  .qr-subtitle {
    font-size: 16px;
    color: var(--text-secondary);
    margin: 0;
  }
}

.qr-container {
  width: 100%;
  margin-bottom: 24px;
}

.qr-card {
  background: var(--bg-card-solid);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  text-align: center;
}

.qr-code-area {
  padding: 24px;
  margin-bottom: 10px;
  background: var(--bg-secondary);
  border-radius: 16px;
  border: 2px dashed var(--border-color);

  .qr-placeholder {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;

    .qr-mock-text {
      font-size: 14px;
      color: var(--text-secondary);
      margin: 0;
      line-height: 1.2;
    }
  }
}

.qr-info {
  display: flex;
  flex-direction: column;

  .qr-info-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 0;
    font-size: 14px;
    color: var(--text-primary);

    .q-icon {
      color: var(--color-primary);
      font-size: 18px;
    }

    span {
      flex: 1;
      text-align: left;
    }
  }
}

.qr-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;

  .action-button {
    min-width: 160px;
    height: 48px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;

    .action-button {
      width: 100%;
    }
  }
}
</style>
