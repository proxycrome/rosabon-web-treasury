import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import RFSLogoFullColour from "../../asset/RFSLogoFullColour.png";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../redux/actions/auth/SignupAction";
import {
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
  InputGroup,
  InputGroupText,
} from "reactstrap";

function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { isSuccess, forgotpassword, login, isLoggedIn, isLoading } = auth;

  const user_profile = useSelector((state) => state.user_profile);
  const { users } = user_profile;

  const [emailError, setError] = useState(false);

  const data = {
    email: "",
  };
  const [formData, setformData] = useState(data);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChange = (e) => {
    setError(false);
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

  console.log(isSuccess);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    const { email } = formData;
    if (!isValidEmail(email)) {
      return setError(true);
    }
    dispatch(forgotPassword(email));
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
  }, [isLoggedIn, users]);


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
            <div className="container-fluid">
              <div className="row">
                <div className="col congrate_body">
                  <div className="text-center">
                    <img src={RFSLogoFullColour} alt="RFSLogo" />
                  </div>
                  <h4 className="pt-5">Forgot Password </h4>
                  <p className="">
                    Please, enter your email address. You will receive a link{" "}
                    <br /> to create a new password via email.
                  </p>
                  {isSuccess ? (
                    <>
                      <div className="success-msg text-center">
                        Your account is pending verification. please check your
                        email for the verification link
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  <div>
                    <form autoComplete="off" onSubmit={handleSubmit}>
                      <FormGroup className="w-100">
                        <Label
                          htmlFor="email"
                          className="card-title fw-bold fs-5 mb-2">
                          Email Address
                        </Label>
                        <Input
                          type="email"
                          name="email"
                          className="w-100"
                          bsSize="lg"
                          onChange={handleChange}
                          invalid={emailError}
                        />
                        <FormFeedback>Valid Email is Required</FormFeedback>
                      </FormGroup>

                      <div className="text-center">
                        <div>
                          <button
                            type="submit"
                            className="btn btn-primary px-5 mb-2"
                            disabled={isLoading || isSuccess}>
                            {isLoading ? "LOADING..." : "Send"}
                          </button>
                          <p className="text-center">
                            Do you remember your password?
                            <span className="">
                              <Link to="/login"> Try Signing in </Link>{" "}
                            </span>
                          </p>
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

export default ForgotPassword;

const WrapperContainer = styled.div`
  height: 100vh;
  .view_content {
    background: #111e6c;
    height: 65px;
  }
`;

const Wrapper = styled.div`
  padding: 50px;
  /* padding-top: 5%; */
`;

const WrappCongrate = styled.div`
  .congrate_body {
    padding: 0 6rem;
  }
  label {
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 21px;
    letter-spacing: -0.04em;
    color: #828282;
  }
  width: 712px;
  height: 523px;
  background: #ffffff;
  justify-content: center;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 40px rgba(225, 234, 254, 0.62);
  @media (max-width: 810px) {
    .congrate_body {
      padding: 3rem;
    }
    h4 {
      font-size: 20px;
      p {
        font-size: 12px;
      }
    }
  }
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

  .success-msg {
    margin: 20px 0;
    padding: 10px;
    border-radius: 3px 3px 3px 3px;
  }
  .success-msg {
    color: #270;
    background-color: #dff2bf;
  }
`;
