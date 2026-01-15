// packages/client-next/app/editor/components/alert/AlertProps.tsx
import { Component } from '@/app/editor/components/Model';


export interface AlertProps extends Component {
  title?: string;
  showIcon?: boolean;
  showClose?: boolean;
  alertType?: 'success' | 'info' | 'warning' | 'error';
}

export const DefaultAlertComponentProps: AlertProps = {
  id: '',
  accountId: 0,
  pageId: 0,
  type: 'alert',
  title: '',
  showIcon: true,
  showClose: true,
  alertType: 'warning',
};

export default AlertProps;