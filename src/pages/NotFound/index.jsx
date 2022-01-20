import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
const NotFound = () => {
  const navigate = useNavigate()
  return (
    <Result
      style={{ paddingTop: 100 }}
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button onClick={() => navigate('/')} type="primary">
          Back Home
        </Button>
      }
    />
  )
}

export default NotFound
