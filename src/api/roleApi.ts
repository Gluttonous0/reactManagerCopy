import { Dept, Menu, ResultData, Role, User } from "@/types/api"
import request from "@/utils/request"

const api = {
  //获取权限列表
  getRoleList(params: Role.Params) {
    return request.get<ResultData<Role.RoleItem>>("/role/list", params)
  },
  //创建角色
  getCreateRole(params: Role.CreateParams) {
    return request.post("/role/create", params)
  },
  //编辑角色
  getEditRole(params: Role.EditParams) {
    return request.post("/role/edit", params)
  },
  //设置权限
  updatePermission(params: Role.Permission) {
    return request.post("/role/update/permission", params)
  },
  //删除角色
  getDelRole(params: Role.DelParams) {
    return request.post("/role/delete", params)
  }
}

export default api
