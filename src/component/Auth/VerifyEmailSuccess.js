import React from "react";
import { Link } from "react-router-dom";
import Mail from "../../asset/mail.svg";
import styled from "styled-components";

const VerifyEmailSuccess = () => {
  return (
    <Wrapper>
      <div className="container">
        <div>
          <div className="verifyMsg">
            <div className="verifyIcon">
              <img src={Mail} alt="mail" className="icon" />
            </div>
            <div className="verifyText">
              <h2>Congratulations</h2>
              <p>Your email has been verified successfully</p>
            </div>
          </div>
          <div className="btnContain">
            <Link to="/" style={{ width: "100%" }}>
              <button className="verifyBtn">OK</button>
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default VerifyEmailSuccess;

const Wrapper = styled.div`
  @import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
  body {
    margin: 0;
    padding: 0;
    font-family: "Montserrat", sans-serif;
  }

  h2 {
    font-family: Montserrat;
    font-size: 27px;
    font-weight: 700;
    line-height: 41px;
    letter-spacing: -0.15000000596046448px;
    text-align: center;
    margin-bottom: 15px;
  }

  p {
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.15000000596046448px;
    text-align: center;
  }

  .container {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .verifyMsg {
    margin-bottom: 94px;
  }

  .verifyIcon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 63px;
  }

  .btnContain {
    display: flex;
    justify-content: center;
  }

  .verifyBtn {
    height: 54px;
    width: 328px;
    border-radius: 10px;
    background: #111e6c;
    border-radius: 10px;
    color: #ffffff;
    font-weight: 700;
    font-size: 18px;
    cursor: pointer;
  }

  @media (max-width: 700px) {
    h2 {
      font-size: 24px;
    }
    .container {
      height: auto;
      margin-top: 5rem;
      padding: 0 4rem;
    }
    .verifyMsg {
      margin-bottom: 24px;
    }

    .verifyIcon {
      margin-bottom: 32px;
    }

    .icon {
      width: 60px;
      height: 60px;
    }

    .verifyBtn {
      height: 50px;
      width: 100%;
      font-size: 16px;
    }
  }
`;
