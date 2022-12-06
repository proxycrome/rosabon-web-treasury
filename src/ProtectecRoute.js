import { Navigate } from 'react-router-dom'
const ProtectedRoute = ({ isAuth, children, user}) => {
  if (!isAuth) {
    return <Navigate to="/login" replace />
  }else{
    if(user){
      if(user.kyc){
        return children
      }
    }
  }
}

export default ProtectedRoute

export const KYCRoute = ({isAuth, children, login}) => {
  if (!isAuth) {
    return <Navigate to="/login" replace />
  } else {
    if(login){
      if(!login?.kyc){
        return children
      }
    }
  }
}

export const NotProtectedRoute = ({ isAuth, children, login }) => {
  if (isAuth) {
    if(!login?.kyc){
      return <Navigate to="/kyc" replace />
    }
    return <Navigate to="/" replace />
  }

  return children
}
