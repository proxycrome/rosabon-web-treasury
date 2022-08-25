import React, { useState } from 'react';
import styled from 'styled-components';
import { FormGroup, Input } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { ProfileNavBar } from "../../../dashboard/ProfileNavbar";
import FullWithdrawal from './FullWithdrawal';
import PartWithdrawal from './PartWithdrawal';

const Withdrawal = () => {
  const [part, setPart] = useState('');
  const [full, setFull] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [reason, setReason] = useState("")
  const [otherReasons, setOtherReasons] = useState("")
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (e.target.value === 'part') {
      setPart('part');
      setFull('');
    }
    if (e.target.value === 'full') {
      setFull('full');
      setPart('');
    }
  };

  if (full && isClicked) {
    return (
      <FullWithdrawal
        goBack={() => {
          setFull('');
          setIsClicked(false);
        }}
      />
    );
  }

  if (part && isClicked) {
    return (
      <PartWithdrawal
        goBack={() => {
          setPart('');
          setIsClicked(false);
        }}
      />
    );
  }

  const back = () => {
    navigate('/plan-list');
  };

  return (
    <>
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">Plan</span>
        </NavTitle>
      </ProfileNavBar>
      <Wrapper>
        <LeftView>
          <h4 className="pb-3">Withdrawal</h4>
          <div className="plan-content">
            <div className="plan">
              <div className="plan-top h-50 p-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <h4>Plan 3</h4>
                    <p className="p-0 m-0">Product 1</p>
                  </div>
                  <h4 className="Active">Active</h4>
                </div>
                <div className="d-flex align-items-center justify-content-between pt-4">
                  <div>
                    <h4>Start date</h4>
                    <p className="p-0 m-0">24/06/2023</p>
                  </div>
                  <div>
                    <h4>End date</h4>
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
                    <h4>Balance</h4>
                    <p className="p-0 m-0">2,000,000</p>
                  </div>
                  {/* <i class="fa-solid fa-ellipsis"></i> */}
                </div>
              </div>
            </div>
          </div>
          
          <div className="plan-payment">
            <div>
              <div className="d-flex align-items-center justify-content-between my-5">
                <div className="d-flex align-items-center">
                  <p className="p-0 m-0">Partial Withdrawal</p>
                </div>
                <input
                  type="radio"
                  id="part"
                  name="rolloverType"
                  value="part"
                  onClick={handleClick}
                />
              </div>
            </div>
            <div>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center">
                  <p className="p-0 m-0">Full Withdrawal</p>
                </div>
                <input
                  type="radio"
                  id="full"
                  name="rolloverType"
                  value="full"
                  onClick={handleClick}
                />
              </div>
            </div>
            <div className="row my-4">
              <div class="col ">
                <label>Amount to Liquidate</label>
                <div class="input-group">
                  <input
                    class="form-control"
                    placeholder="₦ 0.00"
                    type="text"
                  />
                </div>
                <label>Balance is ₦2,500,000.00</label>
              </div>
            </div>
            <div className="row my-4">
              <div className="col ">
                <label>Reason for Withdrawal</label>
                <div className="input-group">
                  <select
                    className="form-select form-select-md"
                    aria-label=".form-select-md"
                    name="reason"
                    onChange={(e) => setReason(e.target.value)} 
                  >
                    <option>Select Reason for Withdrawal</option>
                    <option>Others</option>
                  </select>
                </div>
              </div>
            </div>
            {reason === "Others" ? (
              <div className="row my-4">
                <div className="col ">
                  <FormGroup className="form-group-custom mb-4">
                    <Input
                      name="otherReasons"
                      type="textarea"
                      rows={5}
                      value={otherReasons}
                      className="form-control"
                      onChange={(e) => setOtherReasons(e.target.value)}
                      id="otherReasons"
                      placeholder="Please provide reason for withdrawal"
                    />
                  </FormGroup>
                </div>
              </div>
            ) : null} 
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
                style={{ color: '#111E6C', width: '300px' }}
                onClick={back}
              >
                Back
              </button>
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

export default Withdrawal;

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
  .Active, .Pending, .Matured {
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: -0.01em;
  }
  .Active {
    color: #219653;
  }
  .Pending {
    color: #F2994A;
  }
  .Matured {
    color: #2D9CDB;
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