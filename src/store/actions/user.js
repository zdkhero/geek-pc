import { setToken, clearToken, http } from '@/utils'

// 登录
export const login = (mobile, code) => {
  return async (dispatch) => {
    const res = await http.post('/authorizations', {
      mobile,
      code
    })

    // 注意：此处获取的是 token
    const { token } = res
    setToken(token)
    dispatch({ type: 'user/setToken', payload: token })
  }
}

// 获取用户的基本信息
export const getUserInfo = () => {
  return async (dispatch) => {
    const data = await http.get('/user/profile')
    dispatch({ type: 'user/setName', payload: data.name })
  }
}

// 退出功能
export const logout = () => {
  return (dispatch) => {
    // 清除 Token()
    clearToken()
    // 清除 token
    dispatch({ type: 'user/setToken', payload: '' })
    // 清除用户信息
    dispatch({ type: 'user/setName', payload: '' })
  }
}
