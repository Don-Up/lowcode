# CLAUDE@

# Low-Code Platform

## Project Overview
Monorepo visual low-code page editor with drag-and-drop UI for creating web pages without coding.

## Tech Stack

| Package | Framework | Purpose |
|---------|-----------|---------|
| `client-next` | Next.js 16 + React 19 + Tailwind CSS 4 | Main low-code visual editor |
| `client` | Vite + React | Legacy client (deprecated) |
| `server` | NestJS + Prisma + PostgreSQL | Backend API |
| `share` | TypeScript only | Shared types/components |

## Key Technologies
- **Frontend:** Redux Toolkit, Redux Persist, dnd-kit (drag-and-drop), Ant Design, react-i18next
- **Backend:** JWT auth, Redis caching, PostgreSQL via Prisma

## Running the Project

```bash
# Start main editor (port 3000)
pnpm run:client-next

# Start backend (port 3000)
pnpm run:server

# Build share package
pnpm build:share
```

## Project Structure

```
packages/
├── client-next/
│   ├── app/
│   │   ├── page.tsx           # Home page
│   │   ├── layout.tsx         # Root layout
│   │   └── editor/
│   │       ├── page.tsx        # Editor page
│   │       └── components/     # Editor components (15+ components)
│   ├── components/             # Shared components
│   ├── hooks/                  # Custom hooks
│   ├── store/                  # Redux slices
│   └── i18n/                   # Internationalization
├── server/
│   └── src/
│       ├── auth/               # JWT authentication
│       ├── user/               # User management
│       └── low-code/           # Page/component APIs
└── share/                      # Shared TypeScript types
```

## Editor Components

Components follow a consistent pattern with 3 files each:
- `index.tsx` - Component rendering
- `*Props.ts` - TypeScript interface + default props
- `*PropComponent.tsx` - Property panel for editing

Available components: Text, Image, Swiper, Card, List, Split, Empty, RichText, QRCode, Alert, Input, TextArea, Radio, Checkbox, Video

## Conventions

### Component Pattern
Each editor component should have:
1. Props interface extending `Component` from Model
2. Default props export
3. Component with click handler to select
4. PropComponent for property editing

### State Management
- Uses Redux Toolkit with redux-undo (30 step limit)
- Components access state via `useAppSelector` and `useAppDispatch` hooks
- Selection stored in `selectedComponentId`
- Preview mode: `isPreviewMode` boolean

### i18n
- Uses react-i18next for internationalization
- Translation files: `i18n/locales/en.json` and `cn.json`
- Language switch in header (EN/中文)
- All UI text should use `t('key')` translation function

### Key Files
- `componentSlice.ts` - Main Redux slice for components
- `EditorCenterCanvas.tsx` - Main canvas with drag-and-drop
- `EditorRightPanel.tsx` - Property panel switch
- `EditorHeader.tsx` - Header with actions

## Recent Changes

- Added i18n support with EN/CN languages
- Added video component implementation
- Added preview mode toggle
- Added save/load draft functionality
- Fixed useOnce bug that cleared components on mount
