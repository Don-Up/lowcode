// packages/client-next/app/editor/components/radio/index.tsx
// packages/client-next/app/editor/components/radio/index.tsx
'use client';

import React from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setSelectComponentId } from '@/store/componentSlice';
import RadioProps from '@/app/editor/components/radio/RadioProps';
import { Radio, Space } from 'antd';

const RadioComponent: React.FC<RadioProps> = ({
                                                id,
                                                title = '默认展示的标题',
                                                defaultRadio,
                                                options = [],
                                              }) => {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setSelectComponentId(id));
  }

  return (
    <div
      className="cursor-pointer hover:bg-gray-50 transition-colors p-4 rounded min-h-[120px]"
      onClick={handleClick}
    >
      <div className="mb-3 font-medium text-gray-700">
        {title || '默认展示的标题:'}
      </div>

      <Radio.Group
        value={defaultRadio}
        disabled // 画布中禁用交互，仅预览
      >
        <Space direction="vertical">
          {options.map((opt) => (
            <Radio key={opt.id} value={opt.id}>
              {opt.value || '选项'}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default RadioComponent;