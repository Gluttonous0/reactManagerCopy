import api from "@/api/orderApi"
import SearchButton from "@/components/SearchButton"
import { Order } from "@/types/api"
import { formatMoney } from "@/utils"
import { useAntdTable } from "ahooks"
import { Button, Form, Input, Select, Space, Table } from "antd"
import { useForm } from "antd/es/form/Form"
import { useRef } from "react"
import CreateOrder from "./components/CreateOrder"
import DescriptionsOrder from "./components/DescriptionsOrder"

export default function OrderList() {
  const [form] = useForm()
  const createRef = useRef<{
    open: () => void
  }>()
  const descriptionsRef = useRef<{
    open: () => void
  }>()

  const getTableList = ({ current, pageSize }: { current: number; pageSize: number }, formatData: any) => {
    return api
      .getOrderList({
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
  const { search, tableProps } = useAntdTable(getTableList, {
    form,
    defaultPageSize: 10
  })

  //Table表头
  const columns = [
    {
      title: "订单编号",
      dataIndex: "orderId",
      key: "orderId"
    },
    {
      title: "下单地址",
      dataIndex: "startAddress",
      key: "startAddress",
      render: (_: any, record: any) => {
        return (
          <div>
            <p>开始地址：{record.startAddress}</p>
            <p>结束地址：{record.endAddress}</p>
          </div>
        )
      }
    },
    {
      title: "订单金额",
      dataIndex: "orderAmount",
      key: "orderAmount",
      render: (orderAmount: number) => {
        return formatMoney(orderAmount)
      }
    },
    {
      title: "订单状态",
      dataIndex: "state",
      key: "state",
      render: (state: Order.IState) => {
        return {
          1: "进行中",
          2: "已完成",
          3: "超时",
          4: "取消"
        }[state]
      }
    },
    {
      title: "用户名称",
      dataIndex: "userName",
      key: "userName"
    },
    {
      title: "司机名称",
      dataIndex: "driverName",
      key: "driverName"
    },
    {
      title: "操作",
      key: "action",
      render: () => {
        return (
          <Space>
            <Button type='text' onClick={() => handleModal(2)}>
              详情
            </Button>
            <Button type='text'>打点</Button>
            <Button type='text'>轨迹</Button>
            <Button type='text' danger>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  //打开窗口
  const handleModal = (num: number) => {
    if (num === 1) {
      createRef.current?.open()
    }
    if (num === 2) {
      descriptionsRef.current?.open()
    }
  }

  return (
    <div>
      <SearchButton form={form} submit={search.submit} reset={search.reset} initialValues={{ state: 1 }}>
        <Form.Item name='id' label='订单ID'>
          <Input placeholder='请输入订单ID' />
        </Form.Item>
        <Form.Item name='userName' label='用户名称'>
          <Input placeholder='请输入订单ID' />
        </Form.Item>
        <Form.Item name='state' label='状态'>
          <Select style={{ width: 90 }}>
            <Select.Option value={1}>进行中</Select.Option>
            <Select.Option value={2}>已完成</Select.Option>
            <Select.Option value={3}>超时</Select.Option>
            <Select.Option value={4}>取消</Select.Option>
          </Select>
        </Form.Item>
      </SearchButton>
      <div className='base_table'>
        <div className='header_wrapper'>
          <div>订单列表</div>
          <div>
            <Space>
              <Button type='primary' onClick={() => handleModal(1)}>
                新增
              </Button>
              <Button type='default'>导出</Button>
            </Space>
          </div>
        </div>
      </div>
      <Table rowKey='orderId' columns={columns} {...tableProps} />
      <CreateOrder mRef={createRef} update={search.submit} />
      <DescriptionsOrder mRef={descriptionsRef} update={search.submit} />
    </div>
  )
}
