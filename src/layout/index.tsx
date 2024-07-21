/**
 * layout主页面布局
 */
import React from "react"
import { Layout, Menu, theme } from "antd"
import { Outlet } from "react-router-dom"
import NavHeader from "@/components/NavHeader"
import NavFooter from "@/components/NavFooter"
import SideMenu from "@/components/Menu"
import styles from "./index.module.less"
import TabFC from "@/components/TabFC"

const { Header, Content, Footer, Sider } = Layout

const App: React.FC = () => {
  return (
    <Layout>
      <Sider>
        <SideMenu />
      </Sider>
      <Layout style={{ width: "calc(100vw - 200px)" }}>
        <NavHeader />
        <TabFC />
        <Content className={styles.content}>
          <div className={styles.wrapper}>
            <Outlet></Outlet>
          </div>
          <NavFooter />
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
