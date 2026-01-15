// packages/client-next/app/editor/components/card/index.tsx
'use client';

import React from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setSelectComponentId } from '@/store/componentSlice';
import CardProps from '@/app/editor/components/card/CardProps';
import { Card } from 'antd';
import { Meta } from 'antd/es/list/Item';

const CardComponent: React.FC<CardProps> = ({
                                              id,
                                              title,
                                              coverImg,
                                              description,
                                            }) => {

  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setSelectComponentId(id));
  }

  console.log("TEMP", title, coverImg, description)

  return (
    <div className="cursor-pointer hover:bg-gray-100 flex" onClick={handleClick}>
      <Card
        hoverable
        className={"w-full"}
        cover={<img alt="cover_img" src={coverImg} className={"w-full h-40 object-cover"}/>}
      >
        <Meta title={title} description={description} />
      </Card>
    </div>
  );
};

export default CardComponent;