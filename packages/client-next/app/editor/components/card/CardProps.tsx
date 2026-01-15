// packages/client-next/app/editor/components/card/CardProps.tsx
import { Component } from '@/app/editor/components/Model';


export interface CardProps extends Component {
  title?: string;
  coverImg?: string;
  description?: string;
}

export const DefaultCardComponentProps: CardProps = {
  id: '',
  accountId: 0,
  pageId: 0,
  type: 'card',
  title: 'Card Title',
  coverImg: 'https://sdfsdf.dev/600x200.png',
  description: 'This is a card description',
};

export default CardProps;