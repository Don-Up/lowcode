'use client';

import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import CardProps from '@/app/editor/components/card/CardProps';
import TextArea from 'antd/es/input/TextArea';


interface CardPropCompProps extends CardProps {
  onChange: (values: CardProps) => void;
}

const CardPropComp: React.FC<CardPropCompProps> = ({
                                                     id,
                                                     title, coverImg, description,
                                                     onChange,
                                                   }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, coverImg, description });
  }, [title, coverImg, description]);

  const handleValuesChange = () => {
    const values = form.getFieldsValue() as CardProps;
    if (onChange) {
      onChange(values);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValuesChange}
    >
      <div className={'grid grid-cols-1 gap-4 mt-5'}>
        <Form.Item
          label="封面图片:"
          name="coverImg"
          initialValue={coverImg}
        >
          <Input placeholder="https://sdfsdf.dev/600x200.png" />
        </Form.Item>

        <Form.Item
          label="标题:"
          name="title"
          initialValue={title}
        >
          <Input placeholder="这是标题" />
        </Form.Item>

        <Form.Item
          label="描述:"
          name="description"
          initialValue={description}
        >
          <TextArea placeholder="这是一段描述" />
        </Form.Item>
      </div>
    </Form>

  );
};

export default CardPropComp;