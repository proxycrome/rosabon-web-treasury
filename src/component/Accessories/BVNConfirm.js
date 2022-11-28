import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Confetti from "../../asset/confetti.png";
import Checked from "../../asset/checked.png";
import Caneled from "../../asset/cnaceled.png";
import OtpInput from "react18-input-otp";
import JsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import html2canvas from "html2canvas";
import {
  updateUserKyc,
  sendOtp,
  validateOtp,
  sendCompanyOtp,
  verifyPhone,
  validatePhoneOtp,
  planAction,
  verifyBvn,
} from "../../store/actions";

import { Link, useNavigate, NavLink } from "react-router-dom";
import { usePaystackPayment } from "react-paystack";
import { useSelector, useDispatch, connect } from "react-redux";
import { CLEAR_MESSAGES } from "../../store/updateProfile/actionTypes";
import { getCurrIcon } from "../Plan/Accesssories";
import moment from "moment";

export function BVNConfirm({
  bank,
  show,
  handleClose,
  firstName,
  lastName,
  bvn,
  confirmName,
  nameMatch,
  director,
  phone,
  dateOfBirth,
}) {
  const [complete, setComplete] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (nameMatch || (nameMatch && director)) {
      setComplete(true);
    }
  }, [nameMatch, director]);

  const { success } = useSelector((state) => state.auth);
  const { kycData } = useSelector((state) => state.user_profile);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nameMatch && director) {
      confirmName(firstName, lastName);
      handleClose();
      return;
    }

    const data = {
      role: "INDIVIDUAL_USER",
      usage: "TREASURY",
      individualUser: {
        bvn,
        firstName:
          firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase(),
        lastName:
          lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase(),
        isKyc: false,
        status: "ACTIVE",
      },
    };

    console.log(data);
    dispatch(updateUserKyc(data, null, dispatch));
  };

  useEffect(() => {
    if (kycData) {
      if (!nameMatch) {
        const objData = {
          firstName: firstName?.toUpperCase(),
          lastName: lastName?.toUpperCase(),
          id: bvn,
          isSubjectConsent: true,
          phoneNumber: phone,
          dateOfBirth: dateOfBirth,
        };
        console.log(objData);
        dispatch(verifyBvn(objData, null, setComplete));
      }
    }
  }, [kycData]);

  return !complete ? (
    <ConfirmBVN>
      <div className={""}>
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
                        {director ? (
                          <p className="pt-5">
                            Your name on the system should be updated with{" "}
                            {firstName} {lastName} to reflect exactly as it
                            appears on your BVN
                          </p>
                        ) : (
                          <p className="pt-5">
                            Your name on our system will be updated with{" "}
                            {firstName} {lastName} to reflect exactly as it
                            appears on your BVN
                          </p>
                        )}

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
                  {bank === "bank" ? (
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
                  ) : withdraw === "withdraw" ? (
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
                  ) : withdraw === "transter" ? (
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
                  ) : confirmNotice === "rollover" ||
                    transferNotice === "transfer" ||
                    confirmNotice === "withdrawal" ? (
                    <>
                      {transferNotice === "transfer" ? (
                        <p className="py-5">Your Transfer was Successful</p>
                      ) : confirmNotice === "withdrawal" ? (
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
                  ) : cardTopup === "paid" ? (
                    <>
                      <p className="py-5">Your Payment was successful</p>
                      <div className="d-flex justify-content-between">
                        <NavLink state={{ myState: false }} to="/plan-list">
                          <button
                            onClick={handleClose}
                            type="button"
                            className="grey_btn"
                          >
                            Check my investments
                          </button>
                        </NavLink>
                        <NavLink state={{ myState: false }} to="/plan-product">
                          <button
                            onClick={handleClose}
                            type="button"
                            className="blue_btn"
                          >
                            Invest more
                          </button>
                        </NavLink>
                      </div>
                    </>
                  ) : createPlan === "paid" ? (
                    <>
                      <p className="py-5">Plan Successfully Saved</p>
                      <div className="d-flex justify-content-between">
                        <NavLink state={{ myState: false }} to="/plan-list">
                          <button
                            onClick={handleClose}
                            type="button"
                            className="grey_btn"
                          >
                            Check my investments
                          </button>
                        </NavLink>
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
  company,
  phoneData,
}) {
  const [token, setToken] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const { otp, validateOtpError, validateEmailOtp } = useSelector(
    (state) => state.user_profile
  );
  const { phoneMsg, validatePhone } = useSelector(
    (state) => state.updateProfile
  );

  const handleChange = (otp) => setToken(otp);

  const handleEmailOtpSubmit = async (e) => {
    e.preventDefault();
    dispatch(validateOtp(token));
  };

  useEffect(() => {
    if (validateEmailOtp) {
      updateOtp(token);
      handleClose();
    }
  }, [validateEmailOtp]);

  const handlePhoneOtpSubmit = async (e) => {
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
      setErrorMsg("Please enter a valid OTP");
    }
  };

  const handleResendEmailOtp = () => {
    if (company === "company") {
      dispatch(sendCompanyOtp());
    } else {
      dispatch(sendOtp());
    }
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
      phoneData(validatePhone);
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
                      isInputNum={true}
                    />
                  </div>
                  {validateOtpError && (
                    <span className="text-center" style={{ color: "#FF0000" }}>
                      {validateOtpError?.message}
                    </span>
                  )}
                  <p className="text-center">
                    Didn't get an OTP?{" "}
                    {emailOtp ? (
                      <Link to="#">
                        <strong
                          onClick={handleResendEmailOtp}
                          style={{ cursor: "pointer" }}
                        >
                          Resend
                        </strong>
                      </Link>
                    ) : (
                      <Link to="#">
                        <strong
                          onClick={handleResendPhoneOtp}
                          style={{ cursor: "pointer" }}
                        >
                          Resend
                        </strong>
                      </Link>
                    )}
                  </p>
                  <OTPButton>
                    <div className="d-flex justify-content-between align-items-center gap-1">
                      <button
                        style={{
                          outline: "none",
                          border: "none",
                        }}
                        onClick={handleClose}
                        className=" "
                      >
                        Cancel
                      </button>
                      {emailOtp ? (
                        <button
                          style={{
                            outline: "none",
                            border: "none",
                          }}
                          onClick={handleEmailOtpSubmit}
                          className=" otp_button_blue "
                        >
                          Ok
                        </button>
                      ) : (
                        <button
                          style={{
                            outline: "none",
                            border: "none",
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

export function Unsuccessful({ handleClose }) {
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch({ type: CLEAR_MESSAGES });
    handleClose();
  };

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
                    Unable to complete, please provide a bank <br /> account
                    tied to your BVN
                  </p>
                  <div className="pt-5 ">
                    <button
                      type="button"
                      className="btn verify_congrates_btn"
                      onClick={handleCloseModal}
                    >
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
    outline: "none";
    border: "none";
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
    outline: "none";
    border: "none";
  }

  .inputField {
    border: 1px solid #e0e0e0;
    height: 50px;
    border-radius: 3px;
    font-size: 20px;
    color: #000;
    flex: 1 0 45px;
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

export function Notice({
  handleClose,
  handleShowModalTwo = null,
  transferNotice = null,
  transferForm = null,
  payType = "",
  actionType,
  endDate,
  dataObj = null,
}) {
  const dispatch = useDispatch();
  const date = new Date();
  const recentDate = moment(date).format("YYYY-MM-DD");
  const { login } = useSelector((state) => state.auth);
  const user_role = login ? login?.role?.name : "";
  const { singlePlan } = useSelector((state) => state.plan);
  const plan = singlePlan?.data.body ? singlePlan?.data.body : {};

  const receive_amount = transferForm !== null && transferForm?.amount;
  const receiving_plan =
    transferForm !== null && JSON.parse(transferForm?.receive);

  const handleFullRoll = (e) => {
    e.preventDefault();
    const {
      amount,
      formData: {
        contributionValue,
        calculatedInterest,
        paymentMaturity,
        withholdingTax,
      },
      interestRate,
      tenor,
    } = dataObj;
    const data = {
      amount: parseFloat(amount),
      balanceAfterRollover: parseFloat(
        plan?.planSummary?.principal - parseFloat(amount)
      ),
      completed: true,
      plan: parseInt(plan?.id),
      planAction: "ROLLOVER",
      rollToPlan: {
        acceptPeriodicContribution: true,
        actualMaturityDate: moment(endDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
        allowsLiquidation: plan?.allowsLiquidation,
        amount: plan?.product?.properties?.hasTargetAmount
          ? null
          : parseFloat(amount),
        autoRenew: plan?.autoRenew,
        autoRollOver: plan?.autoRenew,
        contributionValue: contributionValue,
        currency: parseInt(plan?.currency?.id),
        dateCreated: recentDate,
        directDebit: plan?.directDebit,
        exchangeRate: plan?.exchangeRate,
        interestRate: interestRate,
        interestReceiptOption: plan?.interestReceiptOption,
        monthlyContributionDay: plan?.monthlyContributionDay,
        numberOfTickets: Math.floor(
          amount / plan?.product?.minTransactionLimit
        ),
        paymentMethod: plan?.paymentMethod,
        planDate: recentDate,
        planName: plan?.planName,
        planStatus: "ACTIVE",
        planSummary: {
          calculatedInterest: parseFloat(calculatedInterest),
          endDate: moment(endDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
          interestRate: interestRate,
          interestReceiptOption: plan?.interestReceiptOption,
          paymentMaturity: parseFloat(paymentMaturity),
          planName: plan?.planName,
          principal: parseFloat(amount),
          startDate: recentDate,
          withholdingTax: parseFloat(withholdingTax),
        },
        product: plan?.product?.id,
        productCategory: plan?.productCategory?.id,
        savingFrequency: plan?.savingFrequency,
        targetAmount: plan?.product?.properties?.hasTargetAmount
          ? parseFloat(amount)
          : null,
        tenor: tenor,
        weeklyContributionDay: plan?.weeklyContributionDay,
      },
    };
    console.log(data);
    dispatch(
      planAction(data, null, handleShowModalTwo, dispatch, null, "full")
    );
  };

  const submit = async () => {
    const formData = {
      amount: parseFloat(receive_amount).toFixed(2),
      completed: true,
      // corporateUserWithdrawalMandate: null,
      // extraDetails: null,
      paymentType: null,
      plan: plan?.id,
      planAction: "TRANSFER",
      planToReceive: receiving_plan?.id,
      // withdrawTo: null,
      // withdrawType: null
    };
    dispatch(planAction(formData, null, handleShowModalTwo, dispatch));
    // await handleShowModalTwo("modal-two");
  };
  return (
    <>
      <Wrapper>
        <div className="d-flex justify-content-center align-items-center">
          <WrappCongrate>
            <div className="container">
              <div className="row">
                <div className="col">
                  <h5>Note</h5>
                  {transferNotice === "transfer" ? (
                    <p className="">
                      You are about to transfer{" "}
                      {getCurrIcon(plan?.currency?.name)}
                      {parseFloat(receive_amount).toFixed(2)} from your{" "}
                      {plan?.planName} plan into {receiving_plan?.planName} plan
                    </p>
                  ) : payType === "pay-card" ? (
                    <p className="">Proceed to pay with card</p>
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
                    {actionType === "rollover" ? (
                      <button
                        onClick={handleFullRoll}
                        type="button"
                        className="blue_btn"
                      >
                        Proceed
                      </button>
                    ) : (
                      <button
                        onClick={submit}
                        type="button"
                        className="blue_btn"
                      >
                        Proceed
                      </button>
                    )}
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

export function TransactionPreview({ handleClose, transaction }) {
  const generatePDF = () => {
    const input = document.getElementById("print");
    const pxToMm = (px) => {
      return Math.floor(px / document.getElementById("print")?.offsetHeight);
    };

    const mmToPx = (mm) => {
      return document.getElementById("print")?.offsetHeight * mm;
    };

    const a4WidthMm = 210;
    const a4HeightMm = 297;
    const a4HeightPx = mmToPx(a4HeightMm);
    const inputHeightMm = pxToMm(input?.offsetHeight);
    const numPages =
      inputHeightMm <= a4HeightMm
        ? 1
        : Math.floor(inputHeightMm / a4HeightMm) + 1;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      // Document of a4WidthMm wide and inputHeightMm high
      // if (inputHeightMm > a4HeightMm) {
      //   // elongated a4 (system print dialog will handle page breaks)
      //   var pdf = new JsPDF('p', 'mm', [inputHeightMm+16, a4WidthMm]);
      // } else {
      // standard a4
      var pdf = new JsPDF();
      // }

      pdf.addImage(imgData, "PNG", 65, 20);
      pdf.save(`transaction.pdf`);
    });
  };

  return (
    <div>
      <Wrapper>
        <div className="d-flex justify-content-center align-items-center">
          <WrapDetails>
            <div className="container">
              <div className="row">
                <div
                  className="col"
                  id="print"
                  style={{ border: "1px solid black" }}
                >
                  <div className="d-flex flex-column justify-content-center align-items-center pb-5">
                    <h4>
                      {transaction?.transactionType === "CREDIT" ? "+" : "-"}{" "}
                      NGN
                      {transaction?.debit.toLocaleString()}
                    </h4>
                    <p style={{ fontSize: "12px" }}>
                      {transaction?.transactionCategory}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between align-items-start">
                    <p>Transaction ID:</p>
                    <h6>{transaction?.transactionId}</h6>
                  </div>
                  <div className="d-flex justify-content-between align-items-start">
                    <p>Transaction Date:</p>
                    <h6>{transaction?.transactionDate.split(" ")[0]}</h6>
                  </div>
                  <div className="d-flex justify-content-between align-items-start">
                    <p>Transaction Type:</p>
                    <h6>{transaction?.transactionType}</h6>
                  </div>
                  <div className="d-flex justify-content-between align-items-start">
                    <p>Balance:</p>
                    <h6>
                      NGN{" "}
                      {transaction?.balanceAfterTransaction.toLocaleString()}
                    </h6>
                  </div>
                </div>
                <div className="pt-5 d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn grey_btn"
                    onClick={generatePDF}
                  >
                    Download PDF
                  </button>
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

export function ProceedPayCard({
  payType = "",
  amount,
  onSuccess,
  onClose,
  text,
  setIsClicked,
}) {
  const { reg_transaction, loading } = useSelector((state) => state.paystack);
  const { users } = useSelector((state) => state.user_profile);

  const config = {
    reference: reg_transaction?.transactionReference,
    email: users?.email,
    amount: JSON.stringify(amount) + "00",
    publicKey: "pk_test_7e6134abc3ba34cad1566cc35a02fd4cc427b067",
  };

  useEffect(() => {
    setIsClicked(false);
  }, []);

  const initializePayment = usePaystackPayment(config);

  return (
    <>
      <Wrapper>
        <div className="d-flex justify-content-center align-items-center">
          <WrappCongrate>
            <div className="container">
              <div className="row">
                {payType === "withdraw-paystack" ? (
                  <div className="col d-flex justify-content-center align-items-center mr-5">
                    <div>
                      <button
                        style={{
                          backgroundColor: "#111E6C",
                          color: "#FFFFFF",
                          width: "300px",
                          height: "41px",
                          borderRadius: "10px",
                        }}
                        onClick={() => {
                          initializePayment(onSuccess, onClose);
                        }}
                        disabled={loading || !reg_transaction}
                      >
                        {loading || !reg_transaction ? "Loading" : text}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="col"></div>
                )}
              </div>
            </div>
          </WrappCongrate>
        </div>
      </Wrapper>
    </>
  );
}
