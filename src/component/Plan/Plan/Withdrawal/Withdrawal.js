import React, { useState, useEffect, useCallback, useMemo } from "react";
import styled from "styled-components";
import { FormGroup, Input } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { ProfileNavBar } from "../../../dashboard/ProfileNavbar";
import FullWithdrawal from "./FullWithdrawal";
import PartWithdrawal from "./PartWithdrawal";
import {
  getPenalCharge,
  getSinglePlan,
  getWithdrawReason,
} from "../../../../store/actions";
import { getCurrIcon } from "../../Accesssories";
import toast, { Toaster } from "react-hot-toast";
import { formatCurrValue } from "../../Accesssories";

const Withdrawal = () => {
  const [withdrawType, setWithdrawType] = useState("");

  const [isClicked, setIsClicked] = useState(false);
  const [penalAmount, setPenalAmount] = useState(0);
  const [reason, setReason] = useState("");
  const [otherReasons, setOtherReasons] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { singlePlan, penal_charge } = useSelector((state) => state.plan);
  const { withdrawReasons } = useSelector((state) => state.user_profile);
  const plan = useMemo(
    () => (singlePlan?.data?.body ? singlePlan?.data.body : {}),
    [singlePlan]
  );
  const planStatus = singlePlan?.data?.statusCode;

  const [amount, setAmount] = useState("");

  const penalCharges = useMemo(
    () => (penal_charge?.data?.body ? penal_charge?.data?.body : []),
    [penal_charge]
  );

  const [balance, setBalance] = useState(plan?.planSummary?.principal);

  const capitalise = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  useEffect(() => {
    dispatch(getSinglePlan(parseInt(id)));
    dispatch(getWithdrawReason());
    dispatch(getPenalCharge());
  }, [dispatch, id]);

  useEffect(() => {
    if (plan?.planStatus === "MATURED") {
      setWithdrawType("full");
      setAmount(plan?.planSummary?.principal);
    } else {
      setWithdrawType("part");
    }
  }, [plan]);

  let date = new Date();
  const recentDate = moment(date).format("YYYY-MM-DD");

  const planProductCharges = penalCharges?.filter(
    (data) => data.product.id === plan?.product?.id
  );

  const computePenalCharge = useCallback(
    (intRecOption) => {
      let penalRate = 0;
      let penalCharge = 0;
      const maxNumberDays = moment(plan?.actualMaturityDate).diff(
        plan?.planSummary?.startDate,
        "days"
      );

      let currentNumberOfDays = moment(recentDate).diff(
        plan?.planSummary?.startDate,
        "days"
      );

      const penalDays = moment(plan?.planSummary?.endDate).diff(
        recentDate,
        "days"
      );

      const penalObj = planProductCharges
        ?.sort((a, b) => a.minDaysElapsed - b.minDaysElapsed)
        ?.find((item) => {
          const maxDays = Math.floor(
            (item.maxDaysElapsed * maxNumberDays) / 100
          );
          const minDays = Math.floor(
            (item.minDaysElapsed * maxNumberDays) / 100
          );
          return (
            currentNumberOfDays >= minDays && currentNumberOfDays <= maxDays
          );
        });

      penalRate = penalObj?.penalRate / 100;

      currentNumberOfDays = currentNumberOfDays === 0 ? 1 : currentNumberOfDays;

      if (penalDays > 0) {
        switch (intRecOption) {
          case "MATURITY":
            if (plan?.product?.properties?.penaltyFormula === "FIXED_FORMULA") {
              penalCharge = (currentNumberOfDays * penalRate * amount) / 365;
            } else if (
              plan?.product?.properties?.penaltyFormula === "TARGET_FORMULA"
            ) {
              const totalEarnedInt =
                (plan?.planSummary?.principal *
                  plan?.interestRate *
                  (currentNumberOfDays / 365)) /
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
                  (currentNumberOfDays / 365);
              penalCharge =
                (currentNumberOfDays / 365) * penalRate * amount +
                excessIntPaid;
            }
            break;

          case "MONTHLY":
          case "QUARTERLY":
          case "BI_ANNUAL":
            if (plan?.product?.properties?.penaltyFormula === "FIXED_FORMULA") {
              penalCharge = (currentNumberOfDays / 365) * penalRate * amount;
            }
            break;

          default:
            penalCharge = 0;
            break;
        }
      }

      return penalCharge;
    },
    [plan, amount, recentDate, planProductCharges]
  );

  useEffect(() => {
    setPenalAmount(computePenalCharge(plan?.interestReceiptOption));
  }, [computePenalCharge, plan, amount]);

  const handleClick = (e) => {
    const { name, value } = e.target;
    if (name === "withdrawType") {
      if (value === "full") {
        setAmount(plan?.planSummary?.principal);
      }
      setWithdrawType(value);
    }
  };

  useEffect(() => {
    if (plan.planStatus === "MATURED") {
      setBalance(0);
    } else {
      setBalance(
        (
          plan?.planSummary?.principal -
          (amount ? parseFloat(amount) : 0) -
          penalAmount
        )?.toFixed(2)
      );
    }
  }, [amount, penalAmount, plan]);

  const handleNext = (e) => {
    e.preventDefault();
    if (
      (balance < plan?.product?.minTransactionLimit &&
        plan?.planStatus === "ACTIVE") ||
      balance < 0
    ) {
      toast.error(
        `Balance cannot be less than ${
          document.querySelectorAll("span")[
            document.querySelectorAll("span").length - 1
          ].innerText
        } ${plan?.product?.minTransactionLimit}`
      );
      return;
    }
    setIsClicked(true);
  };

  if (withdrawType === "full" && isClicked && reason && amount) {
    return (
      <FullWithdrawal
        amount={parseFloat(amount)?.toFixed(2)}
        reason={reason}
        goBack={() => {
          setWithdrawType("full");
          setIsClicked(false);
        }}
      />
    );
  }

  if (withdrawType === "part" && isClicked && reason && amount) {
    return (
      <PartWithdrawal
        amount={parseFloat(amount)?.toFixed(2)}
        reason={reason}
        goBack={() => {
          setWithdrawType("part");
          setIsClicked(false);
        }}
        penalAmount={penalAmount}
      />
    );
  }

  const back = () => {
    navigate("/plan-list");
  };

  const arrowBtnPreventChange = (e) => {
    if (e.which === 38 || e.which === 40) {
      e.preventDefault();
    }
  };

  const numberInputOnWheelPreventChange = (e) => {
    // Prevent the input value change
    e.target.blur();

    // Prevent the page/container scrolling
    e.stopPropagation();

    // Refocus immediately, on the next tick (after the current function is done)
    setTimeout(() => {
      e.target.focus();
    }, 0);
  };

  return (
    <>
      {planStatus === "OK" && (
        <>
          <ProfileNavBar>
            <NavTitle>
              <span className="fw-bold">Plan</span>
            </NavTitle>
          </ProfileNavBar>
          <Toaster />
          <form autoCorrect="off" autoComplete="off" onSubmit={handleNext}>
            <Wrapper>
              <LeftView>
                <h4 className="pb-3">Withdrawal</h4>
                <div className="plan-content">
                  <div className="plan">
                    <div className="plan-top h-50 p-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <div>
                          <h4>{plan?.planName}</h4>
                          <p className="p-0 m-0">
                            {plan?.product?.productName}
                          </p>
                        </div>
                        <h4 className={capitalise(plan?.planStatus)}>
                          {capitalise(plan?.planStatus)}
                        </h4>
                      </div>
                      <div className="d-flex align-items-center justify-content-between pt-4">
                        <div>
                          <h4>Start date</h4>
                          <p className="p-0 m-0">
                            {moment(plan?.planSummary?.startDate).format(
                              "DD/MM/YYYY"
                            )}
                          </p>
                        </div>
                        <div>
                          <h4>End date</h4>
                          <p className="p-0 m-0">
                            {moment(plan?.planSummary?.endDate).format(
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
                          <p className="p-0 m-0 d-flex gap-1">
                            {getCurrIcon(plan?.currency?.name)}
                            {formatCurrValue(
                              parseFloat(plan?.planSummary?.principal)
                            )}
                          </p>
                        </div>
                        {/* <i className="fa-solid fa-ellipsis"></i> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="plan-payment">
                  <div>
                    <div className="d-flex align-items-center justify-content-between my-5">
                      <div className="d-flex align-items-center">
                        <p className="p-0 m-0">Partial Withdrawal</p>
                      </div>
                      <input
                        type="radio"
                        id="part"
                        name="withdrawType"
                        value="part"
                        onClick={handleClick}
                        required
                        checked={plan?.planStatus === "ACTIVE"}
                        disabled={plan?.planStatus === "MATURED"}
                        readOnly={plan?.planStatus === "ACTIVE"}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="d-flex align-items-center">
                        <p className="p-0 m-0">Full Withdrawal</p>
                      </div>
                      <input
                        type="radio"
                        id="full"
                        name="withdrawType"
                        value="full"
                        onClick={handleClick}
                        disabled={plan?.planStatus === "ACTIVE"}
                        checked={plan?.planStatus === "MATURED"}
                        required
                      />
                    </div>
                  </div>
                  <div className="row my-4">
                    <div className="col ">
                      <label>Amount to Liquidate</label>
                      <div className="input-group">
                        <div className=" input-group-prepend curr-icon">
                          {getCurrIcon(plan?.currency?.name)}
                        </div>
                        <input
                          className="form-control curr-input"
                          placeholder={plan?.planSummary?.principal?.toFixed(2)}
                          type="number"
                          name="amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          max={plan?.planSummary?.principal}
                          step="0.001"
                          lang="nb"
                          required
                          disabled={
                            withdrawType === "full" ||
                            plan?.planStatus === "MATURED"
                          }
                          onWheel={numberInputOnWheelPreventChange}
                          onKeyDown={arrowBtnPreventChange}
                        />
                      </div>
                      <label className="d-flex gap-1">
                        Balance is{" "}
                        <span className="d-flex">
                          {getCurrIcon(plan?.currency?.name)}
                          {balance}
                        </span>
                      </label>
                      {plan?.planStatus === "MATURED" && balance > 0 && (
                        <label className="text-danger">
                          Your balance will be rolled over for another cycle
                        </label>
                      )}
                    </div>
                  </div>
                  <div className="row my-4">
                    <div className="col ">
                      <label>Reason for Withdrawal</label>
                      <div className="input-group">
                        <select
                          className="form-select form-select-md"
                          aria-label=".form-select-md"
                          name="reason"
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                          required
                        >
                          <option value="" hidden>
                            Select Reason for Withdrawal
                          </option>
                          {withdrawReasons?.data?.body
                            ?.filter((data) => data.status === "ACTIVE")
                            ?.map((item) => (
                              <option key={item.id} value={item.reason}>
                                {item.reason}
                              </option>
                            ))}
                          <option value="Others">Others</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {reason === "Others" ? (
                    <div className="row my-4">
                      <div className="col ">
                        <FormGroup className="form-group-custom mb-4">
                          <Input
                            name="otherReasons"
                            type="textarea"
                            rows={5}
                            required={reason === "Others"}
                            value={otherReasons}
                            className="form-control"
                            onChange={(e) => setOtherReasons(e.target.value)}
                            id="otherReasons"
                            placeholder="Please provide reason for withdrawal"
                          />
                        </FormGroup>
                      </div>
                    </div>
                  ) : null}
                </div>
              </LeftView>
              <RightView>
                <div className="bank-details">
                  {/* <div className="bank-detail-content"> */}
                  {/* <UserBankDetails /> */}
                  {/* </div> */}
                </div>
              </RightView>
            </Wrapper>
            <WrapperFooter>
              <div className="footer-body">
                <div className="d-flex align-items-center justify-content-between footer-content">
                  <div>
                    <button
                      type="button"
                      style={{ color: "#111E6C", width: "300px" }}
                      onClick={back}
                    >
                      Back
                    </button>
                  </div>
                  <div>
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#111E6C",
                        color: "#FFFFFF",
                        width: "300px",
                      }}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </WrapperFooter>
          </form>
        </>
      )}
    </>
  );
};

export default Withdrawal;

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
    .plan-content,
    .plan-payment {
      width: 100% !important;
    }
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
    padding-left: 28px;
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

const RightView = styled.div`
  width: 50%;
  margin-top: 20px;
  @media (max-width: 850px) {
    width: 100% !important;
  }
  .bank-details {
    height: 70vh;
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
