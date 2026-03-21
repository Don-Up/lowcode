// packages/client-next/app/editor/components/checkbox/index.tsx
'use client';

import React from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setSelectComponentId } from '@/store/componentSlice';
import CheckboxProps from '@/app/editor/components/checkbox/CheckboxProps';
import { Checkbox, Space } from 'antd';

const CheckboxComponent: React.FC<CheckboxProps> = ({
                                                      id,
                                                      title = '默认展示的标题',
                                                      defaultChecked = [],
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

      <Checkbox.Group
        value={defaultChecked}
        disabled // 画布中禁用交互，仅用于预览效果
      >
        <Space orientation="vertical">
          {options.map((opt) => (
            <Checkbox key={opt.id} value={opt.id}>
              {opt.value || '选项'}
            </Checkbox>
          ))}
        </Space>
      </Checkbox.Group>
    </div>
  );
};

export default CheckboxComponent;