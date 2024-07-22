/**
 * 工具函数封装
 * @param
 * @returns
 */

//格式化金额
export const formatMoney = (num?: number | string) => {
  if (!num) return 0
  const a = parseFloat(num.toString())
  // console.log(a)
  // console.log(typeof num)
  return a.toLocaleString("zh-CN", { style: "currency", currency: "CNY" })
}
//格式化数字千分位
export const formatNum = (num?: Number | string) => {
  if (!num) {
    return 0
  }
  const a = num.toString()
  if (a.indexOf(".") > -1) {
    const exp = /(\d)(?=(\d{3})+\.)/g
    return a.replace(exp, "$1,")
  } else {
    const exp = /(\d)(?=(\d{3})+$)/g
    return a.replace(exp, "$1,")
  }
}

//状态转换列表
export const stateItem = (num?: number) => {
  if (!num) return "-"
  if (num === 1) return "在职"
  if (num === 2) return "离职"
  if (num === 3) return "试用期"
}

//格式化日期
export const toLocalDate = (date?: Date, rule?: string) => {
  let curDate = new Date()
  if (date) curDate = date
  if (rule === "yyyy-MM-dd") return curDate.toLocaleDateString()
  if (rule === "HH:mm:ss") return curDate.toLocaleTimeString()
  return curDate.toLocaleString()
}
//格式化日期，正则表达式
export const formatDate = (date?: Date | string, rule?: string) => {
  let curDate = new Date()
  if (date instanceof Date) {
    curDate = date
  } else if (date) {
    curDate = new Date(date)
  }

  let fmt = rule || "yyyy-MM-dd HH:mm:ss"
  fmt = fmt.replace(/(y+)/, curDate.getFullYear().toString())

  type OTyle = {
    [key: string]: number
  }
  const O: OTyle = {
    "M+": curDate.getMonth() + 1,
    "d+": curDate.getDate(),
    "H+": curDate.getHours(),
    "m+": curDate.getMinutes(),
    "s+": curDate.getSeconds()
  }
  for (const k in O) {
    const isLength = O[k].toString().length < 2
    fmt = fmt.replace(new RegExp(`${k}`), isLength ? `0${O[k].toString()}` : O[k].toString())
  }
  return fmt
}
