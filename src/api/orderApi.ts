import { Order, ResultData, Driver } from "@/types/api"
import request from "@/utils/request"

const api = {
  //获取订单列表
  getOrderList(params: Order.Params) {
    return request.get<ResultData<Order.OrderItem>>("/order/list", params)
  },
  //获取城市列表
  getCityList() {
    return request.get<Order.DictItem[]>("/order/cityList")
  },
  //获取车型列表
  getVehicleList() {
    return request.get<Order.DictItem[]>("/order/vehicleList")
  },
  //创建订单
  createOrder(params: Order.CreateParams) {
    return request.post("/order/create", params)
  },
  //获取订单详情
  getOrderDetail(orderId: string) {
    return request.get<Order.OrderItem>(`/order/detail?orderId=${orderId}`)
  },
  //更新订单信息
  updateOrderInfo(params: Order.OrderRoute) {
    return request.post("/order/edit", params)
  },
  //删除订单
  delOrder(id: string) {
    return request.post("/order/del", { id: id })
  },
  //导出文档
  exportData(params: Order.SearchParams) {
    return request.downloadFile("/order/orderExport", params)
  },
  //获取城市聚合点数据
  getCityData(cityId: number) {
    return request.get<Array<{ lng: string; lat: string }>>(`/order/cluster`, { cityId: cityId })
  },
  //获取司机列表
  getDriverList(params: Driver.SearchParams) {
    return request.get<ResultData<Driver.DriverItem>>("/order/driver/list", params)
  }
}

export default api
