// packages/client-next/app/editor/components/textarea/TextAreaPropComponent.tsx
'use client';

import React, { useEffect } from 'react';
import { Form } from 'antd';
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
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      title: title || '默认展示的标题',
      text: text || '',
      placeholder: placeholder || '请输入内容......',
    });
  }, [title, text, placeholder, form]);

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
          label="默认展示的标题"
          name="title"
          initialValue={title}
          tooltip="显示在输入框上方的标签文字"
        >
          <TextArea placeholder="默认展示的标题" allowClear />
        </Form.Item>

        {/* 默认输入的内容 */}
        <Form.Item
          label="默认输入的内容"
          name="text"
          initialValue={text}
          tooltip="组件加载时预填的内容（用户可修改）"
        >
          <TextArea placeholder="默认输入的内容" allowClear />
        </Form.Item>

        {/* 占位符 */}
        <Form.Item
          label="占位符"
          name="placeholder"
          initialValue={placeholder}
          tooltip="输入框为空时显示的提示文字"
        >
          <TextArea placeholder="请输入内容......" allowClear />
        </Form.Item>

        <div className="text-xs text-gray-500 mt-2">
          提示：在画布中输入框为禁用状态，仅用于预览效果
        </div>
      </div>
    </Form>
  );
};

export default TextAreaPropComp;