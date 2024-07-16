/**
 *
 * @returns 头部页面
 */
import styles from "./index.module.less";
import { Dropdown, Switch, Space } from "antd";
import BreadCrumb from "./Breadcrumb";
import type { MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";

export default function NavHeader() {
  const items: MenuProps["items"] = [
    {
      label: "1st menu item",
      key: "1"
    },
    {
      label: "2nd menu item",
      key: "2"
    },
    {
      label: "3rd menu item",
      key: "3"
    }
  ];
  const onClick = (e: any) => {
    console.log(e);
  };
  const onChange = (e: any) => {};
  return (
    <div className={styles.navheader}>
      <div>
        <BreadCrumb />
      </div>
      <div className={styles.navright}>
        <Switch onChange={onChange} checkedChildren='暗黑' unCheckedChildren='默认' style={{ width: 57 }} />
        <Dropdown menu={{ items, onClick }} trigger={["click"]}>
          <a onClick={e => e.preventDefault()}>
            <Space>
              Hover me, Click menu item
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
}
