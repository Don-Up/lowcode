// packages/client-next/app/editor/components/list/ListPropComponent.tsx
'use client';

import React from 'react';
import { Form, Input, Button, Space, Avatar, Divider } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import ListProps, { DefaultListItemComponentProps, ListItemProps } from '@/app/editor/components/list/ListProps';

interface ListPropCompProps extends ListProps {
  onChange: (values: ListProps) => void;
}

const ListPropComp: React.FC<ListPropCompProps> = (props) =>
{
  const { t } = useTranslation();
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
                        label={t('props.list.title')}
                        rules={[{ required: true, message: t('props.list.titleRequired') }]}
                      >
                        <Input placeholder={t('props.list.titlePlaceholder')} allowClear />
                      </Form.Item>

                      {/* 标题跳转链接 */}
                      <Form.Item
                        {...restField}
                        name={[name, 'titleLink']}
                        label={t('props.list.titleLink')}
                      >
                        <Input placeholder={t('props.list.linkPlaceholder')} allowClear />
                      </Form.Item>

                      {/* 头像链接 */}
                      <Form.Item
                        {...restField}
                        name={[name, 'avatar']}
                        label={t('props.list.avatarLink')}
                      >
                        <Input placeholder={t('props.list.avatarPlaceholder')} allowClear />
                      </Form.Item>

                      {/* 描述 */}
                      <Form.Item
                        {...restField}
                        name={[name, 'description']}
                        label={t('props.list.description')}
                      >
                        <Input.TextArea
                          placeholder={t('props.list.descPlaceholder')}
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
                  {t('props.list.addNewItem')}
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