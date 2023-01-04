import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Verve from "../../../../asset/master-card-logo.png";
import MOneyTransfer from "../../../../asset/money-transfer.png";
import {
  getSinglePlan,
  createDynamicAcc,
  planAction,
  regTransaction,
  payWithCard,
} from "../../../../store/actions";
import {
  ProceedPayCard,
  SuccessConfirm,
} from "../../../Accessories/BVNConfirm";
import ModalComponent from "../../../ModalComponent";
import { getCurrIcon } from "../../Accesssories";

const PlanPayment = () => {
  const [card, setCard] = useState("card");
  const [amount, setAmount] = useState();
  const [debitPopup, setDebitPopup] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { singlePlan } = useSelector((state) => state.plan);
  const plan = singlePlan?.data.body ? singlePlan?.data.body : {};
  const planStatus = singlePlan?.data.statusCode;

  useEffect(() => {
    dispatch(getSinglePlan(parseInt(id)));
  }, []);

  useEffect(() => {
    if (plan?.id === parseInt(id)) {
      setAmount(
        plan?.product?.properties?.hasTargetAmount &&
          plan?.product?.properties?.hasSavingFrequency
          ? plan?.contributionValue
          : plan?.planSummary?.principal
      );
    }
  }, [plan]);

  useEffect(() => {
    if (amount) {
      const formData = {
        amount: parseFloat((amount * plan?.exchangeRate).toFixed(2)),
        purposeOfPayment: "PLAN_CREATION",
      };
      dispatch(regTransaction(formData));
    }
    // setDebitPopup(true);
  }, [amount]);

  const handleClick = (e) => {
    if (e.target.value === "card") {
      setCard("card");
    }
  };


  const onSuccess = (reference) => {
    dispatch(payWithCard(parseInt(id), setSuccess));
  };

  const onClose = () => {
    console.log("Paystack closed");
  };

  const back = () => {
    navigate("/plan-list");
  };

  return (
    <>
      {planStatus === "OK" && (
        <>
          <Wrapper>
            <LeftView>
              <h4 className="pb-3">Pay with card</h4>
              <div className="plan-content">
                <div className="plan">
                  <div className="plan-top h-50 p-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h4>{plan.planName}</h4>
                        <p className="p-0 m-0">{plan?.product.productName}</p>
                      </div>
                      <h4 className="Pending">
                        {plan.planStatus.toLowerCase()}
                      </h4>
                    </div>
                    <div className="d-flex align-items-center justify-content-between pt-4">
                      <div>
                        <h4>Start date</h4>
                        <p className="p-0 m-0">
                          {moment(plan.planSummary.startDate).format(
                            "DD/MM/YYYY"
                          )}
                        </p>
                      </div>
                      <div>
                        <h4>End date</h4>
                        <p className="p-0 m-0">
                          {moment(plan.planSummary.endDate).format(
                            "DD/MM/YYYY"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex position-relative horizontal-line">
                    <div className="position-absolute horizontal-circle-left"></div>
                    <hr className="dotted" />
                    <div className="position-absolute end-0 horizontal-circle-right"></div>
                  </div>

                  <div className="plan-top h-50 py-1 px-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <h4>Balance</h4>
                        <p className="d-flex gap-1">
                          {getCurrIcon(plan?.currency?.name)}
                          {plan?.planSummary?.principal?.toLocaleString()}
                        </p>
                      </div>
                      {/* <i className="fa-solid fa-ellipsis"></i> */}
                    </div>
                  </div>
                </div>
              </div>
              <h4 className="pt-5">Payment Type</h4>
              <div className="plan-payment">
                <div>
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
                      defaultChecked
                      onClick={handleClick}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col ">
                    <label>Amount to Top-up</label>
                    <div className="input-group mb-4">
                      <div className=" input-group-prepend curr-icon">
                        {getCurrIcon(plan?.currency?.name)}
                      </div>
                      <input
                        className="form-control curr-input"
                        placeholder="N  0.00"
                        type="number"
                        name="amount"
                        value={
                          plan?.product?.properties?.hasTargetAmount &&
                          plan?.product?.properties?.hasSavingFrequency
                            ? plan?.contributionValue
                            : plan?.planSummary?.principal
                        }
                        disabled
                        required
                        // onChange={(e) => setAmount(parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </LeftView>
            {/* <RightView>
              <div className="bank-details">
                <div className="bank-detail-content">
                  <UserBankDetails />
                </div>
              </div>
            </RightView> */}
          </Wrapper>
          <WrapperFooter>
            <div className="footer-body">
              <div className="d-flex align-items-center justify-content-between footer-content">
                <div>
                  <button
                    style={{ color: "#111E6C", width: "300px" }}
                    onClick={back}
                  >
                    Back
                  </button>
                </div>
                {/* <div>
                    <button
                      style={{
                        backgroundColor: '#111E6C',
                        color: '#FFFFFF',
                        width: '300px',
                      }}
                      onClick={() => setIsClicked(true)}
                    >
                      Submit
                    </button>
                  </div> */}
                <ProceedPayCard
                  amount={parseFloat((amount * plan?.exchangeRate).toFixed(2) * 100)}
                  payType="withdraw-paystack"
                  onSuccess={onSuccess}
                  onClose={onClose}
                  text="Proceed to pay with paystack"
                />
              </div>
            </div>
          </WrapperFooter>
          <ModalComponent
            show={success}
            size={"md"}
            handleClose={() => setSuccess(false)}
          >
            <SuccessConfirm
              cardTopup="paid"
              handleClose={() => setSuccess(false)}
            />
          </ModalComponent>
        </>
      )}
    </>
  );
};

export default PlanPayment;

const LeftView = styled.div`
  width: 50%;
  padding: 40px;
  .plan-content,
  .plan-payment {
    width: 373px !important;
  }
  @media (max-width: 850px) {
    width: 100% !important;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.01em;
    color: #242424;
  }
  .Active,
  .Pending,
  .Matured {
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: -0.01em;
    text-transform: capitalize;
  }
  .Active {
    color: #219653;
  }
  .Pending {
    color: #f2994a;
  }
  .Matured {
    color: #2d9cdb;
  }

  .curr-icon {
    position: absolute;
    margin-top: 6px;
    margin-left: 12px;
    z-index: 10;
  }
  .curr-input {
    padding-left: 24px;
  }
`;

const RightView = styled.div`
  width: 50%;
  @media (max-width: 850px) {
    width: 100% !important;
  }
  .bank-details {
    padding: 40px;
    margin-top: -17px;
    background: rgba(28, 68, 141, 0.03);
    display: flex;
    justify-content: center;
  }
  .bank-detail-content {
    background: #ffffff;
    box-shadow: 0px 4px 30px rgba(196, 204, 221, 0.28);
    border-radius: 8px;
    padding: 20px;
    width: 373px;
    p {
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 150%;
      letter-spacing: -0.15px;
      color: #242424;
    }
    .bold-text {
      font-weight: 600;
    }
  }
`;

const Wrapper = styled.div`
  width: 100%;
  @media (max-width: 850px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  /* padding: 40px; */
  display: flex;
  flex-direction: row;
  .verve-card {
    padding-right: 20px;
  }
  .dotted {
    width: 100%;
    background: #f9fafb;
    height: 4px;
    border: 0.8px dashed #e0e0e0;
  }
  .horizontal-circle-left {
    z-index: 5;
    background: #f9fafb;
    border-radius: 0px 30px 30px 0px;
    width: 26px;
    height: 26px;
  }
  .horizontal-circle-right {
    background: #f9fafb;
    border-radius: 0px 30px 30px 0px;
    transform: matrix(-1, 0, 0, 1, 0, 0);
    width: 26px;
    height: 26px;
  }
  .plan {
    width: 100%;
    height: 263px;
    background: #ffffff;
    box-shadow: 0px 4px 30px rgba(196, 204, 221, 0.47);
    border-radius: 8px;
    h4 {
      font-weight: 700;
      font-size: 13px;
      line-height: 18px;
    }
  }

  h4 {
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: -0.03em;
    color: #242424;
  }
`;

const WrapperFooter = styled.div`
  background: #ffffff;
  box-shadow: 8px 0px 18px rgba(173, 173, 173, 0.25);
  padding: 40px 80px;
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
    background: #f2f2f2;
    border-radius: 10px;
    outline: none;
    border: none;
    padding: 10px 15px;
  }
  .blue-btn {
    color: #f2f2f2;
    background: #111e6c;
  }
`;
