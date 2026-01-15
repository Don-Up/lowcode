import { Component } from '@/app/editor/components/Model';


interface TextProps extends Component {
  text?: string;
  fontSize?: number;
  fontWeight?: number;
  textAlign?: string;
  color?: string;
  backgroundColor?: string;
  borderRadius?: number;
  padding?: number;
  margin?: number;
}

export const DefaultTextComponentProps: TextProps = {
  id: '',
  accountId: 0,
  pageId: 0,
  type: 'text',
  text: '',
  fontSize: 16,
  fontWeight: 400,
  textAlign: 'left',
  color: '#000000',
  backgroundColor: 'transparent',
  borderRadius: 0,
  padding: 0,
  margin: 0,
};

export default TextProps;