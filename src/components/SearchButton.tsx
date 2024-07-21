import { Button, Form, Space } from "antd"

export default function SearchButton(props: any) {
  return (
    <Form form={props.form} className='class_form' layout='inline' initialValues={props.initialValues}>
      {props.children}
      <Space>
        <Button type='primary' onClick={props.submit}>
          搜索
        </Button>
        <Button type='default' onClick={props.reset}>
          重置
        </Button>
      </Space>
    </Form>
  )
}
