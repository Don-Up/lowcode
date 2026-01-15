import { Component } from '@/app/editor/components/Model';


export interface ImageProps extends Component {
  name?: string;
  src?: string;
  height?: number;
  fillMode?: "cover" | "contain" | "fill" | "scale-down" | "none";
}

export const DefaultImageComponentProps: ImageProps = {
  id: '',
  accountId: 0,
  pageId: 0,
  type: 'image',
  name: 'Image',
  src: 'https://sdfsdf.dev/600x200.png',
  height: 200,
  fillMode: 'cover',
};

export default ImageProps;