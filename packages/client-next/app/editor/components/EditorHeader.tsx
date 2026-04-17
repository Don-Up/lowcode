'use client';

import { Button, Switch } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPreviewMode } from '@/store/componentSlice';

const Header = () => {
  const dispatch = useAppDispatch();
  const { isPreviewMode } = useAppSelector((state) => state.component.present);

  const handlePreviewToggle = (checked: boolean) => {
    dispatch(setPreviewMode(checked));
  };

  return (
    <div className="flex items-center mx-6">
      <div className="flex-1">小滴低代码平台</div>
      <div className="flex-1 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">预览模式</span>
          <Switch checked={isPreviewMode} onChange={handlePreviewToggle} />
        </div>
        <button className="px-4 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors text-sm">
          草稿
        </button>
        <button className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm">
          发布
        </button>
      </div>
      <div className="flex-1 flex justify-end">后台数据统计 头像</div>
    </div>
  );
};

export default Header;