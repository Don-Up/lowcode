// packages/client-next/app/editor/components/qrcode/QrCodeProps.tsx
import { Component } from '@/app/editor/components/Model';


export interface QrCodeProps extends Component {
  icon?: string;
  size?: number;
  value?: string;
  color?: string;
  bgColor?: string;
  iconSize?: number;
  errorLevel?: "L" | "M" | "Q" | "H";
}

export const DefaultQrCodeComponentProps: QrCodeProps = {
  id: '',
  accountId: 0,
  pageId: 0,
  type: 'qrcode',
  value: "-",
  bgColor: "white",
  color: "black",
  errorLevel: "L",
  icon: "",
  iconSize: 12,
  size: 160,
};

export default QrCodeProps;