'use client';

import React from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setSelectComponentId } from '@/store/componentSlice';
import { Carousel } from 'antd';
import SwiperProps from '@/app/editor/components/swiper/SwiperProps';

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
    <div onClick={handleClick}>
      <Carousel
        autoplay={autoPlay}
        dots={showIndicators}
        dotPosition={dotPosition || 'bottom'}
        pauseOnHover
        autoplaySpeed={interval || 3000}
        className={'max-h-40'}
      >
        {images?.map((image, index) => (
          <div key={index}>
            <img
              src={image.src}
              alt={`slide-${index}`}
              style={{ objectFit: image.fillMode || 'cover' }}
              className={'bg-green-400 max-h-40 w-full'}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SwiperComponent;
