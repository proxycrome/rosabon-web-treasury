import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { Collapse, Input } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  getCatWithProducts,
  getInvestmentRates,
  getWithholdingTax,
  getAuthUsers,
  getNotification,
  readAllNotifications,
} from "../../../store/actions";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { paymentAtMaturity } from "../Accesssories";
import Copy from "../../../asset/copy-2.png";
import Note from "../../../asset/NotifyIcon.png";
import toast from "react-hot-toast";

export const LeftView = ({ view }) => {
  const dispatch = useDispatch();
  const [isView, setIsView] = useState(false);
  const [open, setOpen] = useState(false);
  const [touched, setTouched] = useState(false)
  const [data, setData] = useState({
    product: 0,
    amount: "",
    tenor: 0,
  });
  const [result, setResult] = useState();
  const { notifications } = useSelector((state) => state.notification);
  const { users } = useSelector((state) => state.user_profile);
  const { products } = useSelector((state) => state.product);
  const { investment_rates, withholding_tax } = useSelector(
    (state) => state.plan
  );

  const productList = products?.data?.body;
  const productStatus = products?.statusCode;
  const withhold_tax = withholding_tax?.data.body
    ? withholding_tax?.data.body
    : [];
  const inv_rates = useMemo(() => investment_rates?.data.body
    ? investment_rates?.data.body
    : [], [investment_rates]);
  // const auth = useSelector((state) => state.auth);
  // const { login, isLoggedIn } = auth;
  const activeProductList = productList?.filter(
    (item) => item.status === "ACTIVE"
  );


  // fetch interest rate
  const interest_rate = useMemo(() => {
    let rate = inv_rates?.find((item) => {
      return (
        item.product.id === data.product &&
        data.amount >= item.minimumAmount &&
        data.amount <= item.maximumAmount
      );
    });
    if (rate !== undefined) {
      if (rate?.maturityRate === null) {
        return 1;
      } else {
        return rate?.maturityRate;
      }
    } else {
      return 1;
    }
  }, [data.product, data.amount, inv_rates]);

  useEffect(() => {
    view(isView);
  }, [isView]);

  const calculateSI = (principal, rate, time) => {
    const SI =
      (principal * rate * (((time / 365) * 100 + Number.EPSILON) / 100)) / 100;
    return Math.round(SI * 100 + Number.EPSILON) / 100;
    // return Number((SI * 100 + Number.EPSILON) / 100).toFixed(2)
  };

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCatWithProducts());
    dispatch(getInvestmentRates());
    dispatch(getWithholdingTax());
    dispatch(getAuthUsers());
    dispatch(getNotification());
  }, [dispatch]);

  // useEffect(() => {},[data.tenor])
  useEffect(() => {
    setData({
      ...data,
      tenor: 0,
    });
  }, [data.product]);

  const tenors = useMemo(() => {
    if (productStatus === "OK") {
      let tenorList = activeProductList.find(
        (item) => item.id === data.product
      )?.tenors;
      return tenorList;
    }
  }, [data.product]);

  const maxTransaction = activeProductList?.find(
    item => item.id===data.product
    )?.maxTransactionLimit

    const minTransaction = activeProductList?.find(
      item => item.id===data.product
      )?.minTransactionLimit

  const handleChange = (e) => {
    if (e.target.name === "amount") {
      setData({
        ...data,
        [e.target.name]: Number(parseFloat(e.target.value).toFixed(2)),
      });
    } else {
      setData({
        ...data,
        [e.target.name]: Number(e.target.value),
      });
    }
  };

  const calculate = () => {
    setResult(
      paymentAtMaturity(
        "MATURITY",
        data.amount,
        null,
        0,
        calculateSI(data.amount, interest_rate, data.tenor)
      )
    );
  };

  const handleReadAll = async() => {
    await dispatch(readAllNotifications(setIsView, dispatch));
  };

  const copyReferralLink = () => {
    toast.success("Referral Link Copied");
  };

  const copyReferralCode = () => {
    toast.success("Referral Code Copied");
  };

  return (
    <LeftWrapper className="mx-4">
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
                  <select
                    className="form-control"
                    name="product"
                    value={data.product}
                    onChange={handleChange}
                  >
                    <option hidden value={0}>
                      Select Product
                    </option>
                    {productStatus === "OK" &&
                      activeProductList.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.productName}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="mb-2">
                <label>Enter Amount</label>
                <div className="input-group">
                  <Input
                    className="form-control"
                    name="amount"
                    value={data.amount}
                    onChange={handleChange}
                    type="number"
                    max={maxTransaction}
                    min={minTransaction}
                  />
                </div>
                {
                  (data.amount < minTransaction) ? (
                    <small className="disclaimer">
                      Value cannot be below {minTransaction}
                    </small>
                  ) : (data.amount > maxTransaction) ? (
                    <small className="disclaimer">
                      Value cannot be above {maxTransaction}
                    </small>
                  ) : null
                }
              </div>
            </div>
            <div className="row">
              <div className=" ">
                <label>Tenor</label>
                <div className="input-group mb-4">
                  <select
                    className="form-control"
                    name="tenor"
                    value={data.tenor}
                    onChange={handleChange}
                  >
                    <option hidden value={0}>
                      Select Tenor
                    </option>
                    {productStatus === "OK" &&
                      tenors
                        ?.filter((data) => data.tenorStatus === "ACTIVE")
                        ?.map((item) => (
                          <option key={item.id} value={item.tenorDays}>
                            {item.tenorName}
                          </option>
                        ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="text-center calc-mty">
              <button 
                onClick={calculate}
                disabled={data.amount>maxTransaction||data.amount<minTransaction}
                style={{opacity:(data.amount>maxTransaction||data.amount<minTransaction)&&"50%"}}
              >Calculate Amount at maturity</button>
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
            <div className="row">
              <p className="disclaimer">
                Please note that this is an estimate and final value is subject
                to withholding tax
              </p>
            </div>
          </Collapse>
        </div>
      </div>

      <div className="left-content-notify">
        {notifications?.filter((data) => data.readStatus === "UNREAD")?.length >
        0 ? (
          <>
            <div className="notification">
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="mb-2 fw-bold">Notifications</h5>
                <p
                  className="p-0 m-0"
                  style={{ cursor: "pointer" }}
                  onClick={handleReadAll}
                >
                  Mark all as read
                </p>
              </div>
            </div>

            <div>
              {notifications
                ?.filter((data) => data.readStatus === "UNREAD")
                ?.slice(0, 2)
                ?.map((data) => (
                  <div className="d-flex align-items-center mt-3" key={data.id}>
                    <div className="circle-notification p-2">
                      <img src={Note} alt="Note" width="25" />
                    </div>
                    <div>
                      <p className="p-0 m-0 para-header text-primary">
                        {data.message}
                      </p>
                      <p className="p-0 m-0 para-text">{data.dateSent}</p>
                    </div>
                  </div>
                ))}
            </div>
            <a href="#note" style={{ textDecoration: "none" }}>
              <p
                className="py-2"
                onClick={() => setIsView(!isView)}
                style={{ cursor: "pointer" }}
              >
                View all Notifications
              </p>
            </a>
          </>
        ) : null}

        <div>
          <div className="d-flex align-items-center justify-content-between mt-5">
            <h4>My Referral Link</h4>
            {/* <i className="fa-solid fa-key"></i> */}
          </div>
        </div>
        <div>
          <label>Referral Link</label>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              aria-label="Text input with checkbox"
              defaultValue={users?.referralLink}
            />
            <div className="input-group-text">
              <CopyToClipboard
                text={users?.referralLink}
                onCopy={copyReferralLink}
              >
                <img src={Copy} alt="copy" className="copy" />
              </CopyToClipboard>
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
              defaultValue={users?.myReferralCode}
            />
            <div className="input-group-text">
              <CopyToClipboard
                text={users?.myReferralCode}
                onCopy={copyReferralCode}
              >
                <img src={Copy} alt="copy" className="copy" />
              </CopyToClipboard>
            </div>
          </div>
        </div>
      </div>
    </LeftWrapper>
  );
};

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
    padding: 20px 20px;
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
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 171.5%;
    letter-spacing: -0.15px;
    color: #000000;
  }
  .para-text {
    font-family: "Montserrat";
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
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 20px;
    letter-spacing: -0.04em;
    color: #242424;
  }
  label {
    font-family: "Montserrat";
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
      font-family: "Montserrat";
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
  input[type="number"] {
    -moz-appearance: textfield;
  }
  .disclaimer {
    font-size: 10px;
    color: #828282;
  }

  .copy {
    cursor: pointer;
  }
`;
