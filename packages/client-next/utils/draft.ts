// utils/draft.ts - Draft save/load utilities
import { Component } from '../app/editor/components/Model';

export interface DraftData {
  components: Component[];
  pageTitle: string;
  savedAt: number; // timestamp
  version: string;
}

const DRAFT_KEY = 'lowcode-draft';
const DRAFT_VERSION = '1.0';

export function saveDraft(data: { components: Component[]; pageTitle: string }): void {
  const draft: DraftData = {
    ...data,
    savedAt: Date.now(),
    version: DRAFT_VERSION,
  };
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

export function loadDraft(): DraftData | null {
  const saved = localStorage.getItem(DRAFT_KEY);
  if (!saved) return null;

  try {
    const draft = JSON.parse(saved) as DraftData;
    // Validate draft structure
    if (!draft.components || !Array.isArray(draft.components)) {
      return null;
    }
    return draft;
  } catch {
    return null;
  }
}

export function clearDraft(): void {
  localStorage.removeItem(DRAFT_KEY);
}

export function getDraftTimestamp(): number | null {
  const draft = loadDraft();
  return draft?.savedAt || null;
}

export function formatDraftTime(timestamp: number): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return '刚刚';
  if (diffMins < 60) return `${diffMins}分钟前`;
  if (diffHours < 24) return `${diffHours}小时前`;
  if (diffDays < 7) return `${diffDays}天前`;

  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}