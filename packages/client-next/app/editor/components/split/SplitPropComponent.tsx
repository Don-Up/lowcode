// packages/client-next/app/editor/components/split/SplitPropComponent.tsx
'use client';

import React, { useEffect } from 'react';
import { Form, Input, Switch, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import SplitProps from '@/app/editor/components/split/SplitProps';

interface SplitPropCompProps extends SplitProps {
  onChange: (values: SplitProps) => void;
}

const SplitPropComp: React.FC<SplitPropCompProps> = ({
                                                       id,
                                                       text,
                                                       dashed,
                                                       onChange,
                                                     }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  // 当外部 props 变化时同步到表单（切换选中组件时很重要）
  useEffect(() => {
    form.setFieldsValue({
      text,
      dashed,
    });
  }, [text, dashed, form]);

  const handleValuesChange = () => {
    const values = form.getFieldsValue() as SplitProps;
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
        {/* 分割线文字（可选） */}
        <Form.Item
          label={t('props.split.text')}
          name="text"
          initialValue={text}
        >
          <Input placeholder={t('props.split.textPlaceholder')} allowClear />
        </Form.Item>

        {/* 是否虚线 */}
        <Form.Item
          label={t('props.split.dashed')}
          name="dashed"
          valuePropName="checked"
          initialValue={dashed}
        >
          <Switch />
        </Form.Item>

        {/* 小提示 */}
        <div className="text-xs text-gray-500 mt-2">
          {t('props.split.hint')}
        </div>
      </div>
    </Form>
  );
};

export default SplitPropComp;