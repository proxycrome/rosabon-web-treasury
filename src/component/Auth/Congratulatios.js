import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Confetti from "../../asset/confetti-cake.png";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Congratulatios(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const auth = useSelector((state) => state.auth);
  const { email } = auth;

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <Wrapper>
      <div className="d-flex justify-content-center align-items-center">
        <WrappCongrate>
          <div className="container text-center">
            <div className="row">
              <div className="col congrate_body">
                <div>
                  {location.state === "success_signup" ? (
                    <>
                      <img
                        className="congrate_confet"
                        src={Confetti}
                        alt="Confetti"
                      />
                    </>
                  ) : (
                    <>
                      <img
                        className="congrate_confet"
                        src={Confetti}
                        alt="Confetti"
                      />
                    </>
                  )}
                </div>
                <h4>Congratulations! </h4>
                {location.state === "success_signup" ? (
                  <>
                    <p className="">
                      Your account was created successfully. Please take a
                      moment to verify your <br /> email address. We sent an
                      email with a verification link to {email} <br />
                      if you did not receive this in your inbox, please check
                      your spam folder.
                    </p>
                  </>
                ) : location.state === "forgotpassword" ? (
                  <>
                    <p>Password reset link has been sent to {email} </p>
                  </>
                ) : (
                  <></>
                )}

                <Link to="/login">
                  <button
                    className="verify_congrates_btn"
                    onClick={handleClick}
                  >
                    Ok
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </WrappCongrate>
      </div>
    </Wrapper>
  );
}

export default Congratulatios;

const Wrapper = styled.div`
  padding-top: 7%;
`;

const WrappCongrate = styled.div`
  @media (max-width: 800px) {
    width: 80%;
  }
  width: 60%;
  height: 450px;
  background: #ffffff;
  justify-content: center;
  display: flex;
  align-items: center;
  box-shadow: 0px 4px 40px rgba(225, 234, 254, 0.62);
  .congrate_eclips {
    position: relative;
    top: -10px;
    right: 35px;
  }
  h4 {
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 150%;
    text-align: center;
    letter-spacing: -0.15px;
    text-transform: capitalize;
    color: #242424;
    padding-top: 9px;
  }
  p {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    text-align: center;
    letter-spacing: -0.15px;
    color: #4f4f4f;
    padding-top: 9px;
    padding-bottom: 20px;
  }
  .verify_congrates_btn {
    background: #111e6c;
    color: #f2f2f2;
    border-radius: 10px;
    padding: 8px 80px;
  }
`;
