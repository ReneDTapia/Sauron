# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Web Development
- **Start development**: `quasar dev` - starts hot-reload development server
- **Build for production**: `quasar build`
- **Lint code**: `npm run lint` - runs ESLint with flat config
- **Format code**: `npm run format` - runs Prettier on all files
- **Type checking**: Built into development server via vite-plugin-checker

### Mobile Development (iOS/Android)
- **iOS development**: `quasar dev -m capacitor -T ios` - live reload on iOS device/simulator
- **Android development**: `quasar dev -m capacitor -T android` - live reload on Android device/emulator
- **Build iOS**: `quasar build -m capacitor -T ios --release`
- **Build Android**: `quasar build -m capacitor -T android --release`

## Architecture Overview

This is a Vue 3 + Quasar Framework application using:

- **Framework**: Quasar v2 with Vite
- **State Management**: Pinia with persistence via pinia-plugin-persistedstate
- **Authentication**: Role-based auth store with User interface (admin/resident/manager roles)
- **Routing**: Vue Router with layout-based structure (AuthLayout for auth pages, MainLayout for app)
- **TypeScript**: Strict mode enabled

### Key Architectural Patterns

- **Layout Structure**: Two main layouts - AuthLayout (login/register) and MainLayout (authenticated app)
- **Store Pattern**: Composition API style Pinia stores with persistence
- **Auth Flow**: Root redirects to /auth/login, protected dashboard routes under /dashboard
- **Component Structure**: Common components in src/components/common/, feature-specific in subdirectories

### Authentication System

The auth store (src/stores/auth.ts) defines the User interface and authentication state. Login/register functions are placeholders awaiting backend implementation. The store persists with key 'sauron-auth'.

### Router Configuration

- Root (/) redirects to /auth/login
- Auth routes use AuthLayout
- Dashboard routes use MainLayout  
- 404 handling via catchAll route