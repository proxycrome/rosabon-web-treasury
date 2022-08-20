import React, { useState } from "react";
import styled from "styled-components";
import { Collapse } from "reactstrap";

export const LeftView = () => {
  const [open, setOpen] = useState(false);
  return (
    <LeftWrapper>
      <div className="calculatoe">
        <div className="interest">
          <div
            className="d-flex align-items-center justify-content-between"
            onClick={() => setOpen(!open)}>
            <h5>Interest Calculator</h5>
            {open ? (
              <i className="fa-solid fa-chevron-up"></i>
            ) : (
              <i className="fa-solid fa-chevron-down"></i>
            )}
          </div>
          <Collapse isOpen={open}>
            <div className="row">
              <div className=" ">
                <label>Select Product</label>
                <div className="input-group mb-4">
                  <input
                    className="form-control"
                    placeholder="Select Product"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className=" ">
                <label>Enter Amount</label>
                <div className="input-group mb-4">
                  <input
                    className="form-control"
                    placeholder="N  0.00"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className=" ">
                <label>Tenor</label>
                <div className="input-group mb-4">
                  <input
                    className="form-control"
                    placeholder="N  0.00"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="text-center calc-mty">
              <button>Calculate Amount at maturity</button>
            </div>
            <div className="row pt-4">
              <div className=" ">
                <div className="input-group mb-4">
                  <input
                    className="form-control"
                    placeholder="N  0.00"
                    type="text"
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
            <h5>Notifications</h5>
            <p className="p-0 m-0">Mark all as read</p>
          </div>
        </div>
        <div>
          <div className="d-flex align-items-center mt-5">
            <div className="circle-notification">
              <i className="fa-solid fa-key"></i>
            </div>
            <div>
              <p className="p-0 m-0 para-header">
                Dear Ekiyee, You have Initiated a top-up into your Plan titled
              </p>
              <p className="p-0 m-0 para-text">July 23, 2021 at 9:15 AM</p>
            </div>
          </div>
          <div className="d-flex align-items-center  mt-4">
            <div className="circle-notification">
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
        <p className="py-5 ">View all Notifications</p>
        <div>
          <div className="d-flex align-items-center justify-content-between">
            <h4>My Referral Link</h4>
            <i className="fa-solid fa-key"></i>
          </div>
        </div>
        <div>
          <label className="pt-3">Referral Link</label>
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
    padding: 20px 40px;
    .interest {
      background: #ffffff;
      box-shadow: 0px 4px 10px rgba(196, 204, 221, 0.18);
      border-radius: 8px;
      padding: 2rem;
    }
  }
  .circle-notification {
    width: 41px;
    height: 41px;
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
`;
