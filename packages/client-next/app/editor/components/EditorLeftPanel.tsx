import { Tabs } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";

export default function EditLeftPanel() {
  const items = [
    {
      key: "component-list",
      label: (
        <>
          <AppstoreOutlined /> <span>组件列表</span>
        </>
      ),
      /**
       * 不同组件列表
       */
    },
  ];

  return <Tabs defaultActiveKey="component-list" items={items} />;
}