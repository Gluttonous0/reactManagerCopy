import api from "@/api/deptApi"
import { Dept, User } from "@/types/api"
import { IAction, ImodalProp } from "@/types/modal"
import { Form, Input, message, Modal, TreeSelect } from "antd"
import { useForm } from "antd/es/form/Form"
import { useEffect, useImperativeHandle, useState } from "react"

export default function CreateDept(props: ImodalProp<Dept.EditParams>) {
  const [form] = useForm()
  const [visible, setVisible] = useState(false) //开关控制
  const [action, setAction] = useState<IAction>() //窗口新增 | 编辑
  const [deptList, setdeptList] = useState<Dept.DeptItem[]>([]) //部门下拉框选择树
  const [userList, setUserList] = useState<User.UserItem[]>([]) //部门下拉框选择树

  useEffect(() => {
    getDeptList()
    getAllUserList()
  }, [])
  // 获取部门列表
  const getDeptList = async () => {
    const data = await api.getDeptList()
    setdeptList(data)
  }

  //获取所有用户列表
  const getAllUserList = async () => {
    const data = await api.getAllUserList()
    setUserList(data)
  }

  //方法暴露
  useImperativeHandle(props.mRef, () => ({
    open
  }))

  const open = (type: IAction, data?: Dept.EditParams | { prentId: string }) => {
    setAction(type)
    setVisible(true)
    if (type === "create" && data) {
      form.setFieldsValue({ parentId: data })
    }
    if (type === "edit" && data) {
      form.setFieldsValue(data)
    }
  }

  //确认提交
  const handleOk = async () => {
    const valid = await form.validateFields()
    if (valid) {
      if (action === "create") {
        const newDept = form.getFieldsValue()
        api.createDept(newDept)
        message.success("创建成功")
        console.log(newDept)
      }
      if (action === "edit") {
        const newDept = form.getFieldsValue()
        api.editDept(newDept)
        message.success("修改成功")
      }
      handleCancel()
      props.update()
    }
  }

  //关闭弹窗
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }

  return (
    <Modal
      title={action === "create" ? "创建部门" : "编辑部门"}
      open={visible}
      width={700}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='确定'
      cancelText='取消'
    >
      <Form form={form} labelCol={{ span: 4 }}>
        <Form.Item label='部门ID' name='id' hidden={true}>
          <Input />
        </Form.Item>
        <Form.Item label='上级部门' name='parentId'>
          <TreeSelect
            treeDefaultExpandAll
            style={{ width: "100%" }}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            treeData={deptList}
            placeholder='请选择上级部门'
            fieldNames={{ label: "deptName", value: "id", children: "children" }}
          />
        </Form.Item>
        <Form.Item label='部门名称' name='deptName' rules={[{ required: true, message: "请输入部门名称" }]}>
          <Input placeholder='请输入部门名称' />
        </Form.Item>
        <Form.Item label='负责人' name='userName' rules={[{ required: true, message: "请选择负责人" }]}>
          <TreeSelect
            style={{ width: "100%" }}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            treeData={userList}
            placeholder='请选择负责人'
            fieldNames={{ label: "userName", value: "userName" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
