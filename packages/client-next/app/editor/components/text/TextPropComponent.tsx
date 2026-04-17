'use client';

import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Select, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
import TextProps from '@/app/editor/components/text/TextProps';


interface TextPropCompProps extends TextProps {
  onChange: (values: TextProps) => void;
}

const TextPropComp: React.FC<TextPropCompProps> = ({
                                                     id,
                                                     text,
                                                     color,
                                                     fontSize,
                                                     textAlign,
                                                     fontWeight,
                                                     disabled,
                                                     backgroundColor,
                                                     borderRadius,
                                                     padding,
                                                     margin,
                                                     onChange,
                                                   }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ text, color, fontSize, textAlign, fontWeight, disabled, backgroundColor, borderRadius, padding, margin });
  }, [text, color, fontSize, textAlign, fontWeight, disabled, backgroundColor, borderRadius, padding, margin]);

  const handleValuesChange = () => {
    const values = form.getFieldsValue() as TextProps;
    if (onChange) {
      onChange(values);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValuesChange}
      initialValues={{ text, color, fontSize, textAlign, fontWeight, disabled, backgroundColor, borderRadius, padding, margin }}
    >
      <div className={'grid grid-cols-2 gap-2 mt-5'}>
        <Form.Item
          label={t('props.text.text')}
          name="text"
          rules={[{ required: true, message: t('props.text.textRequired') }]}
          className="col-span-2"
        >
          <Input placeholder={t('props.text.textPlaceholder')} />
        </Form.Item>
        <Form.Item label={t('props.text.color')} name="color">
          <Input type="color" defaultValue="#000000" />
        </Form.Item>
        <Form.Item label={t('props.text.background')} name="backgroundColor">
          <Input type="color" defaultValue="#000000" />
        </Form.Item>
        <Form.Item label={t('props.text.fontSize')} name="fontSize">
          <InputNumber min={10} max={200} placeholder={t('props.text.fontSizePlaceholder')} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label={t('props.text.borderRadius')} name="borderRadius">
          <InputNumber min={0} max={100} placeholder={t('props.text.borderRadiusPlaceholder')} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label={t('props.text.textAlign')} name="textAlign">
          <Select placeholder={t('props.text.textAlignPlaceholder')}>
            <Select.Option value="left">Left</Select.Option>
            <Select.Option value="center">Center</Select.Option>
            <Select.Option value="right">Right</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label={t('props.text.fontWeight')} name="fontWeight">
          <Select placeholder={t('props.text.fontWeightPlaceholder')}>
            <Select.Option value="normal">Normal</Select.Option>
            <Select.Option value="bold">Bold</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label={t('props.text.padding')} name="padding">
          <InputNumber min={0} max={100} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label={t('props.text.margin')} name="margin">
          <InputNumber min={0} max={100} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label={t('props.text.disabled')} name="disabled" valuePropName="checked" className="col-span-2">
          <Switch />
        </Form.Item>
      </div>
    </Form>
  );
};

export default TextPropComp;