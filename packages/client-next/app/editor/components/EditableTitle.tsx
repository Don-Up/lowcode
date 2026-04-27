'use client';

import React, { useState } from 'react';
import { Input } from 'antd';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPageTitle } from '@/store/componentSlice';

const EditableTitle: React.FC = () => {
  const dispatch = useAppDispatch();
  const pageTitle = useAppSelector((state) => state.component.present.pageTitle);
  const [isEditing = false, setIsEditing] = useState<boolean>(false);
  const [editValue, setEditValue] = useState(pageTitle);

  const handleStartEdit = () => {
    setEditValue(pageTitle);
    setIsEditing(true);
  };

  const handleConfirm = () => {
    dispatch(setPageTitle(editValue || '小滴低代码平台'));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(pageTitle);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <Input
          data-testid="title-input"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onPressEnter={handleConfirm}
          className="max-w-xs"
          autoFocus
        />
        <CheckOutlined
          data-testid="confirm-btn"
          className="cursor-pointer text-green-500 hover:text-green-600"
          onClick={handleConfirm}
        />
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-2 cursor-pointer group"
      onClick={handleStartEdit}
    >
      <span className="group-hover:text-blue-500 transition-colors">
        {pageTitle}
      </span>
      <EditOutlined className="opacity-0 group-hover:opacity-100 text-xs text-gray-400" />
    </div>
  );
};

export default EditableTitle;