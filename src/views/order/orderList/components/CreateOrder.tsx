import api from "@/api/orderApi"
import { Order } from "@/types/api"
import { ImodalProp } from "@/types/modal"
import { message } from "@/utils/AntdGlobal"
import { InputNumber, Modal } from "antd"
import FormRender, { useForm } from "form-render"
import { useImperativeHandle, useState } from "react"

export default function CreateOrder(props: ImodalProp<Order.OrderItem>) {
  const [visible, setVisible] = useState(false)
  const form = useForm()
  const schema = {
    type: "object",
    displayType: "row",
    labelWidth: 120,
    column: 2,
    properties: {
      cityName: {
        title: "城市名称",
        type: "string",
        widget: "select",
        required: true,
        placeholder: "请输入城市名称"
      },
      vehicleName: {
        title: "司机名称",
        type: "string",
        widget: "select",
        required: true,
        placeholder: "请输入司机名称"
      },
      userName: {
        title: "用户名称",
        type: "string",
        widget: "input",
        required: true,
        placeholder: "请输入用户名称"
      },
      mobile: {
        title: "手机号码",
        type: "string",
        widget: "input",
        placeholder: "请输入手机号码"
      },
      startAddress: {
        title: "起始地址",
        type: "string",
        widget: "input",
        placeholder: "请输入起始地址"
      },
      endAddress: {
        title: "结束地址",
        type: "string",
        widget: "input",
        placeholder: "请输入结束地址"
      },
      orderAmount: {
        title: "下单金额",
        type: "number",
        widget: "NewInputNumber",
        placeholder: "请输入下单金额"
      },
      userPayAmount: {
        title: "支付金额",
        type: "string",
        widget: "NewInputNumber",
        placeholder: "请输入支付金额"
      },
      driverName: {
        title: "司机名称",
        type: "string",
        widget: "input",
        placeholder: "请输入司机名称"
      },
      driverAmount: {
        title: "司机金额",
        type: "number",
        widget: "NewInputNumber",
        placeholder: "请输入司机金额"
      },
      payType: {
        title: "支付方式",
        type: "number",
        widget: "select",
        placeholder: "请输入支付方式"
      },
      state: {
        title: "订单状态",
        type: "number",
        widget: "select",
        placeholder: "请输入订单状态"
      },
      useTime: {
        title: "用车时间",
        type: "string",
        widget: "datePicker",
        placeholder: "请输入用车时间"
      },
      endTime: {
        title: "结束时间",
        type: "string",
        widget: "datePicker",
        placeholder: "请输入结束时间"
      }
    }
  }

  //组件暴露
  useImperativeHandle(props.mRef, () => {
    return { open }
  })

  //打开窗口
  const open = () => {
    setVisible(true)
  }

  //获取列表参数
  const getInitList = async () => {
    const cityData = await api.getCityList()
    const vehicleData = await api.getVehicleList()
    form.setSchema({
      cityName: {
        props: {
          options: cityData.map(item => {
            return { label: item.name, value: item.id }
          })
        }
      },
      vehicleName: {
        props: {
          options: vehicleData.map(item => {
            return { label: item.name, value: item.id }
          })
        }
      },
      payType: {
        props: {
          options: [
            { label: "微信", value: 1 },
            { label: "支付宝", value: 2 }
          ]
        }
      },
      state: {
        props: {
          options: [
            { label: "进行中", value: 1 },
            { label: "已完成", value: 2 },
            { label: "超时", value: 3 },
            { label: "取消", value: 4 }
          ]
        }
      }
    })
  }

  //提交订单
  const handleOk = async () => {
    const valid = await form.validateFields()
    if (valid) {
      api.createOrder(form.getValues())
      message.success("操作成功")
      props.update()
      handleCancel()
    }
  }

  //取消窗口
  const handleCancel = () => {
    setVisible(false)
    form.resetFields()
  }

  return (
    <Modal
      title='创建订单'
      open={visible}
      width={800}
      onOk={handleOk}
      onCancel={handleCancel}
      okText='确定'
      cancelText='取消'
    >
      <FormRender
        form={form}
        schema={schema}
        column={2}
        labelAlign='right'
        fieldCol={15}
        widgets={{ NewInputNumber }}
        onMount={getInitList}
      ></FormRender>
    </Modal>
  )
}

function NewInputNumber() {
  return <InputNumber controls={false} style={{ width: "100%" }} placeholder='请输入金额' />
}
