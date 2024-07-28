import api from "@/api/roleApi"
import { Role } from "@/types/api"
import { IAction, ImodalProp } from "@/types/modal"
import { message } from "@/utils/AntdGlobal"
import { Form, Input, Modal } from "antd"
import { useForm } from "antd/es/form/Form"
import TextArea from "antd/es/input/TextArea"
import { useImperativeHandle, useState } from "react"

export default function CraeteRole(props: ImodalProp<Role.RoleItem>) {
  const [visable, setVisable] = useState(false) //储存弹窗开关状态
  const [action, setAction] = useState("create") //储存(创建||编辑)字段
  const [form] = useForm()

  const open = (type: IAction, data?: Role.RoleItem) => {
    setVisable(true)
    setAction(type)
    if (type === "edit") {
      form.setFieldsValue(data)
    }
  }

  //组件暴露钩子
  useImperativeHandle(props.mRef, () => {
    return { open }
  })

  //关闭弹窗
  const handleCancel = () => {
    setVisable(false)
    form.resetFields()
  }

  //提交按钮
  const handleOk = async () => {
    const valid = await form.validateFields()
    if (valid) {
      const newForm = form.getFieldsValue()
      console.log(newForm)
      if (action === "create") {
        api.getCreateRole(newForm)
      }
      if (action === "edit") {
        api.getEditRole(newForm)
      }
      message.success("操作成功")
      handleCancel()
      props.update()
    }
  }

  return (
    <Modal
      title={action === "create" ? "创建角色" : "编辑角色"}
      open={visable}
      width={700}
      okText='确定'
      cancelText='取消'
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <Form labelCol={{ span: 4 }} form={form}>
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>
        <Form.Item name='roleName' label='角色名称' rules={[{ required: true, message: "请输入角色名称" }]}>
          <Input placeholder='请输入角色名称' />
        </Form.Item>
        <Form.Item name='remark' label='备注'>
          <TextArea placeholder='请输入备注' style={{ minHeight: "32px", height: "auto" }} />
        </Form.Item>
      </Form>
    </Modal>
  )
}
