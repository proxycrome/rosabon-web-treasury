import React, { useState } from 'react';
import styled from 'styled-components';
import Verve from '../../../asset/master-card-logo.png';
import { ProfileNavBar } from '../../dashboard/ProfileNavbar';
import { PlanSummary } from '../Accesssories';
import ModalComponent from '../../ModalComponent';
import { SuccessConfirm } from '../../Accessories/BVNConfirm';

const PlanCardPayment = ({goBack}) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <ProfileNavBar>
        <h2>Choose Plan</h2>
      </ProfileNavBar>
      <Wrapper>
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
              <button style={{ color: '#111E6C', width: '300px' }} onClick={goBack}>Back</button>
            </div>
            <div>
              <button
                style={{
                  backgroundColor: '#111E6C',
                  color: '#FFFFFF',
                  width: '300px',
                }}
                onClick={() => setShow(true)}
              >
                Pay
              </button>
              <ModalComponent
                show={show}
                size={'md'}
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
    font-family: 'Montserrat';
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