import React, { useState, useEffect } from 'react'
import PageRoutes from './PageRoutes'
import { useSelector, useDispatch } from 'react-redux'
import { refreshUser } from './store/actions'
import Spinner from './component/common/loading'

function App() {
  const dispatch = useDispatch();
  const { login, isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(refreshUser());
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
