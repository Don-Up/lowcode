import { setPageTitle } from '../store/componentSlice';
import componentReducer from '../store/componentSlice';

const createMockState = (overrides = {}) => ({
  components: [],
  selectedComponentId: null,
  isPreviewMode: false,
  pageTitle: '小滴低代码平台',
  formData: {},
  submissionResult: null,
  submissionError: null,
  ...overrides,
});

describe('EditableTitle Redux logic', () => {
  describe('setPageTitle', () => {
    it('should update pageTitle in state', () => {
      const state = createMockState();
      const result = componentReducer(state, setPageTitle('New Title'));
      expect(result.pageTitle).toBe('New Title');
    });

    it('should allow empty string as title value (default title handled in component)', () => {
      const state = createMockState({ pageTitle: 'Custom Title' });
      const result = componentReducer(state, setPageTitle(''));
      expect(result.pageTitle).toBe('');
    });

    it('should preserve other state properties when updating title', () => {
      const state = createMockState({
        pageTitle: 'Old Title',
        components: [{ id: '1', type: 'text' }],
        selectedComponentId: '1',
      });
      const result = componentReducer(state, setPageTitle('New Title'));
      expect(result.pageTitle).toBe('New Title');
      expect(result.components).toHaveLength(1);
      expect(result.selectedComponentId).toBe('1');
    });

    it('should handle special characters in title', () => {
      const state = createMockState();
      const result = componentReducer(state, setPageTitle('页面 <标题> & 测试'));
      expect(result.pageTitle).toBe('页面 <标题> & 测试');
    });
  });
});