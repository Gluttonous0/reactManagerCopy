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
