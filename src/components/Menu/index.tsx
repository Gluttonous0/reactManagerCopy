/**
 * 侧边栏
 */
import { useNavigate } from "react-router-dom"
import styles from "./index.module.less"
import { Menu } from "antd"
import { DesktopOutlined } from "@ant-design/icons"

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
  },
  {
    key: "2",
    label: "系统管理",
    icon: <DesktopOutlined />,
    children: [
      {
        key: "3",
        label: "用户管理",
        icon: <DesktopOutlined />
      }
    ]
  }
]
export default function SideMenu() {
  const navigate = useNavigate()

  //顶部跳转页面
  const handleWelcome = () => {
    navigate("/welcome")
  }
  const handleChangeContext = (value?: any) => {
    if (value.key == 1) {
      navigate("/dashboard")
    }
    if (value.key == 3) {
      navigate("/userlist")
    }
  }
  return (
    <div className={styles.side_menu}>
      <div className={styles.side_header} onClick={handleWelcome}>
        <img src='/public/imgs/logo.png' />
        <span>猛男货运</span>
      </div>
      <Menu theme='dark' mode='inline' items={items} onClick={handleChangeContext} />
    </div>
  )
}
