import React from "react";
import styled from "styled-components";
import Login from "./Login";
import LoginLeftView from "./loginLeftView";
import Signup from "./signup";

const Authentication = ({ signup }) => {
  const user = null
  return (

    <div>
      <Wrapper>
        <div
          style={{
            height: "100vh",
            overflow: "hidden",
          }}
          className="content">
          <div className="login-left-view">
            <LoginLeftView signup={signup} />
          </div>
          {signup ? (
            <div style={{ overflowY: "auto", gridTemplateColumns: "auto", }} className="login-right-view">
              <Signup />
            </div>
          ) : (
            <div style={{ overflowY: "auto" }} className="">
              <Login />
            </div>
          )}
        </div>
      </Wrapper>
    </div>
  );
};

export default Authentication;

const Wrapper = styled.div`
.content{
  display: grid;
  @media(min-width: 900px){
    grid-template-columns: 1fr 1fr;
  }
}
 
`;
