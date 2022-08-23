import React from "react";
import styled from "styled-components";
import Vector from "../asset/Vector.png";

function Test() {
  return (
    <Wrapper>
      <div className="body-content">
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
.body-content {
  max-width: 70%;
  border: solid 3px green;
}
  border: solid 3px red;
  width: 80%;
  .top-image {
    text-align: right;
  }
  .sign-up {
    font-family: "Ubuntu";
    font-style: normal;
    font-weight: 500;
    /* font-size: 44rem; */
    line-height: 51px;
    text-align: center;
    text-transform: capitalize;
    color: #540d6e;
  }
  /* padding: 30px 20px; */
  input,
  select {
    width: 100%;
    padding: 12px 20px;
    margin: 10px 0;
    border-radius: 4px;
    box-sizing: border-box;
  }
  label {
    /* padding-top: 30px; */
  }
  .input-content {
    /* padding: 0 350px; */
  }
  .sigup-button {
    text-align: center;
    padding-top: 30px;
  }
  button {
    padding: 1% 10%;
    background: #ee4266;
    border-radius: 8px;
    font-family: "Ubuntu";
    font-style: normal;
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 37px;
    color: #ffffff;
    outline: none;
    border: none;
  }
 
`;
