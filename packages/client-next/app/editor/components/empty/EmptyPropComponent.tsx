// packages/client-next/app/editor/components/empty/EmptyPropComponent.tsx
'use client';

import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import EmptyProps from '@/app/editor/components/empty/EmptyProps';

interface EmptyPropCompProps extends EmptyProps {
  onChange: (values: EmptyProps) => void;
}

const EmptyPropComp: React.FC<EmptyPropCompProps> = ({
                                                       id,
                                                       image,
                                                       description,
                                                       imageWidth,
                                                       imageHeight,
                                                       imageObjectFit,
                                                       onChange,
                                                     }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  // 同步外部 props 到表单（切换选中组件时使用）
  useEffect(() => {
    form.setFieldsValue({
      image,
      description,
      imageWidth,
      imageHeight,
      imageObjectFit,
    });
  }, [image, description, imageWidth, imageHeight, imageObjectFit, form]);

  const handleValuesChange = () => {
    const values = form.getFieldsValue() as EmptyProps;
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
        {/* 自定义空状态图片 */}
        <Form.Item
          label={t('props.empty.customImage')}
          name="image"
          initialValue={image}
        >
          <Input
            placeholder={t('props.empty.imagePlaceholder')}
            allowClear
          />
        </Form.Item>

        {/* 描述文字 */}
        <Form.Item
          label={t('props.empty.description')}
          name="description"
          initialValue={description}
        >
          <Input
            placeholder={t('props.empty.descPlaceholder')}
            allowClear
          />
        </Form.Item>

        {/* 图片尺寸 - 宽度 */}
        <Form.Item
          label={t('props.empty.width')}
          name="imageWidth"
          initialValue={imageWidth}
        >
          <InputNumber min={20} max={400} className="w-full" />
        </Form.Item>

        {/* 图片尺寸 - 高度 */}
        <Form.Item
          label={t('props.empty.height')}
          name="imageHeight"
          initialValue={imageHeight}
        >
          <InputNumber min={20} max={400} className="w-full" />
        </Form.Item>

        {/* 图片填充方式 */}
        <Form.Item
          label={t('props.empty.fillMode')}
          name="imageObjectFit"
          initialValue={imageObjectFit}
        >
          <Select
            options={[
              { value: 'contain', label: t('props.empty.contain') },
              { value: 'cover', label: t('props.empty.cover') },
              { value: 'fill', label: t('props.empty.fill') },
              { value: 'none', label: t('props.empty.none') },
              { value: 'scale-down', label: t('props.empty.scaleDown') },
            ]}
          />
        </Form.Item>

        <div className="text-xs text-gray-500 mt-2">
          {t('props.empty.hint')}
        </div>
      </div>
    </Form>
  );
};

export default EmptyPropComp;