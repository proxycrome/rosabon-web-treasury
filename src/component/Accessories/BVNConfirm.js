import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Confetti from '../../asset/confetti.png';
import Checked from '../../asset/checked.png';
import Caneled from '../../asset/cnaceled.png';
import OtpInput from 'react18-input-otp';
import {
  sendOtp,
  updateUserCompanyKYC,
  validateOtp,
} from '../../redux/actions/personalInfo/userProfile.actions';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { useSelector, useDispatch, connect } from 'react-redux';
import {
  validatePhoneOtp,
  verifyPhone,
} from '../../redux/actions/updateProfile/updateProfile.actions';
// import { REMOVE_FOOTER } from "../../redux/constant/auth";

export function BVNConfirm({ bank, show, handleClose, name, bvn, nameMatch }) {
  const [complete, setComplete] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (nameMatch) {
      setComplete(nameMatch);
    }
  }, [nameMatch]);

  const { success } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.user_profile);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      role: 'INDIVIDUAL_USER',
      usage: 'TREASURY',
      individualUser: {
        bvn,
        firstName: name.split(' ')[0],
        lastName: name.split(' ')[1],
      },
    };

    const tokenString = JSON.parse(localStorage.getItem('token'));

    console.log(data);
    dispatch(updateUserCompanyKYC(tokenString.token, data, null));
  };

  console.log(user);
  useEffect(() => {
    if (success && user) {
      setComplete(true);
    }
  }, [success, user]);

  return !complete ? (
    <ConfirmBVN>
      <div className={''}>
        <Wrapper>
          <div className="d-flex justify-content-center align-items-center">
            <WrappCongrate>
              <div className="container">
                <div className="row">
                  <div className="col text-left">
                    {bank ? (
                      <>
                        <h4>Note</h4>
                        <p className="pt-5">
                          Your name on our system will be
                          <br /> updated with Ekiyee Bilaowei to reflect <br />
                          exactly as it appears on your BVN
                        </p>
                        <div className=" text-center pt-3">
                          <button
                            onClick={() => setComplete(true)}
                            type="button"
                            className=" verify_congrates_btn"
                          >
                            Ok
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <h4>BVN Verification</h4>
                        <p className="pt-5">
                          Your name on our system will be updated with {name} to
                          reflect exactly as it appears on your BVN
                        </p>
                        <div className=" text-center pt-3">
                          <button
                            onClick={handleSubmit}
                            type="button"
                            className=" verify_congrates_btn"
                          >
                            Ok
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </WrappCongrate>
          </div>
        </Wrapper>
      </div>
    </ConfirmBVN>
  ) : (
    <SuccessConfirm handleClose={handleClose} />
  );
}

const ConfirmBVN = styled.div`
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }

  .modal-main {
    position: fixed;
    background: white;
    width: 80%;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .display-block {
    display: block;
  }

  .display-none {
    display: none;
  }
`;

export function SuccessConfirm({
  bank,
  handleClose,
  withdraw,
  cardTopup,
  createPlan,
  confirmNotice,
  transferNotice,
}) {
  // const dispatch = useDispatch();
  // const logout = (e) => {
  //   dispatch({ type: REMOVE_FOOTER });
  // };

  return (
    <div>
      <Wrapper>
        <div className="d-flex justify-content-center align-items-center">
          <WrappCongrate>
            <div className="container">
              <div className="row">
                <div className="col text-center">
                  <div>
                    {bank ||
                    withdraw ||
                    cardTopup ||
                    createPlan ||
                    confirmNotice ||
                    transferNotice ? (
                      <img
                        className="congrate_confet"
                        src={Checked}
                        alt="Confetti"
                      />
                    ) : (
                      <img
                        className="congrate_confet"
                        src={Confetti}
                        alt="Confetti"
                      />
                    )}
                  </div>
                  {bank === 'bank' ? (
                    <>
                      <p className="">
                        Your bank details have been updated <br />
                        successfully
                      </p>
                      <div className=" ">
                        <button
                          onClick={handleClose}
                          type="button"
                          className="verify_congrates_btn"
                        >
                          ok
                        </button>
                      </div>
                    </>
                  ) : withdraw === 'withdraw' ? (
                    <>
                      <p className="py-5">Withdrawal Requested Successfully</p>
                      <div className=" ">
                        <NavLink state={{ myState: false }} to="/user-wallet">
                          <button
                            onClick={handleClose}
                            type="button"
                            className="verify_congrates_btn"
                          >
                            Ok
                          </button>
                        </NavLink>
                      </div>
                    </>
                  ) : withdraw === 'transter' ? (
                    <>
                      <p className="py-5">Your Transfer was successful</p>
                      <div className=" ">
                        <NavLink state={{ myState: false }} to="/user-wallet">
                          <button
                            onClick={handleClose}
                            type="button"
                            className="verify_congrates_btn"
                          >
                            Ok
                          </button>
                        </NavLink>
                      </div>
                    </>
                  ) : confirmNotice === 'rollover' ||
                    transferNotice === 'transfer' ||
                    confirmNotice === 'withdrawal' ? (
                    <>
                      {transferNotice === 'transfer' ? (
                        <p className="py-5">Your Transfer was Successful</p>
                      ) : confirmNotice === 'withdrawal' ? (
                        <p className="py-5">
                          Withdrawal Requested Successfully
                        </p>
                      ) : (
                        <p className="py-5">Your Rollover was successful</p>
                      )}
                      <div className=" ">
                        <NavLink to="/plan-list">
                          <button
                            onClick={handleClose}
                            type="button"
                            className="verify_congrates_btn"
                          >
                            Go back to Plan
                          </button>
                        </NavLink>
                      </div>
                    </>
                  ) : cardTopup === 'paid' ? (
                    <>
                      <p className="py-5">Your Payment was successful</p>
                      <div className="d-flex justify-content-between">
                        <button
                          onClick={handleClose}
                          type="button"
                          className="grey_btn"
                        >
                          Check my investments
                        </button>
                        <button
                          onClick={handleClose}
                          type="button"
                          className="blue_btn"
                        >
                          Invest more
                        </button>
                      </div>
                    </>
                  ) : createPlan === 'paid' ? (
                    <>
                      <p className="py-5">Plan Successfully Saved</p>
                      <div className="d-flex justify-content-between">
                        <button
                          onClick={handleClose}
                          type="button"
                          className="grey_btn"
                        >
                          Check my investments
                        </button>
                        <button
                          onClick={handleClose}
                          type="button"
                          className="blue_btn"
                        >
                          Invest more
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h4>Success!</h4>
                      <p className="">Your BVN validation was Successful</p>
                      <div className=" ">
                        <button
                          onClick={handleClose}
                          type="button"
                          className="verify_congrates_btn"
                        >
                          Continue
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </WrappCongrate>
        </div>
      </Wrapper>
    </div>
  );
}

export function OTPVerify({
  handleClose,
  emailOtp,
  updateOtp,
  toggleCont,
  otpData,
  secondPhone,
}) {
  const [token, setToken] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();
  const { otp, validateEmailOtp } = useSelector((state) => state.user_profile);
  const { phoneMsg, validatePhone } = useSelector(
    (state) => state.updateProfile
  );

  const handleChange = (otp) => setToken(otp);

  const handleEmailOtpSubmit = async(e) => {
    e.preventDefault();
    if ((otpData && token === otpData) || (otp?.data && token === otp?.data)) {
      updateOtp(token);
      dispatch(validateOtp(token));
      // toggleCont();
      // handleClose();
    }

    if ((otpData && token !== otpData) || (otp?.data && token !== otp?.data)) {
      setErrorMsg('Please enter a valid OTP');
    }
  };

  const handlePhoneOtpSubmit = async(e) => {
    e.preventDefault();
    if (
      (otpData && token === otpData) ||
      (phoneMsg?.data?.otp && token === phoneMsg?.data?.otp)
    ) {
      await dispatch(validatePhoneOtp(token));
    }

    if (
      (otpData && token === otpData) ||
      (phoneMsg?.data?.otp && token === phoneMsg?.data?.otp)
    ) {
      setErrorMsg('Please enter a valid OTP');
    }
  };

  const handleResendEmailOtp = () => {
    dispatch(sendOtp());
  };

  const handleResendPhoneOtp = () => {
    dispatch(verifyPhone(secondPhone));
  };


  // useEffect(() => {
  //   if(validateEmailOtp){
  //       handleClose();
  //       toggleCont();
  //   }
  // }, [validateEmailOtp])

  useEffect(() => {
    if (validatePhone) {
      handleClose();
    }
  }, [validatePhone]);

  return (
    <div>
      <Wrapper>
        <div className="d-flex justify-content-center align-items-center">
          <WrappCongrate>
            <div className="container">
              <div className="row">
                <div className="col text-left">
                  <h4>OTP Verification</h4>
                  {emailOtp ? (
                    <p className="">Enter OTP sent to your Email</p>
                  ) : (
                    <p className="">Enter OTP sent to this Phone Number</p>
                  )}
                  <div>
                    <OtpInput
                      value={token}
                      onChange={handleChange}
                      inputStyle="inputField"
                      containerStyle="enclose"
                      numInputs={5}
                    />
                  </div>
                  {errorMsg && (
                    <span className="text-center" style={{ color: '#FF0000' }}>
                      {errorMsg}
                    </span>
                  )}
                  <p className="text-center">
                    Didn't get an OTP?{' '}
                    {emailOtp ? (
                      <strong
                        onClick={handleResendEmailOtp}
                        style={{ cursor: 'pointer' }}
                      >
                        Resend
                      </strong>
                    ) : (
                      <strong
                        onClick={handleResendPhoneOtp}
                        style={{ cursor: 'pointer' }}
                      >
                        Resend
                      </strong>
                    )}
                  </p>
                  <OTPButton>
                    <div className="d-flex justify-content-between align-items-center ">
                      <button
                        style={{
                          outline: 'none',
                          border: 'none',
                        }}
                        onClick={handleClose}
                        className=" "
                      >
                        Cancel
                      </button>
                      {emailOtp ? (
                        <button
                          style={{
                            outline: 'none',
                            border: 'none',
                          }}
                          onClick={handleEmailOtpSubmit}
                          className=" otp_button_blue "
                        >
                          Ok
                        </button>
                      ) : (
                        <button
                          style={{
                            outline: 'none',
                            border: 'none',
                          }}
                          className="otp_button_blue"
                          onClick={handlePhoneOtpSubmit}
                        >
                          Ok
                        </button>
                      )}
                    </div>
                  </OTPButton>
                </div>
              </div>
            </div>
          </WrappCongrate>
        </div>
      </Wrapper>
    </div>
  );
}

export function SuccessOTP() {
  return (
    <div>
      <Wrapper>
        <div className="d-flex justify-content-center align-items-center">
          <WrappCongrate>
            <div className="container">
              <div className="row">
                <div className="col text-center">
                  <div>
                    <img
                      className="congrate_confet"
                      src={Checked}
                      alt="Checked"
                    />
                  </div>
                  <p className="pt-5">Number verified Successfully</p>
                  <div className="pt-5 ">
                    <button type="button" className="btn verify_congrates_btn">
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </WrappCongrate>
        </div>
      </Wrapper>
    </div>
  );
}

export function Unsuccessful() {
  return (
    <div>
      <Wrapper>
        <div className="d-flex justify-content-center align-items-center">
          <WrappCongrate>
            <div className="container">
              <div className="row">
                <div className="col text-center">
                  <div>
                    <img
                      className="congrate_confet"
                      src={Caneled}
                      alt="Canceled"
                    />
                  </div>
                  <p className="pt-5">
                    Unable to complete, please provied a bank <br /> account
                    tied to your BVN
                  </p>
                  <div className="pt-5 ">
                    <button type="button" className="btn verify_congrates_btn">
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </WrappCongrate>
        </div>
      </Wrapper>
    </div>
  );
}

const OTPButton = styled.div`
  button {
    width: 146px;
    height: 41px;
    background: #f2f2f2;
    border-radius: 10px;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
    color: #111e6c;
    outline: 'none';
    border: 'none';
  }
  .otp_button_blue {
    background: #111e6c;
    color: #ffffff;
  }
`;

const Wrapper = styled.div``;

const WrappCongrate = styled.div`
  border-radius: 20px;
  padding: 2rem;
  text-align: left;
  input {
    border: 1px solid #e0e0e0;
    padding: 1rem 2rem;
    border-radius: 3px;
    margin-right: 10px;
    outline: 'none';
    border: 'none';
  }

  .inputField {
    border: 1px solid #e0e0e0;
    height: 56px;
    border-radius: 3px;
    font-size: 20px;
    color: #000;
    flex: 1 0 56px;
    // outline: none;
    // border: none;
  }

  .enclose {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  h4 {
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 150%;
    letter-spacing: -0.15px;
    text-transform: capitalize;
    color: #242424;
    padding-top: 9px;
  }
  p {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: -0.15px;
    color: #4f4f4f;
    padding-top: 9px;
    padding-bottom: 20px;
  }
  .verify_congrates_btn {
    background: #111e6c;
    color: #f2f2f2;
    border-radius: 10px;
    padding: 8px 80px;
  }

  .grey_btn {
    font-size: 14px;
    width: 180px;
    height: 41px;
    background: #f2f2f2;
    border-radius: 10px;
    color: #111e6c;
    margin-right: 2rem;
  }

  .blue_btn {
    font-size: 14px;
    width: 180px;
    height: 41px;
    background: #111e6c;
    border-radius: 10px;
    color: #ffffff;
    margin-left: 2rem;
  }
`;

export function Notice({ handleClose, handleShowModalTwo, transferNotice }) {
  return (
    <>
      <Wrapper>
        <div className="d-flex justify-content-center align-items-center">
          <WrappCongrate>
            <div className="container">
              <div className="row">
                <div className="col">
                  <h5>Note</h5>
                  {transferNotice === 'transfer' ? (
                    <p className="">
                      You are about to transfer ₦1,000,000 from your Plan 1 plan
                      into Plan 2 plan
                    </p>
                  ) : (
                    <p className="">
                      Your plan is about to be rolled over. kindly confirm
                      action
                    </p>
                  )}
                  <div className="d-flex justify-content-between">
                    <button
                      onClick={handleClose}
                      type="button"
                      className="grey_btn"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleShowModalTwo}
                      type="button"
                      className="blue_btn"
                    >
                      Proceed
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </WrappCongrate>
        </div>
      </Wrapper>
    </>
  );
}

export function TransactionPreview({ handleClose }) {
  return (
    <div>
      <Wrapper>
        <div className="d-flex justify-content-center align-items-center">
          <WrapDetails>
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="d-flex flex-column justify-content-center align-items-center pb-5">
                    <h4>- ₦1,500,000</h4>
                    <p>Part-withdrawal</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-start">
                    <p>Transaction ID</p>
                    <h6>NO_1947034</h6>
                  </div>
                  <div className="d-flex justify-content-between align-items-start">
                    <p>Transaction Date</p>
                    <h6>April 28, 2022</h6>
                  </div>
                  <div className="d-flex justify-content-between align-items-start">
                    <p>Transaction Type</p>
                    <h6>Debit</h6>
                  </div>
                  <div className="d-flex justify-content-between align-items-start">
                    <p>Balance</p>
                    <h6>₦1,000,000</h6>
                  </div>
                  <div className="pt-5 d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn grey_btn"
                      onClick={handleClose}
                    >
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </WrapDetails>
        </div>
      </Wrapper>
    </div>
  );
}

const WrapDetails = styled.div`
  width: 60%;
  h4 {
    font-weight: 600;
    font-size: 19px;
    line-height: 22px;
    color: #242424;
  }
  p {
    font-weight: 400;
    font-size: 15px;
    line-height: 150%;
    color: #242424;
  }
  h6 {
    font-weight: 600;
    font-size: 15px;
    line-height: 16px;
    color: #242424;
  }
  .grey_btn {
    width: 180px;
    height: 41px;
    background: #f2f2f2;
    border-radius: 10px;
    color: #111e6c;
  }
`;
