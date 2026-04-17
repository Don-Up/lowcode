// packages/client-next/app/editor/components/alert/AlertPropComponent.tsx
'use client';

import React, { useEffect } from 'react';
import { Form, Input, Switch, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import AlertProps from '@/app/editor/components/alert/AlertProps';

interface AlertPropCompProps extends AlertProps {
  onChange: (values: AlertProps) => void;
}

const AlertPropComp: React.FC<AlertPropCompProps> = ({
                                                       id,
                                                       title,
                                                       showIcon,
                                                       showClose,
                                                       alertType,
                                                       onChange,
                                                     }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      title: title || '',
      showIcon: showIcon ?? true,
      showClose: showClose ?? true,
      alertType: alertType || 'warning',
    });
  }, [title, showIcon, showClose, alertType, form]);

  const handleValuesChange = () => {
    const values = form.getFieldsValue() as AlertProps;
    onChange(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValuesChange}
      className="mt-5"
    >
      <div className="grid grid-cols-1 gap-4">
        {/* 标题/内容 */}
        <Form.Item
          label={t('props.alert.title')}
          name="title"
          initialValue={title}
          tooltip={t('props.alert.titleHint')}
        >
          <Input placeholder={t('props.alert.titlePlaceholder')} allowClear />
        </Form.Item>

        {/* 类型选择 */}
        <Form.Item label={t('props.alert.type')} name="alertType" initialValue={alertType}>
          <Select
            options={[
              { value: 'success', label: t('props.alert.success') },
              { value: 'info', label: t('props.alert.info') },
              { value: 'warning', label: t('props.alert.warning') },
              { value: 'error', label: t('props.alert.error') },
            ]}
          />
        </Form.Item>

        {/* 是否显示图标 */}
        <Form.Item
          label={t('props.alert.showIcon')}
          name="showIcon"
          valuePropName="checked"
          initialValue={showIcon}
        >
          <Switch />
        </Form.Item>

        {/* 是否显示关闭按钮 */}
        <Form.Item
          label={t('props.alert.showClose')}
          name="showClose"
          valuePropName="checked"
          initialValue={showClose}
        >
          <Switch />
        </Form.Item>

        <div className="text-xs text-gray-500 mt-2">
          {t('props.alert.closeHint')}
        </div>
      </div>
    </Form>
  );
};

export default AlertPropComp;