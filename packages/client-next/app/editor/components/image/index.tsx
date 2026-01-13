'use client';

import React from 'react';
import ImageProps from '@/app/editor/components/image/ImageProps';
import { useAppDispatch } from '@/store/hooks';
import { setSelectComponentId } from '@/store/componentSlice';

const ImageComponent: React.FC<ImageProps> = ({
                                                id,
                                                name, src, height, fillMode,
                                                width, alt, align, borderRadius, opacity,
                                                disabled, color, fontSize, fontWeight,
                                              }) => {

  const dispatch = useAppDispatch();

  const imageStyle = {
    width: width ? `${width}px` : undefined,
    height: height ? `${height}px` : undefined,
    objectFit: fillMode || 'cover',
    borderRadius: borderRadius ? `${borderRadius}px` : undefined,
    opacity: opacity !== undefined ? opacity : (disabled ? 0.5 : 1),
    margin: align === 'center' ? '0 auto' :
            align === 'left' ? '0 0 0 0' :
            align === 'right' ? '0 0 0 auto' : undefined,
  };

  function handleClick() {
    dispatch(setSelectComponentId(id));
  }

  return (
    <div className="cursor-pointer hover:bg-gray-100 flex" onClick={handleClick}>
      <img
        src={src || '/placeholder-image.jpg'}
        alt={alt || name || 'Image component'}
        style={imageStyle}
        className="max-w-full"
      />
    </div>
  );
};

export default ImageComponent;
