// packages/client-next/app/editor/components/richtext/RichTextProps.tsx
import { Component } from '@/app/editor/components/Model';


interface RichTextProps extends Component {
  content?: string
}

export const DefaultRichTextComponentProps: RichTextProps = {
  id: '',
  accountId: 0,
  pageId: 0,
  type: 'richtext',
  content: ''
};

export default RichTextProps;