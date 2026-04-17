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
import { useTranslation } from 'react-i18next';
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
import { DefaultRichTextComponentProps } from '@/app/editor/components/richtext/RichTextProps';
import { DefaultQrCodeComponentProps } from '@/app/editor/components/qrcode/QrCodeProps';
import { DefaultAlertComponentProps } from '@/app/editor/components/alert/AlertProps';
import { DefaultInputComponentProps } from '@/app/editor/components/input/InputProps';
import { DefaultTextAreaComponentProps } from '@/app/editor/components/textarea/TextAreaProps';
import { DefaultRadioComponentProps } from '@/app/editor/components/radio/RadioProps';
import { DefaultCheckboxComponentProps } from '@/app/editor/components/checkbox/CheckboxProps';
import { DefaultVideoComponentProps } from '@/app/editor/components/video/VideoProps';

// 不同组件配置数组
export const components = [
  {
    type: 'video',
    nameKey: 'components.video',
    icon: <PlaySquareOutlined />,
  },
  {
    type: 'swiper',
    nameKey: 'components.swiper',
    icon: <SplitCellsOutlined />,
  },
  {
    type: 'card',
    nameKey: 'components.card',
    icon: <CreditCardOutlined />,
  },
  {
    type: 'list',
    nameKey: 'components.list',
    icon: <UnorderedListOutlined />,
  },
  {
    type: 'image',
    nameKey: 'components.image',
    icon: <FundViewOutlined />,
  },
  {
    type: 'text',
    nameKey: 'components.text',
    icon: <FontSizeOutlined />,
  },
  {
    type: 'split',
    nameKey: 'components.split',
    icon: <MinusOutlined />,
  },
  {
    type: 'richtext',
    nameKey: 'components.richtext',
    icon: <FontColorsOutlined />,
  },
  {
    type: 'qrcode',
    nameKey: 'components.qrcode',
    icon: <img src={'/xdclass.net.svg'} className="w-[12px] h-[12px]" />,
  },
  {
    type: 'empty',
    nameKey: 'components.empty',
    icon: <ExpandOutlined />,
  },
  {
    type: 'alert',
    nameKey: 'components.alert',
    icon: <WarningOutlined />,
  },
];

// 不同输入型组件配置数组
const componentByUserInput = [
  {
    type: 'input',
    nameKey: 'components.input',
    icon: <EditOutlined />,
  },
  {
    type: 'textarea',
    nameKey: 'components.textarea',
    icon: <FormOutlined />,
  },
  {
    type: 'radio',
    nameKey: 'components.radio',
    icon: <CheckCircleOutlined />,
  },
  {
    type: 'checkbox',
    nameKey: 'components.checkbox',
    icon: <CheckSquareOutlined />,
  },
];

interface ComponentProps {
  nameKey: string;
  icon: ReactNode;
  type: string;
}

// 公共样式组件
const EditorComponent: FC<ComponentProps> = ({ icon, nameKey, type }) => {
  const { t } = useTranslation();
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
        break
      case 'split':
        dispatch(addComponent({ ...DefaultSplitComponentProps, id: nanoid(8) }));
        break;
      case 'empty':
        dispatch(addComponent({ ...DefaultEmptyComponentProps, id: nanoid(8) }));
        break
      case 'richtext':
        dispatch(addComponent({ ...DefaultRichTextComponentProps, id: nanoid(8) }));
        break
      case 'qrcode':
        dispatch(addComponent({ ...DefaultQrCodeComponentProps, id: nanoid(8) }));
        break
      case 'alert':
        dispatch(addComponent({ ...DefaultAlertComponentProps, id: nanoid(8) }));
        break
      case 'input':
        dispatch(addComponent({ ...DefaultInputComponentProps, id: nanoid(8) }));
        break
      case 'textarea':
        dispatch(addComponent({ ...DefaultTextAreaComponentProps, id: nanoid(8) }));
        break
      case 'radio':
        dispatch(addComponent({ ...DefaultRadioComponentProps, id: nanoid(8) }))
        break
      case 'checkbox':
        dispatch(addComponent({ ...DefaultCheckboxComponentProps, id: nanoid(8) }))
        break
      case 'video':
        dispatch(addComponent({ ...DefaultVideoComponentProps, id: nanoid(8) }))
        break
    }
  }

  return (
    <div
      onClick={handleClick}
      className="border py-2 pl-2 w-full flex items-center gap-1 text-xs cursor-pointer select-none hover:border-blue-500"
    >
      {icon}
      <span>{t(nameKey)}</span>
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