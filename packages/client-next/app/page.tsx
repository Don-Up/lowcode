// app/page.tsx
"use client";

import { Button } from 'antd';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">低代码平台</h1>
      <p className="text-gray-600 mb-8">可视化拖拽式页面编辑器</p>

      <Link href="/editor">
        <Button type="primary" size="large">
          进入编辑器
        </Button>
      </Link>
    </main>
  );
}