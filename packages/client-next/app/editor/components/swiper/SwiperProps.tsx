import { Component } from '@/app/editor/components/Model';
import ImageProps, { DefaultImageComponentProps } from '@/app/editor/components/image/ImageProps';


export interface SwiperProps extends Component {
  interval?: number
  autoPlay?: boolean
  images?: ImageProps[]
  showIndicators?: boolean
  dotPosition?: "bottom" | "top" | "left" | "right"
}

export const DefaultSwiperComponentProps: SwiperProps = {
  id: '',
  accountId: 0,
  pageId: 0,
  type: 'swiper',
  interval: 5000,
  autoPlay: true,
  images: [DefaultImageComponentProps, DefaultImageComponentProps],
  showIndicators: true,
  dotPosition: "bottom",
};

export default SwiperProps;