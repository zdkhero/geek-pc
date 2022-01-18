import { Form, Input, Button, Checkbox, Card } from 'antd'
import './index.scss'
import logo from '@/assets/logo.png'

const Login = () => {
  // 提交表单
  const onFinish = (values) => {
    console.log(values)
  }

  return (
    <div className="login">
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="" />
        {/* 登录表单 */}
        <Form
          onFinish={onFinish}
          validateTrigger={['onChange', 'onBlur']}
          initialValues={{
            mobile: '13911111111',
            code: '246810',
            isAgree: true
          }}
        >
          <Form.Item
            name="mobile"
            rules={[
              { required: true, message: '请输入手机号' },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机格式不正确'
              }
            ]}
          >
            <Input value="13911111111" size="large" placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item
            name="code"
            rules={[
              { required: true, message: '请输入验证码' },
              { len: 6, message: '验证码6个字符串' }
            ]}
          >
            <Input value="246810" size="large" placeholder="请输入验证码" />
          </Form.Item>
          {/* 
            此处需要将 valuePropName 属性值设置为 checked，也就是下面设置的内容
      	    原因：Form.Item 默认操作的是 value 属性，所以，如果 Form.Item 的子节点的值不是 value ，就需要设置为它自己的值
      			比如，Checkbox 组件操作的是 checked，因此，需要将 valuePropName 设置为 "checked"
          */}
          <Form.Item
            name="isAgree"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) => {
                  if (value === true) return Promise.resolve()
                  else return Promise.reject(new Error('请勾选我已阅读并同意'))
                }
              }
            ]}
          >
            <Checkbox className="login-checkbox-label">
              我已阅读并同意「用户协议」和「隐私条款」
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
