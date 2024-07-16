/**
 * layout主页面布局
 */
import React from "react";
import { Layout, Menu, theme } from "antd";
import { Outlet } from "react-router-dom";
import NavHeader from "@/components/NavHeader";
import NavFooter from "@/components/NavFooter";
import SideMenu from "@/components/Menu";

const { Header, Content, Footer, Sider } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  return (
    <Layout>
      <Sider>
        <SideMenu />
      </Sider>
      <Layout style={{ width: "calc(100vw - 200px)" }}>
        <NavHeader />
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG
            }}
          >
            content
          </div>
          <Outlet></Outlet>
        </Content>
        <NavFooter />
      </Layout>
    </Layout>
  );
};

export default App;
