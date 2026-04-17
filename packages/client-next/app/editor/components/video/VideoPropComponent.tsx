'use client';

import React, { useEffect } from 'react';
import { Form, Input, Switch } from 'antd';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
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
          label={t('props.video.url')}
          name="url"
          tooltip={t('props.video.urlTooltip')}
        >
          <Input placeholder={t('props.video.urlPlaceholder')} allowClear />
        </Form.Item>

        <Form.Item
          label={t('props.video.poster')}
          name="poster"
          tooltip={t('props.video.posterTooltip')}
        >
          <Input placeholder={t('props.video.posterPlaceholder')} allowClear />
        </Form.Item>

        <div className="grid grid-cols-2 gap-2">
          <Form.Item label={t('props.video.autoPlay')} name="autoPlay" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item label={t('props.video.loop')} name="loop" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item label={t('props.video.muted')} name="muted" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item label={t('props.video.controls')} name="controls" valuePropName="checked">
            <Switch />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default VideoPropComp;