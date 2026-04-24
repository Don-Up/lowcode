# Plan: YouTube Video Embed Support

## Context
When a user pastes a YouTube URL (e.g., `https://www.youtube.com/watch?v=mZ3Dj0sRqlk`) into the video URL input, the video player on the canvas doesn't play. This is because YouTube URLs are not direct video URLs - they require embedding via an iframe with the YouTube embed URL format.

## Root Cause
The `<video>` element can only play direct video file URLs (MP4, WebM, etc.). YouTube watch URLs are HTML pages, not video files, so the browser can't play them in a video tag.

## Implementation

### Step 1: Create YouTube URL converter utility
**File:** `packages/client-next/utils/videoUrl.ts`
- Function `convertToEmbedUrl(url: string): string`
- Detect YouTube watch URLs (`youtube.com/watch?v=...`)
- Detect YouTube short URLs (`youtu.be/...`)
- Convert to embed URL format (`youtube.com/embed/...`)
- Return original URL if not a YouTube URL

### Step 2: Update VideoComponent to use converter
**File:** `packages/client-next/app/editor/components/video/index.tsx`
- Import and use `convertToEmbedUrl` utility
- When URL is a YouTube URL, render an `<iframe>` instead of `<video>`
- Pass embed URL to iframe src
- Maintain same styling

### Step 3: Add tests
**File:** `packages/client-next/__tests__/videoUrl.test.ts`
- Test YouTube watch URL conversion
- Test YouTube short URL conversion
- Test non-YouTube URLs pass through unchanged

### Verification
1. Run `pnpm test` - all tests pass
2. TypeScript compiles: `pnpm exec tsc --noEmit`
3. Start dev server, add video component, paste YouTube URL, verify iframe renders correctly