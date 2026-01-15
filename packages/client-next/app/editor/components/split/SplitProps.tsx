// packages/client-next/app/editor/components/split/SplitProps.tsx
import { Component } from '@/app/editor/components/Model';


interface SplitProps extends Component {
  text?: string
  dashed?: boolean
}

export const DefaultSplitComponentProps: SplitProps = {
  id: '',
  accountId: 0,
  pageId: 0,
  type: 'split',
  text: 'divider',
  dashed: false,
};

export default SplitProps;