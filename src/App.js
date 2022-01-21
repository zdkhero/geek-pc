import { lazy, Suspense } from 'react'
import './App.scss'

// 导入路由组件
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Home from '@/pages/Home'

// 导入权限拦截组件
import AuthRoute from '@/component/AuthRoute'

// 导入页面组件
const Login = lazy(() => import('@/pages/Login'))
// import Login from '@/pages/Login'
const GeetLayout =  lazy(() => import('@/pages/Layout'))
const Dashboard =  lazy(() => import('@/pages/Dashboard'))
const Article =  lazy(() => import('@/pages/Article'))
const Publish =  lazy(() => import('@/pages/Publish'))
const NotFound =  lazy(() => import('@/pages/NotFound'))


function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="loading">loading...</div>}>
        <Routes>
          <Route path="/" element={<AuthRoute><GeetLayout /></AuthRoute>}>
            {/* index 默认子路由 */}
            <Route index element={<AuthRoute><Dashboard /></AuthRoute>} />
            <Route path="article" element={<AuthRoute><Article /></AuthRoute>} />
            <Route path="publish" element={<AuthRoute><Publish /></AuthRoute>} >
              <Route path=":id" element={<AuthRoute><Publish /></AuthRoute>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
