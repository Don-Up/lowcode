'use client';

import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import ImageProps from '@/app/editor/components/image/ImageProps';


interface ImagePropCompProps extends ImageProps {
  onChange: (values: ImageProps) => void;
}

const ImagePropComp: React.FC<ImagePropCompProps> = ({
                                                       id,
                                                       name, src, height, fillMode,
                                                       onChange,
                                                     }) => {
  const { t } = useTranslation();
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
          label={t('props.image.src')}
          name="src"
          rules={[{ required: true, message: t('props.image.srcRequired') }]}
        >
          <Input placeholder={t('props.image.srcPlaceholder')} />
        </Form.Item>
        <Form.Item label={t('props.image.height')} name="height">
          <InputNumber min={10} max={1000} placeholder={t('props.image.heightPlaceholder')} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label={t('props.image.name')} name="name">
          <Input placeholder={t('props.image.namePlaceholder')} />
        </Form.Item>
        <Form.Item label={t('props.image.fillMode')} name="fillMode">
          <Select placeholder={t('props.image.fillModePlaceholder')}>
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