<template>
  <q-page class="visitor">
    <div class="visitor__container">
      <!-- Header -->
      <div class="visitor__header">
        <div class="visitor__title">Visitor QR</div>
        <div class="visitor__subtitle">Generate access for guests</div>
      </div>

      <!-- Guest Form -->
      <div v-if="!generatedQR" class="visitor__form">
        <div class="form-group">
          <label class="form-label">Guest Name</label>
          <q-input
            v-model="guestForm.name"
            placeholder="Full name as on ID"
            outlined
            dense
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Phone Number</label>
          <q-input
            v-model="guestForm.phone"
            placeholder="+52 555 123 4567"
            outlined
            dense
            class="form-input"
            mask="+52 ### ### ####"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Vehicle Plates (Optional)</label>
          <q-input
            v-model="guestForm.plates"
            placeholder="ABC-123-D"
            outlined
            dense
            class="form-input"
            mask="AAA-###-A"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Visit Duration</label>
          <q-select
            v-model="guestForm.duration"
            :options="durationOptions"
            outlined
            dense
            class="form-input"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Purpose (Optional)</label>
          <q-input
            v-model="guestForm.purpose"
            placeholder="Family visit, maintenance, delivery..."
            outlined
            dense
            class="form-input"
          />
        </div>

        <div class="visitor__actions">
          <q-btn
            class="generate-btn"
            label="Generate QR Code"
            :loading="isGenerating"
            @click="generateQR"
            :disable="!isFormValid"
          />
        </div>
      </div>

      <!-- Generated QR -->
      <div v-else class="visitor__qr">
        <div class="qr-container">
          <div class="qr-code">
            <canvas ref="qrCanvas"></canvas>
          </div>
          <div class="qr-info">
            <div class="qr-info__name">{{ guestForm.name }}</div>
            <div class="qr-info__details">
              Valid for {{ guestForm.duration }}<br>
              <span class="qr-info__code">Code: {{ qrData.code }}</span>
            </div>
          </div>
        </div>

        <div class="visitor__actions">
          <q-btn
            class="share-btn"
            label="Share QR Code"
            icon="share"
            @click="shareQR"
          />
          <q-btn
            class="new-btn"
            label="New Guest"
            outline
            @click="resetForm"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue';
import QRCode from 'qrcode';

interface GuestForm {
  name: string;
  phone: string;
  plates: string;
  duration: string;
  purpose: string;
}

interface QRData {
  code: string;
  timestamp: number;
  expiresAt: number;
  guestInfo: GuestForm;
  residentId: string;
  unitNumber: string;
}

const guestForm = ref<GuestForm>({
  name: '',
  phone: '',
  plates: '',
  duration: '2 hours',
  purpose: ''
});

const durationOptions = [
  '1 hour',
  '2 hours',
  '4 hours',
  '8 hours',
  '24 hours'
];

const isGenerating = ref(false);
const generatedQR = ref(false);
const qrCanvas = ref<HTMLCanvasElement>();
const qrData = ref<QRData | null>(null);

const isFormValid = computed(() => {
  return guestForm.value.name.trim().length > 0 && 
         guestForm.value.phone.trim().length > 0;
});

async function generateQR() {
  if (!isFormValid.value) return;
  
  isGenerating.value = true;
  
  try {
    // Generate secure QR data
    const now = Date.now();
    const durationMs = getDurationInMs(guestForm.value.duration);
    
    qrData.value = {
      code: generateSecureCode(),
      timestamp: now,
      expiresAt: now + durationMs,
      guestInfo: { ...guestForm.value },
      residentId: 'current-user-id', // Would come from auth store
      unitNumber: '101' // Would come from user profile
    };

    // Create QR code
    const qrString = JSON.stringify({
      type: 'visitor_access',
      code: qrData.value.code,
      expires: qrData.value.expiresAt,
      guest: guestForm.value.name,
      unit: qrData.value.unitNumber
    });

    generatedQR.value = true;
    
    await nextTick();
    
    if (qrCanvas.value) {
      await QRCode.toCanvas(qrCanvas.value, qrString, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
    }
  } catch (error) {
    console.error('Error generating QR:', error);
  } finally {
    isGenerating.value = false;
  }
}

function generateSecureCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function getDurationInMs(duration: string): number {
  const hours = parseInt(duration.split(' ')[0]);
  return hours * 60 * 60 * 1000;
}

function shareQR() {
  if (!qrCanvas.value || !qrData.value) return;
  
  try {
    const canvas = qrCanvas.value;
    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'visitor-qr.png', { type: 'image/png' });
        
        if (navigator.share) {
          void navigator.share({
            title: `Visitor QR for ${guestForm.value.name}`,
            text: `Access code: ${qrData.value?.code}`,
            files: [file]
          }).catch((error) => console.error('Error sharing:', error));
        } else {
          // Fallback: download the QR code
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'visitor-qr.png';
          a.click();
          URL.revokeObjectURL(url);
        }
      }
    });
  } catch (error) {
    console.error('Error sharing QR:', error);
  }
}

function resetForm() {
  guestForm.value = {
    name: '',
    phone: '',
    plates: '',
    duration: '2 hours',
    purpose: ''
  };
  generatedQR.value = false;
  qrData.value = null;
}
</script>

<style lang="scss" scoped>
.visitor {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  padding-bottom: 100px;
  
  &__container {
    max-width: 400px;
    margin: 0 auto;
    padding: 0 32px 32px;
  }

  &__header {
    text-align: center;
    padding-top: 140px;
    margin-bottom: 48px;
  }

  &__title {
    font-size: 24px;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 8px 0;
    letter-spacing: -0.2px;
  }

  &__subtitle {
    font-size: 16px;
    color: var(--text-secondary);
    font-weight: 400;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__qr {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
  }

  &__actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 24px;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  letter-spacing: -0.1px;
}

.form-input {
  :deep(.q-field__control) {
    border-radius: 8px;
    background-color: var(--bg-card-solid);
    border-color: var(--border-color);
  }
  
  :deep(.q-field__native) {
    font-size: 16px;
    padding: 12px 16px;
    color: var(--text-primary);
  }
  
  :deep(.q-field__label) {
    color: var(--text-secondary);
  }
}

.qr-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 24px;
  background: var(--bg-card-solid);
  border-radius: 16px;
  border: 1px solid var(--border-color);
}

.qr-code {
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.qr-info {
  text-align: center;
  
  &__name {
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 8px;
  }
  
  &__details {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.4;
  }
  
  &__code {
    font-family: monospace;
    font-weight: 600;
    color: var(--text-primary);
    font-size: 16px;
  }
}

.generate-btn {
  background: var(--color-ember);
  color: white;
  padding: 14px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  
  &:hover {
    background: var(--color-ember-light);
  }
}

.share-btn {
  background: var(--color-info);
  color: white;
  padding: 14px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  
  &:hover {
    opacity: 0.9;
  }
}

.new-btn {
  border: 2px solid var(--color-info);
  color: var(--color-info);
  background: transparent;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  
  &:hover {
    background: rgba(74, 144, 226, 0.1);
  }
}
</style>