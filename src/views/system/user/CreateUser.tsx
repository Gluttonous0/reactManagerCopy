import { User } from "@/types/api"
import { IAction, ImodalProp } from "@/types/modal"
import { Modal } from "antd"
import { useImperativeHandle, useState } from "react"

export default function CreateUser(props: ImodalProp) {
  const [visible, setVisible] = useState(false)
  const [action, setAction] = useState<IAction>()

  useImperativeHandle(props.mRef, () => {
    return { open }
  })
  //打开弹窗
  const open = (type: IAction, data?: User.UserItem) => {
    setAction(type)
    setVisible(true)
  }

  const handleOk = () => {}
  const handleCancel = () => {
    setVisible(false)
  }
  return (
    <Modal
      title={action == "create" ? "创建用户" : "编辑用户"}
      open={visible}
      onCancel={handleCancel}
      okText='确定'
      cancelText='取消'
      onOk={handleOk}
      width={800}
    />
  )
}
