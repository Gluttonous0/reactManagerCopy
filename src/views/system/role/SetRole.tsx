import api from "@/api/roleApi"
import menuApi from "@/api/menuApi"
import { Menu, Role } from "@/types/api"
import { ImodalRoleProp } from "@/types/modal"
import { message } from "@/utils/AntdGlobal"
import { Form, Input, Modal, Tree } from "antd"
import { useForm } from "antd/es/form/Form"
import { useEffect, useImperativeHandle, useState } from "react"

export default function SetRole(props: ImodalRoleProp<Role.RoleItem>) {
  const [visable, setVisable] = useState(false) //储存弹窗开关状态
  const [menuList, setMenuList] = useState<Menu.MenuItem[]>() //储存权限列表数据
  const [roleName, setRoleName] = useState<Role.RoleItem>() //储存权限名称
  const [checkedKeys, setCheckedKeys] = useState<string[]>([]) //储存选择数据
  const [permission, setPermission] = useState<Role.Permission>() //提交传参数据
  const [form] = useForm()

  useEffect(() => {
    getMenuList()
  }, [])

  const open = (data?: Role.RoleItem) => {
    setVisable(true)
    setRoleName(data)
    setCheckedKeys(data?.permissionList.checkedKeys.concat(data?.permissionList.halfCheckedKeys) || [])
  }

  //获取权限列表
  const getMenuList = async () => {
    const data = await menuApi.getMenuList()
    setMenuList(data)
  }

  //组件暴露钩子
  useImperativeHandle(props.mRef, () => {
    return { open }
  })

  //关闭弹窗
  const handleCancel = () => {
    setVisable(false)
    setPermission(undefined)
  }

  //提交按钮
  const handleOk = async () => {
    if (permission) {
      console.log(permission)
      console.log(checkedKeys)
      api.updatePermission(permission)
      message.success("操作成功")
      handleCancel()
      props.update()
    }
  }

  const onCheck: any = (checkedKeysValue: any, items: any) => {
    console.log("onCheck", checkedKeysValue)
    setCheckedKeys(checkedKeysValue)

    const childrenNode: string[] = []
    const parentNode: string[] = []
    items.checkedNodes.map((item: any) => {
      if (item.menuType === 2) {
        childrenNode.push(item.id)
      } else {
        parentNode.push(item.id)
      }
    })
    console.log("childrenNode", childrenNode)
    console.log("parentNode", parentNode)
    console.log("halfCheckedKeys", parentNode.concat(items.halfCheckedKeys))
    setPermission({
      id: roleName?.id || "",
      permissionList: {
        checkedKeys: childrenNode,
        halfCheckedKeys: parentNode.concat(items.halfCheckedKeys)
      }
    })
  }

  return (
    <Modal
      title='设置权限'
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
        <Form.Item label='角色名称'>{roleName?.roleName}</Form.Item>
        <Form.Item label='权限'>
          <Tree
            defaultExpandAll
            fieldNames={{
              title: "menuName",
              key: "id",
              children: "children"
            }}
            checkable
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            treeData={menuList}
          ></Tree>
        </Form.Item>
      </Form>
    </Modal>
  )
}
