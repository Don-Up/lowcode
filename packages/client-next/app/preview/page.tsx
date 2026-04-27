'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import PreviewRenderer from './components/PreviewRenderer';
import { loadDraft } from '@/utils/draft';

export default function PreviewPage() {
  const router = useRouter();
  const draft = loadDraft();
  const pageTitle = draft?.pageTitle || '页面预览';

  const handleBack = () => {
    router.push('/editor');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Floating Back Button */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          type="primary"
          icon={<ArrowLeftOutlined />}
          onClick={handleBack}
          size="large"
        >
          返回编辑
        </Button>
      </div>

      {/* Page Title */}
      <div className="bg-white shadow-sm py-4 px-6 text-center">
        <h1 className="text-xl font-semibold text-gray-800">{pageTitle}</h1>
      </div>

      {/* Preview Content */}
      <div className="max-w-[380px] mx-auto bg-white min-h-[700px] mt-4 mb-4 rounded-lg overflow-hidden">
        <PreviewRenderer />
      </div>
    </div>
  );
}