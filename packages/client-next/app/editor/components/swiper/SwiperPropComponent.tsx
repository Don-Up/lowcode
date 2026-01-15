'use client';

import React, { useEffect } from 'react';
import { Form, InputNumber, Select, Switch } from 'antd';
import SwiperProps from '@/app/editor/components/swiper/SwiperProps';


interface SwiperPropCompProps extends SwiperProps {
  onChange: (values: SwiperProps) => void;
}

const SwiperPropComp: React.FC<SwiperPropCompProps> = ({
                                                         id,
                                                         interval,
                                                         autoPlay,
                                                         images,
                                                         showIndicators,
                                                         dotPosition,
                                                         onChange,
                                                       }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ interval, autoPlay, images, showIndicators, dotPosition });
  }, [interval, autoPlay, images, showIndicators, dotPosition]);

  const handleValuesChange = () => {
    const values = form.getFieldsValue() as SwiperProps;
    if (onChange) {
      onChange(values);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValuesChange}
      initialValues={{ interval, autoPlay, images, showIndicators, dotPosition }}
    >
      <div className={'grid grid-cols-1 gap-4 mt-5'}>
        <Form.Item label="Interval" name="interval">
          <InputNumber min={100} max={10000} placeholder="Enter interval (ms)" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Auto Play" name="autoPlay" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Show Indicators" name="showIndicators" valuePropName="checked">
          <Switch />
        </Form.Item>
        <Form.Item label="Dot Position" name="dotPosition">
          <Select placeholder="Select dot position">
            <Select.Option value="top">Top</Select.Option>
            <Select.Option value="bottom">Bottom</Select.Option>
            <Select.Option value="left">Left</Select.Option>
            <Select.Option value="right">Right</Select.Option>
          </Select>
        </Form.Item>
      </div>

    </Form>

  );
};

export default SwiperPropComp;