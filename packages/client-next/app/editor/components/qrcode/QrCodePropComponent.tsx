// packages/client-next/app/editor/components/qrcode/QrCodePropComponent.tsx
'use client';

import React, { useEffect } from 'react';
import { ColorPicker, Form, Input, InputNumber, Select } from 'antd';
import QrCodeProps from '@/app/editor/components/qrcode/QrCodeProps';

// Define a type for color values that can be either string or color object
type ColorValue = string | { toHexString?: () => string } | undefined;

// interface QrCodePropCompProps {
//   id?: string;
//   value?: string;
//   size?: number;
//   color?: ColorValue;
//   bgColor?: ColorValue;
//   errorLevel?: 'L' | 'M' | 'Q' | 'H';
//   icon?: string;
//   iconSize?: number;
//   onChange: (values: Partial<Omit<QrCodePropCompProps, 'onChange'>>) => void;
// }

interface QrCodePropCompProps extends QrCodeProps {
  onChange: (values: QrCodeProps) => void;
}

const QrCodePropComp: React.FC<QrCodePropCompProps> = ({
                                                         id,
                                                         value,
                                                         size,
                                                         color,
                                                         bgColor,
                                                         errorLevel,
                                                         icon,
                                                         iconSize,
                                                         onChange,
                                                       }) => {
  const [form] = Form.useForm();

  // Helper function to normalize color values
  const normalizeColor = (colorValue: ColorValue): string => {
    if (typeof colorValue === 'string') {
      return colorValue;
    }

    if (colorValue && typeof colorValue === 'object' &&
      'toHexString' in colorValue &&
      typeof colorValue.toHexString === 'function') {
      try {
        return colorValue.toHexString();
      } catch {
        return '#ffffff'; // fallback color
      }
    }

    return '#ffffff'; // default background color
  };

  // Helper function for foreground color
  const normalizeForegroundColor = (colorValue: ColorValue): string => {
    if (typeof colorValue === 'string') {
      return colorValue;
    }

    if (colorValue && typeof colorValue === 'object' &&
      'toHexString' in colorValue &&
      typeof colorValue.toHexString === 'function') {
      try {
        return colorValue.toHexString();
      } catch {
        return '#000000'; // fallback color
      }
    }

    return '#000000'; // default foreground color
  };

  // Standardize initial values to ensure they are strings (prevent object residue)
  useEffect(() => {
    const normalizedBg = normalizeColor(bgColor);
    const normalizedColor = normalizeForegroundColor(color);

    form.setFieldsValue({
      value: value || 'https://xdclass.net',
      size: size || 160,
      color: normalizedColor,
      bgColor: normalizedBg,
      errorLevel: errorLevel || 'L',
      icon: icon || '',
      iconSize: iconSize || 40,
    });
  }, [value, size, color, bgColor, errorLevel, icon, iconSize, form]);

  const handleValuesChange = (_: any, allValues: any) => {
    // Convert possible color objects to hex strings before onChange
    const finalValues = {
      ...allValues,
      color: normalizeForegroundColor(allValues.color),
      bgColor: normalizeColor(allValues.bgColor),
    };

    onChange(finalValues);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValuesChange}
      className="mt-5"
    >
      <div className="grid grid-cols-1 gap-4">
        <Form.Item label="二维码内容" name="value">
          <Input placeholder="https://xdclass.net 或其他链接/文本" allowClear />
        </Form.Item>

        <Form.Item label="二维码背景颜色" name="bgColor">
          <ColorPicker
            format="hex"           // Force hex format output
            showText
            presets={[
              { label: '推荐色', colors: ['#ffffff', '#f5f5f5', '#3443DE', '#000000'] },
            ]}
          />
        </Form.Item>

        <Form.Item label="二维码颜色" name="color">
          <ColorPicker format="hex" showText />
        </Form.Item>

        {/* Other fields remain unchanged */}
        <Form.Item label="二维码容错率" name="errorLevel">
          <Select
            options={[
              { value: 'L', label: 'L (7%)' },
              { value: 'M', label: 'M (15%)' },
              { value: 'Q', label: 'Q (25%)' },
              { value: 'H', label: 'H (30%)' },
            ]}
          />
        </Form.Item>

        <Form.Item label="二维码大小 (px)" name="size">
          <InputNumber min={80} max={400} step={10} className="w-full" />
        </Form.Item>

        <Form.Item label="中间图标 (URL，可选)" name="icon">
          <Input placeholder="https://example.com/logo.png" allowClear />
        </Form.Item>

        <Form.Item label="图标大小 (px)" name="iconSize">
          <InputNumber min={20} max={160 * 0.4} step={4} className="w-full" />
        </Form.Item>

        <div className="text-xs text-gray-500 mt-2">
          提示：添加图标时建议将容错率调至 H 以保证扫描成功率
        </div>
      </div>
    </Form>
  );
};

export default QrCodePropComp;
