import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageRoutes from "./PageRoutes";
import { useSelector, useDispatch } from "react-redux";
import { getAuthUsers, refreshUser } from "./store/actions";
import Spinner from "./component/common/loading";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { login, isAuth, isLoading } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user_profile);

  useEffect(() => {
    dispatch(refreshUser());
    dispatch(getAuthUsers());
  }, []);

  // useEffect(() => {
  //   let current_url = window.location.href;
  //   if (current_url.includes('https://api-rosabon.optisoft.com.ng:8090/payment/callback')) {
  //     let url_split = current_url.split('=')
  //     localStorage.setItem('trxref', url_split[2])
  //     navigate("/create-plan")
  //   }
  // },[])

  return (
    <div className="App">
      {isAuth !== null ? (
        <PageRoutes login={login} isAuth={isAuth} user={users} />
      ) : (
        <div className="vh-100 w-100">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default App;
