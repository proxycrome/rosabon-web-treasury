import React, { useState } from "react";
import styled from "styled-components";

const CompanyDetails = () => {
  return (
    <div>
      <WrapperBody>
        <div className="container-fluid">
          <div>
            <div className="row">
              <div className="d-flex justify-content-between">
                <h4>Company Details</h4>
                <div>
                  <button>Edit</button>
                </div>
              </div>
            </div>
            <div className="">
              <div class="row">
                <div class="col-md-6">
                  <label>Company Name</label>
                  <div class="input-group mb-4">
                    <input
                      class="form-control"
                      placeholder=""
                      type="text"
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <label>Company RC Number</label>
                  <div class="input-group mb-4">
                    <input
                      class="form-control"
                      placeholder=""
                      type="text"
                    />
                  </div>
                </div>
                <div class="col-md-8 mb-4">
                  <label>Company Registration Date</label>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder=""
                    />
                    <span className=" input-font-awe">
                      <i class="fa-solid fa-calendar"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col ">
                  <label>Company Address</label>
                  <div class="input-group mb-4">
                    <input class="form-control" placeholder="" type="text" />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 col-lg-4 ">
                  <label>Customer ID Number</label>
                  <div class="input-group mb-4">
                    <input
                      class="form-control"
                      placeholder=""
                      type="text"
                    />
                    <span className=" input-font-awe">
                      <i class="fa-solid fa-angle-down"></i>
                    </span>
                  </div>
                </div>
                <div class="col-md-6 col-lg-4 ">
                  <label>Nature of Business</label>
                  <div class="input-group mb-4">
                    <input
                      class="form-control"
                      placeholder=""
                      type="text"
                    />
                  </div>
                </div>
                <div class="col-md-8 col-lg-4 mb-4">
                  <label>Company Type</label>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder=""
                    />
                    <span className=" input-font-awe">
                      <i class="fa-solid fa-angle-down"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="body-content">
              <div className="row">
                <div className="d-flex justify-content-between">
                  <h4>Contact Person Details</h4>
                  <div>
                    <button>Edit</button>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <label>Contact Person First Name</label>
                  <div class="input-group mb-4">
                    <input
                      class="form-control"
                      placeholder=""
                      type="text"
                    />
                  </div>
                </div>
                <div class="col-md-6 mb-4">
                  <label>Contact Person Last Name</label>
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder=""
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-8 ">
                  <label>Email Address</label>
                  <div class="input-group mb-4">
                    <input class="form-control" placeholder="" type="text" />
                  </div>
                </div>
                <div class="col-md-4 ">
                  <label>Phone Number</label>
                  <div class="input-group mb-4">
                    <input class="form-control" placeholder="" type="text" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </WrapperBody>
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
