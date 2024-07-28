/**
 * 侧边栏
 */
import { useLocation, useNavigate, useRouteLoaderData } from "react-router-dom"
import styles from "./index.module.less"
import { Menu } from "antd"
import React, { useEffect, useState } from "react"
import { Menu as IMenu } from "@/types/api"
import * as Icons from "@ant-design/icons"

export default function SideMenu() {
  const navigate = useNavigate() //跳转方法
  const data: any = useRouteLoaderData("layout") //用useRouteLoaderData获取侧边栏目录列表
  const [menuList, setMenuList] = useState() //储存递归生成的菜单路径
  const [selectKeys, setSelectKeys] = useState<string[]>([]) // 储存当前页面路径
  const { pathname } = useLocation() //获取当前页面路径

  useEffect(() => {
    const datas = getTreeMenu(data.menuList)
    setMenuList(datas)
    setSelectKeys([pathname])
  }, [])

  //生成图标
  function createIcon(name?: string) {
    if (!name) return <></>
    const newIcon: { [key: string]: any } = Icons
    if (!newIcon[name]) return <></>
    return React.createElement(newIcon[name])
  }

  //递归函数生成菜单路由地址
  const getTreeMenu = (menuList: IMenu.MenuItem[], treeList: any = []) => {
    menuList.forEach((item: IMenu.MenuItem, index) => {
      if (item.button) {
        treeList.push({ key: item.path || index, label: item.menuName, icon: createIcon(item.icon) })
      } else if (item.children && item.children.length > 0) {
        const newItem = getTreeMenu(item.children)
        if (!newItem) return ""
        treeList.push({ key: item.path || index, label: item.menuName, icon: createIcon(item.icon), children: newItem })
      }
    })
    return treeList
  }

  //顶部跳转页面
  const handleWelcome = () => {
    navigate("/welcome")
  }
  const handleChangeContext = ({ key }: { key: string }) => {
    navigate(key)
    setSelectKeys([key])

    // if (value.key == 1) {
    //   navigate("/dashboard")
    // }
    // if (value.key == 3) {
    //   navigate("/userlist")
    // }
    // if (value.key == 4) {
    //   navigate("/deptlist")
    // }
    // if (value.key == 5) {
    //   navigate("/menulist")
    // }
    // if (value.key == 6) {
    //   navigate("/rolelist")
    // }
  }
  return (
    <div className={styles.side_menu}>
      <div className={styles.side_header} onClick={handleWelcome}>
        <img src='/public/imgs/logo.png' />
        <span>猛男货运</span>
      </div>
      <Menu theme='dark' mode='inline' items={menuList} onClick={handleChangeContext} selectedKeys={selectKeys} />
    </div>
  )
}
