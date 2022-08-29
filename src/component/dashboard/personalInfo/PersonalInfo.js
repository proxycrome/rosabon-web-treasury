import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { successMessage } from "../../../redux/actions/auth/SignupAction";
import { updatePersonalDetails } from "../../../redux/actions/updateProfile/updateProfile.actions";

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showEditProf, setShowEditProf] = useState(true);
  const [showEditCont, setShowEditCont] = useState(true);
  const [showEditEmpoy, setShowEditEmpoy] = useState(true);
  const [showEditNOK, setShowEditNOK] = useState(true);

  const toggleProf = () => {
    setShowEditProf(!showEditProf);
  };
  const toggleCont = () => {
    setShowEditCont(!showEditCont);
  };
  const toggleEmploy = () => {
    setShowEditEmpoy(!showEditEmpoy);
  };
  const toggleNOK = () => {
    setShowEditNOK(!showEditNOK);
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
    dispatch(updatePersonalDetails(data));
  };

  // useEffect(() => {
  //   const tokenString = localStorage.getItem("user-token");
  //   if (tokenString) {
  //     dispatch(getAuthUser(tokenString));
  //   } else {
  //     navigate("/login");
  //   }
  // }, []);

  useEffect(() => {
    dispatch(successMessage(false));
  }, []);

  return (
    <div>
      <WrapperBody>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="container-fluid">
            <div>
              <div className="row">
                <div className="d-flex justify-content-between">
                  <h4>Personal Details</h4>
                  <div>
                    {showEditProf ? (
                      <button onClick={toggleProf}>Edit</button>
                    ) : (
                      <button className="grey-button" onClick={toggleProf}>
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-4">
                  <label>First Name</label>
                  <div className="input-group mb-4">
                    <input
                      className="form-control"
                      placeholder="First Name"
                      type="text"
                      disabled={showEditProf}
                    />
                  </div>
                </div>
                <div className="col-md-6 col-lg-4">
                  <label>Middle Name</label>
                  <div className="input-group mb-4">
                    <input
                      className="form-control"
                      placeholder="Middle Name"
                      type="text"
                      disabled={showEditProf}
                    />
                  </div>
                </div>
                <div className="col-md-8 col-lg-4 pb-md-4">
                  <label>Last Name</label>
                  <div className="input-group mb-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                      disabled={showEditProf}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-4">
                  <label>Gender</label>
                  <select
                    className="form-select form-select-md mb-4"
                    aria-label=".form-select-md"
                    disabled={showEditProf}>
                    <option selected>Male</option>
                    <option value="2">Female</option>
                  </select>
                </div>
                <div className="col-md-6 col-lg-4">
                  <label>Date of Birth</label>
                  <div className="input-group mb-4">
                    <input
                      className="form-control"
                      placeholder="Date of Birth"
                      aria-label="First Name..."
                      type="date"
                      disabled={showEditProf}
                    />
                    {showEditProf && (
                      <span className="input-font-awe">
                        <i className="fa-solid fa-calendar"></i>
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-8 col-lg-4 pb-md-4 mb-4">
                  <label>Primary phone number</label>
                  <div className="input-group">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Primary phone number"
                      disabled={showEditProf}
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
                      placeholder="Contact Person Email Address"
                      type="text"
                      disabled={showEditProf}
                    />
                  </div>
                </div>
                <div className="col-md-4 ps-2 mb-4">
                  <label>BVN</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="BVN"
                      disabled={showEditProf}
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
                      disabled={showEditProf}
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
                    <button onClick={toggleCont}>Edit</button>
                  ) : (
                    <>
                      <button className="grey-button" onClick={toggleCont}>
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div>
                <div className="row">
                  <div className="col-md-8 ">
                    <label>Secondary Phone Number</label>
                    <div className="input-group mb-4">
                      <input
                        className="form-control"
                        placeholder=""
                        type="text"
                        disabled={showEditCont}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 ">
                    <label>Country of Residence</label>
                    <div className="input-group mb-4">
                      <select
                        className="form-select form-select-md mb-3"
                        aria-label=".form-select-md"
                        disabled={showEditCont}
                        name="name"
                      >
                        <option value=""></option>
                        <option value="Nigeria">Nigeria</option>
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
                      disabled={showEditCont}>
                      <option selected>Male</option>
                      <option value="2">Female</option>
                    </select>
                  </div>
                  <div className="col-md-6 col-lg-4 ">
                    <label>City</label>
                    <div className="input-group mb-4">
                      <input
                        className="form-control"
                        placeholder="City"
                        aria-label="First Name..."
                        type="text"
                        disabled={showEditCont}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-6 pb-md-4">
                    <label>Nationality</label>
                    <div className="input-group mb-4">
                      <select
                        className="form-select form-select-md mb-3"
                        aria-label=".form-select-md"
                        name="country"
                        disabled={showEditCont}
                      >
                        <option value=""></option>
                        <option value="Nigeria">Nigeria</option>
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
                        placeholder="Address"
                        type="text"
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
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 ">
                    <label>Occupation</label>
                    <div className="input-group mb-4">
                      <input
                        className="form-control"
                        placeholder="Occupation"
                        type="text"
                        disabled={showEditEmpoy}
                      />
                    </div>
                  </div>
                  <div className="col-md-4 ">
                    <label>Employer's name</label>
                    <div className="input-group mb-4">
                      <input
                        className="form-control"
                        placeholder="Employer's name"
                        type="text"
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
                        placeholder="Employers Address"
                        type="text"
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
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 ">
                    <label>Next of Kin Name</label>
                    <div className="input-group mb-4">
                      <input
                        className="form-control"
                        placeholder="Next of Kin Name"
                        type="text"
                        disabled={showEditNOK}
                      />
                    </div>
                  </div>
                  <div className="col-md-8 ">
                    <label>Next of Kin Email</label>
                    <div className="input-group mb-4">
                      <input
                        className="form-control"
                        placeholder=""
                        type="text"
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
                        placeholder=""
                        type="text"
                        disabled={showEditNOK}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8 ">
                    <label>next of kin phone number</label>
                    <div className="input-group mb-4">
                      <input
                        className="form-control"
                        placeholder=""
                        type="text"
                        disabled={showEditNOK}
                      />
                      <span className="input-font-awe">
                        {/* <i className=" fa-solid fa-angle-down"></i>
                      <i className="fa-solid fa-angle-down"></i>
                      <i className="fa-solid fa-angle-down"></i> */}
                        {/* <i className="font-num fa-solid fa-angle-down"></i> */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
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
  }
  .grey-button {
    background: #f2f2f2;
    color: #111e6c;
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
    width: 83px;
    height: 54px;
    margin-top: 35px;
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