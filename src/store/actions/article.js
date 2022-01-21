import { http } from '@/utils'

// 获取频道列表数据
export const getChannels = () => {
  return async (dispatch) => {
    const data = await http.get('channels')
    dispatch({ type: 'article/setChannels', payload: data.channels })
  }
}

// 获取文章列表数据
export const getArticles = (params) => {
  return async (dispatch) => {
    const data = await http.get('mp/articles', { params })
    dispatch({ type: 'article/setArticles', payload: data })
  }
}

// 删除文章功能
export const deleteArticle = (id) => {
  return async (dispatch) => {
    await http.delete('mp/articles/' + id)
  }
}

// 发布文章功能
export const updateArticle = (data) => {
  return async () => {
    await http.post('/mp/articles?draft=false', data)
  }
}
