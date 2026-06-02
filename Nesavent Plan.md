# NesaVent — Implementation Plan v2 (Frontend-First)

**Platform:** React Native / Expo SDK 54 | **Target:** Android & iOS
**Focus:** Frontend UI (semua screen sampai jadi) → Backend menyusul
**Adapted from:** [NesaVent_PRD_UISpec_v2.md](file:///d:/Firaz/Mobile/React%20Native/nesavent/NesaVent_PRD_UISpec_v2.md)

---

## Background & Context

NesaVent adalah platform mobile untuk pemesanan tiket dan pendaftaran event di lingkungan UNESA. Plan ini **100% fokus pada frontend** — semua screen dibangun dengan mock API server, backend dikerjakan belakangan.

### Keputusan dari User Review

| Pertanyaan | Keputusan |
|---|---|
| Google Cloud / OAuth config | Nanti, fokus UI dulu |
| Backend API Contract | Belum ada, pakai mock API server |
| Firebase / FCM | Nanti |
| Apple Developer Account | Nanti |
| Prioritas screens | Bertahap: P0 dulu, lalu P1 |
| Mock Data | **Mock API server** (MSW) |

### PRD → Project Adaptation

> [!IMPORTANT]
> PRD ditulis untuk **Flutter/Dart**, project ini **React Native / Expo SDK 54**. Semua spesifikasi diadaptasi:

| PRD (Flutter) | Implementasi (Expo SDK 54) |
|---|---|
| Flutter (Dart) | React Native 0.81 + TypeScript |
| Riverpod | **Zustand** (client) + **TanStack Query** (server) |
| Go Router | **expo-router v6** (file-based routing) |
| google_sign_in | **expo-auth-session** (nanti, mock dulu) |
| flutter_secure_storage | **expo-secure-store** |
| Dio + Retrofit | **axios** + TanStack Query |
| qr_flutter | **react-native-qrcode-svg** |
| mobile_scanner | **expo-camera** (CameraView) |
| cached_network_image | **expo-image** (sudah terinstall) |
| google_fonts | **@expo-google-fonts/plus-jakarta-sans** |

---

## Design Direction — Premium & Elegant

> [!IMPORTANT]
> **Referensi desain:** EventFlow, CultVibe, EventNova, Eventify — event booking apps premium dari Behance/Dribbble.

### Design Principles

```
 ╔══════════════════════════════════════════════════════════╗
 ║  1. CLEAN & MINIMAL — Whitespace is a feature           ║
 ║  2. PILL-SHAPED CTAs — Full border-radius buttons        ║
 ║  3. SUBTLE SHADOWS — Soft, barely-there elevations       ║
 ║  4. STRONG TYPOGRAPHY — Clear hierarchy, no clutter      ║
 ║  5. SMOOTH GRADIENTS — Navy-to-purple depth              ║
 ║  6. MICRO-ANIMATIONS — Purposeful, not gimmicky          ║
 ║  7. GENEROUS SPACING — Cards breathe, content flows      ║
 ╚══════════════════════════════════════════════════════════╝
```

### ❌ Hindari (Anti-Patterns)

- Shadow berat di semua card — kotor dan murahan
- Button kotak/sharp corners — kaku dan outdated
- Warna flat tanpa depth — membosankan
- Spacing sempit/crowded — terasa cheap
- Terlalu banyak border — noisy
- Gradient yang terlalu kontras — sakit mata

### ✅ Yang Diterapkan

| Elemen | Style |
|---|---|
| **CTA Buttons** | Pill-shaped (borderRadius: 999), gold gradient fill, height 52pt, bold text |
| **Secondary Buttons** | Pill-shaped outlined, 1.5pt border, no fill |
| **Cards** | borderRadius 20pt, shadow: `0 4px 20px rgba(26,22,64, 0.06)`, no border |
| **Chips** | Full rounded (borderRadius 999), subtle fill or thin outline |
| **Text Fields** | borderRadius 16pt, light gray-50 fill, no visible border (border on focus only: gold) |
| **Bottom Nav** | Floating style (margin horizontal), subtle shadow, rounded top |
| **Headers** | Gradient navy→purple, smooth curve transition to content |
| **Spacing** | Generous — 20pt between cards, 24-32pt between sections |
| **Images** | Smooth rounded corners (16-20pt), subtle shadow underneath |
| **Transitions** | Smooth fade+slide (200ms), spring animations for interactive elements |

### Updated Component Specs (vs PRD original)

```
FilledButton (CTA utama):
  bg: LinearGradient(gold-400 → gold-500)
  teks: navy-900 | fontWeight: 700
  height: 52pt | borderRadius: 999 (PILL)  ← was 14pt
  padding H: 32pt
  shadow: 0 4px 16px rgba(201,151,60, 0.3)  ← subtle gold glow

OutlinedButton:
  border: navy-300 (1pt)  ← thinner, more elegant
  teks: navy-700
  height: 52pt | borderRadius: 999 (PILL)
  bg: transparent

TextButton:
  teks: gold-600 | fontWeight: 600
  height: 40pt | no background, no border

Card:
  bg: white | borderRadius: 20pt  ← was 16pt
  shadow: 0 4px 20px rgba(26,22,64, 0.06)  ← very subtle
  NO border  ← cleaner look

TextField:
  borderRadius: 16pt  ← was 12pt
  height: 54pt  ← slightly taller
  bg: gray-50 (filled style)
  border: none (default) → gold-400 (2pt, focused)
  label floats above on focus

Chip (selected):
  gold-500 bg + navy-900 teks | borderRadius: 999 | padding H:16 V:8
Chip (unselected):
  bg: gray-100 | teks: gray-600 | borderRadius: 999

BottomNavBar:
  bg: white | height: 72pt + safeArea
  borderRadius top: 24pt  ← rounded top
  shadow: 0 -4px 24px rgba(26,22,64, 0.06)
  selected: navy-900 icon + pill gold indicator under icon
  unselected: gray-400

FAB:
  bg: LinearGradient(gold-400 → gold-500)
  icon: navy-900 | size: 60pt | borderRadius: 999 (circle)
  shadow: 0 8px 24px rgba(201,151,60, 0.35)
```

---

## Updated Typography — Full 12 Styles + Light Variants

```typescript
// Font: Plus Jakarta Sans (all weights including Light)
// Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

export const Typography = {
  // Display — Hero text, splash screen, large headings
  displayLarge:  { fontSize: 32, fontWeight: '700', fontFamily: 'PlusJakartaSans_700Bold',       letterSpacing: -0.5 },
  displayMedium: { fontSize: 28, fontWeight: '700', fontFamily: 'PlusJakartaSans_700Bold',       letterSpacing: -0.25 },

  // Headline — Section headers, screen titles
  headlineLarge: { fontSize: 26, fontWeight: '600', fontFamily: 'PlusJakartaSans_600SemiBold' },
  headlineMedium:{ fontSize: 22, fontWeight: '600', fontFamily: 'PlusJakartaSans_600SemiBold' },

  // Title — Card titles, list item titles
  titleLarge:    { fontSize: 18, fontWeight: '600', fontFamily: 'PlusJakartaSans_600SemiBold' },
  titleMedium:   { fontSize: 16, fontWeight: '500', fontFamily: 'PlusJakartaSans_500Medium' },
  titleSmall:    { fontSize: 14, fontWeight: '500', fontFamily: 'PlusJakartaSans_500Medium' },

  // Body — Main content text
  bodyLarge:     { fontSize: 16, fontWeight: '400', fontFamily: 'PlusJakartaSans_400Regular' },
  bodyMedium:    { fontSize: 14, fontWeight: '400', fontFamily: 'PlusJakartaSans_400Regular' },
  bodySmall:     { fontSize: 12, fontWeight: '400', fontFamily: 'PlusJakartaSans_400Regular' },

  // Label — Buttons, chips, small labels
  labelLarge:    { fontSize: 14, fontWeight: '500', fontFamily: 'PlusJakartaSans_500Medium' },
  labelSmall:    { fontSize: 11, fontWeight: '500', fontFamily: 'PlusJakartaSans_500Medium',     letterSpacing: 0.5 },

  // ─── LIGHT VARIANTS (for subtitles, descriptions, secondary info) ───
  bodyLargeLight:  { fontSize: 16, fontWeight: '300', fontFamily: 'PlusJakartaSans_300Light' },
  bodyMediumLight: { fontSize: 14, fontWeight: '300', fontFamily: 'PlusJakartaSans_300Light' },
  bodySmallLight:  { fontSize: 12, fontWeight: '300', fontFamily: 'PlusJakartaSans_300Light' },
  titleMediumLight:{ fontSize: 16, fontWeight: '300', fontFamily: 'PlusJakartaSans_300Light' },
  titleSmallLight: { fontSize: 14, fontWeight: '300', fontFamily: 'PlusJakartaSans_300Light' },

  // ─── EXTRA BOLD VARIANTS (for emphasis, prices, stats) ───
  displayBold:   { fontSize: 32, fontWeight: '800', fontFamily: 'PlusJakartaSans_800ExtraBold',  letterSpacing: -0.5 },
  titleBold:     { fontSize: 18, fontWeight: '700', fontFamily: 'PlusJakartaSans_700Bold' },
  priceLarge:    { fontSize: 24, fontWeight: '700', fontFamily: 'PlusJakartaSans_700Bold' },
} as const;
```

---

## Proposed Changes

### Overview — Complete File Architecture

```
nesavent/
├── app/                              # 📱 Expo Router screens (25+ screens)
│   ├── _layout.tsx                   # Root layout + auth guard + font loading
│   ├── (auth)/                       # 🔓 Auth group (unprotected)
│   │   ├── _layout.tsx               # Stack navigator
│   │   ├── index.tsx                 # Splash → auto-redirect (SCR-01)
│   │   ├── onboarding.tsx            # Onboarding 3 slides (SCR-02)
│   │   ├── login.tsx                 # Google OAuth login (SCR-03)
│   │   └── complete-profile.tsx      # First-time profile (SCR-04)
│   ├── (app)/                        # 🔒 Main app (protected)
│   │   ├── _layout.tsx               # Wraps tabs + stacked screens
│   │   ├── (tabs)/                   # Bottom tab navigator
│   │   │   ├── _layout.tsx           # 4-5 tabs config
│   │   │   ├── index.tsx             # Beranda (SCR-10)
│   │   │   ├── explore.tsx           # Jelajahi (SCR-20)
│   │   │   ├── tickets.tsx           # Tiket Saya (SCR-50)
│   │   │   └── profile.tsx           # Profil (SCR-60)
│   │   ├── notifications.tsx         # Notifikasi (SCR-11)
│   │   ├── search.tsx                # Search results
│   │   ├── event/[id].tsx            # Detail Event (SCR-30)
│   │   ├── checkout/
│   │   │   ├── [eventId].tsx         # Step 1: Data Peserta (SCR-40)
│   │   │   ├── summary.tsx           # Step 2: Ringkasan (SCR-41)
│   │   │   └── confirmation.tsx      # Step 3: Konfirmasi (SCR-42)
│   │   ├── ticket/
│   │   │   ├── [id].tsx              # Detail Tiket (SCR-51)
│   │   │   └── qr/[id].tsx           # QR Fullscreen (SCR-52)
│   │   ├── profile/
│   │   │   ├── edit.tsx              # Edit Profil (SCR-61)
│   │   │   ├── orders.tsx            # Riwayat Pesanan (SCR-82)
│   │   │   └── bookmarks.tsx         # Event Tersimpan (SCR-81)
│   │   ├── organizer/
│   │   │   ├── index.tsx             # Dashboard (SCR-70)
│   │   │   ├── create-event.tsx      # Buat Event (SCR-71)
│   │   │   ├── edit-event/[id].tsx   # Edit Event
│   │   │   ├── participants/[eventId].tsx  # Peserta (SCR-72)
│   │   │   ├── scanner/[eventId].tsx      # QR Scanner (SCR-73)
│   │   │   └── register.tsx          # Daftar Penyelenggara (SCR-80)
│   │   └── organization/[id].tsx     # Profil Organisasi (SCR-74)
│   └── +not-found.tsx                # 404 screen
│
├── components/                       # 🧩 Reusable UI components
│   ├── ui/                           # Atomic design primitives
│   │   ├── Button.tsx                # Pill-shaped: Filled, Outlined, Text, Elevated
│   │   ├── Card.tsx                  # Clean card (no border, subtle shadow)
│   │   ├── Chip.tsx                  # Full-rounded category/status chips
│   │   ├── TextField.tsx             # Filled-style input, float label
│   │   ├── Badge.tsx                 # Notification & status badges
│   │   ├── Dropdown.tsx              # Select with bottom sheet
│   │   ├── TabBar.tsx                # Segmented tab control
│   │   ├── Shimmer.tsx               # Loading skeleton (navy shimmer)
│   │   ├── EmptyState.tsx            # Illustration + text + CTA
│   │   ├── ProgressStepper.tsx       # 3-step checkout indicator
│   │   ├── Divider.tsx               # Styled divider (solid/perforated)
│   │   └── BottomSheet.tsx           # Reusable bottom sheet wrapper
│   ├── event/
│   │   ├── EventCard.tsx             # Compact vertical card (180pt)
│   │   ├── EventCardHorizontal.tsx   # Horizontal list item
│   │   ├── FeaturedBanner.tsx        # Hero carousel with overlay
│   │   ├── CategoryGrid.tsx          # 2x4 icon grid
│   │   ├── TicketTypeCard.tsx        # Ticket selection card
│   │   └── FilterBottomSheet.tsx     # Multi-filter modal
│   ├── ticket/
│   │   ├── TicketCard.tsx            # My tickets list item
│   │   ├── QRCodeDisplay.tsx         # QR with perforated divider
│   │   └── QRScanner.tsx             # Camera scanner overlay
│   ├── organizer/
│   │   ├── StatsGrid.tsx             # Dashboard stats 2x2
│   │   ├── OrganizerEventCard.tsx    # Event management card
│   │   └── ParticipantItem.tsx       # Participant list item
│   ├── layout/
│   │   ├── ScreenContainer.tsx       # SafeArea wrapper
│   │   ├── GradientHeader.tsx        # Navy→purple curved header
│   │   ├── StickyFooter.tsx          # Bottom CTA bar
│   │   └── SectionHeader.tsx         # "Title" + "Lihat Semua →"
│   └── notification/
│       └── NotificationItem.tsx
│
├── constants/                        # 🎨 Design tokens
│   ├── colors.ts                     # Full UNESA palette (navy/gold/purple/gray/semantic)
│   ├── typography.ts                 # Plus Jakarta Sans — all 12 styles + light + bold
│   ├── spacing.ts                    # 4pt grid system
│   ├── shadows.ts                    # Subtle elevation presets
│   ├── gradients.ts                  # Header, poster overlay, gold accent
│   ├── categories.ts                 # Event category definitions + icons
│   ├── faculties.ts                  # UNESA faculty list
│   └── theme.ts                      # [MODIFY] Consolidated theme export
│
├── services/                         # 🌐 API layer (mock-ready)
│   ├── api/
│   │   ├── client.ts                 # Axios instance + interceptors
│   │   ├── auth.api.ts               # POST /auth/google, /auth/refresh
│   │   ├── events.api.ts             # Events CRUD
│   │   ├── orders.api.ts             # Orders/booking
│   │   ├── tickets.api.ts            # Tickets
│   │   ├── organizations.api.ts      # Organizations
│   │   └── notifications.api.ts      # Notifications
│   ├── auth/
│   │   ├── google-auth.ts            # OAuth flow (mock for now)
│   │   └── token-storage.ts          # expo-secure-store wrapper
│   └── mock/
│       ├── server.ts                 # MSW setup (mock API server)
│       ├── handlers/
│       │   ├── auth.handlers.ts
│       │   ├── events.handlers.ts
│       │   ├── orders.handlers.ts
│       │   ├── tickets.handlers.ts
│       │   └── notifications.handlers.ts
│       └── data/
│           ├── events.data.ts        # 15+ realistic UNESA events
│           ├── users.data.ts         # Sample users
│           ├── tickets.data.ts       # Sample tickets
│           ├── organizations.data.ts # Sample orgs (BEM, UKM, etc.)
│           └── notifications.data.ts # Sample notifications
│
├── stores/                           # 🗄️ Zustand (client state only)
│   ├── auth.store.ts                 # User, token, session
│   ├── onboarding.store.ts           # First-time flags
│   └── ui.store.ts                   # Active filters, UI preferences
│
├── hooks/                            # 🪝 Custom hooks
│   ├── queries/                      # TanStack Query (server state)
│   │   ├── useEvents.ts              # List, detail, search, featured
│   │   ├── useTickets.ts             # My tickets
│   │   ├── useOrders.ts              # Orders & mutations
│   │   ├── useOrganizer.ts           # Dashboard data
│   │   ├── useNotifications.ts       # Notifications
│   │   └── useBookmarks.ts           # Bookmarks
│   ├── useAuth.ts                    # Login, logout, session check
│   ├── use-color-scheme.ts           # [EXISTING]
│   ├── use-color-scheme.web.ts       # [EXISTING]
│   └── use-theme-color.ts            # [EXISTING]
│
├── types/                            # 📝 TypeScript definitions
│   ├── user.ts
│   ├── event.ts
│   ├── ticket.ts
│   ├── order.ts
│   ├── organization.ts
│   ├── notification.ts
│   └── api.ts                        # Response wrappers
│
├── utils/
│   ├── format.ts                     # Date, currency, relative time
│   ├── validation.ts                 # Form validators
│   ├── qr.ts                         # QR data helpers
│   └── domain-check.ts              # @unesa.ac.id validation
│
├── providers/
│   └── AppProviders.tsx              # QueryClient + MSW init
│
└── assets/
    ├── images/                       # [EXISTING]
    ├── icons/                        # [EXISTING]
    ├── logo/                         # [EXISTING]
    └── illustrations/                # [NEW] Onboarding & empty state
```

---

## Component Breakdown — 16 Components

### Component 1 — Project Setup & Dependencies

> Install all packages, configure Expo plugins, setup dev tooling.

#### [MODIFY] [package.json](file:///d:/Firaz/Mobile/React%20Native/nesavent/package.json)

```diff
  "dependencies": {
    // ... existing ...

    // UI & Styling
+   "expo-linear-gradient": "~15.0.0",
+   "@expo-google-fonts/plus-jakarta-sans": "latest",
+   "react-native-svg": "~16.0.0",

    // QR Code
+   "react-native-qrcode-svg": "^6.3.0",

    // State Management & Data
+   "zustand": "^5.0.0",
+   "@tanstack/react-query": "^5.60.0",
+   "axios": "^1.8.0",

    // Storage
+   "@react-native-async-storage/async-storage": "2.1.2",
+   "expo-secure-store": "~15.0.0",

    // Auth (install now, configure later)
+   "expo-auth-session": "~7.0.0",
+   "expo-crypto": "~15.0.0",

    // Camera (for QR scanner)
+   "expo-camera": "~17.0.0",

    // Notifications (install now, configure later)
+   "expo-notifications": "~0.32.0",
+   "expo-device": "~8.0.0",

    // UI Utilities
+   "date-fns": "^4.0.0",
+   "@gorhom/bottom-sheet": "^5.0.0",
+   "react-native-toast-message": "^2.2.0",
+   "lottie-react-native": "^7.0.0",
  },
  "devDependencies": {
    // ... existing ...
+   "msw": "^2.7.0",            // Mock API server
  }
```

#### [MODIFY] [app.json](file:///d:/Firaz/Mobile/React%20Native/nesavent/app.json)

- Update name to "NesaVent"
- Set scheme to "nesavent"
- Splash background: `#1A1640` (navy-900)
- Add camera permission plugin
- Add notification plugin (config ready for later)

---

### Component 2 — Design System (UNESA Premium Palette)

> Complete design token system — colors, typography, spacing, shadows, gradients.

#### [NEW] [colors.ts](file:///d:/Firaz/Mobile/React%20Native/nesavent/constants/colors.ts)

Full UNESA palette:

```typescript
export const Colors = {
  // PRIMARY — Navy Deep UNESA
  navy: {
    50: '#EEEDF5', 100: '#D5D2E9', 200: '#ADA8D2', 300: '#847EBB',
    400: '#5C54A4', 500: '#342B8D', 600: '#2C2478', 700: '#241E63',
    800: '#1E1A52', 900: '#1A1640',
  },
  // ACCENT — Gold UNESA
  gold: {
    50: '#FDF5E6', 100: '#FAE9C2', 200: '#F5D68A', 300: '#EFC155',
    400: '#E8AC2A', 500: '#C9973C', 600: '#A87C2E', 700: '#876120',
    800: '#664913', 900: '#4A3309',
  },
  // SECONDARY — Royal Purple UNESA
  purple: {
    50: '#EDEBF7', 100: '#D5D0ED', 200: '#ABA2DB', 300: '#8173CA',
    400: '#6258B9', 500: '#4B3C9C', 600: '#3E3284', 700: '#31276C',
    800: '#251D54', 900: '#18133C',
  },
  // NEUTRAL
  gray: {
    50: '#FAFAFA', 100: '#F5F5F5', 200: '#EEEEEE', 300: '#CECECE',
    400: '#BDBDBD', 500: '#9E9E9E', 600: '#757575', 700: '#616161',
    800: '#424242', 900: '#212121',
  },
  // SEMANTIC
  success: '#22C55E', warning: '#F59E0B', error: '#EF4444', info: '#3B82F6',
  // SURFACE
  surface: {
    primary: '#FFFFFF', secondary: '#F8F8FA',
    card: '#FFFFFF', dark: '#1A1640',
  },
  white: '#FFFFFF', black: '#000000',
};
```

#### [NEW] [typography.ts](file:///d:/Firaz/Mobile/React%20Native/nesavent/constants/typography.ts)

All 12 base styles + 5 light variants + 3 extra-bold variants (see Typography section above).

#### [NEW] [spacing.ts](file:///d:/Firaz/Mobile/React%20Native/nesavent/constants/spacing.ts)

```typescript
export const Spacing = {
  xs: 4, sm: 8, md: 16, lg: 24, xl: 32, '2xl': 48, '3xl': 64,
  screenH: 20,  // horizontal padding (generous)
  cardPadding: 20,
  sectionGap: 28,
};
```

#### [NEW] [shadows.ts](file:///d:/Firaz/Mobile/React%20Native/nesavent/constants/shadows.ts)

```typescript
// Subtle, barely-there elevations — NOT heavy shadows
export const Shadows = {
  sm: { shadowColor: '#1A1640', shadowOffset: {width:0, height:2},
        shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 },
  md: { shadowColor: '#1A1640', shadowOffset: {width:0, height:4},
        shadowOpacity: 0.06, shadowRadius: 20, elevation: 4 },
  lg: { shadowColor: '#1A1640', shadowOffset: {width:0, height:8},
        shadowOpacity: 0.08, shadowRadius: 32, elevation: 8 },
  gold: { shadowColor: '#C9973C', shadowOffset: {width:0, height:4},
          shadowOpacity: 0.3, shadowRadius: 16, elevation: 6 },
};
```

#### [NEW] [gradients.ts](file:///d:/Firaz/Mobile/React%20Native/nesavent/constants/gradients.ts)

Header gradient, poster overlay, gold accent gradient, card subtle gradient.

#### [NEW] [categories.ts](file:///d:/Firaz/Mobile/React%20Native/nesavent/constants/categories.ts) + [faculties.ts](file:///d:/Firaz/Mobile/React%20Native/nesavent/constants/faculties.ts)

Event categories with emoji icons & colors. Full list of UNESA faculties.

#### [MODIFY] [theme.ts](file:///d:/Firaz/Mobile/React%20Native/nesavent/constants/theme.ts)

Consolidated export that re-exports colors, typography, spacing, shadows.

---

### Component 3 — UI Component Library (Premium Style)

> Atomic design primitives — pill buttons, clean cards, smooth chips.

#### [NEW] `components/ui/Button.tsx`

4 variants, all **pill-shaped** (borderRadius: 999):
- **FilledButton** — Gold gradient bg, navy text, gold glow shadow
- **OutlinedButton** — Thin navy border, transparent bg
- **TextButton** — Gold text only, no bg/border
- **ElevatedButton** — Navy bg, white text

Props: `title`, `onPress`, `variant`, `size`, `loading`, `disabled`, `icon`, `fullWidth`

#### [NEW] `components/ui/Card.tsx`

Clean card: white bg, borderRadius 20pt, subtle shadow (0.06 opacity), **NO border**.

#### [NEW] `components/ui/Chip.tsx`

Full-rounded (borderRadius 999):
- Selected: gold-500 fill + navy text
- Unselected: gray-100 fill + gray-600 text
- Category: colored bg variants
- Status: success/warning/error semantic colors

#### [NEW] `components/ui/TextField.tsx`

Filled-style: gray-50 bg, borderRadius 16pt, 54pt height, no visible border → gold-400 border on focus. Floating label animation.

#### [NEW] `components/ui/Badge.tsx`, `Dropdown.tsx`, `TabBar.tsx`, `Shimmer.tsx`, `EmptyState.tsx`, `ProgressStepper.tsx`, `Divider.tsx`, `BottomSheet.tsx`

All remaining atomic components with premium styling.

---

### Component 4 — TypeScript Type Definitions

> Type-safe models mirroring PRD Section 9.

#### [NEW] `types/user.ts`, `types/event.ts`, `types/ticket.ts`, `types/order.ts`, `types/organization.ts`, `types/notification.ts`, `types/api.ts`

All core entities from PRD data model, fully typed with discriminated unions and enums.

Key types:
```typescript
// user.ts
type CivitasType = 'mahasiswa' | 'dosen' | 'tendik';
type UserRole = 'attendee' | 'organizer' | 'admin';

// event.ts
type EventCategory = 'seminar' | 'workshop' | 'kompetisi' | 'seni' | 'olahraga' | 'sosial' | 'orientasi' | 'festival' | 'lainnya';
type AudienceConfig = 'internal_only' | 'open' | 'by_invitation';
type EventStatus = 'draft' | 'pending_review' | 'published' | 'cancelled' | 'completed';

// ticket.ts
type TicketStatus = 'active' | 'used' | 'cancelled';

// order.ts
type OrderStatus = 'pending' | 'paid' | 'confirmed' | 'cancelled' | 'expired';
```

---

### Component 5 — Mock API Server (MSW)

> Mock Service Worker sebagai API server selama development. Realistic delays, error states, pagination.

#### [NEW] `services/mock/server.ts`

MSW setup with `setupServer()` for React Native:
- Intercepts all API calls to `/api/*`
- Realistic response delays (200-500ms)
- Error state simulation

#### [NEW] `services/mock/handlers/*.handlers.ts`

REST handlers for all API endpoints:
- `GET /api/events` — list, search, filter, featured
- `GET /api/events/:id` — detail with ticket types
- `POST /api/orders` — create order
- `GET /api/tickets/mine` — my tickets
- `POST /api/auth/google` — mock auth (return JWT)
- `GET /api/notifications` — notification list
- etc.

#### [NEW] `services/mock/data/*.data.ts`

15+ realistic UNESA events with proper relationships:
- "Seminar Nasional Pendidikan 2026" (Seminar, gratis)
- "PKKMB Fakultas Teknik" (Orientasi, internal only)
- "Konser Dies Natalis ke-62" (Seni, berbayar Rp 25.000)
- "UNESA Cup Futsal 2026" (Kompetisi, berbayar)
- "Workshop UI/UX Design" (Workshop, gratis)
- etc.

Organizations: BEM UNESA, Himpunan Teknik Informatika, UKM Paduan Suara, dll.

---

### Component 6 — State Management & API Layer

> Zustand for client state, TanStack Query for server state, Axios for HTTP.

#### [NEW] `stores/auth.store.ts`

```typescript
interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isFirstLogin: boolean;
  // actions
  login: (googleIdToken: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
  completeProfile: (data: ProfileFormData) => Promise<void>;
  setMockUser: (user: User) => void; // for dev
}
```

#### [NEW] `stores/onboarding.store.ts`, `stores/ui.store.ts`

Onboarding completion tracking, active filters, UI preferences.

#### [NEW] `services/api/client.ts`

Axios instance: base URL, JWT interceptor, 401 auto-refresh, error handling.

#### [NEW] `services/api/*.api.ts`

API functions for each domain (events, orders, tickets, etc.).

#### [NEW] `hooks/queries/*.ts`

TanStack Query hooks wrapping API calls with caching, refetch, optimistic updates.

---

### Component 7 — Routing & Navigation

> expo-router v6 with Stack.Protected auth guard + bottom tabs.

#### [MODIFY] [app/_layout.tsx](file:///d:/Firaz/Mobile/React%20Native/nesavent/app/_layout.tsx)

Root layout:
1. Load Plus Jakarta Sans fonts (all weights including Light/ExtraBold)
2. Keep splash screen until fonts loaded
3. `Stack.Protected` for auth guard:
   - `guard={isAuthenticated}` → `(app)` screens
   - `guard={!isAuthenticated}` → `(auth)` screens
4. Wrap with `AppProviders` (QueryClient, GestureHandler)

#### [NEW] `app/(auth)/_layout.tsx`

Stack navigator for auth flow. No header.

#### [NEW] `app/(app)/_layout.tsx`

Stack navigator wrapping tabs and all stacked screens.

#### [NEW] `app/(app)/(tabs)/_layout.tsx`

Premium bottom tabs:
- 4 tabs (5 for organizer role): Beranda, Jelajahi, Tiket Saya, Profil, [Kelola]
- Floating tab bar style: rounded top (24pt), subtle shadow
- Selected: navy-900 icon + gold pill indicator
- Unselected: gray-400

#### [NEW] `providers/AppProviders.tsx`

QueryClientProvider + GestureHandlerRootView + BottomSheetModalProvider + MSW init.

---

### Component 8 — Auth Screens (SCR-01 → SCR-04) — P0

> 4 auth screens. OAuth mocked for now, full Google integration later.

#### [NEW] `app/(auth)/index.tsx` — Splash (SCR-01)

- Gradient navy-900 → navy-800 background
- Animated logo fade-in + scale (reanimated)
- "NesaVent" in gold-400 + tagline
- Auto-navigate after 2s (check mock auth state)

#### [NEW] `app/(auth)/onboarding.tsx` — Onboarding (SCR-02)

- 3-slide horizontal pager with smooth dot indicator
- Premium illustrations (navy/gold/purple palette)
- "Lewati" text button + "Mulai Sekarang →" pill CTA
- Saves completion to AsyncStorage

#### [NEW] `app/(auth)/login.tsx` — Login (SCR-03)

- Clean minimal layout, navy-900 background
- Logo + app name + tagline
- Subtle geometric pattern (low opacity)
- **One pill button:** "Masuk dengan Akun Google UNESA" (white bg, Google icon)
- "🔒 Hanya untuk civitas UNESA" info text
- Mock: taps → instant login with mock user
- Later: real Google OAuth flow

#### [NEW] `app/(auth)/complete-profile.tsx` — Profile Onboarding (SCR-04)

- Auto-filled: avatar, name, email from (mock) Google
- Form: HP*, Fakultas* (dropdown), Status* (radio), NIM/NIP (optional)
- "Simpan & Mulai →" gold pill CTA
- Cannot skip (blocks navigation until complete)

---

### Component 9 — Beranda Screens (SCR-10, SCR-11) — P0

#### [NEW] `app/(app)/(tabs)/index.tsx` — Beranda (SCR-10)

Premium home feed:
1. **Greeting header** — Navy gradient bg, curved bottom, "Halo, {nama}! 👋"
2. **Search bar** — Floating card, pill-shaped, tap → search screen
3. **Featured carousel** — Full-bleed poster 16:9, gradient overlay, dot indicator (gold)
4. **Category chips** — Horizontal scroll, pill-shaped
5. **Segera Berlangsung** — Horizontal scroll compact EventCards
6. **Populer Bulan Ini** — Vertical list with thumbnails
7. All data from mock API via TanStack Query

#### [NEW] `app/(app)/notifications.tsx` — Notifikasi (SCR-11)

- Grouped by date (Hari ini / Kemarin / Minggu lalu)
- Gold dot for unread, colored icon per type
- "Tandai Semua Dibaca" action
- Empty state

---

### Component 10 — Jelajahi Screens (SCR-20, SCR-21) — P0

#### [NEW] `app/(app)/(tabs)/explore.tsx` — Jelajahi (SCR-20)

- Search bar at top
- Category grid 2×4 with colored cards + emoji icons
- "Semua Event" vertical list
- Tap category → filtered view

#### [NEW] `app/(app)/search.tsx` — Search with Filters

- Auto-suggest dropdown (5 events, 3 orgs)
- Filter chips row
- Results list with result count

#### [NEW] `components/event/FilterBottomSheet.tsx` — Filter (SCR-21)

- Bottom sheet (gorhom/bottom-sheet)
- Multi-select category chips
- Price radio: Semua / Gratis / Berbayar
- Event type: Semua / Internal / Terbuka
- Date range picker
- "Tampilkan Hasil" gold pill CTA

---

### Component 11 — Detail Event (SCR-30) — P0

#### [NEW] `app/(app)/event/[id].tsx` — Detail Event (SCR-30)

Rich detail screen:
1. **Animated header** — Poster hero (280pt), parallax collapse to navy pinned bar
2. **Badges** — Category (gold), price (green/navy), audience (purple/teal)
3. **Organizer** — Logo circle + name + verified badge
4. **Info grid** — Date, time, location, maps link, remaining tickets, deadline
5. **Tabs** — Deskripsi | Jadwal | Penyelenggara (gold underline indicator)
6. **Ticket selection** — TicketTypeCard with radio, gold border when selected
7. **Sticky footer** — Price + "Pesan Tiket →" gold pill CTA
8. Share + bookmark actions in header

---

### Component 12 — Checkout Flow (SCR-40 → SCR-42) — P0

#### [NEW] `app/(app)/checkout/[eventId].tsx` — Step 1 (SCR-40)

- Progress: ●──○──○ (gold stepper)
- Event summary card
- Ticket type + quantity stepper
- Pre-filled attendee data
- Dynamic custom fields

#### [NEW] `app/(app)/checkout/summary.tsx` — Step 2 (SCR-41)

- Full order summary card
- Payment method selection (mocked)
- Price breakdown
- T&C checkbox
- "Konfirmasi" / "Bayar Sekarang →"

#### [NEW] `app/(app)/checkout/confirmation.tsx` — Step 3 (SCR-42)

- **Free events**: Confetti animation + success state + "Lihat Tiket" CTA
- **Paid events**: Countdown timer + payment instructions + "Cek Status"

---

### Component 13 — Tiket Saya (SCR-50 → SCR-52) — P0

#### [NEW] `app/(app)/(tabs)/tickets.tsx` — Daftar Tiket (SCR-50)

- Tab bar: Upcoming | Selesai | Dibatalkan (with badge count)
- TicketCard with gold/gray/red left accent
- Empty state per tab

#### [NEW] `app/(app)/ticket/[id].tsx` — Detail Tiket (SCR-51)

- Ticket-style card with perforated divider (zigzag pattern)
- Info grid: holder, type, order ID, status
- QR Code (250×250pt) center
- "SUDAH DIGUNAKAN" watermark overlay

#### [NEW] `app/(app)/ticket/qr/[id].tsx` — QR Fullscreen (SCR-52)

- White background, large QR (300pt)
- Screen stays awake (keep-awake)
- Works offline (cached data)

---

### Component 14 — Profil Screens (SCR-60, SCR-61, SCR-81, SCR-82) — P0/P1

#### [NEW] `app/(app)/(tabs)/profile.tsx` — Profil (SCR-60) — P0

- Gradient header, avatar with gold ring
- Name, email, "Civitas UNESA ✓" badge
- Menu list with icons
- "Keluar dari Akun" with confirmation dialog

#### [NEW] `app/(app)/profile/edit.tsx` — Edit Profil (SCR-61) — P1

- Editable avatar, form fields
- "Simpan" in header

#### [NEW] `app/(app)/profile/bookmarks.tsx` — Tersimpan (SCR-81) — P1

- Swipe-to-delete EventCard list
- Empty state

#### [NEW] `app/(app)/profile/orders.tsx` — Riwayat (SCR-82) — P1

- Tabs: Semua | Berhasil | Menunggu | Dibatalkan
- Order items with status chips

---

### Component 15 — Organizer Screens (SCR-70 → SCR-74, SCR-80) — P0/P1

#### [NEW] `app/(app)/organizer/index.tsx` — Dashboard (SCR-70) — P0

- Org card with verified badge
- Stats 2×2 grid (colored cards: navy/gold/purple/teal)
- Active events list with progress bars

#### [NEW] `app/(app)/organizer/create-event.tsx` — Buat Event (SCR-71) — P0

- 4-step form with progress indicator
- Step 1: Info dasar (judul, deskripsi, poster, kategori, audience config)
- Step 2: Waktu & tempat (dates, location, online toggle)
- Step 3: Tiket (add ticket types: name, price, quota)
- Step 4: Review & publish

#### [NEW] `app/(app)/organizer/participants/[eventId].tsx` — Peserta (SCR-72) — P0

- Search, filter, stats (total/checked-in/pending)
- Participant list with status chips
- FAB → QR Scanner

#### [NEW] `app/(app)/organizer/scanner/[eventId].tsx` — QR Scanner (SCR-73) — P0

- expo-camera CameraView with gold viewfinder
- Success: green flash + haptic + attendee info
- Already used: yellow warning
- Invalid: red error

#### [NEW] `app/(app)/organizer/register.tsx` — Daftar Penyelenggara (SCR-80) — P0

- Registration form for new organizer
- Document upload (SK PDF)

#### [NEW] `app/(app)/organization/[id].tsx` — Profil Org Public (SCR-74) — P1

- Header with logo, name, type, verified badge
- Stats + event tabs

---

### Component 16 — Utilities & Helpers

#### [NEW] `utils/format.ts`

Formatters: `formatDate`, `formatTime`, `formatCurrency` (Rp), `formatRelativeTime`, `formatTicketCount`

#### [NEW] `utils/validation.ts`

Validators: `isUnesaDomain`, `validatePhone` (08xxx), `validateNIM`

#### [NEW] `utils/qr.ts`

QR data encoding/decoding for ticket verification

#### [NEW] `utils/domain-check.ts`

Domain extraction + validation for `@unesa.ac.id` / `@mhs.unesa.ac.id`

---

## Verification Plan

### Build & Type Checks

```bash
npm install                    # All deps install clean
npx expo-doctor                # Expo compatibility check
npx tsc --noEmit               # TypeScript compiles
npm run lint                   # No lint errors
npx expo start                 # Dev server starts
```

### Screen-by-Screen Testing

| Priority | Screen Group | Method | Mock Data |
|---|---|---|---|
| P0 | Auth (SCR-01→04) | Expo Go (mocked OAuth) | Mock user |
| P0 | Beranda (SCR-10) | Expo Go | MSW mock API |
| P0 | Jelajahi (SCR-20→21) | Expo Go | MSW mock API |
| P0 | Detail Event (SCR-30) | Expo Go | MSW mock API |
| P0 | Checkout (SCR-40→42) | Expo Go | MSW mock API |
| P0 | Tiket Saya (SCR-50→52) | Expo Go | MSW mock API |
| P0 | Profil (SCR-60) | Expo Go | MSW mock API |
| P0 | Organizer (SCR-70→73) | Dev Build (camera) | MSW mock API |
| P1 | Edit Profil, Bookmarks, Orders | Expo Go | MSW mock API |
| P1 | Profil Org (SCR-74) | Expo Go | MSW mock API |

### UI Quality Checklist

- [ ] Plus Jakarta Sans renders (all weights: Light through ExtraBold)
- [ ] All buttons are pill-shaped (borderRadius 999)
- [ ] Cards have subtle shadow (opacity ≤ 0.06), NO borders
- [ ] Gold CTA buttons have golden glow shadow
- [ ] Bottom nav: floating style, rounded top, subtle shadow
- [ ] Headers: smooth navy→purple gradient with curved bottom
- [ ] Color palette matches UNESA official (navy/gold/purple)
- [ ] Typography hierarchy clear (display → headline → title → body → label)
- [ ] Spacing generous (20pt screen padding, 28pt section gaps)
- [ ] Animations smooth (fade+slide transitions, spring interactions)
- [ ] Shimmer loading states on data-heavy screens
- [ ] Empty states with illustrations on all list screens
- [ ] Safe area handling (notch, status bar, home indicator)
- [ ] Responsive layout (360-430px width range)

---

## Delivery Roadmap — Phase 1: Frontend (~10 Weeks)

| Week | Deliverable | Screens | Priority |
|---|---|---|---|
| **1-2** | Project setup, design system, component library, MSW mock server | — | Foundation |
| **3** | Auth flow (splash, onboarding, login mock, profile completion) | SCR-01→04 | P0 |
| **4-5** | Beranda + Jelajahi (home feed, search, filter, categories) | SCR-10, SCR-11, SCR-20, SCR-21 | P0 |
| **6-7** | Detail Event + Checkout (3-step booking flow) | SCR-30, SCR-40→42 | P0 |
| **8** | Tiket Saya + QR display (list, detail, fullscreen QR) | SCR-50→52 | P0 |
| **9** | Profil + Notifikasi + Edit + Bookmarks + Orders | SCR-60, SCR-61, SCR-81, SCR-82 | P0+P1 |
| **10** | Organizer (dashboard, create event, participants, QR scanner) | SCR-70→74, SCR-80 | P0 |

> [!TIP]
> **Rekomendasi eksekusi:** Mulai dari Week 1-2 (Design System + Component Library + MSW). Foundation yang kuat = development cepat di week berikutnya.

---

*NesaVent Implementation Plan v2.0 | Mei 2026 | Frontend-First Approach*
