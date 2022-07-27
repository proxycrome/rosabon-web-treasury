import React, { useState } from "react";
import styled from "styled-components";

const Footer = ({ position, active, single, double }) => {
  const footerStylin = position == "bank" ? "bank" : "profile";

  return (
    <WrapperFooter>
      <div className={footerStylin}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.3fr 1fr",
          }}>
          <div></div>
          <div
            style={{
              paddingTop: "30px",
              paddingRight: "70px",
            }}
            className="justify-content-between d-flex align-items-center">
            <button style={{ color: "#242424" }}>Back</button>
            <button style={{ color: "#F2F2F2", background: "#111E6C" }}>
              Save
            </button>
          </div>
        </div>
      </div>
    </WrapperFooter>
    
  );
};

export default Footer;

const WrapperFooter = styled.div`
  .bank {
    width: 100%;
    height: 104px;
    background: #ffffff;
    box-shadow: 8px 0px 18px rgba(173, 173, 173, 0.25);
  }

  button {
    width: 200px;
    height: 44px;
    background: #f2f2f2;
    border-radius: 10px;
    outline: none;
    border: none;
  }
`;
