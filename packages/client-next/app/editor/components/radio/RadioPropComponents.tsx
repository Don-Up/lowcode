// packages/client-next/app/editor/components/radio/RadioPropComponent.tsx
'use client';

import React, { useEffect } from 'react';
import { Button, Form, Input, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import RadioProps from '@/app/editor/components/radio/RadioProps';
import { nanoid } from 'nanoid';

interface RadioPropCompProps extends RadioProps {
  onChange: (values: RadioProps) => void;
}

const defaultOption = { id: nanoid(6), value: 'Option 1' };

const RadioPropComp: React.FC<RadioPropCompProps> = ({
                                                       id, title, defaultRadio, options = [], onChange,
                                                     }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const handleAddOption = () => {
    form.setFieldsValue({
      options: [
        ...(form.getFieldValue('options') || []),
        { id: nanoid(6), value: `Option ${(form.getFieldValue('options') || []).length + 1}` },
      ],
    });
  };

  const handleRemoveOption = (name: number) => {
    const current = form.getFieldValue('options') || [];
    const newOptions = current.filter((_: any, index: number) => index !== name);
    form.setFieldsValue({ options: newOptions });
  };

  useEffect(() => {
    form.setFieldsValue({
      title: title || t('props.radio.titlePlaceholder'),
      defaultRadio: defaultRadio || (options[0]?.id || ''),
      options: options.length > 0 ? options : [defaultOption],
    });
  }, [title, defaultRadio, options, form, t]);

  const handleValuesChange = () => {
    const values = form.getFieldsValue() as RadioProps;

    // 确保 defaultRadio 是当前存在的选项 id
    const validIds = (values.options || []).map((o) => o.id);
    if (values.defaultRadio && !validIds.includes(values.defaultRadio)) {
      values.defaultRadio = validIds[0] || '';
    }

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
          label={t('props.radio.title')}
          name="title"
        >
          <Input placeholder={t('props.radio.titlePlaceholder')} allowClear />
        </Form.Item>

        {/* 默认选中的选项 */}
        <Form.Item
          label={t('props.radio.defaultSelected')}
          name="defaultRadio"
        >
          <Form.Item noStyle shouldUpdate>
            {() => {
              const currentOptions = form.getFieldValue('options') || [];
              return (
                <Select
                  placeholder={t('props.radio.selectedPlaceholder')}
                  allowClear
                  options={currentOptions.map((opt: any) => ({
                    value: opt.id,
                    label: opt.value || t('props.radio.emptyOption'),
                  }))}
                />
              );
            }}
          </Form.Item>
        </Form.Item>

        {/* 动态选项列表 */}
        <Form.List name="options">
          {(fields) => (  // 这里不再解构 {add, remove}
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} align="baseline" className="w-full mb-3">
                  <div className="flex-1 border rounded p-3 bg-gray-50 relative">
                    <div
                      className="absolute right-2 top-2 text-gray-400 hover:text-red-500 cursor-pointer"
                      onClick={() => handleRemoveOption(name)}
                    >
                      <MinusCircleOutlined />
                    </div>

                    <Form.Item
                      {...restField}
                      name={[name, 'value']}
                      label={t('props.radio.optionName')}
                      rules={[{ required: true, message: t('props.radio.optionNameRequired') }]}
                    >
                      <Input placeholder={t('props.radio.optionPlaceholder')} allowClear />
                    </Form.Item>

                    <Form.Item {...restField} name={[name, 'id']} noStyle>
                      <Input type="hidden" />
                    </Form.Item>
                  </div>
                </Space>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={handleAddOption}
                  block
                  icon={<PlusOutlined />}
                >
                  {t('props.radio.addNewOption')}
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <div className="text-xs text-gray-500 mt-2">
          {t('props.radio.canvasHint')}
        </div>
      </div>
    </Form>
  );
};

export default RadioPropComp;