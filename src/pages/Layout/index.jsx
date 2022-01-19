import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Layout, Menu, Popconfirm, Button } from 'antd'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { PieChartOutlined, SolutionOutlined, FileWordOutlined, LogoutOutlined } from '@ant-design/icons'
import { getUserInfo } from '@/store/actions'

import './index.scss'

const { Header, Sider, Content } = Layout

const GeekLayout = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  let defaultKey = location.pathname

  useEffect(() => {
    try {
      dispatch(getUserInfo())
    } catch (error) {}
  }, [dispatch])

  return (
    <Layout className="geek-layout">
      <Sider width={148}>
        <div className="logo">GEEK</div>
        <Menu selectedKeys={[defaultKey]} defaultSelectedKeys={['/']} mode="inline" theme="dark">
          <Menu.Item icon={<PieChartOutlined />} key="/">
            <Link to="/">数据面板</Link>
          </Menu.Item>
          <Menu.Item icon={<SolutionOutlined />} key="/article">
            <Link to="/article">内容管理</Link>
          </Menu.Item>
          <Menu.Item icon={<FileWordOutlined />} key="/publish">
            <Link to="/publish">发布文章</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header>
          <span style={{ fontSize: 16 }}>极客园自媒体端</span>
          <div>
            <span>{user.name}</span>
            <Popconfirm placement="bottomRight" title="您确认退出极客园自媒体端吗？" okText="确认" cancelText="取消">
              <Button type="link" icon={<LogoutOutlined />}>
                退出
              </Button>
            </Popconfirm>
          </div>
        </Header>
        <Content>
          {/* 使用Outlet来显示匹配到的子组件 */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default GeekLayout
