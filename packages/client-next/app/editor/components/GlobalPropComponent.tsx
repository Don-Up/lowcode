'use client';

import React, { useState } from 'react';
import { Form, Input } from 'antd';

interface GlobalProps {
  pageName?: string;
  desc?: string;
  tdk?: string;
}

const GlobalPropComponent: React.FC = () => {
  const [form] = Form.useForm();
  const [pageName, setPageName] = useState('未命名页面');
  const [desc, setDesc] = useState('');
  const [tdk, setTdk] = useState('');

  return (
    <Form
      form={form}
      layout="vertical"
      className="mt-5"
    >
      <div className="grid grid-cols-1 gap-4">
        <Form.Item label="页面名称">
          <Input
            value={pageName}
            onChange={(e) => setPageName(e.target.value)}
            placeholder="请输入页面名称"
            allowClear
          />
        </Form.Item>

        <Form.Item label="页面描述">
          <Input.TextArea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="请输入页面描述"
            rows={3}
          />
        </Form.Item>

        <Form.Item label="SEO标题(TDK)">
          <Input
            value={tdk}
            onChange={(e) => setTdk(e.target.value)}
            placeholder="标题/描述/关键词（SEO）"
            allowClear
          />
        </Form.Item>
      </div>
    </Form>
  );
};

export default GlobalPropComponent;