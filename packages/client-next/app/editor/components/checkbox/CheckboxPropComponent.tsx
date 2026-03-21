// packages/client-next/app/editor/components/checkbox/CheckboxPropComponent.tsx
'use client';

import React, { useEffect } from 'react';
import { Button, Form, Input, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import CheckboxProps from '@/app/editor/components/checkbox/CheckboxProps';
import { nanoid } from 'nanoid';

interface CheckboxPropCompProps extends CheckboxProps {
  onChange: (values: CheckboxProps) => void;
}

const defaultOption = { id: nanoid(6), value: '选项1' };

const CheckboxPropComp: React.FC<CheckboxPropCompProps> = ({
                                                             id,
                                                             title,
                                                             defaultChecked = [],
                                                             options = [],
                                                             onChange,
                                                           }) => {
  const [form] = Form.useForm();

// 只替换 useEffect 部分，其他保持不变

  useEffect(() => {
    form.setFieldsValue({
      title: title || '默认展示的标题',
      defaultChecked: defaultChecked?.length ? defaultChecked : [],
    });
  }, [title, defaultChecked, form]);

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
          label="默认展示的标题"
          name="title"
          initialValue={title}
        >
          <Input placeholder="默认展示的标题" allowClear />
        </Form.Item>

        {/* 默认选中的选项 */}
        <Form.Item
          label="默认选择的选项（可多选）"
          name="defaultChecked"
          initialValue={defaultChecked}
        >
          <Form.Item noStyle shouldUpdate>
            {() => {
              const currentOptions = form.getFieldValue('options') || [];
              return (
                <Select
                  mode="multiple"
                  placeholder="请选择默认选项（可多选）"
                  allowClear
                  options={currentOptions.map((opt: any) => ({
                    value: opt.id,
                    label: opt.value || '（空选项）',
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
                      label="选项名称"
                      rules={[{ required: true, message: '请输入选项名称' }]}
                    >
                      <Input placeholder="选项名称" allowClear />
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
                  onClick={() => add({ id: nanoid(6), value: `选项${fields.length + 1}` })}
                  block
                  icon={<PlusOutlined />}
                >
                  添加新选项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <div className="text-xs text-gray-500 mt-2">
          提示：画布中多选框为禁用状态，仅用于效果预览
        </div>
      </div>
    </Form>
  );
};

export default CheckboxPropComp;