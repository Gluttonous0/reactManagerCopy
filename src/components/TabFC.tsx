import React, { useRef, useState } from "react";
import { Tabs } from "antd";

const initialItems = [
  { label: "首页", key: "1", closable: false },
  { label: "Tab 2", key: "2" },
  {
    label: "Tab 3",
    key: "3",
    closable: true
  }
];

const TabFC = () => {
  return (
    <Tabs
      type='editable-card'
      hideAdd
      items={initialItems}
      tabBarStyle={{ height: 40, marginBottom: 0, backgroundColor: "#fff" }}
    />
  );
};

export default TabFC;
