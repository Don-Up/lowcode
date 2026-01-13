'use client';
import { Tabs } from 'antd';
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import TextPropComp from '@/app/editor/components/text/TextPropComponent';
import ImagePropComp from '@/app/editor/components/image/ImagePropComponent';
import { updateComponent } from '@/store/componentSlice';
import { Component } from '@/app/editor/components/Model';

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
