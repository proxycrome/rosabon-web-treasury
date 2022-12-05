import moment from "moment";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { planAction } from "../../../../store/actions";
import { SuccessConfirm } from "../../../Accessories/BVNConfirm";
import { ProfileNavBar } from "../../../dashboard/ProfileNavbar";
import ModalComponent from "../../../ModalComponent";
import { RolloverSummary, RolloverWithdrawMethod } from "../../Accesssories";

const RolloverWithdraw = ({
  goBack,
  amount,
  tenor,
  interestRate,
  withholdTax,
}) => {
  const [isTerms, setIsTerms] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [withdrawTo, setWithdrawTo] = useState("");
  const [base64File, setBase64File] = useState({
    corporateUserWithdrawalMandate: "",
  });
  // const [savingFreq, setSavingFreq] = useState(false);
  const [formData, setFormData] = useState({
    contributionValue: 0,
    calculatedInterest: 0,
    paymentMaturity: 0,
    withholdingTax: 0,
  });

  const dispatch = useDispatch();
  const date = new Date();
  const recentDate = moment(date).format("YYYY-MM-DD");
  const [endDate, setEndDate] = useState("");

  const { singlePlan } = useSelector((state) => state.plan);
  // const { withdrawReasons } = useSelector((state) => state.user_profile);
  const plan = singlePlan?.data.body ? singlePlan?.data.body : {};
  const { bankDetails } = useSelector((state) => state.user_profile);
  const { login } = useSelector((state) => state.auth);
  const user_role = login ? login?.role?.name : "";

  console.log(plan);
  console.log(bankDetails);

  const checkUpload = () => {
    if (
      user_role === "COMPANY" &&
      withdrawTo === "TO_BANK" &&
      !base64File?.corporateUserWithdrawalMandate
    ) {
      return false;
    } else {
      return true;
    }
  };

  console.log(checkUpload());
  console.log(isTerms);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isTerms && checkUpload()) {
      const { corporateUserWithdrawalMandate } = base64File;
      const {
        // contributionValue,
        calculatedInterest,
        paymentMaturity,
        withholdingTax,
      } = formData;
      const data = {
        amount: parseFloat(amount),
        balanceAfterRollover: parseFloat(
          plan?.planSummary?.principal - parseFloat(amount)
        ),
        bankAccountDetails:
          withdrawTo === "TO_BANK" && user_role !== "COMPANY"
            ? parseInt(bankDetails?.id)
            : null,
        completed: true,
        corporateUserWithdrawalMandate:
          user_role === "COMPANY" && withdrawTo === "TO_BANK"
            ? corporateUserWithdrawalMandate
            : null,
        plan: parseInt(plan?.id),
        planAction: "ROLLOVER",
        rollToPlan: {
          acceptPeriodicContribution: true,
          actualMaturityDate: moment(endDate, "DD/MM/YYYY").format(
            "YYYY-MM-DD"
          ),
          allowsLiquidation: plan?.allowsLiquidation,
          amount: plan?.product?.properties?.hasTargetAmount
            ? 0
            : parseFloat(amount),
          autoRenew: plan?.autoRenew,
          autoRollOver: plan?.autoRollOver,
          // bankAccountInfo: null,
          contributionValue: plan?.contributionValue,
          currency: parseInt(plan?.currency?.id),
          dateCreated: recentDate,
          directDebit: plan?.directDebit,
          exchangeRate: plan?.exchangeRate,
          interestRate,
          interestReceiptOption: plan?.interestReceiptOption,
          monthlyContributionDay: plan?.monthlyContributionDay,
          numberOfTickets: Math.floor(
            amount / plan.product.minTransactionLimit
          ),
          // paymentMethod: null,
          planDate: recentDate,
          planName: plan?.planName,
          planStatus: "ACTIVE",
          planSummary: {
            calculatedInterest: calculatedInterest,
            endDate: moment(endDate, "DD/MM/YYYY").format("YYYY-MM-DD"),
            interestRate,
            interestReceiptOption: plan?.interestReceiptOption,
            paymentMaturity: paymentMaturity,
            planName: plan?.planName,
            principal: parseFloat(amount),
            startDate: recentDate,
            withholdingTax: withholdingTax,
          },
          product: plan?.product?.id,
          productCategory: plan?.productCategory?.id,
          savingFrequency: plan?.savingFrequency,
          targetAmount: plan?.product?.properties?.hasTargetAmount
            ? parseFloat(amount)
            : null,
          tenor,
          weeklyContributionDay: plan?.weeklyContributionDay,
        },
        rolloverType: "PARTIAL",
        withdrawTo,
      };

      // console.log(data);
      await dispatch(planAction(data, setModalState, null, null, null, "part"));
    }
  };

  return (
    <>
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">Plan</span>
        </NavTitle>
      </ProfileNavBar>
      <Toaster/>
      <form autoComplete="off" autoCorrect="off" onSubmit={handleSubmit}>
        <Wrapper>
          <LeftView>
            <h4 className="pb-3">Rollover</h4>
            <RolloverSummary
              amount={amount}
              tenor={tenor}
              interestRate={interestRate}
              withholdTax={withholdTax}
              checkTerms={setIsTerms}
              isTerms={isTerms}
              setEndDate={setEndDate}
              setFormData={setFormData}
              formData={formData}
            />
          </LeftView>
          <RightView>
            <div className="bank-details">
              <div className="bank-detail-content">
                <RolloverWithdrawMethod
                  withdrawTo={withdrawTo}
                  setWithdrawTo={setWithdrawTo}
                  base64File={base64File}
                  setBase64File={setBase64File}
                  // savingFreq={savingFreq}
                  balance={parseFloat(
                    plan?.planSummary?.principal - parseFloat(amount)
                  )}
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
                  style={{ color: "#111E6C", width: "300px" }}
                  onClick={goBack}
                  type="button"
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
                  // onClick={() => setModalState(true)}
                >
                  Submit
                </button>
                <ModalComponent
                  show={modalState}
                  size={"md"}
                  handleClose={() => setModalState(false)}
                >
                  <SuccessConfirm
                    confirmNotice="rollover"
                    handleClose={() => setModalState(false)}
                  />
                </ModalComponent>
              </div>
            </div>
          </div>
        </WrapperFooter>
      </form>
    </>
  );
};

export default RolloverWithdraw;

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
  @media (max-width: 850px) {
    width: 100% !important;
  }
  .bank-details {
    height: auto;
    padding: 40px 0;
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
