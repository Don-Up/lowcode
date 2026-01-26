// packages/client-next/app/editor/components/radio/RadioProps.tsx
import { Component } from '@/app/editor/components/Model';


export interface RadioProps extends Component {
  title?: string;
  defaultRadio?: string;
  options?: {
    id: string;
    value: string;
  }[];
}

const defaultOption = {
  id: '1',
  value: '选项1',
}

export const DefaultRadioComponentProps: RadioProps = {
  id: '',
  accountId: 0,
  pageId: 0,
  type: 'radio',
  title: '默认展示的标题',
  defaultRadio: '1',
  options: [defaultOption]
};

export default RadioProps;