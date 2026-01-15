// packages/client-next/app/editor/components/alert/index.tsx
'use client';

import React from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setSelectComponentId } from '@/store/componentSlice';
import AlertProps from '@/app/editor/components/alert/AlertProps';
import { Alert } from 'antd';

const AlertComponent: React.FC<AlertProps> = ({
                                                id,
                                                title = '请输入文本',
                                                showIcon = true,
                                                showClose = true,
                                                alertType = 'warning',
                                              }) => {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setSelectComponentId(id));
  }

  return (
    <div
      className="cursor-pointer hover:bg-gray-50 transition-colors p-3 rounded min-h-[80px]"
      onClick={handleClick}
    >
      <Alert
        title={title || '请输入文本'}
        type={alertType}
        showIcon={showIcon}
        closable={showClose}
        // 画布中不真正关闭，只是视觉效果
        onClose={(e) => e.preventDefault()}
        className="w-full"
      />
    </div>
  );
};

export default AlertComponent;