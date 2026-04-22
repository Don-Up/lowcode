// packages/client-next/app/editor/components/canvas/ActionMenu.tsx
'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Tag } from 'antd';
import { DeleteOutlined, UpOutlined, DownOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@/store/hooks';
import { removeComponent, moveUpComponent, moveDownComponent } from '@/store/componentSlice';
import { Component } from '@/app/editor/components/Model';
import { useAppSelector } from '@/store/hooks';

interface ActionMenuProps {
  componentId: string;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ componentId }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const component = useAppSelector((state) =>
    state.component.present.components.find((c) => c.id === componentId)
  );

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeComponent(componentId));
  };

  const handleMoveUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(moveUpComponent(componentId));
  };

  const handleMoveDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(moveDownComponent(componentId));
  };

  if (!component) return null;

  return (
    <div
      className="absolute top-1 right-1 z-10 flex items-center gap-1 bg-blue-500 rounded-md p-1 shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <Tag className="bg-blue-400 text-white border-0 m-0 py-0 px-1 text-xs">
        {t(`components.${component.type}`)}
      </Tag>
      <Button
        type="text"
        size="small"
        icon={<UpOutlined />}
        onClick={handleMoveUp}
        className="text-white hover:bg-blue-600 p-1"
      />
      <Button
        type="text"
        size="small"
        icon={<DownOutlined />}
        onClick={handleMoveDown}
        className="text-white hover:bg-blue-600 p-1"
      />
      <Button
        type="text"
        size="small"
        icon={<DeleteOutlined />}
        onClick={handleDelete}
        className="text-white hover:bg-red-500 p-1"
      />
    </div>
  );
};

export default ActionMenu;