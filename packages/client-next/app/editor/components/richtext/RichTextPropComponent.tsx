// packages/client-next/app/editor/components/richtext/RichTextPropComponent.tsx
'use client';

import React, { useEffect, useMemo } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import RichTextProps from '@/app/editor/components/richtext/RichTextProps';

interface RichTextPropCompProps extends RichTextProps {
  onChange: (values: RichTextProps) => void;
}

const RichTextPropComp: React.FC<RichTextPropCompProps> = (props) => {
  const { id, content = '', onChange } = props
  // 使用 useMemo 避免每次渲染都重新创建 modules 配置
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ font: [] }], // 字体选择（Sans Serif, Serif, Monospace 等）
        [{ align: [] }], // 对齐方式：左中右两端

        ['bold', 'italic', 'underline'], // 粗体 斜体 下划线
        ['clean'], // 清除格式

        // 可按需后续添加更多：
        // [{ header: [1, 2, 3, false] }],
        // [{ list: 'ordered' }, { list: 'bullet' }],
        // [{ color: [] }, { background: [] }],
        // ['link', 'image'],
      ],
    }),
    []
  );

  const handleChange = (newContent: string) => {
    onChange({ ...props, content: newContent });
  };

  return (
    <div className="mt-5 border rounded overflow-hidden">
      <div className="bg-gray-50 px-3 py-2 text-sm text-gray-600 border-b">
        请在富文本输入内容
      </div>

      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleChange}
        modules={modules}
        placeholder="请输入内容..."
        className="min-h-[300px]"
      />
    </div>
  );
};

export default RichTextPropComp;