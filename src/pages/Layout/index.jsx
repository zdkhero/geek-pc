import { Layout, Menu, Popconfirm, Button } from 'antd'
import './index.scss'

import {  Link, Outlet } from 'react-router-dom'

import { PieChartOutlined, SolutionOutlined, FileWordOutlined, LogoutOutlined } from '@ant-design/icons'

const { Header, Sider, Content } = Layout

const GeekLayout = () => {
  return (
    <Layout className="geek-layout">
      <Sider width={148}>
        <div className="logo">GEEK</div>
        <Menu defaultSelectedKeys={['1']} mode="inline" theme="dark">
          <Menu.Item icon={<PieChartOutlined />} key="1">
            <Link to="/">数据面板</Link>
          </Menu.Item>
          <Menu.Item icon={<SolutionOutlined />} key="2">
            <Link to="/article">内容管理</Link>
          </Menu.Item>
          <Menu.Item icon={<FileWordOutlined />} key="3">
            <Link to="/publish">发布文章</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header>
          <span style={{ fontSize: 16 }}>极客园自媒体端</span>
          <div>
            <span>{'亚瑟'}</span>
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
