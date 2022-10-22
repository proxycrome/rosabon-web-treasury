import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MDBDataTable } from "mdbreact";
import { Input, Label, UncontrolledTooltip } from "reactstrap";
import halfEllipse from "../../asset/halfEllipse.png";
import ChoosePlanHolder from "../../asset/chooseplaneHolder.png";
import Verve from "../../asset/master-card-logo.png";
import MOneyTransfer from "../../asset/money-transfer.png";
import FileDoc from "../../asset/file.png";
import { ProfileNavBar } from "../dashboard/ProfileNavbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ModalComponent from "../ModalComponent";
import { Table } from "reactstrap";
import { TransactionPreview } from "../Accessories/BVNConfirm";
import moment from "moment";
import { usePaystackPayment } from "react-paystack";
import { PlanContext } from "./createPlan/PlanForm";
import {
  getWalletTransactions,
  getTickets,
  getOpenTickets,
  getClosedTickets,
  getSingleTicket,
  verifyPaystack,
  createPlan,
} from "../../store/actions";
import Spinner from "../common/loading";
import FileUpload from "../common/fileUpload";


export const NairaCard = () => {
  return (
    <RightWrapper>
      <Card>
        <div className="naira-card position-relative">
          <img
            className="position-absolute eclips-image image-fluid"
            src={halfEllipse}
            alt="halfEllipse"
          />
          <div className="d-flex align-center justify-content-between ">
            <p className="p-0 m-0">Total Networth</p>
            <div className="sqr-box">
              <p className="p-0 m-0">₦</p>
            </div>
          </div>
          <h3 className="pt-1">₦ 1,500, 346.00</h3>
          <div className="down-button pt-4">
            <div className="d-flex justify-content-between">
              <div className="d-flex  align-items-center justify-content-between active-box">
                <div className="sqr-box">
                  <p className="p-0 m-0">05</p>
                </div>
                <p className="p-0 m-0">Active Plans</p>
              </div>
              <div className="d-flex align-items-center justify-content-between add-plan">
                <p className="p-0 m-0">+</p>
                <p className="p-0 m-0"> Add Plan</p>
              </div>
              {/* <button className=''><span className=''>+</span>Add Plan</button> */}
            </div>
          </div>
        </div>
      </Card>
      <div className="home-body">
        <div className="">
          <h4>Categories</h4>
          <div>
            <div className="d-flex align-items-center justify-content-between savins-drop">
              <h5>Fix Savings </h5>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            <p className="para-header">Choose from a fixed savings plan</p>
          </div>
          <div className="choose-plan">
            <div className="d-flex align-items-center justify-content-around">
              <img className="" src={ChoosePlanHolder} alt="ChoosePlanHolder" />
              <div>
                <h5>Product 1</h5>
                <div>
                  <p className="p-0 m-0 pb-2">
                    Lorem Ipsum is simply dummy text of the{" "}
                  </p>
                  <p className="p-0 m-0 pb-2">
                    {" "}
                    printing and typesetting industry.
                  </p>
                  <p className="p-0 m-0 pb-2">
                    Lorem Ipsum is simply dummy text of the{" "}
                  </p>
                </div>
              </div>
            </div>
            <Link to="create-plan">
              <button>Create Plan</button>
            </Link>
          </div>
          <div className="choose-plan">
            <div className="d-flex align-items-center justify-content-around">
              <img className="" src={ChoosePlanHolder} alt="ChoosePlanHolder" />
              <div>
                <h5>Product 1</h5>
                <div>
                  <p className="p-0 m-0 pb-2">
                    Lorem Ipsum is simply dummy text of the{" "}
                  </p>
                  <p className="p-0 m-0 pb-2">
                    {" "}
                    printing and typesetting industry.
                  </p>
                  <p className="p-0 m-0 pb-2">
                    Lorem Ipsum is simply dummy text of the{" "}
                  </p>
                </div>
              </div>
            </div>
            <Link to="create-plan">
              <button>Create Plan</button>
            </Link>
          </div>
          <div>
            <div className="d-flex align-items-center justify-content-between savins-drop">
              <h5>Target Savings</h5>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            <p className="para-header">Choose from a fixed savings plan</p>
          </div>
          <div>
            <div className="d-flex align-items-center justify-content-between savins-drop">
              <h5>Target Income</h5>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            <p className="para-header">Choose from a fixed savings plan</p>
          </div>
        </div>
      </div>
    </RightWrapper>
  );
};

const Card = styled.div`
  @media (max-width: 400px) {
    .naira-card {
      width: 350px;
      height: 212px;
      border: solid 2px red;
      padding: 20px;
    }
    /* p {
            font-size: 12px;
        } */
    h3 {
      font-size: 15px;
    }
    .down-button {
      button {
        font-weight: 500;
        font-size: 11px;
        padding: 0px 10px;
      }
    }
    .add-plan {
      padding: 5px 20px;
      background: #111e6c;
      font-size: 7px;
      color: #ffffff;
      /* border-radius: 10px; */
    }
  }
`;

const RightWrapper = styled.div`
  /* padding-top: 50px; */
  /* padding-left: 50px; */
  /* padding-right: 150px; */
  .naira-card {
    /* width: 513px;
        height: 212px; */
    /* background: #FFFFFF;
        box-shadow: 0px 6px 18px rgba(196, 204, 221, 0.25);
        border-radius: 20px; */
    /* padding: 20px; */
  }
  .eclips-image {
    top: 0;
    right: 0;
  }
  .sqr-box {
    /* width: 41px;
        height: 41px;
        background: #FFFFFF;
        box-shadow: 0px 4px 10px rgba(148, 148, 148, 0.25);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1; */
  }
  /* .active-box {
        padding: 5px 20px;
        background: #F2F2F2;
        border-radius: 10px;
    } */
  /* .add-plan {
        padding: 5px 50px;
        background: #111E6C;
        border-radius: 10px;
        color: #FFFFFF;
    } */
  .savins-drop {
    /* padding-top: 40px; */
  }
  /* .down-button {
        button {
            font-weight: 500;
            font-size: 11px;
            text-align: center;
            color: #FFFFFF;
            background: #111E6C;
            border-radius: 10px;
            outline: none;
            border: none;
            padding: 0px 30px;
        }
    } */
  .choose-plan {
    /* width: 448px;
        height: 213px;
        background: #FFFFFF;
        box-shadow: 0px 4px 30px rgba(196, 204, 221, 0.28);
        border-radius: 8px;
        padding: 30px 10px;
        margin-top: 30px; */
    /* p {
            font-style: normal;
            font-weight: 400;
            font-size: 13px;
            line-height: 148.4%;
            display: flex;
            align-items: flex-end;
            letter-spacing: -0.01em;
            color: #4F4F4F;
        } */
    button {
      /* font-family: 'Montserrat';
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 17px;
            text-align: right;
            letter-spacing: -0.03em;
            color: #111E6C;
            background: #F2F2F2;
            border-radius: 10px;
            outline: none;
            border: none;
            padding: 10px 30px;
            margin-left: 140px;
            margin-top: 10px; */
    }
  }
`;

export const MakePayment = ({ setPaymentType }) => {
  const [card, setCard] = useState("");
  const [bank, setBank] = useState("");
  const { form, setForm } = useContext(PlanContext);
  const directDebit = form.directDebit;

  const handleClick = (e) => {
    if (e.target.value === "card") {
      setForm({
        ...form,
        paymentMethod: "DEBIT_CARD",
      });
      setCard("card");
      setBank("");
    }
    if (e.target.value === "bank") {
      setForm({
        ...form,
        paymentMethod: "BANK_TRANSFER",
      });
      setBank("bank");
      setCard("");
    }
  };

  useEffect(() => {
    const values = {
      bank,
      card,
    };
    setPaymentType(values);
  }, [card, bank, setPaymentType]);

  return (
    <PaymentTypeWrapper>
      <h4 className="pb-4">Choose Payment Type</h4>
      <div className="plan-payment">
        <div className="pb-3">
          <div className="d-flex align-items-center justify-content-between py-4">
            <div className="d-flex align-items-center">
              <img className="verve-card" src={Verve} alt="Verve" />
              <p className="p-0 m-0">Debit Card</p>
            </div>
            <input
              type="radio"
              id="card"
              name="paymentType"
              value="card"
              onClick={handleClick}
            />
          </div>
        </div>
        <div className="pb-5">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <img className="verve-card" src={MOneyTransfer} alt="Verve" />
              <p className="p-0 m-0">Bank Transfer</p>
            </div>
            <input
              type="radio"
              id="bank"
              name="paymentType"
              disabled={directDebit === true ? true : false}
              value="bank"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
      <div className="py-5 check-box-bank">
        <input type="checkbox" id="scales" name="scales" />
        <label htmlFor="scales">I agree to the Terms and Condition</label>
      </div>
    </PaymentTypeWrapper>
  );
};

const PaymentTypeWrapper = styled.div`
  padding: 30px;
  @media (max-width: 700px) {
    width: 100% !important;
  }
  .bank-details {
    padding: 40px;
    background: rgba(28, 68, 141, 0.03);
  }
  label {
    font-weight: 400;
    font-size: 11px;
    line-height: 13px;
    letter-spacing: -0.01em;
    color: #6d6d6d;
    padding-left: 10px;
  }
`;

export const UserBankDetails = () => {
  const { login } = useSelector((state) => state.auth);

  return (
    <div>
      <UserBankDetailsWrapper>
        <div>
          <h4>Bank Details</h4>
          <div className="pt-3">
            <p className="p-0 m-0">
              Hi {login.fullName}, Kindly make payment into the displayed
              account details
            </p>
          </div>
          <div className="pt-4">
            <div>
              <p className="p-0 m-0">Account Number</p>
            </div>
            <p className="p-0 m-0 bold-text">{login.virtualAccountNo} </p>
          </div>
          <div className="pt-3">
            <div>
              <p className="p-0 m-0">Account Name</p>
            </div>
            <p className="p-0 m-0 bold-text">{login.virtualAccountName} </p>
          </div>
          <div className="pt-3">
            <div>
              <p className="p-0 m-0">Bank Name</p>
            </div>
            <p className="p-0 m-0 bold-text">Rosabon</p>
          </div>
          <p className="pt-4">
            Account details expires in 48 hours, kindly endeavour to make
            transfer before 09/07/2022, 09 : 00
          </p>
        </div>
      </UserBankDetailsWrapper>
    </div>
  );
};

const UserBankDetailsWrapper = styled.div``;

export const InterestCalculator = () => {
  return (
    <div>
      <InterestCalculatorWrapper>
        <div className="interest">
          <div className="d-flex align-items-center justify-content-between">
            <h5>Interest Calculator</h5>
            <i className="fa-solid fa-chevron-down"></i>
          </div>
          <div className="row">
            <div className="pt-3">
              <label>Select Product</label>
              <div className="input-group mb-4">
                <input
                  className="form-control"
                  placeholder="Select Product"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className=" ">
              <label>Enter Amount</label>
              <div className="input-group mb-4">
                <input
                  className="form-control"
                  placeholder="N  0.00"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className=" ">
              <label>Tenor</label>
              <div className="input-group mb-4">
                <input
                  className="form-control"
                  placeholder="N  0.00"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="text-center calc-mty py-4">
            <button>Calculate Amount at maturity</button>
          </div>
          <div className="row pt-4">
            <div className=" ">
              <div className="input-group mb-4">
                <input
                  className="form-control"
                  placeholder="N  0.00"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </InterestCalculatorWrapper>
    </div>
  );
};

const InterestCalculatorWrapper = styled.div`
  .calculatoe {
    background: rgba(28, 68, 141, 0.02);
    padding: 20px 40px;
    .interest {
      background: #ffffff;
      box-shadow: 0px 4px 10px rgba(196, 204, 221, 0.18);
      border-radius: 8px;
      padding: 2rem;
    }
  }
  .circle-notification {
    width: 41px;
    height: 41px;
    background: rgba(17, 30, 108, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  }
  input {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.01em;
    color: #535353;
    padding: 10px 10px;
  }
  .para-header {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 171.5%;
    letter-spacing: -0.15px;
    color: #000000;
  }
  .para-text {
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 20px;
    display: flex;
    align-items: flex-end;
    text-align: center;
    letter-spacing: -0.02em;
    color: #4f4f4f;
  }
  h4 {
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: -0.04em;
    color: #242424;
  }
  h5 {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 16px;
    letter-spacing: -0.03em;
    color: #242424;
  }
  label {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #828282;
  }
  .calc-mty {
    button {
      padding: 0.7rem;
      background: #f2f2f2;
      border-radius: 10px;

      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: -0.03em;
      color: #111e6c;
    }
  }
`;

export const RolloverSummary = () => {
  return (
    <div>
      <RolloverSummaryWrapper>
        <h4 className="">Rollover Summary</h4>
        <div className="plan-content">
          <div className="rollover">
            <div className="plan-top h-50 p-4">
              <h4>Plan 1</h4>
              <div className="d-flex align-items-center justify-content-between pt-4">
                <div>
                  <p className="p-0 m-0">Start date </p>
                  <h4>24/06/2023</h4>
                </div>
                <div className="rollover-text-left">
                  <p className="p-0 m-0">End date </p>
                  <h4>24/06/2023</h4>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between pt-4">
                <div>
                  <p className="p-0 m-0">Principal </p>
                  <h4> ₦2,500,000</h4>
                </div>
                <div className="rollover-text-left">
                  <p className="p-0 m-0">Amount for Withdrawal </p>
                  <h4 className=""> ₦0.00</h4>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between pt-4">
                <div>
                  <p className="p-0 m-0">Interst Rate </p>
                  <h4>20.00 %</h4>
                </div>
                <div className="rollover-text-left">
                  <p className="p-0 m-0">
                    Interest Payment <br /> frequency{" "}
                  </p>
                  <h4 className="">Daily</h4>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between pt-4">
                <div>
                  <p className="p-0 m-0">Calculated Interest </p>
                  <h4>₦200,000</h4>
                </div>
                <div className="rollover-text-left">
                  <p className="p-0 m-0">Withholding Tax</p>
                  <h4 className="">₦2,000</h4>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between pt-4">
                <div>
                  <p className="p-0 m-0">Payment at Maturity</p>
                  <h4>₦2,700,000</h4>
                </div>
                <div className="rollover-text-left"></div>
              </div>
              <div className="py-5 check-box-bank">
                <input type="checkbox" id="scales" name="scales" />
                <label htmlFor="scales">
                  I agree to the Terms and Condition
                </label>
              </div>
            </div>
          </div>
        </div>
      </RolloverSummaryWrapper>
    </div>
  );
};

const RolloverSummaryWrapper = styled.div`
  box-shadow: 0px 4px 30px rgba(196, 204, 221, 0.28);
  padding: 40px;
  background: #ffffff;
  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.01em;
    color: #242424;
  }
  h4 {
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: -0.03em;
    color: #242424;
  }
  .rollover {
    h4 {
      font-weight: 700;
      font-size: 13px;
      line-height: 18px;
    }
    .rollover-text-left {
      text-align: right;
    }
    label {
      font-weight: 400;
      font-size: 11px;
      line-height: 13px;
      letter-spacing: -0.01em;
      color: #6d6d6d;
      padding-left: 10px;
    }
  }
`;

export const RolloverWithdrawMethod = () => {
  const [withdraw, setWithdraw] = useState("");
  return (
    <div>
      <RolloverSummaryWrapper>
        <h4 className="">
          Kindly select beneficiary account to receive the withdrawal
        </h4>
        <div className="plan-content">
          <div className="rollover">
            <div className="plan-top h-50 p-4">
              <div className="row my-4">
                <div className="col ">
                  <div className="input-group">
                    <select
                      className="form-select form-select-md"
                      aria-label=".form-select-md"
                      name="withdraw"
                      onChange={(e) => setWithdraw(e.target.value)}
                    >
                      <option value="">Select withdrawal destination</option>
                      <option value="bank">To Bank</option>
                      <option value="wallet">My Wallet</option>
                    </select>
                  </div>
                </div>
              </div>
              {withdraw === "bank" && (
                <div className="mt-3">
                  <div className="pt-4">
                    <p className="p-0 m-0">Account Number</p>
                    <h4>2210345678</h4>
                  </div>
                  <div className="pt-4">
                    <p className="p-0 m-0">Account Name</p>
                    <h4>Ekiyee Bllaowel</h4>
                  </div>
                  <div className="pt-4">
                    <p className="p-0 m-0">Bank Name</p>
                    <h4>Zenith Bank</h4>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </RolloverSummaryWrapper>
    </div>
  );
};

export const WithdrawalSummary = () => {
  const { singlePlan } = useSelector((state) => state.plan);
  const plan = singlePlan?.data.body ? singlePlan?.data.body : {};
  return (
    <div>
      <RolloverSummaryWrapper>
        <h4 className="">Withdrawal Summary</h4>
        <div className="plan-content">
          <div className="rollover">
            <div className="plan-top h-50 p-4">
              <h4>{plan.planName}</h4>
              <div className="d-flex align-items-center justify-content-between pt-4">
                <div>
                  <p className="p-0 m-0">Start date </p>
                  <h4>
                    {moment(plan.planSummary.startDate).format("DD/MM/YYYY")}
                  </h4>
                </div>
                <div className="rollover-text-left">
                  <p className="p-0 m-0">End date </p>
                  <h4>
                    {moment(plan.planSummary.endDate).format("DD/MM/YYYY")}
                  </h4>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between pt-4">
                <div>
                  <p className="p-0 m-0">
                    Balance before <br /> Liquidation{" "}
                  </p>
                  <h4> ₦2,000,000</h4>
                </div>
                <div className="rollover-text-left">
                  <p className="p-0 m-0">Withdrawal Amount</p>
                  <h4 className=""> ₦1,500,000</h4>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between pt-4">
                <div>
                  <p className="p-0 m-0">Penal Charges </p>
                  <h4>₦40,000</h4>
                </div>
                <div className="rollover-text-left">
                  <p className="p-0 m-0">
                    Available Plan
                    <br /> Balance{" "}
                  </p>
                  <h4 className="">₦460,000</h4>
                </div>
              </div>
              <div className="mt-4">
                <div>
                  <p className="p-0 mb-3">Reason for withdrawal</p>
                  <p>
                    as it is sometimes known, is dummy text used in laying out
                    print, graphic or web designs. The passage is attributed to
                    an unknown typesetter in the 15th century
                  </p>
                </div>
              </div>
              <div className="py-5 check-box-bank">
                <input type="checkbox" id="scales" name="scales" />
                <label htmlFor="scales">
                  I agree to the Terms and Condition
                </label>
              </div>
            </div>
          </div>
        </div>
      </RolloverSummaryWrapper>
    </div>
  );
};

// handles currency icon
export const getCurrIcon = (currency) => {
  switch (currency) {
    case "YEN":
      return (
        <p style={{ fontSize: 14, color: "#535353", fontWeight: 600 }}>
          &#165;
        </p>
      );
    case "USD":
      return (
        <p style={{ fontSize: 14, color: "#535353", fontWeight: 600 }}>&#36;</p>
      );
    case "CAD":
      return (
        <p style={{ fontSize: 14, color: "#535353", fontWeight: 600 }}>&#36;</p>
      );
    case "NGN":
      return (
        <p style={{ fontSize: 14, color: "#535353", fontWeight: 600 }}>
          &#8358;
        </p>
      );
    case "EURO":
      return (
        <p style={{ fontSize: 14, color: "#535353", fontWeight: 600 }}>
          &#163;
        </p>
      );
    default:
      return <p></p>;
  }
};

export const PlanSummary = ({ planPay }) => {
  const { form } = useContext(PlanContext);
  console.log("gg");
  let planData = form;
  return (
    <div>
      <PlanSummaryWrapper>
        {planPay && <h4 className="">Plan Summary</h4>}
        <div className="plan-content">
          <div className="rollover">
            <div className="plan-top h-50 p-4">
              {/* <h4>Plan 1</h4> */}
              <h4>{planData.planSummary.planName} </h4>
              <div className="d-flex align-items-center justify-content-between pt-3">
                <div>
                  <p className="p-0 m-0">Start date </p>
                  {/* <h4>24/06/2023</h4> */}
                  <h4>{planData.planSummary.startDate}</h4>
                </div>
                <div className="rollover-text-left">
                  <p className="p-0 m-0">End date </p>
                  {/* <h4>24/06/2023</h4> */}
                  <h4>{planData.planSummary.endDate}</h4>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between pt-4">
                <div>
                  <p className="p-0 m-0">Principal </p>
                  {/* <h4> ₦2,500,000</h4> */}
                  <h4 className="flex">
                    {getCurrIcon(planData?.currency)}{" "}
                    {planData.planSummary.principal}
                  </h4>
                </div>
                <div className="rollover-text-left">
                  <p className="p-0 m-0">Interest Rate </p>
                  {/* <h4>20.00 %</h4> */}
                  <h4 className="d-flex justify-content-end">
                    {planData.planSummary.interestRate} %
                  </h4>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between pt-4">
                <div>
                  <p className="p-0 m-0">
                    Interest Payment <br /> frequency{" "}
                  </p>
                  {/* <h4 className="">Daily</h4> */}
                  <h4>{planData.planSummary.interestReceiptOption}</h4>
                </div>
                <div className="rollover-text-left">
                  <p className="p-0 m-0">Calculated Interest </p>
                  {/* <h4>₦200,000</h4> */}
                  <h4 className="flex justify-content-end">
                    {getCurrIcon(planData?.currency)}{" "}
                    {planData.planSummary.calculatedInterest}
                  </h4>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between pt-4">
                <div>
                  <p className="p-0 m-0">Withholding Tax</p>
                  {/* <h4 className="">₦2,000</h4> */}
                  <h4 className="flex">
                    {getCurrIcon(planData?.currency)}{" "}
                    {planData.planSummary.withholdingTax}
                  </h4>
                </div>
                <div className="rollover-text-left">
                  <p className="p-0 m-0">Payment at Maturity</p>
                  {/* <h4>₦2,700,000</h4> */}
                  <h4 className="flex justify-content-end">
                    {getCurrIcon(planData?.currency)}{" "}
                    {planData.planSummary.paymentMaturity}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PlanSummaryWrapper>
    </div>
  );
};

const PlanSummaryWrapper = styled.div`
  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.01em;
    color: #242424;
  }
  h4 {
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: -0.03em;
    color: #242424;
  }
  .plan-content {
    background-color: #ffffff;
    margin-top: 40px;
  }
  .rollover {
    h4 {
      font-weight: 700;
      font-size: 13px;
      line-height: 18px;
      margin-top: -30px;
    
    .rollover-text-left {
      text-align: right;
    }
    label {
      font-weight: 400;
      font-size: 11px;
      line-height: 13px;
      letter-spacing: -0.01em;
      color: #6d6d6d;
      padding-left: 10px;
    }
  }

  .flex {
    display: flex;
    gap: 4px;
  }
`;

export const WithdrawalBank = () => {
  return (
    <div>
      <WithdrawalBankWrapper>
        <h4 className="">Rollover Summary</h4>
        <div className="pt-5">
          <div className=" ">
            <label>Bank Name</label>
            <div className="input-group mb-4">
              <input
                className="form-control"
                placeholder="Choose a product"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="pt-1">
          <div className=" ">
            <label>Account Number</label>
            <div className="input-group mb-4">
              <input className="form-control" placeholder="" type="text" />
            </div>
          </div>
        </div>
        <div className="pt-1">
          <div className=" ">
            <label>Account Name</label>
            <div className="input-group mb-4">
              <input className="form-control" placeholder="" type="text" />
            </div>
          </div>
        </div>
        <label className="pb-4">Amount for withdrawal is ₦ 1,500,000</label>
      </WithdrawalBankWrapper>
    </div>
  );
};

const WithdrawalBankWrapper = styled.div`
  label {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #828282;
  }
`;

export const Beneficiary = () => {
  return (
    <div>
      <BeneficiaryWrapper>
        <h4 className="pt-3">
          Kindly select beneficiary account to <br /> receive the withdrawal
        </h4>
        <div className="py-5">
          <div className=" ">
            <div className="input-group mb-4">
              <input
                className="form-control"
                placeholder="Select withdrawal destination"
                type="text"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="row pb-4">
            <div className="d-flex align-items-center justify-content-between w-100">
              <div className="progress-bar-style d-flex align-items-center justify-content-start">
                <img
                  className="file-image image-fluid"
                  src={FileDoc}
                  alt="FileDoc"
                />
                <div className="progress-bar-style">
                  <h5 className="position-relative">
                    Upload withdrawal mandate <br /> instruction
                  </h5>
                  <p className="p-0 m-0">jpg, png. PDF 2 MB</p>
                </div>
              </div>
              <div className="w-30 style-attachment">
                <button className="normal-btn grey-button">Choose file</button>
              </div>
            </div>
          </div>
          <h5 className="py-5">
            Letter must be on a company’s letter head and also carry bank
            account details
          </h5>
        </div>
        {/* <div>
          <div className="py-3">
            <p className="p-0 m-0">Account Name</p>
            <h4 className="">2210345678</h4>
          </div>
          <div className="py-3">
            <p className="p-0 m-0">Account Name</p>
            <h4 className="">Ekiyee Bilaowei</h4>
          </div>
          <div className="py-3">
            <p className="p-0 m-0">Bank Name</p>
            <h4 className="">Zenith Bank</h4>
          </div>
        </div> */}
      </BeneficiaryWrapper>
    </div>
  );
};

const BeneficiaryWrapper = styled.div`
  input {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #828282;
    padding: 13px;
    /* margin-bottom: 300px; */
  }
  h4 {
    font-weight: 700;
    font-size: 13px;
    line-height: 18px;
  }
  h5 {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #828282;
  }
  p {
    font-weight: 400;
    font-size: 10px !important;
    line-height: 12px;
    letter-spacing: -0.04em;
    color: #333333;
  }
  button {
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
    padding: 10px;
    background: #f2f2f2;
    border-radius: 5px;
    color: #828282;
  }
`;

export const AvailableBalance = ({
  role,
  bankDetails,
  bankDetailsError,
  withdrawReasons,
  withdrawData,
  errors,
  walletBalance,
}) => {
  const [showTextArea, setShowTextArea] = useState(false);
  const [withdrawMandateImage, setWithdrawMandateImage] = useState({});
  const [withdrawInstructionImage, setWithdrawInstructionImage] = useState({});

  const data = {
    withdrawalAmount: "",
    bankAccountId: 0,
    withdrawalReasonId: "",
    withdrawalReasonOthers: "",
  };

  const [formData, setFormData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (role !== "COMPANY") {
      const {
        withdrawalAmount,
        bankAccountId,
        withdrawalReasonId,
        withdrawalReasonOthers,
      } = formData;

      const data = {
        bankAccountId: Number(bankAccountId),
        withdrawalAmount: Number(withdrawalAmount),
        withdrawalReasonId,
        withdrawalReasonOthers,
      };
      withdrawData(data);
    }
    if (role === "COMPANY") {
      const { withdrawalAmount, withdrawalReasonId, withdrawalReasonOthers } =
        formData;

      const data = {
        withdrawalAmount: Number(withdrawalAmount),
        withdrawalReasonId,
        withdrawalReasonOthers,
        // withdrawalInstructionImage: withdrawInstructionImage,
        withdrawalMandateLetterImage: withdrawMandateImage,
      };
      withdrawData(data);
    }
  }, [formData]);

  const handleOnclick = (e) => {
    if (e.target.value === "others") {
      setShowTextArea(!showTextArea);
    }
  };

  const handleFileSelect = (e, reference) => {
    e.preventDefault();
    reference.current.click();
  };

  console.log(withdrawReasons);
  console.log(bankDetails);
  return (
    <AvailableBalanceWapper>
      {role === "COMPANY" && (
        <UncontrolledTooltip placement="bottom" target="mandate">
          Letter must be on a company's letter head and also carry bank account
          details
        </UncontrolledTooltip>
      )}
      <h3>Withdraw to Bank</h3>
      <div className="d-flex align-items-center justify-content-between">
        <h4 className="pt-3">Available Balance</h4>
        <h4 className="pt-3">
          ₦ {walletBalance?.amount ? walletBalance?.amount.toFixed(2) : 0}
        </h4>
      </div>
      {role !== "COMPANY" &&
        bankDetailsError === "Bank Account not available for this user" && (
          <span className="text-danger">
            No Registered Bank Account Details
          </span>
        )}
      <div className="pt-3">
        <div className="mb-4">
          <label>Withdrawal Amount</label>
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              placeholder="N 1,500,000"
              name="withdrawalAmount"
              value={formData.withdrawalAmount}
              onChange={handleChange}
            />
          </div>
          {errors.withdrawalAmount && (
            <small className="text-danger">{errors.withdrawalAmount}</small>
          )}
        </div>
      </div>
      <div className="pt-1 mb-3">
        <div className="mb-4">
          <label>Beneficiary Account</label>
          <div className="input-group">
            <select
              className="form-select form-select-md select-field"
              aria-label=".form-select-md"
              name="bankAccountId"
              value={formData.bankAccountId}
              onChange={handleChange}
            >
              {role === "COMPANY" ? (
                <option value={0}>To Bank</option>
              ) : (
                <>
                  <option value={0}>Please select your account</option>
                  <option value={bankDetails?.id}>
                    {bankDetails?.bank?.name} - {bankDetails?.accountNumber}
                  </option>
                </>
              )}
            </select>
          </div>
          {errors.bankAccountId && (
            <small className="text-danger">{errors.bankAccountId}</small>
          )}
        </div>
      </div>
      {role === "COMPANY" ? (
        <>
          <div className="mb-4">
            <FileUpload
              fileName="withdrawal mandate instruction letter"
              setFile={(file) => setWithdrawMandateImage(file)}
              id="mandate"
            />
            {errors.withdrawalMandateLetterImage && (
              <small className="text-danger">
                {errors.withdrawalMandateLetterImage}
              </small>
            )}
          </div>
          {/* <div className="mb-4">
            <FileUpload
              fileName="withdrawal instruction document"
              setFile={(file) => setWithdrawInstructionImage(file)}
              id="mandate"
            />
            {errors.withdrawalInstructionImage && (
              <small className="text-danger">
                {errors.withdrawalInstructionImage}
              </small>
            )}
          </div> */}
        </>
      ) : (
        <></>
      )}

      <div className="pt-1 mb-3">
        <div className="mb-4">
          <label>Reason for Withdrawal</label>
          <div className="input-group">
            <select
              className="form-select form-select-md select-field"
              aria-label=".form-select-md"
              onClick={handleOnclick}
              name="withdrawalReasonId"
              value={formData.withdrawalReasonId}
              onChange={handleChange}
            >
              <option value="">Please select reason for withdrawal</option>
              {withdrawReasons?.map((data) => (
                <option key={data.id} value={`${data.id}`}>
                  {data.reason}
                </option>
              ))}
              <option value="others">Others</option>
            </select>
          </div>
          {errors.withdrawalReasonId && (
            <small className="text-danger">{errors.withdrawalReasonId}</small>
          )}
        </div>
      </div>
      {showTextArea ? (
        <>
          <div className="pb-4">
            <div className="mb-4">
              <div className="input-group">
                <textarea
                  rows="5"
                  cols="60"
                  placeholder="Please provide reason for withdrawal"
                  className="form-control select-field"
                  name="withdrawalReasonOthers"
                  value={formData.withdrawalReasonOthers}
                  onChange={handleChange}
                ></textarea>
              </div>
              {errors.withdrawalReasonOthers && (
                <small className="text-danger">
                  {errors.withdrawalReasonOthers}
                </small>
              )}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </AvailableBalanceWapper>
  );
};

export const TransferCard = ({ walletBalance }) => {
  return (
    <AvailableBalanceWapper>
      <h3>Transfer</h3>
      <div className="d-flex align-items-center justify-content-between">
        <h4 className="pt-3">Available Balance</h4>
        <h4 className="pt-3">
          ₦ {walletBalance?.amount ? walletBalance?.amount.toFixed(2) : 0}
        </h4>
      </div>
      <div className="pt-3">
        <div className=" ">
          <label>Transfer Amount</label>
          <div className="input-group mb-4">
            <input
              className="form-control"
              placeholder="N1,500,000"
              type="text"
            />
          </div>
        </div>
      </div>
      <div className="pt-1 pb-5">
        <div className=" ">
          <label>Beneficiary Account</label>
          <select
            className="form-select form-select-lg mb-3 select-field"
            aria-label=".form-select-lg"
            name="companyType"
          >
            <option value=""></option>
            <option value="others">Plan 1</option>
            <option value="others">Plan 2</option>
            <option value="others">Plan 3</option>
            <option value="others">Credit wallet</option>
          </select>
        </div>
      </div>
    </AvailableBalanceWapper>
  );
};

const AvailableBalanceWapper = styled.div`
  input {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: -0.01em;
    color: #bdbdbd;
    padding: 0.7rem;
  }
  textarea {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: -0.01em;
    color: #bdbdbd;
  }
  .select-field {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: -0.01em;
    color: #242424;
    padding: 15px;
  }

  small {
    font-size: 12px;
  }

  h5 {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #828282;
  }
  p {
    font-weight: 400;
    font-size: 10px !important;
    line-height: 12px;
    letter-spacing: -0.04em;
    color: #333333;
  }
  button {
    font-style: normal;
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
    padding: 10px;
    background: #f2f2f2;
    border-radius: 5px;
    color: #828282;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

export const HistoryTable = () => {
  const date = {
    startDate: "",
    endDate: "",
  };
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(date);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(getWalletTransactions());
  }, [dispatch]);

  const { walletTransactions } = useSelector((state) => state.wallet);

  useEffect(() => {
    const filteredWalletTrans = walletTransactions?.entities?.filter((item) => {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);

      const itemDate = moment(item.createdAt, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      );

      console.log(itemDate);
      const date = new Date(itemDate);

      return date >= startDate && date <= endDate;
    });
    setFilteredTransactions(filteredWalletTrans);
  }, [formData]);

  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const data = {
    columns: [
      {
        label: "ID",
        field: "id",
        width: 150,
      },
      {
        label: "Date",
        field: "date",
        width: 100,
      },
      {
        label: "Description",
        field: "description",
        width: 100,
      },
      {
        label: "Type",
        field: "type",
        width: 100,
      },
      {
        label: "Amount",
        field: "amount",
        width: 100,
      },
      {
        label: "Balance",
        field: "balance",
        width: 100,
      },
    ],
    rows:
      filteredTransactions?.length > 0
        ? filteredTransactions?.map((data) => ({
            id: (
              <Link to="#" onClick={() => setShow(true)}>
                <div>{data?.id}</div>
              </Link>
            ),
            date: `${data?.createdAt?.split(" ")[0]}`,
            description: `${data?.transactionDescription}`,
            type: `${data?.transactionType}`,
            amount: `${
              data?.transactionType === "CREDIT"
                ? "+ " + data?.amount
                : "- " + data?.amount
            }`,
            balance: "",
          }))
        : walletTransactions?.entities?.map((data) => ({
            id: (
              <Link to="#" onClick={() => setShow(true)}>
                <div>{data?.id}</div>
              </Link>
            ),
            date: `${data?.createdAt?.split(" ")[0]}`,
            description: `${data?.transactionDescription}`,
            type: `${data?.transactionType}`,
            amount: `${
              data?.transactionType === "CREDIT"
                ? "+ " + data?.amount
                : "- " + data?.amount
            }`,
            balance: "",
          })),
  };

  const startDate = new Date(formData.startDate);
  const endDate = new Date(formData.endDate);

  return (
    <div>
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">History</span>
        </NavTitle>
      </ProfileNavBar>
      <HistoryTableWarapper>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <h4 className="">Filter by Transaction Date</h4>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-sm-4 col-md-6">
                  <div className=" ">
                    <div className="mb-4">
                      <Label>Start Date</Label>
                      <Input
                        className="form-control"
                        placeholder="Start date"
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-sm-4 col-md-6">
                  <div className=" ">
                    <div className="mb-4">
                      <Label>End Date</Label>
                      <Input
                        className="form-control"
                        placeholder="End date"
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h3>
          {formData.startDate &&
            formData.endDate &&
            `${month[startDate.getMonth()]} ${startDate.getDate()} - ${
              month[endDate.getMonth()]
            } ${endDate.getDate()}`}
        </h3>
        <hr className="mb-5" />

        <div>
          <div>
            <MDBDataTable responsive striped data={data} searching={false} />
          </div>
          <ModalComponent
            show={show}
            size={"md"}
            handleClose={() => {
              setShow(false);
            }}
          >
            <TransactionPreview handleClose={() => setShow(false)} />
          </ModalComponent>
        </div>
      </HistoryTableWarapper>
    </div>
  );
};

const HistoryTableWarapper = styled.div`
  padding: 30px;
  tr {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.01em;
    color: #242424;
    cursor: pointer;
  }
  th {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: -0.03em;
    color: #000000;
  }
  th,
  td {
    padding: 20px;
  }
  input {
    background: #fbf8f8;
    border-radius: 5px;
  }
  h3 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: #000000;
    padding-top: 50px;
  }
  .grey-text {
    color: #bdbdbd;
    cursor: pointer;
  }
`;

export const ReferalTable = () => {
  const data = {
    columns: [
      {
        label: "S/N",
        field: "sn",
        width: 100,
      },
      {
        label: "Date",
        field: "date",
        width: 100,
      },
      {
        label: "Name",
        field: "name",
        width: 100,
      },
      {
        label: "Status",
        field: "status",
        width: 100,
      },
      {
        label: null,
        field: "action",
        width: 100,
      },
    ],
    rows: [
      {
        sn: 1,
        date: "Apr 28 2022",
        name: "Jane Doe",
        status: "Active",
        action: <button className="active">Poke User</button>,
      },
      {
        sn: 2,
        date: "Apr 28 2022",
        name: "Jane Doe",
        status: "Active",
        action: <button className="active">Poke User</button>,
      },
      {
        sn: 3,
        date: "Apr 28 2022",
        name: "Jane Doe",
        status: "Active",
        action: <button className="active">Poke User</button>,
      },
      {
        sn: 4,
        date: "Apr 28 2022",
        name: "Jane Doe",
        status: "Active",
        action: <button className="in-active">Poke User</button>,
      },
    ],
  };

  return (
    <div>
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">Wallet</span>
        </NavTitle>
      </ProfileNavBar>
      <ReferalTableWarapper>
        <h3>My Referrals</h3>
        <div className="d-flex justify-content-start align-items-center">
          <div className="padd-referal">
            <label>Referral Link</label>
            <div className="input-group mb-3">
              <input type="text" className="form-control" />
              <div className="input-group-text">
                <i className="fa-solid fa-key"></i>
              </div>
            </div>
          </div>
          <div className="">
            <p className="p-0 m-0">Total Referrals</p>
            <div className="box-image">
              <h3>12</h3>
            </div>
          </div>
        </div>

        <div>
          <MDBDataTable responsive striped data={data} searching={false} />
        </div>
      </ReferalTableWarapper>
    </div>
  );
};

const ReferalTableWarapper = styled.div`
  padding: 30px;
  padding-right: 30%;

  .box-image {
    width: 94px;
    height: 40px;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h3 {
      font-size: 17px;
      font-weight: 600;
    }
  }
  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #828282;
  }
  .padd-referal {
    padding-right: 100px;
  }
  input {
    /* border: 1px solid #e0e0e0 !important; */
    border-radius: 8px;
  }
  .in-active {
    background: #111e6c;

    color: #ffffff;
  }
  button {
    border-radius: 15px;
    padding: 10px 15px;
  }
  .active {
    background: rgba(17, 30, 108, 0.05);

    color: #828282;
  }
  tr {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.01em;
    color: #242424;
  }
  th {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: -0.03em;
    color: #000000;
  }
  th,
  td {
    padding: 10px;
  }
  input {
    background: #fbf8f8;
    border-radius: 5px;
  }
  h3 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: #000000;
  }
`;

export const ReferralBonus = () => {
  const data = {
    columns: [
      {
        label: "ID",
        field: "id",
        width: 100,
      },
      {
        label: "Date",
        field: "date",
        width: 100,
      },
      {
        label: "Description",
        field: "description",
        width: 100,
      },
      {
        label: "Balance",
        field: "balance",
        width: 100,
      },
    ],
    rows: [
      {
        id: 1,
        date: "Apr 28 2022",
        description: "Referral Bonus for Jane Doe first activation",
        balance: "₦1,000,000",
      },
      {
        id: 2,
        date: "Apr 28 2022",
        description: "Referral Bonus for Jane Doe first activation",
        balance: "₦1,000,000",
      },
      {
        id: 3,
        date: "Apr 28 2022",
        description: "Referral Bonus for Jane Doe first activation",
        balance: "₦1,000,000",
      },
      {
        id: 4,
        date: "Apr 28 2022",
        description: "Referral Bonus for Jane Doe first activation",
        balance: "₦1,000,000",
      },
    ],
  };

  return (
    <div>
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">Wallet</span>
        </NavTitle>
      </ProfileNavBar>
      <ReferalTableBonusWarapper>
        <h3>My Referral Bonus</h3>
        <div className="bonus-card d-flex justify-content-between aligin-items-center">
          <div className="earn-bonus">
            <div className="d-flex justify-content-between aligin-items-center">
              <div>
                <p className="m-0 p-0">Earned Referral Bonus</p>
                <h4 className="py-4">₦ 0.00</h4>
              </div>
              <div>
                <button>Redeem</button>
              </div>
            </div>
            <div className="d-flex align-items-content justify-content-center">
              <p className="m-0 p-0">0 out of ₦100,000 Earned</p>
            </div>
          </div>
          <div className="total-bonus">
            <p className="p-0 m-0">Total Redeemed Bonus :</p>
            <h4 className="total-amount">₦ 0.00</h4>
          </div>
        </div>

        <div>
          <MDBDataTable responsive striped data={data} searching={false} />
        </div>
      </ReferalTableBonusWarapper>
    </div>
  );
};

const ReferalTableBonusWarapper = styled.div`
  padding: 30px;
  padding-right: 30%;
  button {
    background: #111e6c;
    border-radius: 10px;
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    text-align: right;
    color: #ffffff;
    padding: 7px 20px;
  }
  .bonus-card {
    width: 100%;
    padding: 50px 0;
  }
  .box-image {
    padding: 20px;
    background: #ffffff;
    box-shadow: 0px 4px 10px rgba(148, 148, 148, 0.25);
    border-radius: 10px;
  }
  .earn-bonus {
    background: #f2f2f2;
    box-shadow: 0px 4px 33px rgba(196, 204, 221, 0.28);
    border-radius: 8px;
    width: 70%;
    padding: 20px;
  }
  .total-bonus {
    background: #ffffff;
    box-shadow: 0px 4px 30px rgba(196, 204, 221, 0.28);
    border-radius: 8px;
    padding: 20px;
  }
  .total-amount {
    padding-top: 50px;
  }
  tr {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.01em;
    color: #242424;
  }
  th {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: -0.03em;
    color: #000000;
  }
  th,
  td {
    padding: 20px;
  }
  h3 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: -0.03em;
    color: #242424;
  }
  h4 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 21px;
    letter-spacing: -0.04em;
    color: #242424;
  }
  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-align: right;
    letter-spacing: -0.01em;
    color: #242424;
  }
`;

export const TransferDeposit = () => {
  const [bank, setBank] = useState(false);
  const [credit, setCredit] = useState(false);
  const [transfer, setTransfer] = useState(false);

  const data = {
    columns: [
      {
        label: "S/N",
        field: "sn",
        width: 100,
      },
      {
        label: "Date",
        field: "date",
        width: 100,
      },
      {
        label: "Description",
        field: "description",
        width: 100,
      },
      {
        label: "Type",
        field: "type",
        width: 100,
      },
      {
        label: "Amount",
        field: "amount",
        width: 100,
      },
      {
        label: "Balance",
        field: "balance",
        width: 100,
      },
    ],
    rows: [
      {
        sn: "N0_1947034",
        date: "Apr 28 2022",
        description: "Part withdrawal",
        type: "Debit",
        amount: " - ₦1,500,000",
        balance: "₦1,000,000",
      },
      {
        sn: "N0_1947034",
        date: "Apr 28 2022",
        description: "Part withdrawal",
        type: "Debit",
        amount: " - ₦1,500,000",
        balance: "₦1,000,000",
      },
      {
        sn: "N0_1947034",
        date: "Apr 28 2022",
        description: "Part withdrawal",
        type: "Debit",
        amount: " - ₦1,500,000",
        balance: "₦1,000,000",
      },
      {
        sn: "N0_1947034",
        date: "Apr 28 2022",
        description: "Part withdrawal",
        type: "Debit",
        amount: " - ₦1,500,000",
        balance: "₦1,000,000",
      },
      {
        sn: "N0_1947034",
        date: "Apr 28 2022",
        description: "Part withdrawal",
        type: "Debit",
        amount: " - ₦1,500,000",
        balance: "₦1,000,000",
      },
      {
        sn: "N0_1947034",
        date: "Apr 28 2022",
        description: "Part withdrawal",
        type: "Debit",
        amount: " - ₦1,500,000",
        balance: "₦1,000,000",
      },
      {
        sn: "N0_1947034",
        date: "Apr 28 2022",
        description: "Part withdrawal",
        type: "Debit",
        amount: " - ₦1,500,000",
        balance: "₦1,000,000",
      },
    ],
  };

  const handleClick = (values) => {
    if (values === "bank") {
      setBank(true);
      setCredit(false);
      setTransfer(false);
    } else if (values === "credit") {
      setBank(false);
      setCredit(true);
      setTransfer(false);
    } else if (values === "transfer") {
      setBank(false);
      setCredit(false);
      setTransfer(true);
    }
  };

  return (
    <div>
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">Wallet</span>
        </NavTitle>
      </ProfileNavBar>
      <HistoryTableWarapper>
        <h3 className="pb-4">My Deposits</h3>
        <div className="d-flex align-items-content justify-content-around pb-5">
          <h3
            className={bank ? "" : "grey-text"}
            onClick={() => handleClick("bank")}
          >
            Bank Transfer Deposit
          </h3>
          <h3
            className={credit ? "" : "grey-text"}
            onClick={() => handleClick("credit")}
          >
            Credit Wallet Transfer Deposit
          </h3>
          <h3
            className={transfer ? "" : "grey-text"}
            onClick={() => handleClick("transfer")}
          >
            Plan Transfer Deposit
          </h3>
        </div>

        <div>
          <MDBDataTable responsive striped data={data} searching={false} />
        </div>
      </HistoryTableWarapper>
    </div>
  );
};

export const WithdrawalCard = () => {
  return (
    <Wrapper>
      <div>
        <h4> - ₦ 1,500,000</h4>
        <p className="p-0 m-0"> Part withdrawal</p>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <p className="p-0 m-0">Transaction ID</p>
        <p className="p-0 m-0">NO_1947034</p>
      </div>
      <hr className="p-0 m-0" />
      <div className="d-flex justify-content-between align-items-center">
        <p className="p-0 m-0">Transaction ID</p>
        <p className="p-0 m-0">NO_1947034</p>
      </div>
      <hr className="p-0 m-0" />
      <div className="d-flex justify-content-between align-items-center">
        <p className="p-0 m-0">Transaction ID</p>
        <p className="p-0 m-0">NO_1947034</p>
      </div>
      <hr className="p-0 m-0" />
      <div className="d-flex justify-content-between align-items-center">
        <p className="p-0 m-0">Transaction ID</p>
        <p className="p-0 m-0">NO_1947034</p>
      </div>
      <hr className="p-0 m-0" />
      <div className="text-center">
        <button>Download PDF</button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export const SpecialEarnings = () => {
  const data = {
    columns: [
      {
        label: "ID",
        field: "id",
        width: 100,
      },
      {
        label: "Date",
        field: "date",
        width: 100,
      },
      {
        label: "Description",
        field: "description",
        width: 100,
      },
      {
        label: "Amount",
        field: "amount",
        width: 100,
      },
    ],
    rows: [
      {
        id: "N0_1947034",
        date: "Apr 28 2022",
        description: "Referral Bonus for Jane Doe first activation",
        amount: "₦1,500,000",
      },
      {
        id: "N0_1947034",
        date: "Apr 28 2022",
        description: "Part withdrawal",
        amount: "₦1,500,000",
      },
      {
        id: "N0_1947034",
        date: "Apr 28 2022",
        description: "Part withdrawal",
        amount: "₦1,500,000",
      },
      {
        id: "N0_1947034",
        date: "Apr 28 2022",
        description: "Part withdrawal",
        amount: "₦1,500,000",
      },
    ],
  };

  return (
    <div>
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">Wallet</span>
        </NavTitle>
      </ProfileNavBar>
      <SpecialEarningsWarapper>
        <h3>Rosabon Special Earnings</h3>
        <div className="bonus-card d-flex justify-content-start aligin-items-center">
          <div className="total-bonus">
            <p className="p-0 m-0">Total Redeemed Earnings :</p>
            <h4 className="total-amount">₦ 0.00</h4>
          </div>
          <div className="redeem-card">
            <p className="p-0 m-0">Total Earnings :</p>
            <div className="d-flex total-amount justify-content-between aligin-items-center">
              <h4 className="">₦ 0.00</h4>
              <div>
                <button>Redeem</button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <MDBDataTable responsive striped data={data} searching={false} />
        </div>
      </SpecialEarningsWarapper>
    </div>
  );
};

const SpecialEarningsWarapper = styled.div`
  padding: 30px;
  padding-right: 30%;
  button {
    border-radius: 15px;
    /* padding: 10px 15px; */
  }
  .bonus-card {
    width: 100%;
    padding: 50px 0;
  }
  .redeem-card {
    background: #ffffff;
    box-shadow: 0px 4px 30px rgba(196, 204, 221, 0.28);
    border-radius: 8px;
    padding: 20px;
    margin-left: 50px;
    width: 337px;
    button {
      background: #111e6c;
      border-radius: 10px;
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 500;
      font-size: 13px;
      line-height: 16px;
      text-align: right;
      color: #ffffff;
      padding: 7px 20px;
    }
  }
  .earn-bonus {
    background: #f2f2f2;
    box-shadow: 0px 4px 33px rgba(196, 204, 221, 0.28);
    border-radius: 8px;
    width: 70%;
    padding: 20px;
  }
  .total-bonus {
    /* width: 337px;
    height: 157px; */
    background: #ffffff;
    box-shadow: 0px 4px 30px rgba(196, 204, 221, 0.28);
    border-radius: 8px;
    padding: 20px;
  }
  .total-amount {
    padding-top: 50px;
  }
  tr {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.01em;
    color: #242424;
  }
  th {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: -0.03em;
    color: #000000;
  }
  th,
  td {
    padding: 20px;
  }
  /* h3 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: -0.03em;
    color: #242424;
  } */
  h4 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 21px;
    letter-spacing: -0.04em;
    color: #242424;
  }
  p {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-align: left;
    letter-spacing: -0.01em;
    color: #242424;
  }
`;

export const FeedbackTickets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { my_tickets, loading } = useSelector((state) => state.feedback);
  const tickets = my_tickets ? my_tickets : [];

  useEffect(() => {
    dispatch(getTickets());
  }, []);

  const viewTicket = async (id) => {
    await dispatch(getSingleTicket(id));
    navigate("/admin-message");
  };
  return (
    <div>
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">Feedback</span>
        </NavTitle>
      </ProfileNavBar>
      <FeedbackticketWarapper>
        {loading ? (
          <div className="vh-100 w-100">
            <Spinner />
          </div>
        ) : (
          <>
            <h3>My Tickets</h3>

            <div>
              <table
                id="dtBasicExample"
                className="table borderless table-sm"
                cellSpacing="0"
                width="100%"
              >
                <thead>
                  <tr>
                    <th className="">Tickets #</th>
                    <th className="">Topic</th>
                    <th className="">Request Status</th>
                    <th className="">Date Logged</th>
                    <th className="">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.length > 0 ? (
                    tickets?.map((item) => (
                      <tr key={item.id}>
                        <td>NO_{item.id} </td>
                        <td>{item.title} </td>
                        <td>
                          <button
                            style={{
                              color:
                                item.status === "OPENED"
                                  ? "#FFFFFF"
                                  : "#828282",
                              padding: "6px 30px",
                              background:
                                item.status === "OPENED"
                                  ? "#6FCF97"
                                  : "#F2F2F2",
                              borderRadius: "10px",
                            }}
                          >
                            {item.status}
                          </button>
                        </td>
                        <td>
                          {item.createdAt[0]} / {item.createdAt[1]} /{" "}
                          {item.createdAt[2]}
                        </td>
                        <td>
                          {item.createdAt[0]} / {item.createdAt[1]} /{" "}
                          {item.createdAt[2]}
                        </td>
                        <td>
                          <button
                            style={{
                              color: "#FFFFFF",
                              padding: "10px 25px",
                              background: "#111E6C",
                              borderRadius: "5px",
                            }}
                            onClick={() => viewTicket(item.id)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <h4 style={{ alignText: "center" }}>
                      No Tickets Available
                    </h4>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </FeedbackticketWarapper>
    </div>
  );
};

// width: 109px;
// height: 39px;

const FeedbackticketWarapper = styled.div`
  padding: 30px;
  .borderless td,
  .borderless th {
    border: none !important;
  }

  tr {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.01em;
    color: #242424;
  }
  th {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    letter-spacing: -0.03em;
    color: #000000;
  }
  th,
  td {
    padding: 20px;
  }
  input {
    background: #fbf8f8;
    border-radius: 5px;
  }
  h3 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    letter-spacing: -0.01em;
    color: #000000;
    padding: 20px;
  }
  table {
    border-collapse: separate;
    border-spacing: 0 20px;
  }
`;

export const FeedbackOpenTickets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { open_tickets, loading } = useSelector((state) => state.feedback);
  const openedTickets = open_tickets ? open_tickets : [];

  useEffect(() => {
    dispatch(getOpenTickets());
  }, []);

  const viewTicket = async (id) => {
    await dispatch(getSingleTicket(id));
    navigate("/admin-message");
  };
  return (
    <div>
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">Feedback</span>
        </NavTitle>
      </ProfileNavBar>
      <FeedbackticketWarapper>
        {loading ? (
          <div className="vh-100 w-100">
            <Spinner />
          </div>
        ) : (
          <>
            <h3>My Open Tickets</h3>

            <div>
              <table
                id="dtBasicExample"
                className="table borderless table-sm"
                cellSpacing="0"
                width="100%"
              >
                <thead>
                  <tr>
                    <th className="">Tickets #</th>
                    <th className="">Topic</th>
                    <th className="">Request Status</th>
                    <th className="">Date Logged</th>
                    <th className="">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {openedTickets.length > 0 ? (
                    openedTickets?.map((item) => (
                      <tr key={item.id}>
                        <td className="ticket-row">N0_{item.id} </td>
                        <td>{item.title} </td>
                        <td>
                          <button
                            style={{
                              color:
                                item.status === "OPENED"
                                  ? "#FFFFFF"
                                  : "#828282",
                              padding: "6px 30px",
                              background:
                                item.status === "OPENED"
                                  ? "#6FCF97"
                                  : "#F2F2F2",
                              borderRadius: "10px",
                            }}
                          >
                            {item.status}
                          </button>
                        </td>
                        <td>
                          {item.createdAt[0]} / {item.createdAt[1]} /{" "}
                          {item.createdAt[2]}
                        </td>
                        <td>
                          {item.createdAt[0]} / {item.createdAt[1]} /{" "}
                          {item.createdAt[2]}
                        </td>
                        <td>
                          <button
                            style={{
                              color: "#FFFFFF",
                              padding: "10px 25px",
                              background: "#111E6C",
                              borderRadius: "5px",
                            }}
                            onClick={() => viewTicket(item.id)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <h4 style={{ textAlign: "center" }}>
                      No Open Tickets Available
                    </h4>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </FeedbackticketWarapper>
    </div>
  );
};

export const FeedbackCloseTickets = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closed_tickets, loading } = useSelector((state) => state.feedback);
  const closedTickets = closed_tickets ? closed_tickets : [];

  useEffect(() => {
    dispatch(getClosedTickets());
  }, []);

  const viewTicket = async (id) => {
    await dispatch(getSingleTicket(id));
    navigate("/admin-message");
  };
  return (
    <div>
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">Feedback</span>
        </NavTitle>
      </ProfileNavBar>
      <FeedbackticketWarapper>
        {loading ? (
          <div className="vh-100 w-100">
            <Spinner />
          </div>
        ) : (
          <>
            <h3>My Closed Tickets</h3>

            <div>
              <Table borderless>
                <thead>
                  <tr>
                    <th className="">Tickets #</th>
                    <th className="">Topic</th>
                    <th className="">Request Status</th>
                    <th className="">Date Logged</th>
                    <th className="">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {closedTickets.length > 0 ? (
                    closedTickets?.map((item) => (
                      <tr key={item.id}>
                        <td className="ticket-row">N0_{item.id} </td>
                        <td>{item.title} </td>
                        <td>
                          <button
                            style={{
                              color:
                                item.status === "OPENED"
                                  ? "#FFFFFF"
                                  : "#828282",
                              padding: "6px 30px",
                              background:
                                item.status === "OPENED"
                                  ? "#6FCF97"
                                  : "#F2F2F2",
                              borderRadius: "10px",
                            }}
                          >
                            {item.status}
                          </button>
                        </td>
                        <td>
                          {item.createdAt[0]} / {item.createdAt[1]} /{" "}
                          {item.createdAt[2]}
                        </td>
                        <td>
                          {item.createdAt[0]} / {item.createdAt[1]} /{" "}
                          {item.createdAt[2]}
                        </td>
                        <td>
                          <button
                            style={{
                              color: "#FFFFFF",
                              padding: "10px 25px",
                              background: "#111E6C",
                              borderRadius: "5px",
                            }}
                            onClick={() => viewTicket(item.id)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <h4 style={{ textAlign: "center" }}>
                      No Closed Tickets Available
                    </h4>
                  )}
                </tbody>
              </Table>
            </div>
          </>
        )}
      </FeedbackticketWarapper>
    </div>
  );
};

const NavTitle = styled.div`
  display: flex;
  flex-direction: column;
  h2,
  span {
    text-align: left;
  }
  @media (max-width: 500px) {
    h2,
    span {
      display: none;
    }
  }
`;

export const paymentAtMaturity = (
  intRecOption,
  principal,
  withholdingTax,
  tenorMonths,
  calculatedInterest
) => {
  let result = 0;
  const interestMonthly = calculatedInterest / tenorMonths;
  const interestQuaterly = calculatedInterest / (tenorMonths / 4);
  const interestBiAnnual = calculatedInterest / (tenorMonths / 24);
  switch (intRecOption) {
    case "MATURITY":
      result =
        Math.round(
          (principal + calculatedInterest - withholdingTax / 100) * 100
        ) / 100;
      break;

    case "UPFRONT":
      result = Math.round(principal * 100 + Number.EPSILON) / 100;
      break;

    case "MONTHLY":
      result =
        Math.round(
          (principal +
            interestMonthly -
            (withholdingTax / 100) * interestMonthly) *
            100 +
            Number.EPSILON
        ) / 100;
      break;

    case "QUARTERLY":
      result =
        Math.round(
          (principal +
            interestQuaterly -
            (withholdingTax / 100) * interestQuaterly) *
            100 +
            Number.EPSILON
        ) / 100;
      break;

    case "BI_ANNUAL":
      result =
        Math.round(
          (principal +
            interestBiAnnual -
            (withholdingTax / 100) * interestBiAnnual) *
            100 +
            Number.EPSILON
        ) / 100;
      break;

    default:
      break;
  }
  return result;
};

export const PayWithCard = ({ email, amount, setShow }) => {
  const config = {
    reference: new Date().getTime().toString(),
    email: email,
    amount: amount,
    publicKey: "pk_test_f5c065493c77a268ff32c483e0e45b672dac4958",
  };
  const dispatch = useDispatch();
  const { form } = useContext(PlanContext);
  const { loading } = useSelector((state) => state.plan);
  console.log("here", process.env.REACT_APP_PAYSTACK_PK);

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    console.log(reference);
    // dispatch(verifyPaystack("PAYSTACK","trans"+reference.trans));
    dispatch(createPlan(form, setShow));
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const initializePayment = usePaystackPayment(config);
  return (
    <button
      style={{
        backgroundColor: "#111E6C",
        color: "#FFFFFF",
        width: "300px",
      }}
      // onClick={() => setShow(true)}
      // onClick={handleSubmit}
      onClick={() => {
        initializePayment(onSuccess, onClose);
      }}
    >
      {loading ? "LOADING..." : "Pay"}
    </button>
  );
};
