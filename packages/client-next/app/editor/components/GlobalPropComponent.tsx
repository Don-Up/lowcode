'use client';

import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';

const GlobalPropComponent: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [pageName, setPageName] = useState(t('editor.global.untitled'));
  const [desc, setDesc] = useState('');
  const [tdk, setTdk] = useState('');

  return (
    <Form
      form={form}
      layout="vertical"
      className="mt-5"
    >
      <div className="grid grid-cols-1 gap-4">
        <Form.Item label={t('editor.global.pageName')}>
          <Input
            value={pageName}
            onChange={(e) => setPageName(e.target.value)}
            placeholder={t('editor.global.pageNamePlaceholder')}
            allowClear
          />
        </Form.Item>

        <Form.Item label={t('editor.global.pageDesc')}>
          <Input.TextArea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder={t('editor.global.pageDescPlaceholder')}
            rows={3}
          />
        </Form.Item>

        <Form.Item label={t('editor.global.seoTitle')}>
          <Input
            value={tdk}
            onChange={(e) => setTdk(e.target.value)}
            placeholder={t('editor.global.seoTitlePlaceholder')}
            allowClear
          />
        </Form.Item>
      </div>
    </Form>
  );
};

export default GlobalPropComponent;