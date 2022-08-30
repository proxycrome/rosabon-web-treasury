import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormGroup,
  Input,
  Label,
  FormFeedback,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import styled from "styled-components";
import { changePersonalPassword } from "../../../redux/actions/updateProfile/changePassword.action";
import { successMessage } from "../../../redux/actions/auth/SignupAction";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordShown1, setPasswordShown1] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const [passwordShown3, setPasswordShown3] = useState(false);
  // const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(true);
  const toggleEdit = () => {
    setShowEdit(!showEdit);
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

  const data = {
    acc_name: "",
    acc_no: "",
    bankType: "",
  };
  const [formData, setformData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { acc_name, acc_no, bankType } = formData;
    let data = { acc_name, acc_no, bankType };
    console.log(data);
    dispatch(changePersonalPassword(data));
  };

  useEffect(() => {
    dispatch(successMessage(false));
  }, []);

  // useEffect(() => {
  //   const tokenString = localStorage.getItem("user-token");
  //   if (tokenString) {
  //     dispatch(getAuthUser(tokenString));
  //   } else {
  //     navigate("/login");
  //   }
  // }, []);

  return (
    <div>
      <WrapperBody>
        <div className="container-fluid">
          <div className="row">
            <div className="d-flex justify-content-between mt-2">
              <h4>Change Password</h4>
              <div>
                {showEdit ? (
                  <button
                    className={showEdit ? " btn_bg_blue" : ""}
                    onClick={toggleEdit}>
                    Edit
                  </button>
                ) : (
                  <button className="grey-button" onClick={toggleEdit}>
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="my-5 col-md-6 ">
              <FormGroup className="w-100">
                <Label
                  htmlFor="currentPassword"
                  className="">
                  Current Password
                </Label>
                <InputGroup>
                  <Input
                    type={passwordShown1 ? "text" : "password"}
                    bsSize="lg"
                    id="currentPassword"
                    name="password"
                    disabled={showEdit}
                  />
                  <InputGroupText>
                    <i
                      onClick={togglePassword1}
                      style={{ cursor: "pointer" }}
                      className={
                        passwordShown1 ? "far fa-eye" : "far fa-eye-slash"
                      }></i>
                  </InputGroupText>
                </InputGroup>
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 my-4">
            <FormGroup className="w-100">
                <Label
                  htmlFor="newPassword"
                  className="">
                  New Password
                </Label>
                <InputGroup>
                  <Input
                    type={passwordShown2 ? "text" : "password"}
                    bsSize="lg"
                    id="newPassword"
                    name="password"
                    disabled={showEdit}
                  />
                  <InputGroupText>
                    <i
                      onClick={togglePassword2}
                      style={{ cursor: "pointer" }}
                      className={
                        passwordShown2 ? "far fa-eye" : "far fa-eye-slash"
                      }></i>
                  </InputGroupText>
                </InputGroup>
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 ">
            <FormGroup className="w-100">
                <Label
                  htmlFor="confirmPassword"
                  className="">
                  Confirm Password
                </Label>
                <InputGroup>
                  <Input
                    type={passwordShown3 ? "text" : "password"}
                    bsSize="lg"
                    id="confirmPassword"
                    name="password"
                    disabled={showEdit}
                  />
                  <InputGroupText>
                    <i
                      onClick={togglePassword3}
                      style={{ cursor: "pointer" }}
                      className={
                        passwordShown3 ? "far fa-eye" : "far fa-eye-slash"
                      }></i>
                  </InputGroupText>
                </InputGroup>
              </FormGroup>
            </div>
          </div>
        </div>
      </WrapperBody>
      <WrapperFooter>
        <div className="footer-body">
          <div className="d-flex align-items-center justify-content-end footer-content">
            <div>
              <button className="blue-btn">
                Save
              </button>
            </div>
          </div>
        </div>
      </WrapperFooter>
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