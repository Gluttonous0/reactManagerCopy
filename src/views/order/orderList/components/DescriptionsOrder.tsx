import api from "@/api/orderApi"
import { Order } from "@/types/api"
import { ImodalProp } from "@/types/modal"
import { Descriptions, Modal } from "antd"
import { useImperativeHandle, useState } from "react"

export default function DescriptionsOrder(props: ImodalProp<Order.OrderItem>) {
  const [visible, setVisible] = useState(false)

  //组件暴露
  useImperativeHandle(props.mRef, () => {
    return { open }
  })

  //打开窗口
  const open = () => {
    setVisible(true)
  }

  //提交订单
  const handleOk = async () => {}

  //取消窗口
  const handleCancel = () => {
    setVisible(false)
  }

  return (
    <Modal
      title='订单详情'
      open={true ? visible : false}
      width={800}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='确定'
      cancelText='取消'
    >
      <Descriptions></Descriptions>
    </Modal>
  )
}
