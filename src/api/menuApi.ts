import { Dept, Menu, ResultData, User } from "@/types/api"
import request from "@/utils/request"

const api = {
  //获取菜单列表
  getMenuList(params?: Menu.Params) {
    return request.get<Menu.MenuItem[]>("/menu/list", params)
  },
  // 创建菜单
  createMenu(params: Menu.CreateParams) {
    return request.post("/menu/create", params)
  },
  // 修改菜单
  editMenu(params: Menu.EditParams) {
    return request.post("/menu/edit", params)
  },
  // 删除菜单
  delMenuById(params: Menu.DelParams) {
    return request.post("/menu/delete", params)
  }
}

export default api
