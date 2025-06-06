# Design System

**Minimalist design language for Sauron residential platform**

## Color Palette

### Primary
- **Obsidian**: `#1a1a1a` - Headers, navigation
- **Charcoal**: `#2d2d2d` - Cards, secondary surfaces
- **Ember**: `#ff4500` - CTAs, critical actions

### Semantic
- **Success**: `#28a745` - Confirmations, completed states
- **Warning**: `#ffc107` - Alerts, pending states
- **Error**: `#dc3545` - Errors, destructive actions
- **Info**: `#4a90e2` - Links, information

### Neutrals
- **White**: `#ffffff` - Primary background
- **Light Grey**: `#f5f5f5` - Section backgrounds
- **Medium Grey**: `#999999` - Secondary text
- **Dark Grey**: `#333333` - Primary text

## Typography

**Inter** (Google Fonts) - Clean, highly legible sans-serif

### Hierarchy
- **H1**: 32px/40px SemiBold - Page titles
- **H2**: 24px/32px SemiBold - Section headers
- **H3**: 20px/28px Medium - Subsections
- **Body**: 16px/24px Regular - Primary text
- **Caption**: 12px/16px Regular - Metadata

## Spacing

**8px grid system** for consistent rhythm

- **4px**: Micro spacing (inline elements)
- **8px**: Small gaps (related items)
- **16px**: Standard spacing (components)
- **24px**: Section separation
- **32px**: Page margins
- **48px**: Major section breaks

## Components

### Buttons
- **Height**: 44px minimum (touch-friendly)
- **Radius**: 8px rounded corners
- **Padding**: 16px horizontal
- **States**: Default, hover (+10% saturation), pressed (-10%), disabled (40% opacity)

### Cards
- **Radius**: 12px rounded corners
- **Shadow**: `0 2px 8px rgba(0,0,0,0.1)`
- **Padding**: 16px internal
- **Border**: 1px solid light grey

### Inputs
- **Style**: Outlined with floating labels
- **Radius**: 8px rounded corners
- **Padding**: 12px vertical, 16px horizontal
- **Focus**: 2px Steel Blue outline

## Iconography

**Material Icons Outlined** + custom icons

- **Style**: 2px stroke weight, rounded corners
- **Sizes**: 16px, 20px, 24px, 32px, 48px
- **Color**: Inherit from parent text color

## Animations

### Timing
- **Micro-interactions**: 150-200ms ease-out
- **State changes**: 250-300ms ease-in-out
- **Page transitions**: 350-400ms ease-in-out

### Effects
- **Button press**: Scale 0.95
- **Card hover**: Lift shadow 4px
- **Page slide**: 20px translate + fade
- **Success feedback**: Scale up + checkmark

## Accessibility

### Contrast
- **Text**: 4.5:1 minimum ratio
- **Large text**: 3:1 minimum ratio
- **Focus indicators**: 2px Steel Blue outline

### Touch Targets
- **Minimum**: 44px × 44px
- **Recommended**: 48px × 48px
- **Spacing**: 8px between targets

### Screen Readers
- **Alt text**: Descriptive for images
- **ARIA labels**: For icon-only buttons
- **Landmarks**: Semantic HTML structure

## Dark Mode

### Surfaces
- **Primary**: `#121212` (not pure black)
- **Secondary**: `#1e1e1e`
- **Tertiary**: `#2d2d2d`

### Text
- **Primary**: `#ffffff` (100% opacity)
- **Secondary**: `#b3b3b3` (70% opacity)
- **Disabled**: `#666666` (40% opacity)

### Adaptation
- **Ember Orange**: Softer `#ff6b35`
- **Success Green**: Brighter `#4caf50`
- **Error Red**: Softer `#f44336`