import './App.scss'

// 导入路由组件
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// 导入页面组件
import Login from '@/pages/Login'
import GeetLayout from '@/pages/Layout'
import Home from '@/pages/Home'

// 导入权限拦截组件
import AuthRoute from '@/component/AuthRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<GeetLayout />}></Route> */}
        <Route
          path="/home"
          element={
            <AuthRoute>
              <GeetLayout />
            </AuthRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
