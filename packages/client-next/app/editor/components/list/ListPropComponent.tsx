// packages/client-next/app/editor/components/list/ListPropComponent.tsx
'use client';

import React from 'react';
import { Form, Input, Button, Space, Avatar, Divider } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ListProps, { DefaultListItemComponentProps, ListItemProps } from '@/app/editor/components/list/ListProps';

interface ListPropCompProps extends ListProps {
  onChange: (values: ListProps) => void;
}

const ListPropComp: React.FC<ListPropCompProps> = (props) =>
{
  const [form] = Form.useForm();
  const { id, list = [], onChange } = props
  // 重要：外部 list 变化时同步到表单（比如切换选中组件、从服务端加载等场景）
  React.useEffect(() => {
    form.setFieldsValue({ items: list });
  }, [list, form]);

  // 只要表单值变化就实时通知外部更新 redux
  const handleValuesChange = (_: any, allValues: { items: ListItemProps[] }) => {
    onChange({ ...props, list: allValues.items ?? [] });
  };

  return (
    <div className="p-2">
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleValuesChange}
        initialValues={{ items: list.length > 0 ? list : [DefaultListItemComponentProps] }}
        className="space-y-4"
      >
        <Form.List name="items">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }, index) => (
                <div
                  key={key}
                  className="relative p-4 mb-4 border border-gray-200 rounded-lg bg-gray-50 hover:border-blue-300 transition-colors"
                >
                  {/* 删除按钮 */}
                  <div className="absolute right-3 top-3 text-gray-400 hover:text-red-500 cursor-pointer text-lg">
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </div>

                  <div className="flex items-start gap-4">
                    {/* 头像预览 + 编辑 */}
                    <div className="flex-shrink-0">
                      <Avatar
                        size={64}
                        src={form.getFieldValue(['items', name, 'avatar'])}
                        className="border border-gray-300"
                      />
                    </div>

                    <div className="flex-1 space-y-3">
                      {/* 标题 */}
                      <Form.Item
                        {...restField}
                        name={[name, 'title']}
                        label="标题"
                        rules={[{ required: true, message: '请输入标题' }]}
                      >
                        <Input placeholder="请输入列表项标题" allowClear />
                      </Form.Item>

                      {/* 标题跳转链接 */}
                      <Form.Item
                        {...restField}
                        name={[name, 'titleLink']}
                        label="标题链接（可选）"
                      >
                        <Input placeholder="https://example.com" allowClear />
                      </Form.Item>

                      {/* 头像链接 */}
                      <Form.Item
                        {...restField}
                        name={[name, 'avatar']}
                        label="头像链接（建议 50×50 或正方形）"
                      >
                        <Input placeholder="https://.../avatar.png" allowClear />
                      </Form.Item>

                      {/* 描述 */}
                      <Form.Item
                        {...restField}
                        name={[name, 'description']}
                        label="描述"
                      >
                        <Input.TextArea
                          placeholder="请输入描述文字..."
                          rows={2}
                          allowClear
                        />
                      </Form.Item>
                    </div>
                  </div>

                  {index !== fields.length - 1 && <Divider className="my-6" />}
                </div>
              ))}

              <Form.Item className="mt-6">
                <Button
                  type="dashed"
                  onClick={() => add(DefaultListItemComponentProps)}
                  block
                  icon={<PlusOutlined />}
                  size="large"
                >
                  添加新列表项
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </div>
  );
};

export default ListPropComp;