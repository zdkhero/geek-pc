import { setToken, http } from '@/utils'

// 登录
export const login = (mobile, code) => {
  return async (dispatch) => {
    const res = await http.post('/authorizations', {
      mobile,
      code
    })

    // 注意：此处获取的是 token
    const { token } = res

    // localStorage.setItem('geek-pc-token', token)
    setToken(token)
    dispatch({ type: 'login/setToken', payload: token })
  }
}