// packages/client-next/app/editor/components/checkbox/CheckboxPropComponent.tsx
'use client';

import React, { useEffect } from 'react';
import { Button, Form, Input, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import CheckboxProps from '@/app/editor/components/checkbox/CheckboxProps';
import { nanoid } from 'nanoid';

interface CheckboxPropCompProps extends CheckboxProps {
  onChange: (values: CheckboxProps) => void;
}

const defaultOption = { id: nanoid(6), value: 'Option 1' };

const CheckboxPropComp: React.FC<CheckboxPropCompProps> = ({
                                                             id,
                                                             title,
                                                             defaultChecked = [],
                                                             options = [],
                                                             onChange,
                                                           }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

// 只替换 useEffect 部分，其他保持不变

  useEffect(() => {
    form.setFieldsValue({
      title: title || t('props.checkbox.titlePlaceholder'),
      defaultChecked: defaultChecked?.length ? defaultChecked : [],
    });
  }, [title, defaultChecked, form, t]);

// 仅在组件 mount 时初始化 options
  useEffect(() => {
    if (form.getFieldValue('options') === undefined) {
      form.setFieldsValue({
        options: options.length > 0 ? options : [defaultOption],
      });
    }
  }, []);  // 只执行一次

  const handleValuesChange = () => {
    const values = form.getFieldsValue() as CheckboxProps;

    // 清理 defaultChecked 中已不存在的选项
    const validIds = (values.options || []).map((o) => o.id);
    const cleanedChecked = (values.defaultChecked || []).filter((id) =>
      validIds.includes(id),
    );

    onChange({
      ...values,
      defaultChecked: cleanedChecked,
    });
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
          label={t('props.checkbox.title')}
          name="title"
        >
          <Input placeholder={t('props.checkbox.titlePlaceholder')} allowClear />
        </Form.Item>

        {/* 默认选中的选项 */}
        <Form.Item
          label={t('props.checkbox.defaultSelected')}
          name="defaultChecked"
        >
          <Form.Item noStyle shouldUpdate>
            {() => {
              const currentOptions = form.getFieldValue('options') || [];
              return (
                <Select
                  mode="multiple"
                  placeholder={t('props.checkbox.selectedPlaceholder')}
                  allowClear
                  options={currentOptions.map((opt: any) => ({
                    value: opt.id,
                    label: opt.value || t('props.checkbox.emptyOption'),
                  }))}
                />
              );
            }}
          </Form.Item>
        </Form.Item>

        {/* 动态选项列表 */}
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} align="baseline" className="w-full mb-3">
                  <div className="flex-1 border rounded p-3 bg-gray-50 relative">
                    <div
                      className="absolute right-2 top-2 text-gray-400 hover:text-red-500 cursor-pointer z-10"
                      onClick={() => remove(name)}
                    >
                      <MinusCircleOutlined />
                    </div>

                    <Form.Item
                      {...restField}
                      name={[name, 'value']}
                      label={t('props.checkbox.optionName')}
                      rules={[{ required: true, message: t('props.checkbox.optionNameRequired') }]}
                    >
                      <Input placeholder={t('props.checkbox.optionPlaceholder')} allowClear />
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
                  onClick={() => add({ id: nanoid(6), value: `Option ${fields.length + 1}` })}
                  block
                  icon={<PlusOutlined />}
                >
                  {t('props.checkbox.addNewOption')}
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <div className="text-xs text-gray-500 mt-2">
          {t('props.checkbox.canvasHint')}
        </div>
      </div>
    </Form>
  );
};

export default CheckboxPropComp;