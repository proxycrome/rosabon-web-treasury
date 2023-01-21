import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MDBDataTable } from "mdbreact";
import { Input, Label, UncontrolledTooltip } from "reactstrap";
import halfEllipse from "../../asset/halfEllipse.png";
import ChoosePlanHolder from "../../asset/chooseplaneHolder.png";
import Copy from "../../asset/copy-2.png";
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
import { CopyToClipboard } from "react-copy-to-clipboard";
import { PlanContext } from "./createPlan/PlanForm";
import {
  getWalletTransactions,
  getTickets,
  getOpenTickets,
  getClosedTickets,
  getSingleTicket,
  verifyPaystack,
  getEachWalletTransaction,
  getEligiblePlans,
  getMyReferrals,
  pokeUser,
  getAuthUsers,
  getMyReferralActivities,
  redeemReferralBonus,
  getMyDepositActivities,
  getReferralRedeemThreshold,
  redeemSpecialEarning,
  getSpecialEarningActivities,
  getTotalEarning,
  getTotalRedeemedEarning,
  getBankDetails,
} from "../../store/actions";
import Spinner from "../common/loading";
import FileUpload from "../common/fileUpload";
import toast, { Toaster } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

const formatNumber = new Intl.NumberFormat(undefined, {});

export const formatCurrValue = (value) => {
  return value
    ? formatNumber.format(value.toFixed(2)).split(".")[1]?.length >= 2
      ? formatNumber.format(value.toFixed(2))
      : formatNumber.format(value.toFixed(2)).split(".")[1]?.length ===
        undefined
      ? formatNumber.format(value.toFixed(2)) + ".00"
      : formatNumber.format(value.toFixed(2)) + "0"
    : 0;
};

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

export const MakePayment = ({ setPaymentType, isClicked }) => {
  const [paymentType, SetPaymentType] = useState("");
  const [isTerms, setIsTerms] = useState(false);
  const { form, setForm } = useContext(PlanContext);
  const directDebit = form.directDebit;

  const handleClick = (e) => {
    const { value } = e.target;
    if (value === "card") {
      setForm({
        ...form,
        paymentMethod: "DEBIT_CARD",
        // planStatus: "PENDING",
      });
      SetPaymentType(value);
    }
    if (value === "bank") {
      setForm({
        ...form,
        paymentMethod: "BANK_TRANSFER",
        // planStatus: "PENDING",
      });
      SetPaymentType(value);
    }
  };

  useEffect(() => {
    const values = {
      paymentType,
      isTerms,
    };
    setPaymentType(values);
  }, [paymentType, setPaymentType, isTerms]);

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
              required
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
              required
            />
          </div>
        </div>
      </div>
      <div className="py-5 check-box-bank">
        <input
          type="checkbox"
          id="scales"
          name="term"
          value={isTerms}
          checked={isTerms}
          onChange={() => setIsTerms(!isTerms)}
          required
        />
        <label htmlFor="scales">I agree to the Terms and Condition</label>
        <br />
        {isClicked ? (
          !isTerms ? (
            <label className="text-danger">
              Please check this box to proceed
            </label>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
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

export const UserBankDetails = ({ type = null }) => {
  const { users } = useSelector((state) => state.user_profile);
  const { bank_detail } = useSelector((state) => state.plan);
  const { dynamic_account, loading } = useSelector((state) => state.providus);
  // const plan = singlePlan?.data.body ? singlePlan?.data.body : {};

  let date = new Date();
  const time_format = moment(date).format("HH:mm");
  const add_hours = moment(date).add(48, "hours");
  const expire_date = moment(add_hours).format("DD/MM/YYYY");

  const account = type === null ? dynamic_account : bank_detail;

  let text = `Account Name: ${account?.accountName},
  Account Number: ${account?.accountNumber},
  Bank: PROVIDUS BANK`;

  const copied = () => {
    toast.success("Account Details Copied", { position: "top-right" });
  };

  return (
    <div>
      <UserBankDetailsWrapper>
        {loading ? (
          <div className="d-flex justify-content-center">
            <ClipLoader color="#111E6C" loading={loading} size={35} />
          </div>
        ) : (
          <div>
            <h4>Bank Details</h4>
            <div className="pt-3">
              <p className="p-0 m-0">
                Hi{" "}
                {users?.role === "INDIVIDUAL_USER"
                  ? users?.individualUser?.firstName
                  : users?.company?.name}
                , Kindly make payment into the displayed account details
              </p>
            </div>
            <div className="pt-4 d-flex justify-content-between w-100">
              <div>
                <div>
                  <p className="p-0 m-0">Account Number</p>
                </div>
                <p className="p-0 m-0 bold-text">{account?.accountNumber} </p>
              </div>
              <div>
                <CopyToClipboard text={text} onCopy={copied}>
                  <img src={Copy} alt="copy" className="copy" />
                </CopyToClipboard>
              </div>
            </div>
            <div className="pt-3">
              <div>
                <p className="p-0 m-0">Account Name</p>
              </div>
              <p className="p-0 m-0 bold-text">{account?.accountName} </p>
            </div>
            <div className="pt-3">
              <div>
                <p className="p-0 m-0">Bank Name</p>
              </div>
              <p className="p-0 m-0 bold-text">Providus Bank</p>
            </div>
            <p className="pt-4">
              Account details expires in 48 hours, kindly endeavour to make
              transfer{" "}
              <span style={{ display: type === null ? "auto" : "none" }}>
                before {expire_date}, {time_format}
              </span>
            </p>
          </div>
        )}
      </UserBankDetailsWrapper>
    </div>
  );
};

const UserBankDetailsWrapper = styled.div`
  .copy {
    cursor: pointer;
  }
`;

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

export const RolloverSummary = ({
  amount,
  tenor,
  interestRate,
  withholdTax,
  checkTerms,
  isTerms,
  setEndDate,
  setFormData,
  formData,
  rollStage,
}) => {
  // const [isTerms, setIsTerms] = useState(false);

  const { singlePlan } = useSelector((state) => state.plan);
  const plan = useMemo(
    () => (singlePlan?.data.body ? singlePlan?.data.body : {}),
    [singlePlan]
  );
  const planStatus = singlePlan?.data.statusCode;
  const { singleProduct } = useSelector((state) => state.product);
  const productTenors = useMemo(
    () => (singleProduct ? singleProduct?.data?.body.tenors : []),
    [singleProduct]
  );

  const date = new Date();
  const startDate = moment(date).format("DD/MM/YYYY");

  let selectedTenor = productTenors?.find((item) => item.id === tenor);

  let addedDate = moment(date).add(selectedTenor?.tenorDays, "days")?._d;
  let endDate = moment(addedDate).format("DD/MM/YYYY");

  useEffect(() => {
    setEndDate(endDate);
  }, [addedDate, setEndDate, endDate]);

  const customTenorDays = moment(addedDate).diff(date, "days");

  const calculateSI = (principal, rate, time) => {
    const SI = (principal * rate * (time / 365)) / 100;
    return Math.round(SI * 100 + Number.EPSILON) / 100;
  };

  const calculatedInterest = calculateSI(
    amount,
    interestRate,
    selectedTenor?.tenorDays
  );

  const calc_withholding_tax =
    Math.round(
      calculateSI(amount, interestRate, selectedTenor?.tenorDays) *
        (withholdTax[0]?.rate / 100) *
        100 +
        Number.EPSILON
    ) / 100;

  const maturityPayment = paymentAtMaturity(
    plan?.interestReceiptOption,
    parseFloat(amount),
    withholdTax[0]?.rate,
    selectedTenor?.tenorDays / 30,
    calculateSI(amount, interestRate, selectedTenor?.tenorDays)
  );

  useEffect(() => {
    setFormData({
      ...formData,
      // contributionValue: contribValue(plan?.savingFrequency),
      calculatedInterest,
      paymentMaturity: maturityPayment,
      withholdingTax: calc_withholding_tax,
    });
  }, [customTenorDays]);

  return (
    <div>
      {planStatus === "OK" && (
        <RolloverSummaryWrapper>
          <h4 className="pt-4 withdraw">Rollover Summary</h4>
          <div className="plan-content">
            <div className="rollover">
              <div className="plan-top h-50 p-4">
                <h4>{plan?.planName}</h4>
                <div className="d-flex align-items-center justify-content-between pt-4">
                  <div>
                    <p className="p-0 m-0">Start date </p>
                    <h4>{startDate}</h4>
                  </div>
                  <div className="rollover-text-left">
                    <p className="p-0 m-0">End date </p>
                    <h4>{endDate}</h4>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between pt-4">
                  <div>
                    <p className="p-0 m-0">Principal </p>
                    <h4 className="d-flex gap-1">
                      {getCurrIcon(plan?.currency?.name)}
                      {formatCurrValue(parseFloat(amount))}
                    </h4>
                  </div>
                  <div className="rollover-text-left">
                    <p className="p-0 m-0">Amount for Withdrawal </p>
                    <h4 className="d-flex gap-1 justify-content-end">
                      {getCurrIcon(plan?.currency?.name)}
                      {formatCurrValue(
                        parseFloat(plan?.planSummary?.principal - amount)
                      )}
                    </h4>
                  </div>
                </div>
                <div className="d-flex align-items-end justify-content-between pt-4">
                  <div>
                    <p className="p-0 m-0">Interest Rate </p>
                    <h4>{formatCurrValue(parseFloat(interestRate))} %</h4>
                  </div>
                  <div className="rollover-text-left">
                    <p className="p-0 m-0">
                      Interest Payment <br /> frequency{" "}
                    </p>
                    <h4 className="">{plan?.interestReceiptOption}</h4>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between pt-4">
                  <div>
                    <p className="p-0 m-0">Calculated Interest </p>
                    <h4 className="d-flex gap-1">
                      {getCurrIcon(plan?.currency?.name)}
                      {formatCurrValue(parseFloat(calculatedInterest))}
                    </h4>
                  </div>
                  <div className="rollover-text-left">
                    <p className="p-0 m-0">Withholding Tax</p>
                    <h4 className="d-flex gap-1 justify-content-end">
                      {getCurrIcon(plan?.currency?.name)}
                      {formatCurrValue(parseFloat(calc_withholding_tax))}
                    </h4>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-between pt-4">
                  <div>
                    <p className="p-0 m-0">Payment at Maturity</p>
                    <h4 className="d-flex gap-1">
                      {getCurrIcon(plan?.currency?.name)}
                      {formatCurrValue(parseFloat(maturityPayment))}
                    </h4>
                  </div>
                  <div className="rollover-text-left"></div>
                </div>
                {rollStage !== "FINAL" ? (
                  <div className="py-5 check-box-bank">
                    <input
                      type="checkbox"
                      id="scales"
                      name="term"
                      value={isTerms}
                      checked={isTerms}
                      onChange={() => checkTerms(!isTerms)}
                      required
                    />
                    <label htmlFor="scales">
                      I agree to the Terms and Condition
                    </label>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </RolloverSummaryWrapper>
      )}
    </div>
  );
};

const RolloverSummaryWrapper = styled.div`
  box-shadow: 0px 4px 30px rgba(196, 204, 221, 0.28);
  padding: 40px;
  background: #ffffff;
  .withdraw{
    padding-left: 20px;
  }
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
  .grey-button {
    background: #f2f2f2;
    color: #111e6c;
  }
  padding: 0 2rem 7rem 1rem;
  .style-attachment {
    .font-awe-btn {
      display: none;
    }
    .normal-btn {
      display: block;
    }
  }

  @media (max-width: 900px) {
    padding: 0 2rem 7rem 1rem;
    .style-attachment {
      .normal-btn {
        display: none;
      }
      .font-awe-btn {
        display: block;
        font-size: 20px;
      }
    }
  }

  .file {
    display: none;
  }
`;

export const RolloverWithdrawMethod = ({
  withdrawTo,
  setWithdrawTo,
  base64File,
  setBase64File,
  // savingFreq,
  balance,
  type,
}) => {
  const dispatch = useDispatch();
  // const [withdraw, setWithdraw] = useState("");
  // const { login } = useSelector((state) => state.auth);
  const { singlePlan} = useSelector((state) => state.plan);
  const plan = useMemo(
    () => (singlePlan?.data.body ? singlePlan?.data.body : {}),
    [singlePlan]
  );

  const { bankDetails, bankDetailsError, users } = useSelector(
    (state) => state.user_profile
  );
  const user_role = users?.role;

  useEffect(() => {
    dispatch(getBankDetails());
  }, [dispatch]);

  useEffect(() => {
    if (withdrawTo !== "TO_BANK") {
      setBase64File({
        corporateUserWithdrawalMandate: "",
      });
    }
  }, [withdrawTo]);

  return (
    <div>
      <RolloverSummaryWrapper>
        <h4 className="pt-5">
          {type === "withdraw" ? (
            <>Kindly select beneficiary account to receive the withdrawal</>
          ) : (
            <>
              Kindly select beneficiary account to receive the portion of your
              funds not rolled over ({getCurrIcon(plan?.currency?.name)}{" "}
              {formatCurrValue(parseFloat(balance))})
            </>
          )}
        </h4>
        <div className="plan-content">
          <div className="rollover">
            <div className="plan-top h-50 p-4">
              <div className="row my-3">
                <div className="col d-flex justify-content-between">
                  <div>Amount for withdrawal:</div>
                  <div>
                    {getCurrIcon(plan?.currency?.name)}{" "}
                    {formatCurrValue(parseFloat(balance))}
                  </div>
                </div>
              </div>
              <div className="row my-4">
                <div className="col">
                  <div className="input-group">
                    <select
                      className="form-select form-select-md"
                      aria-label=".form-select-md"
                      name="withdraw"
                      onChange={(e) => setWithdrawTo(e.target.value)}
                      defaultValue={withdrawTo}
                      required
                      // disabled={savingFreq}
                    >
                      <option value="" hidden>
                        Select withdrawal destination
                      </option>
                      <option value="TO_BANK" disabled={!bankDetails}>
                        {user_role === "COMPANY"
                          ? "To Bank"
                          : bankDetails
                          ? `${bankDetails?.bank?.name} - ${bankDetails?.accountNumber}`
                          : "No bank available"}
                      </option>
                      <option value="TO_WALLET">My Wallet</option>
                    </select>
                  </div>
                </div>
              </div>
              {withdrawTo === "TO_BANK" && user_role === "INDIVIDUAL_USER" ? (
                bankDetailsError?.message ===
                "Bank Account not available for this user" ? (
                  <span className="text-danger">
                    No Registered Bank Account Details
                  </span>
                ) : (
                  <div className="mt-3">
                    <div className="pt-4">
                      <p className="p-0 m-0">Account Number</p>
                      <h4>{bankDetails?.accountNumber} </h4>
                    </div>
                    <div className="pt-4">
                      <p className="p-0 m-0">Account Name</p>
                      <h4>{bankDetails?.accountName} </h4>
                    </div>
                    <div className="pt-4">
                      <p className="p-0 m-0">Bank Name</p>
                      <h4>{bankDetails?.bank?.name} </h4>
                    </div>
                  </div>
                )
              ) : withdrawTo === "TO_BANK" && user_role === "COMPANY" ? (
                <div>
                  <div className="d-flex justify-content-between">
                    <div className="">
                      <FileUpload
                        fileName="withdrawal mandate instruction letter"
                        setFile={(file) =>
                          setBase64File({
                            ...base64File,
                            corporateUserWithdrawalMandate: file.encodedUpload,
                          })
                        }
                        id="mandate"
                      />
                    </div>
                  </div>
                  {!base64File?.corporateUserWithdrawalMandate && (
                    <small className="text-danger">
                      Upload a withdrawal mandate Letter
                    </small>
                  )}
                  <p>
                    Letter must be on a company's letter head and also carry
                    bank account details
                  </p>
                </div>
              ) : (
                <></>
              )}
              {/* {savingFreq && (
                <small className="text-danger">
                  The tenor days is less than the savings frequency for this
                  plan. Please Select another tenor.
                </small>
              )} */}
            </div>
          </div>
        </div>
      </RolloverSummaryWrapper>
    </div>
  );
};

export const WithdrawalSummary = ({
  amount,
  reason,
  compPenalCharge,
  checkTerms,
  termRequired,
}) => {
  const [isTerms, setIsTerms] = useState(false);
  const { singlePlan, penal_charge } = useSelector((state) => state.plan);

  const plan = useMemo(
    () => (singlePlan?.data?.body ? singlePlan?.data.body : {}),
    [singlePlan]
  );
  const penalCharges = useMemo(
    () => (penal_charge?.data?.body ? penal_charge?.data?.body : []),
    [penal_charge]
  );

  let date = new Date();
  const recentDate = moment(date).format("YYYY-MM-DD");

  const planProductCharges = penalCharges?.filter(
    (data) => data.product.id === plan.product.id
  );

  const computePenalCharge = useCallback(
    (intRecOption) => {
      let penalRate = 0;
      let penalCharge = 0;
      const maxNumberDays = moment(plan?.actualMaturityDate).diff(
        plan?.planSummary?.startDate,
        "days"
      );

      const currentNumberOfDays = moment(recentDate).diff(
        plan?.planSummary?.startDate,
        "days"
      );

      const penalDays = moment(plan?.planSummary?.endDate).diff(
        recentDate,
        "days"
      );

      planProductCharges.forEach((item) => {
        const maxDays = (item.maxDaysElapsed * maxNumberDays) / 100;
        const minDays = (item.minDaysElapsed * maxNumberDays) / 100;
        if (currentNumberOfDays >= minDays && currentNumberOfDays <= maxDays) {
          penalRate = item.penalRate / 100;
        }
      });

      if (penalDays > 0) {
        switch (intRecOption) {
          case "MATURITY":
            if (plan?.product?.properties?.penaltyFormula === "FIXED_FORMULA") {
              penalCharge = (currentNumberOfDays || 1 * penalRate * amount) / 365;
            } else if (
              plan?.product?.properties?.penaltyFormula === "TARGET_FORMULA"
            ) {
              const totalEarnedInt =
                (plan?.planSummary?.principal *
                  plan?.interestRate *
                  (currentNumberOfDays || 1 / 365)) /
                100;
              penalCharge = totalEarnedInt * penalRate;
            }
            break;

          case "UPFRONT":
            if (plan?.product?.properties?.penaltyFormula === "FIXED_FORMULA") {
              const excessIntPaid =
                amount * (plan?.interestRate / 100) * (maxNumberDays / 365) -
                amount *
                  (plan?.interestRate / 100) *
                  (currentNumberOfDays || 1 / 365);
              penalCharge =
                (currentNumberOfDays || 1 / 365) * penalRate * amount +
                excessIntPaid;
            }
            break;

          case "MONTHLY":
          case "QUARTERLY":
          case "BI_ANNUAL":
            if (plan?.product?.properties?.penaltyFormula === "FIXED_FORMULA") {
              penalCharge = (currentNumberOfDays || 1 / 365) * penalRate * amount;
            }
            break;

          default:
            penalCharge = 0;
            break;
        }
      }

      return penalCharge.toFixed(2);
    },
    [plan, amount, recentDate, planProductCharges]
  );

  useEffect(() => {
    const penal = computePenalCharge(plan?.interestReceiptOption);
    compPenalCharge(penal);
    checkTerms(isTerms);
  }, [computePenalCharge, plan, compPenalCharge, isTerms, checkTerms]);

  return (
    <div>
      <RolloverSummaryWrapper>
        <h4 className="pt-5 withdraw">Withdrawal Summary</h4>
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
              <div className="d-flex align-items-end justify-content-between pt-4">
                <div>
                  <p className="p-0 m-0">
                    Balance before <br /> Liquidation{" "}
                  </p>
                  <h4 className="d-flex gap-1">
                    {getCurrIcon(plan?.currency?.name)}
                    {formatCurrValue(parseFloat(plan?.planSummary?.principal))}
                    {/* {plan?.planSummary?.principal?.toLocaleString()} */}
                  </h4>
                </div>
                <div className="rollover-text-left">
                  <p className="p-0 m-0">Withdrawal Amount</p>
                  <h4 className="d-flex gap-1 justify-content-end">
                    {getCurrIcon(plan?.currency?.name)}
                    {formatCurrValue(parseFloat(amount))}
                    {/* {parseFloat(amount).toLocaleString()} */}
                  </h4>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between pt-4">
                <div>
                  <p className="p-0 m-0">Penal Charges </p>
                  <h4 className="d-flex gap-1">
                    {getCurrIcon(plan?.currency?.name)}
                    {formatCurrValue(
                      parseFloat(
                        computePenalCharge(plan?.interestReceiptOption)
                      )
                    )}
                    {/* {computePenalCharge(
                      plan?.interestReceiptOption
                    ).toLocaleString()} */}
                  </h4>
                </div>
                <div className="rollover-text-left">
                  <p className="p-0 m-0">
                    Available Plan
                    <br /> Balance{" "}
                  </p>
                  <h4 className="d-flex gap-1 justify-content-end">
                    {getCurrIcon(plan?.currency?.name)}
                    {formatCurrValue(
                      parseFloat(
                        plan?.planSummary?.principal -
                          amount -
                          computePenalCharge(plan?.interestReceiptOption)
                      )
                    )}
                    {/* {parseFloat(
                      (
                        plan?.planSummary?.principal -
                        amount -
                        computePenalCharge(plan?.interestReceiptOption)
                      ).toFixed(2)
                    ).toLocaleString()} */}
                  </h4>
                </div>
              </div>
              <div className="mt-4">
                <div>
                  <p className="p-0 mb-3">Reason for withdrawal</p>
                  <p>{reason}</p>
                </div>
              </div>
              {termRequired === "nil" ? (
                <></>
              ) : (
                <div className="py-5 check-box-bank">
                  <input
                    type="checkbox"
                    id="scales"
                    name="term"
                    value={isTerms}
                    checked={isTerms}
                    onChange={() => setIsTerms(!isTerms)}
                    required
                  />
                  <label htmlFor="scales">
                    I agree to the Terms and Condition
                  </label>
                </div>
              )}
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
        <span style={{ fontSize: 14, color: "#535353", fontWeight: 600 }}>
          &#165;
        </span>
      );
    case "USD":
      return (
        <span style={{ fontSize: 14, color: "#535353", fontWeight: 600 }}>
          &#36;
        </span>
      );
    case "CAD":
      return (
        <span style={{ fontSize: 14, color: "#535353", fontWeight: 600 }}>
          &#36;
        </span>
      );
    case "NGN":
      return (
        <span style={{ fontSize: 14, color: "#535353", fontWeight: 600 }}>
          &#8358;
        </span>
      );
    case "EURO":
      return (
        <span style={{ fontSize: 14, color: "#535353", fontWeight: 600 }}>
          &#163;
        </span>
      );
    default:
      return <span></span>;
  }
};

export const PlanSummary = ({ planPay }) => {
  const { form } = useContext(PlanContext);
  let planData = form;
  const { currencies } = useSelector((state) => state.currencies);
  const currencies_list = currencies?.data.body ? currencies?.data.body : [];
  const current_currency = currencies_list.find(
    (item) => item.id === planData?.currency
  )?.name;
  // const calc_withholding_tax =
  //   Math.round(
  //     planData.planSummary.calculatedInterest *
  //       (planData.planSummary.withholdingTax / 100) *
  //       100 +
  //       Number.EPSILON
  //   ) / 100;

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
                    {getCurrIcon(current_currency)}{" "}
                    {formatCurrValue(
                      parseFloat(planData.planSummary.principal)
                    )}
                  </h4>
                </div>
                <div className="rollover-text-left">
                  <p className="p-0 m-0">Interest Rate </p>
                  {/* <h4>20.00 %</h4> */}
                  <h4 className="d-flex justify-content-end">
                    {planData.planSummary.interestRate
                      ? formatCurrValue(
                          parseFloat(planData.planSummary.interestRate)
                        )
                      : 0}{" "}
                    %
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
                    {getCurrIcon(current_currency)}{" "}
                    {isNaN(planData.planSummary.calculatedInterest)
                      ? 0
                      : formatCurrValue(
                          parseFloat(planData.planSummary.calculatedInterest)
                        )}
                  </h4>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between pt-4">
                <div>
                  <p className="p-0 m-0">Withholding Tax</p>
                  {/* <h4 className="">₦2,000</h4> */}
                  <h4 className="flex">
                    {getCurrIcon(current_currency)}{" "}
                    {isNaN(planData?.planSummary?.withholdingTax)
                      ? 0
                      : formatCurrValue(
                          parseFloat(planData?.planSummary?.withholdingTax)
                        )}
                  </h4>
                </div>
                <div className="rollover-text-left">
                  <p className="p-0 m-0">Payment at Maturity</p>
                  {/* <h4>₦2,700,000</h4> */}
                  <h4 className="flex justify-content-end">
                    {getCurrIcon(current_currency)}{" "}
                    {isNaN(planData?.planSummary?.paymentMaturity)
                      ? formatCurrValue(
                          parseFloat(planData.planSummary.principal)
                        )
                      : formatCurrValue(
                          parseFloat(planData?.planSummary?.paymentMaturity)
                        )}
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
  id,
}) => {
  const [showTextArea, setShowTextArea] = useState(false);
  const [withdrawMandateImage, setWithdrawMandateImage] = useState({});
  // const [withdrawInstructionImage, setWithdrawInstructionImage] = useState({});

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
        withdrawalAmount: parseFloat(withdrawalAmount),
        withdrawalReasonId,
        withdrawalReasonOthers,
      };
      withdrawData(data);
    }
    if (role === "COMPANY") {
      const { withdrawalAmount, withdrawalReasonId, withdrawalReasonOthers } =
        formData;

      const data = {
        withdrawalAmount: parseFloat(withdrawalAmount),
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

  return (
    <AvailableBalanceWapper id={id}>
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
          ₦{" "}
          {walletBalance?.amount
            ? formatCurrValue(parseFloat(walletBalance?.amount))
            : "0.00"}
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
              {withdrawReasons
                ?.filter((item) => item.status === "ACTIVE")
                ?.map((data) => (
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

export const TransferCard = ({
  walletBalance,
  transferData,
  id,
  transferError,
  setTransferError,
}) => {
  const dispatch = useDispatch();

  const { eligiblePlans } = useSelector((state) => state.plan);
  const activeEligiblePlans = eligiblePlans?.filter(
    (plan) =>
      plan.interestReceiptOption === "MATURITY" && plan.planStatus === "ACTIVE"
  );

  const data = {
    amount: "",
    planId: "",
  };

  const [formData, setFormData] = useState(data);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setTransferError({
      ...transferError,
      [name]: value === "" ? true : false,
    });
  };

  const planName = (id) => {
    const obj = activeEligiblePlans?.find((item) => item.id === +id);
    return obj?.planName;
  };

  useEffect(() => {
    const { amount, planId } = formData;

    const data = {
      amount: parseFloat(amount),
      description: `Transfer of ${amount ? amount : 0} to ${planName(planId)}`,
      planId: Number(planId),
    };
    transferData(data);
  }, [formData]);

  useEffect(() => {
    dispatch(getEligiblePlans());
  }, [dispatch]);

  return (
    <AvailableBalanceWapper id={id}>
      <h3>Transfer</h3>
      <div className="d-flex align-items-center justify-content-between">
        <h4 className="pt-3">Available Balance</h4>
        <h4 className="pt-3">
          ₦{" "}
          {walletBalance?.amount
            ? formatCurrValue(parseFloat(walletBalance?.amount))
            : "0.00"}
        </h4>
      </div>
      <div className="pt-3">
        <div className=" ">
          <label>Transfer Amount</label>
          <div className="input-group">
            <input
              className={`form-control ${
                transferError?.amount ? "tr-error" : "mb-4"
              }`}
              placeholder="N1,500,000"
              type="number"
              required
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
          {transferError?.amount && (
            <small className="text-danger mb-4">Provide an amount</small>
          )}
        </div>
      </div>
      <div className="pt-1 pb-5">
        <div className=" ">
          <label>Beneficiary Account</label>
          <select
            className={`form-select form-select-lg select-field 
            ${transferError?.planId ? "tr-error" : "mb-3"}`}
            aria-label=".form-select-lg"
            name="planId"
            required
            value={formData.planId}
            onChange={handleChange}
          >
            <option value=""></option>
            {activeEligiblePlans?.map((item) => (
              <option key={item.id} value={item.id.toString()}>
                {item.planName}
              </option>
            ))}
            {/* <option value="others">Credit wallet</option> */}
          </select>
          {transferError?.planId && (
            <small className="text-danger mb-3">
              Provide a beneficiary account
            </small>
          )}
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
  .tr-error {
    border: 2px solid red;
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

  const { walletTransactions, transaction, loading } = useSelector(
    (state) => state.wallet
  );

  useEffect(() => {
    const filteredWalletTrans = walletTransactions?.entities?.filter((item) => {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);

      const itemDate = moment(item.transactionDate, "DD-MM-YYYY").format(
        "YYYY-MM-DD"
      );

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

  const previewTransaction = async (transId) => {
    dispatch(getEachWalletTransaction(transId));

    setShow(true);
  };

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
        label: "Amount (NGN)",
        field: "amount",
        width: 100,
      },
      {
        label: "Balance (NGN)",
        field: "balance",
        width: 100,
      },
    ],
    rows:
      filteredTransactions?.length > 0 ||
      (formData.startDate !== "" && formData.endDate !== "")
        ? filteredTransactions?.map((data) => ({
            id: (
              <Link
                to="#"
                onClick={() => previewTransaction(data?.transactionId)}
              >
                <div>{data?.transactionId}</div>
              </Link>
            ),
            date: `${data?.transactionDate?.split(" ")[0]}`,
            description: `${data?.description}`,
            type: `${data?.transactionType}`,
            amount: `${
              data?.transactionType === "CREDIT"
                ? "+ " + data?.debit.toLocaleString()
                : "- " + data?.debit.toLocaleString()
            }`,
            balance: `${data?.balanceAfterTransaction.toLocaleString()}`,
          }))
        : walletTransactions?.entities?.map((data) => ({
            id: (
              <Link
                to="#"
                onClick={() => previewTransaction(data?.transactionId)}
              >
                <div>{data?.transactionId}</div>
              </Link>
            ),
            date: `${data?.transactionDate?.split(" ")[0]}`,
            description: `${data?.description ? data?.description : ""}`,
            type: `${data?.transactionType}`,
            amount: `${
              data?.transactionType === "CREDIT"
                ? "+ " + data?.debit?.toFixed(2)
                : "- " + data?.debit?.toFixed(2)
            }`,
            balance: `${data?.balanceAfterTransaction?.toFixed(2)}`,
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
            <TransactionPreview
              handleClose={() => setShow(false)}
              transaction={transaction}
              loading={loading}
            />
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
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user_profile);
  const { myReferrals, loading } = useSelector((state) => state.wallet);

  const handleClick = (id) => {
    dispatch(pokeUser(id, dispatch));
  };

  const copyReferralLink = () => {
    toast.success("Referral Link Copied");
  };


  useEffect(() => {
    dispatch(getMyReferrals());
    dispatch(getAuthUsers());
  }, [dispatch]);

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
    rows: myReferrals?.entities?.map((data) => ({
      sn: `${data.id}`,
      date: `${data.dateOfReg}`,
      name: `${data.customerName}`,
      status: `${data.status}`,
      action: (
        <button
          className={
            data.status === "INACTIVE" && data.pokeable ? "in-active" : "active"
          }
          disabled={data.status === "ACTIVE" || !data.pokeable}
          onClick={() => handleClick(data.id)}
        >
          Poke User
        </button>
      ),
    })),
  };

  return (
    <div>
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">Wallet</span>
        </NavTitle>
      </ProfileNavBar>
      <Toaster />
      {loading ? (
        <div className="vh-100 w-100">
          <Spinner />
        </div>
      ) : (
        <ReferalTableWarapper>
          <h3>My Referrals</h3>
          <div className="d-sm-flex justify-content-start align-items-center">
            <div className="padd-referal">
              <label>Referral Link</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  value={users?.referralLink}
                  readOnly
                />
                <div className="input-group-text">
                  <CopyToClipboard
                    text={users?.referralLink}
                    onCopy={copyReferralLink}
                  >
                    <img src={Copy} alt="copy" className="copy" />
                  </CopyToClipboard>
                </div>
              </div>
            </div>
            <div className="ref-count">
              <p className="p-0 m-0">Total Referrals</p>
              <div className="box-image">
                <h3>{myReferrals?.entities?.length}</h3>
              </div>
            </div>
          </div>

          <div>
            <MDBDataTable responsive striped data={data} searching={false} />
          </div>
        </ReferalTableWarapper>
      )}
    </div>
  );
};

const ReferalTableWarapper = styled.div`
  padding: 30px;
  padding-right: 20%;

  @media (max-width: 650px){
    padding-right: 20px;
    .padd-referal {
      width: 100vw;
      padding-right: 0px;
    }
    .ref-count {
      margin: 20px 0;
    }
  }

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
      padding-top: 6px;
      font-size: 20px;
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
  .copy {
    cursor: pointer;
  }
`;

export const ReferralBonus = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user_profile);
  const { loading, refActivities, referralThreshold } =
    useSelector((state) => state.wallet);

  const handleRedeemClick = () => {
    dispatch(redeemReferralBonus());
  };

  useEffect(() => {
    dispatch(getMyReferralActivities());
    dispatch(getReferralRedeemThreshold());
  }, [dispatch]);
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
        width: 200,
      },
    ],
    rows: refActivities?.entities?.map((data) => ({
      id: data.id,
      date: `${data.createdAt}`,
      description: `${data.description}`,
      amount: `₦ ${formatCurrValue(parseFloat(data.amount))}`,
    })),
  };

  return (
    <div>
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">Wallet</span>
        </NavTitle>
      </ProfileNavBar>
      <Toaster />
      {loading ? (
        <div className="vh-100 w-100">
          <Spinner />
        </div>
      ) : (
        <ReferalTableBonusWarapper>
          <h3>My Referral Bonus</h3>
          <div className="bonus-card d-md-flex justify-content-between aligin-items-center">
            <div className="earn-bonus">
              <div className="d-flex justify-content-between aligin-items-center">
                <div>
                  <p className="m-0 p-0">Earned Referral Bonus</p>
                  <h4 className="py-4">
                    ₦{" "}
                    {users?.referralBonus?.earnedReferralBonus
                      ? formatCurrValue(
                          parseFloat(users?.referralBonus?.earnedReferralBonus)
                        )
                      : "0.00"}
                  </h4>
                </div>
                <div>
                  <button
                    className="btn btn-primary"
                    onClick={handleRedeemClick}
                  >
                    Redeem
                  </button>
                </div>
              </div>
              <div className="d-flex align-items-content justify-content-center">
                <p className="m-0 p-0">
                  {users?.referralBonus?.earnedReferralBonus
                    ? formatCurrValue(
                        parseFloat(users?.referralBonus?.earnedReferralBonus)
                      )
                    : "0"}{" "}
                  out of ₦
                  {referralThreshold?.amount
                    ? formatCurrValue(parseFloat(referralThreshold?.amount))
                    : "0.00"}{" "}
                  Earned
                </p>
              </div>
            </div>
            <div className="total-bonus">
              <p className="p-0 m-0">Total Redeemed Bonus :</p>
              <h4 className="total-amount">
                ₦{" "}
                {users?.referralBonus?.totalRedeemedBonus
                  ? formatCurrValue(
                      parseFloat(users?.referralBonus?.totalRedeemedBonus)
                    )
                  : "0.00"}
              </h4>
            </div>
          </div>

          <div>
            <MDBDataTable responsive striped data={data} searching={false} />
          </div>
        </ReferalTableBonusWarapper>
      )}
    </div>
  );
};

const ReferalTableBonusWarapper = styled.div`
  padding: 30px;
  padding-right: 20%;
  
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

  @media (min-width: 0px) and (max-width: 500px){
    padding-right: 20px;
    .earn-bonus {
      background: #f2f2f2;
      box-shadow: 0px 4px 33px rgba(196, 204, 221, 0.28);
      border-radius: 8px;
      width: 100%;
      padding: 20px;
      margin-bottom: 20px;
    }
    p {
      font-family: "Montserrat";
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: -0.01em;
      color: #242424;
    }
  }

  @media (min-width: 501px) {
    .earn-bonus {
      background: #f2f2f2;
      box-shadow: 0px 4px 33px rgba(196, 204, 221, 0.28);
      border-radius: 8px;
      width: 70%;
      padding: 20px;
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

`;

export const TransferDeposit = () => {
  const [bank, setBank] = useState(true);
  const [credit, setCredit] = useState(false);
  const [plan, setPlan] = useState(false);

  const dispatch = useDispatch();
  const { depositActivites } = useSelector((state) => state.wallet);
  const activedeposits = depositActivites ? depositActivites?.entities : [];
  const bankDeposits = depositActivites?.entities.filter(
    (item) => item.category === "BANK_ACCOUNT_TO_WALLET_FUNDING"
  );

  const [deposits, setDeposits] = useState(bankDeposits);

  useEffect(() => {
    dispatch(getMyDepositActivities());
  }, [dispatch]);

  const handleClick = (values, category) => {
    if (values === "bank" && category === "BANK_ACCOUNT_TO_WALLET_FUNDING") {
      setBank(true);
      setCredit(false);
      setPlan(false);
      const deposit = activedeposits?.filter(
        (item) => item.category === category
      );
      setDeposits(deposit);
    }
    if (values === "credit" && category === "WALLET_FUNDING_BY_CREDIT_WALLET") {
      setBank(false);
      setCredit(true);
      setPlan(false);
      const deposit = activedeposits?.filter(
        (item) => item.category === category
      );
      setDeposits(deposit);
    }
    if (values === "plan" && category === "PLAN_TO_WALLET_FUNDING") {
      setBank(false);
      setCredit(false);
      setPlan(true);
      const deposit = activedeposits?.filter(
        (item) => item.category === category
      );
      setDeposits(deposit);
    }
  };

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
    rows: deposits?.map((data) => ({
      sn: `${data.transactionId}`,
      date: `${data.transactionDate}`,
      description: `${data.description}`,
      type: `${data.transactionType}`,
      amount: `+ ₦ ${formatCurrValue(parseFloat(data.amount))}`,
      balance: `₦ ${formatCurrValue(parseFloat(data.balance))}`,
    })),
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
            onClick={() =>
              handleClick("bank", "BANK_ACCOUNT_TO_WALLET_FUNDING")
            }
          >
            Bank Transfer Deposit
          </h3>
          <h3
            className={credit ? "" : "grey-text"}
            onClick={() =>
              handleClick("credit", "WALLET_FUNDING_BY_CREDIT_WALLET")
            }
          >
            Credit Wallet Transfer Deposit
          </h3>
          <h3
            className={plan ? "" : "grey-text"}
            onClick={() => handleClick("plan", "PLAN_TO_WALLET_FUNDING")}
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
  const dispatch = useDispatch();
  const { specialEarnings, totalEarning, totalRedeemedEarning } = useSelector(
    (state) => state.wallet
  );
  const earningsActivities = specialEarnings?.entities
    ? specialEarnings?.entities
    : [];

  const handleClick = () => {
    dispatch(redeemSpecialEarning());
  };

  useEffect(() => {
    dispatch(getSpecialEarningActivities());
    dispatch(getTotalEarning());
    dispatch(getTotalRedeemedEarning());
  }, [dispatch]);

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
    rows: earningsActivities?.map((data) => ({
      id: `${data.transactionId}`,
      date: `${data.dateOfTransaction}`,
      description: `${data.description}`,
      amount: `₦${formatCurrValue(parseFloat(data.amount))}`,
    })),
  };

  return (
    <div>
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">Wallet</span>
        </NavTitle>
      </ProfileNavBar>
      <Toaster />
      <SpecialEarningsWarapper>
        <h3>Rosabon Special Earnings</h3>
        <div className="bonus-card d-md-flex justify-content-start aligin-items-center">
          <div className="total-bonus">
            <p className="p-0 m-0">Total Redeemed Earnings :</p>
            <h4 className="total-amount">
              ₦{" "}
              {totalRedeemedEarning
                ? formatCurrValue(parseFloat(totalRedeemedEarning))
                : "0.00"}
            </h4>
          </div>
          <div className="redeem-card">
            <p className="p-0 m-0">Total Earnings :</p>
            <div className="d-flex total-amount justify-content-between aligin-items-center">
              <h4 className="">
                ₦{" "}
                {totalEarning
                  ? formatCurrValue(parseFloat(totalEarning))
                  : "0.00"}
              </h4>
              <div>
                <button className="btn btn-primary" onClick={handleClick}>
                  Redeem
                </button>
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
  padding-right: 20%;
  button {
    border-radius: 15px;
    /* padding: 10px 15px; */
  }

  @media (min-width: 0px) and (max-width: 500px){
    padding-right: 20px;
    .redeem-card {
      margin: 20px 0 0 0;
      background: #ffffff;
      box-shadow: 0px 4px 30px rgba(196, 204, 221, 0.28);
      border-radius: 8px;
      padding: 20px;
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
  }

  @media (min-width: 501px){
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

  }

  .bonus-card {
    width: 100%;
    padding: 50px 0;
  }

  .earn-bonus {
    background: #f2f2f2;
    box-shadow: 0px 4px 33px rgba(196, 204, 221, 0.28);
    border-radius: 8px;
    width: 70%;
    padding: 20px;
  }
  .total-bonus {
    // /* width: 337px;
    // height: 157px; */
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
    navigate(`/admin-message/${id}`);
  };
  return (
    <div className="d-flex flex-column">
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">Feedback</span>
        </NavTitle>
      </ProfileNavBar>
      {loading ? (
        <div className="vh-100 w-100">
          <Spinner />
        </div>
      ) : (
        <FeedbackticketWarapper>
          <div className="mt-5">
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
                        <td>{item.createdAt.split(" ")[0]}</td>
                        <td>{item.modifiedAt.split(" ")[0]}</td>
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
                    <tr>
                      <td colSpan={5}>
                        <h4 style={{ textAlign: "center" }}>
                          No Tickets Available
                        </h4>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </FeedbackticketWarapper>
      )}
    </div>
  );
};

// width: 109px;
// height: 39px;

const FeedbackticketWarapper = styled.div`
  padding: 60px 30px !important;
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
    navigate(`/admin-message/${id}`);
  };
  return (
    <div className="d-flex flex-column">
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">Feedback</span>
        </NavTitle>
      </ProfileNavBar>
      {loading ? (
        <div className="vh-100 w-100">
          <Spinner />
        </div>
      ) : (
        <FeedbackticketWarapper>
          <div className="mt-5">
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
                        <td>{item.createdAt.split(" ")[0]}</td>
                        <td>{item.modifiedAt.split(" ")[0]}</td>
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
                    <tr>
                      <td colSpan={5}>
                        <h4 style={{ textAlign: "center" }}>
                          No Tickets Available
                        </h4>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </FeedbackticketWarapper>
      )}
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
    navigate(`/admin-message/${id}`);
  };
  return (
    <div className="d-flex flex-column">
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">Feedback</span>
        </NavTitle>
      </ProfileNavBar>
      {loading ? (
        <div className="vh-100 w-100">
          <Spinner />
        </div>
      ) : (
        <FeedbackticketWarapper>
          <div className="mt-5">
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
                        <td>{item.createdAt.split(" ")[0]}</td>
                        <td>{item.modifiedAt.split(" ")[0]}</td>
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
                    <tr>
                      <td colSpan={5}>
                        <h4 style={{ textAlign: "center" }}>
                          No Tickets Available
                        </h4>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </FeedbackticketWarapper>
      )}
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
  const interestBiAnnual = calculatedInterest / (tenorMonths / 6);
  switch (intRecOption) {
    case "MATURITY":
      result =
        Math.round(
          (principal +
            calculatedInterest -
            calculatedInterest * (withholdingTax / 100)) *
            100 +
            Number.EPSILON
        ) / 100;
      break;

    case "UPFRONT":
      result = Math.round(principal * 100 + Number.EPSILON) / 100;
      break;

    case "MONTHLY":
      if (tenorMonths < 1) {
        result = null;
      } else {
        result =
          Math.round(
            (principal +
              interestMonthly -
              (withholdingTax / 100) * interestMonthly) *
              100 +
              Number.EPSILON
          ) / 100;
      }
      break;

    case "QUARTERLY":
      if (tenorMonths < 4) {
        result = null;
      } else {
        result =
          Math.round(
            (principal +
              interestQuaterly -
              (withholdingTax / 100) * interestQuaterly) *
              100 +
              Number.EPSILON
          ) / 100;
      }
      break;

    case "BI_ANNUAL":
      if (tenorMonths < 6) {
        result = null;
      } else {
        result =
          Math.round(
            (principal +
              interestBiAnnual -
              (withholdingTax / 100) * interestBiAnnual) *
              100 +
              Number.EPSILON
          ) / 100;
      }
      break;

    default:
      break;
  }
  return result;
};

export const randomNumbers = (max) => {
  let random_num = "";
  for (let i = 0; i < max; i++) {
    random_num += JSON.stringify(Math.floor(Math.random() * 10));
  }
  return random_num;
};

export const PayWithCard = ({
  email,
  amount,
  setShow,
  transactionRef,
  userId,
}) => {
  const config = {
    reference: transactionRef,
    email: email,
    amount: amount,
    metadata: {
      userId,
      cardName: null,
      refund: false,
    },
    publicKey:
      process.env.NODE_ENV === "development"
        ? process.env.REACT_APP_PAYSTACK_PK_DEV
        : process.env.REACT_APP_PAYSTACK_PK_PROD,
  };
  const dispatch = useDispatch();
  const { form } = useContext(PlanContext);
  const { loading } = useSelector((state) => state.plan);
  // const { verify_paystack } = useSelector((state) => state.paystack);

  // you can call this function anything
  const success = async () => {
    await dispatch(
      verifyPaystack("PAYSTACK", transactionRef, dispatch, form, setShow)
    );
  };

  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    success();
  };

  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const initializePayment = usePaystackPayment(config);
  return (
    <>
      {transactionRef !== null ? (
        <>
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
        </>
      ) : (
        <>
          {toast.error("No transaction Reference", {
            position: "top-right",
          })}
        </>
      )}
    </>
  );
};
