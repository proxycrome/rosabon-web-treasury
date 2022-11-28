import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { SuccessConfirm } from "../../../Accessories/BVNConfirm";
import { ProfileNavBar } from "../../../dashboard/ProfileNavbar";
import ModalComponent from "../../../ModalComponent";
import { RolloverWithdrawMethod, WithdrawalSummary } from "../../Accesssories";
import { Toaster } from "react-hot-toast";
import { planAction, getPenalCharge } from "../../../../store/actions";

const WithdrawalChannel = ({ goBack, amount, type, reason, penalCharge }) => {
  const [modalState, setModalState] = useState(false);
  const [withdrawTo, setWithdrawTo] = useState("");
  const [gate, setPenalCharge] = useState();
  const [isTerms, setIsTerms] = useState(false);
  const [base64File, setBase64File] = useState({
    corporateUserWithdrawalMandate: "",
  });

  const dispatch = useDispatch();
  const { singlePlan, loading } = useSelector((state) => state.plan);
  const plan = singlePlan?.data.body ? singlePlan?.data.body : {};

  const { login } = useSelector((state) => state.auth);
  const user_role = login ? login?.role?.name : "";

  useEffect(() => {
    dispatch(getPenalCharge());
  }, [dispatch]);

  const submit = async (e) => {
    e.preventDefault();
    if (isTerms && withdrawTo) {
      const { corporateUserWithdrawalMandate } = base64File;
      const formData = {
        amount: parseFloat(amount),
        completed: true,
        corporateUserWithdrawalMandate:
          user_role === "COMPANY" ? corporateUserWithdrawalMandate : null,
        plan: plan?.id,
        penalCharge: parseFloat(penalCharge),
        planAction: "WITHDRAW",
        withdrawTo: withdrawTo,
        withdrawType: type,
      };
      console.log(formData)
      await dispatch(planAction(formData, setModalState))
    }
  };

  return (
    <>
      <Toaster />
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">Plan</span>
        </NavTitle>
      </ProfileNavBar>
      <form autoComplete="off" autoCorrect="off" onSubmit={submit}>
        <Wrapper>
          <LeftView>
            <h4 className="pb-3">Withdrawal</h4>
            <WithdrawalSummary
              amount={amount}
              reason={reason}
              compPenalCharge={setPenalCharge}
              checkTerms={setIsTerms}
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
                  {loading ? "Loading..." : "Submit"}
                </button>
                <ModalComponent
                  show={modalState}
                  size={"md"}
                  handleClose={() => setModalState(false)}
                >
                  <SuccessConfirm
                    confirmNotice="withdrawal"
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

export default WithdrawalChannel;

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
