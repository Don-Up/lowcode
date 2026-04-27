'use client';

import React from 'react';
import { Empty } from 'antd';
import { getComp } from '@/app/editor/components/EditorCenterCanvas';
import { loadDraft } from '@/utils/draft';
import { Component } from '@/app/editor/components/Model';

const PreviewRenderer: React.FC = () => {
  const draft = loadDraft();

  if (!draft || !draft.components || draft.components.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <Empty description="暂无组件可预览，请先在编辑页面添加组件" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {draft.components.map((comp: Component) => (
        <div key={comp.id}>
          {getComp(comp, false)}
        </div>
      ))}
    </div>
  );
};

export default PreviewRenderer;