const initialState = {
  // 频道
  channels: []
}

const article = (state = initialState, action) => {
  if (action.type === 'article/setChannels') {
    return {
      ...state,
      channels: action.payload
    }
  }
  return state
}

export default article
