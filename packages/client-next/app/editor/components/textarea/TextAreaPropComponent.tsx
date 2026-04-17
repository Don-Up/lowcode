// packages/client-next/app/editor/components/textarea/TextAreaPropComponent.tsx
'use client';

import React, { useEffect } from 'react';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import TextAreaProps from '@/app/editor/components/textarea/TextAreaProps';
import TextArea from 'antd/es/input/TextArea';

interface TextAreaPropCompProps extends TextAreaProps {
  onChange: (values: TextAreaProps) => void;
}

const TextAreaPropComp: React.FC<TextAreaPropCompProps> = ({
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
      title: title || t('props.textarea.titlePlaceholder'),
      text: text || '',
      placeholder: placeholder || t('props.textarea.inputPlaceholder'),
    });
  }, [title, text, placeholder, form, t]);

  const handleValuesChange = () => {
    const values = form.getFieldsValue() as TextAreaProps;
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
          label={t('props.textarea.title')}
          name="title"
          tooltip={t('props.textarea.titleTooltip')}
        >
          <TextArea placeholder={t('props.textarea.titlePlaceholder')} allowClear />
        </Form.Item>

        {/* 默认输入的内容 */}
        <Form.Item
          label={t('props.textarea.defaultText')}
          name="text"
          tooltip={t('props.textarea.textTooltip')}
        >
          <TextArea placeholder={t('props.textarea.textPlaceholder')} allowClear />
        </Form.Item>

        {/* 占位符 */}
        <Form.Item
          label={t('props.textarea.placeholder')}
          name="placeholder"
          tooltip={t('props.textarea.placeholderTooltip')}
        >
          <TextArea placeholder={t('props.textarea.inputPlaceholder')} allowClear />
        </Form.Item>

        <div className="text-xs text-gray-500 mt-2">
          {t('props.textarea.canvasHint')}
        </div>
      </div>
    </Form>
  );
};

export default TextAreaPropComp;