import React from "react";
import LoginLeftView from "./loginLeftView";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  const count = useSelector((state) => state.auth.signup_btn);

  console.log(count);

  return (
    <div className="">
      <div className="">
        <RightWrapper>
          <div className="d-flex top_login_btn justify-content-end">
            <button class="btn bg-gradient-primary w-auto me-2">Login</button>
            <button class="blue_login_btn">Get started</button>
          </div>
          <h4>Login</h4>
          <div className="container">
            <form autoComplete="off">
              <LoginInput>
                <div className="mb-4">
                  <label>Email Address</label>
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email Address"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label>Password</label>
                  <div className="input-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-between">
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
                  <Link to="/">
                    <button className="verify_congrates_btn">Login</button>
                  </Link>
                  <Link to="/signup">
                    <p className="text-center">
                      Don’t have an account? <span className="">Sign up</span>
                    </p>
                  </Link>
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
  padding: 2rem 4rem;
  @media (max-width: 900px) {
    padding: 4rem 3rem;
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
  span {
    padding-left: 200px;
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
