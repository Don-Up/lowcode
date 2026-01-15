// packages/client-next/app/editor/components/ComponentList.tsx
'use client';

import {
  CheckCircleOutlined,
  CheckSquareOutlined,
  CreditCardOutlined,
  EditOutlined,
  ExpandOutlined,
  FontColorsOutlined,
  FontSizeOutlined,
  FormOutlined,
  FundViewOutlined,
  MinusOutlined,
  PlaySquareOutlined,
  SplitCellsOutlined,
  UnorderedListOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Divider } from 'antd';
import type { FC, ReactNode } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addComponent } from '@/store/componentSlice';
import { DefaultTextComponentProps } from '@/app/editor/components/text/TextProps';
import { nanoid } from 'nanoid';
import { DefaultImageComponentProps } from '@/app/editor/components/image/ImageProps';
import { DefaultSwiperComponentProps } from '@/app/editor/components/swiper/SwiperProps';
import { DefaultCardComponentProps } from '@/app/editor/components/card/CardProps';
import { DefaultListComponentProps } from '@/app/editor/components/list/ListProps';
import { DefaultSplitComponentProps } from '@/app/editor/components/split/SplitProps';
import { DefaultEmptyComponentProps } from '@/app/editor/components/empty/EmptyProps';

// 不同组件配置数组
export const components = [
  {
    type: 'video',
    name: '视频组件',
    icon: <PlaySquareOutlined />,
  },
  {
    type: 'swiper',
    name: '轮播组件',
    icon: <SplitCellsOutlined />,
  },
  {
    type: 'card',
    name: '卡片组件',
    icon: <CreditCardOutlined />,
  },
  {
    type: 'list',
    name: '列表组件',
    icon: <UnorderedListOutlined />,
  },
  {
    type: 'image',
    name: '图片组件',
    icon: <FundViewOutlined />,
  },
  {
    type: 'text',
    name: '文本组件',
    icon: <FontSizeOutlined />,
  },
  {
    type: 'split',
    name: '分割组件',
    icon: <MinusOutlined />,
  },
  {
    type: 'richText',
    name: '富文本组件',
    icon: <FontColorsOutlined />,
  },
  {
    type: 'qrcode',
    name: '二维码组件',
    icon: <img src={'/xdclass.net.svg'} className="w-[12px] h-[12px]" />,
  },
  {
    type: 'empty',
    name: '空状态组件',
    icon: <ExpandOutlined />,
  },
  {
    type: 'alert',
    name: '警告信息组件',
    icon: <WarningOutlined />,
  },
];

// 不同输入型组件配置数组
const componentByUserInput = [
  {
    type: 'input',
    name: '输入框组件',
    icon: <EditOutlined />,
  },
  {
    type: 'textArea',
    name: '文本域组件',
    icon: <FormOutlined />,
  },
  {
    type: 'radio',
    name: '单选框组件',
    icon: <CheckCircleOutlined />,
  },
  {
    type: 'checkbox',
    name: '多选框组件',
    icon: <CheckSquareOutlined />,
  },
];

interface ComponentProps {
  name: string;
  icon: ReactNode;
  type: string;
}

// 公共样式组件
const EditorComponent: FC<ComponentProps> = ({ icon, name, type }) => {
  const dispatch = useAppDispatch();

  function handleClick() {
    switch (type) {
      case 'text':
        dispatch(addComponent({ ...DefaultTextComponentProps, id: nanoid(8) }));
        break;
      case 'image':
        dispatch(addComponent({ ...DefaultImageComponentProps, id: nanoid(8) }));
        break;
      case 'swiper':
        dispatch(addComponent({ ...DefaultSwiperComponentProps, id: nanoid(8) }));
        break;
      case 'card':
        dispatch(addComponent({ ...DefaultCardComponentProps, id: nanoid(8) }));
        break;
      case 'list':
        dispatch(addComponent({ ...DefaultListComponentProps, id: nanoid(8) }));
      case 'split':
        dispatch(addComponent({ ...DefaultSplitComponentProps, id: nanoid(8) }));
        break;
      case 'empty':
        dispatch(addComponent({ ...DefaultEmptyComponentProps, id: nanoid(8) }));
        break
    }
  }

  return (
    <div
      onClick={handleClick}
      className="border py-2 pl-2 w-full flex items-center gap-1 text-xs cursor-pointer select-none hover:border-blue-500"
    >
      {icon}
      <span>{name}</span>
    </div>
  );
};

// 不同组件列表
export default function ComponentList() {
  return (
    <div>
      <div className="grid grid-cols-2 items-center gap-2">
        {components.map((item, index) => (
          <EditorComponent {...item} key={index} />
        ))}
      </div>
      <Divider />
      <div className="grid grid-cols-2 items-center gap-2">
        {componentByUserInput.map((item, index) => (
          <EditorComponent {...item} key={index} />
        ))}
      </div>
    </div>
  );
}
