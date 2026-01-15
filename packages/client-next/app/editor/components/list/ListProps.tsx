// packages/client-next/app/editor/components/list/ListProps.tsx
import { Component } from '@/app/editor/components/Model';


export interface ListItemProps {
  title?: string;
  avatar?: string;
  description?: string;
  titleLink?: string;
}

interface ListProps extends Component {
  id: string;
  list?: ListItemProps[];
}

export const DefaultListItemComponentProps: ListItemProps = {
  title: '标题123',
  description: '描述123456',
  titleLink: 'https://xdclass.net',
  avatar: 'https://sdfsdf.dev/50x50.png',
};

export const DefaultListComponentProps: ListProps = {
  id: '',
  accountId: 0,
  pageId: 0,
  type: 'list',
  list: [DefaultListItemComponentProps]
}

export default ListProps;