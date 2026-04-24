'use client';

import React from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setSelectComponentId } from '@/store/componentSlice';
import VideoProps from '@/app/editor/components/video/VideoProps';
import { VideoCameraOutlined } from '@ant-design/icons';
import { convertToEmbedUrl, isYouTubeUrl } from '@/utils/videoUrl';

const VideoComponent: React.FC<VideoProps> = ({
                                                id,
                                                url,
                                                autoPlay,
                                                loop,
                                                muted,
                                                controls,
                                                poster,
                                              }) => {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(setSelectComponentId(id));
  }

  if (!url) {
    return (
      <div
        className="cursor-pointer hover:bg-gray-50 transition-colors p-4 rounded min-h-[120px] flex items-center justify-center"
        onClick={handleClick}
      >
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <VideoCameraOutlined style={{ fontSize: '48px' }} />
          <span className="text-sm">点击设置视频链接</span>
        </div>
      </div>
    );
  }

  const isYouTube = isYouTubeUrl(url);

  if (isYouTube) {
    const embedUrl = convertToEmbedUrl(url);
    return (
      <div
        className="cursor-pointer hover:bg-gray-50 transition-colors p-4 rounded min-h-[120px] flex items-center justify-center"
        onClick={handleClick}
      >
        <iframe
          src={embedUrl}
          className="max-w-full max-h-48 w-full"
          style={{ height: '192px' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div
      className="cursor-pointer hover:bg-gray-50 transition-colors p-4 rounded min-h-[120px] flex items-center justify-center"
      onClick={handleClick}
    >
      <video
        src={url}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        controls={controls}
        poster={poster || undefined}
        className="max-w-full max-h-48"
      />
    </div>
  );
};

export default VideoComponent;