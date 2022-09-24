import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { successMessage } from "../../../redux/actions/auth/SignupAction";
import { updateCompanyDetails } from "../../../redux/actions/updateProfile/updateProfile.actions";

const CompanyDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showEditDetail, setShowEditDetail] = useState(true);
  const [showEditCont, setShowEditCont] = useState(true);
  const [showEditEmpoy, setShowEditEmpoy] = useState(true);
  const [showEditNOK, setShowEditNOK] = useState(true);

  const {
    users,
    countries,
    states,
    lgas,
    showEmailOtpModal,
    otp,
    otpError,
    validateEmailOtp,
  } = useSelector((state) => state.user_profile);

  const toggleDetail = () => {
    setShowEditDetail(!showEditDetail);
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
    dispatch(updateCompanyDetails(data));
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
          <div>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <div className="row">
                <div className="d-flex justify-content-between mt-2">
                  <h4>Company Details</h4>
                  <div>
                    {showEditDetail ? (
                      <button
                        className={showEditDetail ? " btn_bg_blue" : ""}
                        onClick={toggleDetail}>
                        Edit
                      </button>
                    ) : (
                      <button className="grey-button" onClick={toggleDetail}>
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="">
                <div className="row">
                  <div className="col-md-6">
                    <label>Company Name</label>
                    <div className="input-group mb-4">
                      <input
                        className="form-control"
                        placeholder=""
                        type="text"
                        disabled={showEditDetail}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label>Company RC Number</label>
                    <div className="input-group mb-4">
                      <input
                        className="form-control"
                        placeholder=""
                        type="text"
                        disabled={showEditDetail}
                      />
                    </div>
                  </div>
                  <div className="col-md-8 mb-4">
                    <label>Company Registration Date</label>
                    <div className="input-group">
                      <input
                        type="date"
                        className="form-control"
                        placeholder=""
                        disabled={showEditDetail}
                      />
                      {/* <span className=" input-font-awe">
                        <i className="fa-solid fa-calendar"></i>
                      </span> */}
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
                        disabled={showEditDetail}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-lg-4 ">
                    <label>Customer ID Number</label>
                    <div className="input-group mb-4">
                      <input
                        className="form-control"
                        placeholder=""
                        type="text"
                        disabled={showEditDetail}
                      />
                      {/* <span className=" input-font-awe">
                        <i className="fa-solid fa-angle-down"></i>
                      </span> */}
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 ">
                    <label>Nature of Business</label>
                    <div className="input-group mb-4">
                      <input
                        className="form-control"
                        placeholder=""
                        type="text"
                        disabled={showEditDetail}
                      />
                    </div>
                  </div>
                  <div className="col-md-8 col-lg-4 mb-4">
                    <label>Company Type</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        disabled={showEditDetail}
                      />
                      <span className=" input-font-awe">
                        <i className="fa-solid fa-angle-down"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="body-content">
                <div className="row">
                  <div className="d-flex justify-content-between mt-5">
                    <h4>Contact Person Details</h4>
                    <div>
                      {showEditCont ? (
                        <button
                          className={showEditCont ? " btn_bg_blue" : ""}
                          onClick={toggleCont}>
                          Edit
                        </button>
                      ) : (
                        <button className="grey-button" onClick={toggleCont}>
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Contact Person First Name</label>
                    <div className="input-group mb-4">
                      <input
                        className="form-control"
                        placeholder=""
                        type="text"
                        disabled={showEditCont}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <label>Contact Person Last Name</label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        disabled={showEditCont}
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
                        disabled={showEditCont}
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
                        disabled={showEditCont}
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

export default CompanyDetails;

const WrapperBody = styled.div`
  padding: 0 4rem 7rem 1rem;
  @media (max-width: 600px) {
    padding: 0 1rem 7rem 1rem;
  }
  .body-content {
    /* padding-top: 45px; */
  }
  .grey-button {
    background: #f2f2f2;
    color: #111e6c;
  }
  button {
    background: #111e6c;
    border-radius: 5px;
    outline: none;
    border: none;
    padding: 10px 27px;
    color: #f2f2f2;
  }
  .input-font-awe {
    position: absolute;
    top: 8px;
    right: 20px;
    font-size: 25px;
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