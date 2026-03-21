// packages/client-next/app/editor/components/checkbox/CheckboxProps.tsx
import { Component } from '@/app/editor/components/Model';


export interface CheckboxProps extends Component {
  title?: string;
  defaultChecked?: string[];
  options?: {
    id: string;
    value: string;
  }[];
}

const defaultOption = {
  id: '1',
  value: '选项1',
}

export const DefaultCheckboxComponentProps: CheckboxProps = {
  id: '',
  accountId: 0,
  pageId: 0,
  type: 'checkbox',
  title: '默认展示的标题',
  defaultChecked: ['1'],
  options: [defaultOption]
};

export default CheckboxProps;