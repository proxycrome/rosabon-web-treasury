import React, { useState, useEffect, useCallback, useMemo } from 'react'
import styled from 'styled-components';
import { Collapse, Input } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { 
  getProducts, 
  getCatWithProducts,
  getInvestmentRates,
  getWithholdingTax
} from '../../../store/actions';
import { paymentAtMaturity } from '../Accesssories';

export const LeftView = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    product: 0,
    amount: null,
    tenor: 0,
  });
  const [result, setResult] = useState();
  const { products  } = useSelector((state) => state.product);
  const { investment_rates,withholding_tax  } = useSelector((state) => state.plan);

  const productList = products?.data?.body;
  const productStatus = products?.statusCode;
  const withhold_tax = withholding_tax?.data.body ? withholding_tax?.data.body : []
  const inv_rates = investment_rates?.data.body ? investment_rates?.data.body: []
  // const auth = useSelector((state) => state.auth);
  // const { login, isLoggedIn } = auth;

  // fetch interest rate
  const interest_rate = useMemo(() => {
    let rate =  inv_rates?.find((
      item => { return (item.product.id === data.product) && 
      (data.amount >= item.minimumAmount) && (data.amount <= item.maximumAmount)}
    ))
    if(rate !== undefined) {
      return rate?.maturityRate
    } else {
      return 1;
    }
  }, [data.product])

  const calculateSI = (principal, rate, time) => {
    const SI = (principal*rate*(((time/365) * 100 + Number.EPSILON) / 100)) / 100
    return Number(parseFloat(SI).toFixed(2))
    // return Number((SI * 100 + Number.EPSILON) / 100).toFixed(2)
  }

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCatWithProducts());
    dispatch(getInvestmentRates());
    dispatch(getWithholdingTax());
  },[]);

  // useEffect(() => {},[data.tenor])
  useEffect(() => {
    setData({
      ...data,
      tenor: 0
    })
  },[data.product])

  const tenors = useMemo(() => {
    if(productStatus === "OK") {
      let tenorList = productList.find(item => item.id === data.product)?.tenors
      return tenorList
    }
  }, [data.product])

  const handleChange = (e) => {
    if(e.target.name === "amount") {
      setData({
        ...data,
        [e.target.name]: Number(parseFloat(e.target.value).toFixed(2))
      })
    } else {
      setData({
        ...data,
        [e.target.name]: Number(e.target.value)
      })
    }
  };

  const calculate = () => {
    setResult(
      paymentAtMaturity(
        "MATURITY",
        data.amount,
        withhold_tax[0]?.rate,
        0,
        calculateSI(
          data.amount, 
          interest_rate,
          data.tenor
        )
      )
    )
  }

  return (
    <LeftWrapper className="ms-4">
      <div className="calculatoe">
        <div className="interest shadow p-4 my-2">
          <div
            className="d-flex align-items-center justify-content-between"
            onClick={() => setOpen(!open)}
          >
            <h5 className="mb-0">Interest Calculator</h5>
            {open ? (
              <i className="fa-solid fa-chevron-up"></i>
            ) : (
              <i className="fa-solid fa-chevron-down"></i>
            )}
          </div>
          <Collapse isOpen={open}>
            <div className="row">
              <div className="mt-2">
                <label>Select Product</label>
                <div className="input-group mb-2">
                  <Input
                    className="form-control"
                    placeholder="Select Product"
                    type='select'
                    name="product"
                    value={data.product}
                    onChange={handleChange}
                  >
                    <option hidden selected disabled value={0} >Select Product</option>
                    {
                      productStatus === "OK" && productList.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.productName}
                        </option>
                      ))
                    }
                  </Input>
                </div>
              </div>
            </div>
            <div className="row">
              <div className=" ">
                <label>Enter Amount</label>
                <div className="input-group mb-2">
                  <Input
                    className="form-control"
                    name="amount"
                    value={data.amount}
                    onChange={handleChange}
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className=" ">
                <label>Tenor</label>
                <div className="input-group mb-4">
                  <Input
                    className="form-control"
                    type="select"
                    name="tenor"
                    value={data.tenor}
                    onChange={handleChange}
                  >
                    <option hidden value={0} disabled>Select Tenor</option>
                    {
                      productStatus === "OK" && tenors?.map(item => (
                        <option key={item.id} value={item.tenorDays} >
                          {item.tenorName}
                        </option>
                      ))
                    }
                  </Input>
                </div>
              </div>
            </div>
            <div className="text-center calc-mty">
              <button onClick={calculate} >
                Calculate Amount at maturity
              </button>
            </div>
            <div className="row pt-4">
              <div className=" ">
                <div className="input-group mb-4">
                  <input
                    className="form-control"
                    placeholder="N  0.00"
                    type="text"
                    value={result}
                  />
                </div>
              </div>
            </div>
          </Collapse>
        </div>
      </div>
      <div className="left-content-notify">
        <div className="notification">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="mb-2 fw-bold">Categories</h5>
            <p className="p-0 m-0">Mark all as read</p>
          </div>
        </div>
        <div>
          <div className="d-flex align-items-center mt-3">
            <div className="circle-notification p-2">
              <i className="fa-solid fa-key"></i>
            </div>
            <div>
              <p className="p-0 m-0 para-header">
                Dear Ekiyee, You have Initiated a top-up into your Plan titled
              </p>
              <p className="p-0 m-0 para-text">July 23, 2021 at 9:15 AM</p>
            </div>
          </div>
          <div className="d-flex align-items-center  mt-3">
            <div className="circle-notification p-2">
              <i className="fa-solid fa-key"></i>
            </div>
            <div>
              <p className="p-0 m-0 para-header">
                Dear Ekiyee, You have Initiated a top-up into your Plan titled
              </p>
              <p className="p-0 m-0 para-text">July 23, 2021 at 9:15 AM</p>
            </div>
          </div>
        </div>
        <p className="py-2">View all Notifications</p>
        <div>
          <div className="d-flex align-items-center justify-content-between mt-5">
            <h4>My Referral Link</h4>
            <i className="fa-solid fa-key"></i>
          </div>
        </div>
        <div>
          <label>Referral Link</label>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              aria-label="Text input with checkbox"
            />
            <div className="input-group-text">
              <i className="fa-solid fa-key"></i>
            </div>
          </div>
        </div>
        <div>
          <label>Referral Code</label>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              aria-label="Text input with checkbox"
            />
            <div className="input-group-text">
              <i className="fa-solid fa-key"></i>
            </div>
          </div>
        </div>
      </div>
    </LeftWrapper>
  )
}

const LeftWrapper = styled.div`
  .left-content-notify {
    padding-top: 2rem;
    padding-right: 2rem;
  }
  @media (max-width: 900px) {
    .left-content-notify {
      padding: 2rem 6rem 0;
    }
  }
  @media (max-width: 600px) {
    .left-content-notify {
      padding: 2rem 2rem 0;
    }
  }
  .calculatoe {
    background: rgba(28, 68, 141, 0.02);
    padding: 20px 40px;
    .interest {
      background: #ffffff;
      box-shadow: 0px 4px 10px rgba(196, 204, 221, 0.18);
      border-radius: 8px;
      cursor: pointer;
    }
  }
  .circle-notification {
    background: rgba(17, 30, 108, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  }
  .para-header {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 171.5%;
    letter-spacing: -0.15px;
    color: #000000;
  }
  .para-text {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 11px;
    line-height: 20px;
    display: flex;
    align-items: flex-end;
    text-align: center;
    letter-spacing: -0.02em;
    color: #4f4f4f;
  }
  h4 {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: -0.04em;
    color: #242424;
  }
  label {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    color: #828282;
  }
  .calc-mty {
    button {
      width: 100%;
      padding: 0.7rem;
      background: #f2f2f2;
      border-radius: 10px;
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: -0.03em;
      color: #111e6c;
    }
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {
    -moz-appearance: textfield;
  }
`
