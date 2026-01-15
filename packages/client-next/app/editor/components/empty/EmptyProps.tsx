// packages/client-next/app/editor/components/split/EmptyProps.tsx
import { Component } from '@/app/editor/components/Model';


interface EmptyProps extends Component {
  image?: string;
  description?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageObjectFit?: "cover" | "contain" | "fill" | "scale-down" | "none";
}

export const DefaultEmptyComponentProps: EmptyProps = {
  id: '',
  accountId: 0,
  pageId: 0,
  type: 'empty',
  image: '',
  description: 'No Data',
  imageWidth: 100,
  imageHeight: 100,
  imageObjectFit: 'contain',
};

export default EmptyProps;