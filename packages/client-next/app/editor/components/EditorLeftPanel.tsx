'use client';

import { Tabs } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import ComponentList from '@/app/editor/components/ComponentList';

export default function EditLeftPanel() {
  const { t } = useTranslation();
  const items = [
    {
      key: "component-list",
      label: (
        <>
          <AppstoreOutlined /> <span>{t('editor.leftPanel.componentList')}</span>
        </>
      ),
      children: <ComponentList />,
    },
  ];

  return <Tabs defaultActiveKey="component-list" items={items} />;
}