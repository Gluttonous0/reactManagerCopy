import api from "@/api/api"
import { Login as LoginFC } from "@/types/api"
import { Button, Form, Input } from "antd"
import styles from "./index.module.less"

export default function Login() {
  const onFinish = async (values: LoginFC.Params) => {
    const data = await api.login(values)
  }

  return (
    <div className={styles.login}>
      <div className={styles.warpper}>
        <div className={styles.title}>系统登录</div>
        <Form name='basic' initialValues={{ remember: true }} onFinish={onFinish} autoComplete='off'>
          <Form.Item name='userName' label='账号' rules={[{ required: true, message: "账号不能为空" }]}>
            <Input placeholder='请输入账号' />
          </Form.Item>
          <Form.Item name='userPwd' label='密码' rules={[{ required: true, message: "密码不能为空" }]}>
            <Input.Password placeholder='请输入密码' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
