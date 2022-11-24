import React, { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { useSelector, useDispatch, connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { SignupLeftView } from "./loginLeftView";
import Footer from "../dashboard/ProfileFooter";
import { ValidateCompanyForm, validateInfo } from "./validateForm";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

function CompanySignup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const { isSignedup, isLoading } = auth;
  const user_profile = useSelector((state) => state.user_profile);
  const { users } = user_profile;

  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const [isCompanyNewsLetters, setisCompanyNewsLetters] = useState(false);
  const [isCompanyTerms, setIsCompanyTerms] = useState(false);

  const referral = JSON.parse(localStorage.getItem("referral"));

  const { referralCode, sourcer } = referral;

  const {
    handleValueChange,
    handlePhoneValueChange,
    values,
    handleSubmit,
    errors,
  } = ValidateCompanyForm(
    validateInfo,
    isCompanyNewsLetters,
    isCompanyTerms,
    referralCode,
    sourcer
  );

  const togglePassword1 = () => {
    setPasswordShown1(!passwordShown1);
  };
  const togglePassword2 = () => {
    setPasswordShown2(!passwordShown2);
  };

  // useEffect(() => {
  //   if (isSignedup) {
  //     navigate('/congrates', { state: 'success_signup' })
  //   }
  // }, [isSignedup])

  return (
    <div>
      <div>
        <Toaster
          toastOptions={{
            className: "bg-danger text-white",
          }}
        />
      </div>
      <Footer />
      <Wrapper>
        <div
          style={{
            height: "100vh",
            overflow: "hidden",
          }}
          className="content"
        >
          <div className="login-left-view">
            <SignupLeftView />
          </div>
          <div
            style={{ overflowY: "auto", gridTemplateColumns: "auto" }}
            className="login-right-view"
          >
            <div className="">
              <RightWrapper>
                <h4 className="container">Sign up</h4>
                <div className="container">
                  <form autoComplete="off" onSubmit={handleSubmit}>
                    <LoginInput>
                      <div className="mb-4">
                        <label>Company Name</label>
                        <div className="input-group">
                          <Input
                            type="text"
                            className="form-control"
                            onChange={handleValueChange}
                            name="name"
                            value={values.name}
                          />
                        </div>
                        {errors.name && <h3>{errors.name}</h3>}
                      </div>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <label>Contact Person First name</label>
                          <div className="input-group ">
                            <Input
                              className="form-control"
                              type="text"
                              onChange={handleValueChange}
                              name="contactFirstName"
                              value={values.contactFirstName}
                            />
                          </div>
                          {errors.contactFirstName && (
                            <h3>{errors.contactFirstName}</h3>
                          )}
                        </div>
                        <div className="col-md-6 mb-4">
                          <label>Contact Person Last name</label>
                          <div className="input-group">
                            <Input
                              type="text"
                              className="form-control"
                              onChange={handleValueChange}
                              name="contactLastName"
                              value={values.contactLastName}
                            />
                          </div>
                          {errors.contactLastName && (
                            <h3>{errors.contactLastName}</h3>
                          )}
                        </div>
                      </div>
                      <div className="mb-4">
                        <label>Contact Person Email Address</label>
                        <div className="input-group">
                          <Input
                            type="email"
                            className="form-control"
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
                          <PhoneInput
                            country={"ng"}
                            inputClass="form-control phone-input"
                            buttonClass="select-field"
                            inputProps={{
                              name: "phone",
                              required: true,
                            }}
                            placeholder="+234 801 234 5678"
                            jumpCursorToEnd={true}
                            disableCountryCode={false}
                            value={values.phone}
                            countryCodeEditable={false}
                            onChange={(value) => handlePhoneValueChange(value)}
                            disableDropdown
                            masks={{ ng: "... ... ...." }}
                          />
                        </div>
                        {errors.phone && <h3>{errors.phone}</h3>}
                      </div>
                      <div className="mb-4 input_password">
                        <label>Password</label>
                        <div className="input-group">
                          <InputGroup>
                            <Input
                              type={passwordShown1 ? "text" : "password"}
                              bsSize="lg"
                              onChange={handleValueChange}
                              name="password"
                              value={values.password}
                            />
                            <InputGroupText>
                              <i
                                onClick={togglePassword1}
                                style={{ cursor: "pointer" }}
                                className={
                                  passwordShown1
                                    ? "far fa-eye"
                                    : "far fa-eye-slash"
                                }
                              ></i>
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
                                }
                              ></i>
                            </InputGroupText>
                          </InputGroup>
                        </div>
                        {errors.c_password && <h3>{errors.c_password}</h3>}
                      </div>
                      <div className="mb-4">
                        <div className="">
                          <label>How did you hear about us?</label>
                          <select
                            className="form-select form-select-lg select-user-field"
                            aria-label=".form-select-md"
                            onChange={handleValueChange}
                            name="source"
                            defaultValue={values.source}
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
                      <div className="referal-link pb-5">
                        <div className="input-group">
                          {values.source === "OTHER" ? (
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Source Name"
                              onChange={handleValueChange}
                              name="sourceOthers"
                              defaultValue={values.sourceOthers}
                            />
                          ) : values.source === "ANOTHER_USER" ? (
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Input referral code"
                              onChange={handleValueChange}
                              name="refferedBy"
                              defaultValue={values.refferedBy}
                              disabled={referralCode}
                            />
                          ) : values.source === "ROSABON_SALES" ? (
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Input referral code"
                              onChange={handleValueChange}
                              name="refferedBy"
                              defaultValue={values.refferedBy}
                              disabled={referralCode}
                            />
                          ) : (
                            <Input
                              type="text"
                              className="form-control"
                              placeholder="Input referral code"
                              onChange={handleValueChange}
                              name="refferedBy"
                              defaultValue={values.refferedBy}
                              disabled={referralCode}
                            />
                          )}
                        </div>
                        {errors.refferedBy && <h3>{errors.refferedBy}</h3>}
                        {values.source === "OTHER" && errors.refferedBy && (
                          <h3>{errors.refferedBy}</h3>
                        )}
                      </div>
                      <div className="">
                        <div className="form-check">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            id="checkNewsLetter"
                            name="isCompanyNewsLetters"
                            onChange={(e) =>
                              setisCompanyNewsLetters(!isCompanyNewsLetters)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="checkNewsLetter"
                          >
                            Yes, I want to receive newsletters of Promos and
                            Offers
                          </label>
                        </div>
                        {/* <div className="form-check">
                          <Input
                            className="form-check-input"
                            type="checkbox"
                            id="checkIsAssisted"
                            name="isCompanyNewsLetters"
                            onChange={(e) =>
                              setisCompanyNewsLetters(!isCompanyNewsLetters)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor="checkIsAssisted"
                          >
                            Check the box if this registration is assisted
                          </label>
                        </div> */}
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="checkTerms"
                            name="isCompanyTerms"
                            onChange={(e) => setIsCompanyTerms(!isCompanyTerms)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="checkTerms"
                          >
                            I agree to the{" "}
                            <span
                              style={{
                                color: "rgba(17, 30, 108, 1)",
                                fontWeight: "500",
                              }}
                            >
                              Terms
                            </span>{" "}
                            and{" "}
                            <span
                              style={{
                                color: "rgba(17, 30, 108, 1)",
                                fontWeight: "500",
                              }}
                            >
                              Privacy
                            </span>{" "}
                            Policy
                          </label>
                        </div>
                        {errors.isCompanyTerms && (
                          <h3>{errors.isCompanyTerms}</h3>
                        )}
                      </div>
                    </LoginInput>
                    <LoginButton>
                      <div className="text-center mt-5">
                        <button
                          type="submit"
                          className="btn btn-primary px-5 mb-2"
                          disabled={isLoading}
                        >
                          {isLoading ? "Signing up..." : "Sign up"}
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
      </Wrapper>
    </div>
  );
}

export default CompanySignup;

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
  padding: 4rem;
  @media (max-width: 1200px) {
    padding: 4rem 1rem;
  }
  Link {
    text-decoration: none;
  }
  .referal-link {
    padding-top: 20px;
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
    height: 54px;
    padding: 15px;
    border: 1.5px solid #e0e0e0;
    border-radius: 8px;
    padding-left: 20px;
    font-weight: 500;
    font-size: 17px;
    line-height: 16px;
    position: relative;
    color: #333333;
  }
  .select-field {
    height: 54px;
    font-family: "Montserrat";
    border-left: 1.5px solid #e0e0e0 !important;
    border-top: 1.5px solid #e0e0e0 !important;
    border-bottom: 1.5px solid #e0e0e0 !important;
    border-right: 1px solid #eee;
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 15px;
    letter-spacing: -0.01em;
    color: #242424;
    padding: 15px;
    background: #ffffff;
  }

  .select-user-field {
    height: 54px;
    font-family: "Montserrat";
    border: 1.5px solid #e0e0e0 !important;
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 15px;
    letter-spacing: -0.01em;
    color: #242424;
    padding: 15px;
    background: #ffffff;
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
    font-size: 17px;
    line-height: 21px;
    letter-spacing: -0.04em;
    color: #828282;
  }
  label {
    padding-bottom: 7px;
    padding-left: 8px;
  }

  .form-check-label {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    color: #6d6d6d;
  }

  .phone-code {
    position: absolute;
    margin-top: 16px;
    margin-left: 20px;
    z-index: 10;
    font-weight: 500;
  }

  .phone-input {
    width: 100%;
    height: 54px;
    border: 1.5px solid #e0e0e0 !important;
    border-radius: 8px;
    padding: 15px 15px 15px 80px;
    position: relative;
    font-weight: 500;
    font-size: 17px;
    line-height: 16px;
    color: #333333;
    background: #ffffff !important;
  }
`;
const LoginButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

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
