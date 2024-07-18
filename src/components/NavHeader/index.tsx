/**
 *
 * @returns 头部页面
 */
import styles from "./index.module.less";
import { Dropdown, Switch, Space } from "antd";
import BreadCrumb from "./Breadcrumb";
import type { MenuProps } from "antd";
import { DownOutlined } from "@ant-design/icons";
import useBearStore from "@/store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "@/api/userApi";

export default function NavHeader() {
  const userInfo = useBearStore(state => state.userInfo);
  const updateUserInfo = useBearStore(state => state.updateUserInfo); //zustand临时储存

  //获取用户信息
  useEffect(() => {
    getUserInfo();
  }, []);

  //获取用户信息接口
  const getUserInfo = async () => {
    const data = await api.getUserInfo();
    updateUserInfo(data);
  };
  const navigate = useNavigate();
  const items: MenuProps["items"] = [
    {
      label: `邮箱:${userInfo.userEmail}`,
      key: "1"
    },
    {
      label: "退出",
      key: "2"
    }
  ];
  const onClick = (e: any) => {
    if (e.key === "1") return;
    if (e.key === "2") {
      navigate("/login");
    }
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
              {userInfo.userName}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
}
