'use client';

import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import ImageProps from '@/app/editor/components/image/ImageProps';


interface ImagePropCompProps extends ImageProps {
  onChange: (values: ImageProps) => void;
}

const ImagePropComp: React.FC<ImagePropCompProps> = ({
                                                       id,
                                                       name, src, height, fillMode,
                                                       onChange,
                                                     }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ name, src, height, fillMode });
  }, [name, src, height, fillMode]);

  const handleValuesChange = () => {
    const values = form.getFieldsValue() as ImageProps;
    if (onChange) {
      onChange(values);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValuesChange}
      initialValues={{ name, src, height, fillMode }}
    >
      <div className={'grid grid-cols-1 gap-4 mt-5'}>
        <Form.Item
          label="Image Source"
          name="src"
          rules={[{ required: true, message: 'Please enter image URL.' }]}
        >
          <Input placeholder="Enter image URL" />
        </Form.Item>
        <Form.Item label="Height" name="height">
          <InputNumber min={10} max={1000} placeholder="Enter height" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Name" name="name">
          <Input placeholder="Enter component name" />
        </Form.Item>
        <Form.Item label="Fill Mode" name="fillMode">
          <Select placeholder="Select fill mode">
            <Select.Option value="cover">Cover</Select.Option>
            <Select.Option value="contain">Contain</Select.Option>
            <Select.Option value="none">None</Select.Option>
          </Select>
        </Form.Item>
      </div>
    </Form>

  );
};

export default ImagePropComp;