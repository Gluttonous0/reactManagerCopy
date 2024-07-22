import { User } from "@/types/api"
import { IAction, ImodalProp } from "@/types/modal"
import { message } from "@/utils/AntdGlobal"
import { Form, Input, InputNumber, Modal, Select, Upload } from "antd"
import { useForm } from "antd/es/form/Form"
import { useImperativeHandle, useState } from "react"
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import type { GetProp, UploadProps, UploadFile } from "antd"
import api from "@/api/userApi"

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0]

export default function CreateUser(props: ImodalProp) {
  const [visible, setVisible] = useState(false) //开关控制
  const [action, setAction] = useState<IAction>() //窗口新增 | 编辑
  const [loading, setLoading] = useState(false) //上传等待状态控制
  const [imageUrl, setImageUrl] = useState<string>() //临时储存上传base64图片
  const [form] = useForm()

  //组件暴露
  useImperativeHandle(props.mRef, () => {
    return { open }
  })

  //打开弹窗
  const open = (type: IAction, data?: User.UserItem) => {
    setAction(type)
    setVisible(true)
    if (type === "edit" && data) {
      form.setFieldsValue(data)
      setImageUrl(data.userImg)
    }
  }

  //-----------------------------------
  //上传图片方法
  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png"
    if (!isJpgOrPng) {
      message.error("只能上传JPG/PNG格式的图片")
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error("图片大小不能超过2MImage must smaller than 2MB!")
    }
    return isJpgOrPng && isLt2M
  }
  const handleChange: UploadProps["onChange"] = info => {
    console.log(info)
    if (info.file.status === "uploading") {
      setLoading(true)
      return
    }
    if (info.file.originFileObj) {
      const reader = new FileReader()
      reader.onload = e => {
        const base64 = e.target?.result as string
        if (base64) {
          setImageUrl(base64)
        }
      }
      reader.readAsDataURL(info.file.originFileObj)
      setLoading(false)
    }
  }
  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type='button'>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
    </button>
  )
  //--------------------------------------

  //提交表单
  const handleOk = async () => {
    const valid = await form.validateFields()
    if (valid) {
      const datas = form.getFieldsValue()
      console.log(datas)

      if (action === "create") {
        api.userCreate(datas)
        message.success("操作成功")
        handleCancel()
      } else {
        api.userEdit(datas)
        message.success("操作成功")
        handleCancel()
      }
    }
  }

  //取消表单
  const handleCancel = () => {
    setImageUrl("")
    setVisible(false)
    form.resetFields()
  }
  return (
    <Modal
      title={action == "create" ? "创建用户" : "编辑用户"}
      open={visible}
      onCancel={handleCancel}
      okText='确定'
      cancelText='取消'
      onOk={handleOk}
      width={700}
    >
      <Form form={form} labelCol={{ span: 4 }}>
        <Form.Item name='id' hidden>
          <Input />
        </Form.Item>
        <Form.Item label='用户名称' name='userName' rules={[{ required: true, message: "请输入用户名称" }]}>
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item label='用户邮箱' name='userEmail'>
          <Input placeholder='请输入用户邮箱' disabled={action === "edit"} />
        </Form.Item>
        <Form.Item label='手机号码'>
          <InputNumber placeholder='请输入手机号码' controls={false} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label='用户部门' name='deptName' rules={[{ required: true, message: "请输入用户部门" }]}>
          <Input placeholder='请输入用户部门' />
        </Form.Item>
        <Form.Item label='用户岗位' name='job'>
          <Input placeholder='请输入用户岗位' />
        </Form.Item>
        <Form.Item label='用户状态' name='state'>
          <Select placeholder='请选择呢用户状态'>
            <Select.Option value={1}>在职</Select.Option>
            <Select.Option value={2}>离职</Select.Option>
            <Select.Option value={3}>试用期</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label='角色职位' name='roleList'>
          <Input placeholder='请输入角色职位' />
        </Form.Item>
        <Form.Item label='用户头像' name='userImg' valuePropName=''>
          <Upload
            listType='picture-circle'
            className='avatar-uploader'
            action='https://apifoxmock.com/m1/4361209-0-default/api/users/upload'
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt='avatar' style={{ width: "100%", height: "100%", borderRadius: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  )
}
