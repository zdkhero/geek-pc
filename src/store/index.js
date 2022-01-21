import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

// 导入根 reducer
import rootReducer from './reducers'

// import { composeWithDevTools } from 'redux-devtools-extension'

let middlewares

if (process.env.NODE_ENV === 'production') {
  // 生产环境，只启用 thunk 中间件
  middlewares = applyMiddleware(thunk)
} else {
  // 开发环境
  const { composeWithDevTools } = require('redux-devtools-extension')
  middlewares = composeWithDevTools(applyMiddleware(thunk))
}

const store = createStore(rootReducer, middlewares)

export default store
