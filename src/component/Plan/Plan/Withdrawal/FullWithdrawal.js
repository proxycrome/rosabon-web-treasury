import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
// import { SuccessConfirm } from "../../../Accessories/BVNConfirm";
import { ProfileNavBar } from "../../../dashboard/ProfileNavbar";
// import ModalComponent from "../../../ModalComponent";
import { formatCurrValue, WithdrawalSummary } from "../../Accesssories";
import { getBankDetails } from "../../../../store/actions";
import { Toaster } from "react-hot-toast";
import WithdrawalChannel from "./WithdrawalChannel";

const FullWithdrawal = ({ goBack, amount, reason }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [penalCharge, setPenalCharge] = useState();
  const [isTerms, setIsTerms] = useState(false);
  const dispatch = useDispatch();
  const { singlePlan, loading } = useSelector((state) => state.plan);
  const plan = singlePlan?.data.body ? singlePlan?.data.body : {};

  const capitalise = (str) => {
    return str?.charAt(0)?.toUpperCase() + str?.slice(1)?.toLowerCase();
  };

  // const submit = async() => {
  //   const formData = {
  //     amount: amount,
  //     completed: true,
  //     corporateUserWithdrawalMandate: null,
  //     plan: plan?.id,
  //     planAction: "WITHDRAW",
  //     withdrawTo: "TO_BANK",
  //     withdrawType: "FULL"
  //   }
  //   await dispatch(planAction(formData))
  //   if(plan_action !== null && plan_action_error===null) {
  //     setModalState(true)
  //   }
  // }

  useEffect(() => {
    dispatch(getBankDetails());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsClicked(true);
  };

  if (isClicked && isTerms) {
    return (
      <WithdrawalChannel
        amount={amount}
        type="FULL"
        reason={reason}
        goBack={() => setIsClicked(false)}
        penalCharge={penalCharge}
      />
    );
  }

  return (
    <>
      <Toaster />
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">Plan</span>
        </NavTitle>
      </ProfileNavBar>
      <form autoComplete="off" autoCorrect="off" onSubmit={handleSubmit}>
        <Wrapper>
          <LeftView>
            <h4 className="pb-3">Withdrawal</h4>
            <div className="plan-content">
              <div className="plan">
                <div className="plan-top h-50 p-4">
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <h4>{plan.planName}</h4>
                      <p className="p-0 m-0">{plan?.product.productName}</p>
                    </div>
                    <h4 className={capitalise(plan.planStatus)}>{capitalise(plan.planStatus)}</h4>
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
                        {moment(plan.planSummary.endDate).format("DD/MM/YYYY")}
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
                      <p className="p-0 m-0">
                        ???{formatCurrValue(parseFloat(plan?.planSummary?.principal))}
                      </p>
                    </div>
                    {/* <i className="fa-solid fa-ellipsis"></i> */}
                  </div>
                </div>
              </div>
            </div>
          </LeftView>
          <RightView>
            <div className="bank-details">
              <div className="bank-detail-content">
                <WithdrawalSummary
                  amount={amount}
                  reason={reason}
                  compPenalCharge={setPenalCharge}
                  checkTerms={setIsTerms}
                />
              </div>
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
                  onClick={goBack}
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
                  {loading ? "Loading..." : "Proceed"}
                </button>
                {/* <ModalComponent
                show={modalState}
                size={"md"}
                handleClose={() => setModalState(false)}>
                <SuccessConfirm
                  confirmNotice="withdrawal"
                  handleClose={() => setModalState(false)}
                />
              </ModalComponent> */}
              </div>
            </div>
          </div>
        </WrapperFooter>
      </form>
    </>
  );
};

export default FullWithdrawal;

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
`;

const RightView = styled.div`
  width: 50%;
  margin-top: 20px;
  @media (max-width: 850px) {
    width: 100% !important;
  }
  .bank-details {
    height: auto;
    padding: 40px 0;
    margin-top: -17px;
    background: rgba(28, 68, 141, 0.03);
    display: flex;
    justify-content: center;
  }
  .bank-detail-content {
    height:auto
    background: #ffffff;
    border-radius: 8px;
    width: 450px;
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
