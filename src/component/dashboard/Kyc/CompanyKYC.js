import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAuthUsers, updateUserKyc } from "../../../store/actions";
import moment from "moment";
import Spinner from "../../common/loading";

const CompanyKYC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { users, loading } = useSelector((state) => state.user_profile);
  const auth = useSelector((state) => state.auth);
  const { login, isLoggedIn } = auth;

  console.log(users);

  const [formData, setformData] = useState({
    rcNumber: "",
    natureOfBusiness: "",
    companyType: "",
    dateOfInco: "",
    companyAddress: "",
    name: "",
    contactFirstName: "",
    contactLastName: "",
    email: "",
    phone: "",
  });

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
      rcNumber,
      natureOfBusiness,
      companyType,
      dateOfInco,
      companyAddress,
      name,
      contactFirstName,
      contactLastName,
      email,
      phone,
    } = formData;

    let data = {
      email: email ? email : users?.email,
      isAssited: users && users?.assited,
      isNewsLetters: users && users?.newsLetters,
      phone: phone ? phone : users?.phone,
      source: users?.source,
      sourceOthers: users?.sourceOthers,
      role: "COMPANY",
      usage: "TREASURY",
      isKyc: true,
      status: users?.status,
      company: {
        rcNumber: rcNumber ? rcNumber : users?.company?.rcNumber,
        natureOfBusiness: natureOfBusiness
          ? natureOfBusiness
          : users?.company?.natureOfBusiness,
        companyType: companyType ? companyType : users?.company?.companyType,
        dateOfInco: dateOfInco ? dateOfInco : users?.company?.dateOfInco,
        companyAddress: companyAddress
          ? companyAddress
          : users?.company?.companyAddress,
        contactFirstName: contactFirstName
          ? contactFirstName
          : users?.company?.contactFirstName,
        contactLastName: contactLastName
          ? contactLastName
          : users.company.contactLastName,
        contactMiddleName: users?.company?.contactMiddleName,
        name: name ? name : users?.company?.name,
      },
    };

    const pathCred = {
      navigate,
      route,
    };
    console.log(data);
    dispatch(updateUserKyc(data, pathCred));
  };

  useEffect(() => {
    const tokenString = JSON.parse(localStorage.getItem("token"));
    if (tokenString) {
      dispatch(getAuthUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch]);

  return (
    <div>
      <div className="">
        <div>
          {loading ? (
            <div className="vh-100 w-100">
              <Spinner />
            </div>
          ) : (
            <form autoComplete="off">
              <div className="">
                <WrapperBody>
                  <div>
                    <div>
                      <div className="d-flex justify-content-between align-items-center">
                        <h3>Hello {users && users?.company?.name},</h3>
                        {/* <Link to="/">
                        <button className="dashboard">Dashboard</button>
                      </Link> */}
                      </div>

                      <p>
                        Kindly update your profile, it will only take a few
                        minutes
                      </p>

                      <h4>Company Details</h4>
                      <div>
                        <div className="row">
                          <div className="col-md-8">
                            <label>Company Name</label>
                            <div className="input-group mb-4">
                              <input
                                className="form-control"
                                placeholder={
                                  users &&
                                  users?.company?.name
                                }
                                type="text"
                                name="name"
                                onChange={handleChange}
                                value={formData.name}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row d-flex align-items-baseline">
                          <div className="col-sm-6 col-lg-4 ">
                            <label>Company RC number</label>
                            <div className="input-group mb-4">
                              <input
                                className="form-control"
                                placeholder={
                                  (users && users?.company?.rcNumber) ||
                                  "Company RC number"
                                }
                                type="text"
                                onChange={handleChange}
                                name="rcNumber"
                                value={formData.rcNumber}
                              />
                            </div>
                          </div>
                          <div className="col-sm-6 col-lg-4 ">
                            <label>Company Registration Date</label>
                            <div className="input-group mb-4">
                              <input
                                className="form-control"
                                placeholder={
                                  users?.company?.dateOfInco || "DD-MM-YYYY"
                                }
                                type="text"
                                onChange={handleChange}
                                name="dateOfInco"
                                value={formData.dateOfInco}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-4">
                            <label>Company Address</label>
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={
                                  users?.company?.companyAddress ||
                                  "Company Address"
                                }
                                onChange={handleChange}
                                name="companyAddress"
                                value={formData.companyAddress}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-8 ">
                            <label>Nature of Business</label>
                            <div className="input-group mb-4">
                              <input
                                className="form-control"
                                placeholder={
                                  users?.company?.natureOfBusiness ||
                                  "Nature of Business"
                                }
                                type="text"
                                onChange={handleChange}
                                name="natureOfBusiness"
                                value={formData.natureOfBusiness}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 ">
                            <label>Company Type</label>
                            <select
                              className="form-select form-select-lg mb-3 select-field"
                              aria-label=".form-select-lg"
                              onChange={handleChange}
                              value={
                                formData.companyType ||
                                users?.company?.companyType
                              }
                              name="companyType"
                            >
                              <option value="">
                                Company Type...
                              </option>
                              <option value="SOLE_PROPRIETORSHIP">
                                Sole proprietorship
                              </option>
                              <option value="PARTNERSHIP">Partnership</option>
                              <option value="CORPORATE_LIMITED">
                                Corporate Limited
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <h4 className="pt-5">Contact Person Details</h4>
                      <div>
                        <div className="row">
                          <div className="col-md-4 ">
                            <label>Contact Person First Name</label>
                            <div className="input-group mb-4">
                              <input
                                className="form-control"
                                placeholder={
                                  users?.company?.contactFirstName ||
                                  'First name'
                                }
                                type="text"
                                name="contactFirstName"
                                onChange={handleChange}
                                value={formData.contactFirstName}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 ">
                            <label>Contact Person Last Name</label>
                            <div className="input-group mb-4">
                              <input
                                className="form-control"
                                placeholder={
                                  users?.company?.contactLastName ||
                                  'Last Name'
                                }
                                type="text"
                                name="contactLastName"
                                onChange={handleChange}
                                value={formData.contactLastName}
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
                                placeholder={users?.email || "Email Address"}
                                type="text"
                                name="email"
                                onChange={handleChange}
                                value={formData.email}
                              />
                            </div>
                          </div>
                          <div className="col-md-4 ">
                            <label>Contact Person Number</label>
                            <div className="input-group mb-4">
                              <input
                                className="form-control"
                                placeholder={users?.phone || "phone number"}
                                type="text"
                                name="phone"
                                onChange={handleChange}
                                value={formData.phone}
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
                        {(formData.rcNumber || users?.company?.rcNumber) &&
                        (formData.natureOfBusiness ||
                          users?.company?.natureOfBusiness) &&
                        (formData.companyType || users?.company?.companyType) &&
                        (formData.dateOfInco || users?.company?.dateOfInco) &&
                        (formData.companyAddress ||
                          users?.company?.companyAddress) &&
                        (formData.name || users?.company?.name) &&
                        (formData.contactFirstName ||
                          users?.company?.contactFirstName) &&
                        (formData.contactLastName ||
                          users?.company?.contactLastName) &&
                        (formData.email || users?.email) &&
                        (formData.phone || users?.phone) ? (
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
                        {(formData.rcNumber || users?.company?.rcNumber) &&
                        (formData.natureOfBusiness ||
                          users?.company?.natureOfBusiness) &&
                        (formData.companyType || users?.company?.companyType) &&
                        (formData.dateOfInco || users?.company?.dateOfInco) &&
                        (formData.companyAddress ||
                          users?.company?.companyAddress) &&
                        (formData.name || users?.company?.name) &&
                        (formData.contactFirstName ||
                          users?.company?.contactFirstName) &&
                        (formData.contactLastName ||
                          users?.company?.contactLastName) &&
                        (formData.email || users?.email) &&
                        (formData.phone || users?.phone) ? (
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
            </form>
          )}
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
