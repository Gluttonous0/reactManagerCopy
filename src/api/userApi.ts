import { Login, OrderType, User, ResultData, Menu } from "@/types/api"
import request from "@/utils/request"

const api = {
  //登录接口
  login(params: Login.Params) {
    return request.post<string>("/users/login", params)
  },
  //获取用户信息
  getUserInfo() {
    return request.get<User.UserItem>("/users/getUserInfo")
  },
  // 获取统计数据
  getReportData() {
    return request.get<OrderType.ReportData>("/order/dashboard/getReportData")
  },
  // 获取折线图数据
  getLineData() {
    return request.get<OrderType.LineData>("/order/dashboard/getLineData")
  },
  // 获取饼图1数据
  getPieCityData() {
    return request.get<OrderType.PieData[]>("/order/dashboard/getPieCityData")
  },

  // 获取饼图2数据
  getPieAgeData() {
    return request.get<OrderType.PieData[]>("/order/dashboard/getPieAgeData")
  },

  // 获取雷达图数据
  getRadarData() {
    return request.get<OrderType.RadarData>("/order/dashboard/getRadarData")
  },
  // 获取用户列表
  getUserList(params?: User.Params) {
    return request.get<ResultData<User.UserItem>>("/users/list", params)
  },
  // 用户添加
  userCreate(params: User.CreateParams) {
    return request.post("/users/create", params)
  },
  // 用户编辑
  userEdit(params: User.CreateParams) {
    return request.post("/users/edit", params)
  },
  //删除用户
  delUser(params: { userIds: number[] }) {
    return request.post("/users/delete", params)
  },
  // 获取用户权限列表
  getPermissionList() {
    return request.get<{ buttonList: string[]; menuList: Menu.MenuItem[] }>("/users/getPermissionList")
  }
}

export default api
