import { Dept, Menu, ResultData, User } from "@/types/api"
import request from "@/utils/request"

const api = {
  //获取菜单列表
  getMenuList(params: Menu.CreateParams) {
    return request.get<Menu.MenuItem[]>("/menu/list", params)
  }
}

export default api
