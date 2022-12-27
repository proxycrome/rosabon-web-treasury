import React, { useState, useEffect } from "react";
import {
  CLOSE_MODAL,
  CLEAR_MESSAGES,
} from "../../../store/profile/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ModalComponent from "../../ModalComponent";
import { Toaster } from "react-hot-toast";
import {
  BVNConfirm,
  OTPVerify,
  Unsuccessful,
} from "../../Accessories/BVNConfirm";
// import { personalBankDetails } from '../../../redux/actions/updateProfile/bankDetails.action';
// import { getBanks } from '../../../redux/actions/personalInfo/userProfile.actions';
import {
  sendOtp,
  getBanks,
  verifyAccountNo,
  updateBankDetails,
  getAuthUsers,
  verifyBvn,
  resetPassword,
  getBankDetails,
} from "../../../store/actions";
import { useCallback } from "react";
import moment from "moment";

const BankDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [accountName, setAccountName] = useState("");
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(true);
  const toggleEdit = (e) => {
    setShowEdit(!showEdit);
  };

  const {
    users,
    showEmailOtpModal,
    otp,
    banks,
    otpError,
    bvnMessage,
    validateEmailOtp,
    bankDetails,
  } = useSelector((state) => state.user_profile);

  const { loading, accountDetail, accountDetailError, bankUpdateMsg } =
    useSelector((state) => state.updateProfile);

  useEffect(() => {
    if (accountDetailError) {
      setShow(true);
    }
  }, [accountDetailError]);

  const createOtp = (otp) => {
    setToken(otp);
  };

  const data = {
    accountNumber: "",
    bankCode: "",
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
    const { accountNumber, bankCode } = formData;
    let data = {
      accountName,
      accountNumber: accountNumber ? accountNumber : bankDetails?.accountNumber,
      bankCode,
    };
    const reset = {
      setShowEdit,
      getBankDetails,
      dispatch,
    };
    dispatch(updateBankDetails(data, reset));
  };

  const handleVerifyAccountNo = (e) => {
    e.preventDefault();
    const data = {
      accountNumber: formData.accountNumber || bankDetails?.accountNumber,
      bankCode: formData.bankCode || bankDetails?.bank?.code,
    };

    dispatch(verifyAccountNo(data));
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    dispatch(sendOtp());
  };

  const handleOTPModalClose = () => {
    dispatch({ type: CLOSE_MODAL });
    dispatch({ type: CLEAR_MESSAGES });
  };

  useEffect(() => {
    dispatch(getBanks());
  }, [dispatch]);

  useEffect(() => {
    if (validateEmailOtp) {
      handleOTPModalClose();
      toggleEdit();
    }
  }, [validateEmailOtp]);

  useEffect(() => {
    dispatch(getAuthUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users) {
      const objData = {
        firstName: users?.individualUser?.firstName.toUpperCase(),
        lastName: users?.individualUser?.lastName.toUpperCase(),
        id: users?.individualUser?.bvn,
        isSubjectConsent: true,
        phoneNumber: users?.phone,
        dateOfBirth: moment(
          users?.individualUser?.dateOfBirth,
          "DD-MM-YYYY"
        ).format("YYYY-MM-DD"),
      };

      dispatch(verifyBvn(objData));
    }
  }, [users, dispatch]);

  const familiarityCheck = useCallback(() => {
    if (
      accountDetail?.data?.account_name
        ?.toLowerCase()
        ?.includes(bvnMessage?.data?.firstName?.toLowerCase()) &&
      accountDetail?.data?.account_name
        ?.toLowerCase()
        ?.includes(bvnMessage?.data?.lastName?.toLowerCase())
    ) {
      return accountDetail?.data?.account_name;
    } else {
      return "";
    }
  }, [accountDetail, bvnMessage]);

  useEffect(() => {
    if (accountDetail) {
      setAccountName(familiarityCheck());
      if (familiarityCheck() === "") {
        setShow(true);
      }
    }
  }, [accountDetail]);

  const reset = () => {
    setformData({
      ...formData,
      accountName: "",
      accountNumber: "",
      bankCode: "",
    });
    setAccountName("");
  };

  useEffect(() => {
    if (!bankDetails) {
      dispatch(getBankDetails());
    }
  }, [bankDetails]);

  return (
    <div>
      <Toaster />
      <form autoComplete="off" onSubmit={handleSubmit}>
        <WrapperBody>
          <div className="container-fluid">
            <div>
              <div className="row">
                <div className="d-flex justify-content-between mt-2">
                  <h4 className="">My Bank Details</h4>
                  <div>
                    <div>
                      {showEdit ? (
                        <button
                          type="button"
                          className="btn_bg_blue"
                          onClick={handleSendOtp}
                        >
                          Edit
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="grey-button"
                          onClick={() => {
                            toggleEdit();
                            reset();
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </div>
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
                        otpData={otp?.data}
                      />
                    </ModalComponent>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="row">
                <div className="col-md-8 ">
                  <label>Select Bank</label>
                  <select
                    className="form-select form-select-md mb-3"
                    aria-label=".form-select-md"
                    onChange={handleChange}
                    name="bankCode"
                    disabled={showEdit}
                    value={formData.bankCode || bankDetails?.bank?.code}
                  >
                    <option value="">Please choose an option</option>
                    {banks?.data?.map((bank) => (
                      <option key={bank.id} value={bank.code}>
                        {bank.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div>
              <div className="row">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-7 ">
                      <label>Account Number</label>
                      <div className="input-group mb-4">
                        <input
                          className="form-control"
                          placeholder={bankDetails?.accountNumber}
                          type="text"
                          disabled={showEdit}
                          onChange={handleChange}
                          name="accountNumber"
                          value={formData.accountNumber}
                        />
                      </div>
                    </div>
                    <div className="col-5 ">
                      <button
                        type="button"
                        onClick={handleVerifyAccountNo}
                        disabled={showEdit}
                        className={
                          showEdit
                            ? " btn_bg_grey profile_vify_btn"
                            : "btn_bg_blue profile_vify_btn"
                        }
                      >
                        Verify
                      </button>
                    </div>
                    <ModalComponent
                      show={show}
                      size={"md"}
                      handleClose={() => setShow(false)}
                    >
                      <Unsuccessful handleClose={() => setShow(false)} />
                    </ModalComponent>
                  </div>
                </div>

                <div className="col-md-6 ">
                  <label>Account Name</label>
                  <div className="input-group mb-4">
                    <input
                      className="form-control"
                      placeholder={bankDetails?.accountName}
                      type="text"
                      disabled={showEdit}
                      onChange={handleChange}
                      name="accountName"
                      value={accountName}
                    />
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
                <button className="blue-btn" disabled={!familiarityCheck()}>
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </WrapperFooter>
      </form>
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

const WrapperFooter = styled.div`
  background: #ffffff;
  box-shadow: 8px 0px 18px rgba(173, 173, 173, 0.25);
  padding: 40px 65px;
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
    &:disabled {
      cursor: not-allowed;
    }
  }
  .blue-btn {
    color: #f2f2f2;
    background: #111e6c;
  }
`;
