'use client';

import { Button, Switch, message } from 'antd';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPreviewMode, saveState, loadState } from '@/store/componentSlice';

const Header = () => {
  const dispatch = useAppDispatch();
  const { isPreviewMode, components } = useAppSelector((state) => state.component.present);

  const handlePreviewToggle = (checked: boolean) => {
    dispatch(setPreviewMode(checked));
  };

  const handleSaveDraft = () => {
    // Save current components to localStorage
    localStorage.setItem('低代码草稿', JSON.stringify(components));
    message.success('草稿保存成功');
  };

  const handleLoadDraft = () => {
    // Load components from localStorage
    const saved = localStorage.getItem('低代码草稿');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch(loadState(parsed));
        message.success('草稿加载成功');
      } catch {
        message.error('草稿加载失败');
      }
    } else {
      message.info('没有保存的草稿');
    }
  };

  const handlePublish = () => {
    // TODO: Call API to publish
    message.info('发布功能待实现');
  };

  return (
    <div className="flex items-center mx-6">
      <div className="flex-1">小滴低代码平台</div>
      <div className="flex-1 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">预览模式</span>
          <Switch checked={isPreviewMode} onChange={handlePreviewToggle} />
        </div>
        <Button size="small" onClick={handleSaveDraft}>
          保存草稿
        </Button>
        <Button size="small" onClick={handleLoadDraft}>
          加载草稿
        </Button>
        <Button size="small" type="primary" onClick={handlePublish}>
          发布
        </Button>
      </div>
      <div className="flex-1 flex justify-end">后台数据统计 头像</div>
    </div>
  );
};

export default Header;