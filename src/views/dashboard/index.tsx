import useBearStore from "@/store"
import { Avatar, Button, Card, Descriptions } from "antd"
import { UserOutlined } from "@ant-design/icons"
import type { DescriptionsProps } from "antd"
import styles from "./index.module.less"
import api from "@/api/userApi"
import { useEffect, useState } from "react"
import { OrderType } from "@/types/api"
import { formatMoney, formatNum } from "@/utils"
import { useCharts } from "@/hook/useCharts"

export default function Dashboard() {
  const [order, setOrder] = useState<OrderType.ReportData>()
  const userInfo = useBearStore(state => state.userInfo)

  //初始化折线图PieCity
  const [lineRef, lineInstance] = useCharts()
  const [pieCityRef, pieCityInstance] = useCharts()
  const [pieAgeRef, pieAgeInstance] = useCharts()
  const [radarRef, radarInstance] = useCharts()

  useEffect(() => {
    getReportData()
  }, [])
  useEffect(() => {
    getLineData()
    getPieCountData()
    getRadarChart()
  }, [lineInstance, pieCityInstance, pieAgeInstance, radarInstance])

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

  //获取折线图数据
  const getLineData = async () => {
    if (!lineRef) {
      return
    }
    const data = await api.getLineData()
    console.log(data)
    lineInstance?.setOption({
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["订单", "流水"]
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: data.label
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          name: "订单",
          type: "line",
          stack: "Total",
          data: data.order
        },
        {
          name: "流水",
          type: "line",
          stack: "Total",
          data: data.money
        }
      ]
    })
  }

  //获取饼图数据
  const getPieCountData = async () => {
    if (!pieAgeRef) {
      return
    }
    if (!pieCityRef) {
      return
    }
    const cityData = await api.getPieCityData()
    const ageData = await api.getPieAgeData()
    pieCityInstance?.setOption({
      title: {
        text: "司机城市分布",
        left: "center"
      },
      tooltip: {
        trigger: "item"
      },
      legend: {
        orient: "vertical",
        left: "left"
      },
      series: [
        {
          type: "pie",
          radius: "50%",
          data: cityData
        }
      ]
    })
    pieAgeInstance?.setOption({
      title: {
        text: "司机年龄分布",
        left: "center"
      },
      legend: {
        orient: "vertical",
        left: "left"
      },
      tooltip: {
        trigger: "item"
      },
      series: [
        {
          name: "城市分布",
          type: "pie",
          radius: [50, 180],
          roseType: "area",
          data: ageData
        }
      ]
    })
  }

  //获取雷达图数据
  const getRadarChart = async () => {
    const data = await api.getRadarData()
    radarInstance?.setOption({
      legend: {
        data: data.data.name
      },
      radar: {
        indicator: data.indicator
      },
      series: [
        {
          name: "Beijing",
          type: "radar",
          data: data.data
        }
      ]
    })
  }

  //更新数据按钮
  const handleUpdate = (num: number) => {
    if (num === 1) {
      getLineData()
    }
    if (num === 2) {
      getPieCountData()
    }
    if (num === 3) {
      getRadarChart()
    }
  }
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
      <div className={styles.chart}>
        <Card
          title='订单和流水走势图'
          extra={
            <Button type='primary' onClick={() => handleUpdate(1)}>
              刷新
            </Button>
          }
        >
          <div ref={lineRef} className={styles.chart_item}></div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card
          title='司机分布'
          extra={
            <Button type='primary' onClick={() => handleUpdate(2)}>
              刷新
            </Button>
          }
        >
          <div className={styles.pieCharts}>
            <div ref={pieCityRef} className={styles.chart_item}></div>
            <div ref={pieAgeRef} className={styles.chart_item}></div>
          </div>
        </Card>
      </div>
      <div className={styles.chart}>
        <Card
          title='模型判断'
          extra={
            <Button type='primary' onClick={() => handleUpdate(3)}>
              刷新
            </Button>
          }
        >
          <div ref={radarRef} className={styles.chart_item}></div>
        </Card>
      </div>
    </div>
  )
}
