// packages/client-next/app/editor/components/input/InputProps.tsx
import { Component } from '@/app/editor/components/Model';


export interface InputProps extends Component {
  title?: string;
  text?: string;
  placeholder?: string;
}

export const DefaultInputComponentProps: InputProps = {
  id: '',
  accountId: 0,
  pageId: 0,
  type: 'input',
  title: "please input the title",
  text: 'please input the text',
  placeholder: 'please input the placeholder',
};

export default InputProps;