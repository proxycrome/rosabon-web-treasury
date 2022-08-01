import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ModalComponent from "../../ModalComponent";
import { BVNConfirm } from "../../Accessories/BVNConfirm";


const BankDetails = () => {

  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(true);
  const toggleEdit = () => {
    setShowEdit(!showEdit);
  };



  return (
    <div>
      <WrapperBody>
        <div className="container-fluid">
          <div>
            <div className="row">
              <div className="d-flex justify-content-between">
                <h4 className="">My Bank Details</h4>
                <div>
                  <div>
                    {showEdit ? (
                      <button
                        className={showEdit ? " btn_bg_blue" : ""}
                        onClick={toggleEdit}>
                        Choose file
                      </button>
                    ) : (
                      <button className="grey-button" onClick={toggleEdit}>
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="row">
              <div class="col-md-8 ">
                <label>Select Bank</label>
                <div class="input-group mb-4">
                  <input
                    class="form-control"
                    placeholder=""
                    type="text"
                    disabled={showEdit}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="row">
              <div className="col-md-6">
                <div className="row">
                  <div class="col-6 ">
                    <label>Account Number</label>
                    <div class="input-group mb-4">
                      <input
                        class="form-control"
                        placeholder=""
                        type="text"
                        disabled={showEdit}
                      />
                    </div>
                  </div>
                  <div class="col-6 ">
                    <button
                      type="button"
                      onClick={() => setShow(true)}
                      disabled={showEdit}
                      className={
                        showEdit
                          ? " btn_bg_grey profile_vify_btn"
                          : "btn_bg_blue profile_vify_btn"
                      }>
                      Verify
                    </button>
                  </div>
                  <ModalComponent
                    show={show}
                    size={"md"}
                    handleClose={() => setShow(false)}>
                    <BVNConfirm
                      bank="bank"
                      show={show}
                      handleClose={() => setShow(false)}
                    />
                  </ModalComponent>
                </div>
              </div>

              <div class="col-md-6 ">
                <label>Acount Name</label>
                <div class="input-group mb-4">
                  <input
                    class="form-control"
                    placeholder=""
                    type="text"
                    disabled={showEdit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </WrapperBody>
    </div>
  );
};

export default BankDetails;

const WrapperBody = styled.div`
  padding: 0 4rem 7rem 1rem;
  .content {
    padding-top: 45px;
  }
  .btn_bg_blue {
    background: #111e6c !important;
  }
  .btn_bg_grey {
    background: #bdbdbd !important;
  }
  button {
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
    margin-top: 35px;
    background: #111e6c;
    border-radius: 8px;
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 21px;
    text-align: right;
    color: #ffffff;
    padding: 15px 25px;
  }
`;
