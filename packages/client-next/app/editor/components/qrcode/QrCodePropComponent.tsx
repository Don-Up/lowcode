// packages/client-next/app/editor/components/qrcode/QrCodePropComponent.tsx
'use client';

import React, { useEffect } from 'react';
import { ColorPicker, Form, Input, InputNumber, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import QrCodeProps from '@/app/editor/components/qrcode/QrCodeProps';

// Define a type for color values that can be either string or color object
type ColorValue = string | { toHexString?: () => string } | undefined;

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
  const { t } = useTranslation();
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
        <Form.Item label={t('props.qrcode.content')} name="value">
          <Input placeholder={t('props.qrcode.contentPlaceholder')} allowClear />
        </Form.Item>

        <Form.Item label={t('props.qrcode.bgColor')} name="bgColor">
          <ColorPicker
            format="hex"           // Force hex format output
            showText
            presets={[
              { label: t('props.qrcode.recommendColors'), colors: ['#ffffff', '#f5f5f5', '#3443DE', '#000000'] },
            ]}
          />
        </Form.Item>

        <Form.Item label={t('props.qrcode.color')} name="color">
          <ColorPicker format="hex" showText />
        </Form.Item>

        {/* Other fields remain unchanged */}
        <Form.Item label={t('props.qrcode.errorLevel')} name="errorLevel">
          <Select
            options={[
              { value: 'L', label: 'L (7%)' },
              { value: 'M', label: 'M (15%)' },
              { value: 'Q', label: 'Q (25%)' },
              { value: 'H', label: 'H (30%)' },
            ]}
          />
        </Form.Item>

        <Form.Item label={t('props.qrcode.size')} name="size">
          <InputNumber min={80} max={400} step={10} className="w-full" />
        </Form.Item>

        <Form.Item label={t('props.qrcode.icon')} name="icon">
          <Input placeholder={t('props.qrcode.iconPlaceholder')} allowClear />
        </Form.Item>

        <Form.Item label={t('props.qrcode.iconSize')} name="iconSize">
          <InputNumber min={20} max={160 * 0.4} step={4} className="w-full" />
        </Form.Item>

        <div className="text-xs text-gray-500 mt-2">
          {t('props.qrcode.hint')}
        </div>
      </div>
    </Form>
  );
};

export default QrCodePropComp;