import React, { useState, useEffect, createContext, useCallback } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ChoosePlanHolder from "../../../asset/chooseplaneHolder.png";
import { ProfileNavBar } from "../../dashboard/ProfileNavbar";
import { UncontrolledTooltip } from 'reactstrap';
import PlanPay from "./PlanPay";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getCurrIcon } from "../Accesssories";

export const PlanContext = createContext(null);

const PlanForm = () => {

  const navigate = useNavigate();

  const { singleProduct  } = useSelector((state) => state.product);
  const { exRates  } = useSelector((state) => state.plan);
  // const { currencies } = useSelector((state) => state.currencies);

  const productStatus = singleProduct?.statusCode
  const product = singleProduct?.data.body ? singleProduct?.data.body : {}
  const ex_rates = exRates?.data.body ? exRates?.data.body : []
  let date = new Date();
  const recentDate = moment(date).format("YYYY-MM-DD");

  const [isClicked, setIsClicked] = useState(false);
  const [confirmPeriodicPay, setConfirmperiodicPay] = useState(false);
  const [formData, setFormData] = useState({
    product: product.id,
    productCategory: product.productCategory?.id,
    planName: "",
    currency: "",
    exchangeRate: 0.00,
    amount: 0.00,
    targetAmount: 0.00,
    tenor: 1,
    planDate: recentDate,
    savingFrequency: "DAILY",
    weeklyContributionDay: "MONDAY",
    monthlyContributionDay: 1,
    interestReceiptOption: "",
    planStatus: "ACTIVE",
    contributionValue: 0.00,
    directDebit: false,
    interestRate: 1000.00,
    acceptPeriodicContribution: true,
    actualMaturityDate: "",
    autoRollOver: true,
    numberOfTickets: 0,
    autoRenew: false,
    dateCreated: recentDate,
    allowsLiquidation: true,
    planSummary: null,
    paymentMethod: "DEBIT_CARD"
  });

  const [summary, setSummary] = useState({
    planName: "",
    startDate: "",
    endDate: "",
    principal: 0.00,
    interestRate: formData.interestRate,
    interestReceiptOption: "DAILY",
    calculatedInterest: 0.00,
    withholdingTax: 1200.00,
    paymentMaturity: 2100.00
  });
  const [autoCompute, setAutoCompute] = useState(true);

  useEffect(() => {
    let selectedTenor = product?.tenors?.find(item => item.id === parseInt(formData.tenor))
    let endDate = moment(recentDate).add(selectedTenor?.tenorDays, 'days')?._d
    setFormData({
      ...formData,
      // amount: product.hasTargetAmount !== null ? null : formData.amount,
      product: product.id,
      productCategory: product.productCategory?.id,
      actualMaturityDate:moment(endDate).format("YYYY-MM-DD"),
      contributionValue: formData.contributionValue,
      planSummary: summary,
      directDebit: formData.directDebit === "true" || 
      formData.directDebit === true ? true : false,
      autoRenew: formData.autoRenew === "true" || 
      formData.autoRenew === true ? true : false,
      allowsLiquidation: formData.allowsLiquidation === "true" || 
      formData.allowsLiquidation === true ? true : false
    })
  },[isClicked])

  // function to get the auto computed contribution value
  const contribValue = () => {
    const selectedTenor = product.tenors?.filter(item => item.id === parseInt(formData.tenor))[0]
    if(autoCompute===true) {
      let computedValue;
      switch(formData.savingFrequency) {
        case "DAILY":
          computedValue = formData.targetAmount / selectedTenor?.tenorDays
          break;

        case "WEEKLY":
          computedValue = formData.targetAmount / (selectedTenor?.tenorWeeks)
          break;

        case "MONTHLY":
          computedValue = formData.targetAmount / selectedTenor?.tenorMonths
          break;
        
        default: break;
      }
      setFormData({
        ...formData,
        contributionValue: Number(parseFloat(computedValue).toFixed(2))
      })
    } else {
      let computedValue;
      switch(formData.savingFrequency) {
        case "DAILY":
          computedValue = formData.contributionValue * selectedTenor?.tenorDays
          break;

        case "WEEKLY":
          computedValue = formData.contributionValue * (selectedTenor?.tenorWeeks)
          break;

        case "MONTHLY":
          computedValue = formData.contributionValue * selectedTenor?.tenorMonths
          break;
        
        default: break;
      }
      setFormData({
        ...formData,
        targetAmount: Number(parseFloat(computedValue).toFixed(2))
      })
    }
  }


  useEffect(() => {
    const currency = ex_rates?.filter(item => item.id === formData.currency)[0]
    
    if(formData.currency === "NGN"){
      setFormData({
        ...formData,
        exchangeRate: 0
      })
    } else {
      setFormData({
        ...formData,
        exchangeRate: Number(parseFloat(currency?.sellingPrice).toFixed(2))
      })
    }

  }, [formData.currency])

  useEffect(() => {
    contribValue();
  }, [
    formData.savingFrequency, 
    formData.tenor, 
    formData.targetAmount, 
    formData.contributionValue
  ])

  // calculate simple interest
  const calculateSI = (principal, rate, time) => {
    const SI = (principal*rate*time) / 100
    return Number(parseFloat(SI).toFixed(2))
  }

  useEffect(() => {
    let selectedTenor = product?.tenors?.find(item => item.id === parseInt(formData.tenor))
    let endDate = moment(recentDate).add(selectedTenor?.tenorDays, 'days')?._d
    // calculate principal
    
    // }
    setSummary({
      ...summary,
      planName: formData.planName,
      startDate: formData.dateCreated,
      endDate: moment(endDate).format("YYYY-MM-DD"),
      principal: formData.targetAmount,
      // interestPaymentFrequency: formData.interestReceiptOption,
      interestReceiptOption: formData.interestReceiptOption,
      calculatedInterest: calculateSI(
          formData.targetAmount, 
          formData.interestRate,
          selectedTenor?.tenorDays
        ),
    });
  },[
    formData.planName,
    formData.savingFrequency,
    formData.tenor,
    formData.interestRate,
    formData.interestReceiptOption,
    formData.targetAmount,
    formData.amount
  ])

  useEffect(() => {
    let ticketNo;
    if (product?.properties?.allowsMonthlyDraw) {
      if(product?.properties?.hasTargetAmount !== null) {
        ticketNo = formData.targetAmount / product?.minTransactionLimit
      } else {
        ticketNo = formData.amount / product?.minTransactionLimit
      }
      setFormData({
        ...formData,
        numberOfTickets: Math.floor(ticketNo)
      })
    }
  }, [formData.amount])

  // function to match names with interest receipt options
  const labelIntRecOpt = useCallback((value) => {
    let label;
    switch(value) {
      case "hasUpfrontInterestRate":
        label = "UPFRONT";
        break

      case "hasMonthlyInterestRate":
        label = "MONTHLY";
        break;

      case "hasQuarterlyInterestRate":
        label = "QUARTERLY";
        break;

      case "hasBiAnnualInterestRate":
        label = "BI_ANNUAL";
        break;

      case "hasMaturityRate":
        label = "MATURITY";
        break;

      case "hasBackendUpfrontInterestRate":
        label = "BACKEND_UPFRONT";
        break;

      case "hasBackendMonthlyInterestRate":
        label = "BACKEND_MONTHLY";
        break;

      case "hasBackendQuarterlyInterestRate":
        label = "BACKEND_QUARTERLY";
        break;

      case "hasBackendBiAnnualInterestRate":
        label = "BACKEND_BI_ANNUAL";
        break;
      
      case "hasBackendMaturityRate":
        label = "BACKEND_MATURITY";
        break;
      default: break;
    }
    return label;
  }, [])

  if (isClicked && formData.planSummary !== null) {
    return (
      <PlanContext.Provider value={{form:formData, setForm:setFormData}} >
        <PlanPay goBack={() => setIsClicked(false)} />
      </PlanContext.Provider>
    );
  }

  const back = () => {
    navigate("/plan-product");
  };


  // function to get the minimum allowed target value for target amount
  const calculateMinAllowTargetVal = (targetValue) => {
    if(targetValue !== null) {
      if(formData.tenor !== "") {
        let selectedTenor = product?.tenors?.filter(item => item.id === parseInt(formData.tenor))[0]
        return product?.minTransactionLimit * selectedTenor?.tenorMonths
      }
    }
  }

  // function to calculate the minimum allowed contribution value
  const calculateMinContribVal = (contribVal) => {
    if(contribVal !== null) {
      if(formData.tenor !== "") {
        let selectedTenor = product?.tenors?.filter(item => item.id === parseInt(formData.tenor))[0]
        let minContrib;
        switch(formData.savingFrequency) {
          case "DAILY":
            minContrib = 
            (product?.minTransactionLimit * selectedTenor?.tenorMonths) / selectedTenor?.tenorDays
            break;

          case "WEEKLY":
            minContrib = 
            (product?.minTransactionLimit * selectedTenor?.tenorMonths) / (selectedTenor?.tenorDays/4)
            break;

          case "MONTHLY":
            minContrib = 
            (product?.minTransactionLimit * selectedTenor?.tenorMonths) / selectedTenor?.tenorMonths
            break;

          default: break;
        }
        return minContrib
      }
    }
  }

  // function to calculate the interest rate value
  const interestRateVal = () => {
    const selectedTenor = product?.tenors?.filter(item => item.id === parseInt(formData.tenor))[0]
    if(formData.targetAmount!==null) {
      const interestRate = selectedTenor?.tenorMonths * product?.minTransactionLimit
      setFormData({
        ...formData,
        interestRate: interestRate
      })
      return interestRate
    } else if(formData.targetAmount===null) {
      const interestRate = selectedTenor?.tenorMonths * formData.amount
      setFormData({
        ...formData,
        interestRate: interestRate
      })
      return interestRate
    }
  }

  // handle the toggle of auto computing the contribution value
  const handleContribBtn = () => {
    if(autoCompute) {
      setAutoCompute(false);
      setFormData({
        ...formData
      })
    } else {
      setAutoCompute(true);
    }
  }


  // handle changes on all inputs
  const handleChange = (e) => {
    console.log(formData)
    interestRateVal();
    if(e.target.type === "number") {
      setFormData({
        ...formData,
        [e.target.name]: Number(parseFloat(e.target.value).toFixed(2))
      })
    }else {
      if(e.target.name === "currency") {
        setFormData({
          ...formData,
          [e.target.name]: Number(e.target.value)
        })
      }
      else if(e.target.name === "tenor") {
        setFormData({
          ...formData,
          [e.target.name]: Number(e.target.value)
        })
      } else {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        })
      }
    }
  }


  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!(product?.properties?.hasSavingFrequency)) {
      setIsClicked(true);
    } else {
        if(confirmPeriodicPay) {
          setIsClicked(true);
        }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <ProfileNavBar>
        <NavTitle>
          <span className="fw-bold">Choose Plan</span>
        </NavTitle>
      </ProfileNavBar>
      {/*Interest receipt option UncontrolledTooltip */}
      <UncontrolledTooltip 
        placement="top" 
        target="intRecOpt" 
      >
        You have an option of choosing when to be paid your interest
      </UncontrolledTooltip>
      {/* Direct debit UncontrolledTooltip */}
      <UncontrolledTooltip 
        placement="top" 
        target="directDebit" 
      >
        The direct debit mandate automatically deducts your contribution value from
        your bank account at zero cost
      </UncontrolledTooltip>
      {/*Auto renew UncontrolledTooltip */}
      <UncontrolledTooltip 
        placement="top" 
        target="autoRenew" 
      >
        Allows for fund to be automatically rolled over at maturity
      </UncontrolledTooltip>
      <UncontrolledTooltip 
        placement="top" 
        target="allowLiquidation" 
      >
        Allows for you to withdraw before maturity
      </UncontrolledTooltip>
      <Wrapper>
        {
          productStatus === "OK" ? (
            <div className="choose-plan">
              <h5>{product.productName} </h5>
              <div className="d-flex align-items-center" style={{gap:16}} >
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
                    <p className="p-0 m-0 pb-2">
                      {" "}
                      {product.productDescription}
                    </p>
                    <p className="p-0 m-0 pb-2">
                      {" "}
                      {product.productDescription}
                    </p>
                    <p className="p-0 m-0 pb-2">
                      {" "}
                      {product.productDescription}
                    </p>
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
                <select
                  className="form-select form-select-md"
                  onChange={handleChange}
                  name="currency"
                  value={formData.currency}
                >
                  <option value="" disabled hidden selected >Select investment currency</option>
                  {
                    product?.currency?.map((item, id) => (
                      <option key={id} value={item.id} >{item.name} </option>
                    ))
                  }
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 ">
              <label>Exchange rate</label>
              <div className="input-group mb-4">
                <div className=" input-group-prepend curr-icon" >
                  {getCurrIcon(formData.currency)}
                </div>
                <input 
                  className={`form-control ${ formData.currency !== "" && "curr-input"}`}
                  name="exchangeRate"
                  placeholder="" 
                  disabled={formData.currency === "NGN"}
                  type="number" 
                  value={formData.exchangeRate}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-md-6">
              <label>Amount to be placed</label>
              <div className="input-group mb-4">
                <div className="input-group-prepend curr-icon" >
                  {getCurrIcon(formData.currency)}
                </div>
                <input 
                  className={`form-control ${ formData.currency !== "" && "curr-input"}`}
                  name="amount"
                  placeholder="" 
                  type="number" 
                  // disabled={product?.properties?.hasTargetAmount===null?false:true}
                  disabled={true}
                  value={formData.amount}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 mb-4">
              <label>Target amount</label>
              <div className="input-group">
                <div className="input-group-prepend curr-icon" >
                  {getCurrIcon(formData.currency)}
                </div>
                <input 
                  className={`form-control ${ formData.currency !== "" && "curr-input"}`}
                  name="targetAmount"
                  placeholder="" 
                  // disabled={product?.properties?.hasTargetAmount===null?true:false}
                  type="number" 
                  value={formData.targetAmount}
                  onChange={handleChange}
                />
              </div>
              {
                // (product?.properties?.hasTargetAmount !== null) &&
                (formData.targetAmount < calculateMinAllowTargetVal(formData.targetAmount)) ? (
                  <small className="helper-text" >
                    Target value cannot be below {product?.minTransactionLimit}
                  </small>
                ) : (<></>)
              }
            </div>
            <div className="col-md-6">
              <label>Tenor</label>
              <select 
                className="form-select form-select-md mb-3" 
                name="tenor" 
                onChange={handleChange}
                value={formData.tenor}
              >
                <option value="" disabled hidden selected >Select tenor</option>
                {
                  product?.tenors?.map(item => (
                    <option key={item.id} value={item.id} >{item.tenorName} </option>
                  ))
                }
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 ">
              <label>Savings frequency</label>
              <div
                className={`${formData.savingFrequency==="WEEKLY" ||
                formData.savingFrequency==="MONTHLY" ? "d-lg-flex" : ""}`}
                style={{gap: 14}}
              >
                <select 
                  className="form-select form-select-md mb-3" 
                  name="savingFrequency" 
                  onChange={handleChange}
                  value={formData.savingFrequency}
                >
                  <option value="" hidden disabled selected>Select savings frequency</option>
                  <option value="DAILY">
                    Daily
                  </option>
                  <option value="WEEKLY">Weekly</option>
                  <option value="MONTHLY">Monthly</option>
                </select>
                {
                  formData.savingFrequency === "WEEKLY" && (
                    <select 
                      className="form-select form-select-md option-select mb-3" 
                      name="weeklyContributionDay" 
                      onChange={handleChange}
                      value={formData.weeklyContributionDay}
                    >
                      <option value="" selected hidden disabled>Set weekly contribution day</option>
                      <option value="MONDAY">MONDAY</option>
                      <option value="TUESDAY">TUESDAY</option>
                      <option value="WEDNESDAY">WEDNESDAY</option>
                      <option value="THURSDAY">THURSDAY</option>
                      <option value="FRIDAY">FRIDAY</option>
                      <option value="SATURDAY">SATURDAY</option>
                      <option value="SUNDAY">SUNDAY</option>
                    </select>
                  )
                }
                {
                  formData.savingFrequency === "MONTHLY" && (
                    <select 
                      className="form-select form-select-md option-select mb-3" 
                      name="monthlyContributionDay" 
                      onChange={handleChange}
                      value={formData.monthlyContributionDay}
                    >
                      <option value="" selected hidden disabled>Set monthly contribution day</option>
                      {
                        [...Array(28).keys()].map(item => (
                          <option key={item+1} value={item+1}>{item+1} </option>
                        ))
                      }
                    </select>
                  )
                }
              </div>
            </div>
            <div className="col-md-6">
              <label>Interest Reciept Option</label>
              <div className="input-group mb-4">
                <select 
                  className="form-select form-select-md mb-3" 
                  name="interestReceiptOption" 
                  onChange={handleChange}
                  id="intRecOpt"
                  value={formData.interestReceiptOption}
                >
                  <option value="" disabled hidden selected >Select interest receipt option</option>
                  {
                    productStatus==="OK" && Object.entries(product?.properties?.interestOptions).map(([key, value]) =>
                      value === true && (
                        <option key={key} value={labelIntRecOpt(key)} >
                          {labelIntRecOpt(key)}
                        </option>
                      )
                    )
                  }
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 ">
              <div className="d-flex justify-content-between align-items-center" >
                <label>Contribution value</label>
                <button
                  className={`btn btn-sm ${autoCompute ? "btn-light" : "btn-info"}`}
                  onClick={handleContribBtn}
                  // disabled={product?.properties?.hasTargetAmount===null?true:false}
                  type="button"
                >
                  AutoCompute
                </button>
              </div>
              <div className="input-group mb-4">
                <input 
                  className="form-control" 
                  name="contributionValue"
                  placeholder="" 
                  type="number" 
                  value={formData.contributionValue}
                  onChange={!autoCompute ? handleChange : ()=>{}}
                  disabled={autoCompute}
                />
              </div>
              {
                product?.properties?.hasSavingFrequency && (
                  <div className=" d-flex align-content-center" style={{gap:8}} >
                    <label className="helper-text" >Kindly confirm periodic payment</label>
                    <input 
                      type="checkbox"
                      style={{width:14, height:14, marginTop:4, cursor:"pointer"}}
                      name="confirmPeriodicPay"
                      value={confirmPeriodicPay}
                      checked={confirmPeriodicPay}
                      onChange={() => setConfirmperiodicPay(!confirmPeriodicPay)}
                    />
                  </div>
                )
              }
              {
                (formData.contributionValue < calculateMinContribVal(formData.contributionValue) 
                && product?.properties?.hasTargetAmount!==null) ? (
                  <small>
                    Target value cannot be below {product?.minTransactionLimit}
                  </small>
                ) : (<></>)
              }
            </div>
            <div className="col-md-6">
              <label>Direct Debit</label>
              <div className="input-group mb-4">
                <select
                  className="form-select form-select-md"
                  placeholder="Setup Direct Debit"
                  onChange={handleChange}
                  name="directDebit"
                  id="directDebit"
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
                  // onChange={handleChange}
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
                  disabled={true}
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
                  className="form-select form-select-md" 
                  placeholder=""
                  name="autoRenew"
                  onChange={handleChange}
                  id="autoRenew"
                  value={formData.autoRenew}
                >
                  <option value="" disabled hidden selected >Setup an option</option>
                  <option value={true} >Yes</option>
                  <option value={false} >No</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <label>Allow liquidation</label>
              <div className="input-group mb-4">
                <select 
                  className="form-select form-select-md" 
                  placeholder=""
                  name="allowsLiquidation"
                  id="allowLiquidation"
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

  select {
    height: 54px;
  }
  .curr-icon {
    position: absolute;
    margin-top: 17px;
    margin-left: 20px;
    z-index: 10;
  }
  .curr-input {
    padding-left: 34px;
  }
  .helper-text {
    font-size: 11px;
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
  .option-select {
    width: 35%
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
