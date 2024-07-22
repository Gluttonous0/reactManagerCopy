import api from "@/api/deptApi"
import SearchButton from "@/components/SearchButton"
import { Dept } from "@/types/api"
import { IAction } from "@/types/modal"
import { Button, Form, Input, Space, Table } from "antd"
import { useForm } from "antd/es/form/Form"
import { useEffect, useRef, useState } from "react"
import CreateDept from "./CreateDept"

export default function DeptList() {
  const [deptList, setDeptList] = useState<Dept.DeptItem[]>([]) //储存接口返回的部门列表
  const [form] = useForm()
  const deptRef = useRef<{
    open: (type: IAction, data?: Dept.EditParams | { parentId: string }) => void
  }>() //弹窗方法钩子useRef

  useEffect(() => {
    getDeptList()
  }, [])

  //创建部门
  const createDept = (num: number, data?: Dept.EditParams | { parentId: string }) => {
    if (num === 1) {
      deptRef.current?.open("create")
    }
  }

  const getDeptList = async () => {
    const data = await api.getDeptList(form.getFieldsValue())
    setDeptList(data)
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
      render: () => {
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

  //搜索功能
  const handleSearch = () => {
    getDeptList()
  }

  //重置功能
  const handleReset = () => {
    form.resetFields()
    getDeptList()
  }

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
