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
export const updateArticle = (data, draft, isEdit) => {
  return async () => {
    if (isEdit) {
      // 编辑
      await http.put(`/mp/articles/${data.id}?draft=${draft ? 'false' : 'true'}`, data)
    } else {
      // 发布
      await http.post(`/mp/articles?draft=${draft ? 'false' : 'true'}`, data)
    }
  }
}

// 编辑文章功能
export const getArticleById = (articleId) => {
  return async (dispatch) => {
    const res = await http.get(`/mp/articles/${articleId}`)
    console.log(res)

    const {
      id,
      title,
      channel_id,
      content,
      cover: { type, images }
    } = res

    const article = {
      id,
      title,
      channel_id,
      content,
      type,
      images
    }

    dispatch({
      type: 'article/getArticleById',
      payload: article
    })

    // 注意：此处需要将 文章详情数据 返回，这样，在页面中才能在请求后拿到该数据
    return article
  }
}
