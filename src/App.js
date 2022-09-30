import React, { useState, useEffect } from 'react'
import PageRoutes from './PageRoutes'
import { useSelector, useDispatch } from 'react-redux'
import { RefreshUser } from './redux/actions/auth/SignupAction'
import Spinner from './component/common/loading'

function App() {
  const dispatch = useDispatch();
  const { login, isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(RefreshUser());
  }, [dispatch]);

  return (
    <div className="App">
      {isAuth !== null ? (
        <PageRoutes login={login} isAuth={isAuth} />
      ) : (
        <div className="vh-100 w-100">
          <Spinner />
        </div>
      )}
    </div>
  )
}

export default App
