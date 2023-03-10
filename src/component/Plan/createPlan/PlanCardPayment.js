import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Verve from "../../../asset/master-card-logo.png";
import { ProfileNavBar } from "../../dashboard/ProfileNavbar";
import { PlanSummary, PayWithCard } from "../Accesssories";
import ModalComponent from "../../ModalComponent";
import { ProceedPayCard, SuccessConfirm } from "../../Accessories/BVNConfirm";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { PlanContext } from "./PlanForm";
import {
  createPlan,
  verifyPaystack,
} from "../../../store/actions";
import Spinner from "../../common/loading";

const PlanCardPayment = ({ goBack }) => {
  const [show, setShow] = useState(false);
  const [debitPopup, setDebitPopup] = useState(false);
  const [modalCount, setModalCount] = useState(0);
  const { form, setForm } = useContext(PlanContext);
  const dispatch = useDispatch();
  // const { users } = useSelector((state) => state.user_profile);
  const { reg_transaction } = useSelector((state) => state.paystack);
  const { products } = useSelector((state) => state.product);
  const { loading, newPlan } = useSelector((state) => state.plan);
  const navigate = useNavigate();

  const product = products?.data?.body
    ? products?.data?.body.find((item) => item.id === form?.product)
    : {};

  const createdPlan = newPlan?.data?.body ? newPlan?.data?.body : {};


  useEffect(() => {
    setModalCount(modalCount + 1);
    if (modalCount >= 2) {
      navigate("/plan-product");
    }
  }, [show]);

  const handleSubmit = async () => {
    await dispatch(createPlan(form, setDebitPopup));
  };

  useEffect(() => {
    if (Object.keys(createdPlan).length > 0) {
      setForm({
        ...form,
        currency: parseInt(createdPlan?.currency?.id),
        product: parseInt(createdPlan?.product?.id),
        tenor: parseInt(createdPlan?.tenor?.id),
        planStatus: "ACTIVE",
        planId: parseInt(createdPlan?.id),
        updateStatus: true,
      });
    }
  }, [createdPlan]);

  const onSuccess = (reference) => {
    dispatch(
      verifyPaystack(
        "PAYSTACK",
        reg_transaction?.transactionReference,
        dispatch,
        form,
        setShow,
        setDebitPopup,
        "PLAN_CREATION"
      )
    );
  };

  const onClose = () => {
  
  };

  let amount = parseInt(
    product.properties.hasTargetAmount &&
      product?.properties?.hasSavingFrequency
      ? (form?.contributionValue * form?.exchangeRate) * 100
      : (form?.planSummary.principal * form?.exchangeRate).toFixed(2) * 100
  );

  return (
    <>
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">Choose Plan</span>
        </NavTitle>
      </ProfileNavBar>
      <Wrapper>
        <Toaster />
        <LeftView>
          <h6>Kindly confirm your transaction details below</h6>
          <div className="choose-plan mt-5">
            <div className="d-flex align-items-center justify-content-between">
              <div>Payment Type:</div>
              <div className="d-flex align-items-center">
                <img className="verve-card" src={Verve} alt="Verve" />
                <p className="p-0 m-0">Debit Card</p>
              </div>
            </div>
          </div>
          <PlanSummary />
        </LeftView>
      </Wrapper>
      <WrapperFooter>
        <div className="footer-body">
          <div className="d-flex align-items-center justify-content-between footer-content">
            <div>
              <button
                style={{ color: "#111E6C", width: "300px" }}
                onClick={goBack}
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
                onClick={handleSubmit}
              >
                {loading ? "LOADING..." : "Submit"}
              </button>
              {/* <PayWithCard
                    amount={amount}
                    email={users?.email}
                    setShow={setShow}
                    transactionRef={reg_transaction?.transactionReference}
                    userId={users?.id}
                  /> */}
              <ModalComponent
                show={debitPopup}
                size={"md"}
                handleClose={() => setDebitPopup(false)}
              >
                <ProceedPayCard
                  amount={amount}
                  payType="withdraw-paystack"
                  onSuccess={onSuccess}
                  onClose={onClose}
                  text="Proceed to pay with paystack"
                />
              </ModalComponent>
              <ModalComponent
                show={show}
                size={"md"}
                handleClose={() => setShow(false)}
              >
                <SuccessConfirm
                  createPlan="paid"
                  handleClose={() => setShow(false)}
                />
              </ModalComponent>
            </div>
          </div>
        </div>
      </WrapperFooter>
    </>
  );
};

export default PlanCardPayment;

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
  }
  .blue-btn {
    color: #f2f2f2;
    background: #111e6c;
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
