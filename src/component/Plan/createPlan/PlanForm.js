import React, { useState } from 'react';
import styled from 'styled-components';
import ChoosePlanHolder from '../../../asset/chooseplaneHolder.png';
import { ProfileNavBar } from '../../dashboard/ProfileNavbar';
import PlanPay from './PlanPay';
import { useNavigate } from 'react-router-dom';

const PlanForm = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  if (isClicked) {
    return <PlanPay goBack={() => setIsClicked(false)}/>;
  }

  const back = () => {
    navigate("/plan-product");
  }

  return (
    <>
      <ProfileNavBar >
        <h2>Choose Plan</h2>
      </ProfileNavBar>
      <Wrapper>
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
                  Lorem Ipsum is simply dummy text of the{' '}
                </p>
                <p className="p-0 m-0 pb-2">
                  {' '}
                  printing and typesetting industry.
                </p>
                <p className="p-0 m-0 pb-2">
                  Lorem Ipsum is simply dummy text of the{' '}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <h4>Plan Details</h4>
          </div>
          <div className="row">
            <div className="col-md-6 ">
              <label>Plan Name</label>
              <div className="input-group mb-4">
                <input
                  className="form-control"
                  placeholder="Enter a plan name"
                  type="text"
                />
              </div>
            </div>
            <div className="col-md-6">
              <label>Currency</label>
              <div className="input-group mb-4">
                <input
                  className="form-control"
                  placeholder="Select investment currency"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 ">
              <label>Exchange rate</label>
              <div className="input-group mb-4">
                <input className="form-control" placeholder="" type="text" />
              </div>
            </div>
            <div className="col-md-6">
              <label>Amount to be placed</label>
              <div className="input-group mb-4">
                <input className="form-control" placeholder="" type="text" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 ">
              <label>Target amount</label>
              <div className="input-group mb-4">
                <input className="form-control" placeholder="" type="text" />
              </div>
            </div>
            <div className="col-md-6">
              <label>Tenor</label>
              <div className="input-group mb-4">
                <input className="form-control" placeholder="" type="text" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 ">
              <label>Savings frequency</label>
              <select className="form-select form-select-lg mb-3" name="source">
                <option value="" selected>
                  Daily
                </option>
                <option value="">Weekly</option>
                <option value="">Monthly</option>
              </select>
            </div>
            <div className="col-md-6">
              <label>Interest Reciept Option</label>
              <div className="input-group mb-4">
                <input className="form-control" placeholder="" type="text" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 ">
              <label>Contribution value</label>
              <div className="input-group mb-4">
                <input className="form-control" placeholder="" type="text" />
              </div>
            </div>
            <div className="col-md-6">
              <label>Direct Debit</label>
              <div className="input-group mb-4">
                <select
                  className="form-select form-select-lg"
                  placeholder="Setup Direct Debit"
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 ">
              <label>Calculate interest rate</label>
              <div className="input-group mb-4">
                <input className="form-control" placeholder="" type="text" />
              </div>
            </div>
            <div className="col-md-6">
              <label>Number of tickets</label>
              <div className="input-group mb-4">
                <input className="form-control" placeholder="" type="text" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 ">
              <label>Auto renew</label>
              <div className="input-group mb-4">
                <select className="form-select form-select-lg" placeholder="">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <label>Allow liquidation</label>
              <div className="input-group mb-4">
                <select className="form-select form-select-lg" placeholder="">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
      <WrapperFooter>
        <div className="footer-body">
          <div className="d-flex align-items-center justify-content-between footer-content">
            <div>
              <button style={{ color: '#111E6C', width: '300px' }} onClick={back}>Back</button>
            </div>
            <div>
              <button
                style={{
                  backgroundColor: '#111E6C',
                  color: '#FFFFFF',
                  width: '300px',
                }}
                onClick={() => setIsClicked(true)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </WrapperFooter>
    </>
  );
};

export default PlanForm;

const Wrapper = styled.div`
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
    button {
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      text-align: right;
      letter-spacing: -0.03em;
      color: #111e6c;
      background: #f2f2f2;
      border-radius: 10px;
      outline: none;
      border: none;
      padding: 10px 30px;
      margin-left: 140px;
      margin-top: 10px;
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
