// packages/client-next/app/editor/components/input/index.tsx
'use client';

import React from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setSelectComponentId } from '@/store/componentSlice';
import InputProps from '@/app/editor/components/input/InputProps';
import { Input } from 'antd';

const InputComponent: React.FC<InputProps> = ({
                                                id,
                                                title = '默认展示的标题',
                                                text = '',
                                                placeholder = '请输入内容......',
                                              }) => {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setSelectComponentId(id));
  }

  return (
    <div
      className="cursor-pointer hover:bg-gray-50 transition-colors p-4 rounded min-h-[100px]"
      onClick={handleClick}
    >
      <div className="mb-2 font-medium text-gray-700">
        {title || '默认展示的标题:'}
      </div>
      <Input
        value={text}
        placeholder={placeholder || '请输入内容......'}
        disabled // 在画布中禁用输入，防止误操作
        className="w-full"
      />
    </div>
  );
};

export default InputComponent;