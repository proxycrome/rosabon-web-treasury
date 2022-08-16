import React, { useState, useEffect } from "react";
import { Input } from 'reactstrap';
import { useSelector, useDispatch, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  registerCompany,
  registerUser,
} from "../../redux/actions/auth/SignupAction";
import LoginLeftView from "./loginLeftView";
import { ValidateUserForm, validateUserInfo } from "./validateForm";
import Footer from "../dashboard/ProfileFooter";

function UserSignup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { isSignedup, login, isLoggedIn } = auth;
  const user_profile = useSelector((state) => state.user_profile);
  const { users } = user_profile;
  // const count = useSelector((state) => state.auth.signup_btn);
  // const success = useSelector((state) => state.auth.success);
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const [isUserNewsLetters, setisUserNewsLetters] = useState(false);
  const [isUserTerms, setIsUserTerms] = useState(false);

  const { handleValueChange, values, handleSubmit, errors } = ValidateUserForm(
    validateUserInfo,
    isUserNewsLetters,
    isUserTerms
  );

  const togglePassword1 = () => {
    setPasswordShown1(!passwordShown1);
  };
  const togglePassword2 = () => {
    setPasswordShown2(!passwordShown2);
  };

  // console.log(register, isSignedup);

  useEffect(() => {
    if (users && users.kyc && users.role === "COMPANY") {
      navigate("/company-profile");
    } else if (users && users.kyc && users.role === "INDIVIDUAL_USER") {
      navigate("/personal-profile");
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

  useEffect(() => {
    if (isSignedup) {
      navigate("/congrates", { state: "success_signup" });
    }
  }, [isSignedup]);

  return (
    <div>
      <div>
        <Toaster position="bottom-center" />
      </div>
      <Wrapper>
        <div
          style={{
            height: "100vh",
            overflow: "hidden",
          }}
          className="content"
        >
          <div className="login-left-view">
            <LoginLeftView />
          </div>

          <div
            style={{ overflowY: "auto", gridTemplateColumns: "auto" }}
            className="login-right-view"
          >
            <div className="">
              <RightWrapper>
                <h4>Sign up</h4>
                <div className="container">
                  <form autoComplete="off" onSubmit={handleSubmit}>
                    <LoginInput>
                      <div className="row">
                        <div className="col-md-6  mb-4">
                          <label>First Name</label>
                          <div className="input-group">
                            <Input
                              className="form-control"
                              // placeholder="First Name"
                              type="text"
                              onChange={handleValueChange}
                              name="firstName"
                              value={values.firstName}
                            />
                          </div>
                          {errors.firstName && <h3>{errors.firstName}</h3>}
                        </div>
                        <div className="col-md-6 ps-2 mb-4">
                          <label>Last Name</label>
                          <div className="input-group">
                            <Input
                              type="text"
                              className="form-control"
                              // placeholder="Last Name"
                              onChange={handleValueChange}
                              name="lastName"
                              value={values.lastName}
                            />
                          </div>
                          {errors.lastName && <h3>{errors.lastName}</h3>}
                        </div>
                      </div>
                      <div className="mb-4">
                        <label>Email Address</label>
                        <div className="input-group">
                          <Input
                            type="email"
                            className="form-control"
                            // placeholder="Email Address"
                            onChange={handleValueChange}
                            name="email"
                            value={values.email}
                          />
                        </div>
                        {errors.email && <h3>{errors.email}</h3>}
                      </div>
                      <div className="mb-4">
                        <label>Mobile Number</label>
                        <div className="input-group">
                          <Input
                            type="text"
                            className="form-control"
                            // placeholder="Mobile Number"
                            onChange={handleValueChange}
                            name="phone"
                            value={values.phone}
                          />
                        </div>
                        {errors.phone && <h3>{errors.phone}</h3>}
                      </div>
                      <div className="mb-4 input_password">
                        <label>Password</label>
                        <div className="input-group">
                          <Input
                            type={passwordShown1 ? "text" : "password"}
                            className="form-control"
                            // placeholder="Password"
                            onChange={handleValueChange}
                            name="password"
                            value={values.password}
                            // onBlur={(e) => validatePassword(e.target.value)}
                          />
                          <i
                            onClick={togglePassword1}
                            className={
                              passwordShown1 ? "far fa-eye" : "far fa-eye-slash"
                            }
                          ></i>
                        </div>
                        {errors.password && <h3>{errors.password}</h3>}
                      </div>
                      <div className="mb-4 input_password">
                        <label>Confirm Password</label>
                        <div className="input-group">
                          <Input
                            type={passwordShown2 ? "text" : "password"}
                            className="form-control"
                            // placeholder="Confirm Password"
                            onChange={handleValueChange}
                            name="c_password"
                            value={values.c_password}
                          />
                          <i
                            onClick={togglePassword2}
                            class={
                              passwordShown2 ? "far fa-eye" : "far fa-eye-slash"
                            }
                          ></i>
                        </div>
                        {errors.c_password && <h3>{errors.c_password}</h3>}
                      </div>
                      <div className="mb-4">
                        <div className="">
                          <label>How did you hear about us</label>
                          <select

                            className="form-select form-select-lg"
                            aria-label=".form-select-lg"

                            // className="form-select form-select-md mb-3"
                            // aria-label=".form-select-md"

                            onChange={handleValueChange}
                            name="source"
                          >
                            <option value=""></option>
                            <option value="ROSABON_SALES">
                              Rosabon sales executive
                            </option>
                            <option value="ANOTHER_USER">Another user</option>
                            <option value="OTHER">Others</option>
                          </select>
                        </div>
                        {errors.source && <h3>{errors.source}</h3>}
                      </div>
                      <div className="mb-4">
                        <div className="input-group">
                          {values.source === "OTHER" ? (
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Source Name"
                              onChange={handleValueChange}
                              name="sourceOthers"
                              value={values.sourceOthers}
                            />
                          ) : values.source === "ANOTHER_USER" ? (
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Input referral code"
                              onChange={handleValueChange}
                              name="refferedBy"
                              value={values.refferedBy}
                            />
                          ) : values.source === "ROSABON_SALES" ? (
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Input referral code"
                              onChange={handleValueChange}
                              name="refferedBy"
                              value={values.refferedBy}
                            />
                          ) : (
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Input referral code"
                              onChange={handleValueChange}
                              name="refferedBy"
                              value={values.refferedBy}
                            />
                          )}
                        </div>
                        {errors.refferedBy && <h3>{errors.refferedBy}</h3>}
                      </div>
                      <div className="">
                        <div className="form-check">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            id="checkNewsLetter"
                            onChange={(e) =>
                              setisUserNewsLetters(!isUserNewsLetters)
                            }
                          />
                          <label
                            className="form-check-label"
                            for="checkNewsLetter"
                          >
                            Yes, I want to recieve newsletters of Promos and
                            Offers
                          </label>
                        </div>
                        <div className="form-check">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            id="checkIsAssisted"
                            name="isCompanyNewsLetters"
                            // onChange={(e) =>
                            //   // setisCompanyNewsLetters(!isCompanyNewsLetters)
                            // }
                          />
                          <label
                            className="form-check-label"
                            for="checkIsAssisted"
                          >
                            Check the box if this registration is assisted
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="checkTerms"
                            onChange={(e) => setIsUserTerms(!isUserTerms)}
                          />
                          <label className="form-check-label" for="checkTerms">
                            I agree to the Terms and Privacy Policy
                          </label>
                        </div>
                        {errors.isUserTerms && <h3>{errors.isUserTerms}</h3>}
                      </div>
                    </LoginInput>
                    <LoginButton>
                      <div className="">
                        <button type="submit">Sign up</button>

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
      </Wrapper>
      <Footer />
    </div>
  );
}

export default UserSignup;

const Wrapper = styled.div`
  .content {
    display: grid;
    @media (min-width: 900px) {
      grid-template-columns: 1fr 1fr;
    }
  }
`;

const RightWrapper = styled.section`
  background: #ffffff;
  padding: 8rem 4rem 4rem 4rem;
  @media (max-width: 900px) {
    padding: 4rem 1rem;
  }
  Link {
    text-decoration: none;
  }
  .login-btn {
  }
  .top_login_btn {
    padding-bottom: 50px;
    button {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      letter-spacing: -0.04em;
      outline: none;
      border: none;
      background: #ffffff;
    }
    .blue_login_btn {
      background: #111e6c;
      border-radius: 10px;
      padding: 10px 10px;
      outline: none;
      border: none;
      color: #f2f2f2;
      margin-left: 10px;
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
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 239.5px;
    height: 54px;
    border: 1.5px solid #e0e0e0;
    border-radius: 8px;
    padding-left: 20px;
    position: relative;
    font-weight: 400;
  }
  select {
    font-weight: 400;
  }
  label {
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 21px;
    letter-spacing: -0.04em;
    color: #828282;
    padding-bottom: 15px;
    padding-left: 10px;
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
`;

const LoginInput = styled.div`
  label,
  span {
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
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
      cursor: pointer;
    }
  }
  .form-check-label {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #6d6d6d;
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
