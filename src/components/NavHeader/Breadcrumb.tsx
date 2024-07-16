import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Breadcrumb, Space } from "antd";
export default function BreadCrumb() {
  const items = [
    {
      title: <a href='/welcome'>首页</a>
    },
    {
      title: <a href=''>Application List</a>
    },
    {
      title: "An Application"
    }
  ];

  return (
    <div style={{ display: "flex" }}>
      <Space>
        <MenuUnfoldOutlined />
        <Breadcrumb items={items} />
      </Space>
    </div>
  );
}
