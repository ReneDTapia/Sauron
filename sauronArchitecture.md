# Architecture Guide

**Scalable frontend architecture for Sauron residential platform**

## Tech Stack

- **Framework**: Quasar v2 + Vue 3 + TypeScript
- **State**: Pinia with persistence
- **HTTP**: Axios with interceptors
- **Real-time**: Socket.io
- **Auth**: JWT with refresh tokens
- **Testing**: Vitest + Playwright

## Folder Structure

```
src/
├── app/                    # Core app logic
│   ├── stores/            # Pinia stores by domain
│   ├── services/          # API services layer
│   └── router/            # Route definitions & guards
├── shared/                # Reusable utilities
│   ├── components/        # Cross-feature components
│   ├── composables/       # Vue composition functions
│   ├── utils/             # Pure utility functions
│   └── types/             # TypeScript interfaces
├── features/              # Feature-based modules
│   ├── auth/             # Authentication flow
│   ├── access/           # Access control & visitors
│   ├── community/        # Chat, forums, events
│   ├── security/         # Cameras, incidents, panic
│   ├── marketplace/      # Neighbor commerce
│   └── admin/            # Management dashboard
└── assets/               # Static resources
```

## Feature Structure

Each feature follows consistent internal organization:

```
features/auth/
├── components/           # Feature-specific components
├── pages/               # Route components
├── composables/         # Feature logic hooks
├── services/            # API calls for this feature
├── types/               # TypeScript definitions
└── index.ts             # Public exports
```

## Key Patterns

### State Management
- **Domain stores**: One store per business domain
- **Composition API**: Reactive stores with computed/actions
- **Persistence**: Critical data auto-saved via plugin

### Component Architecture
- **Atomic design**: Atoms → Molecules → Organisms → Pages
- **Single responsibility**: Components do one thing well
- **Prop-driven**: Prefer props over direct store access

### API Layer
- **Service classes**: Encapsulate HTTP logic
- **Typed responses**: Full TypeScript coverage
- **Error handling**: Centralized via interceptors
- **Auto-retry**: Failed requests retry with exponential backoff

### Authentication Flow
1. Login → Store JWT tokens
2. API requests → Auto-attach access token
3. 401 response → Refresh token automatically
4. Logout → Clear all stored data

## Build & Deployment

- **Development**: `npm run dev` - Hot reload with type checking
- **Production**: `npm run build` - Optimized for all platforms
- **Platforms**: Web (SPA/PWA) + iOS/Android (Capacitor)
- **CI/CD**: GitHub Actions → Automated testing & deployment

## Performance

- **Code splitting**: Routes and heavy components lazy-loaded
- **Tree shaking**: Dead code elimination in production
- **Image optimization**: WebP with fallbacks
- **Virtual scrolling**: For large lists (residents, history)
- **Service worker**: Smart caching for PWA