// packages/client-next/app/editor/components/richtext/index.tsx
'use client';

import React from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setSelectComponentId } from '@/store/componentSlice';
import RichTextProps from '@/app/editor/components/richtext/RichTextProps';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const RichTextComponent: React.FC<RichTextProps> = ({ id, content = '' }) => {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setSelectComponentId(id));
  }

  return (
    <div
      className="cursor-pointer hover:bg-gray-50 transition-colors rounded min-h-[120px]"
      onClick={handleClick}
    >
      <ReactQuill
        value={content}
        readOnly={true}           // 在画布中只读，防止误操作
        theme="snow"
        modules={{ toolbar: false }} // 画布中不显示工具栏
        className="h-full"
      />
    </div>
  );
};

export default RichTextComponent;