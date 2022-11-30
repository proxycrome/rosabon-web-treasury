import React, { useState, useEffect } from "react";
import { CLOSE_MODAL } from "../../../store/profile/actionTypes";
import styled from "styled-components";
import { UncontrolledTooltip, Alert } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { BVNConfirm } from "../../Accessories/BVNConfirm";
import ModalComponent from "../../ModalComponent";
import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Spinner from "../../common/loading";
import {
  updateUserKyc,
  verifyBvn,
  getCountries,
  getStates,
  getAuthUsers,
  getAllGender,
} from "../../../store/actions";
import moment from "moment";

const PersonalKYC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user_details = useSelector((state) => state.user_profile.users);

  const auth = useSelector((state) => state.auth);
  const { login, isLoggedIn } = auth;

  const user_profile = useSelector((state) => state.user_profile);
  const {
    loading,
    showBvnModal,
    bvnError,
    bvnMessage,
    countries,
    states,
    gender,
  } = user_profile;

  const activeGender = gender?.filter((item) => item.status === "ACTIVE");

  const date = new Date();
  const recentDate = moment(date).format("YYYY-MM-DD");
  const maximumDate = moment(recentDate).subtract(365 * 18, "days")?._d;

  // const success = useSelector((state) => state.auth.success);
  const [show, setShow] = useState(false);

  const data = {
    dateOfBirth: "",
    gender: "",
    bvn: "",
    // firstName: "",
    middleName: "",
    // lastName: "",
    name: "",
    houseNoAddress: "",
    state: "",
    city: "",
    country: "",
    phone: "",
    // email: "",
    countryId: 1,
  };

  const [formData, setformData] = useState(data);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setformData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e, route) => {
    e.preventDefault();

    const {
      dateOfBirth,
      gender,
      bvn,
      // firstName,
      middleName,
      // lastName,
      countryId,
      houseNoAddress,
      state,
      city,
      country,
      phone,
      // email,
    } = formData;

    let data = {
      isAssited: user_details && user_details.assited,
      isNewsLetters: user_details && user_details.newsLetters,
      isKyc: true,
      phone: phone ? phone.trim() : user_details?.phone,
      role: "INDIVIDUAL_USER",
      usage: "TREASURY",
      individualUser: {
        bvn: bvn ? bvn.trim() : user_details.individualUser.bvn,
        contactAddress: {
          city: city
            ? city.trim()
            : user_details?.individualUser?.address?.city,
          country: country
            ? country
            : user_details?.individualUser?.address?.country,
          houseNoAddress: houseNoAddress
            ? houseNoAddress.trim()
            : user_details?.individualUser?.address.houseNoAddress,
          state: state ? state : user_details?.individualUser?.address?.state,
        },
        countryId: +countryId,
        dateOfBirth: dateOfBirth
          ? String(moment(dateOfBirth, "YYYY-MM-DD").format("DD-MM-YYYY"))
          : user_details?.individualUser?.dateOfBirth,
        genderId: gender
          ? Number(gender)
          : user_details?.individualUser?.gender?.id,
        middleName: middleName
          ? middleName.trim()
          : user_details?.individualUser?.middleName,
      },
    };

    const pathCred = {
      navigate,
      route,
    };
    dispatch(updateUserKyc(data, pathCred, dispatch));
  };

  const handleVerifyBVN = (e) => {
    e.preventDefault();
    const { bvn, phone, dateOfBirth } = formData;

    const objData = {
      firstName: user_details?.individualUser?.firstName?.toUpperCase(),
      lastName: user_details?.individualUser?.lastName?.toUpperCase(),
      id: bvn ? bvn.trim() : user_details?.individualUser?.bvn,
      isSubjectConsent: true,
      phoneNumber: phone ? phone.trim() : user_details?.phone,
      dateOfBirth: dateOfBirth
        ? dateOfBirth
        : moment(
            user_details?.individualUser?.dateOfBirth,
            "DD-MM-YYYY"
          ).format("YYYY-MM-DD"),
    };
    dispatch(verifyBvn(objData));
  };

  const handleBVNModalClose = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  useEffect(() => {
    const tokenString = JSON.parse(localStorage.getItem("token"));
    if (tokenString) {
      dispatch(getAuthUsers());
      dispatch(getAllGender());
    } else {
      navigate("/login");
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getStates(formData.countryId));
  }, [formData.countryId]);

  // console.log(bvnError);
  // console.log(moment(maximumDate).format("YYYY-MM-DD"));

  return (
    <div>
      {user_details && !loading ? (
        <div className="">
          <div>
            <Toaster />
          </div>
          <div>
            <div className="" style={{ overflowY: "auto" }}>
              <WrapperBody>
                <div>
                  <div>
                    <div className="d-flex justify-content-between align-items-center">
                      <h3>Hello {user_details?.individualUser?.firstName},</h3>
                    </div>

                    <p>
                      Kindly update your profile, it will only take a few
                      minutes
                    </p>

                    <form autoComplete="off">
                      <h4>Personal Details</h4>
                      <div>
                        <div className="row">
                          <div className="col-md-6 col-lg-4">
                            <label>First Name</label>
                            <div className="input-group mb-4">
                              <input
                                className="form-control"
                                type="text"
                                placeholder={
                                  user_details?.individualUser?.firstName ||
                                  "Enter first name"
                                }
                                name="firstName"
                                value={user_details?.individualUser?.firstName}
                                onChange={handleChange}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4 ">
                            <label>Middle Name</label>
                            <div className="input-group mb-4">
                              <input
                                className="form-control"
                                type="text"
                                placeholder={
                                  user_details?.individualUser?.middleName ||
                                  "Enter middle name"
                                }
                                name="middleName"
                                onChange={handleChange}
                                defaultValue={
                                  formData.middleName ||
                                  user_details?.individualUser?.middleName
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-8 col-lg-4 pb-4">
                            <label>Last Name</label>
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={
                                  user_details?.individualUser?.lastName ||
                                  "Enter last name"
                                }
                                name="lastName"
                                value={user_details?.individualUser?.lastName}
                                onChange={handleChange}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 col-lg-4 ">
                            <label>Gender</label>
                            <div className="input-group mb-4">
                              <select
                                className="form-select form-select-lg mb-3 select-field"
                                aria-label=".form-select-lg"
                                onChange={handleChange}
                                defaultValue={
                                  formData.gender ||
                                  user_details?.individualUser?.gender?.id
                                }
                                name="gender"
                              >
                                <option value="" hidden>
                                  Select Gender...
                                </option>
                                {activeGender?.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.gender}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4 ">
                            <label>Date of Birth</label>
                            <div className="input-group mb-4">
                              <input
                                className="form-control"
                                placeholder=""
                                type="date"
                                onChange={handleChange}
                                name="dateOfBirth"
                                value={
                                  formData.dateOfBirth ||
                                  moment(
                                    user_details?.individualUser?.dateOfBirth,
                                    "DD-MM-YYYY"
                                  ).format("YYYY-MM-DD")
                                }
                                max={moment(maximumDate).format("YYYY-MM-DD")}
                              />
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4 ">
                            <label>Primary phone number</label>
                            <div className="input-group mb-4">
                              <input
                                className="form-control"
                                type="text"
                                placeholder={
                                  user_details?.phone ||
                                  "Enter Primary Phone number"
                                }
                                id="phone"
                                onChange={handleChange}
                                name="phone"
                                defaultValue={
                                  formData.phone || user_details?.phone
                                }
                              />
                            </div>
                            <UncontrolledTooltip
                              placement="bottom"
                              target="phone"
                            >
                              Please provide the phone number tied to your BVN
                            </UncontrolledTooltip>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 col-lg-8 ">
                            <label>Bank verification number (BVN)</label>
                            <div className="input-group">
                              <input
                                className="form-control"
                                placeholder="Bank verification number (BVN)"
                                type="text"
                                onChange={handleChange}
                                name="bvn"
                                defaultValue={
                                  formData.bvn ||
                                  user_details?.individualUser?.bvn
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-6 col-lg-4">
                            <button
                              type="button"
                              onClick={handleVerifyBVN}
                              className={
                                bvnMessage?.isNameMatched
                                  ? "grey-button"
                                  : "profile_vify_btn"
                              }
                              disabled={bvnMessage?.isNameMatched}
                            >
                              Verify
                            </button>
                          </div>
                          {bvnError && bvnError.message && (
                            <small className="text-danger">
                              BVN validation failed, please provide a correct details
                            </small>
                          )}
                          <div>
                            <div
                              style={{
                                position: "absolute",
                                top: "100px",
                                right: "300px",
                              }}
                            >
                              <ModalComponent
                                show={showBvnModal}
                                size={"md"}
                                handleClose={handleBVNModalClose}
                              >
                                <BVNConfirm
                                  show={showBvnModal}
                                  handleClose={handleBVNModalClose}
                                  firstName={bvnMessage?.data?.firstName}
                                  lastName={bvnMessage?.data?.lastName}
                                  bvn={bvnMessage?.data?.idNumber}
                                  phone={bvnMessage?.data?.mobile}
                                  nameMatch={bvnMessage?.isNameMatched}
                                  dateOfBirth={bvnMessage?.data?.dateOfBirth}
                                />
                              </ModalComponent>
                            </div>
                          </div>
                        </div>
                      </div>

                      <h4 className="pt-5">Contact Details</h4>
                      <div>
                        <div className="row d-flex align-items-baseline">
                          <div className="col-md-8 ">
                            <label>Email</label>
                            <div className="input-group mb-4">
                              <input
                                className="form-control"
                                type="text"
                                placeholder="Enter your email"
                                onChange={handleChange}
                                name="email"
                                value={user_details?.email}
                                disabled
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <label>Country of Residence</label>
                            <div className="input-group mb-4">
                              <select
                                className="form-select form-select-lg mb-3 select-field"
                                aria-label=".form-select-lg"
                                onChange={handleChange}
                                value={
                                  formData.countryId ||
                                  user_details?.individualUser
                                    ?.coutryOfResidence?.id
                                }
                                name="countryId"
                              >
                                <option value={0}></option>
                                {countries?.map((country) => (
                                  <option key={country.id} value={country.id}>
                                    {country.name}
                                  </option>
                                ))}
                              </select>
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
                                onChange={handleChange}
                                name="houseNoAddress"
                                defaultValue={
                                  formData.houseNoAddress ||
                                  user_details?.individualUser?.address
                                    ?.houseNoAddress
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-4 ">
                            <label>State</label>
                            <div className="input-group mb-2">
                              <select
                                className="form-select form-select-lg mb-3 select-field"
                                aria-label=".form-select-lg"
                                onChange={handleChange}
                                value={
                                  formData.state ||
                                  user_details?.individualUser?.address?.state
                                }
                                name="state"
                              >
                                <option value="">Select State...</option>
                                {states?.map((state) => (
                                  <option key={state.id} value={state.name}>
                                    {state.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-4 ">
                            <label>City</label>
                            <div className="input-group mb-4">
                              <input
                                className="form-control"
                                placeholder="City"
                                type="text"
                                onChange={handleChange}
                                name="city"
                                value={
                                  formData.city ||
                                  user_details?.individualUser?.address?.city
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-4">
                            <label>Nationality</label>
                            <div className="input-group">
                              <select
                                className="form-select form-select-lg mb-3 select-field"
                                aria-label=".form-select-lg"
                                onChange={handleChange}
                                value={
                                  formData.country ||
                                  user_details?.individualUser?.address?.country
                                }
                                name="country"
                              >
                                <option value="">
                                  Select your Nationality...
                                </option>
                                {countries?.map((country) => (
                                  <option key={country.id} value={country.name}>
                                    {country.name}
                                  </option>
                                ))}
                              </select>
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
                      {(formData.firstName ||
                        user_details?.individualUser?.firstName) &&
                      (formData.lastName ||
                        user_details?.individualUser?.lastName) &&
                      (formData.dateOfBirth ||
                        user_details?.individualUser?.dateOfBirth) &&
                      (formData.phone || user_details?.phone) &&
                      (formData.email || user_details?.email) &&
                      (formData.houseNoAddress ||
                        user_details?.individualUser?.address
                          ?.houseNoAddress) &&
                      (formData.state ||
                        user_details?.individualUser?.address?.state) &&
                      (formData.city ||
                        user_details?.individualUser?.address?.city) &&
                      (formData.country ||
                        user_details?.individualUser?.address?.country) &&
                      (formData.gender ||
                        user_details?.individualUser?.gender?.gender) &&
                      (formData.bvn || user_details?.individualUser?.bvn) &&
                      bvnMessage?.success ? (
                        <button
                          className=""
                          onClick={(e) => handleSubmit(e, "/profile")}
                        >
                          Save and Continue
                        </button>
                      ) : (
                        <button className="" disabled>
                          Save and Continue
                        </button>
                      )}
                    </div>
                    <div>
                      {(formData.firstName ||
                        user_details?.individualUser?.firstName) &&
                      (formData.lastName ||
                        user_details?.individualUser?.lastName) &&
                      (formData.dateOfBirth ||
                        user_details?.individualUser?.dateOfBirth) &&
                      (formData.phone || user_details?.phone) &&
                      (formData.email || user_details?.email) &&
                      (formData.houseNoAddress ||
                        user_details?.individualUser?.address
                          ?.houseNoAddress) &&
                      (formData.state ||
                        user_details?.individualUser?.address?.state) &&
                      (formData.city ||
                        user_details?.individualUser?.address?.city) &&
                      (formData.country ||
                        user_details?.individualUser?.address?.country) &&
                      (formData.gender ||
                        user_details?.individualUser?.gender?.gender) &&
                      (formData.bvn || user_details?.individualUser?.bvn) &&
                      bvnMessage?.success ? (
                        <button
                          className="blue-btn"
                          onClick={(e) => handleSubmit(e, "/plan-product")}
                        >
                          Save and Invest Now
                        </button>
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
        <div className="vh-100 w-100">
          <Spinner />
        </div>
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
    cursor: pointer;
    padding: 10px 15px;
    &:disabled {
      cursor: not-allowed;
    }
  }
  .blue-btn {
    color: #f2f2f2;
    background: #111e6c;
  }
`;
const WrapperBody = styled.div`
  .dashboard {
    padding: 10px;
    background: #111e6c;
    border-radius: 8px;
    color: #ffffff;
  }
  padding: 4rem 5rem;
  @media (max-width: 600px) {
    padding: 6rem 3rem;
  }
  .select-field {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 15px;
    letter-spacing: -0.01em;
    color: #242424;
    padding: 15px;
  }
  h4 {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    text-transform: capitalize;
    color: #222222;
    padding-bottom: 15px;
  }
  h3 {
    font-style: normal;
    font-weight: 700;
    font-size: 33px;
    line-height: 40px;
    color: #222222;
  }
  p {
    font-style: normal;
    font-weight: 500;
    font-size: 19px;
    line-height: 23px;
    letter-spacing: -0.02em;
    color: #333333;
    padding-bottom: 25px;
  }
  input {
    width: 239.5px;
    height: 54px;
    border: 1.5px solid #e0e0e0;
    border-radius: 8px;
    padding-left: 20px;
  }

  select {
    height: 54px;
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

  button {
    background: #f2f2f2;
    border-radius: 10px;
    outline: none;
    border: none;
    cursor: pointer;
    padding: 10px 15px;
    &:disabled {
      cursor: not-allowed;
    }
  }

  .grey-button {
    padding: 10px 10px;
    margin-top: 40px;
    border-radius: 8px;
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 21px;
    text-align: right;
    background: #f2f2f2;
    color: #ffffff;
  }
`;
