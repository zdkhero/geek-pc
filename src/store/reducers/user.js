import { getToken } from '@/utils/auth'

// 登录功能，只需要存储 token 即可，所以，状态默认值为：''
const initialState = {
  // token: localStorage.getItem('geek-pc-token') || ''
  token: getToken()
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'user/setToken':
      return {
        ...state,
        token: action.payload
      }
    case 'user/setName':
      return {
        ...state,
        name: action.payload
      }
    default:
      return state
  }
}

export default user
