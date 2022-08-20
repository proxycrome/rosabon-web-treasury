import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { changePersonalPassword } from "../../../redux/actions/updateProfile/changePassword.action";
import { successMessage } from "../../../redux/actions/auth/SignupAction";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(true);
  const toggleEdit = () => {
    setShowEdit(!showEdit);
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
            <div className="d-flex justify-content-between">
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
            <div className="py-5 col-md-6 ">
              <label>Current Password</label>
              <div className="input-group mb-4">
                <input
                  className="position-relative form-control"
                  placeholder="First Name"
                  aria-label="First Name..."
                  type="password"
                  disabled={showEdit}
                />
                <span className=" input-font-awe">
                  <i className="far fa-eye-slash"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 ">
              <label>New Password</label>
              <div className="input-group mb-4">
                <input
                  className="position-relative form-control"
                  placeholder="First Name"
                  aria-label="First Name..."
                  type="password"
                  disabled={showEdit}
                />
                <span className=" input-font-awe">
                  <i className="far fa-eye-slash"></i>
                </span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 ">
              <label>Confirm Password</label>
              <div className="input-group mb-4">
                <input
                  className="position-relative form-control"
                  placeholder="First Name"
                  aria-label="First Name..."
                  type="password"
                  disabled={showEdit}
                />
                <span className=" input-font-awe">
                  <i className="far fa-eye-slash"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </WrapperBody>
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
