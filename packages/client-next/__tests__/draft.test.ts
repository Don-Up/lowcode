import { saveDraft, loadDraft, clearDraft, getDraftTimestamp, formatDraftTime } from '../utils/draft';
import { Component } from '../app/editor/components/Model';

const DRAFT_KEY = 'lowcode-draft';

const createMockComponent = (id: string): Component =>
  ({ id, type: 'text' } as Component);

describe('draft utilities', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('saveDraft', () => {
    it('should save draft with components and pageTitle', () => {
      const components = [createMockComponent('1'), createMockComponent('2')];
      saveDraft({ components, pageTitle: 'Test Page' });

      const saved = localStorage.getItem(DRAFT_KEY);
      expect(saved).toBeTruthy();

      const draft = JSON.parse(saved!);
      expect(draft.components).toHaveLength(2);
      expect(draft.pageTitle).toBe('Test Page');
      expect(draft.savedAt).toBeTruthy();
      expect(draft.version).toBe('1.0');
    });
  });

  describe('loadDraft', () => {
    it('should return draft data when exists', () => {
      const draftData = {
        components: [createMockComponent('1')],
        pageTitle: 'My Page',
        savedAt: Date.now(),
        version: '1.0',
      };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData));

      const result = loadDraft();
      expect(result).toBeTruthy();
      expect(result!.pageTitle).toBe('My Page');
      expect(result!.components).toHaveLength(1);
    });

    it('should return null when no draft exists', () => {
      const result = loadDraft();
      expect(result).toBeNull();
    });

    it('should return null when draft has invalid structure', () => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ invalid: 'data' }));
      const result = loadDraft();
      expect(result).toBeNull();
    });
  });

  describe('clearDraft', () => {
    it('should remove draft from localStorage', () => {
      saveDraft({ components: [], pageTitle: 'Test' });
      clearDraft();
      expect(localStorage.getItem(DRAFT_KEY)).toBeNull();
    });
  });

  describe('getDraftTimestamp', () => {
    it('should return timestamp when draft exists', () => {
      const timestamp = Date.now();
      const draftData = {
        components: [],
        pageTitle: 'Test',
        savedAt: timestamp,
        version: '1.0',
      };
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData));

      const result = getDraftTimestamp();
      expect(result).toBe(timestamp);
    });

    it('should return null when no draft', () => {
      const result = getDraftTimestamp();
      expect(result).toBeNull();
    });
  });

  describe('formatDraftTime', () => {
    it('should return "刚刚" for recent time', () => {
      const result = formatDraftTime(Date.now());
      expect(result).toBe('刚刚');
    });

    it('should return minutes ago', () => {
      const fiveMinsAgo = Date.now() - 5 * 60 * 1000;
      const result = formatDraftTime(fiveMinsAgo);
      expect(result).toBe('5分钟前');
    });

    it('should return hours ago', () => {
      const twoHoursAgo = Date.now() - 2 * 60 * 60 * 1000;
      const result = formatDraftTime(twoHoursAgo);
      expect(result).toBe('2小时前');
    });

    it('should return days ago', () => {
      const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;
      const result = formatDraftTime(threeDaysAgo);
      expect(result).toBe('3天前');
    });
  });
});