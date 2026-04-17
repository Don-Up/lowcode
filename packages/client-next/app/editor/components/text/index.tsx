'use client';

import React from 'react';
import TextProps from '@/app/editor/components/text/TextProps';
import { Typography } from 'antd';
import { useAppDispatch } from '@/store/hooks';
import { setSelectComponentId, removeComponent } from '@/store/componentSlice';
const { Text } = Typography;

interface TextComponentProps extends TextProps {
  isSelected?: boolean;
}

const TextComponent: React.FC<TextComponentProps> = ({
                                                       id,
                                                       text,
                                                       fontSize,
                                                       fontWeight,
                                                       color,
                                                       disabled,
                                                       isSelected,
                                                     }) => {

  const dispatch = useAppDispatch();

  const textStyle = {
    color: color || undefined,
    fontSize: fontSize ? `${fontSize}px` : '16px',
    fontWeight: fontWeight || 'normal',
    opacity: disabled ? 0.5 : 1,
  };

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    dispatch(setSelectComponentId(id));
  }

  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    dispatch(removeComponent(id));
  }

  return (
    <div
      className={`cursor-pointer hover:bg-gray-100 flex relative group ${isSelected ? 'ring-2 ring-blue-500 ring-offset-1' : ''}`}
      onClick={handleClick}
    >
      {isSelected && (
        <button
          onClick={handleDelete}
          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ×
        </button>
      )}
      <Text style={textStyle} disabled={disabled} className={'flex-1'}>
        {text || "Default Text"}
      </Text>
    </div>
  );
};

export default TextComponent;