'use client';

import { Button, Switch, message, Popconfirm } from 'antd';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setPreviewMode, loadState } from '@/store/componentSlice';
import LanguageSwitch from './LanguageSwitch';
import EditableTitle from './EditableTitle';
import { saveDraft, loadDraft, clearDraft, getDraftTimestamp, formatDraftTime } from '@/utils/draft';

const Header = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isPreviewMode, components, pageTitle } = useAppSelector((state) => state.component.present);

  const draftTimestamp = getDraftTimestamp();
  const draftTimeStr = draftTimestamp ? formatDraftTime(draftTimestamp) : null;

  const handlePreviewToggle = (checked: boolean) => {
    dispatch(setPreviewMode(checked));
  };

  const handlePreview = () => {
    // Save current state before preview
    saveDraft({ components, pageTitle });
    router.push('/preview');
  };

  const handleSaveDraft = () => {
    saveDraft({ components, pageTitle });
    message.success({
      content: `${t('editor.header.draftSaved')}${draftTimeStr ? ` (${draftTimeStr})` : ''}`,
    });
  };

  const handleLoadDraft = () => {
    const draft = loadDraft();
    if (draft) {
      dispatch(loadState({ components: draft.components, pageTitle: draft.pageTitle }));
      message.success({
        content: `${t('editor.header.draftLoaded')} (${formatDraftTime(draft.savedAt)})`,
      });
    } else {
      message.info(t('editor.header.noDraft'));
    }
  };

  const handleClearDraft = () => {
    clearDraft();
    message.success('草稿已清除');
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
        <Button size="small" onClick={handlePreview}>
          预览页面
        </Button>
        {draftTimeStr && (
          <Popconfirm
            title="确定清除草稿？"
            description="清除后将无法恢复"
            onConfirm={handleClearDraft}
            okText="确定"
            cancelText="取消"
          >
            <Button size="small" type="text" danger>
              清除草稿
            </Button>
          </Popconfirm>
        )}
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