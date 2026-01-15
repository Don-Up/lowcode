'use client';

import React from 'react';
import ImageProps from '@/app/editor/components/image/ImageProps';
import { useAppDispatch } from '@/store/hooks';
import { setSelectComponentId } from '@/store/componentSlice';

const ImageComponent: React.FC<ImageProps> = ({
                                                id,
                                                name,
                                                src,
                                                height,
                                                fillMode,
                                              }) => {

  const dispatch = useAppDispatch();

  const imageStyle = {
    height: height ? `${height}px` : "50px",
    objectFit: fillMode || 'cover',
  };

  function handleClick() {
    dispatch(setSelectComponentId(id));
  }

  return (
    <div className="cursor-pointer hover:bg-gray-100 flex" onClick={handleClick}>
      <img
        src={src}
        alt={name}
        style={imageStyle}
        className="max-w-full bg-green-400 w-full"
      />
    </div>
  );
};

export default ImageComponent;
