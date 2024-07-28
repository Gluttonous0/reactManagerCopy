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
    button?: MenuItem[]
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

//权限列表
export namespace Role {
  //参数
  export interface Params extends PageParams {
    roleName?: string
  }
  //创建传参
  export interface CreateParams {
    roleName: string
    remark?: string
  }
  //返回值
  export interface RoleItem extends CreateParams {
    id: string
    permissionList: {
      checkedKeys: string[]
      halfCheckedKeys: string[]
    }
    updateTime: string
    createTime: string
  }
  //编辑传参
  export interface EditParams extends CreateParams {
    id: string
  }
  // 删除传参
  export interface DelParams {
    id: string
  }
  //权限接口参数
  export interface Permission {
    id: string
    permissionList: {
      checkedKeys: string[]
      halfCheckedKeys: string[]
    }
  }
}

export namespace Order {
  //搜索传参
  export interface Params extends PageParams {
    orderId?: string
    userName?: string
    state?: number
  }
  //订单状态
  export enum IState {
    doing = 1,
    done = 2,
    timeout = 3,
    cance = 4
  }
  //创建传参
  export interface CreateParams {
    cityName: string
    userName: string
    mobile: number
    startAddress: string //下单开始地址
    endAddress: string //下单结束地址
    orderAmount: number //订单金额
    userPayAmount: number //支付金额
    driverAmount: number //支付金额
    // 1: 微信 2：支付宝
    payType: number //支付方式
    driverName: string //司机名称
    vehicleName: string //订单车型
    // 1: 进行中 2：已完成 3：超时 4：取消
    state: IState // 订单状态
    // 用车时间
    useTime: string
    // 订单结束时间
    endTime: string
  }
  //返回值参数
  export interface OrderItem extends CreateParams {
    _id: string
    orderId: string //订单ID
    route: Array<{ lng: string; lat: string }> //行驶轨迹
    createTime: string //创建时间
    remark: string //备注
  }
  //城市列表返回值
  export interface DictItem {
    id: number
    name: string
  }
  //车型列表返回值
  export interface DictItem {
    id: number
    name: string
  }
  //导出文档
  export interface SearchParams {
    orderId?: string
    userName?: string
    state?: number
  }
  //修改订单轨迹
  export interface OrderRoute {
    orderId: string //订单ID
    route: Array<{ lng: string; lat: string }>
  }
  //删除
  export interface DelParams {
    _id: string
  }
}

export namespace Driver {
  export enum DriverStatus {
    auth = 0, // 待认证
    normal = 1, //正常
    temp = 2, // 暂时拉黑
    always = 3, // 永久拉黑
    stop = 4 //停止推送
  }
  export interface DriverItem {
    driverName: string // 司机名称
    driverId: number // 司机ID
    driverPhone: string // 司机手机号
    cityName: string // 城市名称
    grade: boolean // 会员等级
    driverLevel: number // 司机等级
    accountStatus: DriverStatus // 司机状态
    carNo: string // 车牌号
    vehicleBrand: string // 车辆品牌
    vehicleName: string // 车辆名称
    onlineTime: number // 昨日在线时长
    driverAmount: number // 昨日司机流水
    rating: number // 司机评分
    driverScore: number // 司机行为分
    pushOrderCount: number // 昨日推单数
    orderCompleteCount: number // 昨日完单数
    createTime: string // 创建时间
  }
  export interface SearchParams {
    driverName?: string
    accountStatus?: number
  }
}
