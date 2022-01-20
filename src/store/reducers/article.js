const initialState = {
  // 频道
  channels: [],
  // 文章
  results: [],
  page: 1,
  per_page: 10,
  total_count: 0
}

const article = (state = initialState, action) => {
  switch (action.type) {
    case 'article/setChannels':
      return {
        ...state,
        channels: action.payload
      }
    case 'article/setArticles':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export default article
