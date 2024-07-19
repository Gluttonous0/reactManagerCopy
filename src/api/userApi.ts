import { Login, OrderType, User } from "@/types/api"
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
  }
}

export default api
