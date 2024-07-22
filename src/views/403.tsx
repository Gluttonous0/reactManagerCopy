import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"

export default function Erorr() {
  const navigate = useNavigate()

  const handleNacigate = () => {
    navigate("/")
  }

  return (
    <div className='error_page'>
      <Result
        status='403'
        title='403'
        subTitle='你没有权限访问此页面'
        extra={
          <Button type='primary' onClick={handleNacigate}>
            返回首页
          </Button>
        }
      />
    </div>
  )
}
