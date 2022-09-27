import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import User from "../../../asset/user.png";
import { uploadPersonalDocument } from "../../../redux/actions/updateProfile/uploadDocument.action";
import { successMessage } from "../../../redux/actions/auth/SignupAction";
import plus from "../../../asset/plus.svg";

const MoreDetails = () => {
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
    dispatch(uploadPersonalDocument(data));
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
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="row">
              <div className="d-flex justify-content-between mt-2">
                <h4>
                  Director 1{" "}
                  <span className="pl-5">
                    <i className="fa-solid fa-angle-down arrow"></i>
                  </span>
                </h4>
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
            <div className="details-content">
              <div className="image-holder">
                <div className="row">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="d-flex align-items-center justify-content-center">
                      <img className="image-fluid" src={User} alt="User" />
                      <div>
                        <h5 className="">Upload ID (front)</h5>
                        <p className="">jpg, png. 2 MB</p>
                      </div>
                    </div>
                    <div>
                      <button className="grey-button" disabled={!showEdit}>
                        Choose File
                      </button>  
                    </div>
                    {/* <button>Choose file</button> */}
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 ">
                  <label>First Name</label>
                  <div className="input-group mb-4">
                    <input
                      className="form-control"
                      placeholder="First Name"
                      disabled={showEdit}
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-md-4 ">
                  <label>Middle Name</label>
                  <div className="input-group mb-4">
                    <input
                      className="form-control"
                      placeholder="Middle Name"
                      disabled={showEdit}
                      type="text"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <label>Last Name</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      disabled={showEdit}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col ">
                  <label>Company Address</label>
                  <div className="input-group mb-4">
                    <input
                      className="form-control"
                      placeholder=""
                      type="text"
                      disabled={showEdit}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8 ">
                  <label>Email Address</label>
                  <div className="input-group mb-4">
                    <input
                      className="form-control"
                      placeholder=""
                      type="text"
                      disabled={showEdit}
                    />
                  </div>
                </div>
                <div className="col-md-4 ">
                  <label>Phone Number</label>
                  <div className="input-group mb-4">
                    <input
                      className="form-control"
                      placeholder=""
                      type="text"
                      disabled={showEdit}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-8 ">
                      <label>Bank verification number (BVN)</label>
                      <div className="input-group mb-4">
                        <input
                          className="form-control"
                          placeholder="Bank verification number (BVN)"
                          disabled={showEdit}
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-4">
                      <button
                        //   type="button"
                        //   onClick={() => setShow(true)}
                        className="profile_vify_btn">
                        Verify
                      </button>
                    </div>

                    <div>
                      <div
                        style={{
                          position: "absolute",
                          top: "100px",
                          right: "300px",
                        }}>
                        {/* <ModalComponent
                            show={show}
                            size={"md"}
                            handleClose={() => setShow(false)}>
                            <BVNConfirm show={show} handleClose={() => setShow(false)}/>
                            </ModalComponent> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 ">
                  <label>ID Type</label>
                  <div className="input-group mb-4">
                    <input
                      className="position-relative form-control"
                      placeholder="First Name"
                      disabled={showEdit}
                      type="text"
                    />
                    <span className=" input-font-awe">
                      <i className="fa-solid fa-angle-down"></i>
                    </span>
                  </div>
                </div>
                <div className="col-md-6 ">
                  <label>ID Number</label>
                  <div className="input-group mb-4">
                    <input
                      className="form-control"
                      placeholder="Middle Name"
                      disabled={showEdit}
                      type="text"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="d-flex align-items-center mt-5">
                  <img src={plus} alt="plus" className="mx-2"/>
                  <span style={{color: '#111E6C', marginRight: '30px'}}> Add More Directors</span>
                </div>
              </div>
            </div>
          </form>
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

export default MoreDetails;

const WrapperBody = styled.div`
  padding: 0 4rem 7rem 1rem;
  .details-content {
    padding-top: 70px;
  }
  @media (max-width: 560px) {
    padding: 0 1rem 7rem 1rem;
  }

  .arrow {
    font-size: 16px;
    margin-left: 10px;
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
  .details-content {
    padding-top: 45px;
  }
  .grey-button {
    background: #f2f2f2;
    color: #111e6c;
  }
  .image-holder {
    padding-bottom: 50px;
    /* padding-top: 50px; */
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

  h5 {
    font-style: normal;
    font-size: 15px;
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
  padding: 40px 80px;
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