import React, { Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import RFSLogo from "../../asset/RFS-Logo.png";
import SpiralImage from "../../asset/spiral-image.png";
import styled from "styled-components";
import { set_signup } from "../../redux/actions/auth/SignupAction";

const LoginLeftView = ({ signup }) => {
  const count = useSelector((state) => state.auth.signup_btn);
  const dispatch = useDispatch();
  let indiv_btn;
  let cop_btn;
  if (count) {
    indiv_btn = "grey-button";
    cop_btn = "blue_login_btn";
  } else {
    indiv_btn = "blue_login_btn";
    cop_btn = "grey-button";
  }
  console.log(signup)
  return (
    // <div className="">
      <Wrapper>
        <div className="wrapper_content">
          <img src={RFSLogo} alt="RFSLogo" />
          <div className="login_banner_body">
            <div>
              {signup ? (
                <>
                  <h1 className="text-white">
                    All Investment <br /> instruments in <br /> one place!
                  </h1>
                  <p className="lead text-white">
                    Lorem ipsum dolor sit amet, <br /> consectetur adipiscing
                    elit
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-white">
                    Catch smart <br /> investments for <br /> start-ups
                  </h1>
                  <p className="lead text-white">
                    Lorem ipsum dolor sit amet, <br /> consectetur adipiscing
                    elit
                  </p>
                </>
              )}

              <img className="spiral" src={SpiralImage} alt="RFSLogo" />
              <div className="d-flex">
                {signup ? (
                  <>
                    <button
                      onClick={(e) => {
                        e.preventDefault(e);
                        dispatch(set_signup(true));
                      }}
                      type="button"
                      class={" continue_login_btn " + indiv_btn}>
                      Register as an Invididual
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault(e);
                        dispatch(set_signup(false));
                      }}
                      type="button"
                      class={"mx-5 p-3 continue_login_btn " + cop_btn}>
                      Register as a Coporate
                    </button>
                  </>
                ) : (
                  <button type="button" class="continue_login_btn">
                    Continue the Journey
                    <i class="fa-solid fa-arrow-right-long"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    // </div>
  );
};

export default LoginLeftView;

const Wrapper = styled.div`
  background: #111e6c;
  position: fixed;
  /* width: 100%; */

  @media (max-width: 900px) {
    .spiral {
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
  .login_banner_body {
    justify-content: center;
    display: flex;
    align-items: center;
    padding-top: 80px;
    position: relative;

    img {
      position: absolute;
      top: 200px;
    }
    .continue_login_btn {
      margin-top: 230px;
      background: #ffffff;
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
  }
`;
