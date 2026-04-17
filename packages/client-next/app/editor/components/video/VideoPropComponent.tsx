'use client';

import React, { useEffect } from 'react';
import { Form, Input, Switch } from 'antd';
import VideoProps from '@/app/editor/components/video/VideoProps';

interface VideoPropCompProps extends VideoProps {
  onChange: (values: VideoProps) => void;
}

const VideoPropComp: React.FC<VideoPropCompProps> = ({
                                                       id,
                                                       url,
                                                       autoPlay,
                                                       loop,
                                                       muted,
                                                       controls,
                                                       poster,
                                                       onChange,
                                                     }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      url: url || '',
      autoPlay: autoPlay || false,
      loop: loop || false,
      muted: muted || false,
      controls: controls !== false,
      poster: poster || '',
    });
  }, [url, autoPlay, loop, muted, controls, poster, form]);

  const handleValuesChange = () => {
    const values = form.getFieldsValue() as VideoProps;
    onChange(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleValuesChange}
      className="mt-5"
    >
      <div className="grid grid-cols-1 gap-4">
        <Form.Item
          label="Video URL"
          name="url"
          tooltip="输入视频文件的URL地址"
        >
          <Input placeholder="https://example.com/video.mp4" allowClear />
        </Form.Item>

        <Form.Item
          label="Poster Image URL"
          name="poster"
          tooltip="视频封面图（视频未播放时显示）"
        >
          <Input placeholder="https://example.com/poster.jpg" allowClear />
        </Form.Item>

        <div className="grid grid-cols-2 gap-2">
          <Form.Item label="Auto Play" name="autoPlay" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item label="Loop" name="loop" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item label="Muted" name="muted" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item label="Controls" name="controls" valuePropName="checked">
            <Switch />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default VideoPropComp;