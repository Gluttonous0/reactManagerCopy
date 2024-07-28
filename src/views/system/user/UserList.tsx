import SearchButton from "@/components/SearchButton"
import { Button, Form, Input, Select, Space, Table } from "antd"
import { useForm } from "antd/es/form/Form"
import { useAntdTable } from "ahooks"
import api from "@/api/userApi"
import { User } from "@/types/api"
import { useRef, useState } from "react"
import { IAction } from "@/types/modal"
import CreateUser from "./CreateUser"
import { formatDate, stateItem } from "@/utils/index"
import { message, modal } from "@/utils/AntdGlobal"

export default function UserList() {
  const [form] = useForm()
  const [userIds, setUsersIds] = useState<number[]>([])
  const createRef = useRef<{
    open: (type: IAction, data?: User.UserItem) => void
  }>()

  //创建|编辑窗口暴露函数
  const handleCreate = (num: number, data?: User.UserItem) => {
    if (num === 1) {
      createRef.current?.open("create")
    } else {
      createRef.current?.open("edit", data)
    }
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

  //useAntdTable方法Form与Table关联
  const { search, tableProps } = useAntdTable(getTableData, { form, defaultPageSize: 10 })

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
      dataIndex: "role",
      key: "role",
      render: (record: number) => {
        if (record === 1) return "管理员"
        if (record === 2) return "体验管理员"
        if (record === 3) return "普通用户"
      }
    },
    {
      title: "用户状态",
      dataIndex: "state",
      key: "state",
      render: (record: number) => {
        return stateItem(record)
      }
    },
    {
      title: "注册时间",
      dataIndex: "createTime",
      key: "createTime",
      render: (createTime: string) => {
        return formatDate(createTime)
      }
    },
    {
      title: "操作",
      key: "action",
      render: (record: User.UserItem) => {
        return (
          <Space>
            <Button type='text' onClick={() => handleCreate(2, record)}>
              编辑
            </Button>
            <Button type='text' danger onClick={() => handleDel(record.userId)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  //单个删除接口
  const handleDel = (userId: number) => {
    modal.confirm({
      title: "删除",
      content: <span>确认删除该用户吗</span>,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        handleUserDelSubmit([userId])
      }
    })
  }

  //多选删除接口
  const handleMoreDel = (userId: number[]) => {
    if (userId.length == 0) return message.warning("请选择需要删除的数据")
    modal.confirm({
      title: "删除",
      content: <span>确认删除该用户吗</span>,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        handleUserDelSubmit(userIds)
      }
    })
  }
  //公共删除接口
  const handleUserDelSubmit = async (ids: number[]) => {
    console.log(ids)
    await api.delUser({ userIds: ids })
    message.success("删除成功")
    search.submit()
  }

  return (
    <div>
      <SearchButton form={form} submit={search.submit} reset={search.reset} initialValues={{ state: 0 }}>
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
              <Button type='primary' onClick={() => handleCreate(1)}>
                新增
              </Button>
              <Button type='default' danger onClick={() => handleMoreDel(userIds)}>
                批量删除
              </Button>
            </Space>
          </div>
        </div>
        <Table
          rowKey='userId'
          bordered
          dataSource={tableProps.dataSource}
          columns={columns}
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: userIds,
            onChange: (selectedRowKeys: React.Key[]) => {
              setUsersIds(selectedRowKeys as number[])
            }
          }}
        />
      </div>
      <CreateUser mRef={createRef} update={search.submit} />
    </div>
  )
}
