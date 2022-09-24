import React, { useState } from "react";
import styled from "styled-components";
import { ProfileNavBar } from "../../dashboard/ProfileNavbar";
import ChoosePlanHolder from "../../../asset/chooseplaneHolder.png";
import { MakePayment, PlanSummary } from "../Accesssories";
import PlanBankPayment from "./PlanBankPayment";
import PlanCardPayment from "./PlanCardPayment";
import { useSelector } from 'react-redux';

const PlanPay = ({ goBack }) => {
  const [isBank, setIsBank] = useState(false);
  const [isCard, setIsCard] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const { singlePlan } = useSelector((state) => state.plan)

  const checkDetails = (values) => {
    const { bank, card } = values;
    if (bank) {
      setIsBank(true);
      setIsCard(false);
    }
    if (card) {
      setIsCard(true);
      setIsBank(false);
    }
  };

  if (isClicked && isBank) {
    return (
      <PlanBankPayment
        goBack={() => {
          setIsClicked(false);
          setIsBank(false);
        }}
      />
    );
  }

  if (isClicked && isCard) {
    return (
      <PlanCardPayment
        goBack={() => {
          setIsClicked(false);
          setIsCard(false);
        }}
      />
    );
  }

  return (
    <>
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">Choose Plan</span>
        </NavTitle>
      </ProfileNavBar>
      <Wrapper>
        <LeftView>
          <div className="choose-plan">
            <h5>Product 1</h5>
            <div className="d-flex align-items-center justify-content-between">
              <img
                className="image-holder"
                src={ChoosePlanHolder}
                alt="ChoosePlanHolder"
              />
              <div>
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
          </div>
          <PlanSummary planPay="planPay" />
        </LeftView>
        <RightView>
          <div className="bank-details">
            <div className="bank-detail-content">
              <MakePayment setPaymentType={(values) => checkDetails(values)} />
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
                onClick={goBack}>
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
                onClick={() => setIsClicked(true)}>
                Proceed
              </button>
            </div>
          </div>
        </div>
      </WrapperFooter>
    </>
  );
};

export default PlanPay;

const LeftView = styled.div`
  padding: 60px;
  @media (max-width: 570px) {
    padding: 20px !important;
    .image-holder {
      display: none;
    }
    .choose-plan {
      width: 90% !important;
    }
  }
  .choose-plan {
    width: 448px;
    height: 213px;
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

const RightView = styled.div`
  width: 50%;
  margin-top: 20px;
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
