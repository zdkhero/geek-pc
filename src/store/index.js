import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

// 导入根 reducer
import rootReducer from './reducers'

import { composeWithDevTools } from 'redux-devtools-extension'

const middlewares = composeWithDevTools(applyMiddleware(thunk))

const store = createStore(rootReducer, middlewares)

export default store
