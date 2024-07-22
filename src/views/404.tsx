import { Button, Result } from "antd"
import { useNavigate } from "react-router-dom"

export default function NotFound() {
  const navigate = useNavigate()

  const handleNacigate = () => {
    navigate("/")
  }

  return (
    <div className='error_page'>
      <Result
        status='404'
        title='404'
        subTitle='未找到此页面。'
        extra={
          <Button type='primary' onClick={handleNacigate}>
            返回首页
          </Button>
        }
      />
    </div>
  )
}
