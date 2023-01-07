import React, { useEffect } from "react";
import PageRoutes from "./PageRoutes";
import { useSelector, useDispatch } from "react-redux";
import { getAuthUsers, refreshUser } from "./store/actions";
import Spinner from "./component/common/loading";

function App() {
  const dispatch = useDispatch();
  const { login, isAuth } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user_profile);

  useEffect(() => {
    dispatch(refreshUser());
    dispatch(getAuthUsers());
  }, [dispatch]);

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
