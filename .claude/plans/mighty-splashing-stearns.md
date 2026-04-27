# Plan: Add Tests for Publish Feature

## Context

Add unit tests for the recently implemented publish feature (usePublish hook).

## Tests to Add

### usePublish hook tests (`__tests__/usePublish.test.ts`)

- Initial publishing state is false
- Sets publishing to true when publish is called
- Calls API with correct data (pageName, components)
- Returns success true with pageId on successful publish
- Returns success false on API failure
- Handles network errors gracefully
- Sets publishing back to false after publish completes