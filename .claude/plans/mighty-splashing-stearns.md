# Plan: Preview Page Feature

## Context

Add a preview page that displays the low-code page without the editor UI. When user clicks preview, it saves the current draft and navigates to a standalone preview page showing the rendered components. The preview page has a "返回编辑" button to go back to the editor.

## Implementation

### Step 1: Create Preview Components Renderer

**File:** `packages/client-next/app/preview/components/PreviewRenderer.tsx`

- Loads components from localStorage draft using existing `loadDraft()` utility
- Renders each component using `getComp()` function from EditorCenterCanvas
- Handles empty state when no draft exists
- No selection UI, no drag handles - just pure component display

### Step 2: Create Preview Page

**File:** `packages/client-next/app/preview/page.tsx`

- Layout with floating "返回编辑" button at top-left
- Renders PreviewRenderer in center
- Uses `useRouter` for back navigation to `/editor`
- Shows page title from draft data

### Step 3: Update EditorHeader Preview Button

**File:** `packages/client-next/app/editor/components/EditorHeader.tsx`

- Change "预览" button to navigate to `/preview` instead of toggling preview mode
- Before navigating, save current draft using existing `saveDraft()` utility

### Key Files to Modify/Create

| File | Change |
|------|--------|
| `app/preview/page.tsx` | New - preview page with back button |
| `app/preview/components/PreviewRenderer.tsx` | New - renders components from draft |
| `app/editor/components/EditorHeader.tsx` | Update preview button to navigate to /preview |

### Reuse Existing Code

- `utils/draft.ts` - existing `saveDraft()` and `loadDraft()` utilities
- `app/editor/components/EditorCenterCanvas.tsx` - `getComp()` function for rendering components

## Verification

1. Run `pnpm test` - all tests pass
2. TypeScript compiles: `pnpm exec tsc --noEmit`
3. Start dev server, add components, click "预览", verify preview page renders
4. Click "返回编辑", verify navigates back to editor