import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import ChoosePlanHolder from "../../../asset/chooseplaneHolder.png";
import { ProfileNavBar } from "../../dashboard/ProfileNavbar";
import PlanPay from "./PlanPay";
import { useNavigate } from "react-router-dom";
import { createPlan } from "../../../redux/actions/plan/planAction";

const initialState = {
  planName: "",
  currency: "",
  exchangeRate: null,
  amount: null,
  targetAmount: null,
  tenorId: null,
  savingFrequency: "DAILY",
  interestReceiptOption: null,
  contributionValue: null,
  directDebit: true,
  interestRate: null,
  numberOfTickets: null,
  autoRenew: true,
  allowsLiquidation: true
}

const PlanForm = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [formData, setFormData] = useState({
    planName: "",
    currency: "",
    exchangeRate: null,
    amount: null,
    targetAmount: null,
    tenorId: null,
    savingFrequency: "DAILY",
    interestReceiptOption: null,
    contributionValue: null,
    directDebit: true,
    interestRate: null,
    numberOfTickets: null,
    autoRenew: true,
    allowsLiquidation: true
  })
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { singleProduct  } = useSelector((state) => state.product)
  const { newPlan  } = useSelector((state) => state.plan)
  const productStatus = singleProduct?.statusCode
  const product = singleProduct?.data.body ? singleProduct?.data.body : {}


  if (isClicked) {
    return <PlanPay goBack={() => setIsClicked(false)} />;
  }

  const back = () => {
    navigate("/plan-product");
  };

  const handleChange = (e) => {
    if(e.target.type === "number") {
      setFormData({
        ...formData,
        [e.target.name]: parseInt(e.target.value)
      })
    }else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const objData = {
      ...formData,
      productId: product.id
    }
    dispatch(createPlan(objData))
    if(newPlan) { 
      setIsClicked(true);
      // setFormData(initialState);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">Choose Plan</span>
        </NavTitle>
      </ProfileNavBar>
      <Wrapper>
        {
          productStatus === "OK" ? (
            <div className="choose-plan">
              <h5>{product.productName} </h5>
              <div className="d-flex align-items-center justify-content-between">
                <img
                  className="image-holder"
                  src={product.imgUrl === "" ? product.imgUrl : ChoosePlanHolder}
                  alt="ChoosePlanHolder"
                />
                <div>
                  <div>
                    {/* <p className="p-0 m-0 pb-2">
                      Lorem Ipsum is simply dummy text of the{" "}
                    </p>
                    <p className="p-0 m-0 pb-2">
                      {" "}
                      printing and typesetting industry.
                    </p>
                    <p className="p-0 m-0 pb-2">
                      Lorem Ipsum is simply dummy text of the{" "}
                    </p> */}
                    <p>{product.productDescription} </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (<></>)
        }

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
                  name="planName"
                  placeholder="Enter a plan name"
                  type="text"
                  value={formData.planName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label>Currency</label>
              <div className="input-group mb-4">
                <input
                  className="form-control"
                  name="currency"
                  placeholder="Select investment currency"
                  type="text"
                  value={formData.currency}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 ">
              <label>Exchange rate</label>
              <div className="input-group mb-4">
                <input 
                  className="form-control" 
                  name="exchangeRate"
                  placeholder="" 
                  type="number" 
                  value={formData.exchangeRate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label>Amount to be placed</label>
              <div className="input-group mb-4">
                <input 
                  className="form-control" 
                  name="amount"
                  placeholder="" 
                  type="number" 
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 ">
              <label>Target amount</label>
              <div className="input-group mb-4">
                <input 
                  className="form-control" 
                  name="targetAmount"
                  placeholder="" 
                  type="number" 
                  value={formData.targetAmount}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label>Tenor</label>
              <div className="input-group mb-4">
                <input 
                  className="form-control"
                  name="tenorId" 
                  placeholder="" 
                  type="number" 
                  value={formData.tenorId}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 ">
              <label>Savings frequency</label>
              <select 
                className="form-select form-select-lg mb-3" 
                name="savingFrequency" 
                onChange={handleChange}
                value={formData.savingFrequency}
              >
                <option value="DAILY">
                  Daily
                </option>
                <option value="WEEKLY">Weekly</option>
                <option value="MONTHLY">Monthly</option>
              </select>
            </div>
            <div className="col-md-6">
              <label>Interest Reciept Option</label>
              <div className="input-group mb-4">
                <input 
                  className="form-control" 
                  name="interestReceiptOption"
                  placeholder="" 
                  type="number" 
                  value={formData.interestReceiptOption}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 ">
              <label>Contribution value</label>
              <div className="input-group mb-4">
                <input 
                  className="form-control" 
                  name="contributionValue"
                  placeholder="" 
                  type="number" 
                  value={formData.contributionValue}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label>Direct Debit</label>
              <div className="input-group mb-4">
                <select
                  className="form-select form-select-lg"
                  placeholder="Setup Direct Debit"
                  onChange={handleChange}
                  name="directDebit"
                  value={formData.directDebit}
                >
                  <option value={true} selected >Yes</option>
                  <option value={false} >No</option>
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 ">
              <label>Calculate interest rate</label>
              <div className="input-group mb-4">
                <input 
                  className="form-control" 
                  name="interestRate"
                  placeholder="" 
                  type="number" 
                  value={formData.interestRate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label>Number of tickets</label>
              <div className="input-group mb-4">
                <input 
                  className="form-control" 
                  name="numberOfTickets"
                  placeholder="" 
                  type="number"
                  value={formData.numberOfTickets} 
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 ">
              <label>Auto renew</label>
              <div className="input-group mb-4">
                <select 
                  className="form-select form-select-lg" 
                  placeholder=""
                  name="autoRenew"
                  onChange={handleChange}
                  value={formData.autoRenew}
                >
                  <option value={true} >Yes</option>
                  <option value={false} >No</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <label>Allow liquidation</label>
              <div className="input-group mb-4">
                <select 
                  className="form-select form-select-lg" 
                  placeholder=""
                  name="allowsLiquidation"
                  onChange={handleChange}
                  value={formData.allowsLiquidation}
                >
                  <option value={true} >Yes</option>
                  <option value={false} >No</option>
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
              <button
                style={{ color: "#111E6C", width: "300px" }}
                onClick={back}>
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
                type="submit"
                // onClick={() => setIsClicked(true)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </WrapperFooter>
    </form>
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
      font-family: "Montserrat";
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
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance: textfield;
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
