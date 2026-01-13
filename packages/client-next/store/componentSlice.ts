import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Component } from '@/app/editor/components/Model';

interface ComponentState {
  components: Component[];
  selectedComponentId: string | null;
  isPreviewMode: boolean;
  formData: { [key: string]: string },
  submissionResult: string | null
  submissionError: string | null
}

const initialState: ComponentState = {
  components: [],
  selectedComponentId: null,
  isPreviewMode: false,
  formData: {},
  submissionResult: null,
  submissionError: null,
};

const compSlice = createSlice({
  name: 'comp',
  initialState,
  reducers: {
    setComponents: (state: ComponentState, action: PayloadAction<Component[]>) => {
      state.components = action.payload;
    },
    addComponent: (state: ComponentState, action: PayloadAction<Component>) => {
      console.log('addComponent', action.payload);
      // state.components.push(action.payload);
      const newComp = action.payload;
      if (newComp.parentId) {
        // Find the parent container and add to its children
        const parentIndex = state.components.findIndex((c) => c.id === newComp.parentId);
        if (parentIndex !== -1 && state.components[parentIndex].type === 'container') {
          const comp = state.components[parentIndex];
          if (!comp.children) {
            comp.children = [];
          }
          comp.children!.push(newComp);
        }
      } else {
        // Add to root level if no parentId
        state.components.push(newComp);
      }
    },
    updateComponent: (state: ComponentState, action: PayloadAction<Component>) => {
      const updatedComp = action.payload;
      const updateNested = (comps: Component[]): boolean => {
        for (let i = 0; i < comps.length; i++) {
          if (comps[i].id === state.selectedComponentId) {
            comps[i] = updatedComp;
            return true;
          }
          if (comps[i].type === 'container' && comps[i].children) {
            if (updateNested(comps[i].children!)) return true;
          }
        }
        return false;
      };
      updateNested(state.components);
      // const index = state.components.findIndex((c) => c.id === state.selectedComponentId);
      // if (index !== -1) {
      //     state.components[index] = action.payload;
      // }
    },
    clearComponents: (state: ComponentState) => {
      state.components = [];
      state.selectedComponentId = null;
    },
    setSelectComponentId: (state: ComponentState, action: PayloadAction<string | null>) => {
      state.selectedComponentId = action.payload;
    },
    swapComponent: (state: ComponentState, action: PayloadAction<{ oldIndex: number, newIndex: number }>) => {
      // const {oldIndex, newIndex} = action.payload;
      // [state.components[oldIndex], state.components[newIndex]] = [state.components[newIndex], state.components[oldIndex]];
      const { oldIndex, newIndex } = action.payload;
      if (oldIndex >= 0 && newIndex >= 0 && oldIndex < state.components.length && newIndex < state.components.length) {
        [state.components[oldIndex], state.components[newIndex]] = [state.components[newIndex], state.components[oldIndex]];
      }
    },
    removeComponent: (state: ComponentState, action: PayloadAction<string>) => {
      state.components = state.components.filter((c) => c.id !== action.payload);
      state.selectedComponentId = null;
    },
    saveState: (state) => state, // 仅用于触发保存，无需修改状态
    loadState: (state, action: PayloadAction<Component[]>) => {
      state.components = action.payload;
      state.selectedComponentId = null; // 重置选中状态
    },
    setPreviewMode: (state, action: PayloadAction<boolean>) => {
      state.isPreviewMode = action.payload;
    },
    updateFormData: (state, action: PayloadAction<{ id: string; value: string }>) => {
      state.formData[action.payload.id] = action.payload.value;
    },
    clearSubmissionResult: (state) => {
      state.submissionResult = null;
      state.submissionError = null;
    },
  },
});

export const {
  setComponents,
  addComponent,
  clearComponents,
  setSelectComponentId,
  updateComponent,
  swapComponent,
  removeComponent,
  saveState,
  loadState,
  setPreviewMode,
  updateFormData,
  clearSubmissionResult,
} = compSlice.actions;
export default compSlice.reducer;
