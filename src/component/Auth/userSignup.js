import React, { useState, useEffect } from "react";
import { Input, InputGroup, InputGroupText, Tooltip } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { SignupLeftView } from "./loginLeftView";
import { ValidateUserForm, validateUserInfo } from "./validateForm";
import Footer from "../dashboard/ProfileFooter";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { getAllSources } from "../../store/actions";

function UserSignup() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { isLoading } = auth;
  const { sources } = useSelector((state) => state.user_profile);
  const [open, setOpen] = useState(false);
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const [isUserNewsLetters, setisUserNewsLetters] = useState(false);
  const [isUserTerms, setIsUserTerms] = useState(false);

  const location = useLocation();

  const query = new URLSearchParams(location?.search);

  const referralCode = query.get("referralCode");
  const sourcer = query.get("source");

  const {
    handleValueChange,
    handlePhoneValueChange,
    values,
    handleSubmit,
    errors,
  } = ValidateUserForm(
    validateUserInfo,
    isUserNewsLetters,
    isUserTerms,
    referralCode,
    sourcer
  );

  const toggle = () => {
    setOpen(!open);
  };

  const togglePassword1 = () => {
    setPasswordShown1(!passwordShown1);
  };
  const togglePassword2 = () => {
    setPasswordShown2(!passwordShown2);
  };

  useEffect(() => {
    dispatch(getAllSources());
  }, [dispatch]);

  return (
    <div>
      <div>
        <Toaster
          toastOptions={{
            className: "bg-danger text-white",
          }}
        />
      </div>
      <Footer source={sourcer} referralCode={referralCode} />
      <Wrapper>
        <div
          style={{
            height: "100vh",
            overflow: "hidden",
          }}
          className="content"
        >
          <div className="login-left-view">
            <SignupLeftView source={sourcer} referralCode={referralCode} />
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
                      <div className="row">
                        <div className="col-md-6  mb-4">
                          <label>First Name</label>
                          <div className="input-group">
                            <Input
                              type="text"
                              className="form-control"
                              onChange={handleValueChange}
                              name="firstName"
                              value={values.firstName}
                            />
                          </div>
                          <div>
                            {errors.firstName && <h3>{errors.firstName}</h3>}
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <label>Last Name</label>
                          <div className="input-group">
                            <Input
                              type="text"
                              className="form-control"
                              onChange={handleValueChange}
                              name="lastName"
                              value={values.lastName}
                            />
                          </div>
                          <div>
                            {errors.lastName && <h3>{errors.lastName}</h3>}
                          </div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label>Email Address</label>
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
                              id: "phone",
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
                      <Tooltip
                        placement="bottom-end"
                        target="phone"
                        isOpen={open}
                        toggle={toggle}
                        autohide={false}
                      >
                        Enter your Mobile Number without the first "0" (e.g 801
                        234 5678)
                      </Tooltip>
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
                          {sourcer ? (
                            <div className="input-group">
                              <Input
                                type="text"
                                className="form-control"
                                onChange={handleValueChange}
                                name="source"
                                defaultValue={
                                  values.source === "ANOTHER_USER"
                                    ? "Another user"
                                    : "Rosabon sales executive"
                                }
                                disabled={sourcer}
                              />
                            </div>
                          ) : (
                            <select
                              className="form-select form-select-lg select-user-field"
                              aria-label=".form-select-lg"
                              onChange={handleValueChange}
                              name="source"
                              defaultValue={values.source}
                            >
                              <option value="" hidden></option>
                              <option value="ROSABON_SALES">
                                Rosabon sales executive
                              </option>
                              <option value="ANOTHER_USER">Another user</option>
                              <option value="OTHER">Others</option>
                            </select>
                          )}
                        </div>
                        {errors.source && <h3>{errors.source}</h3>}
                      </div>
                      <div className="referal-link pb-5">
                        <div className="input-group">
                          {values.source === "OTHER" ? (
                            <select
                              className="form-select form-select-lg select-user-field"
                              aria-label=".form-select-lg"
                              onChange={handleValueChange}
                              name="sourceOthersId"
                              defaultValue={values.sourceOthersId}
                            >
                              <option value="" hidden>
                                Select Source Name
                              </option>
                              {sources?.map((data) => (
                                <option key={data.id} value={data.id}>
                                  {data.name}
                                </option>
                              ))}
                              <option value="NOT_IN_LIST">
                                Not in the List
                              </option>
                            </select>
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
                              defaultValue={values.refferedBy || referralCode}
                              disabled={referralCode}
                            />
                          )}
                        </div>
                        {errors.refferedBy && <h3>{errors.refferedBy}</h3>}
                      </div>
                      {values.source === "OTHER" &&
                        values.sourceOthersId === "NOT_IN_LIST" && (
                          <div className="mb-4">
                            <div className="input-group">
                              <Input
                                type="text"
                                placeholder="Enter Other Sources"
                                className="form-control"
                                onChange={handleValueChange}
                                name="sourceNotInTheList"
                                value={values.sourceNotInTheList}
                              />
                            </div>
                            {errors.sourceNotInTheList && (
                              <h3>{errors.sourceNotInTheList}</h3>
                            )}
                          </div>
                        )}
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
                            onChange={(e) => setIsUserTerms(!isUserTerms)}
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
                        {errors.isUserTerms && <h3>{errors.isUserTerms}</h3>}
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
  padding: 4rem;
  @media (max-width: 1200px) {
    padding: 4rem 1rem;
  }
  Link {
    text-decoration: none;
  }
  .login-btn {
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
    padding-bottom: 40px;
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
    position: relative;
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
