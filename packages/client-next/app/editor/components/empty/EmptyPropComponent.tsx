// packages/client-next/app/editor/components/empty/EmptyPropComponent.tsx
'use client';

import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
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
          label="自定义空状态图片（可选）"
          name="image"
          initialValue={image}
        >
          <Input
            placeholder="https://example.com/empty.png"
            allowClear
          />
        </Form.Item>

        {/* 描述文字 */}
        <Form.Item
          label="描述文字"
          name="description"
          initialValue={description}
        >
          <Input
            placeholder="暂无数据 / No Data"
            allowClear
          />
        </Form.Item>

        {/* 图片尺寸 - 宽度 */}
        <Form.Item
          label="图片宽度（px）"
          name="imageWidth"
          initialValue={imageWidth}
        >
          <InputNumber min={20} max={400} className="w-full" />
        </Form.Item>

        {/* 图片尺寸 - 高度 */}
        <Form.Item
          label="图片高度（px）"
          name="imageHeight"
          initialValue={imageHeight}
        >
          <InputNumber min={20} max={400} className="w-full" />
        </Form.Item>

        {/* 图片填充方式 */}
        <Form.Item
          label="图片填充方式"
          name="imageObjectFit"
          initialValue={imageObjectFit}
        >
          <Select
            options={[
              { value: 'contain', label: '完整显示（contain）' },
              { value: 'cover', label: '裁剪填充（cover）' },
              { value: 'fill', label: '拉伸填充（fill）' },
              { value: 'none', label: '原始尺寸（none）' },
              { value: 'scale-down', label: '缩小到合适（scale-down）' },
            ]}
          />
        </Form.Item>

        <div className="text-xs text-gray-500 mt-2">
          提示：不填写图片链接将使用 Ant Design 默认空状态图
        </div>
      </div>
    </Form>
  );
};

export default EmptyPropComp;