# 🏢 Sauron - Sistema de Gestión Residencial

Una aplicación móvil desarrollada con Quasar Framework para la gestión integral de complejos residenciales. Incluye generación de códigos QR para visitantes, reservas de áreas comunes, y sistema de notificaciones comunitarias.

## 📋 Tabla de Contenidos

- [Instalación](#-instalación)
- [Configuración del Entorno](#-configuración-del-entorno)
- [Desarrollo](#-desarrollo)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Agregar Nuevas Funcionalidades](#-agregar-nuevas-funcionalidades)
- [Guía de Desarrollo](#-guía-de-desarrollo)
- [Consideraciones Importantes](#-consideraciones-importantes)

## 🚀 Instalación

### Prerrequisitos

1. **Node.js** (versión 18 o superior)
2. **npm** o **yarn**
3. **Quasar CLI** globalmente instalado
4. **Xcode** (para desarrollo iOS)
5. **Android Studio** (para desarrollo Android)

### Instalación de Quasar CLI

```bash
npm install -g @quasar/cli
```

### Clonar e Instalar Dependencias

```bash
git clone https://github.com/ReneDTapia/Sauron.git
cd Sauron
npm install
```

## ⚙️ Configuración del Entorno

### Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
API_BASE_URL=https://tu-api.com/api
ENVIRONMENT=development
```

### Configuración para iOS

1. Asegúrate de tener Xcode instalado
2. Configura los certificados de desarrollo
3. Abre el proyecto iOS en Xcode si es necesario

```bash
cd src-capacitor/ios
open App.xcworkspace
```

### Configuración para Android

1. Instala Android Studio
2. Configura el SDK de Android
3. Añade variables de entorno necesarias

```bash
export ANDROID_HOME=/path/to/android-sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
```

## 🛠️ Desarrollo

### Desarrollo Web

```bash
# Iniciar servidor de desarrollo
npm run dev
# o
quasar dev
```

### Desarrollo iOS

```bash
# Desarrollo con hot-reload en simulador/dispositivo iOS
quasar dev -m capacitor -T ios

# Build para iOS
quasar build -m capacitor -T ios --release
```

### Desarrollo Android

```bash
# Desarrollo con hot-reload en emulador/dispositivo Android
quasar dev -m capacitor -T android

# Build para Android
quasar build -m capacitor -T android --release
```

### Comandos Útiles

```bash
# Linter
npm run lint

# Formatear código
npm run format

# Build de producción
npm run build

# Verificar TypeScript
npm run type-check
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── TabBar.vue      # Navegación principal
│   └── IOSStatusBar.vue # Componente específico iOS
├── layouts/            # Layouts de la aplicación
│   ├── AuthLayout.vue  # Layout para autenticación
│   └── MainLayout.vue  # Layout principal con TabBar
├── pages/              # Páginas principales
│   ├── HomePage.vue    # Página de inicio
│   ├── VisitorPage.vue # Generador de QR para visitantes
│   └── ErrorNotFound.vue
├── features/           # Módulos organizados por funcionalidad
│   ├── auth/           # Sistema de autenticación
│   │   ├── components/ # Componentes específicos de auth
│   │   ├── pages/      # Páginas de login/registro
│   │   └── services/   # Servicios de autenticación
│   └── dashboard/      # Componentes del dashboard
├── stores/             # Estado global (Pinia)
│   └── auth.ts         # Store de autenticación
├── services/           # Servicios de API
│   └── api.service.ts  # Cliente HTTP base
├── router/             # Configuración de rutas
│   ├── index.ts        # Configuración del router
│   └── routes.ts       # Definición de rutas
├── css/                # Estilos globales
│   ├── app.scss        # Estilos base y variables
│   └── themes.scss     # Sistema de temas claro/oscuro
└── shared/             # Código compartido
    ├── types/          # Definiciones TypeScript
    └── composables/    # Composables reutilizables
```

## 🎨 Sistema de Temas

La aplicación incluye un sistema de modo oscuro que:
- **Detecta automáticamente** las preferencias del sistema
- **Permite override manual** con el botón en HomePage
- **Persiste la preferencia** del usuario

### Variables CSS Disponibles

```scss
// Colores del sistema de diseño
--color-obsidian: #1a1a1a;     // Negro principal
--color-charcoal: #2d2d2d;     // Gris oscuro
--color-ember: #ff4500;        // Naranja principal (marca)
--color-ember-light: #ff6b35;  // Naranja claro

// Variables adaptativas de tema
--bg-primary: // Fondo principal (cambia con el tema)
--bg-secondary: // Fondo secundario
--text-primary: // Texto principal
--text-secondary: // Texto secundario
--border-color: // Color de bordes
```

## ➕ Agregar Nuevas Funcionalidades

### 1. Crear una Nueva Página

```bash
# Crear archivo de página
touch src/pages/MiNuevaPagina.vue
```

```vue
<template>
  <q-page class="mi-nueva-pagina">
    <div class="mi-nueva-pagina__container">
      <h1>Mi Nueva Página</h1>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Lógica del componente
</script>

<style lang="scss" scoped>
.mi-nueva-pagina {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;

  &__container {
    padding: 24px;
  }
}
</style>
```

### 2. Agregar Ruta

En `src/router/routes.ts`:

```typescript
// Agregar nueva ruta
{
  path: '/mi-nueva-pagina',
  component: () => import('layouts/MainLayout.vue'),
  children: [
    {
      path: '',
      name: 'mi-nueva-pagina',
      component: () => import('pages/MiNuevaPagina.vue')
    }
  ]
}
```

### 3. Agregar al TabBar (si es necesario)

En `src/components/TabBar.vue`:

```typescript
const tabs = ref<Tab[]>([
  // ... tabs existentes
  {
    id: 'nueva-tab',
    icon: 'new_icon',
    label: 'Nueva Tab',
    route: '/mi-nueva-pagina'
  }
]);
```

### 4. Crear un Store (si es necesario)

```bash
touch src/stores/mi-nuevo-store.ts
```

```typescript
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useMiNuevoStore = defineStore('mi-nuevo-store', () => {
  // Estado
  const datos = ref([]);
  
  // Getters
  const datosFiltrados = computed(() => datos.value.filter(/* lógica */));
  
  // Actions
  async function cargarDatos() {
    // Lógica para cargar datos
  }
  
  return {
    datos,
    datosFiltrados,
    cargarDatos
  };
}, {
  persist: {
    key: 'mi-nuevo-store'
  }
});
```

## 📚 Guía de Desarrollo

### Modificar Páginas Existentes

1. **HomePage.vue**: Página principal con acciones rápidas
   - Modificar `primaryActions` para agregar nuevas acciones
   - Actualizar `secondaryActions` para links comunitarios
   - El botón de tema está en el header

2. **VisitorPage.vue**: Generador de códigos QR
   - Formulario para datos del visitante
   - Generación y compartir QR codes
   - Validaciones de entrada

### Modificar Componentes

1. **TabBar.vue**: Navegación principal
   - Agregar/quitar tabs modificando el array `tabs`
   - Estilos adaptivos para diferentes temas

2. **MainLayout.vue**: Layout principal
   - Incluye TabBar y router-view
   - Maneja navegación entre tabs

### Trabajar con la API

```typescript
// Usar el servicio API base
import { apiService } from 'src/services/api.service';

// GET request
const datos = await apiService.get<MiTipo>('/endpoint');

// POST request
const resultado = await apiService.post<RespuestaTipo>('/endpoint', datos);
```

### Manejo de Estado

```typescript
// En componente Vue
import { useAuthStore } from 'src/stores/auth';

const authStore = useAuthStore();
const { isAuthenticated, user } = authStore;

// Usar acciones del store
await authStore.login(email, password);
```

## ⚠️ Consideraciones Importantes

### Autenticación

- El sistema de auth actual usa bypass temporal para testing
- Implementar API real antes de producción
- Las rutas están protegidas por guards en el router

### Modo Oscuro

- Siempre usar variables CSS en lugar de colores hardcodeados
- Testear ambos temas al desarrollar nuevos componentes
- El modo se detecta automáticamente del sistema

### TypeScript

- Definir interfaces para todos los tipos de datos
- Usar strict mode habilitado
- Evitar `any`, preferir tipos específicos

### Capacitor / Mobile

- Testear en dispositivos reales regularmente
- Considerar safe areas de iOS
- Optimizar para touch interactions

### Performance

- Usar lazy loading para rutas pesadas
- Optimizar imágenes y assets
- Implementar virtual scrolling para listas largas

### Testing

- Escribir tests para lógica crítica
- Testear funcionalidad offline
- Validar en múltiples dispositivos y tamaños

### Seguridad

- Nunca commitear claves API o secrets
- Validar entrada del usuario en cliente y servidor
- Implementar rate limiting en producción

## 🤝 Contribuir

1. Fork del repositorio
2. Crear branch para feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'feat: descripción'`
4. Push al branch: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

### Convenciones de Commits

- `feat:` nueva funcionalidad
- `fix:` correción de bug
- `docs:` documentación
- `style:` formateo, punto y coma faltante, etc.
- `refactor:` refactoring de código
- `test:` agregar tests
- `chore:` tareas de mantenimiento

## 📞 Soporte

Para reportar bugs o solicitar funcionalidades, crear un issue en GitHub.

---

**Desarrollado con ❤️ usando Quasar Framework**