import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import img1 from "../../../asset/checkboard.png";
import { useSelector } from 'react-redux';

const EmptyPlan = () => {
  const { fullName } = useSelector((state) => state.auth?.login)
  return (
    <Wrapper>
      <div className='row justify-content-center' >
        <img src={img1} alt="no-plan" style={{width:290,height:290}} />
        <p className='text-msg' >
          Hello{" "} {fullName}, You have not created any investment<br/> plans yet,{" "}
          <Link to="/plan-product" className='link' >Click to Add Plan</Link>
        </p>
      </div>
    </Wrapper>
  )
}

export default EmptyPlan

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .text-msg {
    margin-top: 44px;
    font-weight: 400;
    font-size: 17px;
    line-height: 28px;
    text-align: center;
    letter-spacing: -0.01em;
  }

  .link {
    font-weight: 600;
    cursor: pointer;
    text-decoration: none;
  }
`