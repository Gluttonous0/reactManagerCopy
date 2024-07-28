import api from "@/api/userApi"
import { Menu } from "@/types/api"
import { getMenuPath } from "@/utils/index"

export interface IAuthLoader {
  buttonList: string[]
  menuList: Menu.MenuItem[]
  menuPathList: string[]
}

const AuthLoader = async () => {
  const data = await api.getPermissionList()
  const menuPathList = getMenuPath(data.menuList)
  return {
    buttonList: data.buttonList || [],
    menuList: data.menuList,
    menuPathList
  }
  // return {
  //   buttonList: data.buttonList,
  //   menuList: data.menuList
  // }
}

export default AuthLoader
