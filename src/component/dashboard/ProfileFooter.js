import React, { useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";

const Footer = ({ position, active, single, double }) => {
  const footerStylin = position == "bank" ? "bank" : "profile";

  return (
    <WrapperFooter>
      <div className={footerStylin}>
        <div className="footer-body">
          <>
            <div className="justify-content-around d-flex align-items-center footer-content">
              <NavLink to="/register-user">
                <button class="">Register as an Invididual</button>
              </NavLink>
              <NavLink to="/register-company">
                <button class="">Register as a Coporate</button>
              </NavLink>
            </div>
          </>
        </div>
      </div>
    </WrapperFooter>
  );
};

export default Footer;

const WrapperFooter = styled.div`
  @media (min-width: 900px) {
    display: none;
  }
  @media (max-width: 400px) {
    .footer-content {
      display: block !important;
    }
    .footer-body {
      padding-left: 25%;
    }
    button{
      margin: 10px 0;
    }
  }
  .active {
    button {
      background: #f2f2f2 !important;
      color: #828282;
    }
  }
  .bank {
    width: 100%;
    height: 104px;
    background: #ffffff;
    box-shadow: 8px 0px 18px rgba(173, 173, 173, 0.25);
  }
  button {
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 22px;
    letter-spacing: -0.04em;
    padding: 10px 20px;
    border: 1px solid #ffffff;
    border-radius: 10px;
    margin-right: 20px;
    background: #111e6c;
    color: #f2f2f2;
  }

  /* button {
    width: 200px;
    height: 44px;
    background: #f2f2f2;
    border-radius: 10px;
    outline: none;
    border: none;
  } */
`;
