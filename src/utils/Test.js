import React from "react";
import styled from "styled-components";
import Vector from "../asset/Vector.png";

function Test() {
  return (
    <Wrapper>
      <div>
        <div className="top-image">
          <img src={Vector} alt="User" />
        </div>
        <div className="sign-up">
          <h4>Sign Up</h4>
        </div>
        <div className="input-content">
          <label htmlFor="fname">Your Name</label>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Your name.."
          />
          <label htmlFor="fname">Your email</label>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Your name.."
          />
          <label htmlFor="fname">Password</label>
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Your name.."
          />
        </div>
        <div className="sigup-button">
          <button>Sign Up</button>
        </div>
      </div>
    </Wrapper>
  );
}

export default Test;

const Wrapper = styled.div`
  .top-image {
    text-align: right;
  }
  .sign-up {
    font-family: "Ubuntu";
    font-style: normal;
    font-weight: 500;
    font-size: 44px;
    line-height: 51px;
    text-align: center;
    text-transform: capitalize;
    color: #540d6e;
  }
  padding: 30px 20px;
  input,
  select {
    width: 100%;
    padding: 12px 20px;
    margin: 10px 0;
    border-radius: 4px;
    box-sizing: border-box;
  }
  label {
    padding-top: 30px;
  }
  .input-content {
    padding: 0 350px;
  }
  .sigup-button {
    text-align: center;
    padding-top: 30px;
  }
  button {
    padding: 10px 70px;
    background: #ee4266;
    border-radius: 8px;
    font-family: "Ubuntu";
    font-style: normal;
    font-weight: 400;
    font-size: 22px;
    line-height: 37px;
    color: #ffffff;
    outline: none;
    border: none;
  }
  /* input[type="submit"] {
    width: 100%;
    background-color: #4caf50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  input[type="submit"]:hover {
    background-color: #45a049;
  }

  div {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
  } */
`;
