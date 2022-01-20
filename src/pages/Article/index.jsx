import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChannels } from '@/store/actions'

import { Form, Button, Card, Breadcrumb, Radio, Select, DatePicker, Table, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import styles from './index.module.scss'

const Article = () => {
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      key: 'cover',
      render: () => '自定义封面'
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: () => '自定义状态'
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
      key: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
      key: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
      key: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
      key: 'like_count'
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} />
          <Button type="link" icon={<DeleteOutlined />} />
        </Space>
      )
    }
  ]

  const dispatch = useDispatch()
  const { channels } = useSelector((state) => state.article)

  useEffect(() => {
    dispatch(getChannels())
  }, [dispatch])

  return (
    <div className={styles.root}>
      <Card
        title={
          // 面包屑
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>内容管理</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        {/* 表单 */}
        <Form>
          <Form.Item label="状态：" name="status">
            <Radio.Group>
              <Radio value={undefined}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={1}>待审核</Radio>
              <Radio value={2}>已通过</Radio>
              <Radio value={3}>已拒绝</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道：" name="channel_id">
            <Select style={{ width: 288 }} placeholder="请选择所属频道">
              {channels.map((item) => (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="日期：" name="dateArr">
            <DatePicker.RangePicker />
          </Form.Item>
          <Form.Item>
            <Button type="primary">筛选</Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title={`根据筛选条件共查询到 100 条结果：`} style={{ marginTop: 24 }}>
        <Table columns={columns} dataSource={[]}></Table>
      </Card>
    </div>
  )
}

export default Article
