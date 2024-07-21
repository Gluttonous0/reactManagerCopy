/**
 * 接口类型定义
 * */

declare module "axios" {
  interface AxiosRequestConfig {
    showLoading?: boolean
    showError?: boolean
  }
}

// * 分页请求参数
export interface PageParams {
  pageNum: number | undefined
  pageSize?: number | undefined
}

export interface Result<T = any> {
  code: number
  data: T
  msg: string
}

export interface ResultData<T = any> {
  list: T[]
  page: {
    pageNum: number
    pageSize?: number
    total: number | 0
  }
}

export namespace Login {
  export interface Params {
    userName: string
    userPwd: string
  }
}

//订单
export namespace OrderType {
  export interface ReportData {
    cityNum: number
    driverCount: number
    orderCount: number
    totalMoney: number
  }
  export interface LineData {
    label: string[]
    order: number[]
    money: number[]
  }
  export interface PieData {
    value: number
    name: string
  }
  export interface RadarData {
    indicator: Array<{ name: string; max: number }>
    data: {
      name: string
      value: number[]
    }
  }
}

export namespace User {
  // 搜索参数
  export interface Params extends PageParams {
    userId?: number
    userName?: string
    state?: number
  }
  // 创建用户参数
  export interface CreateParams {
    userName: string
    userEmail: string
    mobile?: number
    job?: string
    state?: number
    roleList?: string[]
    deptId?: string[]
    userImg: string
  }
  // 修改用户参数
  export interface EditParams extends CreateParams {
    userId?: number
  }
  // 用户对象
  export interface UserItem extends CreateParams {
    id: string
    userId: number
    stateName?: string
    deptName?: string
    createTime?: number | string
    lastLoginTime?: number | string
  }
}
