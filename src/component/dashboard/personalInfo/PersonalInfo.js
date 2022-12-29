import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UncontrolledTooltip, Alert } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getAuthUsers,
  getCountries,
  getStates,
  getLgas,
  sendOtp,
  updateContactDetails,
  verifyPhone,
  updatePersonalInfo,
} from "../../../store/actions";
import ModalComponent from "../../ModalComponent";
import { OTPVerify } from "../../Accessories/BVNConfirm";
import {
  CLEAR_OTP,
  CLOSE_MODAL,
  CLEAR_MESSAGES,
} from "../../../store/profile/actionTypes";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [showEditProf, setShowEditProf] = useState(true);
  const [showEditCont, setShowEditCont] = useState(true);
  const [showEditEmpoy, setShowEditEmpoy] = useState(true);
  const [showEditNOK, setShowEditNOK] = useState(true);
  const [validateInfo, setValldateInfo] = useState(null);

  const {
    users,
    validateEmailOtp,
    countries,
    states,
    lgas,
    showEmailOtpModal,
    otp,
    otpError,
  } = useSelector((state) => state.user_profile);

  const {
    loading,
    phoneMsg,
    phoneMsgError,
    showPhoneOtpModal,
    contactMsg,
    contactMsgError,
    personalInfoMsg,
    personalInfoMsgError,
    infoSuccess,
    validatePhone,
  } = useSelector((state) => state.updateProfile);

  const toggleProf = (e) => {
    e.preventDefault();
    setShowEditProf(!showEditProf);
  };
  const toggleCont = (e) => {
    setShowEditCont(!showEditCont);
  };
  const toggleEmploy = (e) => {
    e.preventDefault();
    setShowEditEmpoy(!showEditEmpoy);
  };
  const toggleNOK = (e) => {
    e.preventDefault();
    setShowEditNOK(!showEditNOK);
  };

  const createOtp = (otp) => {
    setToken(otp);
  };

  const data = {
    houseNoAddress: "",
    state: "",
    city: "",
    country: "",
    stateId: "",
    secondaryPhoneNumber: "",
    countryId: 1,
    lgaId: "",
    occupation: "",
    employerName: "",
    employerAddress: "",
    email: "",
    name: "",
    nokAddress: "",
    phone: "",
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

  const handlePhoneValueChange = (value) => {
    setformData({
      ...formData,
      secondaryPhoneNumber: value,
    });
  };

  const handleNokPhoneValueChange = (value) => {
    setformData({
      ...formData,
      phone: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectState = () => {
      return states?.find(
        (state) => state.name === users?.individualUser?.state
      ).id;
    };

    const selectLga = () => {
      return lgas?.find((lga) => lga.name === users?.individualUser?.lga).id;
    };

    const {
      houseNoAddress,
      state,
      secondaryPhoneNumber,
      country,
      countryId,
      city,
    } = formData;

    let contactData = {
      address: {
        houseNoAddress: houseNoAddress
          ? houseNoAddress
          : users?.individualUser?.address?.houseNoAddress,
        state: state ? state : users?.individualUser?.address?.state,
        country: country ? country : users?.individualUser?.address?.country,
        city: city ? city : users?.individualUser?.address?.city,
      },
      secondaryPhoneNumber: secondaryPhoneNumber
        ? secondaryPhoneNumber.startsWith("0")
          ? secondaryPhoneNumber.trim()
          : secondaryPhoneNumber.startsWith("234")
          ? secondaryPhoneNumber.replace(/234/, "0")
          : "0" + secondaryPhoneNumber
        : users?.individualUser?.secondaryPhoneNumber
        ? users?.individualUser?.secondaryPhoneNumber
        : users.phone,
      countryId: countryId
        ? Number(countryId)
        : users?.individualUser?.coutryOfResidence?.id,
    };

    dispatch(updateContactDetails(contactData));
  };

  const handleInfoSubmit = (e) => {
    e.preventDefault();
    const {
      occupation,
      employerName,
      employerAddress,
      email,
      name,
      nokAddress,
      phone,
    } = formData;

    let PersonalData = {
      employmentDetail: {
        employerAddress: employerAddress
          ? employerAddress
          : users?.individualUser?.employmentDetail?.employerAddress,
        employerName: employerName
          ? employerName
          : users?.individualUser?.employmentDetail?.employerName,
        occupation: occupation
          ? occupation
          : users?.individualUser?.employmentDetail?.occupation,
      },
      nokDetail: {
        email: email ? email : users?.individualUser?.nokDetail?.email,
        name: name ? name : users?.individualUser?.nokDetail?.name,
        nokAddress: nokAddress
          ? nokAddress
          : users?.individualUser?.nokDetail?.address,
        phone: phone ? phone : users?.individualUser?.nokDetail?.phone,
      },
    };

    dispatch(updatePersonalInfo(PersonalData));
    dispatch(getAuthUsers());
  };

  useEffect(() => {
    if (contactMsg || personalInfoMsg) {
      dispatch(getAuthUsers());
      setShowEditCont(true);
      setShowEditEmpoy(true);
      setShowEditNOK(true);
    }
  }, [contactMsg, personalInfoMsg]);

  // useEffect(() => {
  //   dispatch(successMessage(false));
  // }, [dispatch]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    dispatch(sendOtp());
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const { secondaryPhoneNumber } = formData;
    dispatch(
      verifyPhone(
        secondaryPhoneNumber.startsWith("0")
          ? secondaryPhoneNumber.trim()
          : secondaryPhoneNumber.startsWith("234")
          ? secondaryPhoneNumber.replace(/234/, "0")
          : secondaryPhoneNumber.startsWith("+234")
          ? secondaryPhoneNumber.replace(/\+234/, "0")
          : "0" + secondaryPhoneNumber ||
            users?.individualUser?.secondaryPhoneNumber.startsWith("+234")
          ? users?.individualUser?.secondaryPhoneNumber.replace(/\+234/, "0")
          : users?.individualUser?.secondaryPhoneNumber || users?.phone
      )
    );

  };

  const handlePhoneData = (data) => {
    setValldateInfo(data);
  };

  const handleOTPModalClose = () => {
    dispatch({ type: CLOSE_MODAL });
    dispatch({ type: CLEAR_MESSAGES });
    dispatch({ type: CLEAR_OTP });
  };

  useEffect(() => {
    if (validateEmailOtp) {
      handleOTPModalClose();
      toggleCont();
    }
  }, [validateEmailOtp]);

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getStates(formData.countryId));
  }, [dispatch, formData.countryId]);

  return (
    <div>
      <form
        autoComplete="off"
        onSubmit={(e) => {
          handleSubmit(e);
          handleInfoSubmit(e);
        }}
      >
        <WrapperBody>
          <div className="container-fluid">
            <div>
              <div className="row">
                <div className="d-flex justify-content-between mt-2">
                  <h4>Personal Details</h4>
                  <div>
                    {/* {showEditProf ? (
                      <button onClick={toggleProf} disabled>Edit</button>
                    ) : (
                      <button className="grey-button" onClick={toggleProf}>
                        Save
                      </button>
                    )} */}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-4">
                  <label>First Name</label>
                  <div className="input-group mb-4">
                    <input
                      className="form-control"
                      type="text"
                      value={users?.individualUser?.firstName}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <label>Middle Name</label>
                  <div className="input-group mb-4">
                    <input
                      className="form-control"
                      type="text"
                      defaultValue={users?.individualUser?.middleName}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-8 col-lg-4 pb-md-4">
                  <label>Last Name</label>
                  <div className="input-group mb-4">
                    <input
                      type="text"
                      className="form-control"
                      value={users?.individualUser?.lastName}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-4">
                  <label>Gender</label>
                  <div className="input-group mb-4">
                    <input
                      type="text"
                      className="form-control text-capitalize"
                      value={users?.individualUser?.gender?.gender}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <label>Date of Birth</label>
                  <div className="input-group mb-4">
                    <input
                      className="form-control"
                      placeholder="dd-mm-yyyy"
                      type="text"
                      value={users?.individualUser?.dateOfBirth}
                      disabled
                    />
                    {/* {showEditProf && (
                      <span className="input-font-awe">
                        <i className="fa-solid fa-calendar"></i>
                      </span>
                    )} */}
                  </div>
                </div>
                <div className="col-md-8 col-lg-4 pb-md-4 mb-4">
                  <label>Primary phone number</label>
                  <div className="input-group">
                    <input
                      type="tel"
                      className="form-control"
                      value={users?.phone}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-8 ">
                  <label>Contact Person Email Address</label>
                  <div className="input-group mb-4">
                    <input
                      className="form-control"
                      type="text"
                      value={users?.email}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-4 ps-2 mb-4">
                  <label>BVN</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value={users?.individualUser?.bvn}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4 ">
                  <label>Customer ID Number</label>
                  <div className="input-group mb-4">
                    <input
                      className="form-control"
                      placeholder="Customer ID Number"
                      type="text"
                      value={users?.id}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="row">
                <div className="d-flex align-items-center justify-content-between">
                  <h4 className="pt-5">Contact Details</h4>
                  {showEditCont ? (
                    <button type="button" onClick={handleSendOtp}>
                      Edit
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="grey-button"
                        onClick={(e) => {
                          toggleCont();
                          handleSubmit(e);
                        }}
                      >
                        Save
                      </button>
                    </>
                  )}
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
                      toggleCont={toggleCont}
                      otpData={otp?.data}
                    />
                  </ModalComponent>
                </div>
              </div>
              {contactMsg && (
                <Alert color="success" className="text-center">
                  Contact Details Updated Successfully
                </Alert>
              )}
              <div>
                <div className="row">
                  <div className="col-md-8">
                    <div className="col-12 mb-5">
                      <label>Secondary Phone Number</label>
                      <div className="d-md-flex align-items-end">
                        <div className="input-group" id="phone">
                          <PhoneInput
                            country={"ng"}
                            inputClass={`form-control phone-input ${
                              showEditCont ? "disable" : ""
                            }`}
                            buttonClass={`phone-select-field ${
                              showEditCont ? "disable" : ""
                            }`}
                            name="secondaryPhoneNumber"
                            value={formData.secondaryPhoneNumber}
                            // countryCodeEditable={false}
                            disabled={
                              showEditCont ||
                              validateInfo?.data?.secondaryPhoneVerified
                            }
                            onChange={(value) => handlePhoneValueChange(value)}
                            disableCountryCode={true}
                            placeholder={`${
                              users?.individualUser?.secondaryPhoneNumber?.startsWith(
                                "+234"
                              )
                                ? users?.individualUser?.secondaryPhoneNumber.replace(
                                    /\+234/,
                                    "0"
                                  )
                                : users?.individualUser?.secondaryPhoneNumber ??
                                  users?.phone ??
                                  "Secondary phone number"
                            }`}
                            disableDropdown
                            masks={{ ng: ".... ... ...." }}
                          />
                        </div>
                        <div className="m-2">
                          <button
                            className={
                              validateInfo?.data?.secondaryPhoneVerified
                                ? "grey-button"
                                : "profile_vify_btn"
                            }
                            disabled={
                              showEditCont ||
                              validateInfo?.data?.secondaryPhoneVerified
                            }
                            onClick={handleVerify}
                          >
                            Verify
                          </button>
                        </div>
                      </div>

                      <UncontrolledTooltip placement="bottom" target="phone">
                        Please provide your most active phone number here in
                        case this is different from your primary phone number
                      </UncontrolledTooltip>
                    </div>
                    <ModalComponent
                      show={showPhoneOtpModal}
                      size={"md"}
                      handleClose={handleOTPModalClose}
                    >
                      <OTPVerify
                        show={showPhoneOtpModal}
                        handleClose={handleOTPModalClose}
                        otpData={phoneMsg?.data?.otp}
                        secondPhone={formData.secondaryPhoneNumber}
                        phoneData={(data) => handlePhoneData(data)}
                      />
                    </ModalComponent>
                  </div>
                  <div className="col-md-4">
                    <label>Country of Residence</label>
                    <div className="input-group mb-4">
                      <select
                        className="form-select form-select-md mb-3"
                        aria-label=".form-select-md"
                        disabled={showEditCont}
                        onChange={handleChange}
                        name="countryId"
                        value={
                          formData?.countryId ||
                          users?.individualUser?.coutryOfResidence?.id
                        }
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
                  <div className="col-md-6 col-lg-4">
                    <label>State</label>
                    <select
                      className="form-select form-select-md mb-4"
                      aria-label=".form-select-md"
                      disabled={showEditCont}
                      onChange={handleChange}
                      value={
                        formData?.state || users?.individualUser?.address?.state
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
                  <div className="col-md-6 col-lg-4">
                    <label>City</label>
                    <div className="input-group mb-4">
                      <input
                        className="form-control"
                        placeholder={
                          users?.individualUser?.address?.city || "City"
                        }
                        type="text"
                        name="city"
                        value={formData?.city}
                        onChange={handleChange}
                        disabled={showEditCont}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 pb-md-4">
                    <label>Nationality</label>
                    <div className="input-group">
                      <select
                        className="form-select form-select-md mb-4"
                        aria-label=".form-select-md"
                        name="country"
                        value={
                          formData?.country ||
                          users?.individualUser?.address?.country
                        }
                        onChange={handleChange}
                        disabled={showEditCont}
                      >
                        <option value=""></option>
                        {countries?.map((country) => (
                          <option key={country.id} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className=" ">
                    <label>Address</label>
                    <div className="input-group mb-4">
                      <input
                        className="form-control"
                        placeholder={
                          users?.individualUser?.address?.houseNoAddress ||
                          "Contact Address"
                        }
                        type="text"
                        name="houseNoAddress"
                        value={formData?.houseNoAddress}
                        onChange={handleChange}
                        disabled={showEditCont}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="row">
                  <div className="d-flex align-items-center justify-content-between">
                    <h4 className="pt-5">Employment Details</h4>
                    {showEditEmpoy ? (
                      <button onClick={toggleEmploy}>Edit</button>
                    ) : (
                      <button className="grey-button" onClick={toggleEmploy}>
                        Save
                      </button>
                    )}
                  </div>
                </div>
                {infoSuccess && (
                  <Alert color="success" className="text-center">
                    Employment Details Updated Successfully
                  </Alert>
                )}
                <div className="row">
                  <div className="col-md-4 ">
                    <label>Occupation</label>
                    <div className="input-group mb-4">
                      <input
                        className="form-control"
                        placeholder={
                          users?.individualUser?.employmentDetail?.occupation ||
                          "Occupation"
                        }
                        type="text"
                        name="occupation"
                        value={formData?.occupation}
                        onChange={handleChange}
                        disabled={showEditEmpoy}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 ">
                    <label>Employer's name</label>
                    <div className="input-group mb-4">
                      <input
                        className="form-control"
                        placeholder={
                          users?.individualUser?.employmentDetail
                            ?.employerName || "Employer's name"
                        }
                        type="text"
                        name="employerName"
                        value={formData?.employerName}
                        onChange={handleChange}
                        disabled={showEditEmpoy}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className=" ">
                    <label>Employers Address</label>
                    <div className="input-group mb-4">
                      <input
                        className="form-control"
                        placeholder={
                          users?.individualUser?.employmentDetail
                            ?.employerAddress || "Employers Address"
                        }
                        type="text"
                        name="employerAddress"
                        value={formData?.employerAddress}
                        onChange={handleChange}
                        disabled={showEditEmpoy}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="row">
                  <div className="d-flex align-items-center justify-content-between">
                    <h4 className="pt-5">Next Of kin details</h4>
                    {showEditNOK ? (
                      <button onClick={toggleNOK}>Edit</button>
                    ) : (
                      <button className="grey-button" onClick={toggleNOK}>
                        Save
                      </button>
                    )}
                  </div>
                </div>
                {infoSuccess && (
                  <Alert color="success" className="text-center">
                    Next of Kin Details Updated Successfully
                  </Alert>
                )}
                <div className="row">
                  <div className="col-md-4 ">
                    <label>Next of Kin Name</label>
                    <div className="input-group mb-4">
                      <input
                        className="form-control"
                        placeholder={
                          users?.individualUser?.nokDetail?.name ||
                          "Next of Kin Name"
                        }
                        type="text"
                        name="name"
                        value={formData?.name}
                        onChange={handleChange}
                        disabled={showEditNOK}
                      />
                    </div>
                  </div>
                  <div className="col-md-8 ">
                    <label>Next of Kin Email</label>
                    <div className="input-group mb-4">
                      <input
                        className="form-control"
                        placeholder={
                          users?.individualUser?.nokDetail?.email ||
                          "Next of Kin Email"
                        }
                        type="text"
                        name="email"
                        value={formData?.email}
                        onChange={handleChange}
                        disabled={showEditNOK}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className=" ">
                    <label>Next of Kin Address</label>
                    <div className="input-group mb-4">
                      <input
                        className="form-control"
                        placeholder={
                          users?.individualUser?.nokDetail?.address ||
                          "Next of Kin Address"
                        }
                        type="text"
                        name="nokAddress"
                        value={formData?.nokAddress}
                        onChange={handleChange}
                        disabled={showEditNOK}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8 ">
                    <label>Next of kin phone number</label>
                    <div className="input-group">
                      <PhoneInput
                        country={"ng"}
                        inputClass={`form-control phone-input ${
                          showEditNOK ? "disable" : ""
                        }`}
                        buttonClass={`phone-select-field ${
                          showEditNOK ? "disable" : ""
                        }`}
                        name="phone"
                        value={formData.phone}
                        // countryCodeEditable={false}
                        disabled={showEditNOK}
                        onChange={(value) => handleNokPhoneValueChange(value)}
                        disableCountryCode={true}
                        placeholder={
                          users?.individualUser?.nokDetail?.phone ||
                          "Next of kin phone number"
                        }
                        disableDropdown
                        masks={{ ng: ".... ... ...." }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </WrapperBody>
        <WrapperFooter>
          <div className="footer-body">
            <div className="d-flex align-items-center justify-content-end footer-content">
              <div>
                <button type="submit" className="blue-btn">
                  {loading ? "Loading..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </WrapperFooter>
      </form>
    </div>
  );
};

export default PersonalInfo;

const WrapperBody = styled.div`
  padding: 0 4rem 7rem 1rem;
  @media (max-width: 600px) {
    padding: 0 2rem 7rem 1rem;
  }
  .content {
    padding-top: 45px;
  }
  button {
    background: #111e6c;
    border-radius: 5px;
    outline: none;
    border: none;
    padding: 10px 27px;
    color: #f2f2f2;
    &:disabled {
      cursor: not-allowed;
    }
  }

  .grey-button {
    padding: 10px 10px;
    // margin-top: 40px;
    border-radius: 8px;
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 21px;
    text-align: right;
    background: #f2f2f2;
    color: #111e6c;
    &:disabled {
      color: #ccc;
    }
  }

  .input-font-awe {
    position: absolute;
    top: 8px;
    right: 20px;
    font-size: 25px;
  }
  .font-awe {
    position: absolute;
    top: 8px;
    left: 30px;
    font-size: 25px;
    i {
      padding-right: 15px;
    }
    .font-num {
      padding-left: 75px;
    }
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
    position: relative;
    &:disabled {
      background: rgba(28, 68, 141, 0.09);
      cursor: not-allowed;
    }
  }

  select {
    height: 54px;
    &:disabled {
      background: rgba(28, 68, 141, 0.09);
      cursor: not-allowed;
    }
  }

  .select-field {
    height: 54px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 15px;
    letter-spacing: -0.01em;
    color: #242424;
    padding: 15px;
  }

  .phone-select-field {
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
    // margin-top: 40px;
    background: #111e6c;
    border-radius: 8px;
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 21px;
    text-align: right;
    color: #ffffff;
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

  .disable {
    background: rgba(28, 68, 141, 0.09) !important;
    cursor: not-allowed;
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
