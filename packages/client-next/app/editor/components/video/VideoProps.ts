import { Component } from '@/app/editor/components/Model';


export interface VideoProps extends Component {
  url?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  poster?: string;
}

export const DefaultVideoComponentProps: VideoProps = {
  id: '',
  accountId: 0,
  pageId: 0,
  type: 'video',
  url: '',
  autoPlay: false,
  loop: false,
  muted: false,
  controls: true,
  poster: '',
};

export default VideoProps;