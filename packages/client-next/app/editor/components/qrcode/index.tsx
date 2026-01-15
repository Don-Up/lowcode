// packages/client-next/app/editor/components/qrcode/index.tsx
'use client';

import React from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setSelectComponentId } from '@/store/componentSlice';
import QrCodeProps from '@/app/editor/components/qrcode/QrCodeProps';
import { QRCode } from 'antd';

const QrCodeComponent: React.FC<QrCodeProps> = ({
                                                  id,
                                                  value = 'https://xdclass.net',
                                                  size = 160,
                                                  color = '#000000',
                                                  bgColor = '#ffffff',
                                                  errorLevel = 'L',
                                                  icon = '', // logo url
                                                  iconSize = 40, // antd logoSize 相对 size 的比例，通常 0.2~0.3
                                                }) => {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setSelectComponentId(id));
  }

  return (
    <div
      className="cursor-pointer hover:bg-gray-50 transition-colors p-4 rounded flex items-center justify-center min-h-[180px]"
      onClick={handleClick}
    >
      <QRCode
        value={value || '-'}
        size={size}
        color={color}
        bgColor={bgColor}
        errorLevel={errorLevel}
        icon={icon || undefined}          // 支持 logo url
        iconSize={iconSize}               // logo 尺寸（px）
        // 可选：status="active" | "loading" | "expired" 等状态
      />
    </div>
  );
};

export default QrCodeComponent;