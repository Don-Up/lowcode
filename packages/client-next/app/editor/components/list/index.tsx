// packages/client-next/app/editor/components/list/index.tsx
'use client';

import React from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setSelectComponentId } from '@/store/componentSlice';
import ListComponentProps from '@/app/editor/components/list/ListProps';
import { Avatar, List } from 'antd';


const ListComponent: React.FC<ListComponentProps> = ({
                                                       id,
                                                       list,
                                                     }) => {

  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setSelectComponentId(id));
  }

  return (
    <div className="cursor-pointer hover:bg-gray-100 flex" onClick={handleClick}>
      <List
        className={"w-full"}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.titleLink}>{item.title}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ListComponent;