import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAuth, children, user }) => {
  if (!isAuth) {
    return <Navigate to="/login" replace />;
  } else {
    if(user){
      if(user?.kyc === false){
        <Navigate to="/kyc" replace />;
      } else if (user?.creationSource === "BACKEND" && !user?.resetPassword){
        <Navigate to="/change-password" replace />
      } else {
        return children
      }
    }
  }
};

export default ProtectedRoute;

export const KYCRoute = ({ isAuth, children, user }) => {
  if (!isAuth) {
    return 
  } else {
    if (user) {
      if (!user?.kyc) {
        return children;
      } else {
        <Navigate to="" replace />
      }
    }
  }
};

export const ProfileRoute = ({ isAuth, children, user }) => {
  if (!isAuth) {
    return 
  } else {
    if (user) {
      if (user?.creationSource === "BACKEND" && !user?.resetPassword) {
        <Navigate to="/change-password" replace/>
        return children;
      } else {
        <Navigate to="" replace />
      }
    }
  }
};

export const NotProtectedRoute = ({ isAuth, children, user }) => {
  if (isAuth) {
    if (user) {
      if (!user?.kyc) {
        return <Navigate to="/kyc" replace />;
      } else {
        return <Navigate to="/" replace />;
      }
    }
  }

  return children;
};
