import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ProfileNavBar } from "../../../dashboard/ProfileNavbar";
import moment from "moment";
import FullRollover from "./FullRollover";
import PartRollover from "./PartRollover";
import {
  getInvestmentRates,
  getSinglePlan,
  getSingleProduct,
  getWithholdingTax,
} from "../../../../store/actions";
import { formatCurrValue, getCurrIcon } from "../../Accesssories";
import { useMemo } from "react";

const Rollover = () => {
  const [amount, setAmount] = useState("");
  const [rolloverType, setRolloverType] = useState("");
  const [tenor, setTenor] = useState("");
  const [checkMinAmount, setCheckMinAmount] = useState(false);
  const [checkMaxAmount, setCheckMaxAmount] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [interestRate, setInterestRate] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { singlePlan, investment_rates, withholding_tax } = useSelector(
    (state) => state.plan
  );
  const plan = useMemo(
    () => (singlePlan?.data.body ? singlePlan?.data.body : {}),
    [singlePlan]
  );
  const planStatus = singlePlan?.data.statusCode;
  const inv_rates = useMemo(
    () => (investment_rates?.data.body ? investment_rates?.data.body : []),
    [investment_rates]
  );
  const withhold_tax = withholding_tax?.data.body
    ? withholding_tax?.data.body
    : [];

  useEffect(() => {
    dispatch(getSinglePlan(parseInt(id)));
    dispatch(getInvestmentRates());
    dispatch(getWithholdingTax());
  }, [dispatch, id]);

  useEffect(() => {
    if (singlePlan) {
      dispatch(getSingleProduct(plan?.product?.id));
    }
  }, [plan]);

  const { singleProduct } = useSelector((state) => state.product);
  const productTenors = useMemo(
    () => (singleProduct ? singleProduct?.data?.body.tenors : []),
    [singleProduct]
  );

  const fetchIntRate = useCallback(
    (intRecOption) => {
      let interestRate;

      const selectedTenor = productTenors.find(
        (item) => item.id === parseInt(tenor)
      );

      let rate = inv_rates?.find((item) => {
        return (
          item.product.id === parseInt(plan?.product?.id) &&
          item.currency.name === plan?.currency?.name &&
          amount >= item.minimumAmount &&
          amount <= item.maximumAmount &&
          selectedTenor?.tenorDays >= item.minimumTenor &&
          selectedTenor?.tenorDays <= item.maximumTenor
        );
      });

      if (rate !== undefined) {
        switch (intRecOption) {
          case "MONTHLY":
            interestRate = rate?.monthlyInterestRate;
            break;

          case "UPFRONT":
            interestRate = rate?.upfrontInterestRate;
            break;

          case "QUARTERLY":
            interestRate = rate?.quarterlyInterestRate;
            break;

          case "BI_ANNUAL":
            interestRate = rate?.biAnnualInterestRate;
            break;

          case "MATURITY":
            interestRate = rate?.maturityRate;
            break;

          default:
            break;
        }
        if (interestRate === null) {
          interestRate = plan?.directDebit ? 0 + rate?.directDebitRate : 0;
          // interestRate = formData.directDebit ? 0 : 0;
          return interestRate;
        } else {
          interestRate =
            plan?.directDebit === true || plan?.directDebit === "true"
              ? interestRate + rate?.percentDirectDebit
              : interestRate;
          return interestRate;
        }
      } else {
        interestRate = 0;
        return interestRate;
      }
    },
    [amount, tenor, plan, productTenors, inv_rates]
  );

  useEffect(() => {
    setInterestRate(fetchIntRate(plan?.interestReceiptOption));
  }, [plan, fetchIntRate]);

  const handleClick = (e) => {
    const { name, value } = e.target;
    if (name === "rolloverType") {
      setRolloverType(value);
    }
    if (value === "full") {
      setAmount(plan?.planSummary?.principal);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount < plan?.product?.minTransactionLimit) {
      setCheckMinAmount(true);
      setCheckMaxAmount(false);
      return;
    } else if (amount > plan?.planSummary?.principal) {
      setCheckMinAmount(false);
      setCheckMaxAmount(true);
      return;
    } else {
      setCheckMinAmount(false);
      setCheckMaxAmount(false);
      setIsClicked(true);
    }
  };

  if (rolloverType === "full" && isClicked) {
    return (
      <FullRollover
        amount={parseFloat(amount)?.toFixed(2)}
        tenor={parseInt(tenor)}
        interestRate={parseInt(interestRate)}
        withholdTax={withhold_tax}
        goBack={() => {
          setRolloverType("");
          setIsClicked(false);
        }}
      />
    );
  }

  if (rolloverType === "part" && isClicked) {
    return (
      <PartRollover
        amount={parseFloat(amount)?.toFixed(2)}
        tenor={parseInt(tenor)}
        interestRate={parseInt(interestRate)}
        withholdTax={withhold_tax}
        goBack={() => {
          setRolloverType("");
          setIsClicked(false);
        }}
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
          <form autoComplete="off" autoCorrect="off" onSubmit={handleSubmit}>
            <Wrapper>
              <LeftView>
                <h4 className="pb-3">Rollover</h4>
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
                        <h4 className={`capitalize ${plan?.planStatus}`}>
                          {plan?.planStatus?.toLowerCase()}
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
                            {formatCurrValue(parseFloat(plan?.planSummary?.principal))}
                          </p>
                        </div>
                        {/* <i className"fa-solid fa-ellipsis"></i> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="plan-payment">
                  <div>
                    <div className="d-flex align-items-center justify-content-between my-5">
                      <div className="d-flex align-items-center">
                        <p className="p-0 m-0">Partial Rollover</p>
                      </div>
                      <input
                        type="radio"
                        id="part"
                        name="rolloverType"
                        value="part"
                        onClick={handleClick}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="d-flex align-items-center">
                        <p className="p-0 m-0">Full Rollover</p>
                      </div>
                      <input
                        type="radio"
                        id="full"
                        name="rolloverType"
                        value="full"
                        onClick={handleClick}
                        required
                      />
                    </div>
                  </div>
                  <div className="row my-4">
                    <div className="col ">
                      <label>Input amount</label>
                      <div className="input-group">
                        <div className=" input-group-prepend curr-icon">
                          {getCurrIcon(plan?.currency?.name)}
                        </div>
                        <input
                          className="form-control curr-input"
                          placeholder={
                            rolloverType === "part"
                              ? ""
                              : plan?.planSummary?.principal?.toFixed(2)
                          }
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          required
                          step="0.001"
                          lang="nb"
                          disabled={rolloverType === "full"}
                          onWheel={numberInputOnWheelPreventChange}
                          onKeyDown={arrowBtnPreventChange}
                        />
                      </div>
                      <label className="d-flex gap-1 mt-2">
                        Amount for withdrawal is{" "}
                        <span className="d-flex">
                          {getCurrIcon(plan?.currency?.name)}
                          {(
                            plan?.planSummary?.principal -
                            (amount ? parseFloat(amount) : 0)
                          ).toFixed(2)}
                        </span>
                      </label>
                      {checkMinAmount && (
                        <label className="text-danger mt-2">
                          Amount for rollover is below the minimum allowed
                          amount of {getCurrIcon(plan?.currency?.name)}
                          <span style={{ fontWeight: "700" }}>
                            {plan?.product?.minTransactionLimit}
                          </span>{" "}
                          available for the product the plan is created under.
                        </label>
                      )}
                      {checkMaxAmount && (
                        <label className="text-danger mt-2">
                          Amount for rollover is above the maximum allowed
                          amount of {getCurrIcon(plan?.currency?.name)}
                          <span style={{ fontWeight: "700" }}>
                            {plan?.planSummary?.principal}
                          </span>{" "}
                          available for this plan.
                        </label>
                      )}
                    </div>
                  </div>
                  <div className="row my-4">
                    <div className="col ">
                      <label>Select a new Tenor</label>
                      <div className="input-group mt-1">
                        <select
                          className="form-select form-select-md"
                          aria-label=".form-select-md"
                          name="tenor"
                          value={tenor}
                          onChange={(e) => setTenor(e.target.value)}
                          required
                        >
                          <option value="" hidden disabled>
                            Select a new Tenor
                          </option>
                          {productTenors
                            ?.filter((data) => data.tenorStatus === "ACTIVE")
                            ?.map((item) => (
                              <option key={item.id} value={item.id}>
                                {item?.tenorName}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row my-4">
                    <div className="col ">
                      <label>Interest Rate (%)</label>
                      <div className="input-group">
                        <input
                          className="form-control"
                          type="text"
                          value={interestRate}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
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

export default Rollover;

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
  .ACTIVE,
  .PENDING,
  .MATURED {
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: -0.01em;
  }
  .ACTIVE {
    color: #219653;
  }
  .PENDING {
    color: #f2994a;
  }
  .MATURED {
    color: #2d9cdb;
  }

  .capitalize {
    text-transform: capitalize;
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
  @media (max-width: 850px) {
    width: 100% !important;
  }
  .bank-details {
    height: 70vh;
    padding: 40px;
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
