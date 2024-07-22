import { Dept, ResultData, User } from "@/types/api"
import request from "@/utils/request"

const api = {
  /* 部门管理 */
  // 获取部门列表
  getDeptList(params?: Dept.Params) {
    return request.get<Dept.DeptItem[]>("/dept/list", params)
  },
  // 创建部门
  createDept(params: Dept.CreateParams) {
    return request.post("/dept/create", params)
  },
  // 修改部门
  editDept(params: Dept.EditParams) {
    return request.post("/dept/edit", params)
  },
  // 删除部门
  delDeptById(params: Dept.DelParams) {
    return request.post("/dept/delete", params)
  },
  //获取当前账号下的所有用户
  getAllUserList() {
    return request.get<User.UserItem[]>("/users/all/list")
  }
}

export default api
