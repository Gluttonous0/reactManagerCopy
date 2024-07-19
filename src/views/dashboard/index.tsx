import useBearStore from "@/store"
import { Avatar, Card, Col, Descriptions, Row } from "antd"
import { UserOutlined } from "@ant-design/icons"
import type { DescriptionsProps } from "antd"
import styles from "./index.module.less"
import api from "@/api/userApi"
import { useEffect, useState } from "react"
import { OrderType } from "@/types/api"
import { formatMoney, formatNum } from "@/utils"
import * as echarts from "echarts"

export default function Dashboard() {
  const [order, setOrder] = useState<OrderType.ReportData>()
  const userInfo = useBearStore(state => state.userInfo)

  useEffect(() => {
    getReportData()
  }, [])

  // 获取统计数据
  const getReportData = async () => {
    const data = await api.getReportData()
    setOrder(data)
  }

  //状态转换列表
  const stateItem = (num?: number) => {
    if (!num) return "-"
    if (num === 1) return "在职"
    if (num === 2) return "离职"
    if (num === 3) return "试用期"
  }

  //描述列表
  const items: DescriptionsProps["items"] = [
    {
      key: "userName",
      label: "用户ID",
      children: userInfo.userName
    },
    {
      key: "userEmail",
      label: "邮箱",
      children: userInfo.userEmail
    },
    {
      key: "state",
      label: "状态",
      children: stateItem(userInfo.state)
    },
    {
      key: "mobile",
      label: "手机号",
      children: userInfo.mobile
    },
    {
      key: "job",
      label: "岗位",
      children: userInfo.job
    },
    {
      key: "deptName",
      label: "部门",
      children: userInfo.deptName
    }
  ]
  var chartDom = document.getElementById("chart")
  var myChart = echarts.init(chartDom)
  var option

  option = {
    title: {
      text: "Stacked Line"
    },
    tooltip: {
      trigger: "axis"
    },
    legend: {
      data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"]
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        name: "Email",
        type: "line",
        stack: "Total",
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: "Union Ads",
        type: "line",
        stack: "Total",
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: "Video Ads",
        type: "line",
        stack: "Total",
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: "Direct",
        type: "line",
        stack: "Total",
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: "Search Engine",
        type: "line",
        stack: "Total",
        data: [820, 932, 901, 934, 1290, 1330, 1320]
      }
    ]
  }

  option && myChart.setOption(option)
  return (
    <div className={styles.dashboard_content}>
      <div className={styles.userinfo_header}>
        <div className={styles.userinfo_img}>
          <Avatar size={80} icon={<UserOutlined />} src={userInfo.userImg} />
        </div>
        <div>
          <Descriptions title={`欢迎${userInfo.userName}同学,每日好心情`} items={items} />
        </div>
      </div>
      <div className={styles.userinfo_card}>
        <div className={styles.card}>
          <div className={styles.card_title}>司机数量</div>
          <div className={styles.card_context}>{formatNum(order?.driverCount)}个</div>
        </div>
        <div className={styles.card}>
          <div className={styles.card_title}>总流水</div>
          <div className={styles.card_context}>{formatMoney(order?.totalMoney)}元</div>
        </div>
        <div className={styles.card}>
          <div className={styles.card_title}>总订单</div>
          <div className={styles.card_context}>{formatNum(order?.orderCount)}单</div>
        </div>
        <div className={styles.card}>
          <div className={styles.card_title}>开通城市</div>
          <div className={styles.card_context}>{formatNum(order?.cityNum)}座</div>
        </div>
      </div>
      <div id='chart'></div>
    </div>
  )
}
