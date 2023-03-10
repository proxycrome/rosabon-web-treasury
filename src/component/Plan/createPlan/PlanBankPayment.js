import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MOneyTransfer from "../../../asset/money-transfer.png";
import { ProfileNavBar } from "../../dashboard/ProfileNavbar";
import { PlanSummary, UserBankDetails } from "../Accesssories";
import ModalComponent from "../../ModalComponent";
import { SuccessConfirm } from "../../Accessories/BVNConfirm";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
// import { createPlan } from "../../../redux/actions/plan/planAction";
import { createPlan, createDynamicAcc } from "../../../store/actions";
import { PlanContext } from "./PlanForm";
import Spinner from "../../common/loading";

const PlanBankPayment = ({ goBack }) => {
  const [show, setShow] = useState(false);
  const [checkPlanName, setCheckPlanName] = useState("");
  const { form, setForm } = useContext(PlanContext);
  const [modalCount, setModalCount] = useState(0);
  const [accountCheck, setAccountCheck] = useState(false);
  const [siteCount, setSiteCount] = useState(0);
  const dispatch = useDispatch();
  const { loading: planLoading } = useSelector((state) => state.plan);
  const { dynamic_account, loading } = useSelector((state) => state.providus);
  const navigate = useNavigate();

  useEffect(() => {
    if (form.planName) {
      dispatch(createDynamicAcc(form.planName));
    }
  }, []);

  useEffect(() => {
    if (dynamic_account) {
      let planNameLen = form?.planName.length;
      let dynamicCheck =
        dynamic_account?.accountName !== null
          ? dynamic_account?.accountName.slice(9, planNameLen + 9)
          : null;

      setCheckPlanName(dynamicCheck);

      setForm({
        ...form,
        bankAccountInfo: {
          accountName: dynamic_account?.accountName,
          accountNumber: dynamic_account?.accountNumber,
          bankName: "Providus Bank",
        },
        paymentMethod: "BANK_TRANSFER",
      });

      setAccountCheck(true);
    }

    // if (
    //   siteCount >= 8  &&
    //   dynamicCheck === form?.planName &&
    //   dynamic_account?.accountName === form?.bankAccountInfo?.accountName
    // ) {
    //   dispatch(createPlan(form, setShell));
    //   return;
    // }
  }, [dynamic_account]);

  // useEffect(() => {
  //   setModalCount(modalCount + 1);
  //   if (modalCount) {
  //     navigate("/plan-product");
  //   }
  // }, [show]);

  const handleSubmit = () => {
    if (
      checkPlanName === form?.planName &&
      dynamic_account?.accountName === form?.bankAccountInfo?.accountName
    ) {
      dispatch(createPlan(form, setShow));
    }
  };

  return (
    <>
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">Choose Plan</span>
        </NavTitle>
      </ProfileNavBar>
      {accountCheck ? (
        <div>
          <Wrapper>
            <Toaster />
            <LeftView>
              <h6>Kindly confirm your transaction details below</h6>
              <div className="choose-plan mt-5">
                <div className="d-flex align-items-center justify-content-between">
                  <div>Payment Type:</div>
                  <div className="d-flex align-items-center">
                    <img
                      className="verve-card"
                      src={MOneyTransfer}
                      alt="Verve"
                    />
                    <p className="p-0 m-0">Bank Transfer</p>
                  </div>
                </div>
              </div>
              <PlanSummary />
            </LeftView>
            <RightView>
              <div className="bank-details">
                <div className="bank-detail-content">
                  <UserBankDetails />
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
                    onClick={() => {
                      goBack();
                      setAccountCheck(false);
                    }}
                  >
                    Back
                  </button>
                </div>
                <div>
                  <button
                    style={{
                      backgroundColor: "#111E6C",
                      color: "#FFFFFF",
                      width: "300px",
                    }}
                    disabled={loading}
                    onClick={handleSubmit}
                  >
                    {planLoading ? "LOADING..." : "Save"}
                  </button>
                  <ModalComponent
                    show={show}
                    size={"md"}
                    handleClose={() => setShow(false)}
                  >
                    <SuccessConfirm
                      savePlan="paid"
                      handleClose={() => setShow(false)}
                    />
                  </ModalComponent>
                </div>
              </div>
            </div>
          </WrapperFooter>
        </div>
      ) : (
        <div className="vh-100 w-100">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default PlanBankPayment;

const LeftView = styled.div`
  padding: 20px 60px;
  @media (max-width: 570px) {
    padding: 20px !important;
    .choose-plan {
      width: 90% !important;
    }
  }
  h6 {
    padding-left: 20px;
  }
  .choose-plan {
    width: 448px;
    background: #ffffff;
    box-shadow: 0px 4px 30px rgba(196, 204, 221, 0.28);
    border-radius: 8px;
    padding: 30px;
    p {
      font-style: normal;
      font-weight: 400;
      font-size: 13px;
      line-height: 148.4%;
      display: flex;
      align-items: flex-end;
      letter-spacing: -0.01em;
      color: #4f4f4f;
    }
  }
  h4 {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 16px;
    letter-spacing: -0.03em;
    color: #242424;
    padding-top: 60px;
    padding-bottom: 20px;
  }
  input {
    width: 239.5px;
    height: 54px;
    border: 1.5px solid #e0e0e0;
    border-radius: 8px;
    padding-left: 20px;
  }
  label {
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 21px;
    letter-spacing: -0.04em;
    color: #828282;
    padding-bottom: 15px;
    padding-left: 10px;
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
    &:disabled{
      cursor: not-allowed;
    }
  }
  .blue-btn {
    color: #f2f2f2;
    background: #111e6c;
  }
`;

const RightView = styled.div`
  width: 50%;
  margin-top: 20px;
  @media (max-width: 850px) {
    width: 100% !important;
  }
  .bank-details {
    padding: 40px 40px 93px 40px;
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
