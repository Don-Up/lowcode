// packages/client-next/app/editor/components/EditorRightPanel.tsx
'use client';
import { Tabs } from 'antd';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import TextPropComp from '@/app/editor/components/text/TextPropComponent';
import ImagePropComp from '@/app/editor/components/image/ImagePropComponent';
import { updateComponent } from '@/store/componentSlice';
import { Component } from '@/app/editor/components/Model';
import SwiperPropComp from '@/app/editor/components/swiper/SwiperPropComponent';
import CardPropComp from '@/app/editor/components/card/CardPropComponents';
import ListPropComp from '@/app/editor/components/list/ListPropComponent';
import SplitPropComp from '@/app/editor/components/split/SplitPropComponent';
import EmptyPropComponent from '@/app/editor/components/empty/EmptyPropComponent';
import RichTextPropComponent from '@/app/editor/components/richtext/RichTextPropComponent';
import QrCodePropComponent from '@/app/editor/components/qrcode/QrCodePropComponent';
import AlertPropComponent from '@/app/editor/components/alert/AlertPropComponent';
import InputPropComponent from '@/app/editor/components/input/InputPropComponent';
import TextAreaPropComponent from '@/app/editor/components/textarea/TextAreaPropComponent';
import RadioPropComp from '@/app/editor/components/radio/RadioPropComponents';

export default function EditorRightPanel() {

  const { selectedComponentId, components } = useAppSelector((state) => state.component.present);
  const dispatch = useAppDispatch();
  const selectedComp = selectedComponentId && components.find(item => item.id === selectedComponentId);

  function getPropPropertyComponent() {
    if (!selectedComponentId) return <></>;
    if (!selectedComp) return <></>;
    switch (selectedComp.type) {
      case 'text':
        return <TextPropComp {...selectedComp} onChange={handleCompChange} />;
      case 'image':
        return <ImagePropComp {...selectedComp} onChange={handleCompChange} />;
      case 'swiper':
        return <SwiperPropComp {...selectedComp} onChange={handleCompChange} />;
      case 'card':
        return <CardPropComp {...selectedComp} onChange={handleCompChange} />;
      case 'list':
        return <ListPropComp {...selectedComp} onChange={handleCompChange} />;
      case 'split':
        return <SplitPropComp {...selectedComp} onChange={handleCompChange} />;
      case 'empty':
        return <EmptyPropComponent {...selectedComp} onChange={handleCompChange} />;
      case 'richtext':
        return <RichTextPropComponent {...selectedComp} onChange={handleCompChange} />;
      case 'qrcode':
        return <QrCodePropComponent {...selectedComp} onChange={handleCompChange} />;
      case 'alert':
        return <AlertPropComponent  {...selectedComp} onChange={handleCompChange} />;
      case 'input':
        return <InputPropComponent  {...selectedComp} onChange={handleCompChange} />;
      case 'textarea':
        return <TextAreaPropComponent  {...selectedComp} onChange={handleCompChange} />;
      case 'radio':
        return <RadioPropComp  {...selectedComp} onChange={handleCompChange} />;
      default:
        return <></>;
    }
  }

  function handleCompChange(values: Component) {
    dispatch(updateComponent({ ...selectedComp, ...values }));
  }

  const items = [
    {
      key: 'components-fields',
      label: (
        <>
          <AppstoreOutlined />
          <span>组件属性</span>
        </>
      ),
      children: <div className={'overflow-y-auto max-h-[80vh]'}>
        {getPropPropertyComponent()}
      </div>, // Move the component here
    },
    {
      key: 'page-fields',
      label: (
        <>
          <SettingOutlined />
          <span>全局属性</span>
        </>
      ),
      children: <div>Global properties content here</div>, // Add appropriate content
    },
  ];


  return <Tabs defaultActiveKey="components-fields" items={items} />;
}
