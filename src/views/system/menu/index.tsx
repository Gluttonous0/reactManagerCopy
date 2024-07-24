import api from "@/api/menuApi"
import SearchButton from "@/components/SearchButton"
import { Menu } from "@/types/api"
import { IAction } from "@/types/modal"
import storage from "@/utils/storage"
import { Button, Form, Input, Select, Space, Table } from "antd"
import { useForm } from "antd/es/form/Form"
import { useEffect, useRef, useState } from "react"
import CraeteMenu from "./CreacteMenu"

export default function MenuList() {
  const [menuList, setMenuList] = useState<Menu.MenuItem[]>([])
  const [form] = useForm()
  const menuRef = useRef<{
    open: (type: IAction, data?: Menu.MenuItem) => void
  }>()

  useEffect(() => {
    getMenuList()
  }, [])

  //获取菜单列表
  const getMenuList = async () => {
    const data = await api.getMenuList(form.getFieldsValue())
    setMenuList(getTreeList(data))
    storage.set("menuLength", data.length)
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
    list.forEach((item: any) => {
      if (item.children) {
        if (item.children.length == 0) {
          item.children = undefined
        } else if (item.children.length > 0) {
          item.children = getTreeList(item.children)
        }
      }
      //   for (let i in item) {
      //     if (item[i] == "" || item[i] == "undefind") {
      //       delete item[i]
      //     }
      //     if (i === "children") {
      //       if (item[i] && item[i].length > 0) {
      //         return { ...item, children: getTreeList(item[i]) }
      //       }
      //     }
      //   }
    })
    return list
  }

  //搜索功能
  const handleSubmit = () => {
    getMenuList()
  }

  //重置功能
  const handleCancel = () => {
    form.resetFields()
    getMenuList()
  }

  //新增&&编辑窗口
  const handleModal = (num: number, data?: Menu.MenuItem) => {
    if (num === 1) {
      menuRef.current?.open("create")
    }
  }

  return (
    <div>
      <SearchButton form={form} initialValues={{ menuState: 1 }} submit={handleSubmit} reset={handleCancel}>
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
              <Button type='primary' onClick={() => handleModal(1)}>
                新增
              </Button>
            </Space>
          </div>
        </div>
      </div>
      <Table rowKey='id' columns={columns} dataSource={menuList} />
      <CraeteMenu mRef={menuRef} update={getMenuList} />
    </div>
  )
}
