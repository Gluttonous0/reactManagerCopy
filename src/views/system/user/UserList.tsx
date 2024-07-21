import SearchButton from "@/components/SearchButton"
import { Button, Form, Input, Select, Space, Table } from "antd"
import { useForm } from "antd/es/form/Form"
import { useAntdTable } from "ahooks"
import api from "@/api/userApi"
import { User } from "@/types/api"
import { useRef } from "react"
import { IAction } from "@/types/modal"
import CreateUser from "./CreateUser"

export default function UserList() {
  const [form] = useForm()
  const createRef = useRef<{
    open: (type: IAction, data?: User.UserItem) => void
  }>()

  //创建窗口暴露函数
  const handleCreate = () => {
    createRef.current?.open("create")
  }

  const getTableData = ({ current, pageSize }: { current: number; pageSize: number }, formData: User.Params) => {
    return api
      .getUserList({
        ...formData,
        pageSize,
        pageNum: current
      })
      .then(data => {
        return {
          total: data.page.total,
          list: data.list
        }
      })
  }

  const { search, tableProps } = useAntdTable(getTableData, { form, defaultPageSize: 10 })
  console.log(tableProps)
  //Table表头
  const columns = [
    {
      title: "用户ID",
      dataIndex: "userId",
      key: "userId"
    },
    {
      title: "用户名称",
      dataIndex: "userName",
      key: "userName"
    },
    {
      title: "用户邮箱",
      dataIndex: "userEmail",
      key: "userEmail"
    },
    {
      title: "用户角色",
      dataIndex: "userEmail",
      key: "userEmail"
    },
    {
      title: "用户状态",
      dataIndex: "userEmail",
      key: "userEmail"
    },
    {
      title: "注册时间",
      dataIndex: "userEmail",
      key: "userEmail"
    },
    {
      title: "操作",
      key: "action",
      render: () => {
        return (
          <Space>
            <Button type='text'>编辑</Button>
            <Button type='text' danger>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]
  return (
    <div>
      <SearchButton form={form} submit={search.submit} initialValues={{ state: 0 }}>
        <Form.Item label='用户ID' name='Id'>
          <Input placeholder='请输入用户ID' />
        </Form.Item>
        <Form.Item label='用户名称' name='userName'>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item name='state'>
          <Select>
            <Select.Option value={0}>所有</Select.Option>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>
      </SearchButton>
      <div className='base_table'>
        <div className='header_wrapper'>
          <div>用户名称</div>
          <div>
            <Space>
              <Button type='primary' onClick={handleCreate}>
                新增
              </Button>
              <Button type='default' danger>
                批量删除
              </Button>
            </Space>
          </div>
        </div>
        <Table rowKey='userName' bordered dataSource={tableProps.dataSource} columns={columns} />
      </div>
      <CreateUser mRef={createRef} update={search.submit} />
    </div>
  )
}
