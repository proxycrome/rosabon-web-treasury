import React, { useState, useEffect } from "react";
import styled from "styled-components";
import halfEllipse from "../../asset/halfEllipse.png";
import ChoosePlanHolder from "../../asset/chooseplaneHolder.png";
import Verve from "../../asset/master-card-logo.png";
import MOneyTransfer from "../../asset/money-transfer.png";
import FileDoc from "../../asset/file.png";
import { ProfileNavBar } from "../dashboard/ProfileNavbar";
import { Link } from "react-router-dom";

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
              <i class="fa-solid fa-chevron-down"></i>
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
              <i class="fa-solid fa-chevron-down"></i>
            </div>
            <p className="para-header">Choose from a fixed savings plan</p>
          </div>
          <div>
            <div className="d-flex align-items-center justify-content-between savins-drop">
              <h5>Target Income</h5>
              <i class="fa-solid fa-chevron-down"></i>
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

export const MakePayment = ({setPaymentType}) => {
  const [card, setCard] = useState('');
  const [bank, setBank] = useState('');

  const handleClick = (e) => {
    if(e.target.value === "card") {
      setCard('card');
      setBank('');
    }
    if(e.target.value === "bank") {
      setBank('bank');
      setCard('');
    }
  }

  useEffect(() => {
    const values = {
      bank,
      card,
    }
    setPaymentType(values);
  },[card, bank, setPaymentType])





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
            <input type="radio" id="card" name="paymentType" value="card" onClick={handleClick}/>
          </div>
        </div>
        <div className="pb-5">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <img className="verve-card" src={MOneyTransfer} alt="Verve" />
              <p className="p-0 m-0">Bank Transfer</p>
            </div>
            <input type="radio" id="bank" name="paymentType" value="bank" onClick={handleClick}/>
          </div>
        </div>
      </div>
      <div className="py-5 check-box-bank">
        <input type="checkbox" id="scales" name="scales" />
        <label for="scales">I agree to the Terms and Condition</label>
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
  return (
    <div>
      <UserBankDetailsWrapper>
        <div>
          <h4>Bank Details</h4>
          <div className="pt-3">
            <p className="p-0 m-0">
              Hi Ekiyee, Kindly make payment into the displayed account details
            </p>
          </div>
          <div className="pt-4">
            <div>
              <p className="p-0 m-0">Account Number</p>
            </div>
            <p className="p-0 m-0 bold-text">01234567890</p>
          </div>
          <div className="pt-3">
            <div>
              <p className="p-0 m-0">Account Name</p>
            </div>
            <p className="p-0 m-0 bold-text">Rosabon</p>
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
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <div class="row">
            <div class="pt-3">
              <label>Select Product</label>
              <div class="input-group mb-4">
                <input
                  class="form-control"
                  placeholder="Select Product"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class=" ">
              <label>Enter Amount</label>
              <div class="input-group mb-4">
                <input class="form-control" placeholder="N  0.00" type="text" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class=" ">
              <label>Tenor</label>
              <div class="input-group mb-4">
                <input class="form-control" placeholder="N  0.00" type="text" />
              </div>
            </div>
          </div>
          <div className="text-center calc-mty py-4">
            <button>Calculate Amount at maturity</button>
          </div>
          <div class="row pt-4">
            <div class=" ">
              <div class="input-group mb-4">
                <input class="form-control" placeholder="N  0.00" type="text" />
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
                <label htmlFor="scales">I agree to the Terms and Condition</label>
              </div>
            </div>
          </div>
        </div>
      </RolloverSummaryWrapper>
    </div>
  );
};

const RolloverSummaryWrapper = styled.div`
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

export const PlanSummary = ({planPay}) => {
  return (
    <div>
      <PlanSummaryWrapper>
        {planPay && <h4 className="">Plan Summary</h4> }
        <div className="plan-content">
          <div className="rollover">
            <div className="plan-top h-50 p-4">
              <h4>Plan 1</h4>
              <div className="d-flex align-items-center justify-content-between pt-3">
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
                  <p className="p-0 m-0">Interest Rate </p>
                  <h4>20.00 %</h4>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between pt-4">
                <div>
                  <p className="p-0 m-0">
                    Interest Payment <br /> frequency{" "}
                  </p>
                  <h4 className="">Daily</h4>
                </div>
                <div className="rollover-text-left">
                  <p className="p-0 m-0">Calculated Interest </p>
                  <h4>₦200,000</h4>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between pt-4">
                <div>
                  <p className="p-0 m-0">Withholding Tax</p>
                  <h4 className="">₦2,000</h4>
                </div>
                <div className="rollover-text-left">
                  <p className="p-0 m-0">Payment at Maturity</p>
                  <h4>₦2,700,000</h4>
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
    background-color: #FFFFFF;
    margin-top: 40px;
  }
  .rollover {
    h4 {
      font-weight: 700;
      font-size: 13px;
      line-height: 18px;
      margin-top: -30px;
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

export const WithdrawalBank = () => {
  return (
    <div>
      <WithdrawalBankWrapper>
        <h4 className="">Rollover Summary</h4>
        <div class="pt-5">
          <div class=" ">
            <label>Bank Name</label>
            <div class="input-group mb-4">
              <input
                class="form-control"
                placeholder="Choose a product"
                type="text"
              />
            </div>
          </div>
        </div>
        <div class="pt-1">
          <div class=" ">
            <label>Account Number</label>
            <div class="input-group mb-4">
              <input class="form-control" placeholder="" type="text" />
            </div>
          </div>
        </div>
        <div class="pt-1">
          <div class=" ">
            <label>Account Name</label>
            <div class="input-group mb-4">
              <input class="form-control" placeholder="" type="text" />
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
        <div class="py-5">
          <div class=" ">
            <div class="input-group mb-4">
              <input
                class="form-control"
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

export const AvailableBalance = () => {
  return (
    <AvailableBalanceWapper>
      <div className="d-flex align-items-center justify-content-between">
        <h4 className="pt-3">Available Balance</h4>
        <h4 className="pt-3">₦ 1,500,000</h4>
      </div>
      <div class="pt-3">
        <div class=" ">
          <label>Withdrawal Amount</label>
          <div class="input-group mb-4">
            <input
              class="form-control"
              placeholder="N  1,,500,000"
              type="text"
            />
          </div>
        </div>
      </div>
      <div class="pt-1">
        <div class=" ">
          <label>Beneficiary Account</label>
          <div class="input-group mb-4">
            <input
              class="form-control"
              placeholder="Zenith Bank - 2210347577"
              type="text"
            />
          </div>
        </div>
      </div>
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
      <h5 className="py-3">
        Letter must be on a company’s letter head and also carry bank account
        details
      </h5>
      <div class="pt-1 pb-4">
        <div class=" ">
          <label>Reason for Withdrawal</label>
          <div class="input-group mb-4">
            <input
              class="form-control"
              placeholder="Select reason for withdrawal"
              type="text"
            />
          </div>
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

export const HistoryTable = () => {
  return (
    <div>
      <ProfileNavBar />
      <HistoryTableWarapper>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <h4 className="">Filter by Transaction Date</h4>
            </div>
            <div className="col-md-6">
              <div className="row">
                <div class="col-sm-4 col-md-6">
                  <div class=" ">
                    <div class="input-group mb-4">
                      <input
                        class="form-control"
                        placeholder="Select withdrawal destination"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-sm-4 col-md-6">
                  <div class=" ">
                    <div class="input-group mb-4">
                      <input
                        class="form-control"
                        placeholder="Select withdrawal destination"
                        type="text"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <table
            id="dtBasicExample"
            class="table table-striped table-sm"
            cellspacing="0"
            width="100%"
          >
            <thead>
              <tr>
                <th class="">ID</th>
                <th class="">Date</th>
                <th class="">Description</th>
                <th class="">Type</th>
                <th class="">Amount</th>
                <th class="">Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>N0_1947034</td>
                <td>Apr 28, 2022</td>
                <td>Part withdrawal</td>
                <td>Debit</td>
                <td> - ₦1,500,000</td>
                <td>₦1,000,000</td>
              </tr>
              <tr>
                <td>N0_1947034</td>
                <td>Apr 28, 2022</td>
                <td>Part withdrawal</td>
                <td>Debit</td>
                <td> - ₦1,500,000</td>
                <td>₦1,000,000</td>
              </tr>
              <tr>
                <td>N0_1947034</td>
                <td>Apr 28, 2022</td>
                <td>Part withdrawal</td>
                <td>Debit</td>
                <td> - ₦1,500,000</td>
                <td>₦1,000,000</td>
              </tr>
              <tr>
                <td>N0_1947034</td>
                <td>Apr 28, 2022</td>
                <td>Part withdrawal</td>
                <td>Debit</td>
                <td> - ₦1,500,000</td>
                <td>₦1,000,000</td>
              </tr>
            </tbody>
          </table>
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
`;


export const ReferalTable = () => {
  return (
    <div>

    </div>
  )
}

export const TicketTable = () => {
  return (
    <div>

    </div>
  )
}