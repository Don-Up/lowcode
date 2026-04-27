'use client';

import { Button, Switch, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPreviewMode, loadState } from '@/store/componentSlice';
import LanguageSwitch from './LanguageSwitch';
import EditableTitle from './EditableTitle';

const Header = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isPreviewMode, components } = useAppSelector((state) => state.component.present);

  const handlePreviewToggle = (checked: boolean) => {
    dispatch(setPreviewMode(checked));
  };

  const handleSaveDraft = () => {
    localStorage.setItem('低代码草稿', JSON.stringify(components));
    message.success(t('editor.header.draftSaved'));
  };

  const handleLoadDraft = () => {
    const saved = localStorage.getItem('低代码草稿');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch(loadState(parsed));
        message.success(t('editor.header.draftLoaded'));
      } catch {
        message.error(t('editor.header.draftLoadFailed'));
      }
    } else {
      message.info(t('editor.header.noDraft'));
    }
  };

  const handlePublish = () => {
    message.info(t('editor.header.publishPending'));
  };

  return (
    <div className="flex items-center mx-6">
      <div className="flex-1">
        <EditableTitle />
      </div>
      <div className="flex-1 flex items-center justify-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{t('editor.header.previewMode')}</span>
          <Switch checked={isPreviewMode} onChange={handlePreviewToggle} />
        </div>
        <Button size="small" onClick={handleSaveDraft}>
          {t('editor.header.saveDraft')}
        </Button>
        <Button size="small" onClick={handleLoadDraft}>
          {t('editor.header.loadDraft')}
        </Button>
        <Button size="small" type="primary" onClick={handlePublish}>
          {t('editor.header.publish')}
        </Button>
        <LanguageSwitch />
      </div>
      <div className="flex-1 flex justify-end">后台数据统计 头像</div>
    </div>
  );
};

export default Header;