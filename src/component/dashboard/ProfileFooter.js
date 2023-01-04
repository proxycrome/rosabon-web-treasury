import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import RFSLogoFullColour from "../../asset/RFSLogoFullColour.png";

const Footer = ({ position, active, single, double, source, referralCode }) => {
  const footerStylin = position === "bank" ? "bank" : "profile";

  return (
    <WrapperFooter>
      <div className={footerStylin}>
        <div className="footer-body">
          <>
            <div className="rosabonLogo mb-3">
              <img
                style={{ width: "70px", height: "30px" }}
                src={RFSLogoFullColour}
                alt="RFSLogo"
              />
            </div>
            <div className="justify-content-around d-flex align-items-center footer-content">
              <NavLink
                to={`/register-user${
                  source && referralCode
                    ? `?referralCode=${referralCode}&source=${source}`
                    : ""
                }`}
              >
                <button className="">Register as an Invididual</button>
              </NavLink>
              <NavLink
                to={`/register-company${
                  source && referralCode
                    ? `?referralCode=${referralCode}&source=${source}`
                    : ""
                }`}
              >
                <button className="">Register as a Coporate</button>
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
  .footer-body{
    margin: 2rem;
  }
  @media (max-width: 450px) {
    .footer-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
    }
    

    button {
      margin: 10px 0;
    }
  }
  .active {
    button {
      background: #111e6c !important;
      color: #f2f2f2;
    }
  }
  .bank {
    width: 100%;
    height: 104px;
    background: #ffffff;
    box-shadow: 8px 0px 18px rgba(173, 173, 173, 0.25);
  }
  button {
    width: 200px;
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 22px;
    letter-spacing: -0.04em;
    padding: 10px 20px;
    border: 1px solid #ffffff;
    border-radius: 10px;
    margin-right: 20px;
    background: #f2f2f2
    color: #828282;
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
