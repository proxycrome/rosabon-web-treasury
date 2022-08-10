import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { BVNConfirm } from "../Accessories/BVNConfirm";
import ModalComponent from "../ModalComponent";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuthUser,
  updateUserCompanyKYC,
} from "../../redux/actions/personalInfo/userProfile.actions";

const PersonalKYC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const count = useSelector((state) => state.auth.signup_btn);
  const user_details = useSelector((state) => state.user_profile.users);
  const [show, setShow] = useState(false);

  const data = {
    email: user_details.company.email,
    isAssited: true,
    isNewsLetters: true,
    phone: user_details.company.phone,
    source: user_details.company.source,
    sourceOthers: user_details.company.sourceOthers,
    refferedBy: user_details.company.refferedBy,
    firstName: user_details.company.firstName,
    lastName: user_details.company.lastName,
    middleName: user_details.company.middleName,
    name: user_details.company.name,
    dateOfBirth: "",
    gender: "",
    bvn: "",
    role: "INDIVIDUAL_USER",
    usage: "TREASURY",
    isKyc: true,
    status: user_details.company.status,
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
    const {
      email,
      isAssited,
      isNewsLetters,
      phone,
      source,
      sourceOthers,
      firstName,
      lastName,
      middleName,
      namename,
      dateOfBirth,
      gender,
      bvn,
      role,
      usage,
      statusstatus,
      refferedBy,
      isKyc,
      status,
    } = formData;

    let data = {
      email,
      isAssited,
      isNewsLetters,
      phone,
      source,
      sourceOthers,
      firstName,
      lastName,
      middleName,
      namename,
      dateOfBirth,
      gender,
      bvn,
      role,
      usage,
      statusstatus,
      refferedBy,
      isKyc,
      status,
    };
    // console.log(data)
    dispatch(updateUserCompanyKYC(data));
  };

  useEffect(() => {
    const tokenString = localStorage.getItem("user-token");
    if (tokenString) {
      dispatch(getAuthUser(tokenString));
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    console.log(user_details);
  }, [user_details]);

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

                  <form autoComplete="off" onSubmit={handleSubmit}>
                    <h4>Personal Details</h4>
                    <div>
                      <div class="row">
                        <div class="col-md-6 col-lg-4">
                          <label>First Name</label>
                          <div class="input-group mb-4">
                            <input
                              class="form-control"
                              type="text"
                              placeholder={
                                user_details && user_details.company.firstName
                              }
                            />
                          </div>
                        </div>
                        <div class="col-md-6 col-lg-4 ">
                          <label>Middle Name</label>
                          <div class="input-group mb-4">
                            <input
                              class="form-control"
                              type="text"
                              placeholder={
                                user_details && user_details.company.middleName
                              }
                            />
                          </div>
                        </div>
                        <div class="col-md-8 col-lg-4 pb-4">
                          <label>Last Name</label>
                          <div class="input-group">
                            <input
                              type="text"
                              class="form-control"
                              placeholder={
                                user_details && user_details.company.lastName
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6 col-lg-4 ">
                          <label>Gender</label>
                          <div class="input-group mb-4">
                            <input
                              class="form-control"
                              placeholder="Gender"
                              type="text"
                              onChange={handleChange}
                              name="gender"
                              value={formData.gender}
                            />
                          </div>
                        </div>
                        <div class="col-md-6 col-lg-4 ">
                          <label>Date of Birth</label>
                          <div class="input-group mb-4">
                            <input
                              class="form-control"
                              placeholder="Date of Birth"
                              type="text"
                              onChange={handleChange}
                              name="dateOfBirth"
                              value={formData.dateOfBirth}
                            />
                          </div>
                        </div>
                        <div class="col-md-6 col-lg-4 ">
                          <label>Primary phone number</label>
                          <div class="input-group mb-4">
                            <input
                              class="form-control"
                              type="text"
                              placeholder={
                                user_details && user_details.company.phone
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-6 col-lg-8 ">
                          <label>Bank verification number (BVN)</label>
                          <div class="input-group">
                            <input
                              class="form-control"
                              placeholder="Bank verification number (BVN)"
                              type="text"
                              onChange={handleChange}
                              name="bvn"
                              value={formData.bvn}
                            />
                          </div>
                        </div>
                        <div class="col-md-6 col-lg-4">
                          <button
                            type="button"
                            onClick={() => setShow(true)}
                            className="profile_vify_btn"
                          >
                            Verify
                          </button>
                        </div>
                        <div>
                          <div
                            style={{
                              position: "absolute",
                              top: "100px",
                              right: "300px",
                            }}
                          >
                            <ModalComponent
                              show={show}
                              size={"md"}
                              handleClose={() => setShow(false)}
                            >
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
                      <div class="row">
                        <div class="col-md-8 ">
                          <label>Email</label>
                          <div class="input-group mb-4">
                            <input
                              class="form-control"
                              type="text"
                              placeholder={
                                user_details && user_details.company.email
                              }
                            />
                          </div>
                        </div>
                        <div class="col-md-4 ">
                          <label>Country of Residence</label>
                          <div class="input-group mb-4">
                            <input
                              class="form-control"
                              placeholder="Middle Name"
                              type="text"
                              onChange={handleChange}
                              name="coutryOfResidence"
                              value={formData.coutryOfResidence}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class=" ">
                          <label>Contact Address</label>
                          <div class="input-group mb-4">
                            <input
                              class="form-control"
                              placeholder="Contact Address"
                              type="text"
                              onChange={handleChange}
                              name="houseNoAddress"
                              value={formData.houseNoAddress}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-4 ">
                          <label>State</label>
                          <div class="input-group mb-4">
                            <input
                              class="form-control"
                              placeholder="State"
                              type="text"
                              onChange={handleChange}
                              name="state"
                              value={formData.state}
                            />
                          </div>
                        </div>
                        <div class="col-md-4 ">
                          <label>City</label>
                          <div class="input-group mb-4">
                            <input
                              class="form-control"
                              placeholder="City"
                              type="text"
                              onChange={handleChange}
                              name="city"
                              value={formData.city}
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <label>Nationality</label>
                          <div class="input-group">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Nationality"
                              onChange={handleChange}
                              name="country"
                              value={formData.country}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </WrapperBody>

            <WrapperFooter>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <Link to="/profile-details">
                    <button className="">Save and Invest Now</button>
                  </Link>
                </div>
                <div>
                  <Link to="/profile-details">
                    <button className="">Save and Invest Now</button>
                  </Link>
                </div>
              </div>
            </WrapperFooter>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalKYC;

const WrapperFooter = styled.div`
  background: #ffffff;
  box-shadow: 8px 0px 18px rgba(173, 173, 173, 0.25);
  padding: 40px 80px;
  @media (max-width: 600px) {
    padding: 40px 20px;
  }
  button {
    background: #f2f2f2;
    border-radius: 10px;
    outline: none;
    border: none;
    padding: 10px 10px;
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
