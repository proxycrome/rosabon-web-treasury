import { Navigate } from 'react-router-dom'
const ProtectedRoute = ({ isAuth, children }) => {
  console.log('is login')
  console.log(isAuth)

  if (!isAuth) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute

export const NotProtectedRoute = ({ isAuth, children }) => {
  console.log(isAuth)
  console.log('bdibkbibidubfiubi')
  if (isAuth) {
    return <Navigate to="/" replace />
  }

  return children
}
