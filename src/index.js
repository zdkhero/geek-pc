import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'

import { Provider } from 'react-redux'
import store from './store'

import 'moment/locale/zh-cn'
import locale from 'antd/lib/locale/zh_CN'
import { ConfigProvider } from 'antd'

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={locale}>
      <App />
    </ConfigProvider>
  </Provider>,
  document.querySelector('#root')
)
