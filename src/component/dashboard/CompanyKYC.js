import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { ProfileSideBar } from "./ProfileSideBar";
import { BVNConfirm } from "../Accessories/BVNConfirm";
import ModalComponent from "../ModalComponent";
import { Link, useNavigate } from "react-router-dom";
import {
  updateUserCompanyKYC,
  getAuthUsers,
} from "../../redux/actions/personalInfo/userProfile.actions";

const CompanyKYC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const count = useSelector((state) => state.auth.signup_btn);
  const company_details = useSelector((state) => state.user_profile.users);
  const auth = useSelector((state) => state.auth);
  const { login, isLoggedIn } = auth;

  const user_profile = useSelector((state) => state.user_profile);
  const { users } = user_profile;

  const data = {
    rcNumber: "",
    natureOfBusiness: "",
    companyType: "",
    dateOfInco: "",
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
    const { rcNumber, natureOfBusiness, companyType, dateOfInco } = formData;

    let data = {
      email: company_details && company_details.company.email,
      isAssited: true,
      isNewsLetters: true,
      phone: company_details && company_details.company.phone,
      source: company_details && company_details.company.source,
      sourceOthers: company_details && company_details.company.sourceOthers,
      contactFirstName:
        company_details && company_details.company.contactFirstName,
      contactLastName:
        company_details && company_details.company.contactLastName,
      contactMiddleName:
        company_details && company_details.company.contactMiddleName,
      name: company_details && company_details.company.name,
      role: "COMPANY",
      usage: "TREASURY",
      isKyc: true,
      status: company_details && company_details.company.status,
      rcNumber,
      natureOfBusiness,
      companyType,
      dateOfInco,
    };
    console.log(data);
    dispatch(updateUserCompanyKYC(data));
  };

  useEffect(() => {
    const tokenString = JSON.parse(localStorage.getItem("token"));
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
    console.log(company_details);
  }, [company_details]);

  return (
    <div>
      <div className="">
        <div>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="">
              <WrapperBody>
                <div>
                  <div>
                    <div className="d-flex justify-content-between align-items-center">
                      <h3>
                        Hello{" "}
                        {company_details &&
                          company_details.company.name.toUpperCase()}
                        ,
                      </h3>
                      <Link to="/">
                        <button className="dashboard">Dashboard</button>
                      </Link>
                    </div>

                    <p>
                      Kindly update your profile, it will only take a few
                      minutes
                    </p>

                    <h4>Company Details</h4>
                    <div>
                      <div class="row">
                        <div class="col-md-8">
                          <label>Company Name</label>
                          <div class="input-group mb-4">
                            <input
                              class="form-control"
                              placeholder={
                                company_details && company_details.company.name
                              }
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6 col-lg-4 ">
                          <label>Company RC number</label>
                          <div class="input-group mb-4">
                            <input
                              class="form-control"
                              placeholder="Company RC number"
                              type="text"
                              onChange={handleChange}
                              name="rcNumber"
                              value={formData.rcNumber}
                            />
                          </div>
                        </div>
                        <div class="col-sm-6 col-lg-4 ">
                          <label>Company Registration Date</label>
                          <div class="input-group mb-4">
                            <input
                              class="form-control"
                              placeholder=""
                              type="date"
                              onChange={handleChange}
                              name="dateOfInco"
                              value={formData.dateOfInco}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div class="mb-4">
                          <label>Company Address</label>
                          <div class="input-group">
                            <input
                              type="text"
                              class="form-control"
                              placeholder="Company Address"
                              onChange={handleChange}
                              name="firstName"
                              value={formData.firstName}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-8 ">
                          <label>Nature of Business</label>
                          <div class="input-group mb-4">
                            <input
                              class="form-control"
                              placeholder="Nature of Business"
                              type="text"
                              onChange={handleChange}
                              name="natureOfBusiness"
                              value={formData.natureOfBusiness}
                            />
                          </div>
                        </div>
                        <div class="col-md-4 ">
                          <label>Company Type</label>
                          <select
                            class="form-select form-select-lg mb-3"
                            aria-label=".form-select-lg"
                            onChange={handleChange}
                            name="companyType">
                            <option value="" selected>
                              Please choose an option
                            </option>
                            <option value="ROSABON_SALES">
                              Sole proprietorship
                            </option>
                            <option value="ANOTHER_USER">Partnership</option>
                            <option value="OTHER">Corporate Limited</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <h4 className="pt-5">Contact Person Details</h4>
                    <div>
                      <div class="row">
                        <div class="col-md-4 ">
                          <label>Contact Person First Name</label>
                          <div class="input-group mb-4">
                            <input
                              class="form-control"
                              placeholder={
                                company_details &&
                                company_details.contactFirstName
                              }
                              type="text"
                            />
                          </div>
                        </div>
                        <div class="col-md-4 ">
                          <label>Contact Person Last Name</label>
                          <div class="input-group mb-4">
                            <input
                              class="form-control"
                              placeholder={
                                company_details &&
                                company_details.contactLastName
                              }
                              type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-md-8 ">
                          <label>Contact Person Email Address</label>
                          <div class="input-group mb-4">
                            <input
                              class="form-control"
                              placeholder={
                                company_details && company_details.email
                              }
                              type="text"
                            />
                          </div>
                        </div>
                        <div class="col-md-4 ">
                          <label>Contact person Number</label>
                          <div class="input-group mb-4">
                            <input
                              class="form-control"
                              placeholder={
                                company_details && company_details.phone
                              }
                              type="text"
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
                  <div className="d-flex align-items-center justify-content-between btn-style  footer-content">
                    <div>
                      <button type="submit" className="" disabled>
                        Save and Invest Now
                      </button>
                    </div>
                    <div>
                      {/* <button className="blue-btn">
                      <Link to="/company-profile">Save and Invest Now</Link>
                    </button> */}
                      {formData.rcNumber &&
                      formData.natureOfBusiness &&
                      formData.companyType &&
                      formData.dateOfInco ? (
                        <Link to="/company-profile">
                          <button type="submit" className="blue-btn">
                            Save and Invest Now
                          </button>
                        </Link>
                      ) : (
                        <>
                          <button type="submit" className="" disabled>
                            Save and Invest Now
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </WrapperFooter>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyKYC;

const WrapperFooter = styled.div`
  background: #ffffff;
  box-shadow: 8px 0px 18px rgba(173, 173, 173, 0.25);
  padding: 40px 50px;
  @media (max-width: 600px) {
    padding: 40px 10px;
    .btn-style {
      padding: 10px 25px;
      font-size: 12px;
    }
  }
  button {
    background: #f2f2f2;
    border-radius: 10px;
    outline: none;
    border: none;
    padding: 10px 25px;
    color: #111e6c;
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
    /* padding-left: 10px; */
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
