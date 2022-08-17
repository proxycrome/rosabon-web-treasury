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
          <div>
            <h1 className="text-white">
              Catch smart <br /> investments for <br /> start-ups
            </h1>
            <p className="lead text-white">
              Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit
            </p>

            <div className="spiral-content position-absolute">
              <img className="spiral" src={SpiralImage} alt="RFSLogo" />
            </div>
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
          <div>
            <h1 className="text-white">
              All Investment <br /> instruments in <br /> one place!
            </h1>
            <p className="lead text-white">
              Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit
            </p>

            <div className="spiral-content position-absolute">
              <img className="spiral" src={SpiralImage} alt="RFSLogo" />
            </div>
            <div>
              <div className="continue_login_btn">
                <NavLink to="/register-user">
                  <button class="">Register as an Invididual</button>
                </NavLink>
                <NavLink to="/register-company">
                  <button class="">Register as a Coporate</button>
                </NavLink>
              </div>
            </div>
          </div>
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
  }
  .login_banner_body {
    justify-content: center;
    display: flex;
    align-items: center;
    padding-top: 70px;
    position: relative;
    .spiral-content {
      width: 373px;
      height: 285px;
      top: 130px;
    }
    img {
      width: 100%;
      height: 100%;
    }
    .continue_login_btn {
      margin-top: 200px;
      border-radius: 10px;
      color: #111e6c;
      i {
        padding-left: 40px;
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
    .active {
      button {
        background: #f2f2f2 !important;
        color: #828282;
      }
    }
  }
`;
