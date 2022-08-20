import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { BVNConfirm } from "../Accessories/BVNConfirm";
import ModalComponent from "../ModalComponent";
import { Link, useNavigate } from "react-router-dom";
import { getAuthUser } from "../../redux/actions/personalInfo/userProfile.actions";

const ProfileUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const count = useSelector((state) => state.auth.signup_btn);
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   const tokenString = localStorage.getItem("user-token");
  //   if (tokenString) {
  //     dispatch(getAuthUser());
  //   } else {
  //     navigate("/login");
  //   }
  // }, []);

  return (
    <div>
      <div className="">
        <div>
          <div className="" style={{ overflowY: "auto" }}>
            <WrapperBody>
              <div>
                <div>
                  <h3>Hello Ekiyee,</h3>
                  <p>
                    Kindly update your profile, it will only take a few minutes
                  </p>
                  <h4>Personal Details</h4>
                  <div>
                    <div className="row">
                      <div className="col-md-6 col-lg-4">
                        <label>First Name</label>
                        <div className="input-group mb-4">
                          <input
                            className="form-control"
                            placeholder="First Name"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 ">
                        <label>Middle Name</label>
                        <div className="input-group mb-4">
                          <input
                            className="form-control"
                            placeholder="Middle Name"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-md-8 col-lg-4 pb-4">
                        <label>Last Name</label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Last Name"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 col-lg-4 ">
                        <label>Gender</label>
                        <div className="input-group mb-4">
                          <input
                            className="form-control"
                            placeholder="Gender"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 ">
                        <label>Date of Birth</label>
                        <div className="input-group mb-4">
                          <input
                            className="form-control"
                            placeholder="Date of Birth"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-4 ">
                        <label>Primary phone number</label>
                        <div className="input-group mb-4">
                          <input
                            className="form-control"
                            placeholder="Primary phone number"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-8 ">
                        <label>Bank verification number (BVN)</label>
                        <div className="input-group mb-4">
                          <input
                            className="form-control"
                            placeholder="Bank verification number (BVN)"
                            type="text"
                          />
                        </div>
                      </div>

                      <div className="col-md-4 ">
                        <button
                          type="button"
                          onClick={() => setShow(true)}
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
                          <ModalComponent
                            show={show}
                            size={"md"}
                            handleClose={() => setShow(false)}>
                            <BVNConfirm
                              show={show}
                              handleClose={() => setShow(false)}
                            />
                          </ModalComponent>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h4 className="pt-5">Contact Details</h4>
                  <div>
                    <div className="row">
                      <div className="col-md-8 ">
                        <label>Email</label>
                        <div className="input-group mb-4">
                          <input
                            className="form-control"
                            placeholder="Email"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-md-4 ">
                        <label>Country of Residence</label>
                        <div className="input-group mb-4">
                          <input
                            className="form-control"
                            placeholder="Middle Name"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className=" ">
                        <label>Contact Address</label>
                        <div className="input-group mb-4">
                          <input
                            className="form-control"
                            placeholder="Contact Address"
                            type="text"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 ">
                        <label>State</label>
                        <div className="input-group mb-4">
                          <input
                            className="form-control"
                            placeholder="State"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-md-4 ">
                        <label>City</label>
                        <div className="input-group mb-4">
                          <input
                            className="form-control"
                            placeholder="City"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <label>Nationality</label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Nationality"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </WrapperBody>
            <WrapperFooter>
              <Link to="/profile-details">
                <button className="">Save and Continue</button>
              </Link>
              <Link to="/profile-details">
                <button className="">Save and Invest Now</button>
              </Link>
            </WrapperFooter>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;

const WrapperFooter = styled.div`
  width: 100%;
  height: 114px;
  background: #ffffff;
  box-shadow: 8px 0px 18px rgba(173, 173, 173, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5rem;

  button {
    width: 228px;
    height: 44px;
    background: #f2f2f2;
    border-radius: 10px;
    outline: none;
    border: none;
  }
`;
const WrapperBody = styled.div`
  padding: 6rem 5rem;
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
    font-weight: 500;
    font-size: 19px;
    line-height: 23px;
    letter-spacing: -0.02em;
    color: #333333;
    padding-bottom: 65px;
  }
  input {
    width: 239.5px;
    height: 54px;
    border: 1.5px solid #e0e0e0;
    border-radius: 8px;
    padding-left: 20px;
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
    padding: 10px 10px;
    margin-top: 40px;
    background: #111e6c;
    border-radius: 8px;
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 21px;
    text-align: right;
    color: #ffffff;
  }
`;
