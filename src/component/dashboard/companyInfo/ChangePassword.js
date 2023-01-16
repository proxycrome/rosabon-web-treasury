import React, { useState, useEffect } from "react";
import {
  CLEAR_MESSAGES,
  CLOSE_MODAL,
} from "../../../store/profile/actionTypes";
import { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from 'react-router-dom';
import {
  Form,
  FormGroup,
  Input,
  Label,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import styled from "styled-components";
import { sendCompanyOtp, changeUserPassword } from "../../../store/actions";
import ModalComponent from "../../ModalComponent";
import { OTPVerify } from "../../Accessories/BVNConfirm";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const [passwordShown3, setPasswordShown3] = useState(false);
  // const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(true);
  const toggleEdit = (e) => {
    e.preventDefault();
    setShowEdit(!showEdit);
    setTouched(false);
  };

  const togglePassword1 = () => {
    setPasswordShown1(!passwordShown1);
  };

  const togglePassword2 = () => {
    setPasswordShown2(!passwordShown2);
  };

  const togglePassword3 = () => {
    setPasswordShown3(!passwordShown3);
  };

  const { showEmailOtpModal, otp, users } = useSelector((state) => state.user_profile);

  const { loading } = useSelector((state) => state.updateProfile);

  const createOtp = (otp) => {
    setToken(otp);
  };

  const data = {
    newPassword: "",
    oldPassword: "",
    cNewPassword: "",
  };
  const [formData, setformData] = useState(data);
  const [touched, setTouched] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTouched(true);
    setformData({
      ...formData,
      [name]: value,
    });
  };

  function validatePassword(values) {
    let errors = {};
    var re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$/;

    if (!values.oldPassword) {
      errors.oldPassword = "Current Password is required";
    }
    if (!values.newPassword) {
      errors.newPassword = "New Password is required";
    } else if (!re.test(values.newPassword)) {
      errors.newPassword =
        "Your password must contain at least one uppercase, one lowercase, a special character, and must be at least 8 characters";
    }
    if (values.cNewPassword !== values.newPassword) {
      errors.cNewPassword = "Password does not match";
    }

    return errors;
  }

  const handleSendOtp = (e) => {
    e.preventDefault();
    setErrors(validatePassword(formData));
    setIsSubmitted(true);
  };

  const handleSubmit = async (e) => {
    const { newPassword, oldPassword } = formData;
    const data = {
      oldPassword,
      newPassword,
      otp: token,
    };

    dispatch(changeUserPassword(data, dispatch, users?.resetPassword, navigate));
    setformData({
      ...formData,
      oldPassword: "",
      newPassword: "",
      cNewPassword: "",
    });
  };

  useEffect(() => {
    if (token) {
      handleSubmit();
    }
  }, [token]);

  useEffect(() => {
    const { oldPassword, newPassword, cNewPassword } = formData;
    if (oldPassword && newPassword && cNewPassword) {
      setErrors(validatePassword(formData));
    }
  }, [formData]);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitted) {
      dispatch(sendCompanyOtp());
    }
  }, [errors, isSubmitted, dispatch]);

  const handleOTPModalClose = () => {
    dispatch({ type: CLOSE_MODAL });
    dispatch({ type: CLEAR_MESSAGES });
  };

  const reset = (e) => {
    e.preventDefault();
    setformData({
      ...formData,
      oldPassword: "",
      newPassword: "",
      cNewPassword: "",
    });
  };

  return (
    <div>
      <Toaster />
      <Form
        autoComplete="off"
        autoCorrect="off"
        autoSave="off"
        onSubmit={handleSendOtp}
      >
        <WrapperBody>
          <div className="container-fluid">
            <div className="row">
              <div className="d-flex justify-content-between mt-2">
                <h4>Change Password</h4>
                <div>
                  {showEdit ? (
                    <button
                      type="button"
                      className="btn_bg_blue"
                      onClick={toggleEdit}
                    >
                      Edit
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="grey-button"
                      onClick={(e) => {
                        toggleEdit(e);
                        reset(e);
                      }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="my-3 col-md-6 ">
                <FormGroup className="w-100">
                  <Label htmlFor="oldPassword" className="">
                    Current Password
                  </Label>
                  <InputGroup>
                    <Input
                      type={passwordShown1 ? "text" : "password"}
                      bsSize="lg"
                      id="oldPassword"
                      name="oldPassword"
                      value={formData.oldPassword}
                      onChange={handleChange}
                      disabled={showEdit}
                    />
                    <InputGroupText>
                      <i
                        onClick={togglePassword1}
                        style={{ cursor: "pointer" }}
                        className={
                          passwordShown1 ? "far fa-eye" : "far fa-eye-slash"
                        }
                      ></i>
                    </InputGroupText>
                  </InputGroup>
                  {errors.oldPassword && touched && (
                    <span className="text-danger">{errors.oldPassword}</span>
                  )}
                </FormGroup>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mt-2">
                <FormGroup className="w-100">
                  <Label htmlFor="newPassword" className="">
                    New Password
                  </Label>
                  <InputGroup>
                    <Input
                      type={passwordShown2 ? "text" : "password"}
                      bsSize="lg"
                      id="newPassword"
                      onChange={handleChange}
                      value={formData.newPassword}
                      name="newPassword"
                      disabled={showEdit}
                    />
                    <InputGroupText>
                      <i
                        onClick={togglePassword2}
                        style={{ cursor: "pointer" }}
                        className={
                          passwordShown2 ? "far fa-eye" : "far fa-eye-slash"
                        }
                      ></i>
                    </InputGroupText>
                  </InputGroup>
                  {errors.newPassword && touched && (
                    <span className="text-danger">{errors.newPassword}</span>
                  )}
                </FormGroup>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 ">
                <FormGroup className="w-100">
                  <Label htmlFor="cNewPassword" className="">
                    Confirm Password
                  </Label>
                  <InputGroup>
                    <Input
                      type={passwordShown3 ? "text" : "password"}
                      bsSize="lg"
                      id="cNewPassword"
                      name="cNewPassword"
                      value={formData.cNewPassword}
                      onChange={handleChange}
                      disabled={showEdit}
                    />
                    <InputGroupText>
                      <i
                        onClick={togglePassword3}
                        style={{ cursor: "pointer" }}
                        className={
                          passwordShown3 ? "far fa-eye" : "far fa-eye-slash"
                        }
                      ></i>
                    </InputGroupText>
                  </InputGroup>
                  {errors.cNewPassword && (
                    <span className="text-danger">{errors.cNewPassword}</span>
                  )}
                </FormGroup>
              </div>
            </div>
          </div>
        </WrapperBody>
        <WrapperFooter>
          <div className="footer-body">
            <div className="d-flex align-items-center justify-content-end footer-content">
              <div>
                <button type="submit" className="blue-btn" disabled={Object.keys(errors).length !== 0}>
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </WrapperFooter>
      </Form>
      <ModalComponent
        show={showEmailOtpModal}
        size={"md"}
        handleClose={handleOTPModalClose}
      >
        <OTPVerify
          show={showEmailOtpModal}
          handleClose={handleOTPModalClose}
          emailOtp={true}
          updateOtp={(otp) => createOtp(otp)}
          otpData={otp?.data}
          company="company"
        />
      </ModalComponent>
    </div>
  );
};

export default ChangePassword;

const WrapperBody = styled.div`
  padding: 0 4rem 7rem 1rem;
  .content {
    padding-top: 45px;
  }
  .grey-button {
    background: #f2f2f2;
    color: #111e6c;
  }
  .cancel-button {
  }
  .image-holder {
    padding-bottom: 100px;
  }
  .input-font-awe {
    position: absolute;
    top: 8px;
    right: 20px;
    font-size: 25px;
  }
  button {
    background: #111e6c;
    border-radius: 5px;
    outline: none;
    border: none;
    padding: 10px 27px;
    color: #f2f2f2;
  }
  h4 {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    text-transform: capitalize;
    color: #222222;
    padding-bottom: 45px;
  }
  h3 {
    font-style: normal;
    font-weight: 700;
    font-size: 33px;
    line-height: 40px;
    color: #222222;
    padding-bottom: 15px;
    padding-left: 10px;
  }
  p {
    font-style: normal;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.04em;
    color: #333333;
  }
  input {
    width: 239.5px;
    height: 54px;
    border: 1.5px solid #e0e0e0;
    border-radius: 8px;
    padding-left: 20px;
    position: relative;
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
  .profile_vify_btn {
    margin-top: 35px;
    background: #111e6c;
    border-radius: 8px;
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 21px;
    color: #ffffff;
  }
`;

const WrapperFooter = styled.div`
  background: #ffffff;
  box-shadow: 8px 0px 18px rgba(173, 173, 173, 0.25);
  padding: 40px 65px;
  @media (max-width: 600px) {
    padding: 40px 20px;
  }
  @media (max-width: 800px) {
    .footer-content {
      display: flex !important;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    button {
      margin: 10px 0;
    }
  }
  button {
    width: 300px;
    background: #f2f2f2;
    border-radius: 10px;
    outline: none;
    border: none;
    padding: 10px 15px;
  }
  .blue-btn {
    color: #f2f2f2;
    background: #111e6c;
  }
`;
