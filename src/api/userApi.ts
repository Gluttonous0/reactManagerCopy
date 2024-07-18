import { Login, User } from "@/types/api";
import request from "@/utils/request";

export default {
  //登录接口
  login(params: Login.Params) {
    return request.post<string>("/users/login", params);
  },
  //获取用户信息
  getUserInfo() {
    return request.get<User.UserItem>("/users/getUserInfo");
  }
};
