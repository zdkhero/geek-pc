import './App.scss'

// 导入路由组件
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// 导入页面组件
import Login from '@/pages/Login'
import GeetLayout from '@/pages/Layout'
// import Home from '@/pages/Home'

// 导入权限拦截组件
import AuthRoute from '@/component/AuthRoute'

import Dashboard from '@/pages/Dashboard'
import Article from '@/pages/Article'
import Publish from '@/pages/Publish'
import NotFound from '@/pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthRoute><GeetLayout /></AuthRoute>}>
          {/* index 默认子路由 */}
          <Route index element={<AuthRoute><Dashboard /></AuthRoute>} />
          <Route path="article" element={<AuthRoute><Article /></AuthRoute>} />
          <Route path="publish/*" element={<AuthRoute><Publish /></AuthRoute>}/>
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
