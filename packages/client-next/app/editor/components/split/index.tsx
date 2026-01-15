// packages/client-next/app/editor/components/split/index.tsx
'use client';

import React from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setSelectComponentId } from '@/store/componentSlice';
import SplitProps from '@/app/editor/components/split/SplitProps';
import { Divider } from 'antd';

const SplitComponent: React.FC<SplitProps> = ({
                                                id,
                                                text,
                                                dashed,
                                              }) => {

  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setSelectComponentId(id));
  }

  if (!text) {
    return <div className="cursor-pointer hover:bg-gray-100 flex" onClick={handleClick}>
      <Divider dashed={dashed} />;
    </div>;
  } else {
    return (
      <div className="cursor-pointer hover:bg-gray-100 flex" onClick={handleClick}>
        <Divider dashed={dashed}>
          <span className="text-gray-500/80">{text}</span>
        </Divider>
      </div>
    );
  }
};

export default SplitComponent;