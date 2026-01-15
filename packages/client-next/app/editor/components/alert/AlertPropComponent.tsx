// packages/client-next/app/editor/components/alert/AlertPropComponent.tsx
'use client';

import React, { useEffect } from 'react';
import { Form, Input, Switch, Select } from 'antd';
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
          label="标题"
          name="title"
          initialValue={title}
          tooltip="为空时显示默认提示：请输入文本"
        >
          <Input placeholder="请输入文本" allowClear />
        </Form.Item>

        {/* 类型选择 */}
        <Form.Item label="类型" name="alertType" initialValue={alertType}>
          <Select
            options={[
              { value: 'success', label: '成功 (绿色)' },
              { value: 'info', label: '信息 (蓝色)' },
              { value: 'warning', label: '警告 (黄色)' },
              { value: 'error', label: '错误 (红色)' },
            ]}
          />
        </Form.Item>

        {/* 是否显示图标 */}
        <Form.Item
          label="是否显示图标"
          name="showIcon"
          valuePropName="checked"
          initialValue={showIcon}
        >
          <Switch />
        </Form.Item>

        {/* 是否显示关闭按钮 */}
        <Form.Item
          label="是否显示关闭按钮"
          name="showClose"
          valuePropName="checked"
          initialValue={showClose}
        >
          <Switch />
        </Form.Item>

        <div className="text-xs text-gray-500 mt-2">
          提示：在画布中点击关闭按钮仅为视觉效果，不会真正移除组件
        </div>
      </div>
    </Form>
  );
};

export default AlertPropComp;