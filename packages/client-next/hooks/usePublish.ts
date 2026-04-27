'use client';

import { useState, useCallback } from 'react';
import { message } from 'antd';
import { useAppSelector } from '@/store/hooks';
import { saveDraft } from '@/utils/draft';

interface PublishData {
  accountId: number;
  pageName: string;
  tdk?: string;
  desc?: string;
  components: any[];
}

interface PublishResult {
  success: boolean;
  message?: string;
  data?: {
    pageId: string;
  };
}

export function usePublish() {
  const [publishing, setPublishing] = useState(false);
  const { components, pageTitle } = useAppSelector((state) => state.component.present);

  const publish = useCallback(async (): Promise<{ success: boolean; pageId?: string }> => {
    setPublishing(true);

    try {
      // Prepare publish data
      const publishData = {
        pageName: pageTitle,
        components: components,
      };

      // Call publish API
      const response = await fetch('/api/low-code/release', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(publishData),
      });

      const result: PublishResult = await response.json();

      if (result.success) {
        // Save draft to localStorage after successful publish
        saveDraft({ components, pageTitle });

        return { success: true, pageId: result.data?.pageId };
      } else {
        message.error(result.message || '发布失败');
        return { success: false };
      }
    } catch (error) {
      console.error('Publish error:', error);
      message.error('网络错误，请稍后重试');
      return { success: false };
    } finally {
      setPublishing(false);
    }
  }, [components, pageTitle]);

  return {
    publish,
    publishing,
  };
}