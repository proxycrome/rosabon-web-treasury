import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import RFSLogoFullColour from "../../asset/RFSLogoFullColour.png";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword } from "../../redux/actions/auth/SignupAction";
import { Input, InputGroup, InputGroupText } from "reactstrap";
import { ValidatePasswordForm, validatePassword } from "./validateForm";

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { login, isLoggedIn, isLoading } = auth;
  const user_profile = useSelector((state) => state.user_profile);
  const { users } = user_profile;
  const data = {
    newPassword: "",
    c_password: "",
  };
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);

  const { handleValueChange, values, handleSubmit, errors } =
    ValidatePasswordForm(validatePassword);

  const togglePassword1 = () => {
    setPasswordShown1(!passwordShown1);
  };
  const togglePassword2 = () => {
    setPasswordShown2(!passwordShown2);
  };

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
  }, [isLoggedIn, users, login, navigate]);

  return (
    <WrapperContainer>
      <div className="view_content"></div>
      <Toaster
        toastOptions={{
          className: "bg-danger text-white",
        }}
      />
      <Wrapper>
        <div className="d-flex justify-content-center align-items-center">
          <WrappCongrate>
            <div className="container">
              <div className="row">
                <div className="col congrate_body">
                  <div className="text-center">
                    <img src={RFSLogoFullColour} alt="RFSLogo" />
                  </div>
                  <h4 className="pt-4">Reset Password</h4>
                  <p className="">
                    Your password should include at least 8 characters and
                    should include a combination of Upper-case, Lowercase
                    and special characters (@$#%)
                  </p>
                  <div>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                      <div className="mb-4 input_password">
                        <label>Password</label>
                        <div className="input-group">
                          <InputGroup>
                            <Input
                              type={passwordShown1 ? "text" : "password"}
                              bsSize="lg"
                              onChange={handleValueChange}
                              name="password"
                              value={values.newPassword}
                            />
                            <InputGroupText>
                              <i
                                onClick={togglePassword1}
                                style={{ cursor: "pointer" }}
                                className={
                                  passwordShown1
                                    ? "far fa-eye"
                                    : "far fa-eye-slash"
                                }></i>
                            </InputGroupText>
                          </InputGroup>
                        </div>
                        {errors.password && <h3>{errors.password}</h3>}
                      </div>
                      <div className="mb-4 input_password">
                        <label>Confirm Password</label>
                        <div className="input-group">
                          <InputGroup>
                            <Input
                              type={passwordShown2 ? "text" : "password"}
                              bsSize="lg"
                              onChange={handleValueChange}
                              name="c_password"
                              value={values.c_password}
                            />
                            <InputGroupText>
                              <i
                                onClick={togglePassword2}
                                style={{ cursor: "pointer" }}
                                className={
                                  passwordShown2
                                    ? "far fa-eye"
                                    : "far fa-eye-slash"
                                }></i>
                            </InputGroupText>
                          </InputGroup>
                        </div>
                        {errors.c_password && <h3>{errors.c_password}</h3>}
                      </div>

                      <div className="text-center">
                        <div>
                          <button
                            type="submit"
                            className="btn btn-primary px-5 mb-2"
                            disabled={isLoading}>
                            {isLoading ? "Loading..." : "Reset Password"}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </WrappCongrate>
        </div>
      </Wrapper>
    </WrapperContainer>
  );
}

export default ResetPassword;

const WrapperContainer = styled.div`
  height: 100vh;
  .view_content {
    background: #111e6c;
    height: 65px;
  }
`;

const Wrapper = styled.div`
  padding-top: 5%;
`;

const WrappCongrate = styled.div`
  .congrate_body {
    padding: 3rem 5rem;
  }
  label {
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 21px;
    letter-spacing: -0.04em;
    color: #828282;
  }
  width: 50%;
  @media (max-width: 1200px) {
    p {
      /* text-align: left !important; */
    }
  }
  @media (max-width: 700px) {
    width: 80%;
    .congrate_body {
      padding: 3rem 2rem;
    }
    h4{
      font-size: 18px;
    }
  }
  /* width: 712px;
  height: 523px; */
  background: #ffffff;
  justify-content: center;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 40px rgba(225, 234, 254, 0.62);
  input {
    width: 479px;
    height: 54px;
  }
  .congrate_eclips {
    position: relative;
    top: -10px;
    right: 35px;
  }
  img {
    width: 73px;
    height: 30px;
  }
  h4 {
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 150%;
    text-align: center;
    letter-spacing: -0.15px;
    text-transform: capitalize;
    color: #242424;
    padding-top: 9px;
  }
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 150%;
    text-align: center;
    letter-spacing: -0.15px;
    color: #4f4f4f;
    padding-top: 9px;
    padding-bottom: 20px;
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
