import React, { useState, useEffect } from "react";
import { config } from "../../redux/config";
import { headers } from "../../redux/headers";
import axios from "axios";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { BVNConfirm } from "../Accessories/BVNConfirm";
import ModalComponent from "../ModalComponent";
import { Link, useNavigate } from "react-router-dom";
import {
  updateUserCompanyKYC,
  getAuthUsers,
} from "../../redux/actions/personalInfo/userProfile.actions";
import { successMessage } from "../../redux/actions/auth/SignupAction";

const PersonalKYC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user_details = useSelector((state) => state.user_profile.users);

  const auth = useSelector((state) => state.auth);
  const { login, isLoggedIn } = auth;

  const user_profile = useSelector((state) => state.user_profile);
  const { users } = user_profile;

  // const success = useSelector((state) => state.auth.success);
  const [show, setShow] = useState(false);

  const data = {
    dateOfBirth: "",
    gender: "",
    bvn: "",
  };

  const [formData, setformData] = useState(data);
  const [listLgas, setListLgas] = useState([]);
  const [listStates, setListStates] = useState([]);
  const [listCountries, setListCountries] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { dateOfBirth, gender, bvn } = formData;

    let data = {
      email: user_details.email,
      isAssited: true,
      isNewsLetters: true,
      phone: user_details.phone,
      source: user_details.individualUser.source,
      sourceOthers: user_details.individualUser.sourceOthers,
      refferedBy: user_details.individualUser.refferedBy,
      firstName: user_details.individualUser.firstName,
      lastName: user_details.individualUser.lastName,
      middleName: user_details.individualUser.middleName,
      role: "INDIVIDUAL_USER",
      usage: "TREASURY",
      isKyc: true,
      status: user_details.individualUser.status,
      dateOfBirth,
      gender,
      bvn,
    };
    // console.log(data)
    dispatch(updateUserCompanyKYC(data));
  };

  const getLGAs = async () => {
    try {
      const response = await axios.post(`${config.rosobon}users`, headers);
      const lgaData = await response.data;
      setListLgas(lgaData);
    } catch (error) {}
  };

  const getStates = async () => {
    try {
      const response = await axios.get(
        `${config.rosobon}states?page=0&size=37`,
        headers
      );
      const stateData = await response.data;
      setListStates(stateData);
    } catch (error) {}
  };

  const getCountry = async () => {
    try {
      const response = await axios.get(`${config.rosobon}countries`, headers);
      const countryData = await response.data;
      console.log(countryData)
      setListCountries(countryData);
    } catch (error) {}
  };
  
  const verifyBVN = async () => {
    try {
      const response = await axios.post(`${config.rosobon}users`, headers);
      const countryData = await response.data;
      setListCountries(countryData);
    } catch (error) {}
  };

  useEffect(() => {
    const tokenString = JSON.parse(localStorage.getItem("user-token"));
    if (tokenString) {
      dispatch(getAuthUsers(tokenString));
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (users && users.kyc && users.role === "INDIVIDUAL_USER") {
      navigate("/personal-profile");
    } else if (users && users.kyc && users.role === "COMPANY") {
      navigate("/company-profile");
    }
  }, [isLoggedIn, users]);

  useEffect(() => {
    getLGAs();
    getStates();
    getCountry();
  }, []);

  console.log(listCountries);

  return (
    <div>
      {user_details ? (
        <div className="">
          <div>
            <div className="" style={{ overflowY: "auto" }}>
              <WrapperBody>
                <div>
                  <div>
                    <h3>Hello {user_details.individualUser.firstName},</h3>
                    <p>
                      Kindly update your profile, it will only take a few
                      minutes
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
                                  user_details &&
                                  user_details.individualUser.firstName
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
                                  user_details &&
                                  user_details.individualUser.middleName
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
                                  user_details &&
                                  user_details.individualUser.lastName
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
                                type="date"
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
                                placeholder={user_details && user_details.phone}
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
                                placeholder={user_details && user_details.email}
                              />
                            </div>
                          </div>
                          <div class="col-md-4 ">
                            <label>Country of Residence</label>
                            <label>How did you hear about us</label>
                            <select
                              className="form-select form-select-lg mb-3"
                              aria-label=".form-select-lg"
                              // onChange={handleValueChange}
                              name="source"
                            >

                              <option value="">Please choose an option</option>
                              <option value="ROSABON_SALES">
                                Rosabon sales executive
                              </option>
                              <option value="ANOTHER_USER">Another user</option>
                              <option value="OTHER">Others</option>
                            </select>
                            {/* <div class="input-group mb-4">
                              <input
                                class="form-control"
                                placeholder="Country of Residence"
                                type="text"
                                onChange={handleChange}
                                name="coutryOfResidence"
                                value={formData.coutryOfResidence}
                              />
                            </div> */}
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
                <div className="footer-body">
                  <div className="d-flex align-items-center justify-content-between footer-content">
                    <div>
                      <button className="">Save and Invest Now</button>
                    </div>
                    <div>
                      {formData.dateOfBirth &&
                      formData.gender &&
                      formData.bvn ? (
                        <Link to="/personal-profile">
                          <button className="blue-btn">
                            Save and Invest Now
                          </button>
                        </Link>
                      ) : (
                        <button className="" disabled>
                          Save and Invest Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </WrapperFooter>
            </div>
          </div>
        </div>
      ) : (
        <p>Please Wait...</p>
      )}
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
  @media (max-width: 450px) {
    .footer-content {
      display: block !important;
    }
    .footer-body {
      padding-left: 25%;
    }
    button {
      margin: 10px 0;
    }
  }
  button {
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
const WrapperBody = styled.div`
  padding: 6rem 5rem;
  @media (max-width: 600px) {
    padding: 6rem 3rem;
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
