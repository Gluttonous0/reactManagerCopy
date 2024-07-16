/**
 * 侧边栏
 */
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.less";
import { Menu } from "antd";
import { UploadOutlined, UserOutlined, DesktopOutlined } from "@ant-design/icons";

// const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map((icon, index) => ({
//   key: String(index + 1),
//   icon: React.createElement(icon),
//   label: `nav ${index + 1}`
// }));

const items = [
  {
    key: "1",
    label: "工作台",
    icon: <DesktopOutlined />
  }
];
export default function SideMenu() {
  const navigate = useNavigate();

  //顶部跳转页面
  const handleWelcome = () => {
    navigate("/welcome");
  };
  const handleChangeContext = (value?: any) => {
    if (value.key == 1) {
      navigate("/dashboard");
    }
  };
  return (
    <div className={styles.side_menu}>
      <div className={styles.side_header} onClick={handleWelcome}>
        <img src='/public/imgs/logo.png' />
        <span>猛男货运</span>
      </div>
      <Menu theme='dark' mode='inline' items={items} onClick={handleChangeContext} />
    </div>
  );
}
