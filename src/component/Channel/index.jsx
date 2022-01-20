import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChannels } from '@/store/actions/article'

import { Select } from 'antd'

const Channel = ({ value, onChange, width = 400 }) => {
  // 频道数据
  const channels = useSelector((state) => state.article.channels)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getChannels())
  }, [dispatch])

  return (
    <Select placeholder="请选择文章频道" style={{ width }} value={value} onChange={onChange}>
      {channels.map((item) => (
        <Select.Option key={item.id} value={item.id}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  )
}

export default Channel
