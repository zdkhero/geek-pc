import { getToken } from '@/utils/auth'
import { Navigate } from 'react-router-dom'

const AuthRoute = ({ children }) => {
  if (!getToken()) {
    return <Navigate to="/login" replace={true}></Navigate>
  }

  return children
}

export default AuthRoute
