import React, { Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import RFSLogo from "../../asset/RFS-Logo.png";
import SpiralImage from "../../asset/spiral-arrow.png";
import styled from "styled-components";

export const LoginLeftView = ({ signup }) => {
  return (
    <Wrapper>
      <div className="wrapper_content">
        <img src={RFSLogo} alt="RFSLogo" />
        <div className="login_banner_body">
            <h1 className="text-white">
              Catch smart <br /> investments for <br /> start-ups
            </h1>
            {/* <p className="lead text-white">
              Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit
            </p> */}

            <div className="spiral-content">
              <img className="spiral" src={SpiralImage} alt="RFSLogo" />
            </div>
        </div>
      </div>
    </Wrapper>
  );
};

export const SignupLeftView = () => {
  return (
    <Wrapper>
      <div className="wrapper_content">
        <img src={RFSLogo} alt="RFSLogo" />
        <div className="login_banner_body">
          {/* <div> */}
            <h1 className="text-white">
              All Investment <br /> instruments in <br /> one place!
            </h1>
            {/* <p className="lead text-white">
              Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit
            </p> */}

            <div className="spiral-content">
              <img className="spiral" src={SpiralImage} alt="RFSLogo" />
            </div>
            <div className="continue_login_btn">
              <div className="category-btn">
                <NavLink to="/register-user">
                  <button className="individual">Register as an Individual</button>
                </NavLink>
                <NavLink to="/register-company">
                  <button className="corporate">Register as a Corporate</button>
                </NavLink>
              </div>
            </div>
          {/* </div> */}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: #111e6c;
  height: 100vh;
  @media (max-width: 900px) {
    display: none;
  }
  @media (max-width: 1200px) {
    .spiral-content {
      display: none;
    }
    .category-btn{
      margin-top: -50px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }  
    .corporate{
      margin-top: 20px;
    }
  }
  .wrapper_content {
    padding: 2rem;
    & + img {
      width: 73px;
      height: 30px;
    }
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
    width: 248px;
    height: 54px;
  }
  .login_banner_body {
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;
    position: relative;
    .spiral-content {
      width: 373px;
      height: 285px;
      top: 80%;
      position: absolute;
    }

    h1{
      font-size: 52px;
    }
    img {
      width: 373px;
      height: 230px;
    }
    .continue_login_btn {
      margin-top: 220px;
      border-radius: 10px;
      position: absolute;
      top: 100%;
      .active {
        button {
          background: #f2f2f2 !important;
          color: #111E6C;
          font-weight: 600;
          font-size: 18px;
          line-height: 22px;
          letter-spacing: -0.04em;
        }
      }
      button {
        font-weight: 600;
        font-size: 18px;
        line-height: 22px;
        letter-spacing: -0.04em;
        color: #F2F2F2;
        background: #111E6C;
      }
    }
    .blue_login_btn {
      border: 1px solid #ffffff;
      background: #111e6c;
      color: #f2f2f2;
    }
    .grey-button {
      background: #f2f2f2;
      color: #828282;
    }
    
  }
`;
