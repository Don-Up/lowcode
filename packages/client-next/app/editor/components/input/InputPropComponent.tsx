// packages/client-next/app/editor/components/input/InputPropComponent.tsx
'use client';

import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import InputProps from '@/app/editor/components/input/InputProps';

interface InputPropCompProps extends InputProps {
  onChange: (values: InputProps) => void;
}

const InputPropComp: React.FC<InputPropCompProps> = ({
                                                       id,
                                                       title,
                                                       text,
                                                       placeholder,
                                                       onChange,
                                                     }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      title: title || t('props.input.titlePlaceholder'),
      text: text || '',
      placeholder: placeholder || t('props.input.inputPlaceholder'),
    });
  }, [title, text, placeholder, form, t]);

  const handleValuesChange = () => {
    const values = form.getFieldsValue() as InputProps;
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
        {/* 默认展示的标题 */}
        <Form.Item
          label={t('props.input.title')}
          name="title"
          tooltip={t('props.input.titleTooltip')}
        >
          <Input placeholder={t('props.input.titlePlaceholder')} allowClear />
        </Form.Item>

        {/* 默认输入的内容 */}
        <Form.Item
          label={t('props.input.defaultText')}
          name="text"
          tooltip={t('props.input.textTooltip')}
        >
          <Input placeholder={t('props.input.textPlaceholder')} allowClear />
        </Form.Item>

        {/* 占位符 */}
        <Form.Item
          label={t('props.input.placeholder')}
          name="placeholder"
          tooltip={t('props.input.placeholderTooltip')}
        >
          <Input placeholder={t('props.input.inputPlaceholder')} allowClear />
        </Form.Item>

        <div className="text-xs text-gray-500 mt-2">
          {t('props.input.canvasHint')}
        </div>
      </div>
    </Form>
  );
};

export default InputPropComp;