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

export namespace Dept {
  //搜索参数
  export interface Params {
    deptName?: string
  }
  //返回部门参数
  export interface DeptItem {
    id: string
    createTime: string
    updateTime: string
    deptName: string
    parentId: string
    userName: string
    children: DeptItem[]
  }
  //删除部门
  export interface DelParams {
    id: string
  }
  //创建部门
  export interface CreateParams {
    deptName: string
    parentId?: string
    userName: string
  }
  //编辑部门
  export interface EditParams extends CreateParams {
    id: string
  }
}

//菜单
export namespace Menu {
  // 菜单创建
  export interface CreateParams {
    menuName: string // 菜单名称
    icon?: string // 菜单图标
    menuType: number // 1: 菜单 2：按钮 3：页面
    menuState: number // 1：正常 2：停用
    menuCode?: string // 按钮权限标识
    parentId?: string // 父级菜单ID
    path?: string // 菜单路径
    component?: string // 组件名称
    orderBy: number // 组件排序
  }

  // 菜单列表
  export interface MenuItem extends CreateParams {
    id: string
    createTime: string
    buttons?: MenuItem[]
    children?: MenuItem[]
  }
  // 搜索参数
  export interface Params {
    menuName?: string
    state?: number
  }
  // 修改用户参数
  export interface EditParams extends CreateParams {
    id?: string
  }
  // 删除参数
  export interface DelParams {
    id: string
  }
}
