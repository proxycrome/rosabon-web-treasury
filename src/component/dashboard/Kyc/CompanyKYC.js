import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { ProfileSideBar } from '../ProfileSideBar';
import { BVNConfirm } from '../../Accessories/BVNConfirm';
import ModalComponent from '../../ModalComponent';
import { Link, useNavigate } from 'react-router-dom';
import {
  updateUserCompanyKYC,
  getAuthUsers,
} from '../../../redux/actions/personalInfo/userProfile.actions';
import moment from 'moment';

const CompanyKYC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const company_details = useSelector((state) => state.user_profile.users);
  const auth = useSelector((state) => state.auth);
  const { login, isLoggedIn } = auth;

  const user_profile = useSelector((state) => state.user_profile);
  const { users } = user_profile;

  console.log(company_details);

  const data = {
    rcNumber: '',
    natureOfBusiness: '',
    companyType: '',
    dateOfInco: '',
    companyAddress: '',
    name: '',
    contactFirstName: '',
    contactLastName: '',
    email: '',
    phone: '',
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
      email: email ? email : company_details?.email,
      isAssited: company_details && company_details?.assited,
      isNewsLetters: company_details && company_details?.newsLetters,
      phone: phone ? phone : company_details?.phone,
      source: company_details?.source,
      sourceOthers: company_details?.sourceOthers,
      role: 'COMPANY',
      usage: 'TREASURY',
      isKyc: true,
      status: company_details?.status,
      company: {
        rcNumber: rcNumber ? rcNumber : company_details?.company?.rcNumber,
        natureOfBusiness: natureOfBusiness
          ? natureOfBusiness
          : company_details?.company?.natureOfBusiness,
        companyType: companyType
          ? companyType
          : company_details?.company?.companyType,
        dateOfInco: dateOfInco
          ? dateOfInco
          : company_details?.company?.dateOfInco,
        companyAddress: companyAddress
          ? companyAddress
          : company_details?.company?.companyAddress,
        contactFirstName: contactFirstName
          ? contactFirstName
          : company_details?.company?.contactFirstName,
        contactLastName: contactLastName
          ? contactLastName
          : company_details.company.contactLastName,
        contactMiddleName: company_details?.company?.contactMiddleName,
        name: name ? name : company_details?.company?.name,
      },
    };

    const tokenString = JSON.parse(localStorage.getItem('token'));
    const pathCred = {
      navigate,
      route,
    };
    console.log(data);
    dispatch(updateUserCompanyKYC(tokenString.token, data, pathCred));
  };

  useEffect(() => {
    const tokenString = JSON.parse(localStorage.getItem('token'));
    if (tokenString) {
      dispatch(getAuthUsers(tokenString.token));
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <div>
      <div className="">
        <div>
          <form autoComplete="off">
            <div className="">
              <WrapperBody>
                <div>
                  <div>
                    <div className="d-flex justify-content-between align-items-center">
                      <h3>
                        Hello{' '}
                        {company_details && company_details?.company?.name},
                      </h3>
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
                                company_details &&
                                company_details?.company?.name
                              }
                              type="text"
                              name="name"
                              onChange={handleChange}
                              value={formData.name}
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
                                (company_details &&
                                  company_details?.company?.rcNumber) ||
                                'Company RC number'
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
                                 company_details?.company?.dateOfInco ||
                                'DD-MM-YYYY'
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
                                company_details?.company?.companyAddress ||
                                'Company Address'
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
                                company_details?.company?.natureOfBusiness ||
                                'Nature of Business'
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
                              company_details?.company?.companyType
                            }
                            name="companyType"
                          >
                            <option value="" disabled>
                              Company Type...
                            </option>
                            <option value="Sole proprietorship">
                              Sole proprietorship
                            </option>
                            <option value="Partnership">
                              Partnership
                            </option>
                            <option value="Corporate Limited">
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
                                company_details?.company?.contactFirstName ||
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
                                company_details?.company?.contactLastName ||
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
                              placeholder={
                                company_details?.email || 'Email Address'
                              }
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
                              placeholder={
                                company_details?.phone || 'phone number'
                              }
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
                      {(formData.rcNumber ||
                        company_details?.company?.rcNumber) &&
                      (formData.natureOfBusiness ||
                        company_details?.company?.natureOfBusiness) &&
                      (formData.companyType ||
                        company_details?.company?.companyType) &&
                      (formData.dateOfInco ||
                        company_details?.company?.dateOfInco) &&
                      (formData.companyAddress ||
                        company_details?.company?.companyAddress) &&
                      (formData.name || company_details?.company?.name) &&
                      (formData.contactFirstName ||
                        company_details?.company?.contactFirstName) &&
                      (formData.contactLastName ||
                        company_details?.company?.contactLastName) &&
                      (formData.email || company_details?.email) &&
                      (formData.phone || company_details?.phone) ? (
                        <button
                          className=""
                          onClick={(e) => handleSubmit(e, '/company-profile')}
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
                      {(formData.rcNumber ||
                        company_details?.company?.rcNumber) &&
                      (formData.natureOfBusiness ||
                        company_details?.company?.natureOfBusiness) &&
                      (formData.companyType ||
                        company_details?.company?.companyType) &&
                      (formData.dateOfInco ||
                        company_details?.company?.dateOfInco) &&
                      (formData.companyAddress ||
                        company_details?.company?.companyAddress) &&
                      (formData.name || company_details?.company?.name) &&
                      (formData.contactFirstName ||
                        company_details?.company?.contactFirstName) &&
                      (formData.contactLastName ||
                        company_details?.company?.contactLastName) &&
                      (formData.email || company_details?.email) &&
                      (formData.phone || company_details?.phone) ? (
                        <button
                          className="blue-btn"
                          onClick={(e) => handleSubmit(e, '/plan-product')}
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
    font-family: 'Montserrat';
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
