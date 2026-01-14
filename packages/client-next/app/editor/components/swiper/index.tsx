'use client';

import React from 'react';
import SwiperProps from '@/app/editor/components/image/SwiperProps';
import { useAppDispatch } from '@/store/hooks';
import { setSelectComponentId } from '@/store/componentSlice';
import { Carousel } from 'antd';

const SwiperComponent: React.FC<SwiperProps> = ({
                                                  id,
                                                  interval,
                                                  autoPlay,
                                                  images,
                                                  showIndicators,
                                                  dotPosition,
                                                }) => {

  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setSelectComponentId(id));
  }

  return (
    <div className="cursor-pointer hover:bg-gray-100 flex" onClick={handleClick}>
      <Carousel
        autoplay={autoPlay}
        dots={showIndicators}
        dotPlacement={dotPosition || 'bottom'}
        pauseOnHover
        autoplaySpeed={interval || 3000}
      >
        {images?.map((image, index) => (
          <div key={index}>
            <img
              src={image.src}
              alt={`slide-${index}`}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SwiperComponent;
