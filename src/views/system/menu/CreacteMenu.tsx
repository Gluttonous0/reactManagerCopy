import userApi from "@/api/userApi"
import { Menu } from "@/types/api"
import { IAction, ImodalProp } from "@/types/modal"
import { message } from "@/utils/AntdGlobal"
import storage from "@/utils/storage"
import { Form, Input, InputNumber, Modal, Radio, TreeSelect } from "antd"
import { useForm } from "antd/es/form/Form"
import { useEffect, useImperativeHandle, useState } from "react"

export default function CraeteMenu(props: ImodalProp<Menu.MenuItem>) {
  const [form] = useForm()
  const [visible, setVisible] = useState(false) //窗口开关
  const [action, setAction] = useState("")
  const [radioValue, setRadioValue] = useState(1) //控制菜单类型单选值
  const [stateValue, setStateValue] = useState(1) //控制菜单状态单选值
  const [permissionList, setPermissionList] = useState<Menu.MenuItem[]>([]) //控制菜单状态单选值

  useEffect(() => {
    getPermissionList()
  }, [])
  //获取权限列表
  const getPermissionList = async () => {
    const data = await userApi.getPermissionList()
    setPermissionList(data.menuList)
    console.log(data.menuList)
  }

  //组件暴露
  useImperativeHandle(props.mRef, () => {
    return { open }
  })

  //打开窗口
  const open = (type: IAction, data?: Menu.MenuItem) => {
    setVisible(true)
    setAction(type)
  }

  //关闭窗口
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }

  //提交功能
  const handleOk = () => {
    console.log(form.getFieldsValue())
  }

  //更改菜单类型
  const handleRadioChange = (e: any) => {
    setRadioValue(e.target.value)
  }

  //更改菜单状态
  const handleStateChange = (e: any) => {
    setStateValue(e.target.value)
  }

  return (
    <Modal
      title={action === "create" ? "创建菜单" : "编辑菜单"}
      open={visible}
      width={700}
      okText='确定'
      cancelText='取消'
      onCancel={handleCancel}
      onOk={handleOk}
    >
      <Form
        form={form}
        labelCol={{ span: 3 }}
        initialValues={{ menuType: 1, menuState: 1, sort: storage.get("menuLength") }}
      >
        <Form.Item hidden name='id' label='菜单ID'>
          <Input />
        </Form.Item>
        <Form.Item label='父级菜单'>
          <TreeSelect
            treeDefaultExpandAll
            treeData={permissionList}
            fieldNames={{ label: "menuName", value: "id", children: "children" }}
          />
        </Form.Item>
        <Form.Item label='菜单类型' name='menuType'>
          <Radio.Group value={radioValue} onChange={handleRadioChange}>
            <Radio value={1}>菜单</Radio>
            <Radio value={2}>按钮</Radio>
            <Radio value={3}>页面</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label='菜单名称' name='menuName' rules={[{ required: true, message: "请输入菜单名称" }]}>
          <Input placeholder='请输入菜单名称' />
        </Form.Item>
        {radioValue !== 2 ? (
          <>
            <Form.Item label='菜单图标' name='icon'>
              <Input placeholder='请输入菜单图标' />
            </Form.Item>
            <Form.Item label='路由地址' name='path'>
              <Input placeholder='请输入路由地址' />
            </Form.Item>
          </>
        ) : (
          <>
            <Form.Item label='权限标识' name='menuCode'>
              <Input placeholder='请输入权限标识' />
            </Form.Item>
          </>
        )}

        <Form.Item label='组件名称' name='component'>
          <Input placeholder='请输入组件名称' />
        </Form.Item>
        <Form.Item label='排序' name='sort'>
          <InputNumber placeholder='请输入排序值' style={{ width: 120 }} />
        </Form.Item>
        <Form.Item label='菜单状态' name='menuState'>
          <Radio.Group value={stateValue} onChange={handleStateChange}>
            <Radio value={1}>菜单</Radio>
            <Radio value={2}>按钮</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  )
}
