/**
 * 登录页面
 */
import api from "@/api/userApi";
import { Login as LoginFC } from "@/types/api";
import { Button, Form, Input } from "antd";
import styles from "./index.module.less";
import { message } from "@/utils/AntdGlobal";
import storage from "@/utils/storage";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const onFinish = async (values: LoginFC.Params) => {
    try {
      const base64 = btoa(values.userPwd);
      const data = await api.login({ ...values, userPwd: base64 });
      message.success("登录成功");
      storage.set("token", data);
      setTimeout(() => {
        navigate("/welcome");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

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
  );
}
