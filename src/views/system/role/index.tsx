import api from "@/api/roleApi"
import SearchButton from "@/components/SearchButton"
import { Role } from "@/types/api"
import { IAction } from "@/types/modal"
import { message, modal } from "@/utils/AntdGlobal"
import { useAntdTable } from "ahooks"
import { Input, Form, Table, Space, Button } from "antd"
import { useForm } from "antd/es/form/Form"
import { useRef } from "react"
import CraeteRole from "./CreateRole"
import SetRole from "./SetRole"

export default function RoleList() {
  const [form] = useForm()
  const roleRef = useRef<{
    open: (type: IAction, data?: Role.RoleItem) => void
  }>() //创建和编辑弹窗关联
  const setRoleRef = useRef<{
    open: (data?: Role.RoleItem) => void
  }>() //创建和编辑弹窗关联

  //getTableData方法与useAntdTable方法关联------------------------------------------------
  const getTableData = ({ pageSize, current }: { pageSize: number; current: number }, formatData: any) => {
    return api
      .getRoleList({
        ...formatData,
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
  const { search, tableProps } = useAntdTable(getTableData, {
    form,
    defaultPageSize: 10
  })
  //getTableData方法与useAntdTable方法关联------------------------------------------------

  //Table表头
  const columns = [
    {
      title: "角色id",
      dataIndex: "id",
      key: "id",
      hidden: true
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
      key: "roleName"
    },
    {
      title: "备注",
      dataIndex: "remark",
      key: "remark"
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      key: "createTime"
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime"
    },
    {
      title: "操作",
      key: "action",
      render: (record: Role.RoleItem) => {
        return (
          <Space>
            <Button type='text' onClick={() => roleModalOpen(2, record)}>
              编辑
            </Button>
            <Button type='text' onClick={() => roleModalOpen(3, record)}>
              设置权限
            </Button>
            <Button type='text' danger onClick={() => handleDel(record.id)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  //打开弹窗
  const roleModalOpen = (num: number, data?: Role.RoleItem) => {
    //
    if (num === 1) {
      roleRef.current?.open("create")
    }
    if (num === 2) {
      roleRef.current?.open("edit", data)
    }

    //设置权限
    if (num === 3) {
      setRoleRef.current?.open(data)
    }
  }

  //删除弹窗
  const handleDel = (id: string) => {
    modal.confirm({
      title: "确认删除",
      content: <span>请确认是否删除该角色</span>,
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        DelRole(id)
      }
    })
  }

  //删除角色
  const DelRole = async (id: string) => {
    await api.getDelRole({ id })
    message.success("删除成功")
    search.submit()
  }

  return (
    <div>
      <SearchButton form={form} submit={search.submit} reset={search.reset}>
        <Form.Item label='角色名称' name='roleName'>
          <Input placeholder='请输入角色名称' />
        </Form.Item>
      </SearchButton>
      <div className='base_table'>
        <div className='header_wrapper'>
          <div>角色权限</div>
          <div>
            <Space>
              <Button type='primary' onClick={() => roleModalOpen(1)}>
                新增
              </Button>
            </Space>
          </div>
        </div>
      </div>
      <Table rowKey='id' {...tableProps} columns={columns} />
      <CraeteRole mRef={roleRef} update={search.submit} />
      <SetRole mRef={setRoleRef} update={search.submit} />
    </div>
  )
}
