import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChannels, getArticles, deleteArticle } from '@/store/actions'

import {
  Form,
  Button,
  Card,
  Breadcrumb,
  Radio,
  Select,
  DatePicker,
  Table,
  Space,
  Image,
  Tag,
  Modal,
  message
} from 'antd'
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Link, useNavigate } from 'react-router-dom'

import styles from './index.module.scss'

// 默认展示的图片
import defaultImg from '@/assets/error.png'

const { confirm } = Modal

const Article = () => {
  // 请求参数
  const params = useRef({
    page: 1,
    per_page: 20,
    channel_id: undefined,
    status: undefined,
    begin_pubdate: undefined,
    end_pubdate: undefined
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { channels, results, page, per_page, total_count } = useSelector((state) => state.article)

  // 阅读状态数据（不同状态文字和颜色不一样）
  const statusLabel = [
    { text: '草稿', color: 'default' },
    { text: '待审核', color: 'blue' },
    { text: '审核通过', color: 'green' },
    { text: '审核拒绝', color: 'red' }
  ]

  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      key: 'cover',
      render: (cover) => (
        <Image src={cover?.images?.[0] || defaultImg} style={{ objectFit: 'cover' }} width={200} height={120} />
      )
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
      render: (status) => {
        const info = statusLabel[status]
        return <Tag color={info.color}>{info.text}</Tag>
      }
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
      render: (text, record) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => editArticleFn(record.id)} />
          <Button type="link" icon={<DeleteOutlined />} onClick={() => delArticle(record.id)} />
        </Space>
      )
    }
  ]

  // 跳转到编辑页面
  const editArticleFn = (id) => {
    navigate(`/publish/${id}`)
  }

  // 实现删除功能
  const delArticle = (id) => {
    confirm({
      title: '温馨提示',
      icon: <ExclamationCircleOutlined />,
      content: '此操作将永久删除该文章, 是否继续?',
      onOk: async () => {
        // 执行删除操作
        await dispatch(deleteArticle(id))
        await dispatch(getArticles(params.current))
        message.success('删除成功')
      }
    })
  }

  useEffect(() => {
    // 获取频道数据
    dispatch(getChannels())

    // 获取文章列表数据
    dispatch(getArticles(params.current))
  }, [dispatch])

  // 筛选功能
  const onFinish = (values) => {
    params.current.status = values.status
    params.current.channel_id = values.channel_id

    // 对时间进行格式化
    if (values.dateArr) {
      params.current.begin_pubdate = values.dateArr[0].format('YYYY-MM-DD HH:mm:ss')
      params.current.end_pubdate = values.dateArr[1].format('YYYY-MM-DD HH:mm:ss')
    } else {
      params.current.begin_pubdate = undefined
      params.current.end_pubdate = undefined
    }

    // 分发 action
    params.current.page = 1
    dispatch(getArticles(params.current))
  }

  // 改变分页和size重新查询
  const onPageChange = (page, pageSize) => {
    params.current.page = page
    params.current.per_page = pageSize
    dispatch(getArticles(params.current))
  }

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
        <Form onFinish={onFinish}>
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
            <Button type="primary" htmlType="submit">
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title={`根据筛选条件共查询到 ${total_count} 条结果：`} style={{ marginTop: 24 }}>
        <Table
          columns={columns}
          dataSource={results}
          rowKey="id"
          pagination={{
            current: page,
            pageSize: per_page,
            total: total_count,
            onChange: onPageChange
          }}
        ></Table>
      </Card>
    </div>
  )
}

export default Article
