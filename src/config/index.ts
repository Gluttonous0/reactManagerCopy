/**
 *
 * 环境配置封装
 */

type ENV = "prd" | "stg" | "dev"
const env = (document.documentElement.dataset.env as ENV) || "stg"
const config = {
  dev: {
    baseApi: "/api",
    uploadApi: "http://api-driver-dev.marsview.cc",
    cdn: "http://xxx.aliyun.com",
    mock: true,
    mockApi: "https://mock.apifox.cn/m1/4361209-4005003-default/api"
  },
  stg: {
    baseApi: "/api",
    uploadApi: "http://api-driver-stg.marsview.cc",
    cdn: "http://xxx.aliyun.com",
    mock: false,
    mockApi: "https://mock.apifox.cn/m1/4361209-4005003-default/api"
  },
  prd: {
    baseApi: "/api",
    uploadApi: "http://api-driver.marsview.cc",
    cdn: "http://xxx.aliyun.com",
    mock: false,
    mockApi: "https://mock.apifox.cn/m1/4361209-4005003-default/api"
  }
}

export default {
  env,
  ...config[env]
}
