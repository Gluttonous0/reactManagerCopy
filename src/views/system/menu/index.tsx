import api from "@/api/menuApi"
import SearchButton from "@/components/SearchButton"
import { Menu } from "@/types/api"
import { Button, Form, Input, Select, Space, Table } from "antd"
import { useForm } from "antd/es/form/Form"
import { useEffect, useState } from "react"

export default function MenuList() {
  const [menuList, setMenuList] = useState<Menu.MenuItem[]>([])
  const [form] = useForm()

  useEffect(() => {
    getMenuList()
  }, [])

  //获取菜单列表
  const getMenuList = async () => {
    const data = await api.getMenuList(form.getFieldsValue())
    setMenuList(getTreeList(data))
    // console.log("data", data)
    // console.log("newData", getTreeList(data))
  }

  //Table表头
  const columns = [
    {
      title: "菜单ID",
      dataIndex: "id",
      key: "id",
      hidden: true
    },
    {
      title: "菜单名称",
      dataIndex: "menuName",
      key: "menuName"
    },
    {
      title: "菜单图标",
      dataIndex: "icon",
      key: "icon"
    },
    {
      title: "菜单类型",
      dataIndex: "menuType",
      key: "menuType",
      render: (menuType: number) => {
        return {
          1: "菜单",
          2: "按钮"
        }[menuType]
      }
    },

    {
      title: "权限标识",
      dataIndex: "menuCode",
      key: "menuCode"
    },
    {
      title: "路由地址",
      dataIndex: "path",
      key: "path"
    },
    {
      title: "组件名称",
      dataIndex: "component",
      key: "component"
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime"
    },
    {
      title: "操作",
      key: "action",
      render: (record: any) => {
        return (
          <Space>
            <Button type='text'>新增</Button>
            <Button type='text'>编辑</Button>
            <Button type='text' danger>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  //递归处理函数
  const getTreeList = (list: any) => {
    const newList = list.map((item: any) => {
      if (item.children && item.children.length == 0) {
        const items = { ...item, children: undefined }
        return items
      } else {
        const newitems = getTreeList(item.children)
        if (!newitems) return ""
        const items = { ...item, children: newitems }
        return items
      }
    })
    return newList
  }

  return (
    <div>
      <SearchButton form={form} initialValues={{ menuState: 1 }}>
        <Form.Item label='菜单名称' name='menuName'>
          <Input placeholder='请输入菜单名称' />
        </Form.Item>
        <Form.Item label='菜单状态' name='menuState'>
          <Select style={{ width: 75 }}>
            <Select.Option value={1}>正常</Select.Option>
            <Select.Option value={2}>停用</Select.Option>
          </Select>
        </Form.Item>
      </SearchButton>
      <div className='base_table'>
        <div className='header_wrapper'>
          <div>菜单管理</div>
          <div>
            <Space>
              <Button type='primary'>新增</Button>
            </Space>
          </div>
        </div>
      </div>
      <Table rowKey='id' columns={columns} dataSource={menuList} />
    </div>
  )
}
