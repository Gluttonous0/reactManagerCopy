/**
 * 接口类型定义
 * */
declare module "axios" {
  interface AxiosRequestConfig {
    showLoading?: boolean
    showError?: boolean
  }
}

export interface Result<T = any> {
  code: number
  data: T
  msg: string
}

export namespace Login {
  export interface Params {
    userName: string
    userPwd: string
  }
}
