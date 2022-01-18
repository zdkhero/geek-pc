import './App.scss'

// 导入路由组件
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

// 导入页面组件
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import Home from '@/pages/Home'

// 导入权限拦截组件
import AuthRoute from '@/component/AuthRoute'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <h1>Welcome to React Router!</h1>

        <p>
          <Link to="/login">跳转到登录页面</Link>
        </p>
        <p>
          <Link to="/">跳转到主页</Link>
        </p>

        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/home"
            element={
              <AuthRoute>
                <Home />
              </AuthRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
