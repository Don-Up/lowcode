// packages/client-next/app/editor/components/textarea/TextAreaProps.tsx
import { Component } from '@/app/editor/components/Model';


export interface TextAreaProps extends Component {
  title?: string;
  text?: string;
  placeholder?: string;
}

export const DefaultTextAreaComponentProps: TextAreaProps = {
  id: '',
  accountId: 0,
  pageId: 0,
  type: 'textarea',
  title: "please input the title",
  text: 'please input the text',
  placeholder: 'please input the placeholder',
};

export default TextAreaProps;