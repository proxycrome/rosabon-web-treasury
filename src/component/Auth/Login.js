import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import LoginLeftView from "./loginLeftView";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { successMessage } from "../../redux/actions/auth/SignupAction";
import { loginUser } from "../../redux/actions/auth/SignupAction";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { login, isLoggedIn } = auth;

  const user_profile = useSelector((state) => state.user_profile);
  const { users } = user_profile;

  // console.log(login, isLoggedIn, users);

  const [passwordShown, setPasswordShown] = useState(false);
  const [error, setError] = useState(null);

  const togglePassword1 = () => {
    setPasswordShown(!passwordShown);
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const data = {
    email: "",
    password: "",
  };
  const [formData, setformData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });

    if (name == "email") {
      if (!isValidEmail(e.target.value)) {
        setError("Email is invalid");
      } else {
        setError(null);
      }
    }
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!error) {
      let data = {
        email,
        password,
        platformType: "WEB",
      };
      console.log(data);
      dispatch(loginUser(data));
    } else {
    }
  };

  // useEffect(() => {
  //   dispatch(successMessage(false));
  // }, []);

  useEffect(() => {
    if (users && users.kyc && users.role === "INDIVIDUAL_USER") {
      navigate("/personal-profile");
    } else if (users && users.kyc && users.role === "COMPANY") {
      navigate("/company-profile");
    } else if (isLoggedIn || users) {
      if (
        (login && login.role && login.role.name === "COMPANY") ||
        (users && users.role === "COMPANY")
      ) {
        navigate("/kyc/company");
      } else if (
        (login && login.role && login.role.name === "INDIVIDUAL_USER") ||
        (users && users.role === "INDIVIDUAL_USER")
      ) {
        navigate("/kyc/person");
      }
    }
  }, [isLoggedIn, users]);

  return (
    <div className="">
      <div className="">
        <RightWrapper>
          <Toaster />
          <h4>Login</h4>
          <div className="container">
            <form autoComplete="off" onSubmit={handleUserSubmit}>
              <LoginInput>
                <div className="mb-4">
                  <label className="pb-2">Email Address</label>
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                      onChange={handleChange}
                      name="email"
                      value={formData.email}
                    />
                  </div>
                  {error && (
                    <h3>
                      Your account is pending verification. please check your
                      email for the verification link
                    </h3>
                  )}
                </div>
                <div className="mb-4 input_password">
                  <label className="pb-2">Password</label>
                  <div className="input-group">
                    <input
                      type={passwordShown ? "text" : "password"}
                      className="form-control"
                      placeholder="Password"
                      onChange={handleChange}
                      name="password"
                      value={formData.password}
                    />
                    <i
                      onClick={togglePassword1}
                      class={passwordShown ? "far fa-eye" : "far fa-eye-slash"}
                    ></i>
                  </div>
                </div>
                <div className="d-flex justify-content-around">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked"
                    />
                    <label className="form-check-label" for="flexCheckChecked">
                      Stay signed in
                    </label>
                  </div>
                  <p className="">
                    <Link to="/forgot-password">Forgot Password?</Link>
                  </p>
                </div>
              </LoginInput>
              <LoginButton>
                <div className="">
                  <button type="submit" className="verify_congrates_btn">
                    Login
                  </button>
                  <p className="text-center">
                    Don’t have an account?{" "}
                    <span className="">
                      <Link to="/register-company">Sign up</Link>
                    </span>
                  </p>
                </div>
              </LoginButton>
            </form>
          </div>
        </RightWrapper>
      </div>
    </div>
  );
};

export default Login;

const RightWrapper = styled.section`
  background: #ffffff;
  padding: 6rem 4rem 4rem 4rem;
  @media (max-width: 900px) {
    padding: 4rem 3rem;
  }
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 239.5px;
    height: 54px;
    border: 1.5px solid #e0e0e0;
    border-radius: 8px;
    padding-left: 20px;
    position: relative;
  }
  .top_login_btn {
    padding-bottom: 50px;
    button {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: -0.04em;
    }
    .blue_login_btn {
      background: #111e6c;
      border-radius: 10px;
      padding: 10px 10px;
      outline: none;
      border: none;
      color: #f2f2f2;
    }
  }
  h4 {
    font-style: normal;
    font-weight: 700;
    font-size: 33px;
    line-height: 40px;
    color: #222222;
    padding-bottom: 60px;
  }
  h3 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 300;
    font-size: 13px;
    line-height: 16px;
    display: flex;
    align-items: center;
    letter-spacing: -0.02em;
    color: #e20d0d;
    padding-top: 12px;
  }
  .login_input {
  }
`;

const LoginInput = styled.div`
  label,
  span {
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 21px;
    letter-spacing: -0.04em;
    color: #828282;
  }

  p {
    padding-left: 200px;
  }
  .input_password {
    position: relative;
    i {
      position: absolute;
      right: 15px;
      top: 16px;
      cursor: pointer;
    }
  }
`;
const LoginButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    background: #111e6c;
    border-radius: 10px;
    padding: 10px 120px;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: #ffffff;
    margin-top: 80px;
  }
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 21px;
    letter-spacing: -0.04em;
    color: #333333;
    margin-top: 15px;
  }
  span {
    color: rgba(28, 68, 141, 1);
  }
`;
