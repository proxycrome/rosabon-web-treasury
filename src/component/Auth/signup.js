import React, {useState} from "react";
import { useSelector } from "react-redux";
import LoginLeftView from "./loginLeftView";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Signup() {

  const count = useSelector((state) => state.auth.signup_btn);

  return (
    <div>
      <div className="">
        <div className="">
          <RightWrapper>
            <div className="d-flex top_login_btn justify-content-end">
              <button class="btn bg-gradient-primary w-auto me-2">Login</button>
              <button class="blue_login_btn">Get started</button>
            </div>
            <h4>Sign up</h4>
            <div className="container">
              <form autoComplete="off">
                <LoginInput>
                  <div class="row">
                    <div class="col-md-6 ">
                      <label>First Name</label>
                      <div class="input-group mb-4">
                        <input
                          class="form-control"
                          placeholder="First Name"
                          aria-label="First Name..."
                          type="text"
                        />
                      </div>
                    </div>
                    <div class="col-md-6 ps-2 mb-4">
                      <label>Last Name</label>
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Last Name"
                          aria-label="Last Name..."
                        />
                      </div>
                    </div>
                  </div>
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
                  <div className="mb-4 input_password">
                    <label>Password</label>
                    <div className="input-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                      />
                      <i class="far fa-eye-slash"></i>
                    </div>
                  </div>
                  <div className="mb-4 input_password">
                    <label>Confirm Password</label>
                    <div className="input-group">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                      />
                      <i class="far fa-eye-slash"></i>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label>How did you hear about us</label>
                    <div className="input-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="How did you hear about us"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label>Input referal</label>
                    <div className="input-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder=""
                      />
                    </div>
                  </div>
                  <div className="">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                      />
                      <label
                        className="form-check-label"
                        for="flexCheckChecked">
                        Yes, i want to recieve newsletters of Promos and Offers
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked"
                      />
                      <label
                        className="form-check-label"
                        for="flexCheckChecked">
                        I agree to the Terms and Privacy Policy
                      </label>
                    </div>
                  </div>
                </LoginInput>
                <LoginButton>
                  <div className="">
                    <button>
                      <Link to="/congrates">Sign up</Link>
                    </button>

                    <p className="text-center">
                      Already have an account?{" "}
                      <span className="">
                        <Link to="/login">Sign in </Link>
                      </span>
                    </p>
                  </div>
                </LoginButton>
              </form>
            </div>
          </RightWrapper>
        </div>
      </div>
    </div>
  );
}

export default Signup;

const RightWrapper = styled.section`
  background: #ffffff;
  padding: 4rem;
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
  label {
    padding-bottom: 7px;
    padding-left: 8px;
  }
  span {
    padding-left: 200px;
  }
  .input_password {
    position: relative;
    i {
      position: absolute;
      right: 15px;
      top: 12px;
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
