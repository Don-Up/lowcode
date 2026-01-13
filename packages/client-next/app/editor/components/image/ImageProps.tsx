import { Component } from '@/app/editor/components/Model';


export interface ImageProps extends Component {
  name?: string;
  src?: string;
  height?: number;
  fillMode?: string;
}

export const DefaultImageComponentProps: ImageProps = {
  id: '',
  accountId: 0,
  pageId: 0,
  type: 'image',
  name: 'Image',
  src: 'https://hk.portal-pokemon.com/play/resources/pokedex/img/pm/cf47f9fac4ed3037ff2a8ea83204e32aff8fb5f3.png',
  height: 200,
  fillMode: 'cover',
};

export default ImageProps;