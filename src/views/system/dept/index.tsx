import api from "@/api/deptApi"
import SearchButton from "@/components/SearchButton"
import { Dept } from "@/types/api"
import { IAction } from "@/types/modal"
import { Button, Form, Input, Space, Table } from "antd"
import { useForm } from "antd/es/form/Form"
import { useEffect, useRef, useState } from "react"
import CreateDept from "./CreateDept"
import { message, modal } from "@/utils/AntdGlobal"

export default function DeptList() {
  const [deptList, setDeptList] = useState<Dept.DeptItem[]>([]) //储存接口返回的部门列表
  const [form] = useForm()
  const deptRef = useRef<{
    open: (type: IAction, data?: Dept.EditParams | { parentId: string }) => void
  }>() //弹窗方法钩子useRef

  useEffect(() => {
    getDeptList()
  }, [])

  //获取部门列表
  const getDeptList = async () => {
    const data = await api.getDeptList(form.getFieldsValue())
    setDeptList(data)
  }

  //创建 && 修改部门
  const createDept = (num: number, data?: Dept.EditParams | { parentId: string }) => {
    if (num === 1) {
      deptRef.current?.open("create")
    }
    if (num === 2) {
      deptRef.current?.open("create", data)
    }
    if (num === 3) {
      deptRef.current?.open("edit", data)
    }
  }

  //删除功能
  const handleDel = (id: string) => {
    modal.confirm({
      title: "确认删除",
      content: <span>确认是否删除部门</span>,
      okText: "确认",
      cancelText: "取消",
      onOk: async () => {
        await api.delDeptById({ id })
        message.success("删除成功")
        getDeptList()
      }
    })
  }

  //搜索功能
  const handleSearch = () => {
    getDeptList()
  }

  //重置功能
  const handleReset = () => {
    form.resetFields()
    getDeptList()
  }

  //Table表头
  const columns = [
    {
      title: "部门ID",
      dataIndex: "id",
      key: "id",
      hidden: true
    },
    {
      title: "部门名称",
      dataIndex: "deptName",
      key: "deptName"
    },
    {
      title: "负责人",
      dataIndex: "userName",
      key: "userName"
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      key: "updateTime"
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
            <Button type='text' onClick={() => createDept(2, record.id)}>
              新增
            </Button>
            <Button type='text' onClick={() => createDept(3, record)}>
              编辑
            </Button>
            <Button type='text' danger onClick={() => handleDel(record.id)}>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  return (
    <div>
      <SearchButton form={form} submit={handleSearch} reset={handleReset}>
        <Form.Item name='deptName' label='部门名称'>
          <Input placeholder='请输入部门名称' />
        </Form.Item>
      </SearchButton>
      <div className='base_table'>
        <div className='header_wrapper'>
          <div>部门列表</div>
          <Button type='primary' onClick={() => createDept(1)}>
            新增
          </Button>
        </div>
        <Table rowKey='id' columns={columns} dataSource={deptList} />
      </div>
      <CreateDept mRef={deptRef} update={getDeptList} />
    </div>
  )
}
