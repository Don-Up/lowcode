"use client"
import { Tabs } from "antd";
import { AppstoreOutlined, SettingOutlined } from "@ant-design/icons";
import { useAppSelector } from '@/store/hooks';
import TextPropComp from '@/app/editor/components/text/TextPropComponent';

export default function EditorRightPanel() {

  const { selectedComponentId, components } = useAppSelector((state) => state.component.present);


  function getPropPropertyComponent() {
    if(!selectedComponentId) return <></>
    const selectComponent = components.find(item => item.id === selectedComponentId);
    if(!selectComponent) return <></>
    switch (selectComponent.type) {
      case "titleText":
        return <TextPropComp {...selectComponent} onChange={() => {}} />;
      default:
        return <></>;
    }
  }

  const items = [
    {
      key: "components-fields",
      label: (
        <>
          <AppstoreOutlined />
          <span>组件属性</span>
          {getPropPropertyComponent()}
        </>
      ),
      // 组件属性
    },
    {
      key: "page-fields",
      label: (
        <>
          <SettingOutlined />
          <span>全局属性</span>
        </>
      ),
      // 全局组件属性
    },
  ];

  return <Tabs defaultActiveKey="components-fields" items={items} />;
}
