import componentReducer, {
  moveUpComponent,
  moveDownComponent,
  removeComponent,
  setSelectComponentId,
} from '../store/componentSlice';
import { Component } from '../app/editor/components/Model';

const createMockComponent = (id: string, type: string = 'text'): Component =>
  ({ id, type } as Component);

const baseState = {
  isPreviewMode: false,
  pageTitle: '小滴低代码平台',
  formData: {},
  submissionResult: null,
  submissionError: null,
};

describe('componentSlice reducers', () => {
  describe('moveUpComponent', () => {
    it('should swap component with the one above it', () => {
      const state = {
        components: [
          createMockComponent('1', 'text'),
          createMockComponent('2', 'image'),
          createMockComponent('3', 'card'),
        ],
        selectedComponentId: '2',
        ...baseState,
      };

      const result = componentReducer(state, moveUpComponent('2'));

      expect(result.components[0].id).toBe('2');
      expect(result.components[1].id).toBe('1');
    });

    it('should not move if already at index 0', () => {
      const state = {
        components: [
          createMockComponent('1', 'text'),
          createMockComponent('2', 'image'),
        ],
        selectedComponentId: '1',
        ...baseState,
      };

      const result = componentReducer(state, moveUpComponent('1'));

      expect(result.components[0].id).toBe('1');
      expect(result.components[1].id).toBe('2');
    });
  });

  describe('moveDownComponent', () => {
    it('should swap component with the one below it', () => {
      const state = {
        components: [
          createMockComponent('1', 'text'),
          createMockComponent('2', 'image'),
          createMockComponent('3', 'card'),
        ],
        selectedComponentId: '2',
        ...baseState,
      };

      const result = componentReducer(state, moveDownComponent('2'));

      expect(result.components[1].id).toBe('3');
      expect(result.components[2].id).toBe('2');
    });

    it('should not move if already at last index', () => {
      const state = {
        components: [
          createMockComponent('1', 'text'),
          createMockComponent('2', 'image'),
        ],
        selectedComponentId: '2',
        ...baseState,
      };

      const result = componentReducer(state, moveDownComponent('2'));

      expect(result.components[0].id).toBe('1');
      expect(result.components[1].id).toBe('2');
    });
  });

  describe('removeComponent', () => {
    it('should remove component and clear selection', () => {
      const state = {
        components: [
          createMockComponent('1', 'text'),
          createMockComponent('2', 'image'),
        ],
        selectedComponentId: '1',
        ...baseState,
      };

      const result = componentReducer(state, removeComponent('1'));

      expect(result.components).toHaveLength(1);
      expect(result.components[0].id).toBe('2');
      expect(result.selectedComponentId).toBeNull();
    });
  });

  describe('setSelectComponentId', () => {
    it('should set selected component id', () => {
      const state = {
        components: [createMockComponent('1', 'text')],
        selectedComponentId: null,
        ...baseState,
      };

      const result = componentReducer(state, setSelectComponentId('1'));

      expect(result.selectedComponentId).toBe('1');
    });

    it('should clear selection when null passed', () => {
      const state = {
        components: [createMockComponent('1', 'text')],
        selectedComponentId: '1',
        ...baseState,
      };

      const result = componentReducer(state, setSelectComponentId(null));

      expect(result.selectedComponentId).toBeNull();
    });
  });
});