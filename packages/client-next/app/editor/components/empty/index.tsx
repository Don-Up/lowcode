// packages/client-next/app/editor/components/empty/index.tsx
'use client';

import React from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setSelectComponentId } from '@/store/componentSlice';
import EmptyProps from '@/app/editor/components/empty/EmptyProps';
import { Empty } from 'antd';

const EmptyComponent: React.FC<EmptyProps> = ({
                                                id,
                                                image,
                                                description,
                                                imageWidth = 100,
                                                imageHeight = 100,
                                                imageObjectFit = 'contain',
                                              }) => {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setSelectComponentId(id));
  }

  return (
    <div
      className="cursor-pointer hover:bg-gray-50 transition-colors p-4 rounded"
      onClick={handleClick}
    >
      <Empty
        image={image || undefined}           // 自定义图片 URL 或 undefined 使用默认
        description={
          <span className="text-gray-500 text-sm">
      {description || '暂无数据'}
    </span>
        }
        // 推荐方式：使用 styles.image（消除弃用警告）
        styles={{
          image: {
            width: imageWidth,
            height: imageHeight,
            objectFit: imageObjectFit,
            margin: '0 auto',           // 强制水平居中（最可靠方式）
            display: 'block',           // 确保块级元素行为，避免 inline 导致的左对齐
          },
        }}
      />
    </div>
  );
};

export default EmptyComponent;