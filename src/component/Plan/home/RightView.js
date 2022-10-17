import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import halfEllipse from '../../../asset/halfEllipse.png'
import YelloBackgroud from '../../../asset/yello-backgroud.png'
import ChoosePlanHolder from '../../../asset/chooseplaneHolder.png'
import { ProfileNavBar } from '../../dashboard/ProfileNavbar'
import { Collapse } from 'reactstrap'
import { Link } from 'react-router-dom'

export const RightView = () => {
  const [openFixSavings, setFixSavingsOpen] = useState(false)
  const [openTargetSavings, setTargetSavingsOpen] = useState(false)
  const [openTargetIncome, setTargetIncomeOpen] = useState(false)

  return (
    <RightWrapper className="border-end border-light">
      <div className="naira-card position-relative">
        <div className="naira-card-content">
          <img
            className="position-absolute eclips-image image-fluid"
            src={halfEllipse}
            alt="halfEllipse"
          />
          {/* <img
            className="position-absolute set-yellow-background eclips-image image-fluid"
            src={YelloBackgroud}
            alt="YelloBackgroud"
          /> */}
          <div className="d-flex align-center justify-content-between ">
            <p className="p-0 m-0">Total Networth</p>
            <div className="sqr-box">
              <p className="p-0 m-0">₦</p>
            </div>
          </div>
          <h3 className="pt-1 pb-3">₦ 1,500,346.00</h3>
          <div className="down-button pt-4">
            <div className="d-flex justify-content-between">
              <div className="d-flex  align-items-center justify-content-between active-box">
                <div className="sqr-box">
                  <p className="p-0 m-0">05</p>
                </div>
                <p className="p-0 m-0">Active Plans</p>
              </div>
              <Link to="/plan-product">
                <button className="dashboard">
                  <span className="pr-3">+</span>Add Plan
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="grey-background"></div>
        <div className="yellow-background"></div>
      </div>
      <div className="home-body">
        <div className="">
          <h5 className="mb-2 fw-bold">Categories</h5>
          <div className="shadow-sm p-3 mb-2 rounded">
            <div
              className="d-flex align-items-center justify-content-between savins-drop "
              onClick={() => setFixSavingsOpen(!openFixSavings)}
            >
              <h6 className="mb-1">Fix Savings </h6>
              <div>
                {openFixSavings ? (
                  <i className="fa-solid fa-chevron-up"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down"></i>
                )}
              </div>
            </div>
            <span className="text-muted">Choose from a fixed savings plan</span>
          </div>
          <Collapse isOpen={openFixSavings} className="border rounded p-4 mb-2">
            <div className="choose-plan shadow-sm mb-2">
              <div className="row">
                <div className="d-none d-sm-block col-sm-3">
                  <img
                    className=""
                    src={ChoosePlanHolder}
                    alt="ChoosePlanHolder"
                  />
                </div>
                <div className="col-sm-9">
                  <h5>Product 1</h5>
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
              <div className="row">
                <div className="d-none d-sm-block col-sm-3"></div>
                <div className="col-sm-9">
                  <Link to="/create-plan">
                    <button>Create Plan</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="choose-plan shadow-sm mb-2">
              <div className="d-flex align-items-center justify-content-around">
                <img
                  className=""
                  src={ChoosePlanHolder}
                  alt="ChoosePlanHolder"
                />
                <div>
                  <h5>Product 1</h5>
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
              <div className="d-flex align-items-center justify-content-around">
                <div></div>
                <Link to="/create-plan">
                  <button>Create Plan</button>
                </Link>
              </div>
            </div>
          </Collapse>

          <div className="shadow-sm p-3 mb-2 rounded">
            <div
              className="d-flex align-items-center justify-content-between savins-drop"
              onClick={() => setTargetSavingsOpen(!openTargetSavings)}
            >
              <h6 className="mb-1">Target Savings</h6>
              <div>
                {openTargetSavings ? (
                  <i className="fa-solid fa-chevron-up"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down"></i>
                )}
              </div>
            </div>
            <span className="text-muted">Choose from a fixed savings plan</span>
          </div>
          <Collapse
            isOpen={openTargetSavings}
            className="border rounded p-4 mb-2"
          >
            <div className="choose-plan shadow-sm mb-2">
              <div className="row">
                <div className="d-none d-sm-block col-sm-3">
                  <img
                    className=""
                    src={ChoosePlanHolder}
                    alt="ChoosePlanHolder"
                  />
                </div>
                <div className="col-sm-9">
                  <h5>Product 1</h5>
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
              <div className="row">
                <div className="d-none d-sm-block col-sm-3"></div>
                <div className="col-sm-9">
                  <Link to="/create-plan">
                    <button>Create Plan</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="choose-plan shadow-sm mb-2">
              <div className="d-flex align-items-center justify-content-around">
                <img
                  className=""
                  src={ChoosePlanHolder}
                  alt="ChoosePlanHolder"
                />
                <div>
                  <h5>Product 1</h5>
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
              <div className="d-flex align-items-center justify-content-around">
                <div></div>
                <Link to="/create-plan">
                  <button>Create Plan</button>
                </Link>
              </div>
            </div>
          </Collapse>
          <div className="shadow-sm p-3 mb-2 rounded">
            <div
              className="d-flex align-items-center justify-content-between savins-drop"
              onClick={() => setTargetIncomeOpen(!openTargetIncome)}
            >
              <h6 className="mb-1 card-title">Target Income</h6>
              <div>
                {openTargetIncome ? (
                  <i className="fa-solid fa-chevron-up"></i>
                ) : (
                  <i className="fa-solid fa-chevron-down"></i>
                )}
              </div>
            </div>
            <span className="text-muted">Choose from a fixed savings plan</span>
          </div>
          <Collapse
            isOpen={openTargetIncome}
            className="border rounded p-4 mb-2"
          >
            <div className="choose-plan shadow-sm mb-2">
              <div className="row">
                <div className="d-none d-sm-block col-sm-3">
                  <img
                    className=""
                    src={ChoosePlanHolder}
                    alt="ChoosePlanHolder"
                  />
                </div>
                <div className="col-sm-9">
                  <h5>Product 1</h5>
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
              <div className="row">
                <div className="d-none d-sm-block col-sm-3"></div>
                <div className="col-sm-9">
                  <Link to="/create-plan">
                    <button>Create Plan</button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="choose-plan shadow-sm mb-2">
              <div className="d-flex align-items-center justify-content-around">
                <img
                  className=""
                  src={ChoosePlanHolder}
                  alt="ChoosePlanHolder"
                />
                <div>
                  <h5>Product 1</h5>
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
              <div className="d-flex align-items-center justify-content-around">
                <div></div>
                <Link to="/create-plan">
                  <button>Create Plan</button>
                </Link>
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    </RightWrapper>
  )
}

const RightWrapper = styled.div`
  @media (min-width: 900px) {
    padding: 50px;
  }

  .grey-background {
    position: absolute;
    bottom: 14px;
    right: 1.5%;
    width: 97.3%;
    height: 186px;
    background: #f2f2f2;
    box-shadow: 0px 4px 18px rgba(196, 204, 221, 0.25);
    border-radius: 20px;
    z-index: -2;
  }

  .yellow-background {
    position: absolute;
    right: 6.5%;
    bottom: 0;
    width: 88.7%;
    height: 170px;
    background: #f3a712;
    box-shadow: 0px 4px 18px rgba(196, 204, 221, 0.25);
    border-radius: 20px;
    z-index: -5;
  }

  .para_header {
    color: danger;
  }
  @media (max-width: 899px) {
    padding-top: 50px;
    width: 90% !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    .naira-card {
      width: 100% !important;
      margin: 0 auto;
    }
  }
  
  .naira-card-content {
    width: 100% !important;
    height: 192px;
    position: absolute;
    top: 0;
    background: #ffffff;
    box-shadow: 0px 6px 18px rgba(196, 204, 221, 0.25);
    border-radius: 20px;
    padding: 20px;
  }
  .home-body {
    padding-top: 100px;
    width: 100%;
  }
  .blue-add-btn {
    background: #111e6c !important;
    border-radius: 10px !important;

    p {
      color: #ffffff !important;
    }
  }
  .naira-card {
    width: 513px;
    height: 221px;
  }
  .eclips-image {
    top: 0;
    right: 0;
  }
  .sqr-box {
    margin-right: 20px;
    width: 35px;
    height: 35px;
    background: #ffffff;
    box-shadow: 0px 4px 10px rgba(148, 148, 148, 0.25);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }
  .active-box {
    padding: 0.3em 0.8em;
    background: #f2f2f2;
    border-radius: 10px;

    p {
      font-weight: 500;
      font-size: 13px;
      line-height: 150%;
      text-align: center;
      letter-spacing: -1px;
      color: #333333;
    }
  }
  .add-plan {
    padding: 5px 50px;
    background: #111e6c;
    border-radius: 10px;
    color: #ffffff;
  }
  .down-button {
    button {
      font-weight: 500;
      font-size: 11px;
      text-align: center;
      color: #ffffff;
      background: #111e6c;
      border-radius: 10px;
      outline: none;
      border: none;
      padding: 0px 30px;
    }
  }
  .choose-plan {
    width: 90%;
    height: auto;
    background: #ffffff;
    box-shadow: 0px 4px 30px rgba(196, 204, 221, 0.28);
    border-radius: 8px;
    padding: 20px 10px;
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
      /* margin-left: 140px; */
      margin-top: 10px;
    }
  }
  .dashboard {
    padding: 12px 15px !important;
    background: #111e6c;
    border-radius: 8px;
    color: #ffffff;
    span {
      padding-right: 3px;
      font-size: 11px;
    }
  }
`
