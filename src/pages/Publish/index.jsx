import { useState, useRef, useEffect } from 'react'
import { Card, Breadcrumb, Form, Button, Input, Space, Upload, Radio, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateArticle, getArticleById } from '@/store/actions'

import styles from './index.module.scss'
import Channel from '@/component/Channel'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const Publish = () => {
  const [fileList, setFileList] = useState([])
  const [maxCount, setMaxCount] = useState(1)
  const fileListRef = useRef([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const params = useParams()
  // 判断是否是编辑
  const isEdit = params.id !== undefined

  // 创建表单实例
  // 注意：此处的 form 是从数组中解构出来的
  const [form] = Form.useForm()

  const onUploadChange = (info) => {
    // info.fileList 用来获取当前的文件列表
    const fileList = info.fileList.map((file) => {
      // 刚从本地上传的图片
      if (file.response) {
        return {
          url: file.response.data.url
        }
      }
      // 已有图片
      return file
    })
    setFileList(fileList)
    fileListRef.current = fileList
  }

  // 获取图片的数量
  const changeType = (e) => {
    const count = e.target.value
    setMaxCount(count)

    if (count === 1) {
      // 单图，只展示第一张
      const firstImg = fileListRef.current[0]
      setFileList(firstImg === undefined ? [] : [firstImg])
    } else if (count === 3) {
      // 三图，展示所有图片
      setFileList(fileListRef.current)
    }
  }

  // 文章发布或存为草稿
  const saveArticles = async (values, saveType) => {
    if (maxCount !== fileList.length) {
      return message.warning('请按照选择的封面类型上传图片')
    }

    const { type, ...rest } = values

    const data = {
      ...rest,
      // 注意：接口会按照上传图片的数量决定单图或三图
      cover: {
        type,
        images: fileList.map((item) => item.url)
      }
    }

    if (isEdit) {
      data.id = params.id
    }

    await dispatch(updateArticle(data, saveType === 'add', isEdit))

    const showMsg = saveType === 'add' ? '发布成功' : '存入草稿成功'

    message.success(showMsg, 1, () => {
      navigate('/article')
    })
  }

  // 发布文章
  const onFinish = async (values) => {
    saveArticles(values, 'add')
  }

  // 存为草稿
  const saveDraft = async () => {
    const values = await form.validateFields()
    saveArticles(values, 'draft')
  }

  useEffect(() => {
    const loadData = async () => {
      if (!isEdit) return
      // 获取文章信息
      const res = await dispatch(getArticleById(params.id))
      console.log(res)
      const { images, ...formValue } = res
      // 动态设置表单数据
      form.setFieldsValue(formValue)

      // 格式化封面图片数据
      const imageList = images.map((item) => ({ url: item }))
      setFileList(imageList)
      setMaxCount(formValue.type)
      fileListRef.current = imageList
    }
    loadData()
  }, [form, params.id, dispatch, isEdit])

  return (
    <div className={styles.root}>
      <Card
        title={
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/article">内容管理</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{isEdit ? '修改文章' : '发布文章'}</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1, content: '' }}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item label="文章标题：" name="title" rules={[{ required: true, message: '请输入文章标题' }]}>
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>

          <Form.Item label="所属频道：" name="channel_id" rules={[{ required: true, message: '请选择所属频道' }]}>
            <Channel></Channel>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={changeType}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>

            {maxCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                multiple
                fileList={fileList}
                onChange={onUploadChange}
              >
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>

          <Form.Item label="内容" name="content" rules={[{ required: true, message: '请输入文章内容' }]}>
            <ReactQuill className="publish-quill" theme="snow" placeholder="请输入文章内容" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                {isEdit ? '修改文章' : '发布文章'}
              </Button>
              <Button onClick={saveDraft}>存入草稿</Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish
