import React from "react";
import styled from "styled-components";
import Verve from "../../asset/master-card-logo.png";
import MOneyTransfer from "../../asset/money-transfer.png";
import { RolloverSummary } from "./Accesssories";

const PlanPayment = () => {
  return (
    <Wrapper>
      <LeftView>
        <h4 className="pb-3">Top up</h4>
        <div className="plan-content">
          <div className="plan">
            <div className="plan-top h-50 p-4">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h4>Plan 1</h4>
                  <p className="p-0 m-0">Product 1</p>
                </div>
                <h4>Active</h4>
              </div>
              <div className="d-flex align-items-center justify-content-between pt-4">
                <div>
                  <h4>Start date</h4>
                  <p className="p-0 m-0">24/06/2023</p>
                </div>
                <div>
                  <h4>Start date</h4>
                  <p className="p-0 m-0">24/06/2023</p>
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
                  <h4>Plan 1</h4>
                  <p className="p-0 m-0">Product 1</p>
                </div>
                <i class="fa-solid fa-ellipsis"></i>
              </div>
            </div>
          </div>
        </div>
        <h4 className="pt-5">Choose Payment Type</h4>
        <div className="plan-payment">
          <div className="row">
            <div class="col ">
              <label>Input amout to Top-up</label>
              <div class="input-group mb-4">
                <input class="form-control" placeholder="N  0.00" type="text" />
              </div>
            </div>
          </div>
          <div>
            <div className="d-flex align-items-center justify-content-between py-4">
              <div className="d-flex align-items-center">
                <img className="verve-card" src={Verve} alt="Verve" />
                <p className="p-0 m-0">Debit Card</p>
              </div>
              <input type="checkbox" id="scales" name="scales" checked></input>
            </div>
          </div>
          <div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <img className="verve-card" src={MOneyTransfer} alt="Verve" />
                <p className="p-0 m-0">Bank Transfer</p>
              </div>
              <input type="checkbox" id="scales" name="scales" checked></input>
            </div>
          </div>
        </div>
      </LeftView>
      <RightView>
        <div className="bank-details">
          <div className="bank-detail-content">
            <RolloverSummary />
          </div>
        </div>
      </RightView>
    </Wrapper>
  );
};

export default PlanPayment;

const LeftView = styled.div`
  width: 50%;
  padding: 40px;
  .plan-content,
  .plan-payment {
    width: 338px !important;
  }
  @media (max-width: 700px) {
    width: 100% !important;
  }
  @media (max-width: 400px) {
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
`;

const RightView = styled.div`
  width: 50%;
  @media (max-width: 700px) {
    width: 100% !important;
  }
  .bank-details {
    padding: 40px;
    background: rgba(28, 68, 141, 0.03);
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
  @media (max-width: 800px) {
    flex-direction: column;
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
