import axios from 'axios'
import store from '@/store'
import { logout } from '@/store/actions'
import { message } from 'antd'

const http = axios.create({
  baseURL: 'http://geek.itheima.net/v1_0',
  timeout: 5000
})

// 统一添加token在请求头
http.interceptors.request.use(
  (config) => {
    // 对config进行修改，每次请求前做的事情
    const state = store.getState()

    if (state.user.token) {
      config.headers.Authorization = `Bearer ${state.user.token}`
    }

    return config
  },
  (e) => Promise.reject(e)
)

// 响应拦截器
http.interceptors.response.use(
  (res) => {
    return res?.data?.data || res
  },
  (e) => {
    if (e.response.status === 401) {
      message.error(e.response.data?.message, 1.5, () => {
        // 删除token
        store.dispatch(logout())
        // 跳转到登录页，并携带当前要访问的页面，这样，登录后可以继续返回该页面
        window.location.pathname = '/login'
      })
    }
    return Promise.reject(e)
  }
)

export { http }
